/* eslint func-names: "off", prefer-arrow-callback: "off" */

import CitationKeys       from './models/CitationKeys.js'
import cleanSearch        from './utilities/cleanSearch.js'
import Components         from './models/Components.js'
import createSearchRegExp from './utilities/createSearchRegExp.js'
import Languages          from './models/Languages.js'
import Normalizer         from './Normalizer.js'

/**
 * NB: Return named function expressions from these methods to make debugging easier.
 */
function createMatchers(query, normalize, langFilter) {

  const {
    bib,
    caseSensitive,
    gloss,
    regex,
    sourceForm,
    sourceUR,
    tags,
  } = Object.fromEntries(query)

  function createBasicTester(field) {
    return function testBasic(component) {
      return component[field] === query.get(field)
    }
  }

  function createBooleanTester(field) {
    return function testBoolean(component) {
      return Boolean(component[field])
    }
  }

  function createStringTester(field) {

    const q    = normalize(cleanSearch(query.get(field)))
    const test = createSearchRegExp(q, { caseSensitive, regex })

    return function testString(component) {
      if (!component[field]) return false
      return test(normalize(component[field]))
    }

  }

  return {

    bib() {
      return function testBib(component) {
        return component.tokens?.some(token => token.source === bib)
      }
    },

    form() {
      return createStringTester(`form`)
    },

    gloss() {

      const q    = normalize(cleanSearch(gloss))
      const test = createSearchRegExp(q, { caseSensitive, regex })

      return function testSourceForm(component) {
        return component.tokens?.some(token => test(normalize(token.gloss)))
      }

    },

    /**
     * NB: This function only runs when the "Language" setting is not `all`.
     */
    language() {
      return function testLanguage(component) {
        return langFilter.includes(component.language)
      }
    },

    primary() {
      return createBooleanTester(`primary`)
    },

    secondary() {
      return createBooleanTester(`secondary`)
    },

    sourceForm() {

      const q    = normalize(cleanSearch(sourceForm))
      const test = createSearchRegExp(q, { caseSensitive, regex })

      return function testSourceForm(component) {
        return component.tokens?.some(token => test(normalize(token.form)))
      }

    },

    sourceUR() {

      const q    = normalize(cleanSearch(sourceUR))
      const test = createSearchRegExp(q, { caseSensitive, regex })

      return function testSourceUR(component) {
        return component.tokens?.some(token => test(normalize(token.UR)))
      }

    },

    specificity() {
      return createBasicTester(`specificity`)
    },

    subcategory() {
      return createBasicTester(`subcategory`)
    },

    tags() {

      const q    = normalize(cleanSearch(tags))
      const test = createSearchRegExp(q, { caseSensitive, regex })

      return function testTags(component) {
        return component.tags?.some(({ tag }) => test(normalize(tag)))
      }

    },

    type() {
      return createBasicTester(`type`)
    },

    UR() {
      return createStringTester(`UR`)
    },

  }

}

export default class Database {

  citationKeys = new CitationKeys

  components = []

  index = new Components

  languages = new Languages

  cleanCitationKeys() {
    for (const key of this.citationKeys.keys()) {
      const isUsed = this.components.some(component => component.tokens?.some(token => token.source === key))
      if (!isUsed) this.citationKeys.delete(key)
    }
  }

  async initialize() {
    await this.citationKeys.load()
    await this.languages.load()
    await this.index.load()
    this.components = Array.from(this.index.values())
    this.cleanCitationKeys()
  }

  quickSearch(query) {

    const caseSensitive = query.get(`caseSensitive`)
    const diacritics    = query.get(`diacritics`)
    const langQuery     = query.get(`language`)
    const langFilter    = Array.isArray(langQuery) ? langQuery : [langQuery]
    const regex         = query.get(`regex`)
    const q             = query.get(`q`)

    // Special case searches without a text query to improve search speed.
    if (!q) {
      if (!langQuery || langFilter.includes(`all`)) return Array.from(this.components)
      return Array.from(this.components).filter(({ language }) => langFilter.includes(language))
    }

    // Conduct full search if a text query is not present.

    const normalize = new Normalizer({ caseSensitive, diacritics })

    // NFC normalize original search text first (using `cleanSearch()`), since data in database is also normalized. This allows search results to match the query.
    // Then normalize (in the sense of 'make consistent') the query according to the search options.
    const searchText = normalize(cleanSearch(q))
    const test       = createSearchRegExp(searchText, { caseSensitive, regex })

    return Array.from(this.components).filter(function({
      form,
      language,
      tags,
      tokens,
      UR,
    }) {

      // Special case language filter to improve speed of search.
      if (langQuery && !langFilter.includes(`all`) && !langFilter.includes(language)) return false

      return tags?.some(({ tag }) => test(normalize(tag)))
      || test(normalize(form))
      || test(normalize(UR))
      || tokens.some(function({
        form,
        gloss,
        UR,
      }) {
        return test(normalize(form))
        || test(normalize(gloss))
        || test(normalize(UR))
      })

    })

  }

  search(query) {

    const caseSensitive = query.get(`caseSensitive`)
    const diacritics    = query.get(`diacritics`)
    const language      = query.get(`language`)
    const langFilter    = Array.isArray(language) ? language : [language]
    const logic         = query.get(`logic`) ?? `all`

    const normalize = new Normalizer({ caseSensitive, diacritics })
    const matchers = createMatchers(query, normalize, langFilter)

    if (!language || langFilter.includes(`all`)) delete matchers.language

    const matchFunctions = Object.keys(matchers)
    .filter(field => query.get(field))
    .map(field => matchers[field]())

    const method = logic === `all` ? `every` : `some`

    return Array.from(this.components)
    .filter(component => matchFunctions[method](test => test(component)))

  }

  /**
 * Create lists of values needed for `<select>` elements.
 * @returns {Object}
 */
  get types() {

    const data = {}

    data.baseCategories = this.components.reduce((set, component) => {

      if (component.baseCategories) {
        for (const cat of component.baseCategories) {
          set.add(cat)
        }
      }

      return set

    }, new Set)

    data.specificity = this.components.reduce((set, component) => {
      if (component.specificity) set.add(component.specificity)
      return set
    }, new Set)

    data.subcategories = this.components.reduce((set, component) => {
      if (component.subcategory) set.add(component.subcategory)
      return set
    }, new Set)

    data.types = this.components.reduce((set, component) => {
      if (component.type) set.add(component.type)
      return set
    }, new Set)

    for (const type of Object.keys(data)) {
      data[type] = Array.from(data[type]).sort()
    }

    return data

  }

}

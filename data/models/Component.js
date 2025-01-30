import cleanGloss    from '../utilities/cleanGloss.js'
import cleanProto    from '../utilities/cleanProto.js'
import cleanUR       from '../utilities/cleanUR.js'
import Matches       from './Matches.js'
import Orthographies from './Orthographies.js'
import parseTag      from '../utilities/parseTag.js'

const commaRegExp   = /,\s*/v
const orthographies = new Orthographies

await orthographies.load()

export default class Component {

  constructor({
    allomorphs,
    baseCategories,
    components,
    containedIn,
    deverbal,
    deverbalFrom,
    dialect,
    displayLanguage,
    finalType,
    form,
    formatives,
    Glottocode,
    ID,
    ISO,
    language,
    matchAI,
    matchII,
    matchTA,
    matchTI,
    notes,
    orthography,
    PA,
    reduplicated,
    specificity,
    subcategory,
    tags,
    type,
    UR,
  } = {}) {

    const isProto = language.includes(`Proto`)

    // Allomorphs
    if (allomorphs.length) this.allomorphs = allomorphs

    // Component ID (Unique within the language)
    this.componentID = ID

    // Components
    if (components.length) this.components = components

    // Contained In
    if (containedIn.length) this.containedIn = containedIn

    // Deverbal
    this.deverbal = deverbal === `Y`

    // Dialect
    if (dialect) this.dialect = dialect.normalize()

    // Display Language
    this.displayLanguage = displayLanguage

    // Formatives
    if (formatives.length) this.formatives = formatives

    // Glottocode
    if (Glottocode) this.Glottocode = Glottocode

    // ID (Unique with the database)
    this.ID = `${ language }-${ ID }`

    // ISO 639-3
    if (ISO) this.ISO = ISO

    // Language
    this.language = language

    // Matches
    this.matches = new Matches({
      AI: orthographies.transliterate(orthography, matchAI),
      II: orthographies.transliterate(orthography, matchII),
      TA: orthographies.transliterate(orthography, matchTA),
      TI: orthographies.transliterate(orthography, matchTI),
    })

    // Notes
    if (notes) this.notes = notes.normalize()

    // Subcategory
    if (subcategory) this.subcategory = subcategory

    // Tags
    if (tags) {
      this.tags = tags
      .normalize()
      .split(commaRegExp)
      .map(cleanGloss)
      .filter(Boolean) // Do this after cleanGloss to catch `NG` cases.
      .map(parseTag)
      .sort((a, b) => {

        if (a.grammatical === b.grammatical) {
          return a.tag.localeCompare(b.tag)
        }

        return b.grammatical ? -1 : 1

      })
    }

    // Type
    if (type) this.type = type


    // DEPENDENT FIELDS
    // The information in the fields below depends on information in the fields above.

    // Deverbal From
    if (this.deverbal && this.deverbalFrom) this.deverbalFrom = deverbalFrom.normalize()

    // Initial: Reduplicated
    if (this.type === `initial`) {
      this.reduplicated = reduplicated === `Y`
    }

    // Information About Finals
    if (this.type === `final`) {

      // Final: Concrete/Abstract
      this.specificity = specificity

      // Final: Primary/Secondary
      this.primary   = finalType === `B` || !finalType
      this.secondary = finalType === `B` || finalType === `Y`

      // Base Categories
      if (this.secondary && baseCategories) {
        this.baseCategories = baseCategories
      }

    }

    // Only convert these fields if the orthography is known
    if (orthography !== `UNK`) {

      // Form
      if (form) {
        this.form = form.normalize()
        if (isProto) this.form = cleanProto(form)
        this.form = orthographies.transliterate(orthography, this.form)
        if (isProto) this.form = `*` + this.form // eslint-disable-line prefer-template
      }

      // Proto-Algonquian
      if (PA) {
        this.PA = `*` + orthographies.transliterate(orthography, cleanProto(PA)) // eslint-disable-line prefer-template
      }

      // UR
      if (UR) this.UR = orthographies.transliterate(orthography, cleanUR(UR))

    }

    // Display Form
    this.displayForm = this.form || this.UR || form  // `form` here is in the original orthography (the project orthography would be `this.form`)

  }

}

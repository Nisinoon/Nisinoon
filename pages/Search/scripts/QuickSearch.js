/* global document, localStorage, location */

export default class QuickSearch {

  constructor() {
    this.caseSensitive = document.getElementById(`quick-case-sensitive-box`)
    this.diacritics    = document.getElementById(`quick-diacritics-box`)
    this.form          = document.getElementById(`quick-search-form`)
    this.language      = document.getElementById(`quick-language-select`)
    this.regex         = document.getElementById(`quick-regex-box`)
    this.resetButton   = document.getElementById(`quick-reset-button`)
    this.search        = document.getElementById(`search-box`)
  }

  listen() {
    this.caseSensitive?.addEventListener(`input`, this.save.bind(this))
    this.diacritics?.addEventListener(`input`, this.save.bind(this))
    this.form.addEventListener(`input`, this.resetValidity.bind(this))
    this.form.addEventListener(`submit`, this.validate.bind(this))
    this.language.addEventListener(`input`, this.save.bind(this))
    this.regex?.addEventListener(`input`, this.save.bind(this))
  }

  render() {

    const url   = new URL(location.href)
    const query = url.searchParams

    if (query.size) return

    // Restore search settings
    if (this.caseSensitive) this.caseSensitive.checked = localStorage.getItem(`caseSensitive`) === `true`
    if (this.diacritics) this.diacritics.checked    = localStorage.getItem(`diacritics`) === `true`
    if (this.regex) this.regex.checked         = localStorage.getItem(`regex`) === `true`

    const language = localStorage.getItem(`language`)

    if (language) this.language.value = language

  }

  resetValidity() {
    this.search.setCustomValidity(``)
  }

  save() {
    if (this.caseSensitive) localStorage.setItem(`caseSensitive`, this.caseSensitive.checked)
    if (this.diacritics) localStorage.setItem(`diacritics`, this.diacritics.checked)
    localStorage.setItem(`language`, this.language.value)
    if (this.regex) localStorage.setItem(`regex`, this.regex.checked)
  }

  validate(ev) {

    const q = this.search.value

    if (!(q && this.regex?.checked)) return

    try {
      new RegExp(q, `v`)
    } catch (e) {
      ev.preventDefault()
      this.search.setCustomValidity(e.message)
      this.search.reportValidity()
    }

  }

}

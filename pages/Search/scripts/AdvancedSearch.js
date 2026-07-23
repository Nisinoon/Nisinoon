/* global document, localStorage, location */

export default class AdvancedSearch {

  constructor() {
    this.caseSensitive = document.getElementById(`advanced-case-sensitive-box`)
    this.diacritics    = document.getElementById(`advanced-diacritics-box`)
    this.form          = document.getElementById(`advanced-search-form`)
    this.formBox       = document.getElementById(`form-box`)
    this.language      = document.getElementById(`advanced-language-select`)
    this.logic         = document.getElementById(`logic-select`)
    this.regex         = document.getElementById(`advanced-regex-box`)
    this.tagsBox       = document.getElementById(`tags-box`)
    this.resetButton   = document.getElementById('advanced-reset-button')
    this.typeSelect = document.getElementById(`type-select`)
    this.finalFields = document.querySelector(`.checkbox-fields`)
  }

  listen() {
    this.caseSensitive.addEventListener(`input`, this.save.bind(this))
    this.diacritics.addEventListener(`input`, this.save.bind(this))
    this.form.addEventListener(`input`, this.resetValidity.bind(this))
    this.form.addEventListener(`submit`, this.validate.bind(this))
    this.language.addEventListener(`input`, this.save.bind(this))
    this.logic.addEventListener(`input`, this.save.bind(this))
    this.regex.addEventListener(`input`, this.save.bind(this))

    // reset button functionality
    this.resetButton.addEventListener(`click`, this.reset.bind(this))

    // toggle showing component type "final" options
    this.typeSelect.addEventListener(`input`, this.toggleFinalFields.bind(this))
  }

  render() {

    const url   = new URL(location.href)
    const query = url.searchParams

    if (query.size && !(query.size === 1 && query.has(`advanced`))) return

    // Restore search settings
    this.caseSensitive.checked = localStorage.getItem(`caseSensitive`) === `true`
    this.diacritics.checked    = localStorage.getItem(`diacritics`) === `true`
    this.regex.checked         = localStorage.getItem(`regex`) === `true`

    const language = localStorage.getItem(`language`)
    const logic    = localStorage.getItem(`logic`)

    if (language) this.language.value = language
    if (logic) this.logic.value = logic

    // Toggle showing final type options
    this.toggleFinalFields()
  }

  resetValidity() {
    this.formBox.setCustomValidity(``)
    this.tagsBox.setCustomValidity(``)
  }

  save() {
    localStorage.setItem(`caseSensitive`, this.caseSensitive.checked)
    localStorage.setItem(`diacritics`, this.diacritics.checked)
    localStorage.setItem(`language`, this.language.value)
    localStorage.setItem(`logic`, this.logic.value)
    localStorage.setItem(`regex`, this.regex.checked)
  }

  validate(ev) {

    const fields = document.querySelectorAll(`#advanced-search-form [type=search]`)

    for (const field of fields) {
      try {
        new RegExp(field.value, `v`)
      } catch (e) {
        ev.preventDefault()
        field.setCustomValidity(e.message)
        field.reportValidity()
        return
      }
    }

  }

  reset(ev) {
    ev.preventDefault()
    localStorage.removeItem(`language`)
    localStorage.removeItem(`logic`)
    
    // Reset all text/search inputs
    const fields = document.querySelectorAll(`#advanced-search-form [type=search]`)
    for (const field of fields) field.value = ``

    // Reset checkboxes
    this.caseSensitive.checked = false
    this.diacritics.checked = false
    this.regex.checked = false
    document.getElementById(`primary-box`).checked = false
    document.getElementById(`secondary-box`).checked = false

    // Reset dropdowns to default
    this.language.value = `all`
    this.logic.value = `all`
    document.getElementById(`subcategory-select`).value = ``
    document.getElementById(`type-select`).value = ``
    document.getElementById(`bib-select`).value = ``
  }

  toggleFinalFields() {
    const isFinal = this.typeSelect.value === `final`
    this.finalFields.style.display = isFinal ? `flex` : `none`
  }

}

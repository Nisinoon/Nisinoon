/* global document, localStorage, location */

export default class AdvancedSearch {

  constructor() {
    this.caseSensitive    = document.getElementById(`advanced-case-sensitive-box`)
    this.diacritics       = document.getElementById(`advanced-diacritics-box`)
    this.form             = document.getElementById(`advanced-search-form`)
    this.formBox          = document.getElementById(`form-box`)
    this.languageDropdown = document.getElementById('advanced-language-dropdown')
    this.languageToggle   = document.getElementById(`advanced-language-dropdown-toggle`)
    this.languagePanel    = document.getElementById('advanced-language-panel')
    this.logic            = document.getElementById(`logic-select`)
    this.regex            = document.getElementById(`advanced-regex-box`)
    this.tagsBox          = document.getElementById(`tags-box`)
    this.resetButton      = document.getElementById('advanced-reset-button')
    this.typeSelect       = document.getElementById(`type-select`)
    this.finalFields      = document.querySelector(`.checkbox-fields`)
    this.selectAllToggle  = document.getElementById(`advanced-select-all-toggle`)
    this.languageToggleLabel = document.getElementById(`advanced-language-toggle-label`)
    this.advancedOption   = document.getElementById('advanced-option')
  }

  listen() {
    this.caseSensitive.addEventListener(`input`, this.save.bind(this))
    this.diacritics.addEventListener(`input`, this.save.bind(this))
    this.form.addEventListener(`input`, this.resetValidity.bind(this))
    this.form.addEventListener(`submit`, this.validate.bind(this))
    this.languagePanel.addEventListener(`input`, () => { 
      this.updateSelectAllLabel()
      this.updateLanguageToggleLabel()
      this.save()
    })
    this.languagePanel.addEventListener(`change`, (ev) => {
      const target = ev.target;
      if (target.matches(`.group-checkbox`)) {
        this.toggleGroup(target);
      } else if (target.dataset.group) {
        this.syncGroupCheckbox(target.dataset.group);
      }
      this.updateSelectAllLabel();
      this.updateLanguageToggleLabel();
      this.save();
    });
    this.logic.addEventListener(`input`, this.save.bind(this))
    this.regex.addEventListener(`input`, this.save.bind(this))

    // reset button functionality
    this.resetButton.addEventListener(`click`, this.reset.bind(this))

    // toggle showing languages panel
    this.languageToggle.addEventListener('click', this.open.bind(this))
    // toggle showing languages panel when clicking off
    document.addEventListener(`click`, (ev) => {
      if (!this.languageDropdown.contains(ev.target)) {
        this.languagePanel.classList.remove(`open`)
      }
    })

    // toggle showing component type "final" options
    this.typeSelect.addEventListener(`input`, this.toggleFinalFields.bind(this))
    this.typeSelect.addEventListener(`input`, this.save.bind(this))
    document.getElementById(`primary-box`).addEventListener(`input`, this.save.bind(this))
    document.getElementById(`secondary-box`).addEventListener(`input`, this.save.bind(this))

    // toggle select/deselect all languages
    this.selectAllToggle.addEventListener(`click`, this.toggleSelectAll.bind(this))

    this.advancedOption.addEventListener('click', this.restoreLanguages.bind(this))
  }

  render() {

    const url   = new URL(location.href)
    const query = url.searchParams

    //if (query.size && !(query.size === 1 && query.has(`advanced`))) return

    // Restore search settings
    this.caseSensitive.checked = localStorage.getItem(`caseSensitive`) === `true`
    this.diacritics.checked    = localStorage.getItem(`diacritics`) === `true`
    this.regex.checked         = localStorage.getItem(`regex`) === `true`

    this.restoreLanguages()

    const logic    = localStorage.getItem(`logic`)

    if (logic) this.logic.value = logic

    const type = localStorage.getItem(`type`)
    if (type) this.typeSelect.value = type

    document.getElementById(`primary-box`).checked = localStorage.getItem(`primary`) === `true`
    document.getElementById(`secondary-box`).checked = localStorage.getItem(`secondary`) === `true`

    // Toggle showing final type options
    this.toggleFinalFields()
  }

  resetValidity() {
    this.formBox.setCustomValidity(``)
    this.tagsBox.setCustomValidity(``)
  }

  save() {
    // save languages
    const checkedLanguages = Array.from(
      document.querySelectorAll(`#advanced-language-panel input:checked`)
    ).map(el => el.value)
    localStorage.setItem(`language`, JSON.stringify(checkedLanguages))

    localStorage.setItem(`caseSensitive`, this.caseSensitive.checked)
    localStorage.setItem(`diacritics`, this.diacritics.checked)
    localStorage.setItem(`logic`, this.logic.value)
    localStorage.setItem(`regex`, this.regex.checked)
    localStorage.setItem(`type`, this.typeSelect.value)
    localStorage.setItem(`primary`, document.getElementById(`primary-box`).checked)
    localStorage.setItem(`secondary`, document.getElementById(`secondary-box`).checked)
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
    document.querySelectorAll(`#advanced-language-panel input`).forEach(el => el.checked = false)
    document.querySelector(`#advanced-language-panel input[value=all]`).checked = true
    this.syncAllGroupCheckboxes()
    this.updateSelectAllLabel()
    this.updateLanguageToggleLabel()
    this.logic.value = `all`
    document.getElementById(`subcategory-select`).value = ``
    document.getElementById(`type-select`).value = ``
    document.getElementById(`bib-select`).value = ``

    document.getElementById(`type-select`).value = ``
    this.toggleFinalFields()
    this.save()
  }

  // Restore languages stored inside localStorage
  restoreLanguages() {
    const language = localStorage.getItem(`language`)
    if (language) {
      try {
        const languages = JSON.parse(language)
        document.querySelectorAll(`#advanced-language-panel input`).forEach(el => {
          el.checked = languages.includes(el.value)
        })
      } catch {
        // Old format in localStorage, clear it
        localStorage.removeItem(`language`)
      }
    }
    this.syncAllGroupCheckboxes()
    this.updateSelectAllLabel()
    this.updateLanguageToggleLabel()
  }

  toggleFinalFields() {
    const isFinal = this.typeSelect.value === `final`
    this.finalFields.style.display = isFinal ? `flex` : `none`
  }

  // Open languages panel
  open() {
    this.languagePanel.classList.toggle('open')
    this.updateSelectAllLabel()
  }

  toggleSelectAll() {
    const checkboxes = document.querySelectorAll(`#advanced-language-panel input[name="language"]`)
    const allChecked  = Array.from(checkboxes).every(el => el.checked)
    checkboxes.forEach(el => el.checked = !allChecked)
    this.updateSelectAllLabel()
    this.updateLanguageToggleLabel()
    this.save()
  }

  updateSelectAllLabel() {
    const checkboxes = document.querySelectorAll(`#advanced-language-panel input[name="language"]`)
    const allChecked  = Array.from(checkboxes).every(el => el.checked)
    this.selectAllToggle.textContent = allChecked ? `Deselect all` : `Select all`
  }

  updateLanguageToggleLabel() {
    const checkboxes = Array.from(document.querySelectorAll(`#advanced-language-panel input[name="language"]:not(.group-checkbox)`))
    const checked     = checkboxes.filter(el => el.checked)

    let label
    if (checked.length === 0) {
      label = `No languages selected`
    } else if (checked.length === checkboxes.length) {
      label = `All languages`
    } else if (checked.length <= 5) {
      // Show names directly for a small selection
      label = checked
        .map(el => el.closest(`label`).textContent.trim())
        .join(`, `)
    } else {
      label = `${checked.length} languages selected`
    }
    label = label.length > 50 ? label.slice(0, 50) + "..." : label;
    this.languageToggleLabel.textContent = label
  }

  toggleGroup(groupCheckbox) {
    const wrapper = groupCheckbox.closest(`.language-group`)
    const childBoxes = wrapper.querySelectorAll(`input[type=checkbox]:not(.group-checkbox)`)
    childBoxes.forEach(el => el.checked = groupCheckbox.checked)
  }

  syncGroupCheckbox(groupName) {
    const wrapper = document.querySelector(`#advanced-language-panel .language-group[data-group="${CSS.escape(groupName)}"]`)
    if (!wrapper) return
    const groupCheckbox = wrapper.querySelector(`.group-checkbox`)
    const children = Array.from(wrapper.querySelectorAll(`input[type=checkbox]:not(.group-checkbox)`))
    const allChecked  = children.every(el => el.checked)
    const noneChecked = children.every(el => !el.checked)
    groupCheckbox.checked = allChecked
    groupCheckbox.indeterminate = !allChecked && !noneChecked
  }

  syncAllGroupCheckboxes() {
    document.querySelectorAll(`#advanced-language-panel .language-group`).forEach(wrapper => {
      this.syncGroupCheckbox(wrapper.dataset.group)
    })
  }

}

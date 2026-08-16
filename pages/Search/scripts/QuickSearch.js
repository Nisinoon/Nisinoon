/* global document, localStorage, location */

export default class QuickSearch {

  constructor() {
    this.caseSensitive = document.getElementById(`quick-case-sensitive-box`)
    this.diacritics    = document.getElementById(`quick-diacritics-box`)
    this.form          = document.getElementById(`quick-search-form`)
    this.languageDropdown = document.getElementById('quick-language-dropdown')
    this.languageToggle   = document.getElementById(`quick-language-dropdown-toggle`)
    this.languagePanel    = document.getElementById('quick-language-panel')
    this.language      = document.getElementById(`quick-language-select`)
    this.regex         = document.getElementById(`quick-regex-box`)
    this.resetButton   = document.getElementById(`quick-reset-button`)
    this.search        = document.getElementById(`search-box`)
    this.selectAllToggle = document.getElementById(`quick-select-all-toggle`)
    this.languageToggleLabel = document.getElementById(`quick-language-toggle-label`)
  }

  listen() {
    this.caseSensitive?.addEventListener(`input`, this.save.bind(this))
    this.diacritics?.addEventListener(`input`, this.save.bind(this))
    this.form.addEventListener(`input`, this.resetValidity.bind(this))
    this.form.addEventListener(`submit`, this.validate.bind(this))
    this.languagePanel.addEventListener(`input`, () => { 
      this.updateSelectAllLabel()
      this.updateLanguageToggleLabel()
      this.save()
    })
    this.regex?.addEventListener(`input`, this.save.bind(this))

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

    // toggle select/deselect all languages
    this.selectAllToggle.addEventListener(`click`, this.toggleSelectAll.bind(this))
  }

  render() {

    const url   = new URL(location.href)
    const query = url.searchParams

    // if (query.size) return

    // Restore search settings
    if (this.caseSensitive) this.caseSensitive.checked = localStorage.getItem(`caseSensitive`) === `true`
    if (this.diacritics) this.diacritics.checked    = localStorage.getItem(`diacritics`) === `true`
    if (this.regex) this.regex.checked         = localStorage.getItem(`regex`) === `true`

    const language = localStorage.getItem(`language`)

    if (language) {
      try {
        const languages = JSON.parse(language)
        document.querySelectorAll(`#quick-language-panel input`).forEach(el => {
          el.checked = languages.includes(el.value)
        })
      } catch {
        // Old format in localStorage, clear it
        localStorage.removeItem(`language`)
      }
    }
    this.updateSelectAllLabel()
    this.updateLanguageToggleLabel()

  }

  resetValidity() {
    this.search.setCustomValidity(``)
  }

  save() {
    // save languages
    const checkedLanguages = Array.from(
      document.querySelectorAll(`#quick-language-panel input:checked`)
    ).map(el => el.value)
    localStorage.setItem(`language`, JSON.stringify(checkedLanguages))

    if (this.caseSensitive) localStorage.setItem(`caseSensitive`, this.caseSensitive.checked)
    if (this.diacritics) localStorage.setItem(`diacritics`, this.diacritics.checked)
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

  reset(ev) {
    ev.preventDefault()
    localStorage.removeItem(`language`)
    this.search.value = ``

    document.querySelectorAll(`#quick-language-panel input`).forEach(el => el.checked = false)

    this.updateSelectAllLabel()
    this.updateLanguageToggleLabel()
  }

  // Open languages panel
  open() {
    this.languagePanel.classList.toggle('open')
    this.updateSelectAllLabel()
  }

  toggleSelectAll() {
    const checkboxes = document.querySelectorAll(`#quick-language-panel input`)
    const allChecked  = Array.from(checkboxes).every(el => el.checked)
    checkboxes.forEach(el => el.checked = !allChecked)
    this.updateSelectAllLabel()
    this.updateLanguageToggleLabel()
    this.save()
  }

  updateSelectAllLabel() {
    const checkboxes = document.querySelectorAll(`#quick-language-panel input`)
    const allChecked  = Array.from(checkboxes).every(el => el.checked)
    this.selectAllToggle.textContent = allChecked ? `Deselect all` : `Select all`
  }
  
  updateLanguageToggleLabel() {
    const checkboxes = Array.from(document.querySelectorAll(`#quick-language-panel input`))
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
    label = label.length > 65 ? label.slice(0, 65) + "..." : label;
    this.languageToggleLabel.textContent = label
  }

}

/* global document, localStorage, location */

export default class ResultsFields {

  constructor() {
    this.dropdown    = document.getElementById(`visible-results-fields`)
    this.toggle      = document.getElementById(`results-fields-dropdown-toggle`)
    this.panel       = document.getElementById(`results-fields-panel`)
    this.toggleLabel = document.getElementById(`results-toggle-label`)
    this.applyButton = document.getElementById(`results-fields-apply`)
  }

  listen() {
    this.toggle.addEventListener(`click`, this.open.bind(this))

    document.addEventListener(`click`, (ev) => {
      if (!this.dropdown.contains(ev.target)) {
        this.panel.classList.remove(`open`)
      }
    })

    this.panel.addEventListener(`input`, this.updateToggleLabel.bind(this))

    this.applyButton.addEventListener(`click`, this.apply.bind(this))
  }

  render() {
    const saved  = localStorage.getItem(`visibleFields`)
    const fields = saved ? JSON.parse(saved) : null

    if (fields) {
      document.querySelectorAll(`#results-fields-panel input`).forEach(el => {
        el.checked = fields.includes(el.value)
      })
    }
    // else: leave checkboxes as server-rendered (already correct defaults)

    this.updateToggleLabel()
  }

  open() {
    this.panel.classList.toggle(`open`)
  }

  updateToggleLabel() {
    const checkboxes = Array.from(document.querySelectorAll(`#results-fields-panel input`))
    const checked     = checkboxes.filter(el => el.checked)

    let label
    if (checked.length === 0) {
      label = `Toggle fields - No fields selected`
    } else if (checked.length === checkboxes.length) {
      label = `Toggle fields - All fields`
    } else {
      label = `Toggle fields - ${checked.length} fields selected`
    }
    this.toggleLabel.textContent = label
  }

  apply(ev) {
    ev.preventDefault()
    const checked = Array.from(document.querySelectorAll(`#results-fields-panel input:checked`))
      .map(el => el.value)

    localStorage.setItem(`visibleFields`, JSON.stringify(checked))

    const url = new URL(location.href)
    url.searchParams.set(`columns`, checked.join(`,`))
    location.href = url.toString()
  }

}
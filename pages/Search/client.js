/* global document */

import AdvancedSearch from './scripts/AdvancedSearch.js'
import Copier         from '../../scripts/Copier.js'
import Downloader     from './scripts/Downloader.js'
import QuickSearch    from './scripts/QuickSearch.js'
import Results        from './scripts/Results.js'
import SearchMode     from './scripts/SearchMode.js'
import ResultsFields from './scripts/ResultsFields.js'

// Initialize button to copy citation information

const button = document.querySelector(`[data-hook=copy-citation]`)
const el     = document.querySelector(`[data-hook=citation]`)

if (button && el) {
  const copier = new Copier(el, button)
  copier.initialize()
}

// Initialize Search Mode

const searchMode = new SearchMode
searchMode.render()
searchMode.listen()

// Initialize Quick Search

const quickSearch = new QuickSearch
quickSearch.render()
quickSearch.listen()

// Initialize Advanced Search

const advancedSearch = new AdvancedSearch
advancedSearch.render()
advancedSearch.listen()

// Initialize results table

const results = new Results
results.initialize()
results.render()

// Initialize results fields

const resultsFieldsEl = document.getElementById(`visible-results-fields`)
if (resultsFieldsEl) {
  const resultsFields = new ResultsFields()
  resultsFields.listen()
  resultsFields.render()
}

// Initialize download buttons

const downloader = new Downloader
downloader.initialize()

import changeParam    from './scripts/changeParam.js'
import SortDirectives from '../../scripts/SortDirectives.js'
import toCSV          from './scripts/toCSV.js'
import { COLUMNS, DEFAULT_COLUMNS } from './scripts/Columns.js'

const defaults = {
  limit:  100,
  offset: 0,
  sort:   ``,
}

export function Search(req, res) {

  const { db } = req.app
  const query  = new Map(Object.entries(req.query))

  const context = {
    advanced:       query.has(`advanced`),
    columns:        COLUMNS,
    defaultColumns: DEFAULT_COLUMNS,
    languages:      db.languages.toJSON(),
    numComponents:  db.index.size.toLocaleString(),
    numLanguages:   db.languages.size.toLocaleString(),
    pageCSS:        res.app.locals.styles.Search,
    Search:         true,
    sources:        Object.fromEntries(db.citationKeys),
    title:          `Search`,
    types:          db.types,
    url:            req.originalUrl,
  }

  // No query submitted. Load default search page.
  if (
    !query.size
    || (query.size === 1 && query.has(`advanced`))
  ) {
    return res.render(`Search/Search`, context)
  }

  // Search

  let results = []

  if (req.query.advanced) {
    results = req.app.db.search(query)
  } else {
    results = req.app.db.quickSearch(query)
  }

  const numTotalResults = results.length

  // Sort

  const sortQuery = query.get(`sort`) ?? defaults.sort
  const sort      = new SortDirectives(sortQuery)

  if (sort.size) {
    results.sort((a, b) => {

      const comparisons = Array.from(sort.entries())
      .map(([field, { direction }]) => {
        const comparison = (a[field] || ``).localeCompare(b[field] || ``)
        return direction === `ascending` ? comparison : comparison * -1
      })

      return comparisons.reduce((state, comparison) => (state ? state : comparison), 0)

    })
  }

  function html() {

    // Pagination
    // NB: offset = # of records to SKIP

    const limit  = Number(query.get(`limit`) ?? defaults.limit)
    const offset = Number(query.get(`offset`) ?? defaults.offset)

    results = results.slice(offset, offset + limit)

    const numAdjacentPages = 5
    const lastPageOffset = Math.floor(numTotalResults / limit) * limit
    const nextPageOffset = Math.min(offset + limit, numTotalResults)
    const prevPageOffset = Math.max(offset - limit, 0)
    const url = new URL(req.originalUrl, `${ req.protocol }://${ req.host }`)

    const prevPages = []
    const nextPages = []

    let prevOffset = offset - limit

    while (prevOffset >= 0 && prevPages.length < numAdjacentPages) {

      prevPages.unshift({
        link:    changeParam(url, `offset`, prevOffset),
        pageNum: Math.floor(prevOffset / limit) + 1,
      })

      prevOffset -= limit

    }

    const [first] = prevPages

    if (first && first.pageNum !== 1) {
      first.jump = true
    }

    let nextOffset = offset + limit

    while (nextOffset <= numTotalResults && nextPages.length <= numAdjacentPages) {

      nextPages.push({
        link:    changeParam(url, `offset`, nextOffset),
        offset:  nextOffset,
        pageNum: Math.floor(nextOffset / limit) + 1,
      })

      nextOffset += limit

    }

    const last = nextPages.at(-1)

    if (last && last.offset !== lastPageOffset) {
      last.jump = true
    }

    // Visible columns
    const requestedColumns = query.get(`columns`)
    const visibleColumns   = requestedColumns
      ? COLUMNS.map(c => c.key).filter(k => requestedColumns.split(`,`).includes(k))
      : DEFAULT_COLUMNS

    // Render page

    Object.assign(context, {
      hasResults: true,
      numResults: results.length.toLocaleString(),
      pagination: {
        currentPage: Math.floor(offset / limit) + 1,
        endIndex:    Math.min(offset + limit, numTotalResults).toLocaleString(),
        links:       {
          firstPage: changeParam(url, `offset`, 0),
          lastPage:  changeParam(url, `offset`, lastPageOffset),
          nextPage:  changeParam(url, `offset`, nextPageOffset),
          prevPage:  changeParam(url, `offset`, prevPageOffset),
        },
        nextPages,
        prevPages,
        show:       numTotalResults > limit,
        startIndex: (offset + 1).toLocaleString(),
      },
      query:        req.query,
      results,
      sort:         Object.fromEntries(sort),
      totalResults: numTotalResults.toLocaleString(),
      visibleColumns,
    })

    res.render(`Search/Search`, context)

  }

  res.format({

    html,

    json() {
      res.json(results)
    },

    csv() {
      const csv = toCSV(results)
      res.type(`csv`)
      res.send(csv)
    },

  })


}

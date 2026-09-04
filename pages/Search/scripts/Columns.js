// columns.js
export const COLUMNS = [
  { key: `displayLanguage`, label: `Language`,    sortable: true  },
  { key: `form`,            label: `Form`,        sortable: true  },
  { key: `UR`,              label: `UR`,          sortable: true  },
  { key: `type`,            label: `Type`,        sortable: true  },
  { key: `sourceGlosses`,   label: `Definition`,  sortable: false },
  { key: `tags`,            label: `Tags`,        sortable: false },
  { key: `subcategory`,     label: `Subcategory`, sortable: true  },
  { key: `sourceForms`,     label: `Forms`,       sortable: false },
  { key: `sourceURs`,       label: `URs`,         sortable: false },
]

export const DEFAULT_COLUMNS = [
  `displayLanguage`,
  `form`,
  `UR`,
  `type`,
  `sourceGlosses`,
]
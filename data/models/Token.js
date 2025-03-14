import CitationKeys from './CitationKeys.js'
import cleanGloss   from '../utilities/cleanGloss.js'
import cleanProto   from '../utilities/cleanProto.js'
import cleanUR      from '../utilities/cleanUR.js'
import parsePages   from '../utilities/parsePages.js'

const citationKeys = new CitationKeys

await citationKeys.load()

export default class Token {
  constructor({
    form,
    gloss,
    language,
    notes,
    orthography,
    PA,
    pages,
    source,
    speaker,
    UR,
  }) {

    const isProto = language.includes(`Proto`)

    this.bibliography = citationKeys.get(source)
    this.orthography  = orthography
    this.source       = source

    if (pages) this.bibliography += `: ${ parsePages(pages) }`

    if (form) {
      this.form = form.normalize()
      if (isProto) this.form = `*` + cleanProto(this.form) // eslint-disable-line prefer-template
    }

    if (gloss) this.gloss     = cleanGloss(gloss)
    if (notes) this.notes     = notes.normalize()
    if (PA) this.PA           = `*` + cleanProto(PA)  // eslint-disable-line prefer-template
    if (speaker) this.speaker = speaker.normalize()
    if (UR) this.UR           = cleanUR(UR)

  }
}

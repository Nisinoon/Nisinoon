import dlx2html              from '@digitallinguistics/dlx2html'
import { ExpressHandlebars } from 'express-handlebars'
import path                  from 'node:path'
import scription2dlx         from '@digitallinguistics/scription2dlx'

const dlxOptions = { errors: true }

const htmlOptions = {
  classes: [`ex`, `igl`],
  glosses: true,
  tag:     `li`,
}

function includes(arr, val) {
  return Array.isArray(arr) && arr.includes(val)
}

function inlineExample(str, language) {
  const lang = language ? `lang='${ language }'` : ``
  return `<i class=inex ${ lang }>${ replaceHyphens(str) }</i>`
}

function interlinear(cssClasses, opts) {

  if (typeof cssClasses !== `string`) {
    opts = cssClasses
  }

  const scription = opts.fn(this)
  const dlx       = scription2dlx(scription, dlxOptions)
  const html      = dlx2html(dlx, htmlOptions)

  return `<ol class='examples ${ cssClasses }'>${ html }</ol>`

}

function is(a, b) {
  return a == b
}

function or(...items) {
  items.pop() // Removes the `options` argument.
  return items.some(Boolean)
}

function translation(str) {
  return `<span class=tln>‘${ str }’</span>`
}

/**
 * Replaces regular hyphens (U+2010) with non-breaking hyphens (U+2011).
 * @param {String} data
 * @returns String
 */
function replaceHyphens(data) {
  return data.replaceAll(`-`, `\u{2011}`)
}

function section(name, opts) {
  this.sections ??= {}
  this.sections[name] = opts.fn(this)
  return null
}


const hbs = new ExpressHandlebars({
  defaultLayout: `main/main.hbs`,
  extname:       `hbs`,
  helpers:       {
    igl:  interlinear,
    includes,
    inex: inlineExample,
    is,
    or,
    section,
    tln:  translation,
  },
  layoutsDir:  path.resolve(import.meta.dirname, `../layouts`),
  partialsDir: [
    path.resolve(import.meta.dirname, `../layouts/main`),
    path.resolve(import.meta.dirname, `../components`),
    path.resolve(import.meta.dirname, `../pages`),
  ],
})

export default hbs
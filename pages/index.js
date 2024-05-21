import { kebabCase, pascalCase } from 'change-case'

export * from './Error/Error.js'

export function page(title) {

  return function handler(req, res) {

    const PascalTitle = pascalCase(title)

    res.render(`${ PascalTitle }/${ PascalTitle }`, {
      cssClass:      kebabCase(title),
      [PascalTitle]: true,
      title,
    })

  }

}

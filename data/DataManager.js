import Components     from './Components.js'
import Drive          from './Drive.js'
import Languages      from './Languages.js'
import ndjson         from '../database/NDJSON.js'
import Orthographies  from './Orthographies.js'
import { outputFile } from 'fs-extra'
import path           from 'node:path'
import ProgressBar    from 'progress'
import { readFile }   from 'node:fs/promises'
import stringifyCSV   from './stringifyCSV.js'
import wait           from '../utilities/wait.js'

export default class DataManager {

  drive = new Drive

  static csvDir = path.resolve(import.meta.dirname, `csv`)

  static jsonDir = path.resolve(import.meta.dirname, `json`)

  /**
   * Convert all the token and component data for all languages and save the data to NDJSON files.
   */
  async convertAllComponents() {

    if (!this.languages) await this.loadLanguages()

    const progressBar = new ProgressBar(`:bar`, {
      total: this.languages.size,
    })

    for (const key of this.languages.keys()) {
      await this.convertLanguageComponents(key)
      progressBar.tick()
    }

  }

  /**
   * Convert all the token and component data for a single language to NDJSON.
   * @param {String} key The key for the language to convert.
   */
  async convertLanguageComponents(key) {

    const componentsPath = path.resolve(DataManager.csvDir, `${ key }/components.csv`)
    const tokensPath     = path.resolve(DataManager.csvDir, `${ key }/tokens.csv`)
    const componentsCSV  = await readFile(componentsPath, `utf8`)
    const tokensCSV      = await readFile(tokensPath, `utf8`)
    const components     = new Components(componentsCSV, tokensCSV, key)
    const jsonPath       = path.resolve(DataManager.jsonDir, `${ key }.ndjson`)

    await ndjson.write(components, jsonPath)

  }

  /**
   * Converts the languages CSV to a Languages map and saves the data to an NDJSON file.
   */
  async convertLanguages() {

    const csvPath = path.resolve(DataManager.csvDir, `languages.csv`)
    const csv     = await readFile(csvPath, `utf8`)

    this.languages = new Languages(csv)

    const jsonPath = path.resolve(DataManager.jsonDir, `languages.ndjson`)

    await ndjson.write(this.languages, jsonPath)

  }

  /**
   * Converts the orthographies CSV and saves the data to an NDJSON file.
   */
  async convertOrthographies() {

    const csvPath = path.resolve(DataManager.csvDir, `orthographies.csv`)
    const csv     = await readFile(csvPath, `utf8`)

    this.orthographies = new Orthographies(csv)

    const jsonPath = path.resolve(DataManager.jsonDir, `orthographies.json`)
    const json     = JSON.stringify(this.orthographies)

    await outputFile(jsonPath, json)

  }

  /**
   * Retrieve all the tokens and components for all languages, convert them, and save them to NDJSON files.
   * NOTE: You'll hit Google's rate limit if you run this without the backoff algorithm.
   */
  async fetchAllComponents() {

    if (!this.languages) await this.loadLanguages()

    const progressBar = new ProgressBar(`:bar`, {
      total: this.languages.size,
    })

    for (const key of this.languages.keys()) {

      let waitTime = 1

      const makeRequest = async () => {
        try {
          await this.fetchLanguageComponents(key)
        } catch (e) {
          if (e?.response?.status === 429) {

            waitTime *= 2
            console.warn(`\nHit rate limit. Retrying after ${ waitTime }ms.`)
            await wait(waitTime)
            await makeRequest()

          } else {
            throw e
          }
        }
      }

      await makeRequest() // Kick off request sequence
      progressBar.tick()

    }

  }

  /**
   * Retrieve all the tokens and components for a language and save the data as separate CSV files.
   * @param {String} language The key for the language whose components to fetch.
   */
  async fetchLanguageComponents(language) {

    const data           = await this.drive.getComponentsData(language)
    const componentsCSV  = stringifyCSV(data.components)
    const tokensCSV      = stringifyCSV(data.tokens)
    const componentsPath = path.resolve(DataManager.csvDir, `${ language }/components.csv`)
    const tokensPath     = path.resolve(DataManager.csvDir, `${ language }/tokens.csv`)

    await outputFile(componentsPath, componentsCSV)
    await outputFile(tokensPath, tokensCSV)

  }

  /**
   * Retrieve the languages data and save it as a CSV file.
   */
  async fetchLanguages() {

    const rows    = await this.drive.getLanguagesData()
    const csv     = stringifyCSV(rows)
    const csvPath = path.resolve(DataManager.csvDir, `languages.csv`)

    await outputFile(csvPath, csv)

  }

  async fetchOrthographiesKey() {

    const csv               = await this.drive.getOrthographiesData()
    const orthographiesPath = path.resolve(DataManager.csvDir, `orthographies.csv`)

    await outputFile(orthographiesPath, csv)

  }

  /**
   * Initialize the data manager.
   */
  initialize() {
    return this.drive.initialize()
  }

  /**
   * Load the languages data from the NDJSON file to a Map.
   */
  async loadLanguages() {

    const jsonPath = path.resolve(DataManager.jsonDir, `languages.ndjson`)
    const data     = await ndjson.read(jsonPath)

    this.languages = data.reduce((map, lang) => {
      map.set(lang.key, lang)
      return map
    }, new Map)

  }

}

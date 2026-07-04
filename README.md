# Nisinoon

Website for the Algonquian Components Project (Nisinoon)

View the project at [Nisinoon.net](https://nisinoon.net).

- [Team Documentation](#team-documentation)
  - [How to Update the Data on the Website Using GitHub](#how-to-update-the-data-on-the-website-using-github)
  - [How to Update Text on the Website Using GitHub](#how-to-update-text-on-the-website-using-github)
- [Developer Documentation](#developer-documentation)
  - [Getting Started](#getting-started)
  - [Bibliography](#bibliography)
  - [Data](#data)
  - [Release \& Versioning](#release--versioning)
  - [Page Variables](#page-variables)
  - [Environment Variables](#environment-variables)

## Team Documentation

### How to Update the Data on the Website Using GitHub

The steps below will update the website with the latest data. In particular, it will:

- Fetch the latest bibliography data from Zotero.
- Fetch the latest components data from Google Sheets.
- Deploy the new data to the website.
- Archive the database with Zenodo.

To start this process, do the following:

1. Go to [this link](https://github.com/dwhieb/Nisinoon/actions/workflows/update.yml).
2. Click the **Run Workflow** button on the right.
3. In the popup that appears, keep the default settings and click the green **Run workflow** button.
4. Then go to [this page](https://github.com/dwhieb/Nisinoon/actions) to watch that the site deployed successfully. You can click into the current run of the "update" process (and then click into "update" once more) for a detailed breakdown of each step in the process as it happens.
5. Once the process is done running, you should be able to immediately see the latest changes to the data reflected on the website.

### How to Update Text on the Website Using GitHub

The following pages can be easily edited on GitHub:

- About
- Bibliography
- Grammar (Algonquian Word-Structure Basics)
- Research

The following pages should **not** be edited manually:

- Error
- Search
- Component

To edit a page, follow these steps:

1. On the [GitHub page](https://github.com/dwhieb/Nisinoon) for the site, find the page you wish to edit inside the `pages/` folder, and click the file with the `.md` extension (e.g. `About.md`).
2. Click the edit icon ✏️ towards the top right.
3. Edit the page content.
   - Pages are written in [Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).
   - HTML is valid Markdown, so you can use HTML tags as well.
   - You can't use Markdown *inside* HTML tags. If you use an HTML tag, everything inside that tag needs to be written in HTML as well.
   - You may see some {{curly braces}}. This is part of a templating language that allows you to inject variables and other data in the page. Avoid editing code within braces.
4. At the top right of the page, click the green **Commit changes...** button. A box will pop up where you can leave a message describing your changes.
   - Choose the **Create a new branch for this commit and start a pull request** option.
   - Click the green **Propose changes** button in the bottom right of the box.
5. A new pull request draft will be started. Click the green **Create pull request** button towards the bottom right.
6. Wait for a developer to review your changes and merge them into the live version of the site.

## Developer Documentation

### Getting Started

1. Clone the repo.
2. Install the project dependencies: `npm install`
3. Set local environment variables by adding a file named `.env` to the project root with the following contents. This file is not checked in to git.

   ```env
   NODE_ENV="localhost"
   PORT=3000
   ```

4. Build the project: `npm run build`
5. Start the local server: `npm start`
   - You should now be able to view the website at `http://localhost:3000`.
   - You can shut down the server with `Ctrl/Cmd + C`.
6. Run tests programmatically: `npm test`
   - This will automatically start a local server and run Cypress tests.
7. Run tests manually:
   1. Start the server: `npm start`
   2. Open Cypress: `npm run open-cypress`
8. Download credentials to access the Google Sheets API:
   1. Get a developer to give you access to Nisinoon's Google Cloud project.
   2. Visit the [Google Cloud APIs page](https://console.cloud.google.com/apis/dashboard?project=nisinoon&supportedpurview=project&show=all).
   3. Click **Credentials** on the left.
   4. Click on the email address of the Nisinoon service account.
   5. Click on **Keys** at the top.
   6. Click **Add key** > **Create new key**, and select JSON for the format.
   7. Save the file that downloads to `data/credentials.json`. This file does not (and should not) be checked into git.
9. Update the database: `npm run update-db`

- This will pull the latest data from Google Sheets, convert it, and store it in the `data` folder.

1. Update the bibliography: `npm run update-bib`

- This will pull the latest data from Zotero (bibliographic software) and use it to create the Bibliography page of the app.

### Bibliography

The `bibliography/` folder contains all the scripts and data needed for building the Bibliography page.

The linguistics stylesheet comes from [here](https://github.com/citation-style-language/styles/blob/master/generic-style-rules-for-linguistics.csl). You can find other stylesheets in that same repository. Zotero seems to use that repo for its list, so you can test out different styles in Zotero.

Creating the bibliography PDF is currently done manually using the Prince PDF UI on a local machine or production versions of the site. It's also possible to create the bibliography PDF during the build process. This involves running a local server, requesting the `/bibliography` page, and running Prince on that page, during the GitHub Actions Workflow.

### Data

The `data/` folder contains all the scripts needed for fetching and transforming the project data for use in the website database.

In order to access files from the Nisinoon project using the Google Drive API, the email address of the Google APIs service account (<nisinoon@nisinoon.iam.gserviceaccount.com>) needs to be given access to those files.

### Release & Versioning

The version number in `package.json` is for the *data*, not the website.

To create a data release for Zenodo:

1. Increment version number (`npm version minor`) and commit the change.
   - Dates and versions in documentation (license, citation) and Express locals (via `meta.json`) are updated automatically when `npm version` is run. (See the `version` script in `package.json`.)
2. Create a release **FROM THE `DATA` BRANCH**.

The above steps are done automatically as part of the `update` workflow.

### Page Variables

| Variable     | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| `{PageName}` | The page name. Used by Handlebars to check for the current page. |
| `cssClass`   | The value to use in `<main class={name}-page>`.                  |
| `title`      | The page title. Will be displayed in the browser tab.            |

### Environment Variables

| Variable   | Description                          |
| ---------- | ------------------------------------ |
| `NODE_ENV` | `localhost` \| `CI` \| `production`  |
| `PORT`     | The port to connect to.              |

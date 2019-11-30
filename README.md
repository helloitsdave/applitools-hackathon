# applitools-hackathon
Applitools Hackathon 2019 - Cypress.io <br>
https://applitools.com <br>
https://www.cypress.io <br>

## Prerequisites
- For cypress.io requirements see https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements
- Clone repo and cd into the applitools-hackathon folder
- Run: `npm install`

## Running Tests via the UI
- Run `npm run applitools:key` or `npm run applitools:key-windows` if on Windows.
- Run `npm run cypress:open`
- Select TraditionalTests.js for the Traditional Test
- Select VisualAITests.js for the Visual Test
Note: The tests have been configured to run against v2 of the app

## Running Tests via the Command Line
- Run `npm run test-traditional`
- Run `npm run test-visual` or `npm run test-visual-windows`

## Results
I have stored the TraditionalTests screenshots and video files to help quickly see the test run. <br>
I would add screenshots and video folders to .gitignore in a real project. <br>
These can be viewed under `./cypress/screenshots` and `./cypress/videos`







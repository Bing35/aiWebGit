A simple website application where you can ask questions to Claude AI and receive answers.

## How to run the website
Add the api key for Anthropic ai into the environment variable `ANTHROPIC_KEY`.

Install the node dependencies
`npm i`

Run the application
`node ./app.mjs`


## Other Information
The repository contains a Linux service file `aiWeb.service` to make the application a service that automatically restarts if it crashes. However, a developer might need to change file location configurations.

There is an Nginx file to host the website on port 80 and 443 inn Linux. It serves as a proxy to the Node.js application. A developer might need to change some configurations.
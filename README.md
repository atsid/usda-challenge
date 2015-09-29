# usda-challenge
ATS + EchoUser submission for USDA Innovation Challenge

# Getting Started

The app uses [gulp](http://gulpjs.com/) to do some builds and run a static server to host the content. To get started:

1. Install [Node.js](https://nodejs.org/) if you don't already have it
1. Clone the git repo to a user-owned directory where you have permissions
1. Get dev dependencies: `npm install`
1. Run code quality checks: `npm test`
1. Run the app: `npm start`

This will serve up the static content at http://localhost:8000/usda-challenge, *and* watch for file changes to automatically refresh itself.

Optional: install gulp so you can execute it directly on the command line: `npm install -g gulp`.
This is optional because `npm test` and `npm start` will get you running, and they map to a local gulp from node_modules.


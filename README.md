# usda-challenge
ATS + EchoUser submission for USDA Innovation Challenge

# Getting Started

## Running Locally 

The app uses [gulp](http://gulpjs.com/) to do some builds and run a static server to host the content. To get started:

1. Install [Node.js](https://nodejs.org/) if you don't already have it
1. Clone the git repo to a user-owned directory where you have permissions
1. Get dev dependencies: `npm install`
1. Run code quality checks: `npm test`
1. Run the app: `npm start`

This will serve up the static content at http://localhost:8000/usda-challenge, *and* watch for file changes to automatically refresh itself.

Optional: install gulp so you can execute it directly on the command line: `npm install -g gulp`.
This is optional because `npm test` and `npm start` will get you running, and they map to a local gulp from node_modules.

## Deployment

We use [Travis-CI](https://travis-ci.org/atsid/usda-challenge) to build the project on every commit to the master branch. Since this currently a completely client-side app, that just means pushing to the live server.
And in this case, 'live server' means automatic free hosting on [GitHub Pages](https://pages.github.com/) by virtue of commits to the repository's `gh-pages` branch.

Deployment uses a gulp task to push to the `gh-pages` branch, where it can be viewed at http://labs.atsid.com/usda-challenge/. You can do it yourself manually on the command line like so:

1. Get dev dependencies: `npm install`
1. Install gulp if you don't have it: `npm install -g gulp`
1. `gulp deploy`

Note again that this process happens automatically by Travis whenever commits are made to master.

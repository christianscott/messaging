# messaging

Requires [node.js](https://nodejs.org/)

# How to run:

```bash
$ git clone https://github.com/chrfrasco/messaging
```
```bash
$ cd messaging && cd app
```

```bash
$ npm install
```
This installs all of the dependencies needed.

```bash
$ gulp
```
This compiles jade and scss files into plain html and css, and also opens a browser window that will reload whenever a file in the /dist/ directory is changed. This page does not connect to the node.js server so the chat functionality is missing.

Then in a new terminal window/tab:
```bash
$ node app
```
and connect to [port 3100](http://localhost:3100) on your machine. Open in several browsers/tabs to see the full effect.

There are several features that I would like to implement in the future:
  - user chosen nicknames
  - make a chat bot so there is always something to interact with
  - rooms

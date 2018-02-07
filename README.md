# DronesDoingDroneThingsThreePointOh

[![Build Status](https://travis-ci.org/ennuuos/DronesDoingDroneThingsThreePointOh.svg?branch=master)](https://travis-ci.org/ennuuos/DronesDoingDroneThingsThreePointOh)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

DronesDoingDroneThings is a project which aims to provide an interface between
node.js, Parrot AR Drones and the user. The goal is to create a server which can
serve things such as controls, scoreboards, debug tools and more.

## Under Development

This project is still in early development, don't expect it to do anything just quite yet.

## Getting Started

These are the instructions for setting up DronesDoingDroneThings on Linux.
Information on how to setup on Windows and MacOS is unavailable at this time.

### NodeJS and NPM

[NodeJS](http://nodejs.org) and [NPM](http://npmjs.com) are required.

#### Debian and Ubuntu based distros

```
$ curl -sL https://dev.nodesource.com/setup_9.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

#### Arch Linux

```
$ pacman -S nodejs npm
```

For more information on installing NodeJS and NPM see
[nodejs.org](https://nodejs.org/en/download/package-manager)
and [npmjs.com](https://docs.npmjs.com/getting-started/installing-node)

### Cloning the repository

Download the zip or use the following git command
```
$ git clone https://github.com/ennuuos/DronesDoingDroneThingsThreePointOh.git
```

### Installing required node modules

The package.json provided with this repository contains a list of required
modules. You can install these with
```
npm install
```
in the root folder.

## Running tests

To running tests on this project is easy as pie! All you have to do is run
```
npm tests
```
in the root folder to run the test suite, which is defined in package.json.

The tests include [Mocha](https://mochajs.org) unit tests as well as
[StandardJS](https://standardjs.com/) style checking.

## Contributors

 - Travis Valenti - [ennuuos](https://github.com/ennuuos)
 - James Wright - [thewrongjames](https://github.com/thewrongjames)

## License

This code is licenced under the [MIT Licence](https://opensource.org/licenses/MIT)

## Acknowledgments

 - Thanks to Andrew Dean of Envisage Software for funding, mentoring and office
 - Thanks to Felix Geisendörfer ([felixge](https://github.com/felixge)) for creating the [node-ar-drone](https://github.com/felixge/node-ar-drone) library
 - Thanks to Billie Thompson ([PurpleBooth](https://github.com/PurpleBooth)) for creating the [readme template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) that we used

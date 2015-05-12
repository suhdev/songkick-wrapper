# songkick-wrapper

[![Build Status](https://secure.travis-ci.org/suhdev/songkick-wrapper.png)](http://travis-ci.org/suhdev/songkick-wrapper)

A node.js wrapper around [songkick's](http://www.songkick.com) [API](http://www.songkick.com/developer).

## Installation

Install using [npm](https://npmjs.org):

    npm install songkick-wrapper

Or clone the GitHub repo:

    git clone https://github.com/suhdev/songkick-wrapper.git

## Usage

After installing/cloning the module, you can open a node console:

    node

and import the module:

    var Songkick = require("songkick-wrapper");

If GitHub repo was used then: 

    var Songkick = require("PATH TO YOUR INSTALLATION");

Create an instance of SongKick using the factory method passing your API key:

    var songKick = SongKick.create("<YOUR API KEY>");

You can request an API key at songkick's [website](http://www.songkick.com/api_key_requests/new).

### Copyright
Copyright (c) 2015 Suhail Abood
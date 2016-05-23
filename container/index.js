'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');
var S = require('string');

module.exports = generators.Base.extend({
  _createProjectFileSystem: function() {
    var sourceRoot = this.sourceRoot();
    var containerRoot = this.containerRoot;
    var containerName = S(this.containerName).capitalize().s;
    var containerRawName = this.options.raw ? this.containerName : containerName;
    var templateContext = {
      containerName: containerName,
      containerRawName: containerRawName
    };
    var containerDir = containerRoot + '/' + containerRawName;
    mkdirp(containerRoot + '/' + containerRawName);


    this.fs.copyTpl(sourceRoot + '/_package.json', containerDir + '/package.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/containerPage.js', containerDir + '/' + containerRawName + '.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/containerPage.scss', containerDir + '/' + containerRawName + '.scss', templateContext);
  },

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('containerName', {
      required: true,
      type: String,
      desc: 'Name of the container',
    });

    this.argument('containerRoot', {
      required: true,
      type: String,
      desc: 'Root of the container',
    });

    this.option('raw', {
      desc: 'Use user input raw format for container name'
    });

    this.log('Creating module ' + this.containerName + '.');
  },

  initializing: function() {
    var message = chalk.bgBlack.bold('\nWelcome to React-Vertical Project\n') + chalk.underline('JS React/Flux Compiler\n');
    this.log(yosay(message));
  },

  configuring: function() {
    this.config.save();
  },

  writing: function() {
    this._createProjectFileSystem();
  },
});

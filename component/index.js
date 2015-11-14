'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');
var S = require('string');

module.exports = generators.Base.extend({
  _createProjectFileSystem: function() {
    var sourceRoot = this.sourceRoot();
    var componentRoot = this.componentRoot;
    var componentName = S(this.componentName).capitalize().s;
    var templateContext = {
      componentName: componentName
    };
    var componentDir = componentRoot + '/' + componentName;
    mkdirp(componentRoot + '/' + componentName);


    this.fs.copyTpl(sourceRoot + '/_package.json', componentDir + '/package.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/ComponentPage.js', componentDir + '/' + componentName + '.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/ComponentPage.scss', componentDir + '/' + componentName + '.scss', templateContext);
  },

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('componentName', {
      required: true,
      type: String,
      desc: 'Name of the component',
    });

    this.argument('componentRoot', {
      required: true,
      type: String,
      desc: 'Root of the component',
    });

    this.log('Creating module ' + this.componentName + '.');
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

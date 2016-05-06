'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');
var S = require('string');

module.exports = generators.Base.extend({
  _createProjectFileSystem: function() {
    var destRoot = this.destinationRoot();
    var sourceRoot = this.sourceRoot();
    var moduleDir = destRoot + '/test/unit/' + this.options.module;
    var templateContext = {
      module: this.options.module,
      action: this.action
    };

    mkdirp(moduleDir + '/actions');

    this.fs.copyTpl(sourceRoot + '/spec.js', moduleDir + '/actions/' + templateContext.action + '.js', templateContext);
  },

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('action', {
      required: true,
      type: String,
      desc: 'Name of the action file',
    });

    this.option('module',  {
      desc: 'Include tests for the component',
      required: true,
      type: String,
      alias: 'm',
      defaults: false,
    });

    // option string caught as string and not boolean.
    // This method validates whether the option value is true or not
    // NOTE if user types anything else in, besides false,
    // the value is still false. May be an issue
    // this.tests = (this.options.tests === 'true' || this.options.tests === true);

    this.log('Creating module ' + this.moduleName + '.');
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

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
    var moduleName = S(this.moduleName).capitalize().s;
    var moduleDir = destRoot + '/src/' + moduleName.toLowerCase();
    var moduleFolders = {
      actions: moduleDir + '/actions',
      components: moduleDir + '/components',
      constants: moduleDir + '/constants',
      containers: moduleDir + '/containers/' + moduleName + 'Page',
      reducers: moduleDir + '/reducers',
    };
    var templateContext = {
      moduleName: moduleName,
      moduleCommonName: moduleName.toLowerCase(),
      moduleActions: moduleName + 'Actions',
      modulePage: moduleName + 'Page',
      moduleConstants: moduleName + 'Constants'
    };

    mkdirp(moduleDir + '/actions');
    mkdirp(moduleDir + '/components');
    mkdirp(moduleDir + '/constants');
    mkdirp(moduleDir + '/containers');
    mkdirp(moduleDir + '/containers/' + moduleName + 'Page');
    mkdirp(moduleDir + '/reducers');

    // Create Test Directory
    // if (this.tests) {
    //   mkdirp(moduleDir + '/components/' + moduleName + 'Page/__tests__');
    // }

    this.fs.copyTpl(sourceRoot + '/ModuleActions.js', moduleFolders.actions + '/' + templateContext.moduleActions + '.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/ModulePage.js', moduleFolders.containers + '/' + templateContext.modulePage + '.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/ModulePage.scss', moduleFolders.containers + '/' + templateContext.modulePage + '.scss', templateContext);
    this.fs.copyTpl(sourceRoot + '/_package.json', moduleFolders.containers + '/package.json', templateContext);
    this.fs.copy(sourceRoot + '/ModuleConstants.js', moduleFolders.constants + '/' + templateContext.moduleConstants + '.js');
    this.fs.copyTpl(sourceRoot + '/ModuleReducer.js', moduleFolders.reducers + '/' + templateContext.moduleCommonName + '.js', templateContext);

    // if (!!this.tests) {
    //   this.fs.copyTpl(sourceRoot + '/ModuleTests.js', moduleFolders.components + '/__tests__/' + moduleName + 'Page-tests.js', templateContext);
    // }
  },

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('moduleName', {
      required: true,
      type: String,
      desc: 'Name of the module',
    });

    // this.option('tests',  {
    //   desc: 'Include tests for the component',
    //   type: Boolean,
    //   alias: 't',
    //   defaults: true,
    // });


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

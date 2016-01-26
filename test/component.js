'use strict';
var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('angular:controller', function () {
	beforeEach(function (done) {
		helpers
			.run(require.resolve('../component'))
			.withArguments('test', 'src/base/components')
			.on('end', done);
	});

	it('generates a new component', function() {
		assert.file('');
	});
});

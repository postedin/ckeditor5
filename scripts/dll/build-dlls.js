#!/usr/bin/env node

/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* eslint-env node */

const childProcess = require( 'child_process' );
const path = require( 'path' );
const chalk = require( 'chalk' );

const ROOT_DIRECTORY = path.resolve( __dirname, '..', '..' );
const IS_DEVELOPMENT_MODE = process.argv.includes( '--dev' );

if ( IS_DEVELOPMENT_MODE ) {
	console.log( '🛠️️  ' + chalk.yellow( 'Development mode is active.' ) );
} else {
	console.log( '⚠️  ' + chalk.magenta( 'Production mode is active.' ) );
}

// --------------------------------------------------------
// -------------------------------------- Main package DLL.

console.log( '\n📍 ' + chalk.cyan.underline( 'Building DLL for the main package...\n' ) );

const webpackArguments = [ '--config=./scripts/dll/webpack.config.dll.js' ];

if ( IS_DEVELOPMENT_MODE ) {
	webpackArguments.push( '--dev' );
}

childProcess.spawnSync( 'webpack', webpackArguments, {
	encoding: 'utf8',
	shell: true,
	cwd: ROOT_DIRECTORY,
	stdio: 'inherit',
	stderr: 'inherit'
} );

// --------------------------------------------------------
// ------------------------------ ckeditor5-* packages DLL.

console.log( '\n📍 ' + chalk.underline( 'Building DLLs for ckeditor5-* packages...\n' ) );

const nodeArguments = [ './scripts/dll/build-packages-dlls.js' ];

if ( IS_DEVELOPMENT_MODE ) {
	nodeArguments.push( '--dev' );
}

childProcess.spawnSync( 'node', nodeArguments, {
	encoding: 'utf8',
	shell: true,
	cwd: ROOT_DIRECTORY,
	stdio: 'inherit',
	stderr: 'inherit'
} );

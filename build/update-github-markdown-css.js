'use strict';

var path = require('path');
var fs = require('fs');

const inputPath = path.join('node_modules', 'github-markdown-css', 'github-markdown.css');
const fullPath = path.join(__dirname, '..', inputPath);


function updateGithubMarkdownCss(input) {
    return `/* Generated from '${inputPath}' */\n`+ input.replace(/\.markdown-body/g, '.vscode-body');
} 


const input = fs.readFileSync(fullPath, 'utf8');

fs.writeFileSync(
    path.join(__dirname, '..', 'github-markdown.css'),
    updateGithubMarkdownCss(input));
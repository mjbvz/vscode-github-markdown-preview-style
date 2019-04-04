'use strict';

var path = require('path');
var fs = require('fs');

const inputPath = path.join('node_modules', 'github-markdown-css', 'github-markdown.css');
const fullPath = path.join(__dirname, '..', inputPath);


function updateGithubMarkdownCss(input) {
    return `/* Generated from '${inputPath}' */\n`+ input.replace(/\.markdown-body/g, '.vscode-body');
}

/**
 * Comments out `font-size: 16px;` so that the `markdown.preview.fontSize` configuration applies.
 */
function enablePreviewFontSize(input) {
    return input.replace(
        // https://regex101.com/r/LL2lma/2
        /(\.vscode-body {[^}]+)(font-size: \d+px;)([^}]+})/s,
        '$1/* $2 */   /* let\'s inherit `markdown.preview.fontSize` */$3'
    );
}


const input = fs.readFileSync(fullPath, 'utf8');

fs.writeFileSync(
    path.join(__dirname, '..', 'github-markdown.css'),
    enablePreviewFontSize(updateGithubMarkdownCss(input))
);

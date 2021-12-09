'use strict';

const path = require('path');
const fs = require('fs');

const markdownCssVariablesRegex = /@media \(prefers-color-scheme: *(\w+)\) \{\n(  (\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)?) \{\n((?:(?!  \})[^\n]*\n)*)  \})\n\}/g;
const markdownCssVariableSelectorRegex = /(?<=@media *\(prefers-color-scheme: *(\w+)\) *\{\n  )(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)?)(?= \{)/g;

const markdownCssRelativePath = path.join('node_modules', 'github-markdown-css', 'github-markdown.css');
const markdownCssAbsolutePath = path.resolve(__dirname, '..', markdownCssRelativePath);

let markdownCssHeader = `/* Generated from '${markdownCssRelativePath}' */`;

let markdownCssInput = fs.readFileSync(markdownCssAbsolutePath, 'utf8').trim()
    .replace(markdownCssVariableSelectorRegex, '.markdown-body.markdown-system');
let markdownCssOutput = markdownCssInput;

let markdownCssVariablesMatch;
do {
    markdownCssVariablesMatch = markdownCssVariablesRegex.exec(markdownCssInput);
    if (markdownCssVariablesMatch) {
        let markdownCssVariableStyle = markdownCssVariablesMatch[2]
            .replace(/^  /gm, '')
            .replace(
                '.markdown-body.markdown-system',
                `.markdown-body.markdown-${markdownCssVariablesMatch[1]},\n`
                + `.vscode-body.vscode-${markdownCssVariablesMatch[1]} .markdown-body.markdown-auto`
            );
        markdownCssOutput = `${markdownCssVariableStyle.trim()}\n\n${markdownCssOutput}`;
    }
} while(markdownCssVariablesMatch)

markdownCssOutput = markdownCssHeader + '\n\n' + markdownCssOutput;

fs.writeFileSync(
    path.join(__dirname, '..', 'dist', 'github-markdown.css'),
    markdownCssOutput
);

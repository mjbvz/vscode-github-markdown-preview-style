'use strict';

const path = require('path');
const fs = require('fs');

const markdownCssVariablesRegex = /@media \(prefers-color-scheme: *(\w+)\) \{\n(  (\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)?) \{\n((?:(?!  \})[^\n]*\n)*)  \})\n\}/g;
const markdownCssVariableSelectorRegex = /(?<=@media *\(prefers-color-scheme: *(\w+)\) *\{\n  )(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)?)(?= \{)/g;

const markdownCssRelativePath = path.join('node_modules', 'github-markdown-css', 'github-markdown.css');
const markdownCssAbsolutePath = path.resolve(__dirname, '..', markdownCssRelativePath);

const markdownCssHeader = `/* Generated from '${markdownCssRelativePath}' */`;

const markdownCssInput = fs.readFileSync(markdownCssAbsolutePath, 'utf8').trim()
    .replace(/\.markdown-body/g, '.github-markdown-body')
    .replace(markdownCssVariableSelectorRegex, '.github-markdown-system');

let markdownCssOutput = markdownCssInput;

let markdownCssVariablesMatch;
while ((markdownCssVariablesMatch = markdownCssVariablesRegex.exec(markdownCssInput))) {
    const markdownCssVariableStyle = markdownCssVariablesMatch[2]
        .replace(/^  /gm, '')
        .replace(
            '.github-markdown-system',
            `.github-markdown-${markdownCssVariablesMatch[1]},\n`
            + `.vscode-body.vscode-${markdownCssVariablesMatch[1]} .github-markdown-auto`
        );
    markdownCssOutput = `${markdownCssVariableStyle.trim()}\n\n${markdownCssOutput}`;
}

markdownCssOutput = markdownCssHeader + '\n\n' + markdownCssOutput;

fs.writeFileSync(
    path.join(__dirname, '..', 'dist', 'github-markdown.css'),
    markdownCssOutput
);

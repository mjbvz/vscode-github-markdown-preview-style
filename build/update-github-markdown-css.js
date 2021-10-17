'use strict';

var path = require('path');
var fs = require('fs');

const GITHUB_THEME_DARK = 'dark';
const GITHUB_THEME_LIGHT = 'light';
const themes = [GITHUB_THEME_LIGHT, GITHUB_THEME_DARK];

function updateGithubMarkdownCss(themes) {
    return themes
        .map(function(theme) {
            const data = {};
            data.theme = theme;
            data.input = path.join('node_modules', 'github-markdown-css', `github-markdown-${theme}.css`);
            data.path = path.join(__dirname, '..', data.input);
            return data;
        })
        .map(generateGithubMarkdownThemeCss)
        .join('\n\n');
}

function generateGithubMarkdownThemeCss(data) {
    const input = fs.readFileSync(data.path, 'utf8').trim()
        .split('.markdown-body')
        .join(data.theme === GITHUB_THEME_DARK ? '.vscode-body.vscode-dark' : '.vscode-body');
    return `/* Generated from '${data.input}' */\n` + input;
}

fs.writeFileSync(
    path.join(__dirname, '..', 'github-markdown.css'),
    updateGithubMarkdownCss(themes)
);

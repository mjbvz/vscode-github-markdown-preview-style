const vscode = require('vscode');

const THEME_CONFIGURATION_ID = 'markdown-preview-github-styles';
const THEME_CONFIGURATION_KEY = 'colorMode';

const THEME_CONFIGURATION_VALUES = {
    'auto': true,
    'system': true,
    'light': true,
    'dark': true,
    'high-contrast': true
}
const THEME_CONFIGURATION_AUTO = 'auto';

let settings = vscode.workspace.getConfiguration(THEME_CONFIGURATION_ID, null);

function getColorMode() {
    return validThemeConfigurationValue(settings.get(THEME_CONFIGURATION_KEY))
}

function validThemeConfigurationValue(theme) {
    return !THEME_CONFIGURATION_VALUES[theme]
        ? THEME_CONFIGURATION_AUTO
        : theme;
}

exports.activate = function() {
    vscode.workspace.onDidChangeConfiguration(function(e) {
        if (e.affectsConfiguration(`${THEME_CONFIGURATION_ID}.${THEME_CONFIGURATION_KEY}`)) {
            settings = vscode.workspace.getConfiguration(THEME_CONFIGURATION_ID, null);
        }
    });

    return {
        extendMarkdownIt(md) {
            return md.use(exports.plugin);
        }
    };
}

exports.plugin = function(md) {
    const render = md.renderer.render;
    md.renderer.render = function() {
        return `<div class="markdown-body markdown-${getColorMode()}">\n${render.apply(md.renderer, arguments)}\n</div>`;
    };
    return md;
}

const vscode = require('vscode');

const THEME_CONFIGURATION_ID = 'markdown-preview-github-styles';
const THEME_CONFIGURATION_KEY = 'colorTheme';

const THEME_CONFIGURATION_VALUES = {
    'auto': true,
    'system': true,
    'light': true,
    'dark': true
}
const THEME_CONFIGURATION_AUTO = 'auto';

function getColorTheme() {
    const settings = vscode.workspace.getConfiguration(THEME_CONFIGURATION_ID, null);
    return validThemeConfigurationValue(settings.get(THEME_CONFIGURATION_KEY))
}

function validThemeConfigurationValue(theme) {
    return !THEME_CONFIGURATION_VALUES[theme]
        ? THEME_CONFIGURATION_AUTO
        : theme;
}

exports.activate = function() {
    return {
        extendMarkdownIt(md) {
            return md.use(plugin);
        }
    };
}

function plugin(md) {
    const render = md.renderer.render;
    md.renderer.render = function() {
        return `<div class="markdown-body markdown-${getColorTheme()}">\n${render.apply(md.renderer, arguments)}\n</div>`;
    };
    return md;
}

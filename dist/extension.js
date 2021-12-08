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

const settings = vscode.workspace.getConfiguration(THEME_CONFIGURATION_ID, null);

let colorMode = validThemeConfigurationValue(settings.get(THEME_CONFIGURATION_KEY));

function validThemeConfigurationValue(theme) {
    return !THEME_CONFIGURATION_VALUES[theme]
        ? THEME_CONFIGURATION_AUTO
        : theme;
}

exports.activate = function() {
    vscode.workspace.onDidChangeConfiguration(function(e) {
        if (e.affectsConfiguration(`${THEME_CONFIGURATION_ID}.${THEME_CONFIGURATION_KEY}`)) {
            colorMode = validThemeConfigurationValue(settings.get(THEME_CONFIGURATION_KEY));
            if (colorMode === THEME_CONFIGURATION_AUTO) {
                switch (vscode.window.activeColorTheme.kind) {
                    case vscode.ColorThemeKind.Dark:
                        colorMode = "dark";
                        break;
                    case vscode.ColorThemeKind.Light:
                        colorMode = "light";
                        break;
                    case vscode.ColorThemeKind.HighContrast:
                        colorMode = "high-contrast";
                        break;
                }
                colorMode = validThemeConfigurationValue(colorMode);
            }
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
        return `<div class="markdown-body markdown-${colorMode}">\n${render.apply(md.renderer, arguments)}\n</div>`;
    };
    return md;
}

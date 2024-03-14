// @ts-check

const vscode = require('vscode');

const themeConfigSection = 'markdown-preview-github-styles';
const themeConfigKey = 'colorTheme';
const lightThemeKey = 'lightTheme';
const defaultLightTheme = 'light';
const darkThemeKey = 'darkTheme';
const defaultDarkTheme = 'dark';

/** @type {Record<string, boolean>} */
const themeConfigValues = {
    'auto': true,
    'system': true,
    'light': true,
    'dark': true,
}
const defaultThemeConfiguration = 'auto';
const validThemes = [
    "light",
    "light_high_contrast",
    "light_colorblind",
    "light_tritanopia",
    "dark",
    "dark_high_contrast",
    "dark_colorblind",
    "dark_tritanopia",
    "dark_dimmed"
]

function getThemeMode() {
    const settings = vscode.workspace.getConfiguration(themeConfigSection, null);
    return validThemeModeValue(settings.get(themeConfigKey))
}

function validThemeModeValue(/** @type {string | undefined} */ theme) {
    return !theme || !themeConfigValues[theme]
        ? defaultThemeConfiguration
        : theme;
}

function getLightTheme() {
    const settings = vscode.workspace.getConfiguration(themeConfigSection, null);
    const lightTheme = settings.get(lightThemeKey);
    return validThemes.includes(lightTheme)
        ? lightTheme
        : defaultLightTheme;
}

function getDarkTheme() {
    const settings = vscode.workspace.getConfiguration(themeConfigSection, null);
    const darkTheme = settings.get(darkThemeKey);
    return validThemes.includes(darkTheme)
        ? darkTheme
        : defaultDarkTheme;
}


exports.activate = function (/** @type {vscode.ExtensionContext} */ctx) {
    ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration(themeConfigSection)) {
            vscode.commands.executeCommand('markdown.preview.refresh');
        }
    }));

    return {
        extendMarkdownIt(/** @type {import('markdown-it')} */ md) {
            return md.use(plugin);
        }
    };
}

function plugin(/** @type {import('markdown-it')} */ md) {
    const render = md.renderer.render;
    md.renderer.render = (...args) => {
        return `<div
            class="github-markdown-body"
            data-color-mode="${getThemeMode()}"
            data-light-theme="${getLightTheme()}"
            data-dark-theme="${getDarkTheme()}"
        >
            <div class="github-markdown-content">${render.apply(md.renderer, args)}</div>
        </div>`;
    };
    return md;
}

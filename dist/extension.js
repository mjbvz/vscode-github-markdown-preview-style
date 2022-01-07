// @ts-check

const vscode = require('vscode');

const themeConfigSection = 'markdown-preview-github-styles';
const themeConfigKey = 'colorTheme';

const themeConfigValues = {
    'auto': true,
    'system': true,
    'light': true,
    'dark': true
}
const defaultThemeConfiguration = 'auto';

function getColorTheme() {
    const settings = vscode.workspace.getConfiguration(themeConfigSection, null);
    return validThemeConfigurationValue(settings.get(themeConfigKey))
}

function validThemeConfigurationValue(theme) {
    return !themeConfigValues[theme]
        ? defaultThemeConfiguration
        : theme;
}

exports.activate = function(/** @type {vscode.ExtensionContext} */ctx) {
    ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e  => {
        if (e.affectsConfiguration(themeConfigSection)) {
            vscode.commands.executeCommand('markdown.preview.refresh');
        }
    }));

    return {
        extendMarkdownIt(md) {
            return md.use(plugin);
        }
    };
}

function plugin(md) {
    const render = md.renderer.render;
    md.renderer.render = function() {
        return `<div class="github-markdown-body github-markdown-${getColorTheme()}">
            <div class="github-markdown-content">${render.apply(md.renderer, arguments)}</div>
        </div>`;
    };
    return md;
}

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import githubMarkdownCss from "generate-github-markdown-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {string} filename
 * @param {string} content
 */
async function saveStyles(filename, content) {
    return fs.writeFile(path.join(__dirname, '../dist', filename), content, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

/**
 * @param {string} themeName
 */
async function generateStyles(themeName) {
    const varStylesheet = await githubMarkdownCss({
        light: themeName,
        dark: themeName,
        onlyVariables: true,
    });

    // base styles for "single" light/dark mode and "auto" editor mode
    const themeRuleStylesheet = varStylesheet.replace(
        /\.markdown-body,\s+\[data-theme="\w+"\]/,
        `[data-color-mode=light][data-light-theme=${themeName}],
[data-color-mode=dark][data-dark-theme=${themeName}],
.vscode-body.vscode-light [data-color-mode=auto][data-light-theme=${themeName}],
.vscode-body.vscode-dark [data-color-mode=auto][data-dark-theme=${themeName}]`
    );

    // media styles for "system" mode
    const prefersLight = `
@media (prefers-color-scheme: light) {
  ${varStylesheet.replace(
      /\.markdown-body,\s+\[data-theme="\w+"\]/,
      `[data-color-mode='system'][data-light-theme=${themeName}]`
  )}
}
`;
    const prefersDark = `
@media (prefers-color-scheme: dark) {
  ${varStylesheet.replace(
      /\.markdown-body,\s+\[data-theme="\w+"\]/,
      `[data-color-mode='system'][data-dark-theme=${themeName}]`
  )}
}
`;
    return themeRuleStylesheet + prefersLight + prefersDark;
}

async function main() {
    console.log("Generating base styles");
    await saveStyles(
        "github-markdown-theme-base.css",
        await githubMarkdownCss({
            onlyStyles: true,
            rootSelector: ".github-markdown-body",
        })
    );

    const themes = [
        "light",
        "dark",
        "dark_dimmed",
        "dark_high_contrast",
        "dark_colorblind",
        "light_colorblind",
        "light_high_contrast",
        "light_tritanopia",
        "dark_tritanopia",
    ];

    for (const theme of themes) {
        console.log("Generating theme variables for theme:", theme);
        await saveStyles(
            `github-markdown-${theme.replace(/_/g, "-")}.css`,
            await generateStyles(theme)
        );
    }

    console.log("Done!");
}

main();

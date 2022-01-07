[![](https://vsmarketplacebadge.apphb.com/version/bierner.markdown-preview-github-styles.svg)](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)

Changes VS Code's built-in markdown preview to match GitHub's styling.

![](https://github.com/mjbvz/vscode-github-markdown-preview-style/raw/master/docs/example.png)

Includes support for both light and dark GitHub themes. By default, the theme type (light vs dark) is selected based on your VS Code theme.

> **❗️ Important**: This extension only styles the Markdown preview. Use [this extension pack](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview) to add support for other GitHub markdown features like `:emoji:` and `- [ ] tasklists`.

# Features

- Preview what your markdown will look like rendered on GitHub.
- Extends VS Code's built-in markdown preview.
- Includes both light or dark Github themes.
- Customize styling using your own [`markdown.styles`](https://code.visualstudio.com/Docs/languages/markdown#_using-your-own-css) css

# Usage

Please see the [VSCode Markdown Preview documentation](https://code.visualstudio.com/Docs/languages/markdown#_markdown-preview)
for instructions on how to use this extension.

# Configuration

This theme is configurable in a similar manner to GitHub's appearance settings.

- `markdown-preview-github-styles.colorTheme`
   Sets the GitHub color theme for the Markdown preview. Default: `auto`.
   - `auto`: Automatically match the editor color theme.
   - `system`: Sync to the system/OS color theme.
   - `light`: Always use the GitHub site's light theme.
   - `dark`: Always use the GitHub site's dark theme.

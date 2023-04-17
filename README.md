[![](https://vsmarketplacebadge.apphb.com/version/bierner.markdown-preview-github-styles.svg)](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles)

Changes VS Code's built-in markdown preview to match GitHub's styling.

![](https://github.com/mjbvz/vscode-github-markdown-preview-style/raw/master/docs/example.png)

Includes support for both light and dark GitHub themes. By default, the theme type (light vs dark) is selected based on your VS Code theme.

> **❗️ Important**: This extension only styles the Markdown preview. Use [this extension pack](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview) to add support for other GitHub markdown features like `:emoji:` and `- [ ] tasklists`.

# Features

- Preview what your markdown will look like rendered on GitHub.
- Extends VS Code's built-in markdown preview.
- Includes all Github themes.
- Customize styling using your own [`markdown.styles`](https://code.visualstudio.com/Docs/languages/markdown#_using-your-own-css) css
  - Make sure you apply your styles to the `.github-markdown-body` instead of just `body` so they don't get overridden by this extension

# Usage

Please see the [VSCode Markdown Preview documentation](https://code.visualstudio.com/Docs/languages/markdown#_markdown-preview)
for instructions on how to use this extension.

# Configuration

This theme is configurable in a similar manner to GitHub's appearance settings.

- `markdown-preview-github-styles.colorTheme`
   Sets the color theme mode for the styling of the Markdown preview. Default: `auto`.
   - `Auto (match editor)`: Automatically match the editor color theme.
   - `System`: Sync to the system/OS color theme.
   - `Single theme: Light`: Always use the selected Light theme.
   - `Single theme: Dar`: Always use the selected Dark theme.

- `markdown-preview-github-styles.lightTheme` and `markdown-preview-github-styles.darkTheme`
   Specify the theme to use when in Light/Dark mode
   Only the matching setting applies when `colorTheme` is in `Single theme` mode.
   - Available themes:
      - Light - `light`
      - Light high contrast - `light_high_contrast`
      - Light Protanopia & Deuteranopia - `light_colorblind`
      - Light Tritanopia - `light_tritanopia`
      - Dark - `dark`
      - Dark high contrast - `dark_high_contrast`
      - Dark Protanopia & Deuteranopia - `dark_colorblind`
      - Dark Tritanopia - `dark_tritanopia`
      - Dark dimmed - `dark_dimmed`

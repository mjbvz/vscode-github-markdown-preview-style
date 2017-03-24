"use strict"

module.exports.activate = () => {
    return {
        extendMarkdownIt(originalMd) {
            const md = Object.assign({}, originalMd);
            md.render = (input) => {
                const result = originalMd.render(input);
                return `<article class="markdown-body">${result}</article>`;
            }
            return md;
        }
    }
}
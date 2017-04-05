"use strict"

module.exports.activate = () => {
    return {
        extendMarkdownIt(md) {
            const oldRender = md.render.bind(md);
            md.render = (input) => {
                const result = oldRender(input);
                return `<article class="markdown-body">${result}</article>`;
            }
            return md;
        }
    }
}
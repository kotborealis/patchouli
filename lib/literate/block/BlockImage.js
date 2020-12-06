module.exports.BlockImage = class BlockImage {
    path = undefined;
    caption = ``;
    label = ``;

    constructor(path) {
        this.path = path;
    }

    toMarkdown() {
        const {label, caption, path} = this;
        return `![${caption}](${path})${label ? `{#fig:${label}}` : ``}`;
    }
};
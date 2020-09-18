module.exports.BlockTable = class BlockTable {
    data = [];
    caption = ``;
    label = ``;

    constructor(data) {
        this.data = data;
    }

    toMarkdown() {
        const md = [];
        md.push(`\\begin{table}[ht]`);
        md.push(`\\centering`);
        md.push(`\\begin{tabular}[t]{|${`c|`.repeat(this.data[0].length)}}`);
        md.push('\\hline');
        this.data.forEach(row => md.push(row.join(` & `) + '\\\\', '\\hline'));
        md.push(`\\end{tabular}`);
        if(this.caption)
            md.push(`\\caption{`);
        if(this.label)
            md.push(`\\label{table:${this.label}}`);
        md.push(`${this.caption.replace(/&/ig, '\\&')}}`);
        md.push(`\\end{table}`);
        return md.join('\n');
    }
};
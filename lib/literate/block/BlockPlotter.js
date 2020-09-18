const {spawn} = require('child_process');
const tmp = require('tmp-promise');
const {BlockImage} = require('./BlockImage');
const debug = require('debug')('patchouli::BlockPlotter');

const convertArray = arr =>
    arr.map(p => p.join(" ") + "\n").join("");

class BlockPlotter {
    plotter = spawn('gnuplot');
    errBuffer = ``;
    outBuffer = ``;
    error = ``;
    finished = false;
    path = undefined;

    constructor() {
        this.plotter.stderr.on('data', e => {
            this.errBuffer += e;
            if(this.errBuffer.indexOf("\n")){
                const lines = this.errBuffer.split("\n");
                this.errBuffer = lines.pop();
                this.error = lines.join("\n");
                debug(this.error);
            }
        });

        this.plotter.stdout.on('data', e => {
            this.outBuffer += e;
            debug(this.outBuffer);
        });

        this.plotter.on('close', () => {
            this.finished = true;
            debug("Closed");
        });

        this.set("terminal", "pdf");

        this.path = tmp.fileSync({postfix: '.pdf'}).name;
        this.set("output", `"${this.path}"`);
        debug("Output to", this.path);
    }

    checkError() {
        if(this.error){
            const error = this.error;
            this.error = ``;
            throw new Error(error);
        }
    }

    write(d) {
        debug("write:", d);
        this.plotter.stdin.write(d);
        this.checkError();
        return this;
    }

    writeLn(d) {
        this.write(d + '\n');
        this.checkError();
        return this;
    }

    set(...args) {
        this.writeLn(`set ` + args.join(' '));
        this.checkError();
        return this;
    }

    plotStr(data) {
        const head = data.map((field, i) => {
            const r = [];
            if(field.data.constructor === String)
                r.push(field.data);
            else
                r.push("'-'");

            if(field.axes !== undefined)
                r.push("axes " + field.axis);

            if(field.title !== undefined)
                r.push(`title "${field.title}"`);
            else
                r.push(`title "${i}"`);

            r.push("with");
            if(field.style)
                r.push(field.style);
            else
                r.push("lines");

            if(field.color)
                r.push(`linecolor rgbcolor "${field.color}"`);

            return r.join(" ");
        }).join(", ") + "\n";

        const body = data.map(field => convertArray(field.data) + "e\n").join("");

        return head + body;
    }

    plot(...data) {
        debug("plot", data);
        this.writeLn(`plot ` + this.plotStr(data));
        this.checkError();
        return this.end();
    }

    splot(...data) {
        this.writeLn(`splot ` + this.plotStr(data));
        this.checkError();
        return this.end();
    }

    end() {
        return new Promise((resolve) => {
            this.writeLn('quit');
            this.plotter.once('close', () => {
                resolve(new BlockImage(this.path));
            });
            if(this.finished)
                resolve(new BlockImage(this.path));
        });
    }
}

module.exports = BlockPlotter;
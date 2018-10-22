# Patchouli

![](./patche.png)

Pandoc wrapper

## Dependencies

* Node 8.0+
* NPM
* Docker

## Installation

Following command will also download docker image (about 3.3GB).

```
npm i kotborealis/patchouli
```

## Usage

```
# Compile file to html:
patchouli file.md

# Compile file to pdf:
patchouli file.md --type pdf

# Compile file to docx
patchouli file.md --type=docx

# Live reload:
patchouli live file.md

# Clean all generated pdf/html files:
patchouli clean
```

Concat files
```
 writing/task ls
00_header.md  01_tasks.md  02_task1.md  03_task2.md  04_task3.md  99_appendix.md
```

Command `patchouli --concat=build.md` will concatenate all `.md` files into `build.md` and compile it to `build.pdf`, removing
`build.md` afterwards.
Pass `--keep-concat` if you want to keep this file.

## Included filters

* [pandoc-svg](https://gist.github.com/jeromerobert/3996eca3acd12e4c3d40)
* [pandoc-crossref](http://lierdakil.github.io/pandoc-crossref/)
* [pandoc-include-code](https://github.com/owickstrom/pandoc-include-code)

## Configuration

This wrapper loads the following configs in the same order and combines them using deep-merge:

* `.../patchouli/.patchouli.js`
* `~/.patchouli.js`
* `$PWD/.patchouli.js`

**TODO: More about configs.**

## Arguments

* `live` --- run live-server and watch files
* `watch` --- watch files
* `clean` --- remove output files
* `--type=html` --- specify output type (html, pdf, tex, docx)
* `--concat=build.md` --- concat files into specified file and then compile it
* `--keep-concat` --- keep concatenated file
* `--keep-tex` --- keep tex file
* `--pandoc-*=?` --- pass `--*=?` argument to pandoc

## Default template

### yaml options

* `figure_H: true` --- adds `[H]` param to figures to keep them in place

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
# Compile file to pdf:
patchouli file.md

# Compile file to html:
patchouli file.md --type html

# Compile file to docx
patchouli file.md --type=docx
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

* [pandoc-crossref](https://lierdakil.github.io/pandoc-crossref/)
* [pandoc-include-code](https://github.com/owickstrom/pandoc-include-code)

## Included latex packages

* [karnaugh-map](https://ctan.org/pkg/karnaugh-map]

## Configuration

This wrapper loads the following configs in the same order and combines them using deep-merge:

* `.../patchouli/.patchouli.js`
* `~/.patchouli.js`
* `$PWD/.patchouli.js`

**TODO: More about configs.**

## Arguments

* `--keep-sources` --- keep `.tex` and concatenated file
* `--pandoc-*=?` --- pass `--*=?` argument to pandoc

## Default template

### yaml options

* `figure_H: true` --- adds `[H]` param to figures to keep them in place
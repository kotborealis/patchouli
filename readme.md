# Patchouli

![](./patche.png)

Pandoc wrapper

## Dependencies

* Node 8.0+
* NPM
* Docker

## Installation

Following command will also download docker image (about 800mb).

```
npm i -g kotborealis/patchouli --unsafe-perm
```

## Usage

```
# Concat and compile all .md files in current directory to pdf:
patchouli

# # Concat and compile all .md files in current directory to docx:
patchouli --type=docx
```

## Included filters

* [pandoc-crossref](https://lierdakil.github.io/pandoc-crossref/)

## Configuration

This wrapper loads the following configs in the same order and combines them using deep-merge:

* `.../patchouli/.patchouli.js`
* `~/.patchouli.js`
* `$PWD/.patchouli.js`

## Default template

See `%My settings` in `docker/resources/default.latex` file.

### yaml options

* `figure_H: true` --- adds `[H]` param to figures to keep them in place

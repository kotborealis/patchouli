# Patchouli

[![](https://images.microbadger.com/badges/image/kotborealis/patchouli.svg)](https://microbadger.com/images/kotborealis/patchouli "Get your own image badge on microbadger.com")

![](./patche.png)

Pandoc wrapper with batteries included! 🔋

## Dependencies

* Node 8.0+
* Docker

## Installation

Installation needs root permissions to pull [kotborealis/patchouli](https://hub.docker.com/r/kotborealis/patchouli) 
docker image. 

```shell script
sudo npm i -g kotborealis/patchouli --unsafe-perm
```

## Usage

Create `.md` files:
```markdown
00_intro.md
10_general.md
90_conclusion.md
99_references.md
```

Patchouli combines all markdown files into a single file.

Build to pdf (`build.pdf` by default):
```shell script
patchouli
```

Specifying output type:
```shell script
patchouli --type=tex
patchouli --type=pdf
patchouli --type=docx
patchouli --type=revealjs
```

Place `.patchouli.js` in the current directory for advanced configuration
```js
module.exports = {
    output: 'desired_output_filename',
    type: 'pdf',
}
```

## Included filters

* [pandoc-crossref](https://lierdakil.github.io/pandoc-crossref/)
    --- pandoc filter for numbering figures, equations, tables and cross-references to them.

## Configuration

Patchouli loads configurations and combines from files named `.patchouli.js` 
located in home and current directory,

## Latex template

See `%My settings` in `docker/resources/default.latex` file for reference.

### New yaml options

* `figure_H: true` --- adds `[H]` param to figures to keep them in place

# Patchouli.js

Pandoc wrapper

## Installation

```
// first of, install haskell platform
// pandoc
sudo apt install pandoc
// pandoc filters
cabal install pandoc-crossref
cabal install pandoc-include-code
// fonts
sudo apt install fonts-cmu
// patchouli
npm i -g patchouli
```

## Usage

Examples:

Compile file to html:
```
patchouli file.md
```

Compile file to pdf:
```
patchouli file.md --type pdf
```

Live editing:
```
patchouli live file.md
```

Clean all generated pdf/html files:
```
patchouli clean
```
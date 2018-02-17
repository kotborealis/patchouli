# Patchouli.js

Pandoc wrapper

## Installation

```
# Build docker image (VERY slow, ~3.66gb)
npm run-script build
# Install wrapper
npm i -g .
```

## Usage

```
# Compile file to html:
patchouli file.md

# Compile file to pdf:
patchouli file.md --type pdf

# Live reload:
patchouli live file.md

# Clean all generated pdf/html files:
patchouli clean
```
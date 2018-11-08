#!/usr/bin/env bash

curl -kL https://github.com/jgm/pandoc/releases/download/2.4/pandoc-2.4-linux.tar.gz \
    | tar -xz --strip-components=1 -C /usr/

curl -kL https://github.com/lierdakil/pandoc-crossref/releases/download/v0.3.3.0/linux-ghc84-pandoc23.tar.gz \
    | tar -xz --strip-components=1 -C /usr/bin/

curl -kL https://github.com/owickstrom/pandoc-include-code/releases/download/v1.2.0.2/pandoc-include-code-linux-ghc8-pandoc-1-19.tar.gz \
    | tar -xz --strip-components=1 -C /usr/bin/
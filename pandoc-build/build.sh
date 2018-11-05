#! /usr/bin/env bash

#docker build . -t kotborealis/patchouli-pandoc-build:latest
docker run --name tmp kotborealis/patchouli-pandoc-build:latest /bin/true
docker cp tmp:/root/.cabal/bin/pandoc .
docker cp tmp:/root/.cabal/bin/pandoc-include-code .
docker cp tmp:/root/.cabal/bin/pandoc-crossref .
docker cp tmp:/root/.cabal/share/x86_64-linux-ghc-8.0.2/pandoc-2.1.3/data ./data/
docker rm tmp

tar -cf pandoc.tar pandoc pandoc-include-code pandoc-crossref
tar -cf pandoc-data.tar data

rm -rf pandoc pandoc-include-code pandoc-crossref data

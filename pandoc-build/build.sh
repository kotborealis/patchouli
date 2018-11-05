#! /usr/bin/env bash

#docker build . -t kotborealis/patchouli-pandoc-build:latest
docker run --name tmp kotborealis/patchouli-pandoc-build:latest /bin/true
docker cp tmp:/root/.cabal/bin/pandoc .
docker cp tmp:/root/.cabal/bin/pandoc-include-code .
docker cp tmp:/root/.cabal/bin/pandoc-crossref .
docker rm tmp

tar -cf pandoc.tar pandoc pandoc-include-code pandoc-crossref

rm pandoc pandoc-include-code pandoc-crossref

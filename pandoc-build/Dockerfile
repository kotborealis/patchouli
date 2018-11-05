FROM haskell:8.0

RUN cabal update
RUN cabal install pandoc
RUN cabal install pandoc-crossref
RUN cabal install pandoc-include-code

RUN which pandoc
RUN which pandoc-crossref
RUN which pandoc-include-code
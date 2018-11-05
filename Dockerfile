FROM ubuntu:xenial
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y \
  && apt-get install -y -o Acquire::Retries=10 --no-install-recommends \
    texlive-xetex \
    texlive-latex-base \
    texlive-math-extra \
    texlive-latex-extra \
    texlive-lang-cyrillic \
    latex-xcolor \
    fonts-cmu \
    lmodern \
    && rm -rf /var/lib/apt/lists/*

#install pandoc
ADD ./pandoc-build/pandoc.tar /root/.cabal/bin/
ADD ./pandoc-build/pandoc-data.tar /root/.cabal/share/x86_64-linux-ghc-8.0.2/pandoc-2.1.3/
ENV PATH="/root/.cabal/bin:${PATH}"

WORKDIR /opt/src
COPY . .

WORKDIR /source

ENTRYPOINT ["/root/.cabal/bin/pandoc"]

CMD ["--help"]
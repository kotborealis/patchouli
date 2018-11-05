FROM ubuntu:xenial
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y \
  && apt-get install -y -o Acquire::Retries=10 --no-install-recommends \
    texlive-latex-base \
    texlive-xetex latex-xcolor \
    texlive-math-extra \
    texlive-latex-extra \
    texlive-fonts-extra \
    texlive-bibtex-extra \
    fontconfig \
    lmodern \
    fonts-cmu \
    curl \
    unzip \
    ttf-mscorefonts-installer \
    texlive-lang-cyrillic \
    && rm -rf /var/lib/apt/lists/*

RUN fc-cache --force --really-force --verbose

#install pandoc
ADD ./pandoc-build/pandoc.tar /root/.cabal/bin/
ADD ./pandoc-build/pandoc-data.tar /root/.cabal/share/x86_64-linux-ghc-8.0.2/pandoc-2.1.3/
ENV PATH="/root/.cabal/bin:${PATH}"

WORKDIR /opt/src
COPY . .

WORKDIR /source

ENTRYPOINT ["/root/.cabal/bin/pandoc"]

CMD ["--help"]
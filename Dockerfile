FROM haskell:8.0

RUN echo "deb http://http.us.debian.org/debian jessie main contrib non-free" >> /etc/apt/sources.list && \
  apt-get update -y \
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
    python-pip \
    curl \
    unzip \
    ttf-mscorefonts-installer \
    texlive-lang-cyrillic \
    && rm -rf /var/lib/apt/lists/*

# install pandocfilters for python
RUN pip install pandocfilters

#install pandoc
ENV PANDOC_VERSION "2.2.1"

RUN cabal update && \
    cabal install pandoc-${PANDOC_VERSION} && \
    cabal install pandoc-crossref --force-reinstalls && \
    cabal install pandoc-include-code --force-reinstalls

RUN fc-cache --force --really-force --verbose

# add cabal bin to path
ENV PATH="/root/.cabal/bin:${PATH}"

WORKDIR /opt/src
COPY . .

WORKDIR /source

ENTRYPOINT ["/root/.cabal/bin/pandoc"]

CMD ["--help"]
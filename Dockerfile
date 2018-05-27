FROM haskell:8.0

# Install thingies from apt
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
    fonts-cmu

# install pip
RUN apt-get install -y python-pip

# install utils
RUN apt-get install -y curl unzip

# install pandocfilters for python
RUN pip install pandocfilters

#install pandoc
ENV PANDOC_VERSION "1.19.2.3"

RUN cabal update
RUN cabal install pandoc-${PANDOC_VERSION}

# install pandoc filters
RUN cabal install pandoc-crossref
RUN cabal install pandoc-include-code

# install times new roman
RUN echo "deb http://http.us.debian.org/debian jessie main contrib non-free" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y ttf-mscorefonts-installer

# install texlive russian
RUN apt-get install texlive-lang-cyrillic 

# https://jdhao.github.io/2017/03/06/Windows-xelatex-slow/
RUN fc-cache -r -v
RUN updmap

# add cabal bin to path
ENV PATH="/root/.cabal/bin:${PATH}"

WORKDIR /opt/src
COPY . .

WORKDIR /source

# update pandoc
ENV PANDOC_VERSION "2.2.1"

RUN cabal update
RUN cabal install pandoc-${PANDOC_VERSION}

ENTRYPOINT ["/root/.cabal/bin/pandoc"]

CMD ["--help"]
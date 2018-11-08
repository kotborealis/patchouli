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
    curl \
    && rm -rf /var/lib/apt/lists/*

ADD ./pandoc-install.sh /tmp
RUN /tmp/pandoc-install.sh

WORKDIR /opt/src
COPY . .

WORKDIR /source

ENTRYPOINT ["/usr/bin/pandoc"]

CMD ["--help"]
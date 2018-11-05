FROM ubuntu:xenial
ENV DEBIAN_FRONTEND noninteractive

RUN apt update -y \
  && apt install -y -o Acquire::Retries=10 --no-install-recommends \
    fontconfig \
    fonts-cmu \
    build-essential \
    wget \
    libfontconfig1 \
  && rm -rf /var/lib/apt/lists/*

RUN fc-cache --force --really-force --verbose

# Install TexLive with scheme-basic
RUN wget http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz; \
    mkdir /install-tl-unx; \
    tar -xvf install-tl-unx.tar.gz -C /install-tl-unx --strip-components=1; \
    echo "selected_scheme scheme-basic" >> /install-tl-unx/texlive.profile; \
    /install-tl-unx/install-tl -profile /install-tl-unx/texlive.profile; \
    rm -r /install-tl-unx; \
    rm install-tl-unx.tar.gz

ENV PATH="/usr/local/texlive/2018/bin/x86_64-linux:${PATH}"

COPY ./tlmgr-install.sh /root/
RUN /root/tlmgr-install.sh

RUN tlmgr install extsizes

ADD ./pandoc-build/pandoc.tar /root/.cabal/bin/
ADD ./pandoc-build/pandoc-data.tar /root/.cabal/share/x86_64-linux-ghc-8.0.2/pandoc-2.1.3/
ENV PATH="/root/.cabal/bin:${PATH}"

WORKDIR /opt/src
COPY resources resources

WORKDIR /source

ENTRYPOINT ["/root/.cabal/bin/pandoc"]

CMD ["--help"]
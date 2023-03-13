FROM kotborealis/docker-texlive-pandoc

RUN apt-get update && apt-get install wget -y
RUN wget http://ftp.de.debian.org/debian/pool/contrib/m/msttcorefonts/ttf-mscorefonts-installer_3.6_all.deb
RUN dpkg -i ttf-mscorefonts-installer_3.6_all.deb || true
RUN apt install -f -y

RUN dpkg -i ttf-mscorefonts-installer_3.6_all.deb

RUN apt-get install ttf-liberation -y

WORKDIR /opt/src
RUN mkdir ./resources/
COPY ./resources/latex-g7-32/  ./resources/latex-g7-32/

RUN apt-get install fontconfig -y
RUN cp ./resources/latex-g7-32/fonts/*.ttf /usr/share/fonts
RUN fc-cache -v -f
RUN luaotfload-tool -f -u -v

COPY ./resources/* ./resources/

WORKDIR /source

CMD ["--help"]

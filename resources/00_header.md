---
numbersections: true
toc: true
lang: ru
papersize: a4
documentclass: extarticle
geometry: margin=2cm
fontsize: 12pt
figPrefix: "рис. "
fontfamilies:
- name: \cyrillicfont
  font: CMU Serif
- name: \cyrillicfonttt
  options: Scale=MatchLowercase
  font: CMU Typewriter Text
header-includes:
  - % nothing!
include-before:
  - \IfFileExists{./title.pdf}{\includepdf[width=\paperwidth,height=\paperheight,pages=-]{title.pdf}}{}
eqnPrefix:
  - "ур."
  - "ур."
figPrefix:
  - "рис."
  - "рис."
tblPrefix:
  - "табл."
  - "табл."
---
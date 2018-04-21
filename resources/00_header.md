---
lang: ru
papersize: a4
documentclass: article
geometry: margin=2.54cm
fontsize: 14pt
figPrefix: "рис. "
fontfamilies:
- name: \cyrillicfont
  font: CMU Serif
- name: \cyrillicfonttt
  options: Scale=MatchLowercase
  font: CMU Typewriter Text
header-includes:
  - \usepackage{caption}
  - \usepackage{mathtools}
  - \usepackage{pdfpages}
  - \captionsetup[figure]{name=Рис.}
  - \captionsetup[table]{name=Табл.}
include-before:
  - \IfFileExists{./title.pdf}{\includepdf[pages=-]{title.pdf}}{}
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
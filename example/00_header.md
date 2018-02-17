---
lang: ru
papersize: a4
documentclass: article
geometry: "left=30mm,right=15mm,top=20mm,bottom=20mm"
fontsize: 14pt
figPrefix: "рис. "
fontfamilies:
- name: \cyrillicfont
  font: Times New Roman
- name: \cyrillicfonttt
  options: Scale=MatchLowercase
  font: Times New Roman
header-includes:
  - \usepackage{caption}
  - \captionsetup[figure]{name=Рис.}
  - \captionsetup[table]{name=Табл.}
  - \usepackage{fancyhdr}
  - \pagestyle{fancy}
  - \fancyhf{}
  - \fancyhead[R]{\thepage}
  - \linespread{1.25}
  - \setlength{\parindent}{1.25pt}
  - \setcounter{page}{2}
  - \usepackage{ragged2e}
  - \justifying
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

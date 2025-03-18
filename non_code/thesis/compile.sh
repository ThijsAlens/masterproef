#!/bin/bash

rm -f *.abs *.aux *.bbl *.blg *.fdb_latexmk *.fls *.log *.out *.synctex.gz *.xmpdata
latexmk -pvc -pdf -interaction=nonstopmode main.tex

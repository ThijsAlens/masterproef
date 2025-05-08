#!/bin/bash

rm -f *.abs *.aux *.bbl *.blg *.fdb_latexmk *.fls *.log *.out *.synctex.gz *.xmpdata
latexmk -pvc -pdf -shell-escape -interaction=nonstopmode main.tex

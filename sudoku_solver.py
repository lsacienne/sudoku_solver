import fonctions_debug as fd
import fonctions_matrices as fm
import numpy as np

variables = []

lines = fm.getLines("helloBoi.txt")
columns = fm.getColumns(lines)
squares = fm.getSquares(lines)

fd.printMatrixWithTitle(lines,"lines")
fd.printMatrixWithTitle(columns,"columns")
fd.printMatrixWithTitle(squares,"squares")

fm.getVariables(lines,variables)
print(variables)
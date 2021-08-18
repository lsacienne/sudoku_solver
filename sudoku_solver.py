import fonctions_debug as fd
import fonctions_matrices as fm
import numpy as np

variables = []

lines = fm.getLines("helloBoi.txt")
columns = fm.getColumns(lines)
squares = fm.getSquares(lines)

#Prints in the command line
fd.printMatrixWithTitle(lines,"lines")
fd.printMatrixWithTitle(columns,"columns")
fd.printMatrixWithTitle(squares,"squares")
variables = fm.getVariables(lines,variables)
print(variables)

fd.printMatrixWithTitle(fm.solveSudoku(variables,lines,columns,squares),"solution")

#matrix = fm.getSystemMatrix(lines,columns,squares,variables)
#fd.printMatrixWithTitle(matrix.oneMatrix, "oneMatrix")
#print("solutionVector : \n",matrix.solutionVector)

#oneMatrix = np.array(matrix.oneMatrix)
#solutionVector = np.array(matrix.solutionVector)
#print(len(matrix.oneMatrix))
#print(len(matrix.oneMatrix[0]))
#print(len(matrix.solutionVector))
#x = np.linalg.lstsq(oneMatrix,solutionVector)

#print(x)
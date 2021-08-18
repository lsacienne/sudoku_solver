import classes as cl
import fonctions_debug as fd
import random as rand


def getLines(fileName):
    f = open(fileName,"r")

    lines = []
    cur_line = []
    temp = f.read().split("\n")
    i = 0
    j = 0

    # Get the elements in the lines
    for element in temp:
        for number in element.split(" "):
            cur_line.append(cl.Case(int(number),j,i))
            j+=1
        lines.append(cur_line.copy())
        cur_line.clear()
        i+=1

    return lines



def getColumns(lines):
    columns = []
    cur_column = []

    # Get the elements in the columns
    for index_column in range(0,9):
        for index_line in range(0,9):
            cur_column.append(lines[index_line][index_column])
        columns.append(cur_column.copy())
        cur_column.clear()
    
    return columns



def getSquares(lines):
    squares = [[0 for i in range(9)] for j in range(9)]

    # Get the elements in the squares
    for i in range(0,9):
        for j in range(0,9):
            x = (i//3)*3+j//3
            y = (i%3)*3+j%3
            squares[x][y] = lines[i][j]
    
    return squares

def getVariables(lines,variables):
    for line in lines:
        for case in line:
            if(case.checkIsVariable()):
                variables.append(case)
    return variables

def getSystemLine(line,variables):
    solution = 45
    lineOfMatrix = [0 for i in range(len(variables))]
    for case in line:
        solution -= case.value
        if case in variables:
            lineOfMatrix[variables.index(case)] = 1
    
    return cl.NumpyLine(lineOfMatrix,solution)

def getOneMatrix(scannedMatrix,oneMatrix,solution,variables):
    for line in scannedMatrix:
        temp = getSystemLine(line,variables)
        if(1 in temp.oneLine):
            oneMatrix.append(temp.oneLine.copy())
            solution.append(temp.solution)
    
def getSystemMatrix(lineMatrix,columnsMatrix,squareMatrix,variables):
    oneMatrix = []
    solution = []

    getOneMatrix(lineMatrix,oneMatrix,solution,variables)
    getOneMatrix(columnsMatrix,oneMatrix,solution,variables)
    getOneMatrix(squareMatrix,oneMatrix,solution,variables)

    return cl.NumpySystem(oneMatrix,solution)



def travelVariables(variables,matrix):
    cur_line = []
    for variable in variables:
        for line in matrix:
            if variable in line:
                cur_line = line
                break
        if len(cur_line) != 0:
            for number in cur_line:
                if(number.value in variable.possibilities):
                    del(variable.possibilities[variable.possibilities.index(number.value)])
        if(len(variable.possibilities) == 1):
            variable.value = variable.possibilities[0]
            del(variable.possibilities[0])
            del(variables[variables.index(variable)])

def solveSudoku(variables,lines,columns,squares):
    lines_copy = []
    columns_copy = []
    squares_copy = []
    iterations = 0
    wait = 0
    variables_length = len(variables)
    previous_variables_length = 0
    while(len(variables) > 0):
        iterations+=1
        previous_variables_length = variables_length

        travelVariables(variables,lines)
        travelVariables(variables,columns)
        travelVariables(variables,squares)

        variables_length = len(variables)
        print("line ",iterations," :\n")
        if(variables_length == previous_variables_length):
            wait+=1
        else:
            wait=0
            fd.printMatrix(lines)

        if(wait > 5):
            lines_copy = makeGridCopy(lines)
            columns_copy = makeGridCopy(columns)
            squares_copy = makeGridCopy(squares)
            chooseWisely(variables)       
    return lines


def makeGridCopy(matrix):
    matrix_copy = []
    for row in matrix:
        matrix_copy.append(row.copy())
    return matrix_copy

def chooseWisely(variables):
    chosen = variables[0]
    for variable in variables:
        print(len(variable.possibilities))
        print(len(chosen.possibilities))
        if((len(variable.possibilities) < len(chosen.possibilities) and len(variable.possibilities) > 0) or len(chosen.possibilities) <= 0):
            chosen = variable
    print(len(chosen.possibilities))
    index_number_chosen = rand.randrange(0,len(chosen.possibilities),1)
    chosen.value = chosen.possibilities[index_number_chosen]
    chosen.possibilities.clear()
    


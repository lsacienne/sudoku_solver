import classes as cl


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
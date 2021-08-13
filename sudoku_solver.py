import numpy as np

f = open("helloBoi.txt","r")

lines = []
cur_line = []
temp = f.read().split("\n")
# Get the elment int the lines
for element in temp:
    for number in element.split(" "):
        cur_line.append(int(number))
    lines.append(cur_line.copy())
    cur_line.clear()

columns = []
cur_column = []




# Get the elements in the columns
for index_column in range(0,9):
    for index_line in range(0,9):
        cur_column.append(lines[index_line][index_column])
    columns.append(cur_column.copy())
    cur_column.clear()

squares = [[0 for i in range(9)] for j in range(9)]
# Get the elements in the squares
for i in range(0,9):
    for j in range(0,9):
        x = (i//3)*3+j//3
        y = (i%3)*3+j%3
        squares[x][y] = lines[i][j]

print("lines : ",lines,"\n")
print("columns : ",columns,"\n")
print("squares : ",squares)
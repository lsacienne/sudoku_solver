class Case:
    def __init__(self,value,x_coord,y_coord) -> None:
        self.value = value
        self.x = x_coord
        self.y = y_coord
    
    def __str__(self) -> str:
        return str(self.value)
    def __repr__(self) -> str:
        return str(self.value)


    def checkIsVariable(self) -> bool:
        return self.value == 0

class NumpyLine:
    def __init__(self,oneLine,solution) -> None:
        self.oneLine = oneLine
        self.solution = solution

class NumpySystem:
    def __init__(self,oneMatrix,solutionVector) -> None:
        self.oneMatrix = oneMatrix
        self.solutionVector = solutionVector

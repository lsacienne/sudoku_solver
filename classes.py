class Case:
    def __init__(self,value,x_coord,y_coord):
        self.value = value
        self.x = x_coord
        self.y = y_coord
    
    def __str__(self):
        return str(self.value)
    def __repr__(self) -> str:
        return str(self.value)


    def checkIsVariable(self):
        return self.value == 0

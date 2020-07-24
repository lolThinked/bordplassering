x = 160
y = 1

output1 = 1
output2 = 1


def sjekkFunksjon(number):
    number= number/160
    number = 1+number
    return number


def test1():
    print(output1*sjekkFunksjon(x))

def test2(inputTall):
    tall = 0
    while(tall <160):
        inputTall = inputTall*sjekkFunksjon(y)
        tall = tall +1
    print(inputTall)

test1()
test2(1)
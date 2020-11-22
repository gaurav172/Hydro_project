import math
def turbidity(y):
    y = float(y)
    if y <= 5:
        return 1
    elif y <= 10:
        return y/5
    else:
        return (y + 43.9) / 34.5

def ph(y):
    y = float(y)
    if y == 7:
        return 1
    elif y > 7:
        return math.exp((y-7.0)/1.082)
    else:
        return math.exp((7.0-y)/1.082)

def color(y):
    y = float(y)
    if y <= 150:
        return (y + 130)/140
    else:
        return y/75

def do(y):
    y = float(y)
    if y < 50:
        return math.exp(-(y - 98.33)/36.067)
    elif y < 100:
        return (y - 107.58)/14.667
    else:
        return (y - 79.543)/19.054

def bod(y):
    y = float(y)
    if y < 2:
        return 1
    else:
        return y/1.5

def tds(y):
    y = float(y)
    if y <= 500:
        return 1
    elif y <= 1500:
        return math.exp((y - 500)/721.5)
    elif y <= 3000:
        return (y - 1000)/125
    else:
        return y/375

def hardness(y):
    y = float(y)
    if y <= 75:
        return 1
    elif y <= 500:
        return math.exp(y + 42.5)/205.58
    else:
        return (y+500)/125

def cl(y):
    y = float(y)
    if y <= 150:
        return 1
    elif y <= 250:
        return math.exp((y/50) - 3)/1.4427
    else:
        return math.exp((y/50) + 10.167)/10.82

def no3(y):
    y = float(y)
    if y <= 20:
        return 1
    elif y <= 50:
        return math.exp((y - 145.16)/76.28)
    else:
        return y/65

def so4(y):
    y = float(y)
    if y <= 150:
        return 1
    else:
        return ((y/50) + 0.375)/2.5121

def coli(y):
    y = float(y)
    if y <= 50:
        return 1
    elif y <= 5000:
        return (y/50)**0.3010
    elif y <= 15000:
        return ((y/50) - 50)/16.071
    else:
        return (y/15000) + 16

def ars(y):
    y = float(y)
    if y <= 0.005:
        return 1
    elif y <= 0.01:
        return y/0.005
    elif y <= 0.1:
        return (y + 0.015)/0.0146
    else:
        return (y + 1.1)/0.15

def f(y):
    y = float(y)
    if y <= 1.2:
        return 1
    else:
        return ((y/1.2) - 0.3819)/0.5083

def calculate_wpi(wpi_data):
    wpi = 0
    tot = 0

    if 'turbidity' in wpi_data and wpi_data['turbidity'] != '':
        wpi += turbidity(wpi_data['turbidity'])
        tot += 1
    if 'ph' in wpi_data and wpi_data['ph'] != '':
        wpi += ph(wpi_data['ph'])
        tot += 1
    if 'color' in wpi_data and wpi_data['color'] != '':
        wpi += color(wpi_data['color'])
        tot += 1
    if 'do' in wpi_data and wpi_data['do'] != '':
        wpi += do(wpi_data['do'])
        tot += 1
    if 'bod' in wpi_data and wpi_data['bod'] != '':
        wpi += bod(wpi_data['bod'])
        tot += 1
    if 'tds' in wpi_data and wpi_data['tds'] != '':
        wpi += tds(wpi_data['tds'])
        tot += 1
    if 'hardness' in wpi_data and wpi_data['hardness'] != '':
        wpi += hardness(wpi_data['hardness'])
        tot += 1
    if 'cl' in wpi_data and wpi_data['cl'] != '':
        wpi += cl(wpi_data['cl'])
        tot += 1
    if 'no3' in wpi_data and wpi_data['no3'] != '':
        wpi += no3(wpi_data['no3'])
        tot += 1
    if 'so4' in wpi_data and wpi_data['so4'] != '':
        wpi += so4(wpi_data['so4'])
        tot += 1
    if 'coli' in wpi_data and wpi_data['coli'] != '':
        wpi += coli(wpi_data['coli'])
        tot += 1
    if 'as' in wpi_data and wpi_data['as'] != '':
        wpi += ars(wpi_data['as'])
        tot += 1
    if 'f' in wpi_data and wpi_data['f'] != '':
        wpi += f(wpi_data['f'])
        tot += 1

    if tot == 0:
        return "None", "Please insert at least one value"

    wpi_index = wpi/tot
    wpi_index = round(wpi_index, 3)
    if wpi_index <= 1:
        return wpi_index, "Excellent"
    elif wpi_index <= 2:
        return wpi_index, "Acceptable"
    elif wpi_index <= 4:
        return wpi_index, "Slightly Polluted"
    elif wpi_index <= 8:
        return wpi_index, "Polluted"
    else:
        return wpi_index, "Highly Polluted"
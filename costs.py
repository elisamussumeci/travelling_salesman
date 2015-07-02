__author__ = 'elisa'

import pandas as pd
import numpy as np
import data

index = ['Ushuaia', 'El Calafate', 'Bariloche', 'Santiago', 'Buenos Aires', 'Montevideo', 'Punta del Leste',
         'Vina del Mar', 'Valparaiso', 'Atacama', 'Uyuni', 'La Paz', 'Cusco', 'Assuncao']

iu1 = np.triu_indices(14, 1)

cost_index = np.zeros((14, 14))
cost_index[iu1] = range(0,91)

df = pd.DataFrame(data=cost_index, index=index, columns=index)


# input: [(value, time, type),(value, time, type),...,(value, time, type)]
# type = ['bus', 'plane', 'train']
def costs(list_of_possib):
    list_of_costs = [((possib[1] * 100) + possib[0], possib[2]) for possib in list_of_possib]
    best = min(list_of_costs)
    return best


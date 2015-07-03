import pandas as pd
import numpy as np
from data.dados import dict_of_possib

index = ['Ushuaia', 'El Calafate', 'Bariloche', 'Santiago', 'Buenos Aires', 'Montevideo', 'Punta del Leste',
         'Vina del Mar', 'Valparaiso', 'San Pedro de Atacama', 'Uyuni', 'La Paz', 'Cusco', 'Assuncao']

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


def create_cost_matrix(df, dict_of_possib, index):
    costs_df = pd.DataFrame(index=index)
    type_df = pd.DataFrame(index=index)
    for pos, i in enumerate(index):
        cost_column = []
        type_column = []
        for key in df[i][:pos]:
            value = costs(dict_of_possib[int(key)])
            cost_column.append(value[0])
            type_column.append(value[1])
        costs_df[i] = cost_column + [0]*(14-len(cost_column))
        type_df[i] = type_column + [0]*(14-len(type_column))
    return costs_df, type_df

total_costs, types = create_cost_matrix(df, dict_of_possib, index)

total_costs.to_csv('./data/total_costs.csv')
types.to_csv('./data/transp.csv')

import pandas as pd


def consult(df, i, j):
    if i == j:
        ans = 100000
    elif df[i][j] == 0.0:
        ans = df[j][i]
    else:
        ans = df[i][j]
    return ans


def trip_costs(index_trip, total_costs):
    shape = len(index_trip)
    dit = {}
    df_index = pd.DataFrame(index=range(1, shape+1))
    for pos, i in enumerate(index_trip):
        l = []
        for j in index_trip[:pos+1]:
            cost = consult(total_costs, i, j)
            l.append(cost)
        df_index[pos+1] = l + [0]*(shape-len(l))
        dit[pos+1] = i
    df_index = df_index + df_index.T
    return df_index, dit


def create_ampl_dat(df_trip, dit):
    file = open('./ampl/dados.dat', 'w')
    file.write('data;\n'
               '\n'
               'param: city: names :=\n')
    for i in dit:
        file.write(str(i)+' "'+dit[i]+'"\n')
    file.write(';\n'
               '\n')
    columns = [str(n) for n in df_trip.columns]
    file.write('param DIST: '+' '.join(columns)+' :=\n')
    for j in df_trip:
        line = [str(int(n2)) for n2 in df_trip[:][j]]
        file.write(str(j) + ' ' + ' '.join(line) + '\n')
    file.write(';')
    file.close()


def read_output(dit):
    cost = None
    store_next_lines = False
    paths = []
    with open('./ampl/output.txt', 'r') as file:
        for i, line in enumerate(file):
            if i == 0:
                cost = int(line.split('=')[1][1:])
                continue
            if 'x :=' in line:
                store_next_lines = True
                continue
            if ';' in line:
                break
            if store_next_lines:
                values = line.split(' ')
                if values[4] == '1\n':
                    paths.append((dit[int(values[0])], dit[int(values[1])]))

    return cost, paths


def get_path(dit, transp):
    cost, paths = read_output(dit)
    path = []
    for i, path in enumerate(paths):
        if i+1 > len(paths)-1:
            break

        transport = transp[path[0]][path[1]]
        if transport == '0':
            transport = transp[path[1]][path[1]]

        currentPath = {
            "from": path[0],
            "to": path[1],
            "transport": transport
        }
        path.append(currentPath)

    return cost, path

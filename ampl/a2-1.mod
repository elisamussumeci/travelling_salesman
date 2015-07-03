set city;
var U{city} >= 0 integer;
param DIST{city, city} >= 0;
var x{city,city} binary;
param N := card(city);
param names{city} symbolic;

minimize z:
        sum{i in city, j in city} DIST[i,j]*x[i,j];

subject to 
        # exactly one outgoing
        c1{k in city}: sum{i in city} x[i,k] = 1;

        # exactly one incoming
        c2{k in city}: sum{j in city} x[k,j] = 1;

        # no subtours
        c3{k in city, j in city: j > 1 and k > 1}:  
           U[j] - U[k] + N*x[j,k] <= N-1;
           

// Seleciona uma cidade
function selectCity(cityName) {
  // Verifica se a cidade ja existe no array de cidades selecionadas
  var cityIsIncluded = false;
  selectedCities.forEach(function(city) {
    if (city === cityName) {
      cityIsIncluded = true;
    }
  });

  // Adiciona caso não esteja no array
  if (cityIsIncluded === false) {
    selectedCities.push(cityName);
  }
}

// Deseleciona uma cidade
function deselectCity(cityName) {
  var newArray = [];

  // Criamos um novo array sem a cidade
  selectedCities.forEach(function(city) {
    if (city !== cityName) {
      newArray.push(city);
    }
  });

  selectedCities = newArray;
}

// Devolve:
// [[<lat da cidade a>, <lng da cidade a>], [<lat da cidade b>, lng da cidade b]]
function getPath(cityA, cityB) {
  var coordA = cityDict[cityA].geometry.coordinates;
  var coordB = cityDict[cityB].geometry.coordinates;

  return [coordA, coordB];
}

// Pega os pontos entre as cidades
function getFullPath(cityArray) {
  var path = [];

  for (var i=0; i<cityArray.length; i++) {
    // Pega o ponto entre a cidade atual e a proxima
    // Se for a ultima nao pega
    if (i+1 < cityArray.length) {
      path.push(getPath(cityArray[i], cityArray[i+1]));
    }
  }

  return path;
}

// Desenha a linha entre dois pontos
function drawLine(path) {
  return L.geoJson({
    type: 'Feature',
    name: "caminho",
    geometry: {
        type: 'LineString',
        coordinates: path
    },
    properties: {
    "stroke": "#ff8888",
    "stroke-opacity": 1,
    "stroke-width": 4,
    }
  }, { style: L.mapbox.simplestyle.style }).addTo(map);
}

// Desenha toda as linhas entre as cidades
function drawRoute(cityArray) {
  var lines = [];

  var fullPath = getFullPath(cityArray);
  fullPath.forEach(function(path) {
    lines.push(drawLine(path));
  })

  return lines;
}

// Colore cidade selecionada
function colorCity(e) {
  // Cidade selecionada
  var cityProp = e.layer.feature.properties;

  // Se já tiver colorido, então descolore
  if (cityProp['marker-color'] === '#ff8888') {
    cityProp['marker-color'] = cityProp['old-color'];
    deselectCity(cityProp.city);
  } else {
    // Colore
    cityProp['old-color'] = cityProp['marker-color'];
    cityProp['marker-color'] = '#ff8888';
    selectCity(cityProp.city);
  }

  map.featureLayer.setGeoJSON(geoJSON);
}

// Tira a cor de todos os icones
function resetColors() {
  for (var i = 0; i < geoJSON.length; i++) {
    geoJSON[i].properties['marker-color'] = geoJSON[i].properties['old-color'];
  }
  map.featureLayer.setGeoJSON(geoJSON);
}

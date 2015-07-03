var selectedCities = [];

function selectCity(cityName) {
  var cityIsIncluded = false;
  selectedCities.forEach(function(city) {
    if (city === cityName) {
      cityIsIncluded = true;
    }
  });

  if (cityIsIncluded === false) {
    selectedCities.push(cityName);
  }
}

function deselectCity(cityName) {
  var newArray = [];

  selectedCities.forEach(function(city) {
    if (city !== cityName) {
      newArray.push(city);
    }
  });

  selectedCities = newArray;
}

function getPath(cityA, cityB) {
  var coordA = cityDict[cityA].geometry.coordinates;
  var coordB = cityDict[cityB].geometry.coordinates;

  return [coordA, coordB];
}

function getFullPath(cityArray) {
  var path = [];

  for (var i=0; i<cityArray.length; i++) {
    if (i+1 < cityArray.length) {
      path.push(getPath(cityArray[i], cityArray[i+1]));
    }
  }

  return path;
}

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

function drawRoute(cityArray) {
  var lines = [];

  var fullPath = getFullPath(cityArray);
  fullPath.forEach(function(path) {
    lines.push(drawLine(path));
  })

  return lines;
}

// Tudo que roda dessa função depende da variável geoJSON
// ela so esta preenchida depois de (1)
function init() {

  // Muda a cor do icone quando clica
  map.featureLayer.on('click', function(e) {
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
  });
}

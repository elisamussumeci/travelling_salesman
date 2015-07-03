var selectedCities = [];

function selectCity(cityName) {
  // Verifica se cidade ja foi adicionada
  for (cityIndex in selectedCities) {
    var city = selectedCities[cityIndex];
    if (city == cityName) {
      return;
    }
  }

  selectedCities.push(cityName);
}

function getPath(cityA, cityB) {
  var cityACoords = cityDict[cityA].geometry.coordinates;
  var cityBCoords = cityDict[cityB].geometry.coordinates
  return [cityACoords, cityBCoords];
}

function drawRoute(cityA, cityB) {
  var path = getPath(cityA, cityB);

  var line = L.geoJson({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: path
      },
      properties: {
      "stroke": "#ff8888",
      "stroke-opacity": 1,
      "stroke-width": 4,
      }
    }, { style: L.mapbox.simplestyle.style }
  );

  line.addTo(map);

}

// Tudo que roda dessa função depende da variável geoJSON
// ela so esta preenchida depois de (1)
function init() {

  // Muda a cor do icone quando clica
  map.featureLayer.on('click', function(e) {
    // Se já tiver colorido, então descolore
    if (e.layer.feature.properties['marker-color'] === '#ff8888') {
      e.layer.feature.properties['marker-color'] = e.layer.feature.properties['old-color'];
      deselectCity(e.layer.feature.properties.city);
    } else {
      // Colore
      e.layer.feature.properties['old-color'] = e.layer.feature.properties['marker-color'];
      e.layer.feature.properties['marker-color'] = '#ff8888';
      selectCity(e.layer.feature.properties.city);
    }
    map.featureLayer.setGeoJSON(geoJSON);
  });
}

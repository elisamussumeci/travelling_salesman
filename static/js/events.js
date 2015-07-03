
// Pega o geoJSON que vem do mapbox.com
map.featureLayer.on('ready', function(e) {
  map.featureLayer.eachLayer(function(layer) {
    var city = layer.toGeoJSON();
    // Tira a descrição que ele ta mandando
    city.properties.description = null;
    cityDict[city.properties.city] = city;
    geoJSON.push(city);
  });

});

// Mostra o nome da cidade quando passa o mouse em cima
map.featureLayer.on('mouseover', function(e) {
  e.layer.openPopup();
});
map.featureLayer.on('mouseout', function(e) {
  e.layer.closePopup();
});

// Colore e seleciona cidade quando clica nela
map.featureLayer.on('click', colorCity);

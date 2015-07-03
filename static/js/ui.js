// Tira a cor de todos os icones
function resetColors() {
  for (var i = 0; i < geoJSON.length; i++) {
    geoJSON[i].properties['marker-color'] = geoJSON[i].properties['old-color'];
  }
  map.featureLayer.setGeoJSON(geoJSON);
}

// Quando clica no mapa, tira a cor de todos os ícones
map.on('click', resetColors);

// Mostra o nome da cidade quando passa o mouse em cima
map.featureLayer.on('mouseover', function(e) {
  e.layer.openPopup();
});
map.featureLayer.on('mouseout', function(e) {
  e.layer.closePopup();
});

linesLayer = [];

document.querySelector('#compute').onclick = function() {
  linesLayer = drawRoute(selectedCities);

  return false;
};

document.querySelector('#reset').onclick = function() {
  map.removeLayer(linesLayer);

  return false;
};

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

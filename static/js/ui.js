
// Pega o menor caminho quando clica no botão
document.querySelector('#compute').onclick = function() {
  linesLayer = drawRoute(selectedCities);

  map.featureLayer.off('click', colorCity);

  return false;
};

// Reinicia mapa
document.querySelector('#reset').onclick = function() {
  linesLayer.forEach(function(layer) {
    map.removeLayer(layer);
  });

  selectedCities = [];
  resetColors();

  map.featureLayer.on('click', colorCity);

  return false;
};

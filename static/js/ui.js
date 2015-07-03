
// Pega o menor caminho quando clica no botão
document.querySelector('#compute').onclick = function() {
  $.ajax({
    url: '/cities',
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({cities: selectedCities})
  }).success(function(data) {
    // Desenha linhas
    linesLayer = drawRoute(data.path);

    // Escreve o custo
    $('#value').text(data.cost);

    // Desliga seleção de cidades
    map.featureLayer.off('click', colorCity);
  });

  return false;
};

// Reinicia mapa
document.querySelector('#reset').onclick = function() {
  // Retira as linhas do mapa
  linesLayer.forEach(function(layer) {
    map.removeLayer(layer);
  });

  // Apaga o custo
  $('#value').text('-');

  // Reinicia array de cidades selecionadas
  selectedCities = [];

  // Descolore as cidades
  resetColors();

  // Escuta eventos de seleção de cidade novamente
  map.featureLayer.on('click', colorCity);

  return false;
};

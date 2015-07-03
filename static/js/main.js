L.mapbox.accessToken = 'pk.eyJ1IjoiYnJlbm9jYWxhemFucyIsImEiOiI0YTBjN2M5NWQzNjJkODJlYzQyYjk5YTQ0NGE5NmIxNiJ9.GAoDtuWblQorGcnnSvVrJQ';
// Create a map in the div #map
var map = L.mapbox.map('map', 'brenocalazans.023fec18');

// Disabilita algumas funcionalidades
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

var geoJSON = [];
var cityDict = {};

// (1) Pega o geoJSON que vem do mapbox.com
map.featureLayer.on('ready', function(e) {
  map.featureLayer.eachLayer(function(layer) {
    var city = layer.toGeoJSON();
    // Tira a descrição que ele ta mandando
    city.properties.description = null;
    cityDict[city.properties.city] = city;
    geoJSON.push(city);
  });

  init();
});

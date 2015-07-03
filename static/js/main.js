L.mapbox.accessToken = 'pk.eyJ1IjoiYnJlbm9jYWxhemFucyIsImEiOiI0YTBjN2M5NWQzNjJkODJlYzQyYjk5YTQ0NGE5NmIxNiJ9.GAoDtuWblQorGcnnSvVrJQ';
// Create a map in the div #map
var map = L.mapbox.map('map', 'brenocalazans.023fec18');

// Desabilita algumas funcionalidades
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Variaveis globais
var geoJSON = [];
var cityDict = {};
var selectedCities = [];
var linesLayer = [];

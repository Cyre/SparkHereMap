
function loadJSON(file, callback) {
  var ajax = new XMLHttpRequest();
  ajax.overrideMimeType("application/json");
  ajax.open('GET',file,true);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == "200") {
      callback(ajax.responseText);
    }
  }
  ajax.send(null);
}

function load(path) {
  loadJSON(path, function(response) {
    json = JSON.parse(response);
    // Aqui usar el JSON
    var map1 = createDefaultMap(platform, "map1", defaultLayers, pixelRatio);
    var map1UI = mapUI(map1, defaultLayers);
    var map2 = createDefaultMap(platform, "map2", defaultLayers, pixelRatio);
    var map2UI = mapUI(map2, defaultLayers);
    synchronizeMaps(map1, map2);
    populateMap(json, map1, map1UI);
    populateMap(json, map2, map2UI, true);
  });
}

function synchronizeMaps(first, second) {
  var viewModel1 = first.getViewModel();
  var viewModel2 = second.getViewModel();
  first.addEventListener('mapviewchange', function() {
    console.log(viewModel1);
    viewModel2.setCameraData(viewModel1.getCameraData());
  });
}

function addMarkerToGroup(group, coord, html) {
  var marker = new H.map.Marker(coord);
  marker.setData(html);
  group.addObject(marker);
}

function populateMap(data, map, ui, prediction=false) {
  var group = new H.map.Group();
  map.addObject(group);
  group.addEventListener('tap', function (evt) {
    console.log('tap');
      var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
        content: evt.target.getData()
      });
      ui.addBubble(bubble);
  }, false);
  for (var i = 0; i < data.length; i++) {
    var coords = {lat:data[i]["lat"], lng: data[i]["lng"]}
    if (!prediction) {
      addMarkerToGroup(group, coords, '<div>Velocidad Media: ' + data[i]["vmed"] + ' Km/h.</div>');
    } else {
      addMarkerToGroup(group, coords, '<div>Velocidad Media: ' + data[i]["prediction"].toPrecision(4) + ' Km/h.</div>');
    }
  }
}

// Instantiate (and display) a map object:
function createDefaultMap(platform, elementId, defaultLayers, pixelRatio) {
  var map = new H.Map(
    document.getElementById(elementId),
    defaultLayers.normal.map,
    {
      zoom: 11,
      center: { lng: -3.71413519042963, lat: 40.442146628756845 },
      pixelRatio: pixelRatio
    }
  );
  // Enable the event system on the map instance:
  // Instantiate the default behavieor, providing the mapEvents object:
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  return map;
}

function mapUI(map, defaultLayers) {
  // create default UI with layers provided by the Platform
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  return ui;
}

// Load JSON data
load("/data/result.json");
// Initialize the platform object:
var platform = new H.service.Platform({
  "app_id": "",
  "app_code": ""
});
// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});
//var test2 = createDefaultMap(platform, "map-container2");

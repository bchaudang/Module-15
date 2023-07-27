// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  });

// Marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 4;
};

// Change marker colours depending on depth
function chooseColour(depth) {
  if (depth < 10) return "#7dff52";
  else if (depth < 30) return "#d4ff52";
  else if (depth < 50) return "#ffd452";
  else if (depth < 70) return "#ffa852";
  else if (depth < 90) return "#ff7d52";
  else return "#ff5050";
}

// Add legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90];
        title = "<h2>Depth of Earthquake"
        

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColour(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(myMap);

 // Features for the map 
  function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
      // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,   
      
      // Marker options
      pointToLayer: function(feature, latlng) {
        var markerOptions = {
          radius: markerSize(feature.properties.mag),
          color: chooseColour(feature.geometry.coordinates[2]),
          fillOpacity: 0.5,
          stroke: true,
          weight: 2.25,
        } 
      
        return L.circleMarker(latlng, markerOptions);
      }
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // Create the base layers.  
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
    legend.addTo(myMap);
  };


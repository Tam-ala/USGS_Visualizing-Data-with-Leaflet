// get the query url to get data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create function for marker size to make it visable on map
function markerSize(mag) {
    return mag * 20000;
}

// create function for marker color based on magnitude
function colorMag(mag) {
    if (mag < 1) {
        return "#99d594"
    }
    else if (mag < 2) {
        return "#e6f598"
    }
    else if (mag < 3) {
        return "#ffffbf"
    }
    else if (mag < 4) {
        return "#fee08b"
    }
    else if (mag < 5) {
        return "#fc8d59"
    }
    else {
        return "#800000"
    }
}

// perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    // send the data.features object to the createFeatures function after getting a response
    createFeatures(data.features);
});

// define createFeatures function
function createFeatures(earthquakeData) {
    // create a GeoJSON layer containing the features array on the earthquakeData object  
    var earthquakes = L.geoJSON(earthquakeData, {
        // run the onEachFeature function once for each piece of data in the array
        onEachFeature: function onEachFeature1(features, layer) {
            // give each feature a popup describing the place, time, and magnitude of the earthquake
            layer.bindPopup("<h3>" + features.properties.place + "</h3><hr><p>"
                + new Date(features.properties.time) + "</p><hr>"
                + "<h3> Magnitude: " + features.properties.mag + "</h3>")
        },
        // return a cirlce marker
        pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,
                {
                    radius: markerSize(feature.properties.mag),
                    fillColor: colorMag(feature.properties.mag),
                    color: "#000",
                    fillOpacity: 0.80,
                    stroke: false,
                })
        }

    });

    // call function to display the map
    createMap(earthquakes);
}

// define createMap function
function createMap(earthquakes) {

    // define streetmap, darkmap, and satellite layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });


    // define a baseMaps object to hold base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap,
        "Satellite Map": satelliteMap
    };

    // create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // create map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [37.09, -95.71], zoom: 5, layers: [streetmap, earthquakes]
    });

    // create a layer control that includes baseMaps and overlayMaps
    // add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        var grades = [0, 1, 2, 3, 4, 5];

        // Add legend name in include it in innerhtml
        var legendInfo = "<h1>Earthquake Magnitude</h1>";
        div.innerHTML = legendInfo

        // make for-loop to include style for the legend and magnitude scale
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + colorMag(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        // displays the legend at element location
        return div;

    };

    // Adding legend to the map
    legend.addTo(myMap);

};
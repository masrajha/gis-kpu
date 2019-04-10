class GIS {
    constructor(jsonFile, map) {
        this.jsonFile = jsonFile;
        this.map = map;
    }
    setJSONFile(url) {
        this.jsonFile = url;
    }
    loadData(div = null) {
        map = this.map;
        $.getJSON(this.jsonFile, function(json) {
            // console.log(json); // this will show the info it in firebug console
            data = json;
            map.data.addGeoJson(json);
            map.data.forEach(function(f) {
                console.log(f);
            });

            map.data.setStyle(function(feature) {
                return /** @type {google.maps.Data.StyleOptions} */ ({
                    fillColor: feature.getProperty('color'),
                    strokeWeight: 1
                });
            });

            map.data.addListener('click', function(event) {
                let content = event.feature.getProperty('description').replace(/\s+/g, " ");
                console.log(content)
                if (div)
                    document.getElementById(div).textContent = content;

                var infowindow = new google.maps.InfoWindow();

                infowindow.setContent(content);
                infowindow.setPosition(event.feature.getGeometry().get());
                infowindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
                infowindow.open(map);
            });
        });
    }
}
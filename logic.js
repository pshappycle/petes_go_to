mapboxgl.accessToken = API_KEY;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-74.01, 40.71] /*longitude and then latitude*/,
  zoom: 10,
});

// Add the control to the map.
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);

const myRequest = new Request("./transformation.json");

async function getMark() {
  fetch(myRequest)
    .then((response) => response.json())
    .then((data) => {
      const club = data.filter((club) => club.Type === "Club");
      const resturant = data.filter((rest) => rest.Type === "Resturant");
      clubData(club);
      resturantData(resturant);
    });
}

function clubData(club) {
  for (var i = 0; i < club.length; i++) {
    var clubName = club[i].Name;
    var clubLat = club[i].Latitude;
    var clubLong = club[i].Longitude;

    var clubMarker = new mapboxgl.Marker({
      color: "#EE82EE",
      draggable: false,
    })
      .setLngLat([clubLong, clubLat])
      .setPopup(new mapboxgl.Popup().setHTML(clubName))
      .addTo(map);

    clubMarker.id = "marker";
  }
}
function resturantData(resturant) {
  for (var i = 0; i < resturant.length; i++) {
    var resturantName = resturant[i].Name;
    var resturantLat = resturant[i].Latitude;
    var resturantLong = resturant[i].Longitude;

    var resturantMarker = new mapboxgl.Marker({
      color: "#A52A2A",
      draggable: false,
    })
      .setLngLat([resturantLong, resturantLat])
      .setPopup(new mapboxgl.Popup().setHTML(resturantName))
      .addTo(map);

    resturantMarker.id = "marker";
  }
}
getMark();

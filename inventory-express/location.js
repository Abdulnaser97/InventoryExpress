function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

const myLoc = { longitute: 43.63990789460254, latitude: -79.39378229199858 };

let warehouses = [
  {
    id: "farthest",
    longitute: 43.65516733516912,
    latitude: -79.43054855252032,
  },
  {
    id: "2nd closest",
    longitute: 43.65104366699908,
    latitude: -79.3906793523954,
  },
  { id: "closest", longitute: 43.63729881158868, latitude: -79.39599249915359 },
];

export function sortWarehousesByDistance(warehouses, searchLocation) {
  // we can just do array sort since number of warehouses is relatively small
  for (let i = 0; i < warehouses.length; i++) {
    warehouses[i].distance = calculateDistance(
      searchLocation["latitude"],
      searchLocation["longitute"],
      warehouses[i].location["latitude"],
      warehouses[i].location["longitute"],
      "K"
    );
  }

  warehouses.sort(function (a, b) {
    return a.distance - b.distance;
  });

  return warehouses;
}

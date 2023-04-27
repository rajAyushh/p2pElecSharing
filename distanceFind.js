function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function distanceBetweenTwoPeople(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // distance in kilometers
  return distance;
}

function allPairsShortestPath(locations) {
  const n = locations.length;
  const distances = new Array(n)
    .fill(null)
    .map(() => new Array(n).fill(Infinity));

  // Initialize distances between people based on their coordinates
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        distances[i][j] = 0;
      } else {
        const lat1 = locations[i][0];
        const lon1 = locations[i][1];
        const lat2 = locations[j][0];
        const lon2 = locations[j][1];
        distances[i][j] = distanceBetweenTwoPeople(lat1, lon1, lat2, lon2);
      }
    }
  }

  // Floyd-Warshall algorithm to find shortest path between all pairs of people
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        distances[i][j] = Math.min(
          distances[i][j],
          distances[i][k] + distances[k][j]
        );
      }
    }
  }

  return distances;
}

const locations = [
  [51.5074, -0.1278], // London
  [48.8566, 2.3522], // Paris
  [40.7128, -74.006], // New York
  [-33.8688, 151.2093], // Sydney
  [35.6895, 139.6917], // Tokyo
];

const distances = allPairsShortestPath(locations);

console.log(distances);

const readline = require("readline-sync");

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

function getInput() {
  const n = Number(readline.question("Enter the number of people: "));
  if (isNaN(n) || n <= 0) {
    console.log("Invalid input: please enter a positive number");
    return null;
  }

  const locations = [];

  for (let i = 0; i < n; i++) {
    const latStr = readline.question(`Enter the latitude of person ${i + 1}: `);
    const lat = Number(latStr);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      console.log("Invalid input: please enter a number between -90 and 90");
      return null;
    }

    const lonStr = readline.question(
      `Enter the longitude of person ${i + 1}: `
    );
    const lon = Number(lonStr);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      console.log("Invalid input: please enter a number between -180 and 180");
      return null;
    }

    locations.push([lat, lon]);
  }

  return locations;
}

const locations = getInput();
if (locations !== null) {
  const distances = allPairsShortestPath(locations);
  console.log(distances);
}

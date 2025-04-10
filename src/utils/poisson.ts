import { pointInPolygon } from 'geometric';

export function poissonDiskSampling(
  polygon: [number, number][],
  minDist = 1,
  maxPoints = 50,
  attempts = 30
): [number, number][] {
  const [minLng, minLat, maxLng, maxLat] = polygon.reduce(
    ([minX, minY, maxX, maxY], [x, y]) => [
      Math.min(minX, x),
      Math.min(minY, y),
      Math.max(maxX, x),
      Math.max(maxY, y)
    ],
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  const points: [number, number][] = [];

  for (let i = 0; i < maxPoints * attempts; i++) {
    const lng = minLng + Math.random() * (maxLng - minLng);
    const lat = minLat + Math.random() * (maxLat - minLat);

    if (!pointInPolygon([lng, lat], polygon)) continue;

    let valid = true;
    for (const [px, py] of points) {
      const d = Math.sqrt((px - lng) ** 2 + (py - lat) ** 2);
      if (d < minDist) {
        valid = false;
        break;
      }
    }

    if (valid) {
      points.push([lat, lng]);
      if (points.length >= maxPoints) break;
    }
  }

  return points;
}

// generatePolygon.ts
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

export function generatePolygon(center: [number, number], baseRadius = 20): number[][] {
  const [centerLat, centerLng] = center;
  const steps = 100;
  const points: number[][] = [];

  for (let i = 0; i < steps; i++) {
    const angle = (2 * Math.PI * i) / steps;
    let radius = baseRadius;

    const n1 = noise2D(Math.cos(angle) + centerLat / 90, Math.sin(angle) + centerLng / 180);
    const n2 = noise2D(2 * Math.cos(angle) + centerLat / 90, 2 * Math.sin(angle) + centerLng / 180);
    const n3 = noise2D(4 * Math.cos(angle) + centerLat / 90, 4 * Math.sin(angle) + centerLng / 180);
    const elevation = 1 + 0.4 * n1 + 0.2 * n2 + 0.1 * n3;

    radius *= elevation;

    const lat = centerLat + radius * Math.cos(angle);
    const lng = centerLng + radius * Math.sin(angle);
    points.push([lng, lat]);
  }

  points.push(points[0]); // close the polygon
  return points;
}

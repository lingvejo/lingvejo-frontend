import { useMemo } from 'react';
import {
  polygon as turfPolygon,
  featureCollection,
  point as turfPoint,
} from '@turf/helpers';
import centroid from '@turf/centroid';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { createNoise2D } from 'simplex-noise';
import { Delaunay } from 'd3-delaunay';
import type { FeatureCollection } from 'geojson';

const noise2D = createNoise2D();

export function useContinentRegions(): FeatureCollection {
  return useMemo(() => {
    const center: [number, number] = [0, 0];
    const baseRadius = 30;
    const outlineSteps = 100;
    const noiseScale = 0.15;
    const noiseStrength = 8;
    const regionCount = 40;

    const features = [];

    // 1. Generate organic continent shape
    const landPoints: [number, number][] = [];
    for (let i = 0; i < outlineSteps; i++) {
      const angle = (i / outlineSteps) * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      const noise = noise2D(x * noiseScale, y * noiseScale);
      const radius = baseRadius + noise * noiseStrength;
      landPoints.push([
        center[0] + x * radius,
        center[1] + y * radius,
      ]);
    }
    landPoints.push(landPoints[0]); // Close loop

    const continent = turfPolygon([landPoints]);

    // 2. Generate region centers inside continent
    const regionCenters: [number, number][] = [];
    while (regionCenters.length < regionCount) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * baseRadius * 0.95;
      const x = center[0] + Math.cos(angle) * r;
      const y = center[1] + Math.sin(angle) * r;

      const pt = turfPoint([x, y]);
      if (booleanPointInPolygon(pt, continent)) {
        regionCenters.push([x, y]);
      }
    }

    // 3. Generate Voronoi cells from region centers
    const delaunay = Delaunay.from(regionCenters);
    const voronoi = delaunay.voronoi([
      center[0] - baseRadius * 2,
      center[1] - baseRadius * 2,
      center[0] + baseRadius * 2,
      center[1] + baseRadius * 2,
    ]);

    for (let i = 0; i < regionCenters.length; i++) {
      const cell = voronoi.cellPolygon(i);
      if (!cell) continue;

      const regionPoly = cell.map(([x, y]) => [x, y] as [number, number]);
      regionPoly.push(regionPoly[0]); // Close loop

      const region = turfPolygon([regionPoly], {
        regionId: i + 1,
        name: `Region ${i + 1}`,
        type: 'region',
      });

      if (
        region.geometry &&
        region.geometry.coordinates[0].length > 3 &&
        booleanPointInPolygon(turfPoint(regionCenters[i]), continent)
      ) {
        // 4. Add region polygon
        features.push(region);

        // 5. Add center label using true centroid
        const centerPt = centroid(region);
        centerPt.properties = {
          type: 'region-center',
          name: `Region ${i + 1}`,
        };
        features.push(centerPt);
      }
    }

    return featureCollection(features);
  }, []);
}

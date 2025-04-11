import { useMemo } from 'react';
import { polygon as turfPolygon, featureCollection, point as turfPoint } from '@turf/helpers';
import type { FeatureCollection } from 'geojson';

export function useContinentRegions(): FeatureCollection {
  return useMemo(() => {
    const center: [number, number] = [0, 0];
    const radius = 30;
    const regionCount = 5; // change to however many slices you want
    const stepsPerRegion = 10; // more = smoother curve

    const features = [];

    // Optional: draw outer circle as visual guide
    const fullCirclePoints: [number, number][] = [];
    for (let i = 0; i <= 360; i++) {
      const angle = (i * Math.PI) / 180;
      fullCirclePoints.push([
        center[0] + Math.cos(angle) * radius,
        center[1] + Math.sin(angle) * radius,
      ]);
    }

    const circleOutline = turfPolygon([[...fullCirclePoints, fullCirclePoints[0]]], {
      name: 'Continent',
      type: 'continent',
    });
    features.push(circleOutline);

    // Create proper curved-slice regions
    for (let i = 0; i < regionCount; i++) {
      const startAngle = (i * 2 * Math.PI) / regionCount;
      const endAngle = ((i + 1) * 2 * Math.PI) / regionCount;

      const arcPoints: [number, number][] = [];

      for (let j = 0; j <= stepsPerRegion; j++) {
        const t = j / stepsPerRegion;
        const angle = startAngle + t * (endAngle - startAngle);
        arcPoints.push([
          center[0] + Math.cos(angle) * radius,
          center[1] + Math.sin(angle) * radius,
        ]);
      }

      const polygonPoints: [number, number][] = [
        center,
        ...arcPoints,
        center, // close the ring
      ];

      const region = turfPolygon([polygonPoints], {
        regionId: i + 1,
        name: `Region ${i + 1}`,
        type: 'region',
      });

      features.push(region);

      // Optional: add label point
      const midAngle = (startAngle + endAngle) / 2;
      const midRadius = radius * 0.5;
      const labelPoint: [number, number] = [
        center[0] + Math.cos(midAngle) * midRadius,
        center[1] + Math.sin(midAngle) * midRadius,
      ];

      features.push(
        turfPoint(labelPoint, {
          type: 'region-center',
          name: `Region ${i + 1}`,
        })
      );
    }

    return featureCollection(features);
  }, []);
}

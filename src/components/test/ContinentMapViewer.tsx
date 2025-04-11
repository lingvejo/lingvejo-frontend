'use client';

import { useEffect, useRef } from 'react';
import { Application } from '@pixi/app';
import { Graphics } from '@pixi/graphics';
import { Text } from '@pixi/text';
import { useContinentRegions } from './useContinentRegions';

const WIDTH = 800;
const HEIGHT = 600;

interface ContinentProps {
  continent: {
    name: string;
    description: string;
    regions: {
      regionId: number;
      name: string;
      description: string;
    }[];
  };
}

export default function ContinentMapViewer({ continent }: ContinentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const geo = useContinentRegions(continent);

  const project = ([lng, lat]: [number, number]): [number, number] => {
    const x = WIDTH / 2 + lng * 5;
    const y = HEIGHT / 2 - lat * 5;
    return [x, y];
  };

  useEffect(() => {
    if (!geo) return;

    const app = new Application({
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: 0x1e1e2f,
      antialias: true,
    });

    ref.current?.appendChild(app.view as HTMLCanvasElement);

    geo.features.forEach((feature) => {
      const type = feature.properties?.type;
      console.log('Drawing feature:', type);

      // 🌍 Draw Continent Outline
      if (feature.geometry.type === 'Polygon' && type === 'continent') {
        const coords = feature.geometry.coordinates[0] as [number, number][];
        const g = new Graphics();
        g.lineStyle(3, 0xffffff);
        coords.forEach(([lng, lat], i) => {
          const [x, y] = project([lng, lat]);
          i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
        });
        g.closePath();
        app.stage.addChild(g);
      }

      // 🟦 Draw Region Polygons
      if (feature.geometry.type === 'Polygon' && type === 'region') {
        const coords = feature.geometry.coordinates[0] as [number, number][];
        const g = new Graphics();
        const fillColor = 0x3399ff;

        g.beginFill(fillColor, 0.3);
        g.lineStyle(2, fillColor, 0.8); // Thicker edge for nice border
        coords.forEach(([lng, lat], i) => {
          const [x, y] = project([lng, lat]);
          i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
        });
        g.closePath();
        g.endFill();

        // Add hover glow effect
        g.interactive = true;
        g.cursor = 'pointer';
        g.on('mouseover', () => {
          g.tint = 0x66ccff;
        });
        g.on('mouseout', () => {
          g.tint = 0xffffff;
        });

        app.stage.addChild(g);
      }

      // 🟡 Region Center Points
      if (feature.geometry.type === 'Point' && type === 'region-center') {
        const [x, y] = project(feature.geometry.coordinates as [number, number]);
        const g = new Graphics();
        g.beginFill(0xffcc00);
        g.drawCircle(x, y, 4);
        g.endFill();
        app.stage.addChild(g);

        const label = new Text(feature.properties.name, {
          fill: '#ffffff',
          fontSize: 12,
        });
        label.position.set(x + 5, y - 10);
        app.stage.addChild(label);
      }

      // 🔗 Region-to-Region Lines
      if (feature.geometry.type === 'LineString' && type === 'connection') {
        const coords = feature.geometry.coordinates as [number, number][];
        const g = new Graphics();
        g.lineStyle(1, 0x8888ff, 0.4);
        coords.forEach(([lng, lat], i) => {
          const [x, y] = project([lng, lat]);
          i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
        });
        app.stage.addChild(g);
      }
    });

    return () => app.destroy(true, { children: true });
  }, [geo]);

  return <div ref={ref} style={{ width: WIDTH, height: HEIGHT }} />;
}

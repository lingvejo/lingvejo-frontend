import React, { useEffect, useRef } from 'react';
import { useMantineTheme } from '@mantine/core';

// Define the props that the component will accept
interface WarpEffectProps {
  warpVelocity: boolean;  // Controls the star speed
  stellarAmplification: boolean;  // Controls the number of stars
}

const WarpEffect: React.FC<WarpEffectProps> = ({ warpVelocity, stellarAmplification }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useMantineTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;  // Set canvas width to window width
        canvas.height = window.innerHeight;  // Set canvas height to window height
      }
    };

    resizeCanvas(); // Initial resize on load
    window.addEventListener('resize', resizeCanvas); // Resize on window resize

    // Adjust star parameters based on props
    const numStars = stellarAmplification ? 100 : 5;
    const starSpeed = warpVelocity ? 100 : 0.5;

    const stars: {
      x: number; // Random X position
      y: number; // Random Y position
      z: number; // Depth (Z position)
      radius: number;
      speed: number;
    }[] = [];

    // Generate stars with initial random positions and speeds
    for (let i = 0; i < numStars; i++) {
      const star = {
        x: Math.random() * canvas.width,  // Random X position
        y: Math.random() * canvas.height, // Random Y position
        z: Math.random() * canvas.width,  // Depth (Z position)
        radius: Math.random() * 2 + 1,
        speed: Math.random() * starSpeed + 0.5,  // Speed is adjusted by warpVelocity
      };
      stars.push(star);
    }

    // Draw the stars (the stars should appear as points)
    const drawStars = () => {
      stars.forEach(star => {
        const x = (star.x - canvas.width / 2) * (canvas.width / star.z);
        const y = (star.y - canvas.height / 2) * (canvas.width / star.z);

        // Adjust the size of stars based on their Z position (depth)
        const size = (star.radius * canvas.width) / star.z;

        // Adjust star color based on the theme
        const starColor = theme.colorScheme === 'dark' ? '#fff' : '#333';  // White for dark mode, gray for light mode

        ctx.beginPath();
        ctx.arc(x + canvas.width / 2, y + canvas.height / 2, size, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();
      });
    };

    // Move the stars (forward movement in Z-axis)
    const moveStars = () => {
      stars.forEach(star => {
        star.z -= star.speed;  // Move the star "forward"
        if (star.z <= 0) {
          star.z = canvas.width;  // Reset the star back to the furthest distance
        }
      });
    };

    const animateStarscape = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
      drawStars();  // Draw the stars
      moveStars();  // Move the stars to simulate warp speed
      requestAnimationFrame(animateStarscape);  // Keep animating
    };

    animateStarscape();  // Start the animation

    return () => {
      window.removeEventListener('resize', resizeCanvas); // Cleanup on unmount
    };
  }, [warpVelocity, stellarAmplification, theme.colorScheme]); // Dependency array ensures the effect re-runs when these props change

  return <canvas ref={canvasRef} className="warp-effect-canvas" />;
};

export default WarpEffect;

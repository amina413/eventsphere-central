import { useEffect, useState } from 'react';

interface Square {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

export const AnimatedBackground = () => {
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    // Create initial squares
    const initialSquares = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      direction: Math.random() * 360,
    }));
    setSquares(initialSquares);

    // Animate squares
    const interval = setInterval(() => {
      setSquares(prev => prev.map(square => ({
        ...square,
        x: (square.x + Math.cos(square.direction) * square.speed + 100) % 100,
        y: (square.y + Math.sin(square.direction) * square.speed + 100) % 100,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {squares.map((square) => (
        <div
          key={square.id}
          className="absolute bg-primary/20 rounded-lg transition-all duration-1000 ease-in-out"
          style={{
            left: `${square.x}%`,
            top: `${square.y}%`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            opacity: square.opacity,
            transform: `rotate(${square.direction}deg)`,
          }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
    </div>
  );
};
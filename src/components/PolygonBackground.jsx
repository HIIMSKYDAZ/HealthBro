import React, { useEffect, useRef } from 'react';

const PolygonBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    let polygons = [];
    
    class Polygon {
      constructor(x, y, size, sides, color) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.size = size;
        this.sides = sides;
        this.color = color;
        this.opacity = 0.1 + Math.random() * 0.3;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.moveRadius = 10 + Math.random() * 20;
        this.moveSpeed = 0.01 + Math.random() * 0.01;
        this.moveAngle = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.moveAngle += this.moveSpeed;
        this.x = this.originX + Math.cos(this.moveAngle) * this.moveRadius;
        this.y = this.originY + Math.sin(this.moveAngle) * this.moveRadius;
        
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 5;
          this.x -= (dx / distance) * force;
          this.y -= (dy / distance) * force;
        }
        
        this.rotation += this.rotationSpeed;
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.beginPath();
        ctx.moveTo(this.size * Math.cos(0), this.size * Math.sin(0));
        
        for (let i = 1; i <= this.sides; i++) {
          const angle = (i * 2 * Math.PI / this.sides);
          const x = this.size * Math.cos(angle);
          const y = this.size * Math.sin(angle);
          ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }
    
    const createPolygons = () => {
      polygons = [];
      const polygonCount = Math.floor(width * height / 15000);
      
      const colors = [
        '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', 
        '#42A5F5', '#2196F3', '#1E88E5', '#1976D2'
      ];
      
      for (let i = 0; i < polygonCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 20 + Math.random() * 40;
        const sides = Math.floor(3 + Math.random() * 4);
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        polygons.push(new Polygon(x, y, size, sides, color));
      }
    };
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createPolygons();
    };
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    let animationFrameId;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < polygons.length; i++) {
        polygons[i].update();
        polygons[i].draw(ctx);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    createPolygons();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default PolygonBackground;
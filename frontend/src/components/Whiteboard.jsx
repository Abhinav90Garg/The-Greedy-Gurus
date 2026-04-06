import React, { useRef, useState, useEffect } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#a855f7'); 

  useEffect(() => {
    
    wsRef.current = new WebSocket('ws://127.0.0.1:8000/ws/hackathon-room');

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'draw') {
        drawLine(data.x0, data.y0, data.x1, data.y1, data.color, false);
      }
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const drawLine = (x0, y0, x1, y1, strokeColor, emit) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = strokeColor;
    
    
    ctx.lineWidth = strokeColor === '#0a0a0a' ? 20 : 3; 
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();

    if (!emit || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    
    wsRef.current.send(JSON.stringify({
      type: 'draw',
      x0, y0, x1, y1, color: strokeColor
    }));
  };

  
  const pos = useRef({ x: 0, y: 0 });

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    pos.current = getCoordinates(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const newPos = getCoordinates(e);
    drawLine(pos.current.x, pos.current.y, newPos.x, newPos.y, color, true);
    pos.current = newPos;
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="mb-4 flex gap-4 bg-white/[0.05] p-3 rounded-2xl border border-white/10 items-center">
        <button onClick={() => setColor('#a855f7')} className={`w-8 h-8 rounded-full bg-purple-500 border-2 transition-all ${color === '#a855f7' ? 'border-white scale-110' : 'border-transparent'}`}></button>
        <button onClick={() => setColor('#3b82f6')} className={`w-8 h-8 rounded-full bg-blue-500 border-2 transition-all ${color === '#3b82f6' ? 'border-white scale-110' : 'border-transparent'}`}></button>
        <button onClick={() => setColor('#10b981')} className={`w-8 h-8 rounded-full bg-emerald-500 border-2 transition-all ${color === '#10b981' ? 'border-white scale-110' : 'border-transparent'}`}></button>
        <button onClick={() => setColor('#ef4444')} className={`w-8 h-8 rounded-full bg-red-500 border-2 transition-all ${color === '#ef4444' ? 'border-white scale-110' : 'border-transparent'}`}></button>
        
        <div className="w-px h-6 bg-white/20 mx-2"></div> 
        
        
        <button 
          onClick={() => setColor('#0a0a0a')} 
          className={`w-12 h-8 rounded-xl border border-gray-400 bg-[#020202] text-[10px] flex items-center justify-center font-bold transition-all hover:bg-white/10 ${color === '#0a0a0a' ? 'border-white text-white' : 'text-gray-400'}`}
        >
          ERASE
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl cursor-crosshair shadow-2xl"
      />
    </div>
  );
};

export default Whiteboard;
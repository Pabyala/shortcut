import React, { useEffect, useRef } from 'react';

export default function ShortcutIcon({shortcutTitle }) {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#184A7E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffff';
      ctx.font = 'bold 35px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(shortcutTitle.toUpperCase().charAt(0), canvas.width / 2, canvas.height / 2);
    }, [shortcutTitle]);
  
    return(
        <canvas ref={canvasRef} width={60} height={60}  />
    )
}

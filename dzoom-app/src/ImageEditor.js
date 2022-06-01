import { useRef, useEffect } from 'react';

const ImageEditor = props => {

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.current.getContext("2d");
    const image = new Image(100, 100);
    image.src = props.source;

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
  });

  return <canvas id="canvas" ref={canvasRef} width={500} height={500} />;
};
 
export default ImageEditor;

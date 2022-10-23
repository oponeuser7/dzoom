"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ImageEditor = props => {
    const canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!canvasRef)
            return;
        const ctx = canvasRef.current.getContext("2d");
        const image = new Image(100, 100);
        image.src = props.source;
        image.onload = () => {
            ctx.drawImage(image, 0, 0);
        };
    });
    return <canvas id="canvas" ref={canvasRef} width={500} height={500}/>;
};
exports.default = ImageEditor;

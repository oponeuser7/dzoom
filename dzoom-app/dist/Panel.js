"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const LoadingText = () => {
    const [text, setText] = (0, react_1.useState)('Loading');
    setInterval(() => {
        setText(text + '.');
        if (text.length >= 10)
            setText('Loading');
    }, 1000);
    return (<div className='block'>{text}</div>);
};
const Panel = () => {
    const [source, setSource] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [flag, setFlag] = (0, react_1.useState)(false);
    const [fileLoaded, setFileLoaded] = (0, react_1.useState)(false);
    const x = (0, react_1.useRef)(null);
    const y = (0, react_1.useRef)(null);
    const width = (0, react_1.useRef)(null);
    const height = (0, react_1.useRef)(null);
    const file = (0, react_1.useRef)(null);
    const resolution = () => {
        console.log("Sending Request...");
        setFlag(false);
        setLoading(true);
        const formData = new FormData();
        formData.append('x', x.current.value);
        formData.append('y', y.current.value);
        formData.append('width', width.current.value);
        formData.append('height', height.current.value);
        formData.append('file', file.current.files[0]);
        formData.append('fileName', file.current.files[0].name);
        axios_1.default.post('//127.0.0.1:5000', formData)
            .then((response) => {
            setFlag(true);
            setLoading(false);
            console.log("Done!");
            alert('Done!');
        }).catch(() => {
            setLoading(false);
            console.log("Error!");
            alert('Error!');
        });
    };
    const uploadImage = () => {
        const temp = file.current.files[0];
        setSource(URL.createObjectURL(temp));
        setFileLoaded(true);
    };
    return (<div>
      <div id='image-editor'>
        {fileLoaded ? <img src={source}/> : <div id='upload-text'>Upload Image</div>}
      </div>
      <div id='panel'>
        <div className="block"><label>X : <input ref={x} type="number"/></label></div>
        <div className="block"><label>Width : <input ref={width} type="number"/></label></div>
        {loading ? <LoadingText /> : ''}
        <br />
        <div className="block"><label>Y : <input ref={y} type="number" id="y"/></label></div>
        <div className="block"><label>Height : <input ref={height} type="number" id="height"/></label></div>
        <div className="block"><input ref={file} type='file' onChange={uploadImage}/></div>
        <div className="block"><button type="button" onClick={resolution}>Resolution</button></div>
        {flag ? <a href={'http://127.0.0.1:5000/static/results/' + file.current.files[0].name + '_x2_SR.png'} target='_blank'>Show Result</a> : ''}
      </div>
    </div>);
};
exports.default = Panel;

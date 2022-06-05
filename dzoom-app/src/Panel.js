import './style.css';
import { useState, useRef } from 'react';
import axios from 'axios';

const Panel = () => {
  const [source, setSource] = useState('');
  const x = useRef(null);
  const y = useRef(null);
  const width = useRef(null);
  const height = useRef(null);
  const file = useRef(null);

  const resolution = () => {
    console.log("Sending Request...");
    axios.get('//127.0.0.1:5000', {})
      .then((response) => {
        setSource('http://127.0.0.1:5000/static/images/image_x2_SR.png');
        console.log("Done!");
      }).catch(() => {
        console.log("Error!");
      });
  };

  const uploadImage = () => {
    const temp = file.current.files[0];
    setSource(URL.createObjectURL(temp));
  };
    
  return (
    <div>
      <div id='image-editor'>
        <img src={source}/>
      </div>
      <div id='panel'>
        <div className="block"><label>X : <input ref={x} type="number"/></label></div>
        <div className="block"><label>Width : <input ref={width} type="number"/></label></div>
        <br/>
        <div className="block"><label>Y : <input ref={y} type="number" id="y"/></label></div>
        <div className="block"><label>Height : <input ref={height} type="number" id="height"/></label></div>
        <div className="block"><button type="button" onClick={resolution}>Resolution</button></div>
        <div className="block"><input ref={file} type='file'/></div>
        <div className="block"><button type="button" onClick={uploadImage}>Upload File</button></div>
      </div>
    </div>
  );
}

export default Panel;

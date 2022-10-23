import './style.css';
import { useState, useRef } from 'react';
import axios from 'axios';

const LoadingText = () => {
  const [text, setText] = useState('Loading');

  setInterval(() => {
    setText(text+'.');
    if(text.length>=10) setText('Loading');
  }, 1000);

  return (
    <div className='block'>{text}</div>
  );
}

const Panel = () => {
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false);
  const x = useRef<HTMLInputElement>(null);
  const y = useRef<HTMLInputElement>(null);
  const width = useRef<HTMLInputElement>(null);
  const height = useRef<HTMLInputElement>(null);
  const file = useRef<HTMLInputElement>(null);

  const resolution = () => {
    console.log("Sending Request...");
    setFlag(false);
    setLoading(true);

    if(x.current !== null && y.current !== null && width.current !== null && height.current !== null && file.current !== null && file.current.files !== null) {
      const data = {
        x: x.current.value,
        y: y.current.value,
        width: width.current.value,
        height: height.current.value,
        file: file.current.files[0],
        fileName: file.current.files[0].name
      };  
      axios.post('//127.0.0.1:5000', data)
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
    }
  };

  const uploadImage = () => {
    if(file.current !== null && file.current.files !== null) {
      const temp = file.current.files[0];
      setSource(URL.createObjectURL(temp));
      setFileLoaded(true);
    }
  };
    
  return (
    <div>
      <div id='image-editor'>
        {fileLoaded ? <img src={source} /> : <div id='upload-text'>Upload Image</div>}
      </div>
      <div id='panel'>
        <div className="block"><label>X : <input ref={x} type="number"/></label></div>
        <div className="block"><label>Width : <input ref={width} type="number"/></label></div>
        {loading ? <LoadingText/> : ''}
        <br/>
        <div className="block"><label>Y : <input ref={y} type="number" id="y"/></label></div>
        <div className="block"><label>Height : <input ref={height} type="number" id="height"/></label></div>
        <div className="block"><input ref={file} type='file' onChange={uploadImage}/></div>
        <div className="block"><button type="button" onClick={resolution}>Resolution</button></div>
        {flag ? <a href={'http://127.0.0.1:5000/static/results/'+file.current?.files?.[0].name+'_x2_SR.png'} target='_blank'>Show Result</a> : ''}
      </div>
    </div>
  );
}

export default Panel;

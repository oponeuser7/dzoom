import Image from './Image';
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
      const data = new FormData();
      data.append('x', x.current.value);
      data.append('y', y.current.value);
      data.append('width', width.current.value);
      data.append('height', height.current.value);
      data.append('file', file.current.files[0]);
      data.append('fileName', file.current.files[0]?.name);
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
    } else {
      setLoading(false);
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
      <Image src={source}/>
      <div id='panel'>
      <div className="block" 
        style={{
          fontSize: 30,
          color: '#1357a6'
        }}>
        Options
      </div>
      <div className="block"><label>Width<input ref={width} type="number" placeholder='0'/></label></div>
      <div className="block"><label>Height<input ref={height} type="number" placeholder='0'/></label></div>
      <div className="block"><label>X<input ref={x} type="number" placeholder='0'/></label></div>
      <div className="block"><label>Y<input ref={y} type="number" placeholder='0'/></label></div>
      <div className="block"><input ref={file} type='file' onChange={uploadImage}/></div>
      <div id="resolution-button"><div onClick={resolution}><div id='resolution-button-word'>{loading ? <img src='public/loading.gif' /> : 'Resolution'}</div></div></div>
      {flag ? <a href={'http://127.0.0.1:5000/static/results/'+file.current?.files?.[0].name.substring(0, file.current?.files?.[0].name.length-4)+'_x2_SR.png'} target='_blank' rel="noreferrer">Show Result</a> : ''}
      </div>
    </div>
  );
}

export default Panel;

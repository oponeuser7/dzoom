import './style.css';
import { useRef } from 'react';
import axios from 'axios';

axios.defaults.baseURL = null;

const Panel = () => {

  const x = useRef(null);
  const y = useRef(null);
  const width = useRef(null);
  const height = useRef(null);

  const handleClick = () => {
    console.log("Sending Request...");
    axios.get('//127.0.0.1:5000', {})
      .then((response) => {
      console.log("Done!");
    });
  };
    
  return (
    <div>
      <div className="block"><label>X : <input ref={x} type="number"/></label></div>
      <div className="block"><label>Width : <input ref={width} type="number"/></label></div>
      <br/>
      <div className="block"><label>Y : <input ref={y} type="number" id="y"/></label></div>
      <div className="block"><label>Height : <input ref={height} type="number" id="height"/></label></div>
      <div className="block"><button type="button" onClick={handleClick}>Resolution</button></div>
    </div>
  );
}

export default Panel;

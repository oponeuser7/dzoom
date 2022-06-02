import './style.css'
import axios

const Panel = () => {
  return (
    <div>
      <div className="block"><label>X : <input type="number" id="x"/></label></div>
      <div className="block"><label>Width : <input type="number" id="width"/></label></div>
      <br/>
      <div className="block"><label>Y : <input type="number" id="y"/></label></div>
      <div className="block"><label>Height : <input type="number" id="height"/></label></div>
      <div className="block"><button type="button" id="resolution-button">Resolution</button></div>
    </div>
  );
}

export default Panel;

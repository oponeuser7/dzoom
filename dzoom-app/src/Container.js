import ImageEditor from './ImageEditor';
import Panel from './Panel';
import './style.css';

const Container = () => {
  return (
    <div id="container">
      <div id="image-editor">
        <ImageEditor source="image.png"/>
      </div>
      <div id="panel">
        <Panel />         
      </div>
    </div>
  );
}

export default Container;

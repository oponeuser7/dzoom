import './style.css';

const Image = (props: any) => {
  return (
    <div id='image'>
      <img src={props.src} />
    </div>
  );
}

export default Image;
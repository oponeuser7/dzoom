import './style.css';

const Header = () => {
  return (
    <div id='header'>
      <Logo />
    </div>
  );
}

const Logo = () => {
  return (
    <div id='logo'>
      <span style={{color: '#1357A6'}}>d</span>
      <span>Z</span>
      <span style={{color: '#1357A6'}}>OO</span>
      <span>M</span>
    </div>
  )
}

export default Header;
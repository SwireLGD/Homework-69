import { NavLink } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <div className='bg-primary d-flex justify-content-between container-fluid'>
      <h1 className='Home'><NavLink to="/">TV Shows</NavLink></h1>
    </div>
  );
};

export default Header;
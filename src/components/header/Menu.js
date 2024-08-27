import {Link, useLocation} from "react-router-dom";

const NavMenu = ({path, imageSource, children}) => {
  // ** variables
  const location = useLocation();
  const matchPath = (path) => {
    return location.pathname === path ? 'matched' : '';
  }
  return (
      <li className={matchPath(path)}>
        <Link to={path}>
          <img src={require(`assets/images/menu/${imageSource}.svg`)} alt="홈 아이콘"/>
          <p>{children}</p>
        </Link>
      </li>
  )
}

export default NavMenu;
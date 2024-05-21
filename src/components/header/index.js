import '../../assets/scss/layout.scss';
import {Link} from "react-router-dom";
import {findImage} from "../../utils";

const Header = () => {
  return(
      <header id="header">
        <div className="nav-wrap">
          <h1>
            <Link to={"/"}>로아툴</Link>
          </h1>
          <div className="nav-inner">
            <nav>
              <h2 className="-offscreen">로아툴 메뉴</h2>
              <ul>
                <li>
                  <Link to={"/"}>
                    <img src={findImage('icon_home')} alt="홈 아이콘"/>
                    <p>대시보드</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Header;
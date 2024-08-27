import 'assets/scss/layout.scss';
import {Link} from "react-router-dom";
import NavMenu from "./Menu";

const Header = () => {

  return(
      <header id="header">
        <div className="nav-wrap">
          <h1>
            <Link to={"/"}>
              <img src={require('assets/images/common/logo.png')} alt="로고 이미지"/>
              로아툴
            </Link>
          </h1>
          <div className="nav-inner">
            <nav>
              <h2 className="-offscreen">로아툴 메뉴</h2>
              <ul className="gnb">
                <NavMenu path={'/'} imageSource={'icon-home'}>대시보드</NavMenu>
                <NavMenu path={'/character'} imageSource={'icon-character'}>캐릭터 상세조회</NavMenu>
                <NavMenu path={'/goldCalculator'} imageSource={'icon-calculator'}>골드 계산기</NavMenu>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  )
}

export default Header;
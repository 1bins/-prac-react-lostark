import '../assets/scss/app.scss'
import Header from "../components/header";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return(
      <div className="wrapper">
        <Header/>
        <Outlet/>
      </div>
  )
}

export default Layout;
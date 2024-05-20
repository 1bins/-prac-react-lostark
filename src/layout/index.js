import '../assets/scss/app.scss'
import {Outlet} from "react-router-dom";

const Layout = () => {
  return(
      <>
        <header></header>
        <Outlet/>
      </>
  )
}

export default Layout;
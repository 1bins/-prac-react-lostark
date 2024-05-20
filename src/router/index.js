import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";

const Router = () => {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
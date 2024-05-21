import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Character from "../pages/character";

const Router = () => {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/character" element={<Character/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
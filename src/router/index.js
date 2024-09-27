import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../layout";
import Home from "pages/home";
import Character from "pages/character";
import Calculator from "pages/calculator";

const Router = () => {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Character from "../pages/character";
import Gold from "../pages/gold_calculator";

const Router = () => {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/character" element={<Character/>}></Route>
          <Route path="/goldCalculator" element={<Gold/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
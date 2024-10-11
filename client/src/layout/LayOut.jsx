import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import HomePageMen from "../pages/Home/HomeMen/HomePageMen";
import HomePageWoman from "../pages/Home/HomeWomen/HomePageWoman";

const LayOut = () => {
  return (
    <>
      <Routes>
        {/*Route nested: Cha con lồng nhau  */}
        <Route path="/" element={<App />}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path="/men" element={<HomePageMen></HomePageMen>}></Route>
          <Route path="/women" element={<HomePageWoman></HomePageWoman>}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default LayOut;

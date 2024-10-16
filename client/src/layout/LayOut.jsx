import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import '../index.css';
import HomePage from "../pages/Home/HomePage";
import HomePageMen from "../pages/Home/HomeMen/HomePageMen";
import HomePageWoman from "../pages/Home/HomeWomen/HomePageWoman";
import Admin from "../pages/admin/Admin";
import Team from "../pages/admin/team";
import DashBoard from "../pages/admin/dashboard";
import Contacts from "../pages/admin/contacts";
import Invoices from "../pages/admin/invoices";
import Form from "../pages/admin/form";
import Calendar from "../pages/admin/calendar";
import FAQ from "../pages/admin/faq";
import Bar from "../pages/admin/bar";
import Pie from "../pages/admin/pie";
import Line from "../pages/admin/line";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const LayOut = () => {
  return (
    <>
      <Routes>
        {/*Route nested: Cha con lồng nhau  */}
        <Route path="/" element={<App />}>
          <Route index element={<HomePage></HomePage>}></Route>
          <Route path="/men" element={<HomePageMen></HomePageMen>}></Route>
          <Route
            path="/women"
            element={<HomePageWoman></HomePageWoman>}
          ></Route>
        </Route>

        <Route path="admins" element={<Admin />}>
          <Route path="dashBoard" element={<DashBoard />} />
          <Route path="team" element={<Team />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="form" element={<Form />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="calendar" element={<Calendar />} />
          {/* <Route path="/geography" element={<Geography />} /> */}
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
        />
    </>
  );
};

export default LayOut;

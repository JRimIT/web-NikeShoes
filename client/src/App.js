import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import { Outlet, Link } from "react-router-dom";
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 8e31bede87ae69ca75dc91e6114fb9f7761e43c1

function App() {
  return (
    <>
      <div className="app-container">
        <div className="header-container">
          <Header></Header>
        </div>

        <div className="main-container">
          <div className="sidenav-container"></div>
          <div className="app-content">
            {/* Outlet có trách nhiệm gọi các component con của app khi đc gọi và nó sẻ thế ngay vị trị của Outlet */}
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default App;

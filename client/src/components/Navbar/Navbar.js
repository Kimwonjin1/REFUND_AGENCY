import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../util/Button/Button";
import logo from "../../images/logo.svg";
import "./Navbar.css";

function Navbar() {
  const state = useContext(GlobalState);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const handleClick = () => setClick(!click);
  const closeMoblieMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton()
  }, []);
  
  
  window.addEventListener("resize", showButton);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li className="nav-item">
          
          <Link to="/createproduct" className="nav-links" onClick={closeMoblieMenu}>
            리뷰 등록
          </Link>
          <Link to="/category" className="nav-links" onClick={closeMoblieMenu}>
            태그 등록
          </Link>
          
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        {button && (
          <Link to="/" onClick={logoutUser}>
            <Button buttonStyle="btn--outline">로그아웃</Button>
          </Link>
        )}
      </>
    );
  };
  const loggedRouterMobile = () => {
    return (
      <>
        <Link
          to="/"
          className="nav-links-mobile"
          onClick={()=>{
            logoutUser(); 
            closeMoblieMenu()
          }}
        >
          로그아웃
        </Link>
      </>
    );
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="" />
            {isAdmin ? (
              "관리자모드"
            ) : (
              <>
                REFUND
                <br />
                AGENCY
              </>
            )}
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/aboutus"
                className="nav-links"
                onClick={closeMoblieMenu}
              >
                회사소개
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/review"
                className="nav-links"
                onClick={closeMoblieMenu}
              >
                환불후기
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/consulting"
                className="nav-links"
                onClick={closeMoblieMenu}
              >
                상담신청
              </Link>
            </li>
            {isAdmin ? adminRouter() : ""}
            <li className="nav-item">
              {isAdmin || isLogged ? (
                loggedRouterMobile()
              ) : (
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMoblieMenu}
                >
                  로그인
                </Link>
              )}
            </li>
          </ul>
          {isAdmin || isLogged
            ? loggedRouter()
            : button && (
            <Link to="/login">
            <Button buttonStyle="btn--outline">로그인</Button>
            </Link>
            )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

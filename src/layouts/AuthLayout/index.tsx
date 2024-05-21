import { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import emailImage from "../../assets/svg/email.svg";
import phoneImage from "../../assets/svg/phone.svg";
import teleImage from "../../assets/svg/tele.svg";
import fbImage from "../../assets/svg/fb.svg";
import insImage from "../../assets/images/instagram.png";
import phone2Image from "../../assets/images/phone2.png";
import youtubeImage from "../../assets/images/youtube.png";
import background from "../../assets/images/background-register.png";
import headset from "../../assets/svg/Headset.svg";
import Login from "./components/Login";
import Register from "./components/Register";
import { useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = location.pathname === "/login" ? "Đăng nhập" : "Đăng ký";
  }, [location.pathname]);
  return (
    <>
      <div className="container-auth">
        <div className="layout">
          <div className="layout-left">
            {/* <p>Logo</p> */}
            {/* <img src={logo} className="logo-bg" /> */}
            <img src={background} className="img-bg" />
            <div className="layout-hotline">
              <div className="layout-hotline-con">
                <img src={headset} />
                <p>Hotline hỗ trợ: 098.765.4321</p>
              </div>
            </div>
          </div>
          <div className="layout-right">
            {location.pathname === "/login" ? <Login /> : <Register />}
          </div>
        </div>
      </div>
      <footer className="footer-auth">
        <div className="footer-layout">
          <div className="footer-left">
            <div className="footer-logo">
              {/* <img src={logo} /> */}
            </div>
            <div className="info-left">
              <img src={emailImage} />
              <p>hotro@gmail.com</p>
            </div>
            <div className="info-left">
              <img src={phoneImage} />
              <p>hotro@gmail.com</p>
            </div>
            <div className="info-left">
              <img src={teleImage} />
              <p>hotro@gmail.com</p>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-right-row-1">
              <span>Trang chủ</span>
              <span>Hướng dẫn sử dụng</span>
              <span>Giới thiệu</span>
            </div>
            <div className="footer-right-row-2">
              <p>Theo dõi chúng tôi</p>
            </div>
            <div className="footer-right-row-3">
              <img src={fbImage} />
              <img src={insImage} />
              <img src={phone2Image} />
              <img src={youtubeImage} />
            </div>
          </div>
        </div>
        <div className="footer-center">
          <p>Powered By Ecom @ 2023. Design by Ecom</p>
        </div>
      </footer>
    </>
  );
};
export default AuthLayout;

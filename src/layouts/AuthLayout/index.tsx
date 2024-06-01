import { useEffect, useState } from "react";
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
import { useLocalization } from "../../context/LocalizationWrapper";
import flagEn from "../../assets/images/flags/en.png";
import flagCn from "../../assets/images/flags/cn.png";
import flagVn from "../../assets/images/flags/vn.png";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const AuthLayout = () => {
  const location = useLocation();
  const { switchLocale } = useLocalization();
  const storedLanguage = localStorage.getItem("locale") || "en";
  const [language, setLanguage] = useState(storedLanguage);
  const languages: any = [
    {
      key: "en",
      label: "English",
      icon: <img style={{ marginRight: 8 }} src={flagEn} />,
    },
    {
      key: "zh",
      label: "简体中文",
      icon: <img style={{ marginRight: 8 }} src={flagCn} />,
    },
    {
      key: "vi",
      label: "Tiếng Việt",
      icon: <img style={{ marginRight: 8 }} src={flagVn} />,
    },
  ];

  const handleChangeLanguages = (value: any) => {
    setLanguage(value);
    switchLocale(value);
  };
  const languageMenu = (
    <Menu
      onClick={(e) => handleChangeLanguages(e.key)}
      items={languages}
      selectedKeys={[language]}
    />
  );
  const getLabel = (list: any, key: any) =>
    list.find((item: any) => item.key === key)?.label;

  useEffect(() => {
    document.title = location.pathname === "/login" ? "Đăng nhập" : "Đăng ký";
  }, [location.pathname]);
  return (
    <>
      <div style={{ padding: 20, backgroundColor: "#fdf7ed" }}>
        <Dropdown
          overlay={languageMenu}
          trigger={["click"]}
          overlayStyle={{ width: 200 }}
        >
          <div
            className="selected-language"
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              <span>
                {languages?.find((lang: any) => lang.key === language).icon}
                {getLabel(languages, language)}
              </span>
              <DownOutlined
                style={{ fontSize: 12, opacity: 0.6, color: "inherit" }}
              />
            </Space>
          </div>
        </Dropdown>
      </div>
      <div className="container-auth">
        <div className="layout">
          <div className="layout-left">
            {/* <p>Logo</p> */}
            {/* <img src={logo} className="logo-bg" /> */}
            <img src={background} className="img-bg" />
            <div className="layout-hotline">
              <div className="layout-hotline-con">
                <img src={headset} />
                {/* <p>Hotline hỗ trợ: 098.765.4321</p> */}
              </div>
            </div>
          </div>
          <div className="layout-right">
            {location.pathname === "/login" ? <Login /> : <Register />}
          </div>
        </div>
      </div>
      {/* <footer className="footer-auth">
        <div className="footer-layout">
          <div className="footer-left">
            <div className="footer-logo"></div>
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
      </footer> */}
    </>
  );
};
export default AuthLayout;

import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  DownOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { routes_url } from "../../routes/routes";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoCMS.png";
import { CiBellOn } from "react-icons/ci";
import flagEn from "../../assets/images/flags/en.png";
import flagCn from "../../assets/images/flags/cn.png";
import flagVn from "../../assets/images/flags/vn.png";
import user from "../../assets/images/user.png";
import AutoTranslate from "../../utils/AutoTranslate";
import { useLocalization } from "../../context/LocalizationWrapper";
import TranslateTing from "../../components/Common/TranslateTing";
import { useCurrency } from "../../context/CurrencyContext";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = (props: any) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { switchLocale } = useLocalization();
  const { currency, switchCurrency } = useCurrency();
  const userData: any = localStorage.getItem("userData");
  const storedLanguage = localStorage.getItem("locale") || "en";
  const convertDtUser = JSON.parse(userData);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
  const currencys: any = [
    {
      key: "USD",
      label: <TranslateTing text="dolla" />,
    },
    {
      key: "VND",
      label: <TranslateTing text="vnd" />,
    },
    {
      key: "CNY",
      label: <TranslateTing text="cny" />,
    },
  ];
  const handleChangeCurrencys = (value: any) => {
    // setCurrency(value);
    switchCurrency(value);
  };
  const menuItems: any = [
    {
      label: (
        <p>
          <TranslateTing text="Logout" />
        </p>
      ),
      key: "0",
    },
  ];
  const currencyMenu: any = (
    <Menu
      onClick={(e) => handleChangeCurrencys(e.key)}
      items={currencys}
      selectedKeys={[currency]}
    />
  );
  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

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

  const userMenu = (
    <Menu
      onClick={(e) => {
        window.localStorage.clear();
        window.location.href = "/login";
      }}
      items={menuItems}
    />
  );
  const getLabel = (list: any, key: any) =>
    list.find((item: any) => item.key === key)?.label;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // style={{ background: "#141423" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
      >
        <div style={{ padding: 15 }}>
          <img src={logo} style={{ width: "100%", height: 55 }} />
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[`${location.pathname}`]}
          mode="inline"
        >
          {/* {routes_url.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className={
                location.pathname === item.path ? "ant-menu-item-selected" : ""
              }
            >
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))} */}
          {routes_url.map((group) =>
            group.children ? (
              <Menu.ItemGroup key={group.key} title={group.label}>
                {group.children.map((item) => (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    className={
                      location.pathname === item.path
                        ? "ant-menu-item-selected"
                        : ""
                    }
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            ) : (
              <Menu.Item
                key={group.key}
                icon={group.icon}
                className={
                  location.pathname === group.path
                    ? "ant-menu-item-selected"
                    : ""
                }
              >
                <Link to={group.path}>{group.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0px 30px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 30 }}>
            <div style={{ position: "relative", top: 8 }}>
              <CiBellOn size={24} />
            </div>
            <div>
              <Dropdown
                overlay={currencyMenu}
                trigger={["click"]}
                overlayStyle={{ width: 200 }}
              >
                <div
                  className="selected-language"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <span>
                      {
                        currencys?.find((lang: any) => lang.key === currency)
                          .icon
                      }
                      {getLabel(currencys, currency)}
                    </span>
                    <DownOutlined
                      style={{ fontSize: 12, opacity: 0.6, color: "inherit" }}
                    />
                  </Space>
                </div>
              </Dropdown>
            </div>
            <div>
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
                      {
                        languages?.find((lang: any) => lang.key === language)
                          .icon
                      }
                      {getLabel(languages, language)}
                    </span>
                    <DownOutlined
                      style={{ fontSize: 12, opacity: 0.6, color: "inherit" }}
                    />
                  </Space>
                </div>
              </Dropdown>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <img src={user} alt="" style={{ width: "100%", height: 50 }} />
              </div>
              <Dropdown
                overlay={userMenu}
                trigger={["click"]}
                overlayStyle={{ width: 100 }}
              >
                <div
                  className="selected-language"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <div style={{ fontWeight: 600, fontSize: 20 }}>
                      {convertDtUser?.name}
                    </div>
                  </Space>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            {/* <AutoTranslate /> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

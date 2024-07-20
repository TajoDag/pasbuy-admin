import React, { useContext, useEffect, useState } from "react";
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
import {
  Breadcrumb,
  Button,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Space,
  theme,
} from "antd";
import { routes_url } from "../../routes/routes";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
import { ChatContext } from "../../context/ChatContext";
import { getUserChat } from "../../api/utils/chat";
import Notification from "../../modules/Chats/components/Notification";
import { useIntl } from "react-intl";
import { updatePassword } from "../../api/utils/auth";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";

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
  const dispatch = useDispatch();
  const { updateCurrentChat, setUserChats } = useContext(ChatContext);
  const location = useLocation();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  // const defaultL = {
  //   _id: "66672bfeb539c4644d49c876",
  //   members: [
  //     {
  //       _id: "66672bf219a44b9c0f219741",
  //       username: "botchat2",
  //     },
  //     {
  //       _id: "6663d582b4788233da09fb70",
  //       username: "botchat",
  //     },
  //   ],
  //   createdAt: "2024-06-10T16:38:22.203+00:00",
  //   updatedAt: "2024-06-10T16:38:22.203+00:00",
  // };
  // useEffect(() => {
  //   if (location.pathname !== "/chats") {
  //     updateCurrentChat(defaultL);
  //   }
  // }, [location.pathname]);
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
          <TranslateTing text="Change password" />
        </p>
      ),
      key: "3",
    },
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

  const handleMenuClick = (e: any) => {
    if (e.key === "0") {
      window.localStorage.clear();
      window.location.href = "/login";
    } else if (e.key === "3") {
      handleChangePassword();
    }
  };
  const handleChangePassword = () => {
    setOpenChangePassword(true);
  };
  const handleChangePasswordOk = () => {
    setOpenChangePassword(false);
  };

  const handleChangePasswordCancel = () => {
    setOpenChangePassword(false);
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

  const userMenu = <Menu onClick={handleMenuClick} items={menuItems} />;
  const getLabel = (list: any, key: any) =>
    list.find((item: any) => item.key === key)?.label;
  const intl = useIntl();
  const Success = intl.formatMessage({ id: "Success" });
  const Error = intl.formatMessage({ id: "Error" });
  const handleConfirmChangePassword = async (values: any) => {
    try {
      dispatch(startLoading());
      const rp = await updatePassword(values);
      if (rp.status) {
        dispatch(
          showNotification({
            message: Success,
            type: "success",
          })
        );
        handleChangePasswordCancel();
      } else {
        dispatch(
          showNotification({
            message: Error,
            type: "error",
          })
        );
      }
    } catch (err) {
    } finally {
      dispatch(stopLoading());
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ overflowY: "auto", height: "100vh" }}
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
          <div
            style={{
              display: "flex",
              gap: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative", top: 8 }}>
              <Notification />
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
                overlayStyle={{ width: 150 }}
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
      <Modal
        title={<TranslateTing text="Change password" />}
        open={openChangePassword}
        onOk={handleChangePasswordOk}
        onCancel={handleChangePasswordCancel}
        okText={<TranslateTing text="OK" />}
        cancelText={<TranslateTing text="Cancel" />}
        footer={null}
        width="30%"
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onFinish={(value) => handleConfirmChangePassword(value)}
          autoComplete="off"
        >
          <Form.Item
            label={<TranslateTing text="Old Password" />}
            name="oldPassword"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={<TranslateTing text="New Password" />}
            name="newPassword"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={<TranslateTing text="Confirm Password" />}
            name="confirmPassword"
          >
            <Input.Password />
          </Form.Item>
          <div
            style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
          >
            <Space>
              <div className="btn_cancel">
                <Button htmlType="button" onClick={handleChangePasswordCancel}>
                  <TranslateTing text="Cancel" />
                </Button>
              </div>
              <div className="btn_submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "#e62e05" }}
                >
                  <TranslateTing text="Submit" />
                </Button>
              </div>
            </Space>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};
export default MainLayout;

import { Button, Card, Image, Input, Row, Space, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { showNotification } from "../../redux/reducers/notificationReducer";
import {
  changeKeyChat,
  createLogoHeader,
  getKeyChat,
  getLogoFooter,
  getLogoHeader,
} from "./apis";
import TranslateTing from "../../components/Common/TranslateTing";
import { UploadOutlined } from "@ant-design/icons";
import LogoHeader from "./components/LogoHeader";
import LogoFooter from "./components/LogoFooter";
import Banner from "./components/Banner";
import { useIntl } from "react-intl";

const Settings = () => {
  const dispatch = useDispatch();
  const [keyLiveChat, setKeyLiveChat] = useState("");
  const [detailLogoHeader, setDetailLogoHeader] = useState();
  const [detailLogoFooter, setDetailLogoFooter] = useState();
  const intl = useIntl();
  const success = intl.formatMessage({
    id: "Success",
  });
  const error = intl.formatMessage({
    id: "Error",
  });
  useEffect(() => {
    const getKey = async () => {
      dispatch(startLoading());
      try {
        const rp = await getKeyChat("665461c54715f752a552f7a2");
        if (rp.status) {
          setKeyLiveChat(rp.result.keyLive);
        }
      } catch (err) {
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    const getDetailLogoHeader = async () => {
      dispatch(startLoading());
      try {
        const rp = await getLogoHeader("6656784a2de1279e93bcc91a");
        if (rp.status) {
          setDetailLogoHeader(rp.result.images.url);
        }
      } catch (err) {
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    const getDetailLogoFooter = async () => {
      dispatch(startLoading());
      try {
        const rp = await getLogoFooter("665701da76b8c058a19a4780");
        if (rp.status) {
          setDetailLogoFooter(rp.result.images.url);
        }
      } catch (err) {
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    getDetailLogoHeader();
    getDetailLogoFooter();
    getKey();
  }, [dispatch]);

  const handleInputChange = (e: any) => {
    setKeyLiveChat(e.target.value);
  };

  const handleSubmit = async () => {
    let payload = {
      keyLive: keyLiveChat,
    };
    dispatch(startLoading());
    try {
      const rp = await changeKeyChat("665461c54715f752a552f7a2", payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: (
              <TranslateTing text="Retrieving live chat key data success." />
            ),
            type: "success",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: (
            <TranslateTing text="Retrieving live chat key data failed." />
          ),
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card title={<TranslateTing text="Logos" />} style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
          <LogoHeader detailLogoHeader={detailLogoHeader} />
          <LogoFooter detailLogoFooter={detailLogoFooter} />
        </div>
      </Card>
      <Card title={<TranslateTing text="Banners" />} style={{ width: "100%" }}>
        <Banner />
      </Card>
      {/* <Card
        title={<TranslateTing text="Images advertisement" />}
        style={{ width: "100%" }}
      ></Card> */}
      <Card
        title={<TranslateTing text="Config live chat" />}
        style={{ width: "100%" }}
      >
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="Enter key live chat"
            value={keyLiveChat}
            onChange={handleInputChange}
          />
          <Button type="primary" onClick={handleSubmit}>
            <TranslateTing text="Submit" />
          </Button>
        </Space.Compact>
      </Card>
    </div>
  );
};

export default Settings;

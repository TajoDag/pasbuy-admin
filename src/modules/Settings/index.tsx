import { Button, Card, Image, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { changeKeyChat, getKeyChat } from "./apis";
import TranslateTing from "../../components/Common/TranslateTing";

const Settings = () => {
  const dispatch = useDispatch();
  const [keyLiveChat, setKeyLiveChat] = useState("");

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
            message: "Retrieving live chat key data failed.",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };

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
          <div>
            <h3>
              <TranslateTing text="Logo Header" />
            </h3>
            <Image
              width={200}
              src="https://www.pasbuy.cyou/public/uploads/all/1AZ1FU1wB4TY7AwOvrhhaCHg8kLRsm1NV78YwxJC.png"
            />
          </div>
          <div>
            <h3>
              <TranslateTing text="Logo Footer" />
            </h3>
            <Image
              width={200}
              src="https://www.pasbuy.cyou/public/uploads/all/Pb40YAYGtG8kNwCDTQZZ3w84k1bufpt57NCcS9dj.jpg"
            />
          </div>
        </div>
      </Card>
      <Card
        title={<TranslateTing text="Banners" />}
        style={{ width: "100%" }}
      ></Card>
      <Card
        title={<TranslateTing text="Images advertisement" />}
        style={{ width: "100%" }}
      ></Card>
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

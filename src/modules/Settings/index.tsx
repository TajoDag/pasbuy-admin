import { Button, Card, Image, Input, Row, Space, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { changeKeyChat, createLogoHeader, getKeyChat } from "./apis";
import TranslateTing from "../../components/Common/TranslateTing";
import { UploadOutlined } from "@ant-design/icons";

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const Settings = () => {
  const dispatch = useDispatch();
  const [keyLiveChat, setKeyLiveChat] = useState("");
  const [logoHeader, setLogoHeader] = useState<string | null>(null);

  const handleBeforeUploadLogoHeader = async (file: File) => {
    const base64 = await getBase64(file);
    setLogoHeader(base64);
    return false; // Prevent upload
  };

  const handleChangeLogoHeader = async (info: any) => {
    if (info.file.status === "removed") {
      setLogoHeader(null);
    }
  };
  const handleUpload = async () => {
    if (!logoHeader) {
      dispatch(
        showNotification({
          message: "Please select an image to upload.",
          type: "error",
        })
      );
      return;
    }

    dispatch(startLoading());
    const payload = { image: logoHeader };
    try {
      const rp = await createLogoHeader(payload);

      if (rp.status) {
        message.success("Logo uploaded successfully");
        // setLogoHeader(null);
      } else {
        message.error("Failed to upload logo");
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: "An error occurred while uploading the logo",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

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
  console.log(logoHeader, "dsddd");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card title={<TranslateTing text="Logos" />} style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: 50 }}>
          <div>
            <h3>
              <TranslateTing text="Logo Header" />
            </h3>
            {logoHeader && (
              // <img
              //   src={logoHeader}
              //   alt="avatar"
              //   style={{ marginTop: 10, width: "100%" }}
              // />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Image width={200} src={logoHeader} />
                <Button onClick={handleUpload}>Submit Logo</Button>
              </div>
            )}
          </div>
          <Upload
            name="avatar"
            listType="picture"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={handleBeforeUploadLogoHeader}
            onChange={handleChangeLogoHeader}
            maxCount={1} // Allow only one file to be uploaded
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>

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

import { useState } from "react";
import TranslateTing from "../../../components/Common/TranslateTing";
import { Button, Image, Upload } from "antd";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { createLogoHeader } from "../apis";
import { UploadOutlined } from "@ant-design/icons";

type Props = {
  detailLogoHeader: any;
};

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
const LogoHeader = (props: Props) => {
  const { detailLogoHeader } = props;
  const dispatch = useDispatch();
  const [logoHeader, setLogoHeader] = useState<string | null>(null);
  const [showConfirmLogoHeader, setShowConfirmLogoHeader] =
    useState<boolean>(false);
  const handleBeforeUploadLogoHeader = async (file: File) => {
    const base64 = await getBase64(file);
    setLogoHeader(base64);
    setShowConfirmLogoHeader(true);
    return false; // Prevent upload
  };
  const handleChangeLogoHeader = async (info: any) => {
    if (info.file.status === "removed") {
      setLogoHeader(null);
      setShowConfirmLogoHeader(false);
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
      const rp = await createLogoHeader("6656784a2de1279e93bcc91a", payload);

      if (rp.status) {
        dispatch(
          showNotification({
            message: "Logo uploaded successfully",
            type: "success",
          })
        );
        setShowConfirmLogoHeader(false);
      } else {
        dispatch(
          showNotification({
            message: "Failed to upload logo",
            type: "error",
          })
        );
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
  return (
    <>
      <div>
        <h3>
          <TranslateTing text="Logo Header" />
        </h3>
        {logoHeader ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Image width={200} src={logoHeader} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Image width={200} src={detailLogoHeader} />
          </div>
        )}
        {showConfirmLogoHeader && (
          <Button onClick={handleUpload}>Xác nhận thay đổi</Button>
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
        <Button icon={<UploadOutlined />}>Tải ảnh</Button>
      </Upload>
    </>
  );
};
export default LogoHeader;

import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { createBanner, getBanner, publicBanner } from "../apis";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import TranslateTing from "../../../components/Common/TranslateTing";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const urlToBase64 = (url: string): Promise<string> =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

const Banner: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [base64List, setBase64List] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    const base64Strings = await Promise.all(
      newFileList.map(async (file) => {
        if (file.originFileObj) {
          return await getBase64(file.originFileObj as RcFile);
        } else if (file.url) {
          return await urlToBase64(file.url);
        } else {
          return "";
        }
      })
    );

    const validBase64Strings = base64Strings.filter((base64) => base64);
    setBase64List(validBase64Strings);
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>
        <TranslateTing text="Choose Images" />
      </div>
    </button>
  );

  const beforeUpload = (file: RcFile): boolean => {
    return false; // Prevent automatic upload
  };

  const handleCreate = async () => {
    let payload = {
      images: base64List,
    };
    const rp = await publicBanner("6657d48c85a9f04ae59d06b8", payload);
    if (rp.status) {
      dispatch(
        showNotification({
          message: "Success.",
          type: "success",
        })
      );
    } else {
      dispatch(
        showNotification({
          message: "Error.",
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    const getAllBanner = async () => {
      try {
        const rp = await getBanner("6657d48c85a9f04ae59d06b8");

        if (rp.result && rp.result.images) {
          const imageUrls = rp.result.images.map((image: any) => ({
            uid: image._id,
            name: image.public_id,
            status: "done",
            url: image.url,
          }));
          setFileList(imageUrls);

          const base64Strings = await Promise.all(
            rp.result.images.map(async (image: any) => {
              if (image.url.startsWith("data:image")) {
                return image.url;
              } else {
                return await urlToBase64(image.url);
              }
            })
          );
          setBase64List(base64Strings);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllBanner();
  }, []);
  return (
    <div>
      <Upload
        multiple
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        {uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <div style={{ marginTop: 10 }}>
        <Button onClick={handleCreate}>
          <TranslateTing text="Update" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;

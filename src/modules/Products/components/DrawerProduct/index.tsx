import {
  Button,
  Col,
  Drawer,
  Form,
  FormInstance,
  Image,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllCategory } from "../../../Categories/utils/services";
import { showNotification } from "../../../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { getAllProductType } from "../../../ProductType/utils/services";
import { getAllBrand } from "../../../Brand/utils/services";
import { IProduct } from "../../interfaces";
import TranslateTing from "../../../../components/Common/TranslateTing";
import { useIntl } from "react-intl";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";

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

type Props = {
  title: string;
  onClose: () => void;
  open: boolean;
  width?: string | number;
  onSubmit?: any;
  form: FormInstance<any>;
  oldImages?: string[];
  setOldImages?: Dispatch<SetStateAction<any[]>> | undefined;
  setImages?: Dispatch<SetStateAction<any[]>> | undefined;
  images?: string[];
  setImagesPreview?: Dispatch<SetStateAction<any[]>> | undefined | any;
  imagesPreview?: string[];
  createProductImagesChange?: (e: any) => void;
  dataDetail?: IProduct;
  base64List?: any;
  setBase64List?: any;
  fileList?: any;
  setFileList?: any;
};
const DrawerProduct = (props: Props) => {
  const {
    title,
    onClose,
    open,
    width,
    onSubmit,
    form,
    oldImages,
    setOldImages,
    setImages,
    images,
    setImagesPreview,
    imagesPreview,
    base64List,
    setBase64List,
    fileList,
    setFileList,
    createProductImagesChange,
    dataDetail,
  } = props;
  const dispatch = useDispatch();
  const [listCate, setListCate] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listProductType, setListProductType] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  let newTitle: any = "";
  if (title === "add") {
    newTitle = <TranslateTing text="Add Product" />;
  } else if (title === "update") {
    newTitle = <TranslateTing text="Update product" />;
  }
  const intl = useIntl();
  const success = intl.formatMessage({
    id: "Success",
  });
  const error = intl.formatMessage({
    id: "Error",
  });
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    const getListCategories = async () => {
      try {
        const res = await getAllCategory();
        if (res.status) {
          const formattedCategories = res.result.map((category: any) => ({
            value: category?._id,
            label: category?.name,
          }));
          setListCate(formattedCategories);
        } else {
          setListCate([]);
          dispatch(
            showNotification({
              message: error,
              type: "error",
            })
          );
        }
      } catch (err) {
        setListCate([]);
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      }
    };
    const getListProductType = async () => {
      try {
        const res = await getAllProductType();
        if (res.status) {
          const formatted = res.result.map((item: any) => ({
            value: item?._id,
            label: item?.name,
          }));
          setListProductType(formatted);
        } else {
          setListProductType([]);
          dispatch(
            showNotification({
              message: error,
              type: "error",
            })
          );
        }
      } catch (err) {
        setListProductType([]);
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      }
    };
    const getListBrand = async () => {
      try {
        const res = await getAllBrand();
        if (res.status) {
          const formatted = res.result.map((item: any) => ({
            value: item?._id,
            label: item?.name,
          }));
          setListBrand(formatted);
        } else {
          setListBrand([]);
          dispatch(
            showNotification({
              message: error,
              type: "error",
            })
          );
        }
      } catch (err) {
        setListBrand([]);
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      }
    };
    getListBrand();
    getListProductType();
    getListCategories();
  }, []);
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
      <div style={{ marginTop: 8 }}>Chọn hình ảnh</div>
    </button>
  );

  const beforeUpload = (file: RcFile): boolean => {
    return false; // Prevent automatic upload
  };

  useEffect(() => {
    if (title === "update" && dataDetail) {
      form.setFieldsValue({
        name: dataDetail.name,
        category: dataDetail.category?._id,
        brand: dataDetail.brand?._id,
        price: dataDetail.price,
        importPrice: dataDetail.importPrice,
        Stock: dataDetail.Stock,
        description: dataDetail.description,
        featured: dataDetail.featured,
        todayDeal: dataDetail.todayDeal,
        flashDeal: dataDetail.flashDeal,
      });

      // if (dataDetail.images && setImagesPreview) {
      //   const imagesURLs = dataDetail.images.map((image: any) => image.url);
      //   setImagesPreview(imagesURLs);
      // }
    }
  }, [title, dataDetail, form, setImagesPreview]);
  const placeholderName = intl.formatMessage({ id: "Please enter name" });
  const placeholderCate = intl.formatMessage({
    id: "Please choose category",
  });
  const placeholderBrand = intl.formatMessage({ id: "Please choose brand" });
  const placeholderPrice = intl.formatMessage({ id: "Please enter price" });
  const placeholderImportPrice = intl.formatMessage({
    id: "Please enter import price",
  });
  const placeholderStock = intl.formatMessage({ id: "Please enter stock" });
  const placeholderDescription = intl.formatMessage({
    id: "Please enter description",
  });
  return (
    <div>
      <Drawer
        width={width}
        title={newTitle}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>
              <TranslateTing text="Cancel" />
            </Button>
            <Button onClick={() => form.submit()} type="primary">
              <TranslateTing text="Submit" />
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          // initialValues={dataDetail}
          onFinish={onSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label={<TranslateTing text="Name" />}
                rules={[{ required: true, message: placeholderName }]}
              >
                <Input placeholder={placeholderName} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Space>
                <Form.Item
                  name="featured"
                  label={<TranslateTing text="Featured" />}
                  initialValue={false}
                >
                  <Switch defaultChecked />
                </Form.Item>
                <Form.Item
                  name="todayDeal"
                  label={<TranslateTing text="Today Deal" />}
                  initialValue={false}
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
                <Form.Item
                  name="flashDeal"
                  label={<TranslateTing text="Flash Deal" />}
                  initialValue={false}
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label={<TranslateTing text="Category" />}
                rules={[{ required: true, message: placeholderCate }]}
              >
                <Select
                  showSearch
                  placeholder={placeholderCate}
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={listCate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="brand"
                label={<TranslateTing text="Brand" />}
                rules={[{ required: true, message: placeholderBrand }]}
              >
                <Select
                  showSearch
                  placeholder={placeholderBrand}
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={listBrand}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label={
                  <p>
                    <TranslateTing text="Price" /> ($)
                  </p>
                }
                rules={[{ required: true, message: placeholderPrice }]}
              >
                <Input placeholder={placeholderPrice} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="importPrice"
                label={
                  <p>
                    <TranslateTing text="Import price" /> ($)
                  </p>
                }
                rules={[{ required: true, message: placeholderImportPrice }]}
              >
                <Input placeholder={placeholderImportPrice} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Stock"
                label={<TranslateTing text="Stock" />}
                rules={[{ required: true, message: placeholderStock }]}
              >
                <Input placeholder={placeholderStock} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label={<TranslateTing text="Description" />}
                rules={[
                  {
                    required: true,
                    message: placeholderDescription,
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    form.setFieldsValue({ description: editor.getData() });
                  }}
                  data={dataDetail ? dataDetail.description : ""}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="images" label={<TranslateTing text="Images" />}>
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
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflowX: "auto",
            padding: "10px",
          }}
        >
          {imagesPreview &&
            imagesPreview.map((image, index) => (
              <div
                key={index}
                style={{
                  padding: 5,
                  border: "0.5px solid #D9D9D9",
                  marginRight: 10,
                }}
              >
                <Image
                  src={image}
                  alt="Product Preview"
                  width={100}
                  style={{ marginRight: "10px" }}
                />
              </div>
            ))}
        </div> */}

        {/* <div style={{ marginTop: 30 }}>
          <input
            type="file"
            name="images"
            className="inputImageProduct"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
          />
        </div> */}
      </Drawer>
    </div>
  );
};
export default DrawerProduct;

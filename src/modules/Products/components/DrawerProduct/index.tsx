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
import { UploadOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllCategory } from "../../../Categories/utils/services";
import { showNotification } from "../../../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { getAllProductType } from "../../../ProductType/utils/services";
import { getAllBrand } from "../../../Brand/utils/services";
import { IProduct } from "../../interfaces";
import TranslateTing from "../../../../components/Common/TranslateTing";
import { useIntl } from "react-intl";
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
    createProductImagesChange,
    dataDetail,
  } = props;
  const dispatch = useDispatch();
  const [listCate, setListCate] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listProductType, setListProductType] = useState([]);
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

      if (dataDetail.images && setImagesPreview) {
        const imagesURLs = dataDetail.images.map((image: any) => image.url);
        setImagesPreview(imagesURLs);
      }
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
        </Form>

        <div
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
        </div>

        <div style={{ marginTop: 30 }}>
          <input
            type="file"
            name="images"
            className="inputImageProduct"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
          />
        </div>
      </Drawer>
    </div>
  );
};
export default DrawerProduct;

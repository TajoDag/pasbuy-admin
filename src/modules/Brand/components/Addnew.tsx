import { Button, Col, Input, Modal, Row, Space } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import AppNotification from "../../../components/AppNotification";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { createBrand, updateBrand } from "../utils/services";
import TranslateTing from "../../../components/Common/TranslateTing";
interface IProps {
  open: boolean;
  onCancel: () => void;
  refecth: () => void;
  detail: any;
}
const validate = Yup.object().shape({
  name: Yup.string().required("Brand name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone number is required"),
});
export const Addnew = (props: IProps) => {
  const { open, onCancel, refecth, detail } = props;
  const dispatch = useDispatch();
  const formikRef = React.useRef<any>(null);
  const handleSubmit = async (values: any) => {
    if (!detail._id) {
      await createBrand(values)
        .then((res: any) => {
          if (res.status) {
            dispatch(
              showNotification({
                message: `${res.message}`,
                type: "success",
              })
            );
            onCancel();
            refecth();
            formikRef.current?.resetForm();
          }
        })
        .catch((err: any) => {
          dispatch(
            showNotification({
              message: "Oop! Something wrong, try later!",
              type: "error",
            })
          );
        });
    } else {
      await updateBrand(detail._id, values)
        .then((res: any) => {
          if (res.status) {
            dispatch(
              showNotification({
                message: `${res.message}`,
                type: "success",
              })
            );
            onCancel();
            refecth();
            formikRef.current?.resetForm();
          }
        })
        .catch((err: any) => {
          dispatch(
            showNotification({
              message: "Oop! Something wrong, try later!",
              type: "error",
            })
          );
        });
    }
  };

  useEffect(() => {
    if (Object.keys(detail).length === 0) return;
    formikRef.current?.setValues({
      ...detail,
    });
  }, [detail]);

  return (
    <Modal width={500} open={open} onCancel={onCancel} footer={false} centered>
      <h2>
        {!detail._id ? (
          <TranslateTing text="Add new a " />
        ) : (
          <TranslateTing text="Edit the " />
        )}
        <TranslateTing text="Brand" />
      </h2>
      <Formik
        initialValues={{ name: "", address: "", phone: "" }}
        onSubmit={(values: any) => handleSubmit(values)}
        validationSchema={validate}
        innerRef={formikRef}
      >
        {(propsFormik: FormikProps<any>) => {
          return (
            <Form>
              <Row gutter={[15, 10]}>
                <Col xs={24} sm={12} lg={8} xl={12}>
                  <b>
                    <TranslateTing text="Brand name" />
                  </b>
                  <Field name="name">
                    {({ field }: any) => <Input {...field} />}
                  </Field>
                  {propsFormik.touched.name && propsFormik.errors.name && (
                    <div style={{ color: "red", fontStyle: "italic" }}>
                      {String(propsFormik.errors.name)}
                    </div>
                  )}
                </Col>
                <Col xs={24} sm={12} lg={8} xl={12}>
                  <b>
                    <TranslateTing text="Phone number" />
                  </b>
                  <Field name="phone">
                    {({ field }: any) => <Input {...field} />}
                  </Field>
                  {propsFormik.touched.phone && propsFormik.errors.phone && (
                    <div style={{ color: "red", fontStyle: "italic" }}>
                      {String(propsFormik.errors.phone)}
                    </div>
                  )}
                </Col>
                <Col xs={24} sm={12} lg={8} xl={24}>
                  <b>
                    {" "}
                    <TranslateTing text="Address" />
                  </b>
                  <Field name="address">
                    {({ field }: any) => <Input {...field} />}
                  </Field>
                  {propsFormik.touched.address &&
                    propsFormik.errors.address && (
                      <div style={{ color: "red", fontStyle: "italic" }}>
                        {String(propsFormik.errors.address)}
                      </div>
                    )}
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  lg={8}
                  xl={24}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Space size="small">
                    <Button htmlType="submit">
                      <TranslateTing text="Save" />
                    </Button>
                    <Button
                      htmlType="reset"
                      onClick={() => {
                        onCancel();
                      }}
                    >
                      <TranslateTing text="Cancel" />
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

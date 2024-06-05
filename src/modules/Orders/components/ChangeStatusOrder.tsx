import { Button, Col, Input, Modal, Row, Select, Space } from "antd";
import TranslateTing from "../../../components/Common/TranslateTing";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { updateStatusOrders, updateStatusOrdersAgency } from "../apis";
import { useIntl } from "react-intl";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
type Props = {
  onClose?: any;
  open: boolean;
  data?: any;
  refecth?: any;
};

const { Option } = Select;
const ModalChangeStatusOrder = (props: Props) => {
  const { onClose, open, data, refecth } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(data?.orderStatus || "");
  const [orderLocation, setOrderLocation] = useState(data?.orderLocation || "");
  const intl = useIntl();
  const success = intl.formatMessage({
    id: "Success",
  });
  const error = intl.formatMessage({
    id: "Error",
  });
  useEffect(() => {
    setStatus(data?.orderStatus || "");
    setOrderLocation(data?.orderLocation || "");
  }, [data]);

  const handleChange = (value: any) => {
    setStatus(value);
  };

  const handelChangeStatus = async () => {
    dispatch(startLoading());
    let payload = {
      status: status,
      orderLocation: orderLocation,
    };
    if (data.user.role === "admin") {
      try {
        const rp = await updateStatusOrders(data._id, payload);
        if (rp.status) {
          dispatch(
            showNotification({
              message: success,
              type: "success",
            })
          );
          refecth();
          onClose();
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
    } else {
      try {
        const rp = await updateStatusOrdersAgency(data._id, payload);
        if (rp.status) {
          dispatch(
            showNotification({
              message: "Success.",
              type: "success",
            })
          );
          refecth();
          onClose();
        }
      } catch (err) {
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    }
  };

  return (
    <Modal
      title={<TranslateTing text="Change status order" />}
      // centered
      open={open}
      onCancel={onClose}
      footer={null}
      width="40%"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Select
              value={status}
              style={{
                width: "100%",
              }}
              onChange={handleChange}
            >
              {data?.orderStatus === "Processing" && (
                <>
                  <Option value="Delivering">
                    <TranslateTing text="Delivering" />
                  </Option>
                  <Option value="Cancel">
                    <TranslateTing text="Cancel" />
                  </Option>
                </>
              )}
              {data?.orderStatus === "Delivering" && (
                <Option value="Successful delivery">
                  <TranslateTing text="Successful delivery" />
                </Option>
              )}
            </Select>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Input
              value={orderLocation}
              onChange={(e) => setOrderLocation(e.target.value)}
            />
          </Col>
        </Row>
        <div
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Space>
            <div className="btn_cancel">
              <Button htmlType="button" onClick={onClose}>
                <TranslateTing text="Cancel" />
              </Button>
            </div>
            {data?.orderStatus !== "Successful delivery" && (
              <div className="btn_submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handelChangeStatus}
                  style={{ background: "#e62e05" }}
                >
                  <TranslateTing text="Submit" />
                </Button>
              </div>
            )}
          </Space>
        </div>
      </div>
    </Modal>
  );
};
export default ModalChangeStatusOrder;

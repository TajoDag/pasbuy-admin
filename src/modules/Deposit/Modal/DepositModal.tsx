import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import TranslateTing from "../../../components/Common/TranslateTing";
import { getListUserAll } from "../../Accounts/api";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { depositToUser } from "../apis";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { useIntl } from "react-intl";

type Props = {
  onClose?: any;
  open: boolean;
  data?: any;
  refecth?: any;
  form: FormInstance<any>;
};

const DepositModal = (props: Props) => {
  const { onClose, open, data, refecth, form } = props;
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState<any[]>([]);
  const [isCurrencySelected, setIsCurrencySelected] = useState<boolean>(false);
  const intl = useIntl();
  const success = intl.formatMessage({
    id: "Success",
  });
  const error = intl.formatMessage({
    id: "Error",
  });
  useEffect(() => {
    const getListUser = async () => {
      try {
        const response: any = await getListUserAll();
        if (response.status) {
          const users = response.result.map((user: any) => ({
            label: user.name,
            value: user._id,
          }));
          setDataUser(users);
        }
      } catch (err) {
        setDataUser([]);
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      }
    };
    getListUser();
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleCurrencyChange = (value: string) => {
    setIsCurrencySelected(!!value);
  };

  const convertToUSD = (amount: number, currency: string): number => {
    const exchangeRates: { [key: string]: number } = {
      USD: 1,
      VND: 1 / 25000,
      CNY: 1 / 6.5,
    };

    const convertedAmount = amount * (exchangeRates[currency] || 1);
    return parseFloat(convertedAmount.toFixed(2));
  };

  const onFinish = async (values: any) => {
    const convertedAmount = convertToUSD(values.amount, values.currency);
    let payload = {
      customer: values.customer,
      message: values.message,
      amount: convertedAmount,
    };
    dispatch(startLoading());
    try {
      const rp = await depositToUser(payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: success,
            type: "success",
          })
        );
        refecth && refecth();
        onClose && onClose();
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

  return (
    <Modal
      title={<TranslateTing text="Deposit to user" />}
      open={open}
      onCancel={onClose}
      footer={null}
      width="40%"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Customer" />}
                name="customer"
                rules={[
                  {
                    required: true,
                    message: (
                      <TranslateTing text="Please input your customer!" />
                    ),
                  },
                ]}
              >
                <Select
                  showSearch
                  // placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={dataUser}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Currency" />}
                name="currency"
                rules={[
                  {
                    required: true,
                    message: (
                      <TranslateTing text="Please input your currency!" />
                    ),
                  },
                ]}
              >
                <Select
                  showSearch
                  // placeholder="Select a currency"
                  optionFilterProp="children"
                  options={[
                    { value: "USD", label: <TranslateTing text="dolla" /> },
                    { value: "VND", label: <TranslateTing text="vnd" /> },
                    { value: "CNY", label: <TranslateTing text="cny" /> },
                  ]}
                  onChange={handleCurrencyChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Message" />}
                name="message"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Amount" />}
                name="amount"
                rules={[
                  {
                    required: true,
                    message: <TranslateTing text="Please input your amount!" />,
                  },
                ]}
              >
                <Input type="number" disabled={!isCurrencySelected} />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Button htmlType="button" onClick={onClose}>
                <TranslateTing text="Cancel" />
              </Button>
              <Button type="primary" htmlType="submit">
                <TranslateTing text="OK" />
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DepositModal;

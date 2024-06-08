// import { Button, Col, Input, Modal, Row, Select, Space, Table } from "antd";
// import TranslateTing from "../../../components/Common/TranslateTing";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { showNotification } from "../../../redux/reducers/notificationReducer";
// import { updateStatusOrders, updateStatusOrdersAgency } from "../apis";
// import { useIntl } from "react-intl";
// import {
//   startLoading,
//   stopLoading,
// } from "../../../redux/reducers/loadingReducer";
// import { splitText } from "../../../utils";
// type Props = {
//   onClose?: any;
//   open: boolean;
//   data?: any;
//   refecth?: any;
//   CusAgency?: any;
// };

// const { Option } = Select;
// const ModalChangeStatusOrder = (props: Props) => {
//   const { onClose, open, data, refecth, CusAgency } = props;
//   console.log(data);
//   const dispatch = useDispatch();
//   const [status, setStatus] = useState(data?.orderStatus || "");
//   const [orderLocation, setOrderLocation] = useState(data?.orderLocation || "");
//   const intl = useIntl();
//   const success = intl.formatMessage({
//     id: "Success",
//   });
//   const error = intl.formatMessage({
//     id: "Error",
//   });
//   useEffect(() => {
//     setStatus(data?.orderStatus || "");
//     setOrderLocation(data?.orderLocation || "");
//   }, [data]);

//   const handleChange = (value: any) => {
//     setStatus(value);
//   };

//   const handleQuantityChange = (record: any, value: number) => {
//     // const updatedRows = data.orderItems.map((row: any) => {
//     //   if (row.key === record.key) {
//     //     const totalAmount = value * row.price;
//     //     return { ...row, quantity: value, totalAmount };
//     //   }
//     //   return row;
//     // });
//   };
//   const handelChangeStatus = async () => {
//     dispatch(startLoading());
//     let payload = {
//       status: status,
//       orderLocation: orderLocation,
//     };
//     if (data.user.role === "admin") {
//       try {
//         const rp = await updateStatusOrders(data._id, payload);
//         if (rp.status) {
//           dispatch(
//             showNotification({
//               message: success,
//               type: "success",
//             })
//           );
//           refecth();
//           onClose();
//         }
//       } catch (err) {
//         dispatch(
//           showNotification({
//             message: error,
//             type: "error",
//           })
//         );
//       } finally {
//         dispatch(stopLoading());
//       }
//     } else {
//       try {
//         const rp = await updateStatusOrdersAgency(data._id, payload);
//         if (rp.status) {
//           dispatch(
//             showNotification({
//               message: "Success.",
//               type: "success",
//             })
//           );
//           refecth();
//           onClose();
//         }
//       } catch (err) {
//         dispatch(
//           showNotification({
//             message: "Lấy dữ liệu thất bại.",
//             type: "error",
//           })
//         );
//       } finally {
//         dispatch(stopLoading());
//       }
//     }
//   };
//   const columnItems: any = [
//     {
//       title: <TranslateTing text="Name" />,
//       dataIndex: "name",
//       key: "name",
//       width: 250,
//       align: "left",
//       render: (_: any, record: any) => {
//         return <p>{splitText(record.name, 70)}</p>;
//       },
//     },
//     {
//       title: (
//         <p>
//           <TranslateTing text="Price" /> ($)
//         </p>
//       ),
//       dataIndex: "price",
//       key: "price",
//       width: 120,
//       align: "center",
//     },
//     {
//       title: <TranslateTing text="Quantity" />,
//       dataIndex: "quantity",
//       key: "quantity",
//       width: 120,
//       align: "center",
//       render: (_: any, record: any) => (
//         <Input
//           type="number"
//           min={1}
//           value={record.quantity}
//           onChange={(e) =>
//             handleQuantityChange(record, parseInt(e.target.value, 10))
//           }
//         />
//       ),
//     },
//     {
//       title: <TranslateTing text="Total Amount" />,
//       dataIndex: "totalAmount",
//       align: "center",
//     },
//   ];
//   return (
//     <Modal
//       title={<TranslateTing text="Change status order" />}
//       // centered
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       width="40%"
//     >
//       <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//         <Row gutter={16}>
//           <Col span={24}>
//             <Select
//               value={status}
//               style={{
//                 width: "100%",
//               }}
//               onChange={handleChange}
//             >
//               {data?.orderStatus === "Processing" && (
//                 <>
//                   <Option value="Delivering">
//                     <TranslateTing text="Delivering" />
//                   </Option>
//                   <Option value="Cancel">
//                     <TranslateTing text="Cancel" />
//                   </Option>
//                 </>
//               )}
//               {data?.orderStatus === "Delivering" && (
//                 <Option value="Successful delivery">
//                   <TranslateTing text="Successful delivery" />
//                 </Option>
//               )}
//             </Select>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={24}>
//             <Input
//               value={orderLocation}
//               onChange={(e) => setOrderLocation(e.target.value)}
//             />
//           </Col>
//         </Row>
//         {CusAgency === "agency" && (
//           <Row gutter={16}>
//             <Col span={24}>
//               <Table columns={columnItems} dataSource={data.orderItems} />
//             </Col>
//           </Row>
//         )}
//         <div
//           style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
//         >
//           <Space>
//             <div className="btn_cancel">
//               <Button htmlType="button" onClick={onClose}>
//                 <TranslateTing text="Cancel" />
//               </Button>
//             </div>
//             {data?.orderStatus !== "Successful delivery" && (
//               <div className="btn_submit">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   onClick={handelChangeStatus}
//                   style={{ background: "#e62e05" }}
//                 >
//                   <TranslateTing text="Submit" />
//                 </Button>
//               </div>
//             )}
//           </Space>
//         </div>
//       </div>
//     </Modal>
//   );
// };
// export default ModalChangeStatusOrder;
import { Button, Col, Input, Modal, Row, Select, Space, Table } from "antd";
import TranslateTing from "../../../components/Common/TranslateTing";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import {
  updateOrdersAgencyAdmin,
  updateStatusOrders,
  updateStatusOrdersAgency,
} from "../apis";
import { useIntl } from "react-intl";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { splitText } from "../../../utils";

type Props = {
  onClose?: any;
  open: boolean;
  data?: any;
  refecth?: any;
  CusAgency?: any;
};

const { Option } = Select;
const ModalChangeStatusOrder = (props: Props) => {
  const { onClose, open, data, refecth, CusAgency } = props;
  const dispatch = useDispatch();
  const [status, setStatus] = useState(data?.orderStatus || "");
  const [orderLocation, setOrderLocation] = useState(data?.orderLocation || "");
  const [orderItems, setOrderItems] = useState(data?.orderItems || []);
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
    setOrderLocation(data?.orderLocation || "");
    const updatedItems = data?.orderItems?.map((item: any) => {
      const product = item.product.find((p: any) => p.name === item.name);
      return {
        ...item,
        quantity: item.quantity || 0,
        totalAmount: item.quantity
          ? item.quantity * item.price
          : "Chưa thanh toán",
        productId: product ? product._id : null,
      };
    });
    setOrderItems(updatedItems || []);
  }, [data]);

  const handleChange = (value: any) => {
    setStatus(value);
  };

  const handleQuantityChange = (record: any, value: number) => {
    const updatedRows = orderItems.map((row: any) => {
      if (row.key === record.key) {
        const totalAmount = value === 0 ? "Chưa thanh toán" : value * row.price;
        return { ...row, quantity: value, totalAmount };
      }
      return row;
    });
    setOrderItems(updatedRows);
  };

  const handelChangeStatus = async () => {
    dispatch(startLoading());
    let payload = {
      status: status,
      orderLocation: orderLocation,
    };
    try {
      const rp =
        data.user.role === "admin"
          ? await updateStatusOrders(data._id, payload)
          : await updateStatusOrdersAgency(data._id, payload);

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
  };
  const handleChangeStatusAgency = async () => {
    dispatch(startLoading());
    let payload = {
      orderStatus: status,
      orderId: data._id,
      orderItems: orderItems,
    };

    try {
      const rp = await updateOrdersAgencyAdmin(payload);

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
  };

  const columnItems: any = [
    {
      title: <TranslateTing text="Name" />,
      dataIndex: "name",
      key: "name",
      width: 250,
      align: "left",
      render: (_: any, record: any) => {
        return <p>{splitText(record.name, 70)}</p>;
      },
    },
    {
      title: (
        <p>
          <TranslateTing text="Price" /> ($)
        </p>
      ),
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "center",
    },
    {
      title: <TranslateTing text="Quantity" />,
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      align: "center",
      render: (_: any, record: any) => (
        <Input
          type="number"
          min={0}
          value={record.quantity}
          onChange={(e) =>
            handleQuantityChange(record, parseInt(e.target.value, 10))
          }
        />
      ),
    },
    {
      title: (
        <p>
          {" "}
          <TranslateTing text="Total Amount" /> ($)
        </p>
      ),
      dataIndex: "totalAmount",
      align: "center",
      render: (text: any) => <p>{text === 0 ? "Chưa thanh toán" : text}</p>,
    },
  ];

  return (
    <Modal
      title={<TranslateTing text="Change status order" />}
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
              {data?.orderStatus === "Pending Payment" && (
                <Option value="Paid">
                  <TranslateTing text="Paid" />
                </Option>
              )}
            </Select>
          </Col>
        </Row>
        {CusAgency !== "agency" && (
          <Row gutter={16}>
            <Col span={24}>
              <Input
                value={orderLocation}
                onChange={(e) => setOrderLocation(e.target.value)}
              />
            </Col>
          </Row>
        )}

        {CusAgency === "agency" && (
          <Row gutter={16}>
            <Col span={24}>
              <Table columns={columnItems} dataSource={orderItems} />
            </Col>
          </Row>
        )}
        <div
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Space>
            <div className="btn_cancel">
              <Button htmlType="button" onClick={onClose}>
                <TranslateTing text="Cancel" />
              </Button>
            </div>

            {data?.orderStatus !== "Successful delivery" &&
              data?.orderStatus !== "Paid" && (
                <div className="btn_submit">
                  {CusAgency === "agency" ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleChangeStatusAgency}
                      style={{ background: "#e62e05" }}
                    >
                      <TranslateTing text="Submit" />
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handelChangeStatus}
                      style={{ background: "#e62e05" }}
                    >
                      <TranslateTing text="Submit" />
                    </Button>
                  )}
                </div>
              )}
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChangeStatusOrder;

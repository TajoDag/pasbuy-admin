import { Button, Popconfirm, Space, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { Addnew } from "./Addnew";
import { Tags } from "../../../components/Tag";
import { RiDeleteBin5Line } from "react-icons/ri";
import useRefresh from "../../../hooks/useRefresh";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { useDispatch } from "react-redux";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { deleteBrand, getAllBrand } from "../utils/services";

export const TableCategory = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [refresh, refecth] = useRefresh();
  const dispatch = useDispatch();
  const [detail, setDetail] = React.useState<any>({});
  const handleDelete = async (id: string) => {
    await deleteBrand(id)
      .then((res) => {
        dispatch(
          showNotification({
            message: `${res.message}`,
            type: "success",
          })
        );
        refecth();
      })
      .catch((err: any) => console.log(err));
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      align: "center" as "center",
      width: 60,
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: 400,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center" as "center",
      width: 70,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center" as "center",
      width: 100,
      render: (value: any) => Tags(value),
    },
    {
      title: "",
      align: "center" as "center",
      width: 100,
      render: (_: any, record: any, index: number) => {
        return (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                icon={<TbEdit />}
                onClick={() => {
                  setOpen(true);
                  setDetail(record);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete the Brand"
                description="Are you sure to delete this Brand?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => handleDelete(record._id)}
              >
                <Button icon={<RiDeleteBin5Line />} />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(startLoading());
    getAllBrand()
      .then((res: any) => {
        setData(
          res.result.map((item: any) => ({
            ...item,
            key: item.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  }, [refresh]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Brand</h2>
        <Button
          icon={<CiCirclePlus />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add new
        </Button>
      </div>
      <Table columns={columns} bordered pagination={false} dataSource={data} />
      <Addnew
        open={open}
        onCancel={() => {
          setOpen(false);
          setDetail({});
        }}
        refecth={refecth}
        detail={detail}
      />
    </div>
  );
};

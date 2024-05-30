import { Button, Popconfirm, Space, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { deleteCategory, getAllCategory } from "../utils/services";
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
import TranslateTing from "../../../components/Common/TranslateTing";

export const TableCategory = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [refresh, refecth] = useRefresh();
  const dispatch = useDispatch();
  const [detail, setDetail] = React.useState<any>({});
  const handleDelete = async (id: string) => {
    await deleteCategory(id)
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
      title: <TranslateTing text="#" />,
      align: "center" as "center",
      width: 60,
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: <TranslateTing text="Name" />,
      dataIndex: "name",
      width: 400,
    },
    {
      title: <TranslateTing text="Status" />,
      dataIndex: "status",
      align: "center" as "center",
      width: 100,
      render: (value: any) => Tags(value),
    },
    {
      title: <TranslateTing text="Is Show" />,
      dataIndex: "isShow",
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
            <Tooltip title={<TranslateTing text="Edit" />}>
              <Button
                icon={<TbEdit />}
                onClick={() => {
                  setOpen(true);
                  setDetail(record);
                }}
              />
            </Tooltip>
            <Tooltip title={<TranslateTing text="Delete" />}>
              <Popconfirm
                title={<TranslateTing text="Delete the category" />}
                description={
                  <TranslateTing text="Are you sure to delete this category?" />
                }
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => handleDelete(record._id)}
                okText={<TranslateTing text="OK" />}
                cancelText={<TranslateTing text="Cancel" />}
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
    getAllCategory()
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
        <h2>
          <TranslateTing text="Categories" />
        </h2>
        <Button
          // icon={<CiCirclePlus />}
          onClick={() => {
            setOpen(true);
          }}
        >
          <TranslateTing text="Add new" />
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

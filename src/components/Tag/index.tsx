import { Tag } from "antd";

export const Tags = (value: boolean) => {
  switch (value) {
    case true:
      return <Tag color="#87d068"> Active</Tag>;
    case false:
      return <Tag color="#f50"> Deactive</Tag>;
  }
};

import { Tag } from "antd";

export const TagsOrder = (value: string) => {
  switch (value) {
    case "Processing":
      return <Tag color="volcano">Processing</Tag>;
    case "Delivering":
      return <Tag color="geekblue">Delivering</Tag>;
    case "Successful delivery":
      return <Tag color="green">Successful delivery</Tag>;
  }
};

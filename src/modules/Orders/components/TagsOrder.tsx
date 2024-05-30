import { Tag } from "antd";
import TranslateTing from "../../../components/Common/TranslateTing";

export const TagsOrder = (value: string) => {
  switch (value) {
    case "Processing":
      return (
        <Tag color="volcano">
          <TranslateTing text="Processing" />
        </Tag>
      );
    case "Delivering":
      return (
        <Tag color="geekblue">
          <TranslateTing text="Delivering" />
        </Tag>
      );
    case "Successful delivery":
      return (
        <Tag color="green">
          <TranslateTing text="Successful delivery" />
        </Tag>
      );
    case "Cancel":
      return (
        <Tag color="red">
          <TranslateTing text="Cancel" />
        </Tag>
      );
    case "success":
      return (
        <Tag color="green">
          <TranslateTing text="success" />
        </Tag>
      );
    case "cancel":
      return (
        <Tag color="red">
          <TranslateTing text="cancel" />
        </Tag>
      );
  }
};

import { Tag } from "antd";
import TranslateTing from "../Common/TranslateTing";

export const Tags = (value: boolean) => {
  switch (value) {
    case true:
      return (
        <Tag color="#87d068">
          <TranslateTing text="Active" />
        </Tag>
      );
    case false:
      return (
        <Tag color="#f50">
          <TranslateTing text="Deactive" />
        </Tag>
      );
  }
};

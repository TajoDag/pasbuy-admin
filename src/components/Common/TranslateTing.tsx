import React from "react";
import { FormattedMessage } from "react-intl";

interface TranslateTingProps {
  text: string;
  values?: {
    [key: string]: string | number | boolean | Date | null | undefined;
  };
}

const TranslateTing: React.FC<TranslateTingProps> = ({ text, values }) => (
  <FormattedMessage id={text} defaultMessage={text} values={values} />
);

export default TranslateTing;

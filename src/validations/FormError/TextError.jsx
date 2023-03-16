/*prompting with errors */
import React from "react";

const TextError = (props) => {
  return <div className="text-l text-red-600">{props.children}</div>;
};

export default TextError;

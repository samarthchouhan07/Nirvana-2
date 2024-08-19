import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  label?: string;
  className?: string;
};

const Button = ({ onClick=()=>{},disabled, label, className }: Props) => {
  const defaultClassName =
    "w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className ? className : defaultClassName}
    >
      {disabled ? <ClipLoader /> : label}
    </button>
  );
};

export default Button;

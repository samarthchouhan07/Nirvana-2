import React from "react";

type Props = {
  type: string;
  placeholder?: string;
  register?: any;
  className?: string;
  id?: any;
  step?: any;
};

const Input = ({
  type,
  placeholder,
  register,
  className,
  id = undefined,
  step = undefined,
}: Props) => {
  const defaultClassname = "text-slate-400 rounded-md w-2/3 outline-none p-2 ";
  return (
    <div>
      <input
        type={type}
        className={className ? className : defaultClassname}
        placeholder={placeholder}
        step={step}
        id={id}
        {...register}
      />
    </div>
  );
};

export default Input;

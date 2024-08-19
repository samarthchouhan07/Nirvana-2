import React from "react";
var Input = function (_a) {
    var type = _a.type, placeholder = _a.placeholder, register = _a.register, className = _a.className, _b = _a.id, id = _b === void 0 ? undefined : _b, _c = _a.step, step = _c === void 0 ? undefined : _c;
    var defaultClassname = "text-slate-400 rounded-md w-2/3 outline-none p-2 ";
    return (<div>
      <input type={type} className={className ? className : defaultClassname} placeholder={placeholder} step={step} id={id} {...register}/>
    </div>);
};
export default Input;

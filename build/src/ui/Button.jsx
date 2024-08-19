import React from "react";
import { ClipLoader } from "react-spinners";
var Button = function (_a) {
    var _b = _a.onClick, onClick = _b === void 0 ? function () { } : _b, disabled = _a.disabled, label = _a.label, className = _a.className;
    var defaultClassName = "w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700";
    return (<button onClick={onClick} disabled={disabled} className={className ? className : defaultClassName}>
      {disabled ? <ClipLoader /> : label}
    </button>);
};
export default Button;

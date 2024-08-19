import React from "react";
var Select = function (_a) {
    var data = _a.data, register = _a.register, className = _a.className;
    var defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2";
    return (<select className={"".concat(className ? className : defaultClassName)} {...register}>
      {data === null || data === void 0 ? void 0 : data.map(function (element) { return (<option key={element.value} value={element.value}>
          {element.text ? element.text : element.city}
        </option>); })}
    </select>);
};
export default Select;

import React , { useId } from "react";

function Selector({ label, className = "", options = [],  ...prop } , ref) {
  const id = useId();
  return (
    <div className="w-full">

      {label &&  <label className="" htmlFor={id}> {label} </label>}

      <select id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...prop} ref={ref}>
        {options &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Selector);
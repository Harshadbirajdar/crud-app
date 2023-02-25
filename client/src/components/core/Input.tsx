import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  className?: string;
  wrapperClass?: string;
  isRequired?: boolean;
  onChange?: any;
  onBlur?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type = "text",
      error,
      className,
      wrapperClass,
      isRequired = false,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => (
    <div className={`relative ${wrapperClass || ""}`}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium  ${
          error ? " text-red-400" : " text-gray-700"
        }`}
      >
        {label} {isRequired ? " *" : ""}
      </label>
      <div className="mt-1">
        <input
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          {...rest}
          id={name}
          type={type}
          required={isRequired}
          className={`block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm ${
            className || ""
          }
          ${
            error
              ? `border-red-400 focus:border-red-500 focus:outline-none focus:ring-red-500`
              : "border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          }
          `}
        />
      </div>
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </div>
  )
);

Input.displayName = "Input";

export default Input;

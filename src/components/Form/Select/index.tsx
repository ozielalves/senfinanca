import { useField } from "@unform/core";
import { useEffect, useRef, InputHTMLAttributes } from "react";
import { CustomSelect } from "./styles";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
}

function Select(props: SelectProps) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(
    props.name
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className="select-container">
      <CustomSelect
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...props}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default Select;

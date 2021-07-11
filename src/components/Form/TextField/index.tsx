import { useField } from "@unform/core";
import { useEffect, useRef, InputHTMLAttributes } from "react";
import { CustomInput } from "./styles";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

function TextField(props: TextFieldProps) {
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
    <>
      <CustomInput
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...props}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
}

export default TextField;

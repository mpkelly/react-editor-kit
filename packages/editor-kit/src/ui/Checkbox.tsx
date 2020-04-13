import React from "react";

export interface CheckboxProps {
  checked: boolean;
  onChange(checked: boolean): void;
  label: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, checked, onChange } = props;
  return (
    <label className="rek-check-container" onClick={() => onChange(!checked)}>
      <input type="checkbox" checked={checked} />
      <span className="rek-checkmark "></span>
      {label}
    </label>
  );
};

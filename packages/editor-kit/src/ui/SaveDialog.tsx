import React, { FunctionComponent, useState, useCallback } from "react";
import { stopEvent } from "./Utils";

export interface SaveDialogProps {
  value?: string;
  onSave(value?: string): void;
  className?: string;
  placeholderText?: string;
  saveButtonText?: string;
}

export const SaveDialog: FunctionComponent<SaveDialogProps> = (
  props: SaveDialogProps
) => {
  const {
    value: initialValue,
    onSave,
    placeholderText,
    saveButtonText,
    className,
  } = props;
  const [value, setValue] = useState(initialValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSave = useCallback(() => {
    onSave(value);
  }, [value]);

  return (
    <div
      className={"rek-panel rek-save-dialog " + className}
      onClick={stopEvent}
      data-slate-zero-width="z"
    >
      <input
        autoFocus
        value={value}
        onChange={handleChange}
        className="rek-input"
        placeholder={placeholderText}
      />
      <button className="rek-button" onClick={handleSave}>
        {saveButtonText}
      </button>
    </div>
  );
};

SaveDialog.defaultProps = {
  className: "",
  value: "",
};

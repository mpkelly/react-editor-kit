import { PopupContentLayer } from "../../ui/Layers";

export const ColorGlobalStyle = `
.rek-color-picker {
  display:flex;
}
.rek-color-picker-panel {
  display:flex;
  flex-direction:column;      
  padding:8px;
}

.rek-color-picker-panel:first-child {
  margin-right:4px;
}

.rek-color-picker-panel:last-child {
  margin-left:4px;
}

.rek-color-picker-row {
  display:flex;
}

.rek-color-picker-color {
  margin:3px;
  height:18px;
  width:18px;
  cursor:pointer;
  border: 1px solid transparent;
}

.rek-color-picker-nocolor {
  margin:3px;
  height:18px;
  width:18px;
  cursor:pointer;
  border: 1px solid rgba(255,255,255,.2);
}

.rek-selected-color {
  border:1px solid var(--focus-color);
}

.compact-picker .flexbox-fix div,
.compact-picker .flexbox-fix div input {
  z-index:${PopupContentLayer};
  position:relative;
}
`;

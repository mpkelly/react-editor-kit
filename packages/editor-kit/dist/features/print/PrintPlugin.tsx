import { Plugin } from "../../plugins/Plugin";

// Allows for soft-breaks when shift key is down when enter key is pressed.
export const EnterKeyPlugin: Plugin = {
  name: "print",
  globalStyle: (editorId) => {
    return `
    
    
@media print {
  body * {
    visibility: hidden;
  }

  .printable,
  .printable * {
    visibility: visible;
    width: auto;
    height: auto;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    /* color: #000 !important; */
  }

  .editorWrapper > .rek-resizable {
    margin: 0;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw !important;
  }
  .printable {
    position: absolute;
    overflow-y: visible;
    overflow-x: hidden;
    left: 0;
    top: 0;
  }

  .rek-resize-handle {
    display: none !important;
  }

  ${editorId} {
    padding: 16px;
    margin: 0;
    overflow-x: hidden;
  }

  @page {
    size: auto;
    margin: 0.5cm;
  }
}
    
    `;
  },
};

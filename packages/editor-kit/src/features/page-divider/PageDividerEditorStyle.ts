export const PageDividerEditorStyle = `
  
  .rek-page-divider {
    position: absolute;
    height: 1px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-top: 1px dotted var(--divider-color);
  }
  @media print {
    .rek-page-divider {
      display:none;
    }
  }
`;

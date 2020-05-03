export const TableGlobalStyle = `
  div.rek-table-cell-menu {
    display:flex;
    align-items:center;
    justify-content:center;          
    height:18px;
    width:18px;
    border-radius:2px;
    background-color: var(--content-background);
    border: 2px solid var(--divider-color);
    cursor:pointer;    
  }

  .rek-table-cell-menu {
    position:absolute;
    top:2px;
    right:2px;
    transform:scale(.8);
  }

  .rek-table-settings {
    display:flex;
    flex-direction:column;
    padding:8px;
    > * {
      margin-top:4px;
      margin-bottom:4px;
    }
  }
`;

export const TableEditorStyle = `
  .rek-table-wrapper {
    padding:20px;
    padding-top: 36px;
    display:flex;
    justify-content:center;
    flex-grow:1;
    flex-direction:column;
    padding-right:0;          
  }

  .rek-table-wrapper.rek-table-focused {
    padding-bottom:4px;
  }

  .rek-table-wrapper-body {  
    position:relative;
    display:flex;
    padding-right:16px;
  }

  .rek-table-right {    
    position:absolute;
    right:0;
    top: -16px;
    width: 16px;
    border-top-right-radius: 12px;
    height: calc(100% + 16px);
    background-color: var(--gray-light2-color);
    display:flex;
    justify-content:center;
    align-items:center;    
    cursor:pointer;
    * {
      display:none;
      font-size:16px;
      width:18px;
      height:18px;
      color:var(--button-color);
    }
    &:hover {
      background-color: var(--focus-color);
      * {
        display:initial;
      }
    }    
  }
  .rek-table-bottom {
    height: 16px;
    width: calc(100% + 16px);
    margin-left: -16px;
    background-color: var(--gray-light2-color);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    display:flex;
    justify-content:center;
    align-items:center;    
    cursor:pointer;
    * {
      display:none;
      font-size:16px;
      width:18px;
      height:18px;
      color:var(--button-color);
    }
    &:hover {
      background-color: var(--focus-color);
      * {
        display:initial;
      }
    }    
  }

  .rek-table-button {
    position: absolute;
    left:-17px;
    top:-17px;
    width:16px;
    height:16px;
    background-color: var(--gray-light2-color);   
    border-top-left-radius: 12px;
    .active,
    &:hover {
      background-color: var(--focus-color);
    }
    cursor:pointer;
  }

  .rek-table-row-button {
    width: 16px;
    height: 100%;
    top: 0;
    left: -17px;
    position: absolute;
    background-color: var(--gray-light2-color);    
    .active,
    &:hover {
      background-color: var(--focus-color);
    }
    cursor:pointer;
  }

  .rek-table-column-button {
    width: 100%;
    height: 16px;
    top: -17px;
    left: 0;
    position: absolute;
    background-color: var(--gray-light2-color);    
    .active,
    &:hover {
      background-color: var(--focus-color);
    }
    cursor:pointer;
  }

  .rek-table-column-insert {
    width: 1px;
    height: 28px;
    top: -28px;
    right: -1px;
    position: absolute;
    display:flex;
    justify-content:center;
  }

  .rek-table-column-insert.rek-start {
    left: -1px;
  }

  .rek-table-column-insert-button {
    display:flex;
    justify-content:center;
    align-items: center;
    width: 16px;
    height: 16px;
    flex-shrink:0; 
    cursor:pointer; 
    &:hover {
      .rek-table-column-insert-button-inner {
        width: 20px;
        height: 20px;
        top:-10px;
        * {
          display:block;          
        }
      }
    }
    .rek-table-column-insert-button-inner {
      position:absolute;
      top:0;
      width: 3px;
      height: 3px;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      background-color: var(--divider-color);
      border-radius:50%;
      * {
        display:none;
      }
    }
  }

  .rek-table-column-insert-divider {
    width: 1px;
    height: 16px;
    bottom: 1px;
    position: absolute;
    background-color: var(--divider-color);
  }

  .rek-table-row-insert {
    width: 28px;
    height: 1px;
    left: -28px;
    bottom: -1px;
    position: absolute;
    display:flex;
    align-items:center;
  }

  .rek-table-row-insert.rek-start {
    top: -1px;
  }

  .rek-table-row-insert-button {
    display:flex;
    align-items:center;
    width: 16px;
    height: 16px;
    flex-shrink:0; 
    cursor:pointer; 

    &:hover {
      .rek-table-row-insert-button-inner {
        width: 20px;
        height: 20px;
        top:-10px;
        left:-10px;
        * {
          display:block;
        }
      }
    }

    .rek-table-row-insert-button-inner {
      position:absolute;
      top:0;
      width: 3px;
      height: 3px;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      background-color: var(--divider-color);
      border-radius:50%;
      * {
        display:none;
      }
    }
  }

  .rek-table-row-insert-divider {
    height: 1px;
    width: 16px;
    right: 1px;
    position: absolute;
    background-color: var(--divider-color);
  }

  .rek-table {
    width:100%;
    margin:0 auto;  
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid var(--divider-color);
    
    &:active,
    &:focus {
      outline:none;
    }
  }
            
  .rek-tr {
    border: 1px solid var(--divider-color);
    position:relative;
  }

  .rek-header-row .rek-tr:first-child {
    background-color: #f3f5f7;
  }

  .rek-header-column .rek-td:first-child {
    background-color: #f3f5f7;
  }

  .rek-table.rek-borderless,
  .rek-table.rek-borderless tr,
  .rek-table.rek-borderless td {
    border-color: transparent;
  }

  .rek-td {
    position:relative;          
    border: 1px solid var(--divider-color);
    padding:4px 8px;
    padding-right: 24px;
    height:40px;
    width:2%;
    vertical-align:text-top;
    p {
      margin:0;
    }              
  } 
`;

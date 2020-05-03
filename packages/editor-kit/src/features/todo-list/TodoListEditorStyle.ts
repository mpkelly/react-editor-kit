export const TodoListEditorStyle = `
  .rek-todo-list {
    display:flex;
    flex-direction:column;
  }  

  .rek-todo-item {
    display:flex;
    align-items:center;
    margin: 4px 0;    
    border-radius:3px;
    padding:4px;
      
    .rek-check-container {
      margin-bottom:15px;
      transform:scale(.8);
    }    

    .rek-todo-item-content {
      flex-grow:1;
    }
  }
  .rek-todo-item-content.rek-empty:before {
    content: attr(placeholder);
    position:absolute;
    opacity:0.2;
    display: block; /* For Firefox */
  }

  .rek-todo-item[data-todo-complete=true] {
    text-decoration: line-through;
  }

  .rek-todo-item.focus {
    background-color:var(--gray-light2-color);
  }

  .rek-todo-item-due-date {
    display:flex;
    align-items:center;
    padding:0 8px;
  }

`;

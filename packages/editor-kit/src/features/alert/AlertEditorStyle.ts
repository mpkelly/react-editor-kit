export const alertEditorStyle = (
  alertName: string,
  backgroundColor: string,
  iconColor: string
) => `        
.rek-alert.${alertName} {
  display:flex;
  align-items:center;
  background-color:${backgroundColor};
  padding:8px;
  width:100%;  
  .rek-alert-content {
    flex-grow:1;
  }
}

.rek-alert-icon.${alertName} {
  margin-right:8px;
}


.rek-alert-icon.${alertName} {
  color:${iconColor};
}
`;

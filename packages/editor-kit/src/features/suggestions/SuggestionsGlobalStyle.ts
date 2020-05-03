export const createSuggestionGlobalStyle = (other: string = "") => `
.rek-suggestion-list {
  margin: 0;
  padding: 2px;
  background-color: white;    
  margin-top:24px;
  max-height: 250px;
  overflow:auto;
}
.rek-suggestion-list li {
  list-style-type: none;    
  padding: 8px;
  font-family:var(--editor-ui-font);    
}

.rek-suggestion-list li.active,
.rek-suggestion-list li:hover {
  background-color: var(--control-hover-color);
}

.rek-suggestion-marker {
  color: var(--action-color);
}

.rek-suggestion-loading {
  height:50px;
  width:120px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:24px;
}

${other}

`;

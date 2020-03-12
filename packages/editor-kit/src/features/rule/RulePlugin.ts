import { Plugin } from "../../plugins/Plugin";

export const RulePlugin: Plugin = {
  globalStyles: () => GlobalStyle
};

const GlobalStyle = `
  .rek-h-rule {
    width:100%;
    border-top: 1px solid rgba(0,0,0,.1);
    background-color: #ffffff;
    position:relative;
    display:flex;
    align-items:center;
    background-image: 
    linear-gradient(90deg, 
      rgba(73, 73, 73, 0.5) 0, 
      rgba(73, 73, 73, 0.5) 2%, 
      transparent 2%
    ), 
    linear-gradient(180deg, 
      #ffffff 50%, 
      transparent 50%
    ), 
    linear-gradient(90deg, 
      transparent 50%, 
      rgba(73, 73, 73, 0.5) 50%, 
      rgba(73, 73, 73, 0.5) 52%, 
      transparent 52%
    ), 
    linear-gradient(180deg, 
      #ffffff 70%, 
      transparent 70%
    ), 
    linear-gradient(90deg, 
      transparent 10%,
      rgba(73, 73, 73, 0.4) 10%, 
      rgba(73, 73, 73, 0.4) 12%, 
      transparent 12%, 
      
      transparent 20%,
      rgba(73, 73, 73, 0.4) 20%, 
      rgba(73, 73, 73, 0.4) 22%, 
      transparent 22%, 
      
      transparent 30%, 
      rgba(73, 73, 73, 0.4) 30%,
      rgba(73, 73, 73, 0.4) 32%, 
      transparent 32%, 
      
      transparent 40%, 
      rgba(73, 73, 73, 0.4) 40%, 
      rgba(73, 73, 73, 0.4) 42%, 
      transparent 42%, 
      
      transparent 60%, 
      rgba(73, 73, 73, 0.4) 60%, 
      rgba(73, 73, 73, 0.4) 62%, 
      transparent 62%, 
      
      transparent 70%, 
      rgba(73, 73, 73, 0.4) 70%, 
      rgba(73, 73, 73, 0.4) 72%, 
      transparent 72%, 
      
      transparent 80%, 
      rgba(73, 73, 73, 0.4) 80%, 
      rgba(73, 73, 73, 0.4) 82%, 
      transparent 82%, 
      
      transparent 90%, 
      rgba(73, 73, 73, 0.4) 90%, 
      rgba(73, 73, 73, 0.4) 92%, 
      transparent 92%
    );
  background-size: 50px 12px;
  background-repeat: repeat-x;
  min-height: 12px;
  }

  .rek-rule-left-grip {
    cursor:pointer;    
    padding:8px;
    box-sizing:content-box;
    position:absolute;
    left:100px; 
  }

  .rek-rule-right-grip {
    cursor:pointer;    
    padding:8px;
    box-sizing:content-box;
    position:absolute;
    right:100px; 
  }

  .rek-rule-grip-indicator {
    width: 0; 
    height: 0;     
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--primary-text-color);     
  }

`;

import React, {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
:root{
    --purple-primary: #554DDE;
    --accent-pink: #F44E77;
    --neutral-light: #F2F6FF;
    --lavender-secondary: #6A6D9E; /*Primary Font Color*/
    --dark-primary: #16194F;
    --border-colour: #CAD6F1;
}
*{
   margin: 0;
   padding: 0;
   list-style: none;
   box-sizing: border-box; 
}
body{
    background-color: var(--neutral-light);
}
`;

export default GlobalStyle;

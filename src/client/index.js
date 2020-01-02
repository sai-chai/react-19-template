import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

const render = () => {
   ReactDOM.render(<App />, document.getElementById("root"));
};

if (
   'fetch' in window &&
   'Intl' in window &&
   'URL' in window &&
   'Map' in window &&
   'forEach' in NodeList.prototype &&
   'startsWith' in String.prototype &&
   'endsWith' in String.prototype &&
   'includes' in String.prototype &&
   'includes' in Array.prototype &&
   'assign' in Object &&
   'entries' in Object &&
   'keys' in Object
) {
   render();
} else {
   import('../polyfills').then(render);
}

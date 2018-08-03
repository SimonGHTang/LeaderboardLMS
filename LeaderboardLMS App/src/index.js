import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import registerServiceWorker from './registerServiceWorker';

window.Alert = require('react-s-alert').default;
var Alert = require('react-s-alert').default;

ReactDOM.render(
    <div>
        <Alert stack = {true} limit = {{limit: 2}}/>
        <Root />
    </div>
    ,
    document.getElementById('root')
);

registerServiceWorker();

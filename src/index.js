import React from 'react'
import ReactDOM from 'react-dom'
import './assets/stylesheets/css/main.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
var IntercomClient = require('intercom-client')

ReactDOM.render( < App / > , document.getElementById('root'))
registerServiceWorker()

window.Intercom("boot", {
	app_id: "nzh63oaa"
})

window.intercomClient = new IntercomClient.Client({ token: 'dG9rOmRiNDRhM2ExXzc2MjNfNDkzNF84MWE4Xzk2NmU4ZmI5YWRmYjoxOjA=' });

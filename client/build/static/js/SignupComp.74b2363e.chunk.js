webpackJsonp([3],{8539:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=n.n(o),i=n(15),a=n.n(i),c=n(43),s=n(126),l=n(17),u=n(725),d=n(61),f=n(8545),p=(n.n(f),n(8546)),m=n.n(p),g=function(){function e(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{!o&&c.return&&c.return()}finally{if(r)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),y=function(e){var t=e.handleChange,n=Object(l.f)();Object(o.useEffect)(function(){localStorage.getItem("loggedIn")&&n.push("/")},[]);var i=Object(o.useState)(""),p=g(i,2),y=p[0],b=p[1],h=Object(o.useState)(""),v=g(h,2),S=v[0],k=v[1],w=Object(o.useState)(""),E=g(w,2),O=E[0],j=E[1],_=Object(o.useState)(""),x=g(_,2),I=x[0],L=x[1],P=Object(o.useState)(""),T=g(P,2),A=T[0],C=(T[1],function(e){e.preventDefault(),a.a.post("https://soapboxapi.megahoot.net/user/signup",{name:y,username:S,email:O,password:I}).then(function(e){"Signup Successful!"===e.data.message?(c.c.success(e.data.message),setTimeout(function(){t(!0)},1e3)):c.c.info(e.data.message)})}),M=function(e){b(e.profileObj.name),j(e.profileObj.email),c.c.info("Please fill Additional fields!")},N=function(e){b(e.name),j(e.email),c.c.info("Please fill Additional fields!")},R=function(e){};return r.a.createElement("div",null,r.a.createElement(s.b,{className:"login-form mx-auto p-4 pb-0"},r.a.createElement("h3",{className:"text-center mb-1 signup-head"},"Sign Up"),r.a.createElement(s.b.Group,{className:"mb-1",controlId:"formBasicName"},r.a.createElement(s.b.Label,{className:"text-color-auth"},"Name"),r.a.createElement(s.b.Control,{type:"text",placeholder:"Name",value:y,className:"login-form-input",onChange:function(e){b(e.target.value)}})),r.a.createElement(s.b.Group,{className:"mb-1",controlId:"formBasicUsername"},r.a.createElement(s.b.Label,{className:"text-color-auth"},"Username"),r.a.createElement(s.b.Control,{type:"text",placeholder:"Username",value:S,className:"login-form-input",onChange:function(e){k(e.target.value)}}),r.a.createElement(s.b.Text,{className:"text-muted"},"Username can not be changed once created.")),r.a.createElement(s.b.Group,{className:"mb-1",controlId:"formBasicEmail"},r.a.createElement(s.b.Label,{className:"text-color-auth"},"Email"),r.a.createElement(s.b.Control,{type:"email",placeholder:"Email",value:O,className:"login-form-input",onChange:function(e){j(e.target.value)}}),r.a.createElement(s.b.Text,{className:"text-muted"},"We'll never share your email with anyone else.")),r.a.createElement(s.b.Group,{className:"mb-1",controlId:"formBasicPassword"},r.a.createElement(s.b.Label,{className:"text-color-auth"},"Password"),r.a.createElement(s.b.Control,{type:"password",placeholder:"Password",value:I,className:"login-form-input",onChange:function(e){L(e.target.value)}})),r.a.createElement("strong",{className:"text-center d-flex justify-content-center m-2 text-color-auth"},A),r.a.createElement("button",{className:"d-grid col-12 btn-main login-form-button",variant:"primary",type:"submit",onClick:C,disabled:!O||!I||!S||!y},"Sign Up"),r.a.createElement("div",{style:{position:"relative"}},r.a.createElement("hr",{className:"sl-hr"}),r.a.createElement("small",{className:"sl-or"},"OR")),r.a.createElement("div",{className:"social-logins"},r.a.createElement(f.GoogleLogin,{clientId:"518648326587-pauau0ieusgolb7l07f4o0lr0ato09hi.apps.googleusercontent.com",buttonText:"Login",onSuccess:M,onFailure:R,cookiePolicy:"single_host_origin",render:function(e){return r.a.createElement("div",{className:"sl-icon"},r.a.createElement("div",{onClick:e.onClick,disabled:e.disabled},r.a.createElement(u.a,{style:{fontSize:"1.3rem"}})))}}),r.a.createElement(m.a,{appId:"953690331894849",fields:"name,email,picture",callback:N,render:function(e){return r.a.createElement("div",{className:"sl-icon"},r.a.createElement("div",{onClick:e.onClick},r.a.createElement(d.d,{style:{fontSize:"1.3rem"}})))}}),r.a.createElement("div",{className:"sl-icon"},r.a.createElement("div",null,r.a.createElement(d.c,{style:{fontSize:"1.3rem"}}))))))};t.default=y},8545:function(e,t,n){!function(t,o){e.exports=o(n(0))}("undefined"!=typeof self&&self,function(e){function t(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return n[e].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return o={},t.m=n=[function(t){t.exports=e},function(e,t,n){e.exports=n(2)()},function(e,t,n){"use strict";function o(){}function r(){}var i=n(3);r.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,r,a){if(a!==i){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}var n={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:o};return n.PropTypes=n}},function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function d(e,t,n,o,r,i){var a=e.getElementsByTagName(t)[0],c=a,s=a;(s=e.createElement(t)).id=n,s.src=o,c&&c.parentNode?c.parentNode.insertBefore(s,c):e.head.appendChild(s),s.onerror=i,s.onload=r}function f(e,t){var n=e.getElementById(t);n&&n.parentNode.removeChild(n)}function p(e){return h.a.createElement("span",{style:{paddingRight:10,fontWeight:500,paddingLeft:e.icon?0:10,paddingTop:10,paddingBottom:10}},e.children)}function m(e){return h.a.createElement("div",{style:{marginRight:10,background:e.active?"#eee":"#fff",padding:10,borderRadius:2}},h.a.createElement("svg",{width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg"},h.a.createElement("g",{fill:"#000",fillRule:"evenodd"},h.a.createElement("path",{d:"M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z",fill:"#EA4335"}),h.a.createElement("path",{d:"M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z",fill:"#4285F4"}),h.a.createElement("path",{d:"M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z",fill:"#FBBC05"}),h.a.createElement("path",{d:"M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z",fill:"#34A853"}),h.a.createElement("path",{fill:"none",d:"M0 0h18v18H0z"}))))}function g(e){var t=i(Object(b.useState)(!1),2),n=t[0],o=t[1],r=i(Object(b.useState)(!1),2),a=r[0],c=r[1],s=e.tag,l=e.type,u=e.className,d=e.disabledStyle,f=e.buttonText,g=e.children,y=e.render,S=e.theme,k=e.icon,w=e.disabled,E=v({onSuccess:e.onSuccess,onAutoLoadFinished:e.onAutoLoadFinished,onRequest:e.onRequest,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,autoLoad:e.autoLoad,isSignedIn:e.isSignedIn,fetchBasicProfile:e.fetchBasicProfile,redirectUri:e.redirectUri,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,scope:e.scope,accessType:e.accessType,responseType:e.responseType,jsSrc:e.jsSrc,prompt:e.prompt}),O=E.signIn,j=w||!E.loaded;if(y)return y({onClick:O,disabled:j});var _={backgroundColor:"dark"===S?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===S?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},x={cursor:"pointer",backgroundColor:"dark"===S?"#3367D6":"#eee",color:"dark"===S?"#fff":"rgba(0, 0, 0, .54)",opacity:1},I=j?Object.assign({},_,d):a?Object.assign({},_,x):n?Object.assign({},_,{cursor:"pointer",opacity:.9}):_;return h.a.createElement(s,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),c(!1)},onMouseDown:function(){return c(!0)},onMouseUp:function(){return c(!1)},onClick:O,style:I,type:l,disabled:j,className:u},[k&&h.a.createElement(m,{key:1,active:a}),h.a.createElement(p,{icon:k,key:2},g||f)])}function y(e){var t=l(Object(b.useState)(!1),2),n=t[0],o=t[1],r=l(Object(b.useState)(!1),2),i=r[0],a=r[1],c=e.tag,s=e.type,u=e.className,d=e.disabledStyle,f=e.buttonText,g=e.children,y=e.render,v=e.theme,S=e.icon,w=e.disabled,E=k({jsSrc:e.jsSrc,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,fetchBasicProfile:e.fetchBasicProfile,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,redirectUri:e.redirectUri,scope:e.scope,accessType:e.accessType,onLogoutSuccess:e.onLogoutSuccess}),O=E.signOut,j=w||!E.loaded;if(y)return y({onClick:O,disabled:j});var _={backgroundColor:"dark"===v?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},x={cursor:"pointer",backgroundColor:"dark"===v?"#3367D6":"#eee",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",opacity:1},I=j?Object.assign({},_,d):i?Object.assign({},_,x):n?Object.assign({},_,{cursor:"pointer",opacity:.9}):_;return h.a.createElement(c,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),a(!1)},onMouseDown:function(){return a(!0)},onMouseUp:function(){return a(!1)},onClick:O,style:I,type:s,disabled:j,className:u},[S&&h.a.createElement(m,{key:1,active:i}),h.a.createElement(p,{icon:S,key:2},g||f)])}n.r(t),n.d(t,"default",function(){return S}),n.d(t,"GoogleLogin",function(){return S}),n.d(t,"GoogleLogout",function(){return w}),n.d(t,"useGoogleLogin",function(){return v}),n.d(t,"useGoogleLogout",function(){return k});var b=n(0),h=n.n(b),v=(n(1),function(e){function t(e){var t=e.getBasicProfile(),n=e.getAuthResponse(!0);e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},i(e)}function n(e){if(e&&e.preventDefault(),C){var n=window.gapi.auth2.getAuthInstance(),o={prompt:T};p(),"code"===I?n.grantOfflineAccess(o).then(function(e){return i(e)},function(e){return l(e)}):n.signIn(o).then(function(e){return t(e)},function(e){return l(e)})}}var r=e.onSuccess,i=void 0===r?function(){}:r,a=e.onAutoLoadFinished,c=void 0===a?function(){}:a,s=e.onFailure,l=void 0===s?function(){}:s,u=e.onRequest,p=void 0===u?function(){}:u,m=e.onScriptLoadFailure,g=e.clientId,y=e.cookiePolicy,h=e.loginHint,v=e.hostedDomain,S=e.autoLoad,k=e.isSignedIn,w=e.fetchBasicProfile,E=e.redirectUri,O=e.discoveryDocs,j=e.uxMode,_=e.scope,x=e.accessType,I=e.responseType,L=e.jsSrc,P=void 0===L?"https://apis.google.com/js/api.js":L,T=e.prompt,A=o(Object(b.useState)(!1),2),C=A[0],M=A[1];return Object(b.useEffect)(function(){var e=!1,n=m||l;return d(document,"script","google-login",P,function(){var o={client_id:g,cookie_policy:y,login_hint:h,hosted_domain:v,fetch_basic_profile:w,discoveryDocs:O,ux_mode:j,redirect_uri:E,scope:_,access_type:x};"code"===I&&(o.access_type="offline"),window.gapi.load("auth2",function(){var r=window.gapi.auth2.getAuthInstance();r?r.then(function(){e||(k&&r.isSignedIn.get()?(M(!0),c(!0),t(r.currentUser.get())):(M(!0),c(!1)))},function(e){l(e)}):window.gapi.auth2.init(o).then(function(n){if(!e){M(!0);var o=k&&n.isSignedIn.get();c(o),o&&t(n.currentUser.get())}},function(e){M(!0),c(!1),n(e)})})},function(e){n(e)}),function(){e=!0,f(document,"google-login")}},[]),Object(b.useEffect)(function(){S&&n()},[C]),{signIn:n,loaded:C}});g.defaultProps={type:"button",tag:"button",buttonText:"Sign in with Google",scope:"profile email",accessType:"online",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},icon:!0,theme:"light",onRequest:function(){}};var S=g,k=function(e){var t=e.jsSrc,n=void 0===t?"https://apis.google.com/js/api.js":t,o=e.onFailure,r=e.onScriptLoadFailure,i=e.clientId,a=e.cookiePolicy,s=e.loginHint,l=e.hostedDomain,u=e.fetchBasicProfile,p=e.discoveryDocs,m=e.uxMode,g=e.redirectUri,y=e.scope,h=e.accessType,v=e.onLogoutSuccess,S=c(Object(b.useState)(!1),2),k=S[0],w=S[1],E=Object(b.useCallback)(function(){if(window.gapi){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.then(function(){e.signOut().then(function(){e.disconnect(),v()})},function(e){return o(e)})}},[v]);return Object(b.useEffect)(function(){var e=r||o;return d(document,"script","google-login",n,function(){var t={client_id:i,cookie_policy:a,login_hint:s,hosted_domain:l,fetch_basic_profile:u,discoveryDocs:p,ux_mode:m,redirect_uri:g,scope:y,access_type:h};window.gapi.load("auth2",function(){window.gapi.auth2.getAuthInstance()?w(!0):window.gapi.auth2.init(t).then(function(){return w(!0)},function(t){return e(t)})})},function(t){e(t)}),function(){f(document,"google-login")}},[]),{signOut:E,loaded:k}};y.defaultProps={type:"button",tag:"button",buttonText:"Logout of Google",disabledStyle:{opacity:.6},icon:!0,theme:"light",jsSrc:"https://apis.google.com/js/api.js"};var w=y}],t.c=o,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(t){return e[t]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4);var n,o})},8546:function(e,t,n){!function(t,o){e.exports=o(n(0))}(0,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(4)},function(e,t,n){e.exports=n(6)()},function(t,n){t.exports=e},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return decodeURIComponent(e.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(t).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),u=o(l),d=n(1),f=o(d),p=n(5),m=o(p),g=n(3),y=o(g),b=function(e){function t(){var e,n,o,a;r(this,t);for(var s=arguments.length,l=Array(s),u=0;u<s;u++)l[u]=arguments[u];return n=o=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.state={isSdkLoaded:!1,isProcessing:!1},o.responseApi=function(e){window.FB.api("/me",{locale:o.props.language,fields:o.props.fields},function(t){c(t,e),o.props.callback(t)})},o.checkLoginState=function(e){o.setStateIfMounted({isProcessing:!1}),e.authResponse?o.responseApi(e.authResponse):o.props.onFailure?o.props.onFailure({status:e.status}):o.props.callback({status:e.status})},o.checkLoginAfterRefresh=function(e){"connected"===e.status?o.checkLoginState(e):window.FB.login(function(e){return o.checkLoginState(e)},!0)},o.click=function(e){if(o.state.isSdkLoaded&&!o.state.isProcessing&&!o.props.isDisabled){o.setState({isProcessing:!0});var t=o.props,n=t.scope,r=t.appId,i=t.onClick,a=t.returnScopes,c=t.responseType,s=t.redirectUri,l=t.disableMobileRedirect,u=t.authType,d=t.state;if("function"!=typeof i||(i(e),!e.defaultPrevented)){var f={client_id:r,redirect_uri:s,state:d,return_scopes:a,scope:n,response_type:c,auth_type:u};if(o.props.isMobile&&!l)window.location.href="https://www.facebook.com/dialog/oauth"+(0,m.default)(f);else{if(!window.FB)return void(o.props.onFailure&&o.props.onFailure({status:"facebookNotLoaded"}));window.FB.login(o.checkLoginState,{scope:n,return_scopes:a,auth_type:f.auth_type})}}}},a=n,i(o,a)}return a(t,e),s(t,[{key:"componentDidMount",value:function(){if(this._isMounted=!0,document.getElementById("facebook-jssdk"))return void this.sdkLoaded();this.setFbAsyncInit(),this.loadSdkAsynchronously();var e=document.getElementById("fb-root");e||(e=document.createElement("div"),e.id="fb-root",document.body.appendChild(e))}},{key:"componentWillReceiveProps",value:function(e){this.state.isSdkLoaded&&e.autoLoad&&!this.props.autoLoad&&window.FB.getLoginStatus(this.checkLoginAfterRefresh)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"setStateIfMounted",value:function(e){this._isMounted&&this.setState(e)}},{key:"setFbAsyncInit",value:function(){var e=this,t=this.props,n=t.appId,o=t.xfbml,r=t.cookie,i=t.version,a=t.autoLoad;window.fbAsyncInit=function(){window.FB.init({version:"v"+i,appId:n,xfbml:o,cookie:r}),e.setStateIfMounted({isSdkLoaded:!0}),(a||e.isRedirectedFromFb())&&window.FB.getLoginStatus(e.checkLoginAfterRefresh)}}},{key:"isRedirectedFromFb",value:function(){var e=window.location.search;return(0,y.default)(e,"code")||(0,y.default)(e,"granted_scopes")}},{key:"sdkLoaded",value:function(){this.setState({isSdkLoaded:!0})}},{key:"loadSdkAsynchronously",value:function(){var e=this.props.language;!function(t,n,o){var r=t.getElementsByTagName(n)[0],i=r,a=r;t.getElementById(o)||(a=t.createElement(n),a.id=o,a.src="https://connect.facebook.net/"+e+"/sdk.js",i.parentNode.insertBefore(a,i))}(document,"script","facebook-jssdk")}},{key:"render",value:function(){if(!this.props.render)throw new Error("ReactFacebookLogin requires a render prop to render");var e={onClick:this.click,isDisabled:!!this.props.isDisabled,isProcessing:this.state.isProcessing,isSdkLoaded:this.state.isSdkLoaded};return this.props.render(e)}}]),t}(u.default.Component);b.propTypes={isDisabled:f.default.bool,callback:f.default.func.isRequired,appId:f.default.string.isRequired,xfbml:f.default.bool,cookie:f.default.bool,authType:f.default.string,scope:f.default.string,state:f.default.string,responseType:f.default.string,returnScopes:f.default.bool,redirectUri:f.default.string,autoLoad:f.default.bool,disableMobileRedirect:f.default.bool,isMobile:f.default.bool,fields:f.default.string,version:f.default.string,language:f.default.string,onClick:f.default.func,onFailure:f.default.func,render:f.default.func.isRequired},b.defaultProps={redirectUri:"undefined"!=typeof window?window.location.href:"/",scope:"public_profile,email",returnScopes:!1,xfbml:!1,cookie:!1,authType:"",fields:"name",version:"2.3",language:"en_US",disableMobileRedirect:!1,isMobile:function(){var e=!1;try{e=!!(window.navigator&&window.navigator.standalone||navigator.userAgent.match("CriOS")||navigator.userAgent.match(/mobile/i))}catch(e){}return e}(),onFailure:null,state:"facebookdirect",responseType:"code"},t.default=b},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return"?"+Object.keys(e).map(function(t){return t+"="+encodeURIComponent(e[t])}).join("&")}},function(e,t,n){"use strict";function o(){}var r=n(7);e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}])})}});
//# sourceMappingURL=SignupComp.74b2363e.chunk.js.map
webpackJsonp([3],{8747:function(e,t,n){"use strict";function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function o(r,a){try{var i=t[r](a),c=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(c).then(function(e){o("next",e)},function(e){o("throw",e)});e(c)}return o("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(15),a=n.n(r),i=n(0),c=n.n(i),s=n(14),u=n.n(s),l=n(60),d=n(16),f=n(36),p=n.n(f),g=n(8755),m=(n.n(g),n(8756)),y=n.n(m),h=n(806),b=n(31),v=n(21),S=this,w=function(){function e(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{!o&&c.return&&c.return()}finally{if(r)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),k=function(){var e=Object(d.g)(),t=Object(i.useState)(!1),n=w(t,2),r=n[0],s=n[1],f=Object(d.i)(),m=f.username,k="https://soapboxapi.megahoot.net";Object(i.useEffect)(function(){localStorage.getItem("loggedIn")&&s(!1)});var O=function(){var e=o(a.a.mark(function e(t){var n=t.userName,o=t.loggedInUsername;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:u.a.post(k+"/user/followedBy",{username:n,loggedInUsername:o});case 1:case"end":return e.stop()}},e,S)}));return function(t){return e.apply(this,arguments)}}(),j=Object(i.useState)(""),E=w(j,2),I=E[0],x=E[1],_=Object(i.useState)(""),L=w(_,2),P=L[0],T=L[1],A=Object(i.useState)(""),M=w(A,2),C=M[0],F=(M[1],function(e){s(!0),e.preventDefault(),function(){var e=o(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.post(k+"/user/login",{email:I,password:P}).then(function(e){if(e.data.loggedIn){var t={username:e.data.username,email:e.data.email};localStorage.setItem("loggedIn",JSON.stringify(t)),setTimeout(function(){m?(O({userName:m,loggedInUsername:e.data.username}),window.location.href="/profile/"+m):window.location.href="/profile/"+e.data.username},200)}"Logged in Successful!"===e.data.message?v.c.success(e.data.message):v.c.info(e.data.message)});case 2:case"end":return e.stop()}},e,S)}));return function(){return e.apply(this,arguments)}}()(),setTimeout(function(){s(!1)},1e3)}),R=function(){var t=o(a.a.mark(function t(n){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(n.profileObj.email),console.log(n.profileObj.name),t.next=4,u.a.post(k+"/user/google-login",{tokenId:n.tokenId}).then(function(t){if(t.data.loggedIn){var n={username:t.data.username,email:t.data.email};localStorage.setItem("loggedIn",JSON.stringify(n)),setTimeout(function(){e.push("/")},200)}"Logged in Successful!"===t.data.message?v.c.success(t.data.message):v.c.info(t.data.message)});case 4:case"end":return t.stop()}},t,S)}));return function(e){return t.apply(this,arguments)}}(),N=function(e){},U=function(){var t=o(a.a.mark(function t(n){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.post(k+"/user/facebook-login",{facebookUserEmail:n.email}).then(function(t){if(t.data.loggedIn){var n={username:t.data.username,email:t.data.email};localStorage.setItem("loggedIn",JSON.stringify(n)),setTimeout(function(){e.push("/")},200)}"Logged in Successful!"===t.data.message?v.c.success(t.data.message):v.c.info(t.data.message)});case 2:case"end":return t.stop()}},t,S)}));return function(e){return t.apply(this,arguments)}}();return c.a.createElement("div",null,c.a.createElement(l.c,{className:"login-form mx-auto p-4 pb-0"},c.a.createElement("h3",{className:"text-center mb-2 login-head"},"Login"),c.a.createElement(l.c.Group,{className:"mb-1",controlId:"formBasicEmail"},c.a.createElement(l.c.Label,{className:"text-color-auth"},"Email"),c.a.createElement(l.c.Control,{type:"email",placeholder:"Email",value:I,className:"login-form-input",onChange:function(e){x(e.target.value)}}),c.a.createElement(l.c.Text,{className:"text-muted"},"We'll never share your email with anyone else.")),c.a.createElement(l.c.Group,{className:"mb-1",controlId:"formBasicPassword"},c.a.createElement(l.c.Label,{className:"text-color-auth"},"Password"),c.a.createElement(l.c.Control,{type:"password",placeholder:"Password",value:P,className:"login-form-input",onChange:function(e){T(e.target.value)}})),c.a.createElement("div",{className:"text-end text-decoration-none"},c.a.createElement(d.b,{to:"/forgot_password",className:"text-decoration-none primary-color forgot-password"},"Forgot Password?")),c.a.createElement("strong",{className:"text-center d-flex justify-content-center m-2 text-color-auth"},C),c.a.createElement("button",{className:"d-grid col-12 btn-main login-form-button",variant:"primary",type:"submit",onClick:F,disabled:!I||!P},r?c.a.createElement(p.a,{color:"#fff",size:10}):"Login"),c.a.createElement("div",{style:{position:"relative"}},c.a.createElement("hr",{className:"sl-hr"}),c.a.createElement("small",{className:"sl-or"},"OR")),c.a.createElement("div",{className:"social-logins"},c.a.createElement(g.GoogleLogin,{clientId:"518648326587-pauau0ieusgolb7l07f4o0lr0ato09hi.apps.googleusercontent.com",buttonText:"Login",onSuccess:R,onFailure:N,cookiePolicy:"single_host_origin",render:function(e){return c.a.createElement("div",{className:"sl-icon"},c.a.createElement("div",{onClick:e.onClick,disabled:e.disabled},c.a.createElement(h.a,{style:{fontSize:"1.3rem"}})))}}),c.a.createElement(y.a,{appId:"953690331894849",fields:"name,email,picture",callback:U,render:function(e){return c.a.createElement("div",{className:"sl-icon"},c.a.createElement("div",{onClick:e.onClick},c.a.createElement(b.f,{style:{fontSize:"1.3rem"}})))}}),c.a.createElement("div",{className:"sl-icon"},c.a.createElement("div",null,c.a.createElement(b.e,{style:{fontSize:"1.3rem"}}))))))};t.default=k},8755:function(e,t,n){!function(t,o){e.exports=o(n(0))}("undefined"!=typeof self&&self,function(e){function t(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return n[e].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return o={},t.m=n=[function(t){t.exports=e},function(e,t,n){e.exports=n(2)()},function(e,t,n){"use strict";function o(){}function r(){}var a=n(3);r.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,r,i){if(i!==a){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}var n={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:o};return n.PropTypes=n}},function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function d(e,t,n,o,r,a){var i=e.getElementsByTagName(t)[0],c=i,s=i;(s=e.createElement(t)).id=n,s.src=o,c&&c.parentNode?c.parentNode.insertBefore(s,c):e.head.appendChild(s),s.onerror=a,s.onload=r}function f(e,t){var n=e.getElementById(t);n&&n.parentNode.removeChild(n)}function p(e){return b.a.createElement("span",{style:{paddingRight:10,fontWeight:500,paddingLeft:e.icon?0:10,paddingTop:10,paddingBottom:10}},e.children)}function g(e){return b.a.createElement("div",{style:{marginRight:10,background:e.active?"#eee":"#fff",padding:10,borderRadius:2}},b.a.createElement("svg",{width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg"},b.a.createElement("g",{fill:"#000",fillRule:"evenodd"},b.a.createElement("path",{d:"M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z",fill:"#EA4335"}),b.a.createElement("path",{d:"M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z",fill:"#4285F4"}),b.a.createElement("path",{d:"M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z",fill:"#FBBC05"}),b.a.createElement("path",{d:"M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z",fill:"#34A853"}),b.a.createElement("path",{fill:"none",d:"M0 0h18v18H0z"}))))}function m(e){var t=a(Object(h.useState)(!1),2),n=t[0],o=t[1],r=a(Object(h.useState)(!1),2),i=r[0],c=r[1],s=e.tag,u=e.type,l=e.className,d=e.disabledStyle,f=e.buttonText,m=e.children,y=e.render,S=e.theme,w=e.icon,k=e.disabled,O=v({onSuccess:e.onSuccess,onAutoLoadFinished:e.onAutoLoadFinished,onRequest:e.onRequest,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,autoLoad:e.autoLoad,isSignedIn:e.isSignedIn,fetchBasicProfile:e.fetchBasicProfile,redirectUri:e.redirectUri,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,scope:e.scope,accessType:e.accessType,responseType:e.responseType,jsSrc:e.jsSrc,prompt:e.prompt}),j=O.signIn,E=k||!O.loaded;if(y)return y({onClick:j,disabled:E});var I={backgroundColor:"dark"===S?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===S?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},x={cursor:"pointer",backgroundColor:"dark"===S?"#3367D6":"#eee",color:"dark"===S?"#fff":"rgba(0, 0, 0, .54)",opacity:1},_=E?Object.assign({},I,d):i?Object.assign({},I,x):n?Object.assign({},I,{cursor:"pointer",opacity:.9}):I;return b.a.createElement(s,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),c(!1)},onMouseDown:function(){return c(!0)},onMouseUp:function(){return c(!1)},onClick:j,style:_,type:u,disabled:E,className:l},[w&&b.a.createElement(g,{key:1,active:i}),b.a.createElement(p,{icon:w,key:2},m||f)])}function y(e){var t=u(Object(h.useState)(!1),2),n=t[0],o=t[1],r=u(Object(h.useState)(!1),2),a=r[0],i=r[1],c=e.tag,s=e.type,l=e.className,d=e.disabledStyle,f=e.buttonText,m=e.children,y=e.render,v=e.theme,S=e.icon,k=e.disabled,O=w({jsSrc:e.jsSrc,onFailure:e.onFailure,onScriptLoadFailure:e.onScriptLoadFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,fetchBasicProfile:e.fetchBasicProfile,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,redirectUri:e.redirectUri,scope:e.scope,accessType:e.accessType,onLogoutSuccess:e.onLogoutSuccess}),j=O.signOut,E=k||!O.loaded;if(y)return y({onClick:j,disabled:E});var I={backgroundColor:"dark"===v?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},x={cursor:"pointer",backgroundColor:"dark"===v?"#3367D6":"#eee",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",opacity:1},_=E?Object.assign({},I,d):a?Object.assign({},I,x):n?Object.assign({},I,{cursor:"pointer",opacity:.9}):I;return b.a.createElement(c,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),i(!1)},onMouseDown:function(){return i(!0)},onMouseUp:function(){return i(!1)},onClick:j,style:_,type:s,disabled:E,className:l},[S&&b.a.createElement(g,{key:1,active:a}),b.a.createElement(p,{icon:S,key:2},m||f)])}n.r(t),n.d(t,"default",function(){return S}),n.d(t,"GoogleLogin",function(){return S}),n.d(t,"GoogleLogout",function(){return k}),n.d(t,"useGoogleLogin",function(){return v}),n.d(t,"useGoogleLogout",function(){return w});var h=n(0),b=n.n(h),v=(n(1),function(e){function t(e){var t=e.getBasicProfile(),n=e.getAuthResponse(!0);e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},a(e)}function n(e){if(e&&e.preventDefault(),M){var n=window.gapi.auth2.getAuthInstance(),o={prompt:T};p(),"code"===_?n.grantOfflineAccess(o).then(function(e){return a(e)},function(e){return u(e)}):n.signIn(o).then(function(e){return t(e)},function(e){return u(e)})}}var r=e.onSuccess,a=void 0===r?function(){}:r,i=e.onAutoLoadFinished,c=void 0===i?function(){}:i,s=e.onFailure,u=void 0===s?function(){}:s,l=e.onRequest,p=void 0===l?function(){}:l,g=e.onScriptLoadFailure,m=e.clientId,y=e.cookiePolicy,b=e.loginHint,v=e.hostedDomain,S=e.autoLoad,w=e.isSignedIn,k=e.fetchBasicProfile,O=e.redirectUri,j=e.discoveryDocs,E=e.uxMode,I=e.scope,x=e.accessType,_=e.responseType,L=e.jsSrc,P=void 0===L?"https://apis.google.com/js/api.js":L,T=e.prompt,A=o(Object(h.useState)(!1),2),M=A[0],C=A[1];return Object(h.useEffect)(function(){var e=!1,n=g||u;return d(document,"script","google-login",P,function(){var o={client_id:m,cookie_policy:y,login_hint:b,hosted_domain:v,fetch_basic_profile:k,discoveryDocs:j,ux_mode:E,redirect_uri:O,scope:I,access_type:x};"code"===_&&(o.access_type="offline"),window.gapi.load("auth2",function(){var r=window.gapi.auth2.getAuthInstance();r?r.then(function(){e||(w&&r.isSignedIn.get()?(C(!0),c(!0),t(r.currentUser.get())):(C(!0),c(!1)))},function(e){u(e)}):window.gapi.auth2.init(o).then(function(n){if(!e){C(!0);var o=w&&n.isSignedIn.get();c(o),o&&t(n.currentUser.get())}},function(e){C(!0),c(!1),n(e)})})},function(e){n(e)}),function(){e=!0,f(document,"google-login")}},[]),Object(h.useEffect)(function(){S&&n()},[M]),{signIn:n,loaded:M}});m.defaultProps={type:"button",tag:"button",buttonText:"Sign in with Google",scope:"profile email",accessType:"online",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},icon:!0,theme:"light",onRequest:function(){}};var S=m,w=function(e){var t=e.jsSrc,n=void 0===t?"https://apis.google.com/js/api.js":t,o=e.onFailure,r=e.onScriptLoadFailure,a=e.clientId,i=e.cookiePolicy,s=e.loginHint,u=e.hostedDomain,l=e.fetchBasicProfile,p=e.discoveryDocs,g=e.uxMode,m=e.redirectUri,y=e.scope,b=e.accessType,v=e.onLogoutSuccess,S=c(Object(h.useState)(!1),2),w=S[0],k=S[1],O=Object(h.useCallback)(function(){if(window.gapi){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.then(function(){e.signOut().then(function(){e.disconnect(),v()})},function(e){return o(e)})}},[v]);return Object(h.useEffect)(function(){var e=r||o;return d(document,"script","google-login",n,function(){var t={client_id:a,cookie_policy:i,login_hint:s,hosted_domain:u,fetch_basic_profile:l,discoveryDocs:p,ux_mode:g,redirect_uri:m,scope:y,access_type:b};window.gapi.load("auth2",function(){window.gapi.auth2.getAuthInstance()?k(!0):window.gapi.auth2.init(t).then(function(){return k(!0)},function(t){return e(t)})})},function(t){e(t)}),function(){f(document,"google-login")}},[]),{signOut:O,loaded:w}};y.defaultProps={type:"button",tag:"button",buttonText:"Logout of Google",disabledStyle:{opacity:.6},icon:!0,theme:"light",jsSrc:"https://apis.google.com/js/api.js"};var k=y}],t.c=o,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(t){return e[t]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4);var n,o})},8756:function(e,t,n){!function(t,o){e.exports=o(n(0))}(0,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(4)},function(e,t,n){e.exports=n(6)()},function(t,n){t.exports=e},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return decodeURIComponent(e.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(t).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),u=n(2),l=o(u),d=n(1),f=o(d),p=n(5),g=o(p),m=n(3),y=o(m),h=function(e){function t(){var e,n,o,i;r(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=o=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),o.state={isSdkLoaded:!1,isProcessing:!1},o.responseApi=function(e){window.FB.api("/me",{locale:o.props.language,fields:o.props.fields},function(t){c(t,e),o.props.callback(t)})},o.checkLoginState=function(e){o.setStateIfMounted({isProcessing:!1}),e.authResponse?o.responseApi(e.authResponse):o.props.onFailure?o.props.onFailure({status:e.status}):o.props.callback({status:e.status})},o.checkLoginAfterRefresh=function(e){"connected"===e.status?o.checkLoginState(e):window.FB.login(function(e){return o.checkLoginState(e)},!0)},o.click=function(e){if(o.state.isSdkLoaded&&!o.state.isProcessing&&!o.props.isDisabled){o.setState({isProcessing:!0});var t=o.props,n=t.scope,r=t.appId,a=t.onClick,i=t.returnScopes,c=t.responseType,s=t.redirectUri,u=t.disableMobileRedirect,l=t.authType,d=t.state;if("function"!=typeof a||(a(e),!e.defaultPrevented)){var f={client_id:r,redirect_uri:s,state:d,return_scopes:i,scope:n,response_type:c,auth_type:l};if(o.props.isMobile&&!u)window.location.href="https://www.facebook.com/dialog/oauth"+(0,g.default)(f);else{if(!window.FB)return void(o.props.onFailure&&o.props.onFailure({status:"facebookNotLoaded"}));window.FB.login(o.checkLoginState,{scope:n,return_scopes:i,auth_type:f.auth_type})}}}},i=n,a(o,i)}return i(t,e),s(t,[{key:"componentDidMount",value:function(){if(this._isMounted=!0,document.getElementById("facebook-jssdk"))return void this.sdkLoaded();this.setFbAsyncInit(),this.loadSdkAsynchronously();var e=document.getElementById("fb-root");e||(e=document.createElement("div"),e.id="fb-root",document.body.appendChild(e))}},{key:"componentWillReceiveProps",value:function(e){this.state.isSdkLoaded&&e.autoLoad&&!this.props.autoLoad&&window.FB.getLoginStatus(this.checkLoginAfterRefresh)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"setStateIfMounted",value:function(e){this._isMounted&&this.setState(e)}},{key:"setFbAsyncInit",value:function(){var e=this,t=this.props,n=t.appId,o=t.xfbml,r=t.cookie,a=t.version,i=t.autoLoad;window.fbAsyncInit=function(){window.FB.init({version:"v"+a,appId:n,xfbml:o,cookie:r}),e.setStateIfMounted({isSdkLoaded:!0}),(i||e.isRedirectedFromFb())&&window.FB.getLoginStatus(e.checkLoginAfterRefresh)}}},{key:"isRedirectedFromFb",value:function(){var e=window.location.search;return(0,y.default)(e,"code")||(0,y.default)(e,"granted_scopes")}},{key:"sdkLoaded",value:function(){this.setState({isSdkLoaded:!0})}},{key:"loadSdkAsynchronously",value:function(){var e=this.props.language;!function(t,n,o){var r=t.getElementsByTagName(n)[0],a=r,i=r;t.getElementById(o)||(i=t.createElement(n),i.id=o,i.src="https://connect.facebook.net/"+e+"/sdk.js",a.parentNode.insertBefore(i,a))}(document,"script","facebook-jssdk")}},{key:"render",value:function(){if(!this.props.render)throw new Error("ReactFacebookLogin requires a render prop to render");var e={onClick:this.click,isDisabled:!!this.props.isDisabled,isProcessing:this.state.isProcessing,isSdkLoaded:this.state.isSdkLoaded};return this.props.render(e)}}]),t}(l.default.Component);h.propTypes={isDisabled:f.default.bool,callback:f.default.func.isRequired,appId:f.default.string.isRequired,xfbml:f.default.bool,cookie:f.default.bool,authType:f.default.string,scope:f.default.string,state:f.default.string,responseType:f.default.string,returnScopes:f.default.bool,redirectUri:f.default.string,autoLoad:f.default.bool,disableMobileRedirect:f.default.bool,isMobile:f.default.bool,fields:f.default.string,version:f.default.string,language:f.default.string,onClick:f.default.func,onFailure:f.default.func,render:f.default.func.isRequired},h.defaultProps={redirectUri:"undefined"!=typeof window?window.location.href:"/",scope:"public_profile,email",returnScopes:!1,xfbml:!1,cookie:!1,authType:"",fields:"name",version:"2.3",language:"en_US",disableMobileRedirect:!1,isMobile:function(){var e=!1;try{e=!!(window.navigator&&window.navigator.standalone||navigator.userAgent.match("CriOS")||navigator.userAgent.match(/mobile/i))}catch(e){}return e}(),onFailure:null,state:"facebookdirect",responseType:"code"},t.default=h},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return"?"+Object.keys(e).map(function(t){return t+"="+encodeURIComponent(e[t])}).join("&")}},function(e,t,n){"use strict";function o(){}var r=n(7);e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}])})}});
//# sourceMappingURL=LoginComp.1b098651.chunk.js.map
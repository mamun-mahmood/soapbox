webpackJsonp([6],{8610:function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(a,i){try{var o=t[a](i),u=o.value}catch(e){return void r(e)}if(!o.done)return Promise.resolve(u).then(function(e){n("next",e)},function(e){n("throw",e)});e(u)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(16),o=r.n(i),u=r(0),c=r.n(u),s=r(14),l=r.n(s),p=r(227),f=r(746),m=r(131),d=r(228),h=r(743),v=(r.n(h),this),y=function(){function e(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){a=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(a)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),w=function(){var e=Object(u.useState)([]),t=y(e,2),r=t[0],i=t[1],s=Object(u.useState)(!0),h=y(s,2),w=h[0],b=h[1],g=Object(u.useState)(2),x=y(g,2),S=x[0],k=x[1],E="https://soapboxapi.megahoot.net";Object(u.useEffect)(function(){!function(){var e=a(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get(E+"/upload/public/p?page=1&limit=10").then(function(e){i(e.data.results)});case 2:case"end":return e.stop()}},e,v)}));return function(){return e.apply(this,arguments)}}()()},[]);var j=function(){var e=a(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get(E+"/upload/public/p?page="+S+"&limit=10").then(function(e){var t=e.data.results;i([].concat(n(r),n(t))),(0===t||t<10)&&b(!1)});case 2:k(S+1);case 3:case"end":return e.stop()}},e,v)}));return function(){return e.apply(this,arguments)}}();return c.a.createElement("div",{className:"feed start",style:{width:"100%"}},r&&c.a.createElement(m.a,{dataLength:r.length,next:j,hasMore:w,loader:c.a.createElement(d.a,null),endMessage:c.a.createElement(f.a,null)},r.map(function(e){return c.a.createElement("div",{key:e.id},c.a.createElement(p.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image,audioPoster:e.audioPoster,likes:e.likes,views:e.views,followers:e.followers,caption:e.caption,link:e.link,ephemeral:e.ephemeral,privateHoot:e.private,expiryDate:e.expiryDate,timeStamp:e.timeStamp,edited:e.edited,editedTimeStamp:e.editedTimeStamp}))})))};t.default=w}});
//# sourceMappingURL=Feed.46cc391f.chunk.js.map
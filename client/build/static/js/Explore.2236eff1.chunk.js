webpackJsonp([9],{8817:function(e,r,t){"use strict";function n(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function a(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){function n(a,o){try{var i=r[a](o),s=i.value}catch(e){return void t(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(15),i=t.n(o),s=t(14),c=t.n(s),l=t(0),u=t.n(l),m=t(42),p=t(38),d=t(164),A=t(267),f=t(208),h=t(823),g=t(8818),v=(t.n(g),t(24)),b=t(76),x=t.n(b),y=t(54),B=t(8820),k=t(25),E=t(821),w=t.n(E),C=this,N=function(){function e(e,r){var t=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(e){a=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(a)throw o}}return t}return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),I=function(){var e=Object(l.useState)(""),r=N(e,2),t=r[0],o=r[1],s=Object(l.useState)([]),g=N(s,2),b=g[0],E=g[1],I=Object(l.useState)([]),W=N(I,2),j=W[0],O=W[1],S=Object(l.useState)([]),D=N(S,2),T=D[0],P=D[1],M=Object(l.useState)(!0),Y=N(M,2),U=Y[0],z=Y[1],F=Object(l.useState)(!0),H=N(F,2),_=H[0],L=H[1],G=Object(l.useState)(!0),R=N(G,2),q=(R[0],R[1]),K=Object(l.useState)(2),J=N(K,2),X=J[0],Z=J[1],Q=Object(l.useState)(2),V=N(Q,2),$=V[0],ee=V[1],re=Object(l.useState)(2),te=N(re,2),ne=te[0],ae=te[1],oe=Object(l.useRef)(null),ie=Object(y.g)(),se="https://soapboxapi.megahoot.net";Object(l.useEffect)(function(){(function(){var e=a(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(se+"/upload/trending/public/p?page=1&limit=10").then(function(e){E(e.data.results)});case 2:case"end":return e.stop()}},e,C)}));return function(){return e.apply(this,arguments)}})()(),oe.current.focus()},[]),Object(l.useEffect)(function(){""===t&&(z(!0),P([]),ae(2),q(!0))},[t]);var ce=function(){var e=a(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(se+"/upload/trending/public/p?page="+X+"&limit=10").then(function(e){var r=e.data.results;E([].concat(n(b),n(r))),(0===r||r<10)&&L(!1)});case 2:Z(X+1);case 3:case"end":return e.stop()}},e,C)}));return function(){return e.apply(this,arguments)}}(),le=function(){var e=a(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return z(!1),e.next=3,c.a.all([c.a.get(se+"/upload/search/public/p?page=1&limit=10&keyword="+t),t.length>2&&c.a.get(se+"/user/search/p?page=1&limit=4&keyword="+t)]).then(c.a.spread(function(e,r){O(e.data.results),r.data&&P(r.data.results)}));case 3:oe.current.focus();case 4:case"end":return e.stop()}},e,C)}));return function(){return e.apply(this,arguments)}}(),ue=function(){var e=a(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(se+"/upload/search/public/p?page="+$+"&limit=10&keyword="+t).then(function(e){var r=e.data.results;O([].concat(n(j),n(r))),(0===r||r<10)&&L(!1)});case 2:ee($+1);case 3:case"end":return e.stop()}},e,C)}));return function(){return e.apply(this,arguments)}}(),me=function(){var e=a(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(se+"/user/search/p?page="+ne+"&limit=4&keyword="+t).then(function(e){var r=e.data.results;P([].concat(n(T),n(r))),(0===r||r<4)&&q(!1)});case 2:ae(ne+1);case 3:case"end":return e.stop()}},e,C)}));return function(){return e.apply(this,arguments)}}(),pe=function(e){13===e.keyCode&&(t?le():v.c.info("Search field can not be empty.")),oe.current.focus()};return u.a.createElement("div",{className:"explore start"},u.a.createElement("div",{className:"search-bar"},u.a.createElement("input",{ref:oe,onChange:function(e){o(e.target.value)},onKeyDown:function(e){pe(e)},type:"text",placeholder:"Search Creators and Hoots based on Hashtags, Stocks and Keywords & hit enter"}),u.a.createElement("img",{src:w.a,width:"40px",className:"search-icon",onClick:le})),u.a.createElement("div",{className:"search-users-list"},T&&T.map(function(e){return u.a.createElement("div",{key:e.id,className:"found-user"},u.a.createElement(B.a,{user:e}))})),T.length>3?u.a.createElement("small",{style:{paddingLeft:"0.5rem"},className:"see-more-suggested",onClick:me},"See More Creators"):null,U?u.a.createElement(d.a,{dataLength:b.length,next:ce,hasMore:_,loader:u.a.createElement(A.a,null)},u.a.createElement("div",{className:"hoot-profile-layout",style:{marginTop:T.length>0&&"1rem"}},b.map(function(e){return u.a.createElement("div",{key:e.id},e.mimeType?"audio"==e.mimeType.substr(0,5)?u.a.createElement(h.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image}):u.a.createElement(f.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image}):u.a.createElement("div",{className:"img-container"},u.a.createElement("div",{className:"hoot-img-vertical-profile",style:{animation:"none",backgroundColor:"#d9d1f8"},onContextMenu:function(e){return e.preventDefault()},onClick:function(){ie.push("/"+e.authorUsername+"/hoot/"+btoa(e.id)+"/"+Object(k.a)())}},x.a.canPlay(e.link)&&e.link.endsWith(".mp4")||e.link.endsWith(".mkv")||e.link.endsWith(".mov")||e.link.endsWith(".ogv")||e.link.endsWith(".webm")||e.link.endsWith(".mpg")?u.a.createElement("div",{className:"vdo-container"},u.a.createElement("video",{muted:!0,disablePictureInPicture:!0,className:"hoot-vdo-profile",style:{margin:"0"},onMouseOver:function(e){return e.target.play()},onMouseOut:function(e){return e.target.pause()},onDragStart:function(e){return e.preventDefault()}},u.a.createElement("source",{src:e.link}),"Your browser does not support HTML video.")):e.link.endsWith(".mp3")||e.link.endsWith(".ogg")||e.link.endsWith(".wav")||e.link.endsWith(".flac")||e.link.endsWith(".aac")||e.link.endsWith(".alac")||e.link.endsWith(".dsd")?u.a.createElement("div",{className:"vdo-container"},u.a.createElement("video",{muted:!0,poster:se+"/profile-pictures/"+se+"/profile-pictures/"+e.profilePic,className:"hoot-vdo-profile",style:{margin:"0"},onDragStart:function(e){return e.preventDefault()}},u.a.createElement("source",{src:e.link}),"Your browser does not support HTML video.")):x.a.canPlay(e.link)&&u.a.createElement("div",{className:"player-profile-wrapper"},u.a.createElement(x.a,{url:e.link,className:"react-player",controls:"true",width:e.mimeType?"97%":"100%",height:"100%",light:!0}))),u.a.createElement(p.k,{className:"GIF-overlay",style:{borderRadius:"50%"},onClick:function(){ie.push("/"+e.authorUsername+"/hoot/"+btoa(e.id)+"/"+Object(k.a)())}})))}))):j.length>0?u.a.createElement(d.a,{dataLength:j.length,next:ue,hasMore:_},u.a.createElement("div",{className:"hoot-profile-layout",style:{marginTop:T.length>0&&"1rem"}},j.map(function(e){return u.a.createElement("div",{key:e.id},e.mimeType?"audio"==e.mimeType.substr(0,5)?u.a.createElement(h.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image}):u.a.createElement(f.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image}):u.a.createElement("div",{className:"img-container"},u.a.createElement("div",{className:"hoot-img-vertical-profile",style:{animation:"none",backgroundColor:"#d9d1f8"},onContextMenu:function(e){return e.preventDefault()},onClick:function(){ie.push("/"+e.authorUsername+"/hoot/"+btoa(e.id)+"/"+Object(k.a)())}},x.a.canPlay(e.link)&&e.link.endsWith(".mp4")||e.link.endsWith(".mkv")||e.link.endsWith(".mov")||e.link.endsWith(".ogv")||e.link.endsWith(".webm")||e.link.endsWith(".mpg")?u.a.createElement("div",{className:"vdo-container"},u.a.createElement("video",{muted:!0,disablePictureInPicture:!0,className:"hoot-vdo-profile",style:{margin:"0"},onMouseOver:function(e){return e.target.play()},onMouseOut:function(e){return e.target.pause()},onDragStart:function(e){return e.preventDefault()}},u.a.createElement("source",{src:e.link}),"Your browser does not support HTML video.")):e.link.endsWith(".mp3")||e.link.endsWith(".ogg")||e.link.endsWith(".wav")||e.link.endsWith(".flac")||e.link.endsWith(".aac")||e.link.endsWith(".alac")||e.link.endsWith(".dsd")?u.a.createElement("div",{className:"vdo-container"},u.a.createElement("video",{muted:!0,poster:se+"/profile-pictures/"+se+"/profile-pictures/"+e.profilePic,className:"hoot-vdo-profile",style:{margin:"0"},onDragStart:function(e){return e.preventDefault()}},u.a.createElement("source",{src:e.link}),"Your browser does not support HTML video.")):x.a.canPlay(e.link)&&u.a.createElement("div",{className:"player-profile-wrapper"},u.a.createElement(x.a,{url:e.link,className:"react-player",controls:"true",width:e.mimeType?"97%":"100%",height:"100%",light:!0}))),u.a.createElement(p.k,{className:"GIF-overlay",style:{borderRadius:"50%"},onClick:function(){ie.push("/"+e.authorUsername+"/hoot/"+btoa(e.id)+"/"+Object(k.a)())}})))}))):u.a.createElement("div",{className:"no-search-result"},"No results for ",t),u.a.createElement(m.a,null,u.a.createElement("title",null,"Explore ",t," Hoots on MegaHoot Soapbox - Where Content Creators Monetize Their Private Club")))};r.default=I},8818:function(e,r,t){var n=t(8819);"string"===typeof n&&(n=[[e.i,n,""]]);var a={hmr:!1};a.transform=void 0;t(8795)(n,a);n.locals&&(e.exports=n.locals)},8819:function(e,r,t){r=e.exports=t(8794)(!0),r.push([e.i,".explore{width:100%}.search-bar{width:auto;margin:1rem;margin-top:0}.search-bar,.search-bar input{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.search-bar input{padding:0 .5rem;margin:1rem;margin-left:0;font-size:1rem;border:2px solid #d1d5db;border-radius:.5rem;width:90%;height:40px;outline:none}.search-bar input,.search-icon{-webkit-transition:.3s;-o-transition:.3s;transition:.3s}.search-icon{color:var(--primary-color);font-size:x-large;font-weight:700;cursor:pointer}.search-icon:hover{-webkit-transform:scale(1.3);-ms-transform:scale(1.3);transform:scale(1.3)}.search-bar input:focus,.search-bar input:hover{border-color:var(--primary-color)}.no-search-result{width:100%;text-align:center;padding:1rem;font-size:1.5rem;color:var(--text-color)}.search-users-list{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:0 5rem}.found-user{width:250px}.found-user:hover{cursor:pointer;background-color:#ede9ff;border-radius:.5rem;-webkit-box-shadow:rgba(14,30,37,.12) 0 2px 4px 0,hsla(270,2%,83%,.32) 0 2px 16px 0;box-shadow:0 2px 4px 0 rgba(14,30,37,.12),0 2px 16px 0 hsla(270,2%,83%,.32)}","",{version:3,sources:["D:/WORKS/MHP/soapboxFrontend/client/src/components/Explore/explore.css"],names:[],mappings:"AAAA,SACI,UAAY,CAEf,AAED,YAGI,WAAY,AAQZ,YAAa,AACb,YAAc,CACjB,AAED,8BAXI,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AAClB,uBAAwB,AAC5B,sBAAuB,AACnB,kBAAoB,CA+B3B,AAzBD,kBACI,gBAAkB,AAClB,YAAa,AACb,cAAkB,AAUlB,eAAgB,AAEhB,yBAA0B,AAC1B,oBAAsB,AAEtB,UAAW,AACX,YAAa,AAEb,YAAc,CAIjB,AAED,+BALI,uBAAyB,AACzB,kBAAoB,AACpB,cAAiB,CAWpB,AARD,aACI,2BAA4B,AAC5B,kBAAmB,AACnB,gBAAiB,AACjB,cAAgB,CAInB,AAED,mBACI,6BAA8B,AAC1B,yBAA0B,AACtB,oBAAsB,CACjC,AAMD,gDACI,iCAAmC,CACtC,AAED,kBACI,WAAY,AACZ,kBAAmB,AACnB,aAAc,AACd,iBAAkB,AAClB,uBAAyB,CAC5B,AAED,mBACI,oBAAqB,AACrB,aAAc,AACd,mBAAoB,AAChB,eAAgB,AACpB,UAAY,CACf,AAED,YACI,WAAa,CAChB,AACD,kBACI,eAAgB,AAChB,yBAA0B,AAC1B,oBAAsB,AACtB,oFAAuG,AAC/F,2EAA+F,CAC1G",file:"explore.css",sourcesContent:[".explore {\r\n    width: 100%;\r\n\r\n}\r\n\r\n.search-bar {\r\n    /* position: relative; */\r\n\r\n    width: auto;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    margin: 1rem;\r\n    margin-top: 0;\r\n}\r\n\r\n.search-bar input {\r\n    padding: 0 0.5rem;\r\n    margin: 1rem;\r\n    margin-left: 0rem;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n\r\n    font-size: 1rem;\r\n\r\n    border: 2px solid #D1D5DB;\r\n    border-radius: 0.5rem;\r\n\r\n    width: 90%;\r\n    height: 40px;\r\n\r\n    outline: none;\r\n    -webkit-transition: 0.3s;\r\n    -o-transition: 0.3s;\r\n    transition: 0.3s;\r\n}\r\n\r\n.search-icon {\r\n    color: var(--primary-color);\r\n    font-size: x-large;\r\n    font-weight: 700;\r\n    cursor: pointer;\r\n    -webkit-transition: 0.3s;\r\n    -o-transition: 0.3s;\r\n    transition: 0.3s;\r\n}\r\n\r\n.search-icon:hover {\r\n    -webkit-transform: scale(1.3);\r\n        -ms-transform: scale(1.3);\r\n            transform: scale(1.3);\r\n}\r\n\r\n.search-bar input:hover {\r\n    border-color: var(--primary-color);\r\n}\r\n\r\n.search-bar input:focus {\r\n    border-color: var(--primary-color);\r\n}\r\n\r\n.no-search-result {\r\n    width: 100%;\r\n    text-align: center;\r\n    padding: 1rem;\r\n    font-size: 1.5rem;\r\n    color: var(--text-color);\r\n}\r\n\r\n.search-users-list {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-wrap: wrap;\r\n        flex-wrap: wrap;\r\n    gap: 0 5rem;\r\n}\r\n\r\n.found-user {\r\n    width: 250px;\r\n}\r\n.found-user:hover {\r\n    cursor: pointer;\r\n    background-color: #EDE9FF;\r\n    border-radius: 0.5rem;\r\n    -webkit-box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(212, 211, 213, 0.32) 0px 2px 16px 0px;\r\n            box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(212, 211, 213, 0.32) 0px 2px 16px 0px;\r\n}"],sourceRoot:""}])},8820:function(e,r,t){"use strict";function n(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,t){function n(a,o){try{var i=r[a](o),s=i.value}catch(e){return void t(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}var a=t(15),o=t.n(a),i=t(14),s=t.n(i),c=t(0),l=t.n(c),u=t(63),m=t(16),p=t(109),d=t.n(p),A=t(110),f=t.n(A),h=t(111),g=t.n(h),v=t(112),b=t.n(v),x=t(113),y=t.n(x),B=this,k=function(){function e(e,r){var t=[],n=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(e){a=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(a)throw o}}return t}return function(r,t){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return e(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),E=function(e){var r=e.user,t="https://soapboxapi.megahoot.net",a=JSON.parse(localStorage.getItem("loggedIn")),i=a&&a.username===r.username?"/profile/"+r.username:"/user/"+r.username,p=Object(c.useState)(null),A=k(p,2),h=A[0],v=A[1],x=Object(c.useState)(null),E=k(x,2),w=(E[0],E[1]);return Object(c.useEffect)(function(){!function(){var e=n(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get(t+"/user/"+r.username).then(function(e){v(e.data[0].badge),w(e.data[0].designation)});case 2:case"end":return e.stop()}},e,B)}));return function(){return e.apply(this,arguments)}}()()},[]),l.a.createElement(c.Fragment,null,l.a.createElement("div",{className:"avatar_name"},l.a.createElement(m.b,{to:i},l.a.createElement("div",{className:"avatar-wraper"},l.a.createElement(u.a,{size:50,round:!0,name:r.name?r.name:r.username,src:t+"/profile-pictures/"+r.profilePic,className:(r.profilePic,"skeleton-img-no-src")}))),l.a.createElement("div",{className:"div-suggested-username-name"},l.a.createElement("div",{className:"name-verification"},l.a.createElement(m.b,{to:i},l.a.createElement("div",{className:"name"},r.name?r.name.length>15?r.name.substring(0,15)+"...":r.name:r.username)),1===r.verified&&l.a.createElement("div",{className:"profile-verification-badge"},"Premium"===h?l.a.createElement("img",{src:f.a,height:"18px",width:"18px",alt:"premium_verified"}):"Corporate"===h?l.a.createElement("img",{src:g.a,height:"18px",width:"18px",alt:"corporate_verified"}):"Notable"===h?l.a.createElement("img",{src:d.a,height:"18px",width:"18px",alt:"corporate_verified"}):"General"===h?l.a.createElement("img",{src:b.a,height:"18px",width:"18px",alt:"corporate_verified"}):"Media"===h?l.a.createElement("img",{src:y.a,height:"18px",width:"18px",alt:"corporate_verified"}):l.a.createElement("img",{src:d.a,height:"18px",width:"18px",alt:"regular_verified"}))),l.a.createElement("div",{className:"at-suggested-name"},"@",r.username))))};r.a=E}});
//# sourceMappingURL=Explore.2236eff1.chunk.js.map
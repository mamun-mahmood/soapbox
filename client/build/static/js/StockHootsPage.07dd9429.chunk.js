webpackJsonp([0],{6603:function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,a){try{var i=t[o](a),s=i.value}catch(e){return void r(e)}if(!i.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(13),i=r.n(a),s=r(10),c=r.n(s),A=r(21),l=r(0),m=r.n(l),d=r(83),u=(r(82),r(11)),p=(r(107),r(152)),f=r(6609),h=(r.n(f),r(6611)),B=this,x=function(){function e(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{!n&&s.return&&s.return()}finally{if(o)throw a}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),C=function(){var e=Object(u.h)(),t=e.stock,r=Object(l.useState)([]),a=x(r,2),s=a[0],f=a[1],C=Object(l.useState)([]),v=x(C,2),k=v[0],g=v[1],w=Object(l.useState)(!0),y=x(w,2),b=(y[0],y[1]),E=Object(l.useState)(2),j=x(E,2),I=j[0],S=j[1],D="https://soapboxapi.megahoot.net";Object(l.useEffect)(function(){!function(){var e=o(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.all[(c.a.get(D+"/upload/p?page=1&limit=10").then(function(e){f(e.data.results)}),c.a.get(D+"/upload").then(function(e){g(e.data)}))];case 2:case"end":return e.stop()}},e,B)}));return function(){return e.apply(this,arguments)}}()()},[]);var q=(function(){var e=o(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(D+"/upload/p?page="+I+"&limit=10").then(function(e){var t=e.data.results;f([].concat(n(s),n(t))),(0===t||t<10)&&b(!1)});case 2:S(I+1);case 3:case"end":return e.stop()}},e,B)}))}(),"$"+t),H=0;k.map(function(e){return m.a.createElement("div",{key:e.id},e.caption.includes(q)?H+=e.views:null)});return m.a.createElement(l.Fragment,null,m.a.createElement("div",{className:"stock-hoots-main"},m.a.createElement("div",{className:"home"},m.a.createElement("div",{className:"stock-hoot-wrapper"},m.a.createElement("div",{className:"stock-hoots-name"},m.a.createElement("div",{className:"stock-header"},m.a.createElement(d.a,null),t.toUpperCase()),m.a.createElement("span",null,function(e){return e<1e3?e:e>=1e3&&e<1e6?+(e/1e3).toFixed(1):e>=1e6&&e<1e9?+(e/1e6).toFixed(1):e>=1e9&&e<1e12?+(e/1e9).toFixed(1):e>=1e12?+(e/1e12).toFixed(1):void 0}(H)+function(e){return e<1e3?"":e>=1e3&&e<1e6?"K":e>=1e6&&e<1e9?"M":e>=1e9&&e<1e12?"B":e>=1e12?"T":void 0}(H)," Views")))),k.map(function(e){return m.a.createElement("div",{key:e.id},e.caption.includes(q)?m.a.createElement(p.a,{hootId:e.id,username:e.authorUsername,mimeType:e.mimeType,hootImgId:e.image,likes:e.likes,views:e.views,caption:e.caption,link:e.link,ephemeral:e.ephemeral,privateHoot:e.private,expiryDate:e.expiryDate,timeStamp:e.timeStamp,edited:e.edited,editedTimeStamp:e.editedTimeStamp}):null)}),m.a.createElement(h.a,null)),m.a.createElement(A.a,null,m.a.createElement("title",null,"$",t," Hoots on MegaHoot Soapbox - Where Content Creators Monetize Their Private Channels")))};t.default=C},6609:function(e,t,r){var n=r(6610);"string"===typeof n&&(n=[[e.i,n,""]]);var o={hmr:!1};o.transform=void 0;r(6597)(n,o);n.locals&&(e.exports=n.locals)},6610:function(e,t,r){t=e.exports=r(6596)(!0),t.push([e.i,".stock-hoots-main::-webkit-scrollbar{display:none}.stock-hoots-main{width:100%;overflow-x:hidden}.stock-hoot-wrapper{padding-top:5rem;width:650px;height:auto;margin:0 auto}.stock-header{gap:.3rem;-ms-flex-align:center;align-items:center}.stock-header,.stock-hoots-name{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start}.stock-hoots-name{width:100%;min-height:100px;-ms-flex-direction:column;flex-direction:column;word-break:break-all;padding:.5rem 1rem;font-size:2rem;font-weight:500;color:var(--primary-color);background-color:#ededff;border-radius:.5rem;border:1px solid var(--border-color);border-top:10px solid var(--secondary-color);cursor:pointer}.stock-hoots-name span{font-size:medium;font-weight:600;color:var(--text-color);padding-left:.2rem}@media only screen and (max-width:1050px){.stock-hoot-wrapper{width:auto;max-width:650px}}","",{version:3,sources:["E:/GitHub/soapbox-frontend/client/src/components/StockHoots/stockHoots.css"],names:[],mappings:"AAAA,qCACI,YAAc,CACjB,AAED,kBACI,WAAY,AACZ,iBAAmB,CACtB,AAED,oBACI,iBAAkB,AAClB,YAAa,AACb,YAAa,AACb,aAAe,CAClB,AACD,cAGI,UAAY,AAGZ,sBAAuB,AACnB,kBAAoB,CAC3B,AAED,gCATI,oBAAqB,AACrB,aAAc,AAEd,oBAAqB,AACjB,0BAA4B,CAmCnC,AA9BD,kBACI,WAAY,AACZ,iBAAkB,AAMlB,0BAA2B,AACvB,sBAAuB,AAK3B,qBAAsB,AAEtB,mBAAqB,AAErB,eAAgB,AAChB,gBAAiB,AAGjB,2BAA4B,AAC5B,yBAAqC,AAErC,oBAAsB,AACtB,qCAAsC,AACtC,6CAA8C,AAE9C,cAAgB,CACnB,AAED,uBACI,iBAAkB,AAClB,gBAAiB,AACjB,wBAAyB,AACzB,kBAAqB,CACxB,AAED,0CACI,oBACE,WAAY,AACZ,eAAiB,CAClB,CACJ",file:"stockHoots.css",sourcesContent:[".stock-hoots-main::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n.stock-hoots-main {\r\n    width: 100%;\r\n    overflow-x: hidden;\r\n}\r\n\r\n.stock-hoot-wrapper {\r\n    padding-top: 5rem;\r\n    width: 650px;\r\n    height: auto;\r\n    margin: 0 auto;\r\n}\r\n.stock-header {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    gap: 0.3rem;\r\n    -ms-flex-pack: start;\r\n        justify-content: flex-start;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n}\r\n\r\n.stock-hoots-name {\r\n    width: 100%;\r\n    min-height: 100px;\r\n\r\n    display: -ms-flexbox;\r\n\r\n    display: flex;\r\n    /* gap: 0.3rem; */\r\n    -ms-flex-direction: column;\r\n        flex-direction: column;\r\n    -ms-flex-pack: start;\r\n        justify-content: flex-start;\r\n    /* align-items: center; */\r\n\r\n    word-break: break-all;\r\n\r\n    padding: 0.5rem 1rem;\r\n\r\n    font-size: 2rem;\r\n    font-weight: 500;\r\n\r\n    /* color: var(--text-color); */\r\n    color: var(--primary-color);\r\n    background-color: rgb(237, 237, 255);\r\n\r\n    border-radius: 0.5rem;\r\n    border: 1px solid var(--border-color);\r\n    border-top: 10px solid var(--secondary-color);\r\n\r\n    cursor: pointer;\r\n}\r\n\r\n.stock-hoots-name span {\r\n    font-size: medium;\r\n    font-weight: 600;\r\n    color: var(--text-color);\r\n    padding-left: 0.2rem;\r\n}\r\n\r\n@media only screen and (max-width: 1050px) {\r\n    .stock-hoot-wrapper {\r\n      width: auto;\r\n      max-width: 650px;\r\n    }\r\n}"],sourceRoot:""}])},6611:function(e,t,r){"use strict";var n=r(0),o=r.n(n),a=r(11),i=function(){return o.a.createElement("div",null,o.a.createElement("p",{className:"end-hoot-msg"},o.a.createElement(a.b,{to:"/create"}," Create Hoot ")," with"," ",o.a.createElement("a",{href:"soapbox:;"},"$stocks")," ","to get listed"))};t.a=i}});
//# sourceMappingURL=StockHootsPage.07dd9429.chunk.js.map
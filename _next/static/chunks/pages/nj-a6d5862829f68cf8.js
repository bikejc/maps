(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[771],{1752:function(e,t,n){e.exports=n(7905)},8268:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/nj",function(){return n(4397)}])},5677:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{noSSR:function(){return c},default:function(){return l}});let o=n(4788),r=n(8754),a=(n(7294),r._(n(8976)));function i(e){return{default:(null==e?void 0:e.default)||e}}function c(e,t){return delete t.webpack,delete t.modules,e(t)}function l(e,t){let n=a.default,r={loading:e=>{let{error:t,isLoading:n,pastDelay:o}=e;return null}};e instanceof Promise?r.loader=()=>e:"function"==typeof e?r.loader=e:"object"==typeof e&&(r=o._({},r,e)),r=o._({},r,t);let l=r.loader,u=()=>null!=l?l().then(i):Promise.resolve(i(()=>null));return(r.loadableGenerated&&(r=o._({},r,r.loadableGenerated),delete r.loadableGenerated),"boolean"!=typeof r.ssr||r.ssr)?n(o._({},r,{loader:u})):(delete r.webpack,delete r.modules,c(n,r))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2254:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return a}});let o=n(8754),r=o._(n(7294)),a=r.default.createContext(null)},8976:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return m}});let o=n(4788),r=n(8754),a=r._(n(7294)),i=n(2254),c=[],l=[],u=!1;function s(e){let t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then(e=>(n.loading=!1,n.loaded=e,e)).catch(e=>{throw n.loading=!1,n.error=e,e}),n}class d{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state=o._({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function f(e){return function(e,t){let n=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),o=null;function r(){if(!o){let t=new d(e,n);o={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return o.promise()}if(!u){let e=n.webpack?n.webpack():n.modules;e&&l.push(t=>{for(let n of e)if(-1!==t.indexOf(n))return r()})}function c(e,t){!function(){r();let e=a.default.useContext(i.LoadableContext);e&&Array.isArray(n.modules)&&n.modules.forEach(t=>{e(t)})}();let c=a.default.useSyncExternalStore(o.subscribe,o.getCurrentValue,o.getCurrentValue);return a.default.useImperativeHandle(t,()=>({retry:o.retry}),[]),a.default.useMemo(()=>{var t;return c.loading||c.error?a.default.createElement(n.loading,{isLoading:c.loading,pastDelay:c.pastDelay,timedOut:c.timedOut,error:c.error,retry:o.retry}):c.loaded?a.default.createElement((t=c.loaded)&&t.default?t.default:t,e):null},[e,c])}return c.preload=()=>r(),c.displayName="LoadableComponent",a.default.forwardRef(c)}(s,e)}function p(e,t){let n=[];for(;e.length;){let o=e.pop();n.push(o(t))}return Promise.all(n).then(()=>{if(e.length)return p(e,t)})}f.preloadAll=()=>new Promise((e,t)=>{p(c).then(e,t)}),f.preloadReady=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise(t=>{let n=()=>(u=!0,t());p(l,e).then(n,n)})},window.__NEXT_PRELOADREADY=f.preloadReady;let m=f},4923:function(e,t,n){"use strict";var o=n(5152),r=n.n(o);let a=r()(()=>Promise.all([n.e(269),n.e(196)]).then(n.bind(n,3196)),{loadableGenerated:{webpack:()=>[3196]},ssr:!1});t.Z=a},4661:function(e,t,n){"use strict";n.d(t,{FN:function(){return i},Hv:function(){return r},Ls:function(){return o},Wl:function(){return l},oJ:function(){return u},yj:function(){return c},zQ:function(){return a}});let o={A:{color:"#ff0000",councillor:"Denise Ridley"},B:{color:"#ff8800",councillor:"Mira Prinz-Arey"},C:{color:"#ffff00",councillor:"Rich Boggiano"},D:{color:"#00ff00",councillor:"Yousef Saleh"},E:{color:"#0000ff",councillor:"James Solomon"},F:{color:"#ff00ff",councillor:"Frank Gilmore"}},r={"PROTECTED BIKE LANE":{color:"#26de3b"},"PLANNED PROTECTED BIKE LANE":{color:"#b122e0"},"SHARED USE LANE":{color:"#FFFF00"},"SHARED USE PATH":{color:"#00FFFF"}},a={"NEIGHBORHOOD GREENWAY":{color:"lightblue"},"BIKE LANE":{color:"lightorange"},"PROTECTED BIKE LANE":{color:"lightgreen"},"SHARED USE LANE":{color:"lightred"},"SHARED USE PATH":{color:"lightyellow"}},i={openstreetmap:{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:"&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"},alidade_smooth_dark:{url:"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",attribution:'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}},c={wards:"wards.json",roads:"Roads_Jersey_City.json",lur:"light-up-route-20220708.gpx",citibike:"JC_Citi_Bike_Locations.json",HIN:"Vision_Zero_Traffic_Calming_Projects_WFL1/Merged_HIN.json",counties:"County_Boundaries_of_NJ.geojson",county2:"County_Boundaries_of_NJ_2x.geojson",county5:"County_Boundaries_of_NJ_5x.geojson",county10:"County_Boundaries_of_NJ_10x.geojson",bmp:"Proposed Full Network.geojson"},l=[{label:"Bike Lanes",key:"bikeLanes"},{label:"Roads",key:"roads"},{label:"Wards",key:"wards"},{label:"Citi Bike Docks",key:"citibike"},{label:"High Injury Network",key:"HIN"},{label:"Counties",key:"counties"},{label:"Counties/2",key:"county2"},{label:"Counties/5",key:"county5"},{label:"Counties/10",key:"county10"},{label:"Bike Master Plan",key:"bmp"}],u=["wards","counties","county2","county5","county10","roads","HIN","bmp","bikeLanes","citibike"]},4397:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var o=n(5893),r=n(1752),a=n.n(r),i=n(9008),c=n.n(i),l=n(7281),u=n.n(l),s=n(6377),d=n.n(s),f=n(4923),p=n(9034),m=n.n(p),h=n(7294),_=n(4661),x=n(509),y=n(1363);let g={lat:40.1067,lng:-74.9362};function b(e){let{}=e,[t,{add:n,remove:r}]=(0,x.$)(["county10"]),i=Array.from(t).map(e=>[_.oJ.indexOf(e),e]).sort((e,t)=>{let[n]=e,[o]=t;return n-o}).map(e=>{let[t,n]=e;return n}),l={ll:(0,y.GS)(g,3),z:(0,y.yc)(9)},{ll:[{lat:s,lng:p},b],z:[v,j]}=(0,y.O5)({params:l}),[w,k]=(0,h.useReducer)((e,t)=>{let[n,o]=t;if(n in e)return o[n]?(console.warn("fetchLayers: duplicate add ".concat(n)),e):(console.log("fetchLayers: updating ".concat(n," (").concat(o.length," elems)")),Object.fromEntries(Object.entries(e).map(e=>{let[t,r]=e;return t===n?[t,o]:[t,r]})));{console.log("fetchLayers: setting ".concat(n,": ").concat(o));let t={...e};return t[n]=o,t}},[]),C=(0,h.useMemo)(()=>Object.fromEntries(i.filter(e=>e in w&&w[e]).map((e,t)=>[e,t])),[w,i]),[E,O]=(0,h.useState)(!1),[S,N]=(0,h.useState)(!1),P=window.location.href,{publicRuntimeConfig:D={}}=a()(),{basePath:A=""}=D;return(0,h.useEffect)(()=>{let e=async e=>{if(!P)return Promise.resolve();if(e in w)return w[e]?console.log("".concat(e,": already fetched")):console.log("".concat(e,": currently fetching")),Promise.resolve();k([e,null]);let t=_.yj[e],o="".concat(A,"/").concat(t);console.log("fetching layer: ".concat(e));let r=await fetch(o);console.log("fetched layer: ".concat(e));let a=await r.json(),i=a.features;return console.log("layer ".concat(e,":"),i),k([e,i]),n(e),Promise.resolve()};Promise.all(i.map(e)).catch(console.error)},[t]),(0,o.jsxs)("div",{className:m().container,children:[(0,o.jsxs)(c(),{children:[(0,o.jsx)("title",{children:""}),(0,o.jsx)("link",{rel:"icon",href:"./favicon.ico"}),(0,o.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),(0,o.jsx)("meta",{name:"twitter:card",content:"summary"},"twcard"),(0,o.jsx)("meta",{name:"twitter:creator",content:"RunsAsCoded"},"twhandle"),(0,o.jsx)("meta",{property:"og:url",content:"https://map.bikejc.org"},"ogurl"),(0,o.jsx)("meta",{property:"og:type",content:"website"}),(0,o.jsx)("meta",{property:"og:image",content:"https://map.bikejc.org/jc-pbl-map.png"},"ogimage"),(0,o.jsx)("meta",{property:"og:site_name",content:"New Jersey County Map"},"ogsitename"),(0,o.jsx)("meta",{property:"og:title",content:"New Jersey County Map"},"ogtitle"),(0,o.jsx)("meta",{property:"og:description",content:"County boundaries in NJ state"},"ogdesc")]}),(0,o.jsx)("main",{className:m().main,children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(f.Z,{className:m().homeMap,center:{lat:s,lng:p},zoom:v,zoomControl:!0,zoomDelta:.5,zoomSnap:.5,children:e=>(function(e){let{useMapEvents:t,TileLayer:n,Polygon:r,Tooltip:a,activeLayerIndices:i,fetchedLayers:c,activeLayers:l,setLL:u,setZoom:s}=e,f=t({move:()=>u(f.getCenter(),"replaceIn"),zoom:()=>s(f.getZoom(),"replaceIn")}),p=e=>{var t;d()(4,{global:!0});let n=i[e];return null===(t=c[e])||void 0===t?void 0:t.map(t=>{let{properties:i,geometry:c}=t,{COUNTY:l,COUNTY_LABEL:u,POP2010:s,POPDEN2010:d}=i,{type:f,coordinates:p}=c,m=function(){let[e,t,n]=[0,1,2].map(()=>parseInt(256*Math.random()).toString(16)).map(e=>e.length<2?"0".concat(e):e);return"#".concat(e).concat(t).concat(n)}();function _(e){let{key:t,positions:n}=e;return(0,o.jsx)(h.Fragment,{children:(0,o.jsx)(r,{style:{zIndex:1},weight:1,color:"black",fillColor:m,positions:n,fillOpacity:.4,children:(0,o.jsxs)(a,{sticky:!0,children:[(0,o.jsx)("span",{children:u},"county"),(0,o.jsx)("br",{},"br"),(0,o.jsxs)("span",{children:["2010 population: ",s.toLocaleString()," (",d.toLocaleString(),"/mi\xb2)"]},"population")]})},t)},t)}return"MultiPolygon"===f?p.map((e,t)=>e.map((e,o)=>{let r=e.map(e=>{let[t,n]=e;return[n,t]}),a="county-".concat(l,"_coords").concat(t,"_polygon").concat(o,"_rank").concat(n);return _({key:a,positions:r})})):"Polygon"===f?p.map((t,o)=>{let r=t.map(e=>{let[t,n]=e;return[n,t]}),a="".concat(e,"-").concat(l,"_polygon").concat(o,"_rank").concat(n);return _({key:a,positions:r})}):(console.warn("County ".concat(l,": unexpected geometry type ").concat(f)),null)})},{url:m,attribution:x}=_.FN.alidade_smooth_dark;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{url:m,attribution:x}),"counties"in c&&l.includes("counties")&&p("counties"),"county2"in c&&l.includes("county2")&&p("county2"),"county5"in c&&l.includes("county5")&&p("county5"),"county10"in c&&l.includes("county10")&&p("county10")]})})({...e,activeLayerIndices:C,fetchedLayers:w,activeLayers:i,setLL:b,setZoom:j})}),(0,o.jsx)("div",{className:m().title,children:""}),(0,o.jsx)("div",{className:u().gearContainer,onMouseEnter:()=>N(!0),onMouseLeave:()=>N(!1),children:(0,o.jsxs)("div",{className:u().settings,children:[(0,o.jsx)("i",{className:"fa fa-gear ".concat(u().gear),onClick:()=>O(!E)}),(E||S)&&(0,o.jsxs)("div",{className:u().menu,children:[(0,o.jsx)("ul",{className:u().layers,children:_.Wl.map(e=>{let{label:t,key:a}=e,c=i.includes(a);return(0,o.jsx)("li",{children:(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"checkbox",onChange:function(e){let t=e.target.checked;t===c&&console.error("layer ".concat(a,": checked ").concat(t," != active ").concat(c)),t?n(a):r(a)},checked:c}),t]})},a)})}),(0,o.jsxs)("div",{className:u().icons,children:[(0,o.jsx)("a",{href:"https://github.com/bikejc/maps",children:(0,o.jsx)("img",{alt:"GitHub logo",className:u().icon,src:"./gh.png"})}),(0,o.jsx)("a",{href:"https://bikejc.org",children:(0,o.jsx)("img",{alt:"Bike JC logo",className:u().icon,src:"./logo.png"})})]})]})]})})]})})]})}},1363:function(e,t,n){"use strict";n.d(t,{GS:function(){return c},O5:function(){return s},W$:function(){return u},yc:function(){return l},z1:function(){return i}});var o=n(1163),r=n(7294),a=n(509);let i=/[^?#]+/u;function c(e,t){return{encode:n=>{let{lat:o,lng:r}=n;return o===e.lat&&r===e.lng?void 0:t?"".concat(o.toFixed(t),"_").concat(r.toFixed(t)):"".concat(o,"_").concat(r)},decode:t=>{if(!t)return e;let[n,o]=t.split("_").map(parseFloat);return{lat:n,lng:o}}}}function l(e){return{encode:t=>t===e?void 0:t.toString(),decode:t=>t?parseFloat(t):e}}function u(e){let t,{init:n,allValues:o,mapper:r,delim:i}=e;function c(e){return Array.from(e).filter(e=>!!o.includes(e)||(console.warn("Invalid value: ".concat(e," not in ").concat(o)),!1))}i=void 0===i?"_":i,r&&(t=Object.fromEntries(Object.entries(r).map(e=>{let[t,n]=e;return[n,t]})));let l=e=>(e=c(e),r&&(e=e.map(e=>r[e])),e.join(i)),u=l(n);return{encode:e=>{let t=l(e);if(t!==u)return t},decode:e=>{if(!e&&""!==e)return n;let o=e.split(i);return t&&(o=o.filter(e=>e in t||(console.warn("Unrecognized value: ".concat(e," not in ").concat(Object.keys(t).join(","))),!1)).map(e=>t[e])),o=c(o)},use:a.$}}function s(e){let{params:t}=e,n=(0,o.useRouter)(),a=n.asPath.replace(i,""),c=Object.fromEntries(new URLSearchParams(a).entries()),l=Object.fromEntries(Object.entries(t).map(e=>{let[t,n]=e,[o,a]=(n.use||r.useState)(n.decode(c[t]));return[t,{val:o,set:a,param:n}]})),u=Object.values(l).map(e=>{let{val:t}=e;return t}),s=n.asPath.match(i),d=s?s[0]:n.asPath;return(0,r.useEffect)(()=>{let e={};Object.entries(l).map(t=>{let[n,{val:o,param:r}]=t,a=r.encode(o);void 0!==a&&(e[n]=a)});let t=new URLSearchParams(e).toString();n.replace({pathname:n.pathname,hash:"",search:t},{pathname:d,hash:"",search:t},{shallow:!0,scroll:!1})},[...u,d]),Object.fromEntries(Object.entries(l).map(e=>{let[t,{val:n,set:o}]=e;return[t,[n,o]]}))}},509:function(e,t,n){"use strict";n.d(t,{$:function(){return r}});var o=n(7294);let r=e=>{let[t,n]=(0,o.useState)(new Set(e)),r=(0,o.useMemo)(()=>({add:e=>n(t=>(console.log("prevSet:",t),new Set([...t,e]))),remove:e=>n(t=>new Set([...t].filter(t=>t!==e))),clear:()=>n(new Set)}),[n]);return[t,r]}},9034:function(e){e.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",footer:"Home_footer____T7K",title:"Home_title__T09hD",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb",homeMap:"Home_homeMap__ZgfiY"}},7281:function(e){e.exports={gearContainer:"index_gearContainer__hRNDa",gear:"index_gear__jl7gj",settings:"index_settings__hL9ax",menu:"index_menu__vXSVq",layers:"index_layers__Vs_35",icons:"index_icons__4oXXp",icon:"index_icon__IdCia"}},5152:function(e,t,n){e.exports=n(5677)},9008:function(e,t,n){e.exports=n(2636)},1163:function(e,t,n){e.exports=n(6885)},6377:function(e,t,n){var o=n(4832),r=n(8652),a=n(801),i=n(2030),c=n(3618),l=n(9049),u=n(1971);u.alea=o,u.xor128=r,u.xorwow=a,u.xorshift7=i,u.xor4096=c,u.tychei=l,e.exports=u},4832:function(e,t,n){var o;!function(e,r,a){function i(e){var t,n=this,o=(t=4022871197,function(e){e=String(e);for(var n=0;n<e.length;n++){var o=.02519603282416938*(t+=e.charCodeAt(n));t=o>>>0,o-=t,o*=t,t=o>>>0,o-=t,t+=4294967296*o}return(t>>>0)*23283064365386963e-26});n.next=function(){var e=2091639*n.s0+23283064365386963e-26*n.c;return n.s0=n.s1,n.s1=n.s2,n.s2=e-(n.c=0|e)},n.c=1,n.s0=o(" "),n.s1=o(" "),n.s2=o(" "),n.s0-=o(e),n.s0<0&&(n.s0+=1),n.s1-=o(e),n.s1<0&&(n.s1+=1),n.s2-=o(e),n.s2<0&&(n.s2+=1),o=null}function c(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function l(e,t){var n=new i(e),o=t&&t.state,r=n.next;return r.int32=function(){return 4294967296*n.next()|0},r.double=function(){return r()+(2097152*r()|0)*11102230246251565e-32},r.quick=r,o&&("object"==typeof o&&c(o,n),r.state=function(){return c(n,{})}),r}r&&r.exports?r.exports=l:n.amdD&&n.amdO?void 0!==(o=(function(){return l}).call(t,n,t,r))&&(r.exports=o):this.alea=l}(0,e=n.nmd(e),n.amdD)},9049:function(e,t,n){var o;!function(e,r,a){function i(e){var t=this,n="";t.next=function(){var e=t.b,n=t.c,o=t.d,r=t.a;return e=e<<25^e>>>7^n,n=n-o|0,o=o<<24^o>>>8^r,r=r-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-o|0,t.d=o<<16^n>>>16^r,t.a=r-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):n+=e;for(var o=0;o<n.length+20;o++)t.b^=0|n.charCodeAt(o),t.next()}function c(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function l(e,t){var n=new i(e),o=t&&t.state,r=function(){return(n.next()>>>0)/4294967296};return r.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},r.int32=n.next,r.quick=r,o&&("object"==typeof o&&c(o,n),r.state=function(){return c(n,{})}),r}r&&r.exports?r.exports=l:n.amdD&&n.amdO?void 0!==(o=(function(){return l}).call(t,n,t,r))&&(r.exports=o):this.tychei=l}(0,e=n.nmd(e),n.amdD)},8652:function(e,t,n){var o;!function(e,r,a){function i(e){var t=this,n="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:n+=e;for(var o=0;o<n.length+64;o++)t.x^=0|n.charCodeAt(o),t.next()}function c(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function l(e,t){var n=new i(e),o=t&&t.state,r=function(){return(n.next()>>>0)/4294967296};return r.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},r.int32=n.next,r.quick=r,o&&("object"==typeof o&&c(o,n),r.state=function(){return c(n,{})}),r}r&&r.exports?r.exports=l:n.amdD&&n.amdO?void 0!==(o=(function(){return l}).call(t,n,t,r))&&(r.exports=o):this.xor128=l}(0,e=n.nmd(e),n.amdD)},3618:function(e,t,n){var o;!function(e,r,a){function i(e){var t=this;t.next=function(){var e,n,o=t.w,r=t.X,a=t.i;return t.w=o=o+1640531527|0,n=r[a+34&127],e=r[a=a+1&127],n^=n<<13,e^=e<<17,n^=n>>>15,e^=e>>>12,n=r[a]=n^e,t.i=a,n+(o^o>>>16)|0},function(e,t){var n,o,r,a,i,c=[],l=128;for(t===(0|t)?(o=t,t=null):(t+="\x00",o=0,l=Math.max(l,t.length)),r=0,a=-32;a<l;++a)t&&(o^=t.charCodeAt((a+32)%t.length)),0===a&&(i=o),o^=o<<10,o^=o>>>15,o^=o<<4,o^=o>>>13,a>=0&&(i=i+1640531527|0,r=0==(n=c[127&a]^=o+i)?r+1:0);for(r>=128&&(c[127&(t&&t.length||0)]=-1),r=127,a=512;a>0;--a)o=c[r+34&127],n=c[r=r+1&127],o^=o<<13,n^=n<<17,o^=o>>>15,n^=n>>>12,c[r]=o^n;e.w=i,e.X=c,e.i=r}(t,e)}function c(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function l(e,t){null==e&&(e=+new Date);var n=new i(e),o=t&&t.state,r=function(){return(n.next()>>>0)/4294967296};return r.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},r.int32=n.next,r.quick=r,o&&(o.X&&c(o,n),r.state=function(){return c(n,{})}),r}r&&r.exports?r.exports=l:n.amdD&&n.amdO?void 0!==(o=(function(){return l}).call(t,n,t,r))&&(r.exports=o):this.xor4096=l}(0,e=n.nmd(e),n.amdD)},2030:function(e,t,n){var o;!function(e,r,a){function i(e){var t=this;t.next=function(){var e,n,o=t.x,r=t.i;return e=o[r],e^=e>>>7,n=e^e<<24,e=o[r+1&7],n^=e^e>>>10,e=o[r+3&7],n^=e^e>>>3,e=o[r+4&7],n^=e^e<<7,e=o[r+7&7],e^=e<<13,n^=e^e<<9,o[r]=n,t.i=r+1&7,n},function(e,t){var n,o=[];if(t===(0|t))o[0]=t;else for(n=0,t=""+t;n<t.length;++n)o[7&n]=o[7&n]<<15^t.charCodeAt(n)+o[n+1&7]<<13;for(;o.length<8;)o.push(0);for(n=0;n<8&&0===o[n];++n);for(8==n?o[7]=-1:o[n],e.x=o,e.i=0,n=256;n>0;--n)e.next()}(t,e)}function c(e,t){return t.x=e.x.slice(),t.i=e.i,t}function l(e,t){null==e&&(e=+new Date);var n=new i(e),o=t&&t.state,r=function(){return(n.next()>>>0)/4294967296};return r.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},r.int32=n.next,r.quick=r,o&&(o.x&&c(o,n),r.state=function(){return c(n,{})}),r}r&&r.exports?r.exports=l:n.amdD&&n.amdO?void 0!==(o=(function(){return l}).call(t,n,t,r))&&(r.exports=o):this.xorshift7=l}(0,e=n.nmd(e),n.amdD)},801:function(e,t,n){var o;!function(e,r,a){function i(e){var t=this,n="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:n+=e;for(var o=0;o<n.length+64;o++)t.x^=0|n.charCodeAt(o),o==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function c(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function l(e,t){var n=new i(e),o=t&&t.state,r=function(){return(n.next()>>>0)/4294967296};return r.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},r.int32=n.next,r.quick=r,o&&("object"==typeof o&&c(o,n),r.state=function(){return c(n,{})}),r}r&&r.exports?r.exports=l:n.amdD&&n.amdO?void 0!==(o=(function(){return l}).call(t,n,t,r))&&(r.exports=o):this.xorwow=l}(0,e=n.nmd(e),n.amdD)},1971:function(e,t,n){var o;!function(r,a,i){var c,l=i.pow(256,6),u=i.pow(2,52),s=2*u;function d(e,t,n){var o=[],d=m(function e(t,n){var o,r=[],a=typeof t;if(n&&"object"==a)for(o in t)try{r.push(e(t[o],n-1))}catch(e){}return r.length?r:"string"==a?t:t+"\x00"}((t=!0==t?{entropy:!0}:t||{}).entropy?[e,h(a)]:null==e?function(){try{var e;return c&&(e=c.randomBytes)?e=e(256):(e=new Uint8Array(256),(r.crypto||r.msCrypto).getRandomValues(e)),h(e)}catch(e){var t=r.navigator,n=t&&t.plugins;return[+new Date,r,n,r.screen,h(a)]}}():e,3),o),_=new f(o),x=function(){for(var e=_.g(6),t=l,n=0;e<u;)e=(e+n)*256,t*=256,n=_.g(1);for(;e>=s;)e/=2,t/=2,n>>>=1;return(e+n)/t};return x.int32=function(){return 0|_.g(4)},x.quick=function(){return _.g(4)/4294967296},x.double=x,m(h(_.S),a),(t.pass||n||function(e,t,n,o){return(o&&(o.S&&p(o,_),e.state=function(){return p(_,{})}),n)?(i.random=e,t):e})(x,d,"global"in t?t.global:this==i,t.state)}function f(e){var t,n=e.length,o=this,r=0,a=o.i=o.j=0,i=o.S=[];for(n||(e=[n++]);r<256;)i[r]=r++;for(r=0;r<256;r++)i[r]=i[a=255&a+e[r%n]+(t=i[r])],i[a]=t;(o.g=function(e){for(var t,n=0,r=o.i,a=o.j,i=o.S;e--;)t=i[r=255&r+1],n=256*n+i[255&(i[r]=i[a=255&a+t])+(i[a]=t)];return o.i=r,o.j=a,n})(256)}function p(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function m(e,t){for(var n,o=e+"",r=0;r<o.length;)t[255&r]=255&(n^=19*t[255&r])+o.charCodeAt(r++);return h(t)}function h(e){return String.fromCharCode.apply(0,e)}if(m(i.random(),a),e.exports){e.exports=d;try{c=n(5042)}catch(e){}}else void 0!==(o=(function(){return d}).call(t,n,t,e))&&(e.exports=o)}("undefined"!=typeof self?self:this,[],Math)},5042:function(){}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8268)}),_N_E=e.O()}]);
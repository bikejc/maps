(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[771],{5994:function(e,t,n){e.exports=n(8033)},910:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/nj",function(){return n(7137)}])},2850:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{noSSR:function(){return noSSR},default:function(){return dynamic}});let o=n(1351),r=(n(959),o._(n(1178)));function convertModule(e){return{default:(null==e?void 0:e.default)||e}}function noSSR(e,t){return delete t.webpack,delete t.modules,e(t)}function dynamic(e,t){let n=r.default,o={loading:e=>{let{error:t,isLoading:n,pastDelay:o}=e;return null}};e instanceof Promise?o.loader=()=>e:"function"==typeof e?o.loader=e:"object"==typeof e&&(o={...o,...e}),o={...o,...t};let a=o.loader;return(o.loadableGenerated&&(o={...o,...o.loadableGenerated},delete o.loadableGenerated),"boolean"!=typeof o.ssr||o.ssr)?n({...o,loader:()=>null!=a?a().then(convertModule):Promise.resolve(convertModule(()=>null))}):(delete o.webpack,delete o.modules,noSSR(n,o))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3293:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return a}});let o=n(1351),r=o._(n(959)),a=r.default.createContext(null)},1178:function(e,t,n){"use strict";/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let o=n(1351),r=o._(n(959)),a=n(3293),i=[],l=[],c=!1;function load(e){let t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then(e=>(n.loading=!1,n.loaded=e,e)).catch(e=>{throw n.loading=!1,n.error=e,e}),n}let LoadableSubscription=class LoadableSubscription{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}};function Loadable(e){return function(e,t){let n=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),o=null;function init(){if(!o){let t=new LoadableSubscription(e,n);o={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return o.promise()}if(!c){let e=n.webpack?n.webpack():n.modules;e&&l.push(t=>{for(let n of e)if(t.includes(n))return init()})}function LoadableComponent(e,t){!function(){init();let e=r.default.useContext(a.LoadableContext);e&&Array.isArray(n.modules)&&n.modules.forEach(t=>{e(t)})}();let i=r.default.useSyncExternalStore(o.subscribe,o.getCurrentValue,o.getCurrentValue);return r.default.useImperativeHandle(t,()=>({retry:o.retry}),[]),r.default.useMemo(()=>{var t;return i.loading||i.error?r.default.createElement(n.loading,{isLoading:i.loading,pastDelay:i.pastDelay,timedOut:i.timedOut,error:i.error,retry:o.retry}):i.loaded?r.default.createElement((t=i.loaded)&&t.default?t.default:t,e):null},[e,i])}return LoadableComponent.preload=()=>init(),LoadableComponent.displayName="LoadableComponent",r.default.forwardRef(LoadableComponent)}(load,e)}function flushInitializers(e,t){let n=[];for(;e.length;){let o=e.pop();n.push(o(t))}return Promise.all(n).then(()=>{if(e.length)return flushInitializers(e,t)})}Loadable.preloadAll=()=>new Promise((e,t)=>{flushInitializers(i).then(e,t)}),Loadable.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let res=()=>(c=!0,t());flushInitializers(l,e).then(res,res)})),window.__NEXT_PRELOADREADY=Loadable.preloadReady;let s=Loadable},4993:function(e,t,n){"use strict";var o=n(152),r=n.n(o);let a=r()(()=>Promise.all([n.e(48),n.e(71)]).then(n.bind(n,3071)),{loadableGenerated:{webpack:()=>[3071]},ssr:!1});t.Z=a},8935:function(e,t,n){"use strict";n.d(t,{Hv:function(){return r},Ls:function(){return o},MAPS:function(){return i},Wl:function(){return c},oJ:function(){return s},yj:function(){return l},zQ:function(){return a}});let o={A:{color:"#ff0000",councillor:"Denise Ridley"},B:{color:"#ff8800",councillor:"Mira Prinz-Arey"},C:{color:"#ffff00",councillor:"Rich Boggiano"},D:{color:"#00ff00",councillor:"Yousef Saleh"},E:{color:"#0000ff",councillor:"James Solomon"},F:{color:"#ff00ff",councillor:"Frank Gilmore"}},r={"PROTECTED BIKE LANE":{color:"#26de3b"},"PLANNED PROTECTED BIKE LANE":{color:"#b122e0"},"SHARED USE LANE":{color:"#FFFF00"},"SHARED USE PATH":{color:"#00FFFF"}},a={"NEIGHBORHOOD GREENWAY":{color:"lightblue"},"BIKE LANE":{color:"lightorange"},"PROTECTED BIKE LANE":{color:"lightgreen"},"SHARED USE LANE":{color:"lightred"},"SHARED USE PATH":{color:"lightyellow"}},i={openstreetmap:{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:"&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"},alidade_smooth_dark:{url:"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",attribution:'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}},l={wards:"wards.json",roads:"Roads_Jersey_City.json",lur:"light-up-route-20220708.gpx",citibike:"JC_Citi_Bike_Locations.json",HIN:"Vision_Zero_Traffic_Calming_Projects_WFL1/Merged_HIN.json",counties:"County_Boundaries_of_NJ.geojson",county2:"County_Boundaries_of_NJ_2x.geojson",county5:"County_Boundaries_of_NJ_5x.geojson",county10:"County_Boundaries_of_NJ_10x.geojson",bmp:"Proposed Full Network.geojson"},c=[{label:"Bike Lanes",key:"bikeLanes"},{label:"Roads",key:"roads"},{label:"Wards",key:"wards"},{label:"Citi Bike Docks",key:"citibike"},{label:"High Injury Network",key:"HIN"},{label:"Counties",key:"counties"},{label:"Counties/2",key:"county2"},{label:"Counties/5",key:"county5"},{label:"Counties/10",key:"county10"},{label:"Bike Master Plan",key:"bmp"}],s=["wards","counties","county2","county5","county10","roads","HIN","bmp","bikeLanes","citibike"]},7137:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Home}});var o=n(1527),r=n(5994),a=n.n(r),i=n(3764),l=n.n(i),c=n(8686),s=n.n(c),u=n(8116),d=n.n(u),p=n(4993),f=n(4447),m=n.n(f),h=n(959),y=n(8935),g=n(2017),x=n(513);let _={lat:40.1067,lng:-74.9362};function Home(e){let{}=e,[t,{add:n,remove:r}]=(0,g.$)(["county10"]),i=Array.from(t).map(e=>[y.oJ.indexOf(e),e]).sort((e,t)=>{let[n]=e,[o]=t;return n-o}).map(e=>{let[t,n]=e;return n}),c={ll:(0,x.GS)(_,3),z:(0,x.yc)(9)},{ll:[{lat:u,lng:f},b],z:[v,j]}=(0,x.O5)({params:c}),[w,k]=(0,h.useReducer)((e,t)=>{let[n,o]=t;if(n in e)return o[n]?(console.warn("fetchLayers: duplicate add ".concat(n)),e):(console.log("fetchLayers: updating ".concat(n," (").concat(o.length," elems)")),Object.fromEntries(Object.entries(e).map(e=>{let[t,r]=e;return t===n?[t,o]:[t,r]})));{console.log("fetchLayers: setting ".concat(n,": ").concat(o));let t={...e};return t[n]=o,t}},[]),C=(0,h.useMemo)(()=>Object.fromEntries(i.filter(e=>e in w&&w[e]).map((e,t)=>[e,t])),[w,i]),[S,E]=(0,h.useState)(!1),[O,P]=(0,h.useState)(!1),L=window.location.href,{publicRuntimeConfig:N={}}=a()(),{basePath:A=""}=N;return(0,h.useEffect)(()=>{let fetchLayer=async e=>{if(!L)return Promise.resolve();if(e in w)return w[e]?console.log("".concat(e,": already fetched")):console.log("".concat(e,": currently fetching")),Promise.resolve();k([e,null]);let t=y.yj[e],o="".concat(A,"/").concat(t);console.log("fetching layer: ".concat(e));let r=await fetch(o);console.log("fetched layer: ".concat(e));let a=await r.json(),i=a.features;return console.log("layer ".concat(e,":"),i),k([e,i]),n(e),Promise.resolve()};Promise.all(i.map(fetchLayer)).catch(console.error)},[t]),(0,o.jsxs)("div",{className:m().container,children:[(0,o.jsxs)(l(),{children:[(0,o.jsx)("title",{children:""}),(0,o.jsx)("link",{rel:"icon",href:"./favicon.ico"}),(0,o.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),(0,o.jsx)("meta",{name:"twitter:card",content:"summary"},"twcard"),(0,o.jsx)("meta",{name:"twitter:creator",content:"RunsAsCoded"},"twhandle"),(0,o.jsx)("meta",{property:"og:url",content:"https://map.bikejc.org"},"ogurl"),(0,o.jsx)("meta",{property:"og:type",content:"website"}),(0,o.jsx)("meta",{property:"og:image",content:"https://map.bikejc.org/screenshots/pbls.png"},"ogimage"),(0,o.jsx)("meta",{property:"og:site_name",content:"New Jersey County Map"},"ogsitename"),(0,o.jsx)("meta",{property:"og:title",content:"New Jersey County Map"},"ogtitle"),(0,o.jsx)("meta",{property:"og:description",content:"County boundaries in NJ state"},"ogdesc")]}),(0,o.jsx)("main",{className:m().main,children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(p.Z,{className:m().homeMap,center:{lat:u,lng:f},zoom:v,zoomControl:!0,zoomDelta:.5,zoomSnap:.5,children:e=>(function(e){let{useMapEvents:t,TileLayer:n,Polygon:r,Tooltip:a,activeLayerIndices:i,fetchedLayers:l,activeLayers:c,setLL:s,setZoom:u}=e,p=t({move:()=>s(p.getCenter(),"replaceIn"),zoom:()=>u(p.getZoom(),"replaceIn")}),countiesLayer=e=>{var t;d()(4,{global:!0});let n=i[e];return null===(t=l[e])||void 0===t?void 0:t.map(t=>{let{properties:i,geometry:l}=t,{COUNTY:c,COUNTY_LABEL:s,POP2010:u,POPDEN2010:d}=i,{type:p,coordinates:f}=l,m=function(){let[e,t,n]=[0,1,2].map(()=>parseInt(256*Math.random()).toString(16)).map(e=>e.length<2?"0".concat(e):e);return"#".concat(e).concat(t).concat(n)}();function Poly(e){let{key:t,positions:n}=e;return(0,o.jsx)(h.Fragment,{children:(0,o.jsx)(r,{style:{zIndex:1},weight:1,color:"black",fillColor:m,positions:n,fillOpacity:.4,children:(0,o.jsxs)(a,{sticky:!0,children:[(0,o.jsx)("span",{children:s},"county"),(0,o.jsx)("br",{},"br"),(0,o.jsxs)("span",{children:["2010 population: ",u.toLocaleString()," (",d.toLocaleString(),"/mi\xb2)"]},"population")]})},t)},t)}return"MultiPolygon"===p?f.map((e,t)=>e.map((e,o)=>{let r=e.map(e=>{let[t,n]=e;return[n,t]}),a="county-".concat(c,"_coords").concat(t,"_polygon").concat(o,"_rank").concat(n);return Poly({key:a,positions:r})})):"Polygon"===p?f.map((t,o)=>{let r=t.map(e=>{let[t,n]=e;return[n,t]}),a="".concat(e,"-").concat(c,"_polygon").concat(o,"_rank").concat(n);return Poly({key:a,positions:r})}):(console.warn("County ".concat(c,": unexpected geometry type ").concat(p)),null)})},{url:f,attribution:m}=y.MAPS.alidade_smooth_dark;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{url:f,attribution:m}),"counties"in l&&c.includes("counties")&&countiesLayer("counties"),"county2"in l&&c.includes("county2")&&countiesLayer("county2"),"county5"in l&&c.includes("county5")&&countiesLayer("county5"),"county10"in l&&c.includes("county10")&&countiesLayer("county10")]})})({...e,activeLayerIndices:C,fetchedLayers:w,activeLayers:i,setLL:b,setZoom:j})}),(0,o.jsx)("div",{className:m().title,children:""}),(0,o.jsx)("div",{className:s().gearContainer,onMouseEnter:()=>P(!0),onMouseLeave:()=>P(!1),children:(0,o.jsxs)("div",{className:s().settings,children:[(0,o.jsx)("i",{className:"fa fa-gear ".concat(s().gear),onClick:()=>E(!S)}),(S||O)&&(0,o.jsxs)("div",{className:s().menu,children:[(0,o.jsx)("ul",{className:s().layers,children:y.Wl.map(e=>{let{label:t,key:a}=e,l=i.includes(a);return(0,o.jsx)("li",{children:(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"checkbox",onChange:function(e){let t=e.target.checked;t===l&&console.error("layer ".concat(a,": checked ").concat(t," != active ").concat(l)),t?n(a):r(a)},checked:l}),t]})},a)})}),(0,o.jsxs)("div",{className:s().icons,children:[(0,o.jsx)("a",{href:"https://github.com/bikejc/maps",children:(0,o.jsx)("img",{alt:"GitHub logo",className:s().icon,src:"./gh.png"})}),(0,o.jsx)("a",{href:"https://bikejc.org",children:(0,o.jsx)("img",{alt:"Bike JC logo",className:s().icon,src:"./logo.png"})})]})]})]})})]})})]})}},513:function(e,t,n){"use strict";n.d(t,{GS:function(){return llParam},O5:function(){return parseQueryParams},W$:function(){return enumMultiParam},yc:function(){return floatParam},z1:function(){return i}});var o=n(4215),r=n(959),a=n(2017);let i=/[^?#]+/u;function llParam(e,t){return{encode:n=>{let{lat:o,lng:r}=n;return o===e.lat&&r===e.lng?void 0:t?"".concat(o.toFixed(t),"_").concat(r.toFixed(t)):"".concat(o,"_").concat(r)},decode:t=>{if(!t)return e;let[n,o]=t.split("_").map(parseFloat);return{lat:n,lng:o}}}}function floatParam(e){return{encode:t=>t===e?void 0:t.toString(),decode:t=>t?parseFloat(t):e}}function enumMultiParam(e){let t,{init:n,allValues:o,mapper:r,delim:i}=e;function verify(e){return Array.from(e).filter(e=>!!o.includes(e)||(console.warn("Invalid value: ".concat(e," not in ").concat(o)),!1))}i=void 0===i?"_":i,r&&(t=Object.fromEntries(Object.entries(r).map(e=>{let[t,n]=e;return[n,t]})));let encode=e=>(e=verify(e),r&&(e=e.map(e=>r[e])),e.join(i)),l=encode(n);return{encode:e=>{let t=encode(e);if(t!==l)return t},decode:e=>{if(!e&&""!==e)return n;let o=e.split(i);return t&&(o=o.filter(e=>e in t||(console.warn("Unrecognized value: ".concat(e," not in ").concat(Object.keys(t).join(","))),!1)).map(e=>t[e])),o=verify(o)},use:a.$}}function parseQueryParams(e){let{params:t}=e,n=(0,o.useRouter)(),a=n.asPath.replace(i,""),l=Object.fromEntries(new URLSearchParams(a).entries()),c=Object.fromEntries(Object.entries(t).map(e=>{let[t,n]=e,[o,a]=(n.use||r.useState)(n.decode(l[t]));return[t,{val:o,set:a,param:n}]})),s=Object.values(c).map(e=>{let{val:t}=e;return t}),u=n.asPath.match(i),d=u?u[0]:n.asPath;return(0,r.useEffect)(()=>{let e={};Object.entries(c).map(t=>{let[n,{val:o,param:r}]=t,a=r.encode(o);void 0!==a&&(e[n]=a)});let t=new URLSearchParams(e).toString();n.replace({pathname:n.pathname,hash:"",search:t},{pathname:d,hash:"",search:t},{shallow:!0,scroll:!1})},[...s,d]),Object.fromEntries(Object.entries(c).map(e=>{let[t,{val:n,set:o}]=e;return[t,[n,o]]}))}},2017:function(e,t,n){"use strict";n.d(t,{$:function(){return useSet}});var o=n(959);let useSet=e=>{let[t,n]=(0,o.useState)(new Set(e)),r=(0,o.useMemo)(()=>({add:e=>n(t=>(console.log("prevSet:",t),new Set([...t,e]))),remove:e=>n(t=>new Set([...t].filter(t=>t!==e))),clear:()=>n(new Set)}),[n]);return[t,r]}},4447:function(e){e.exports={container:"Home_container__d256j",main:"Home_main__VkIEL",footer:"Home_footer__yFiaX",title:"Home_title__hYX6j",description:"Home_description__uXNdx",code:"Home_code__VVrIr",grid:"Home_grid__AVljO",card:"Home_card__E5spL",logo:"Home_logo__IOQAX",homeMap:"Home_homeMap___bL1q"}},8686:function(e){e.exports={gearContainer:"index_gearContainer__ulsne",gear:"index_gear__gPxB6",settings:"index_settings__OvHyN",menu:"index_menu__CCGxo",layers:"index_layers__WU_5m",icons:"index_icons__SvAZO",icon:"index_icon__6tE9W"}},152:function(e,t,n){e.exports=n(2850)},3764:function(e,t,n){e.exports=n(1107)},4215:function(e,t,n){e.exports=n(792)},8116:function(e,t,n){var o=n(5082),r=n(7557),a=n(2262),i=n(2095),l=n(431),c=n(7131),s=n(7701);s.alea=o,s.xor128=r,s.xorwow=a,s.xorshift7=i,s.xor4096=l,s.tychei=c,e.exports=s},5082:function(e,t,n){var o;!function(e,r,a){function Alea(e){var t,n=this,o=(t=4022871197,function(e){e=String(e);for(var n=0;n<e.length;n++){var o=.02519603282416938*(t+=e.charCodeAt(n));t=o>>>0,o-=t,o*=t,t=o>>>0,o-=t,t+=4294967296*o}return(t>>>0)*23283064365386963e-26});n.next=function(){var e=2091639*n.s0+23283064365386963e-26*n.c;return n.s0=n.s1,n.s1=n.s2,n.s2=e-(n.c=0|e)},n.c=1,n.s0=o(" "),n.s1=o(" "),n.s2=o(" "),n.s0-=o(e),n.s0<0&&(n.s0+=1),n.s1-=o(e),n.s1<0&&(n.s1+=1),n.s2-=o(e),n.s2<0&&(n.s2+=1)}function copy(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function impl(e,t){var n=new Alea(e),o=t&&t.state,r=n.next;return r.int32=function(){return 4294967296*n.next()|0},r.double=function(){return r()+(2097152*r()|0)*11102230246251565e-32},r.quick=r,o&&("object"==typeof o&&copy(o,n),r.state=function(){return copy(n,{})}),r}r&&r.exports?r.exports=impl:n.amdD&&n.amdO?void 0!==(o=(function(){return impl}).call(t,n,t,r))&&(r.exports=o):this.alea=impl}(0,e=n.nmd(e),n.amdD)},7131:function(e,t,n){var o;!function(e,r,a){function XorGen(e){var t=this,n="";t.next=function(){var e=t.b,n=t.c,o=t.d,r=t.a;return e=e<<25^e>>>7^n,n=n-o|0,o=o<<24^o>>>8^r,r=r-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-o|0,t.d=o<<16^n>>>16^r,t.a=r-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):n+=e;for(var o=0;o<n.length+20;o++)t.b^=0|n.charCodeAt(o),t.next()}function copy(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function impl(e,t){var n=new XorGen(e),o=t&&t.state,prng=function(){return(n.next()>>>0)/4294967296};return prng.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=n.next,prng.quick=prng,o&&("object"==typeof o&&copy(o,n),prng.state=function(){return copy(n,{})}),prng}r&&r.exports?r.exports=impl:n.amdD&&n.amdO?void 0!==(o=(function(){return impl}).call(t,n,t,r))&&(r.exports=o):this.tychei=impl}(0,e=n.nmd(e),n.amdD)},7557:function(e,t,n){var o;!function(e,r,a){function XorGen(e){var t=this,n="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:n+=e;for(var o=0;o<n.length+64;o++)t.x^=0|n.charCodeAt(o),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function impl(e,t){var n=new XorGen(e),o=t&&t.state,prng=function(){return(n.next()>>>0)/4294967296};return prng.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=n.next,prng.quick=prng,o&&("object"==typeof o&&copy(o,n),prng.state=function(){return copy(n,{})}),prng}r&&r.exports?r.exports=impl:n.amdD&&n.amdO?void 0!==(o=(function(){return impl}).call(t,n,t,r))&&(r.exports=o):this.xor128=impl}(0,e=n.nmd(e),n.amdD)},431:function(e,t,n){var o;!function(e,r,a){function XorGen(e){var t=this;t.next=function(){var e,n,o=t.w,r=t.X,a=t.i;return t.w=o=o+1640531527|0,n=r[a+34&127],e=r[a=a+1&127],n^=n<<13,e^=e<<17,n^=n>>>15,e^=e>>>12,n=r[a]=n^e,t.i=a,n+(o^o>>>16)|0},function(e,t){var n,o,r,a,i,l=[],c=128;for(t===(0|t)?(o=t,t=null):(t+="\x00",o=0,c=Math.max(c,t.length)),r=0,a=-32;a<c;++a)t&&(o^=t.charCodeAt((a+32)%t.length)),0===a&&(i=o),o^=o<<10,o^=o>>>15,o^=o<<4,o^=o>>>13,a>=0&&(i=i+1640531527|0,r=0==(n=l[127&a]^=o+i)?r+1:0);for(r>=128&&(l[127&(t&&t.length||0)]=-1),r=127,a=512;a>0;--a)o=l[r+34&127],n=l[r=r+1&127],o^=o<<13,n^=n<<17,o^=o>>>15,n^=n>>>12,l[r]=o^n;e.w=i,e.X=l,e.i=r}(t,e)}function copy(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function impl(e,t){null==e&&(e=+new Date);var n=new XorGen(e),o=t&&t.state,prng=function(){return(n.next()>>>0)/4294967296};return prng.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=n.next,prng.quick=prng,o&&(o.X&&copy(o,n),prng.state=function(){return copy(n,{})}),prng}r&&r.exports?r.exports=impl:n.amdD&&n.amdO?void 0!==(o=(function(){return impl}).call(t,n,t,r))&&(r.exports=o):this.xor4096=impl}(0,e=n.nmd(e),n.amdD)},2095:function(e,t,n){var o;!function(e,r,a){function XorGen(e){var t=this;t.next=function(){var e,n,o=t.x,r=t.i;return e=o[r],e^=e>>>7,n=e^e<<24^((e=o[r+1&7])^e>>>10)^((e=o[r+3&7])^e>>>3)^((e=o[r+4&7])^e<<7),e=o[r+7&7],e^=e<<13,n^=e^e<<9,o[r]=n,t.i=r+1&7,n},function(e,t){var n,o=[];if(t===(0|t))o[0]=t;else for(n=0,t=""+t;n<t.length;++n)o[7&n]=o[7&n]<<15^t.charCodeAt(n)+o[n+1&7]<<13;for(;o.length<8;)o.push(0);for(n=0;n<8&&0===o[n];++n);for(8==n?o[7]=-1:o[n],e.x=o,e.i=0,n=256;n>0;--n)e.next()}(t,e)}function copy(e,t){return t.x=e.x.slice(),t.i=e.i,t}function impl(e,t){null==e&&(e=+new Date);var n=new XorGen(e),o=t&&t.state,prng=function(){return(n.next()>>>0)/4294967296};return prng.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=n.next,prng.quick=prng,o&&(o.x&&copy(o,n),prng.state=function(){return copy(n,{})}),prng}r&&r.exports?r.exports=impl:n.amdD&&n.amdO?void 0!==(o=(function(){return impl}).call(t,n,t,r))&&(r.exports=o):this.xorshift7=impl}(0,e=n.nmd(e),n.amdD)},2262:function(e,t,n){var o;!function(e,r,a){function XorGen(e){var t=this,n="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^(e^e<<1))|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:n+=e;for(var o=0;o<n.length+64;o++)t.x^=0|n.charCodeAt(o),o==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function copy(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function impl(e,t){var n=new XorGen(e),o=t&&t.state,prng=function(){return(n.next()>>>0)/4294967296};return prng.double=function(){do var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/2097152;while(0===e);return e},prng.int32=n.next,prng.quick=prng,o&&("object"==typeof o&&copy(o,n),prng.state=function(){return copy(n,{})}),prng}r&&r.exports?r.exports=impl:n.amdD&&n.amdO?void 0!==(o=(function(){return impl}).call(t,n,t,r))&&(r.exports=o):this.xorwow=impl}(0,e=n.nmd(e),n.amdD)},7701:function(e,t,n){var o;!function(r,a,i){var l,c=i.pow(256,6),s=i.pow(2,52),u=2*s;function seedrandom(e,t,n){var o=[],d=mixkey(function flatten(e,t){var n,o=[],r=typeof e;if(t&&"object"==r)for(n in e)try{o.push(flatten(e[n],t-1))}catch(e){}return o.length?o:"string"==r?e:e+"\x00"}((t=!0==t?{entropy:!0}:t||{}).entropy?[e,tostring(a)]:null==e?function(){try{var e;return l&&(e=l.randomBytes)?e=e(256):(e=new Uint8Array(256),(r.crypto||r.msCrypto).getRandomValues(e)),tostring(e)}catch(e){var t=r.navigator,n=t&&t.plugins;return[+new Date,r,n,r.screen,tostring(a)]}}():e,3),o),p=new ARC4(o),prng=function(){for(var e=p.g(6),t=c,n=0;e<s;)e=(e+n)*256,t*=256,n=p.g(1);for(;e>=u;)e/=2,t/=2,n>>>=1;return(e+n)/t};return prng.int32=function(){return 0|p.g(4)},prng.quick=function(){return p.g(4)/4294967296},prng.double=prng,mixkey(tostring(p.S),a),(t.pass||n||function(e,t,n,o){return(o&&(o.S&&copy(o,p),e.state=function(){return copy(p,{})}),n)?(i.random=e,t):e})(prng,d,"global"in t?t.global:this==i,t.state)}function ARC4(e){var t,n=e.length,o=this,r=0,a=o.i=o.j=0,i=o.S=[];for(n||(e=[n++]);r<256;)i[r]=r++;for(r=0;r<256;r++)i[r]=i[a=255&a+e[r%n]+(t=i[r])],i[a]=t;(o.g=function(e){for(var t,n=0,r=o.i,a=o.j,i=o.S;e--;)t=i[r=255&r+1],n=256*n+i[255&(i[r]=i[a=255&a+t])+(i[a]=t)];return o.i=r,o.j=a,n})(256)}function copy(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function mixkey(e,t){for(var n,o=e+"",r=0;r<o.length;)t[255&r]=255&(n^=19*t[255&r])+o.charCodeAt(r++);return tostring(t)}function tostring(e){return String.fromCharCode.apply(0,e)}if(mixkey(i.random(),a),e.exports){e.exports=seedrandom;try{l=n(1440)}catch(e){}}else void 0!==(o=(function(){return seedrandom}).call(t,n,t,e))&&(e.exports=o)}("undefined"!=typeof self?self:this,[],Math)},1440:function(){}},function(e){e.O(0,[774,888,179],function(){return e(e.s=910)}),_N_E=e.O()}]);
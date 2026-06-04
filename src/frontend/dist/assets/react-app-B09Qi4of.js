import{j as s,c as _f,T as ou,I as vf,P as yf,C as lu,V as bf,L as cu,a as du,b as Sf,d as wf,S as uu,R as Ef,e as Mf,O as hu,f as Tf,g as fu,h as Af,i as pu,D as mu,k as Rf,l as Cf}from"./ui-D8cBtQlD.js";import{e as Nf,g as gu,a as V,c as Pf,L as mt,u as oa,R as Hr,f as la,h as Lf,B as jf,i as Df,j as Et,N as pn}from"./router-DO4-FiBH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();var Qr={},Cl;function If(){if(Cl)return Qr;Cl=1;var n=Nf();return Qr.createRoot=n.createRoot,Qr.hydrateRoot=n.hydrateRoot,Qr}var Uf=If();const Of=gu(Uf),Pn=Object.create(null);Pn.open="0";Pn.close="1";Pn.ping="2";Pn.pong="3";Pn.message="4";Pn.upgrade="5";Pn.noop="6";const Os=Object.create(null);Object.keys(Pn).forEach(n=>{Os[Pn[n]]=n});const Eo={type:"error",data:"parser error"},xu=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",_u=typeof ArrayBuffer=="function",vu=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,Jo=({type:n,data:e},t,i)=>xu&&e instanceof Blob?t?i(e):Nl(e,i):_u&&(e instanceof ArrayBuffer||vu(e))?t?i(e):Nl(new Blob([e]),i):i(Pn[n]+(e||"")),Nl=(n,e)=>{const t=new FileReader;return t.onload=function(){const i=t.result.split(",")[1];e("b"+(i||""))},t.readAsDataURL(n)};function Pl(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let Ta;function Ff(n,e){if(xu&&n.data instanceof Blob)return n.data.arrayBuffer().then(Pl).then(e);if(_u&&(n.data instanceof ArrayBuffer||vu(n.data)))return e(Pl(n.data));Jo(n,!1,t=>{Ta||(Ta=new TextEncoder),e(Ta.encode(t))})}const Ll="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Nr=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<Ll.length;n++)Nr[Ll.charCodeAt(n)]=n;const kf=n=>{let e=n.length*.75,t=n.length,i,r=0,a,l,o,c;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);const d=new ArrayBuffer(e),u=new Uint8Array(d);for(i=0;i<t;i+=4)a=Nr[n.charCodeAt(i)],l=Nr[n.charCodeAt(i+1)],o=Nr[n.charCodeAt(i+2)],c=Nr[n.charCodeAt(i+3)],u[r++]=a<<2|l>>4,u[r++]=(l&15)<<4|o>>2,u[r++]=(o&3)<<6|c&63;return d},Bf=typeof ArrayBuffer=="function",Qo=(n,e)=>{if(typeof n!="string")return{type:"message",data:yu(n,e)};const t=n.charAt(0);return t==="b"?{type:"message",data:zf(n.substring(1),e)}:Os[t]?n.length>1?{type:Os[t],data:n.substring(1)}:{type:Os[t]}:Eo},zf=(n,e)=>{if(Bf){const t=kf(n);return yu(t,e)}else return{base64:!0,data:n}},yu=(n,e)=>e==="blob"?n instanceof Blob?n:new Blob([n]):n instanceof ArrayBuffer?n:n.buffer,bu="",Hf=(n,e)=>{const t=n.length,i=new Array(t);let r=0;n.forEach((a,l)=>{Jo(a,!1,o=>{i[l]=o,++r===t&&e(i.join(bu))})})},Gf=(n,e)=>{const t=n.split(bu),i=[];for(let r=0;r<t.length;r++){const a=Qo(t[r],e);if(i.push(a),a.type==="error")break}return i};function Vf(){return new TransformStream({transform(n,e){Ff(n,t=>{const i=t.length;let r;if(i<126)r=new Uint8Array(1),new DataView(r.buffer).setUint8(0,i);else if(i<65536){r=new Uint8Array(3);const a=new DataView(r.buffer);a.setUint8(0,126),a.setUint16(1,i)}else{r=new Uint8Array(9);const a=new DataView(r.buffer);a.setUint8(0,127),a.setBigUint64(1,BigInt(i))}n.data&&typeof n.data!="string"&&(r[0]|=128),e.enqueue(r),e.enqueue(t)})}})}let Aa;function es(n){return n.reduce((e,t)=>e+t.length,0)}function ts(n,e){if(n[0].length===e)return n.shift();const t=new Uint8Array(e);let i=0;for(let r=0;r<e;r++)t[r]=n[0][i++],i===n[0].length&&(n.shift(),i=0);return n.length&&i<n[0].length&&(n[0]=n[0].slice(i)),t}function Wf(n,e){Aa||(Aa=new TextDecoder);const t=[];let i=0,r=-1,a=!1;return new TransformStream({transform(l,o){for(t.push(l);;){if(i===0){if(es(t)<1)break;const c=ts(t,1);a=(c[0]&128)===128,r=c[0]&127,r<126?i=3:r===126?i=1:i=2}else if(i===1){if(es(t)<2)break;const c=ts(t,2);r=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),i=3}else if(i===2){if(es(t)<8)break;const c=ts(t,8),d=new DataView(c.buffer,c.byteOffset,c.length),u=d.getUint32(0);if(u>Math.pow(2,21)-1){o.enqueue(Eo);break}r=u*Math.pow(2,32)+d.getUint32(4),i=3}else{if(es(t)<r)break;const c=ts(t,r);o.enqueue(Qo(a?c:Aa.decode(c),e)),i=0}if(r===0||r>n){o.enqueue(Eo);break}}}})}const Su=4;function Rt(n){if(n)return Xf(n)}function Xf(n){for(var e in Rt.prototype)n[e]=Rt.prototype[e];return n}Rt.prototype.on=Rt.prototype.addEventListener=function(n,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(e),this};Rt.prototype.once=function(n,e){function t(){this.off(n,t),e.apply(this,arguments)}return t.fn=e,this.on(n,t),this};Rt.prototype.off=Rt.prototype.removeListener=Rt.prototype.removeAllListeners=Rt.prototype.removeEventListener=function(n,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+n];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var i,r=0;r<t.length;r++)if(i=t[r],i===e||i.fn===e){t.splice(r,1);break}return t.length===0&&delete this._callbacks["$"+n],this};Rt.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+n],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if(t){t=t.slice(0);for(var i=0,r=t.length;i<r;++i)t[i].apply(this,e)}return this};Rt.prototype.emitReserved=Rt.prototype.emit;Rt.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};Rt.prototype.hasListeners=function(n){return!!this.listeners(n).length};const ca=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),cn=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),qf="arraybuffer";function wu(n,...e){return e.reduce((t,i)=>(n.hasOwnProperty(i)&&(t[i]=n[i]),t),{})}const $f=cn.setTimeout,Yf=cn.clearTimeout;function da(n,e){e.useNativeTimers?(n.setTimeoutFn=$f.bind(cn),n.clearTimeoutFn=Yf.bind(cn)):(n.setTimeoutFn=cn.setTimeout.bind(cn),n.clearTimeoutFn=cn.clearTimeout.bind(cn))}const Kf=1.33;function Zf(n){return typeof n=="string"?Jf(n):Math.ceil((n.byteLength||n.size)*Kf)}function Jf(n){let e=0,t=0;for(let i=0,r=n.length;i<r;i++)e=n.charCodeAt(i),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(i++,t+=4);return t}function Eu(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function Qf(n){let e="";for(let t in n)n.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(n[t]));return e}function ep(n){let e={},t=n.split("&");for(let i=0,r=t.length;i<r;i++){let a=t[i].split("=");e[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}return e}class tp extends Error{constructor(e,t,i){super(e),this.description=t,this.context=i,this.type="TransportError"}}class el extends Rt{constructor(e){super(),this.writable=!1,da(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,i){return super.emitReserved("error",new tp(e,t,i)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=Qo(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=Qf(e);return t.length?"?"+t:""}}class np extends el{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let i=0;this._polling&&(i++,this.once("pollComplete",function(){--i||t()})),this.writable||(i++,this.once("drain",function(){--i||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=i=>{if(this.readyState==="opening"&&i.type==="open"&&this.onOpen(),i.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(i)};Gf(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,Hf(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=Eu()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let Mu=!1;try{Mu=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const ip=Mu;function rp(){}class sp extends np{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let i=location.port;i||(i=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||i!==e.port}}doWrite(e,t){const i=this.request({method:"POST",data:e});i.on("success",t),i.on("error",(r,a)=>{this.onError("xhr post error",r,a)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,i)=>{this.onError("xhr poll error",t,i)}),this.pollXhr=e}}class Cn extends Rt{constructor(e,t,i){super(),this.createRequest=e,da(this,i),this._opts=i,this._method=i.method||"GET",this._uri=t,this._data=i.data!==void 0?i.data:null,this._create()}_create(){var e;const t=wu(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const i=this._xhr=this.createRequest(t);try{i.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){i.setDisableHeaderCheck&&i.setDisableHeaderCheck(!0);for(let r in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(r)&&i.setRequestHeader(r,this._opts.extraHeaders[r])}}catch{}if(this._method==="POST")try{i.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{i.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(i),"withCredentials"in i&&(i.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(i.timeout=this._opts.requestTimeout),i.onreadystatechange=()=>{var r;i.readyState===3&&((r=this._opts.cookieJar)===null||r===void 0||r.parseCookies(i.getResponseHeader("set-cookie"))),i.readyState===4&&(i.status===200||i.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof i.status=="number"?i.status:0)},0))},i.send(this._data)}catch(r){this.setTimeoutFn(()=>{this._onError(r)},0);return}typeof document<"u"&&(this._index=Cn.requestsCount++,Cn.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=rp,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete Cn.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}Cn.requestsCount=0;Cn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",jl);else if(typeof addEventListener=="function"){const n="onpagehide"in cn?"pagehide":"unload";addEventListener(n,jl,!1)}}function jl(){for(let n in Cn.requests)Cn.requests.hasOwnProperty(n)&&Cn.requests[n].abort()}const ap=(function(){const n=Tu({xdomain:!1});return n&&n.responseType!==null})();class op extends sp{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=ap&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new Cn(Tu,this.uri(),e)}}function Tu(n){const e=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||ip))return new XMLHttpRequest}catch{}if(!e)try{return new cn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Au=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class lp extends el{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,i=Au?{}:wu(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(i.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,i)}catch(r){return this.emitReserved("error",r)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],r=t===e.length-1;Jo(i,this.supportsBinary,a=>{try{this.doWrite(i,a)}catch{}r&&ca(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=Eu()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const Ra=cn.WebSocket||cn.MozWebSocket;class cp extends lp{createSocket(e,t,i){return Au?new Ra(e,t,i):t?new Ra(e,t):new Ra(e)}doWrite(e,t){this.ws.send(t)}}class dp extends el{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=Wf(Number.MAX_SAFE_INTEGER,this.socket.binaryType),i=e.readable.pipeThrough(t).getReader(),r=Vf();r.readable.pipeTo(e.writable),this._writer=r.writable.getWriter();const a=()=>{i.read().then(({done:o,value:c})=>{o||(this.onPacket(c),a())}).catch(o=>{})};a();const l={type:"open"};this.query.sid&&(l.data=`{"sid":"${this.query.sid}"}`),this._writer.write(l).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],r=t===e.length-1;this._writer.write(i).then(()=>{r&&ca(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const up={websocket:cp,webtransport:dp,polling:op},hp=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,fp=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Mo(n){if(n.length>8e3)throw"URI too long";const e=n,t=n.indexOf("["),i=n.indexOf("]");t!=-1&&i!=-1&&(n=n.substring(0,t)+n.substring(t,i).replace(/:/g,";")+n.substring(i,n.length));let r=hp.exec(n||""),a={},l=14;for(;l--;)a[fp[l]]=r[l]||"";return t!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=pp(a,a.path),a.queryKey=mp(a,a.query),a}function pp(n,e){const t=/\/{2,9}/g,i=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&i.splice(0,1),e.slice(-1)=="/"&&i.splice(i.length-1,1),i}function mp(n,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(i,r,a){r&&(t[r]=a)}),t}const To=typeof addEventListener=="function"&&typeof removeEventListener=="function",Fs=[];To&&addEventListener("offline",()=>{Fs.forEach(n=>n())},!1);class ti extends Rt{constructor(e,t){if(super(),this.binaryType=qf,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const i=Mo(e);t.hostname=i.host,t.secure=i.protocol==="https"||i.protocol==="wss",t.port=i.port,i.query&&(t.query=i.query)}else t.host&&(t.hostname=Mo(t.host).host);da(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(i=>{const r=i.prototype.name;this.transports.push(r),this._transportsByName[r]=i}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=ep(this.opts.query)),To&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Fs.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=Su,t.transport=e,this.id&&(t.sid=this.id);const i=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](i)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&ti.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}onOpen(){this.readyState="open",ti.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let i=0;i<this.writeBuffer.length;i++){const r=this.writeBuffer[i].data;if(r&&(t+=Zf(r)),i>0&&t>this._maxPayload)return this.writeBuffer.slice(0,i);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,ca(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,i){return this._sendPacket("message",e,t,i),this}send(e,t,i){return this._sendPacket("message",e,t,i),this}_sendPacket(e,t,i,r){if(typeof t=="function"&&(r=t,t=void 0),typeof i=="function"&&(r=i,i=null),this.readyState==="closing"||this.readyState==="closed")return;i=i||{},i.compress=i.compress!==!1;const a={type:e,data:t,options:i};this.emitReserved("packetCreate",a),this.writeBuffer.push(a),r&&this.once("flush",r),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},i=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?i():e()}):this.upgrading?i():e()),this}_onError(e){if(ti.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),To&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const i=Fs.indexOf(this._offlineEventListener);i!==-1&&Fs.splice(i,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}ti.protocol=Su;class gp extends ti{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),i=!1;ti.priorWebsocketSuccess=!1;const r=()=>{i||(t.send([{type:"ping",data:"probe"}]),t.once("packet",f=>{if(!i)if(f.type==="pong"&&f.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;ti.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{i||this.readyState!=="closed"&&(u(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const h=new Error("probe error");h.transport=t.name,this.emitReserved("upgradeError",h)}}))};function a(){i||(i=!0,u(),t.close(),t=null)}const l=f=>{const h=new Error("probe error: "+f);h.transport=t.name,a(),this.emitReserved("upgradeError",h)};function o(){l("transport closed")}function c(){l("socket closed")}function d(f){t&&f.name!==t.name&&a()}const u=()=>{t.removeListener("open",r),t.removeListener("error",l),t.removeListener("close",o),this.off("close",c),this.off("upgrading",d)};t.once("open",r),t.once("error",l),t.once("close",o),this.once("close",c),this.once("upgrading",d),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{i||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let i=0;i<e.length;i++)~this.transports.indexOf(e[i])&&t.push(e[i]);return t}}let xp=class extends gp{constructor(e,t={}){const i=typeof e=="object"?e:t;(!i.transports||i.transports&&typeof i.transports[0]=="string")&&(i.transports=(i.transports||["polling","websocket","webtransport"]).map(r=>up[r]).filter(r=>!!r)),super(e,i)}};function _p(n,e="",t){let i=n;t=t||typeof location<"u"&&location,n==null&&(n=t.protocol+"//"+t.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=t.protocol+n:n=t.host+n),/^(https?|wss?):\/\//.test(n)||(typeof t<"u"?n=t.protocol+"//"+n:n="https://"+n),i=Mo(n)),i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443")),i.path=i.path||"/";const a=i.host.indexOf(":")!==-1?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+a+":"+i.port+e,i.href=i.protocol+"://"+a+(t&&t.port===i.port?"":":"+i.port),i}const vp=typeof ArrayBuffer=="function",yp=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,Ru=Object.prototype.toString,bp=typeof Blob=="function"||typeof Blob<"u"&&Ru.call(Blob)==="[object BlobConstructor]",Sp=typeof File=="function"||typeof File<"u"&&Ru.call(File)==="[object FileConstructor]";function tl(n){return vp&&(n instanceof ArrayBuffer||yp(n))||bp&&n instanceof Blob||Sp&&n instanceof File}function ks(n,e){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let t=0,i=n.length;t<i;t++)if(ks(n[t]))return!0;return!1}if(tl(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return ks(n.toJSON(),!0);for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&ks(n[t]))return!0;return!1}function wp(n){const e=[],t=n.data,i=n;return i.data=Ao(t,e),i.attachments=e.length,{packet:i,buffers:e}}function Ao(n,e){if(!n)return n;if(tl(n)){const t={_placeholder:!0,num:e.length};return e.push(n),t}else if(Array.isArray(n)){const t=new Array(n.length);for(let i=0;i<n.length;i++)t[i]=Ao(n[i],e);return t}else if(typeof n=="object"&&!(n instanceof Date)){const t={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=Ao(n[i],e));return t}return n}function Ep(n,e){return n.data=Ro(n.data,e),delete n.attachments,n}function Ro(n,e){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<e.length)return e[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let t=0;t<n.length;t++)n[t]=Ro(n[t],e);else if(typeof n=="object")for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&(n[t]=Ro(n[t],e));return n}const Mp=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var at;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(at||(at={}));class Tp{constructor(e){this.replacer=e}encode(e){return(e.type===at.EVENT||e.type===at.ACK)&&ks(e)?this.encodeAsBinary({type:e.type===at.EVENT?at.BINARY_EVENT:at.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===at.BINARY_EVENT||e.type===at.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=wp(e),i=this.encodeAsString(t.packet),r=t.buffers;return r.unshift(i),r}}class nl extends Rt{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const i=t.type===at.BINARY_EVENT;i||t.type===at.BINARY_ACK?(t.type=i?at.EVENT:at.ACK,this.reconstructor=new Ap(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(tl(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const i={type:Number(e.charAt(0))};if(at[i.type]===void 0)throw new Error("unknown packet type "+i.type);if(i.type===at.BINARY_EVENT||i.type===at.BINARY_ACK){const a=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const l=e.substring(a,t);if(l!=Number(l)||e.charAt(t)!=="-")throw new Error("Illegal attachments");const o=Number(l);if(!Rp(o)||o<0)throw new Error("Illegal attachments");if(o>this.opts.maxAttachments)throw new Error("too many attachments");i.attachments=o}if(e.charAt(t+1)==="/"){const a=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););i.nsp=e.substring(a,t)}else i.nsp="/";const r=e.charAt(t+1);if(r!==""&&Number(r)==r){const a=t+1;for(;++t;){const l=e.charAt(t);if(l==null||Number(l)!=l){--t;break}if(t===e.length)break}i.id=Number(e.substring(a,t+1))}if(e.charAt(++t)){const a=this.tryParse(e.substr(t));if(nl.isPayloadValid(i.type,a))i.data=a;else throw new Error("invalid payload")}return i}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case at.CONNECT:return Dl(t);case at.DISCONNECT:return t===void 0;case at.CONNECT_ERROR:return typeof t=="string"||Dl(t);case at.EVENT:case at.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&Mp.indexOf(t[0])===-1);case at.ACK:case at.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Ap{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=Ep(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Rp=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function Dl(n){return Object.prototype.toString.call(n)==="[object Object]"}const Cp=Object.freeze(Object.defineProperty({__proto__:null,Decoder:nl,Encoder:Tp,get PacketType(){return at}},Symbol.toStringTag,{value:"Module"}));function _n(n,e,t){return n.on(e,t),function(){n.off(e,t)}}const Np=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Cu extends Rt{constructor(e,t,i){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,i&&i.auth&&(this.auth=i.auth),this._opts=Object.assign({},i),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[_n(e,"open",this.onopen.bind(this)),_n(e,"packet",this.onpacket.bind(this)),_n(e,"error",this.onerror.bind(this)),_n(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var i,r,a;if(Np.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const l={type:at.EVENT,data:t};if(l.options={},l.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const u=this.ids++,f=t.pop();this._registerAckCallback(u,f),l.id=u}const o=(r=(i=this.io.engine)===null||i===void 0?void 0:i.transport)===null||r===void 0?void 0:r.writable,c=this.connected&&!(!((a=this.io.engine)===null||a===void 0)&&a._hasPingExpired());return this.flags.volatile&&!o||(c?(this.notifyOutgoingListeners(l),this.packet(l)):this.sendBuffer.push(l)),this.flags={},this}_registerAckCallback(e,t){var i;const r=(i=this.flags.timeout)!==null&&i!==void 0?i:this._opts.ackTimeout;if(r===void 0){this.acks[e]=t;return}const a=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);t.call(this,new Error("operation has timed out"))},r),l=(...o)=>{this.io.clearTimeoutFn(a),t.apply(this,o)};l.withError=!0,this.acks[e]=l}emitWithAck(e,...t){return new Promise((i,r)=>{const a=(l,o)=>l?r(l):i(o);a.withError=!0,t.push(a),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const i={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((r,...a)=>(this._queue[0],r!==null?i.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(r)):(this._queue.shift(),t&&t(null,...a)),i.pending=!1,this._drainQueue())),this._queue.push(i),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:at.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(i=>String(i.id)===e)){const i=this.acks[e];delete this.acks[e],i.withError&&i.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case at.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case at.EVENT:case at.BINARY_EVENT:this.onevent(e);break;case at.ACK:case at.BINARY_ACK:this.onack(e);break;case at.DISCONNECT:this.ondisconnect();break;case at.CONNECT_ERROR:this.destroy();const i=new Error(e.data.message);i.data=e.data.data,this.emitReserved("connect_error",i);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const i of t)i.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let i=!1;return function(...r){i||(i=!0,t.packet({type:at.ACK,id:e,data:r}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:at.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const i of t)i.apply(this,e.data)}}}function ur(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}ur.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*n);n=(Math.floor(e*10)&1)==0?n-t:n+t}return Math.min(n,this.max)|0};ur.prototype.reset=function(){this.attempts=0};ur.prototype.setMin=function(n){this.ms=n};ur.prototype.setMax=function(n){this.max=n};ur.prototype.setJitter=function(n){this.jitter=n};class Co extends Rt{constructor(e,t){var i;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,da(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((i=t.randomizationFactor)!==null&&i!==void 0?i:.5),this.backoff=new ur({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const r=t.parser||Cp;this.encoder=new r.Encoder,this.decoder=new r.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new xp(this.uri,this.opts);const t=this.engine,i=this;this._readyState="opening",this.skipReconnect=!1;const r=_n(t,"open",function(){i.onopen(),e&&e()}),a=o=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",o),e?e(o):this.maybeReconnectOnOpen()},l=_n(t,"error",a);if(this._timeout!==!1){const o=this._timeout,c=this.setTimeoutFn(()=>{r(),a(new Error("timeout")),t.close()},o);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(r),this.subs.push(l),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(_n(e,"ping",this.onping.bind(this)),_n(e,"data",this.ondata.bind(this)),_n(e,"error",this.onerror.bind(this)),_n(e,"close",this.onclose.bind(this)),_n(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){ca(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let i=this.nsps[e];return i?this._autoConnect&&!i.active&&i.connect():(i=new Cu(this,e,t),this.nsps[e]=i),i}_destroy(e){const t=Object.keys(this.nsps);for(const i of t)if(this.nsps[i].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let i=0;i<t.length;i++)this.engine.write(t[i],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var i;this.cleanup(),(i=this.engine)===null||i===void 0||i.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const i=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=>{r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()}))},t);this.opts.autoUnref&&i.unref(),this.subs.push(()=>{this.clearTimeoutFn(i)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const gr={};function Bs(n,e){typeof n=="object"&&(e=n,n=void 0),e=e||{};const t=_p(n,e.path||"/socket.io"),i=t.source,r=t.id,a=t.path,l=gr[r]&&a in gr[r].nsps,o=e.forceNew||e["force new connection"]||e.multiplex===!1||l;let c;return o?c=new Co(i,e):(gr[r]||(gr[r]=new Co(i,e)),c=gr[r]),t.query&&!e.query&&(e.query=t.queryKey),c.socket(t.path,e)}Object.assign(Bs,{Manager:Co,Socket:Cu,io:Bs,connect:Bs});var Pp=Symbol.for("react.lazy"),$s=Pf[" use ".trim().toString()];function Lp(n){return typeof n=="object"&&n!==null&&"then"in n}function Nu(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===Pp&&"_payload"in n&&Lp(n._payload)}function jp(n){const e=Ip(n),t=V.forwardRef((i,r)=>{let{children:a,...l}=i;Nu(a)&&typeof $s=="function"&&(a=$s(a._payload));const o=V.Children.toArray(a),c=o.find(Op);if(c){const d=c.props.children,u=o.map(f=>f===c?V.Children.count(d)>1?V.Children.only(null):V.isValidElement(d)?d.props.children:null:f);return s.jsx(e,{...l,ref:r,children:V.isValidElement(d)?V.cloneElement(d,void 0,u):null})}return s.jsx(e,{...l,ref:r,children:a})});return t.displayName=`${n}.Slot`,t}var Dp=jp("Slot");function Ip(n){const e=V.forwardRef((t,i)=>{let{children:r,...a}=t;if(Nu(r)&&typeof $s=="function"&&(r=$s(r._payload)),V.isValidElement(r)){const l=kp(r),o=Fp(a,r.props);return r.type!==V.Fragment&&(o.ref=i?_f(i,l):l),V.cloneElement(r,o)}return V.Children.count(r)>1?V.Children.only(null):null});return e.displayName=`${n}.SlotClone`,e}var Up=Symbol("radix.slottable");function Op(n){return V.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===Up}function Fp(n,e){const t={...e};for(const i in e){const r=n[i],a=e[i];/^on[A-Z]/.test(i)?r&&a?t[i]=(...o)=>{const c=a(...o);return r(...o),c}:r&&(t[i]=r):i==="style"?t[i]={...r,...a}:i==="className"&&(t[i]=[r,a].filter(Boolean).join(" "))}return{...n,...t}}function kp(n){let e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get,t=e&&"isReactWarning"in e&&e.isReactWarning;return t?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get,t=e&&"isReactWarning"in e&&e.isReactWarning,t?n.props.ref:n.props.ref||n.ref)}function Pu(n){var e,t,i="";if(typeof n=="string"||typeof n=="number")i+=n;else if(typeof n=="object")if(Array.isArray(n)){var r=n.length;for(e=0;e<r;e++)n[e]&&(t=Pu(n[e]))&&(i&&(i+=" "),i+=t)}else for(t in n)n[t]&&(i&&(i+=" "),i+=t);return i}function Lu(){for(var n,e,t=0,i="",r=arguments.length;t<r;t++)(n=arguments[t])&&(e=Pu(n))&&(i&&(i+=" "),i+=e);return i}const Il=n=>typeof n=="boolean"?`${n}`:n===0?"0":n,Ul=Lu,il=(n,e)=>t=>{var i;if(e?.variants==null)return Ul(n,t?.class,t?.className);const{variants:r,defaultVariants:a}=e,l=Object.keys(r).map(d=>{const u=t?.[d],f=a?.[d];if(u===null)return null;const h=Il(u)||Il(f);return r[d][h]}),o=t&&Object.entries(t).reduce((d,u)=>{let[f,h]=u;return h===void 0||(d[f]=h),d},{}),c=e==null||(i=e.compoundVariants)===null||i===void 0?void 0:i.reduce((d,u)=>{let{class:f,className:h,...g}=u;return Object.entries(g).every(v=>{let[x,m]=v;return Array.isArray(m)?m.includes({...a,...o}[x]):{...a,...o}[x]===m})?[...d,f,h]:d},[]);return Ul(n,l,c,t?.class,t?.className)},rl="-",Bp=n=>{const e=Hp(n),{conflictingClassGroups:t,conflictingClassGroupModifiers:i}=n;return{getClassGroupId:l=>{const o=l.split(rl);return o[0]===""&&o.length!==1&&o.shift(),ju(o,e)||zp(l)},getConflictingClassGroupIds:(l,o)=>{const c=t[l]||[];return o&&i[l]?[...c,...i[l]]:c}}},ju=(n,e)=>{if(n.length===0)return e.classGroupId;const t=n[0],i=e.nextPart.get(t),r=i?ju(n.slice(1),i):void 0;if(r)return r;if(e.validators.length===0)return;const a=n.join(rl);return e.validators.find(({validator:l})=>l(a))?.classGroupId},Ol=/^\[(.+)\]$/,zp=n=>{if(Ol.test(n)){const e=Ol.exec(n)[1],t=e?.substring(0,e.indexOf(":"));if(t)return"arbitrary.."+t}},Hp=n=>{const{theme:e,prefix:t}=n,i={nextPart:new Map,validators:[]};return Vp(Object.entries(n.classGroups),t).forEach(([a,l])=>{No(l,i,a,e)}),i},No=(n,e,t,i)=>{n.forEach(r=>{if(typeof r=="string"){const a=r===""?e:Fl(e,r);a.classGroupId=t;return}if(typeof r=="function"){if(Gp(r)){No(r(i),e,t,i);return}e.validators.push({validator:r,classGroupId:t});return}Object.entries(r).forEach(([a,l])=>{No(l,Fl(e,a),t,i)})})},Fl=(n,e)=>{let t=n;return e.split(rl).forEach(i=>{t.nextPart.has(i)||t.nextPart.set(i,{nextPart:new Map,validators:[]}),t=t.nextPart.get(i)}),t},Gp=n=>n.isThemeGetter,Vp=(n,e)=>e?n.map(([t,i])=>{const r=i.map(a=>typeof a=="string"?e+a:typeof a=="object"?Object.fromEntries(Object.entries(a).map(([l,o])=>[e+l,o])):a);return[t,r]}):n,Wp=n=>{if(n<1)return{get:()=>{},set:()=>{}};let e=0,t=new Map,i=new Map;const r=(a,l)=>{t.set(a,l),e++,e>n&&(e=0,i=t,t=new Map)};return{get(a){let l=t.get(a);if(l!==void 0)return l;if((l=i.get(a))!==void 0)return r(a,l),l},set(a,l){t.has(a)?t.set(a,l):r(a,l)}}},Du="!",Xp=n=>{const{separator:e,experimentalParseClassName:t}=n,i=e.length===1,r=e[0],a=e.length,l=o=>{const c=[];let d=0,u=0,f;for(let m=0;m<o.length;m++){let p=o[m];if(d===0){if(p===r&&(i||o.slice(m,m+a)===e)){c.push(o.slice(u,m)),u=m+a;continue}if(p==="/"){f=m;continue}}p==="["?d++:p==="]"&&d--}const h=c.length===0?o:o.substring(u),g=h.startsWith(Du),v=g?h.substring(1):h,x=f&&f>u?f-u:void 0;return{modifiers:c,hasImportantModifier:g,baseClassName:v,maybePostfixModifierPosition:x}};return t?o=>t({className:o,parseClassName:l}):l},qp=n=>{if(n.length<=1)return n;const e=[];let t=[];return n.forEach(i=>{i[0]==="["?(e.push(...t.sort(),i),t=[]):t.push(i)}),e.push(...t.sort()),e},$p=n=>({cache:Wp(n.cacheSize),parseClassName:Xp(n),...Bp(n)}),Yp=/\s+/,Kp=(n,e)=>{const{parseClassName:t,getClassGroupId:i,getConflictingClassGroupIds:r}=e,a=[],l=n.trim().split(Yp);let o="";for(let c=l.length-1;c>=0;c-=1){const d=l[c],{modifiers:u,hasImportantModifier:f,baseClassName:h,maybePostfixModifierPosition:g}=t(d);let v=!!g,x=i(v?h.substring(0,g):h);if(!x){if(!v){o=d+(o.length>0?" "+o:o);continue}if(x=i(h),!x){o=d+(o.length>0?" "+o:o);continue}v=!1}const m=qp(u).join(":"),p=f?m+Du:m,y=p+x;if(a.includes(y))continue;a.push(y);const _=r(x,v);for(let E=0;E<_.length;++E){const S=_[E];a.push(p+S)}o=d+(o.length>0?" "+o:o)}return o};function Zp(){let n=0,e,t,i="";for(;n<arguments.length;)(e=arguments[n++])&&(t=Iu(e))&&(i&&(i+=" "),i+=t);return i}const Iu=n=>{if(typeof n=="string")return n;let e,t="";for(let i=0;i<n.length;i++)n[i]&&(e=Iu(n[i]))&&(t&&(t+=" "),t+=e);return t};function Jp(n,...e){let t,i,r,a=l;function l(c){const d=e.reduce((u,f)=>f(u),n());return t=$p(d),i=t.cache.get,r=t.cache.set,a=o,o(c)}function o(c){const d=i(c);if(d)return d;const u=Kp(c,t);return r(c,u),u}return function(){return a(Zp.apply(null,arguments))}}const ft=n=>{const e=t=>t[n]||[];return e.isThemeGetter=!0,e},Uu=/^\[(?:([a-z-]+):)?(.+)\]$/i,Qp=/^\d+\/\d+$/,em=new Set(["px","full","screen"]),tm=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,nm=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,im=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,rm=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,sm=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,jn=n=>er(n)||em.has(n)||Qp.test(n),Wn=n=>hr(n,"length",fm),er=n=>!!n&&!Number.isNaN(Number(n)),Ca=n=>hr(n,"number",er),xr=n=>!!n&&Number.isInteger(Number(n)),am=n=>n.endsWith("%")&&er(n.slice(0,-1)),Qe=n=>Uu.test(n),Xn=n=>tm.test(n),om=new Set(["length","size","percentage"]),lm=n=>hr(n,om,Ou),cm=n=>hr(n,"position",Ou),dm=new Set(["image","url"]),um=n=>hr(n,dm,mm),hm=n=>hr(n,"",pm),_r=()=>!0,hr=(n,e,t)=>{const i=Uu.exec(n);return i?i[1]?typeof e=="string"?i[1]===e:e.has(i[1]):t(i[2]):!1},fm=n=>nm.test(n)&&!im.test(n),Ou=()=>!1,pm=n=>rm.test(n),mm=n=>sm.test(n),gm=()=>{const n=ft("colors"),e=ft("spacing"),t=ft("blur"),i=ft("brightness"),r=ft("borderColor"),a=ft("borderRadius"),l=ft("borderSpacing"),o=ft("borderWidth"),c=ft("contrast"),d=ft("grayscale"),u=ft("hueRotate"),f=ft("invert"),h=ft("gap"),g=ft("gradientColorStops"),v=ft("gradientColorStopPositions"),x=ft("inset"),m=ft("margin"),p=ft("opacity"),y=ft("padding"),_=ft("saturate"),E=ft("scale"),S=ft("sepia"),A=ft("skew"),T=ft("space"),N=ft("translate"),b=()=>["auto","contain","none"],M=()=>["auto","hidden","clip","visible","scroll"],I=()=>["auto",Qe,e],k=()=>[Qe,e],$=()=>["",jn,Wn],P=()=>["auto",er,Qe],z=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],J=()=>["solid","dashed","dotted","double","none"],K=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],ae=()=>["start","end","center","between","around","evenly","stretch"],ee=()=>["","0",Qe],ie=()=>["auto","avoid","all","avoid-page","page","left","right","column"],D=()=>[er,Qe];return{cacheSize:500,separator:":",theme:{colors:[_r],spacing:[jn,Wn],blur:["none","",Xn,Qe],brightness:D(),borderColor:[n],borderRadius:["none","","full",Xn,Qe],borderSpacing:k(),borderWidth:$(),contrast:D(),grayscale:ee(),hueRotate:D(),invert:ee(),gap:k(),gradientColorStops:[n],gradientColorStopPositions:[am,Wn],inset:I(),margin:I(),opacity:D(),padding:k(),saturate:D(),scale:D(),sepia:ee(),skew:D(),space:k(),translate:k()},classGroups:{aspect:[{aspect:["auto","square","video",Qe]}],container:["container"],columns:[{columns:[Xn]}],"break-after":[{"break-after":ie()}],"break-before":[{"break-before":ie()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...z(),Qe]}],overflow:[{overflow:M()}],"overflow-x":[{"overflow-x":M()}],"overflow-y":[{"overflow-y":M()}],overscroll:[{overscroll:b()}],"overscroll-x":[{"overscroll-x":b()}],"overscroll-y":[{"overscroll-y":b()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[x]}],"inset-x":[{"inset-x":[x]}],"inset-y":[{"inset-y":[x]}],start:[{start:[x]}],end:[{end:[x]}],top:[{top:[x]}],right:[{right:[x]}],bottom:[{bottom:[x]}],left:[{left:[x]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",xr,Qe]}],basis:[{basis:I()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",Qe]}],grow:[{grow:ee()}],shrink:[{shrink:ee()}],order:[{order:["first","last","none",xr,Qe]}],"grid-cols":[{"grid-cols":[_r]}],"col-start-end":[{col:["auto",{span:["full",xr,Qe]},Qe]}],"col-start":[{"col-start":P()}],"col-end":[{"col-end":P()}],"grid-rows":[{"grid-rows":[_r]}],"row-start-end":[{row:["auto",{span:[xr,Qe]},Qe]}],"row-start":[{"row-start":P()}],"row-end":[{"row-end":P()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",Qe]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",Qe]}],gap:[{gap:[h]}],"gap-x":[{"gap-x":[h]}],"gap-y":[{"gap-y":[h]}],"justify-content":[{justify:["normal",...ae()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...ae(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...ae(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[y]}],px:[{px:[y]}],py:[{py:[y]}],ps:[{ps:[y]}],pe:[{pe:[y]}],pt:[{pt:[y]}],pr:[{pr:[y]}],pb:[{pb:[y]}],pl:[{pl:[y]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[T]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[T]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",Qe,e]}],"min-w":[{"min-w":[Qe,e,"min","max","fit"]}],"max-w":[{"max-w":[Qe,e,"none","full","min","max","fit","prose",{screen:[Xn]},Xn]}],h:[{h:[Qe,e,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[Qe,e,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[Qe,e,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[Qe,e,"auto","min","max","fit"]}],"font-size":[{text:["base",Xn,Wn]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Ca]}],"font-family":[{font:[_r]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",Qe]}],"line-clamp":[{"line-clamp":["none",er,Ca]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",jn,Qe]}],"list-image":[{"list-image":["none",Qe]}],"list-style-type":[{list:["none","disc","decimal",Qe]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[n]}],"placeholder-opacity":[{"placeholder-opacity":[p]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[n]}],"text-opacity":[{"text-opacity":[p]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...J(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",jn,Wn]}],"underline-offset":[{"underline-offset":["auto",jn,Qe]}],"text-decoration-color":[{decoration:[n]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:k()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Qe]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Qe]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[p]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...z(),cm]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",lm]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},um]}],"bg-color":[{bg:[n]}],"gradient-from-pos":[{from:[v]}],"gradient-via-pos":[{via:[v]}],"gradient-to-pos":[{to:[v]}],"gradient-from":[{from:[g]}],"gradient-via":[{via:[g]}],"gradient-to":[{to:[g]}],rounded:[{rounded:[a]}],"rounded-s":[{"rounded-s":[a]}],"rounded-e":[{"rounded-e":[a]}],"rounded-t":[{"rounded-t":[a]}],"rounded-r":[{"rounded-r":[a]}],"rounded-b":[{"rounded-b":[a]}],"rounded-l":[{"rounded-l":[a]}],"rounded-ss":[{"rounded-ss":[a]}],"rounded-se":[{"rounded-se":[a]}],"rounded-ee":[{"rounded-ee":[a]}],"rounded-es":[{"rounded-es":[a]}],"rounded-tl":[{"rounded-tl":[a]}],"rounded-tr":[{"rounded-tr":[a]}],"rounded-br":[{"rounded-br":[a]}],"rounded-bl":[{"rounded-bl":[a]}],"border-w":[{border:[o]}],"border-w-x":[{"border-x":[o]}],"border-w-y":[{"border-y":[o]}],"border-w-s":[{"border-s":[o]}],"border-w-e":[{"border-e":[o]}],"border-w-t":[{"border-t":[o]}],"border-w-r":[{"border-r":[o]}],"border-w-b":[{"border-b":[o]}],"border-w-l":[{"border-l":[o]}],"border-opacity":[{"border-opacity":[p]}],"border-style":[{border:[...J(),"hidden"]}],"divide-x":[{"divide-x":[o]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[o]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[p]}],"divide-style":[{divide:J()}],"border-color":[{border:[r]}],"border-color-x":[{"border-x":[r]}],"border-color-y":[{"border-y":[r]}],"border-color-s":[{"border-s":[r]}],"border-color-e":[{"border-e":[r]}],"border-color-t":[{"border-t":[r]}],"border-color-r":[{"border-r":[r]}],"border-color-b":[{"border-b":[r]}],"border-color-l":[{"border-l":[r]}],"divide-color":[{divide:[r]}],"outline-style":[{outline:["",...J()]}],"outline-offset":[{"outline-offset":[jn,Qe]}],"outline-w":[{outline:[jn,Wn]}],"outline-color":[{outline:[n]}],"ring-w":[{ring:$()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[n]}],"ring-opacity":[{"ring-opacity":[p]}],"ring-offset-w":[{"ring-offset":[jn,Wn]}],"ring-offset-color":[{"ring-offset":[n]}],shadow:[{shadow:["","inner","none",Xn,hm]}],"shadow-color":[{shadow:[_r]}],opacity:[{opacity:[p]}],"mix-blend":[{"mix-blend":[...K(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":K()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[i]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",Xn,Qe]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[f]}],saturate:[{saturate:[_]}],sepia:[{sepia:[S]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[i]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[f]}],"backdrop-opacity":[{"backdrop-opacity":[p]}],"backdrop-saturate":[{"backdrop-saturate":[_]}],"backdrop-sepia":[{"backdrop-sepia":[S]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",Qe]}],duration:[{duration:D()}],ease:[{ease:["linear","in","out","in-out",Qe]}],delay:[{delay:D()}],animate:[{animate:["none","spin","ping","pulse","bounce",Qe]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[E]}],"scale-x":[{"scale-x":[E]}],"scale-y":[{"scale-y":[E]}],rotate:[{rotate:[xr,Qe]}],"translate-x":[{"translate-x":[N]}],"translate-y":[{"translate-y":[N]}],"skew-x":[{"skew-x":[A]}],"skew-y":[{"skew-y":[A]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",Qe]}],accent:[{accent:["auto",n]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Qe]}],"caret-color":[{caret:[n]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":k()}],"scroll-mx":[{"scroll-mx":k()}],"scroll-my":[{"scroll-my":k()}],"scroll-ms":[{"scroll-ms":k()}],"scroll-me":[{"scroll-me":k()}],"scroll-mt":[{"scroll-mt":k()}],"scroll-mr":[{"scroll-mr":k()}],"scroll-mb":[{"scroll-mb":k()}],"scroll-ml":[{"scroll-ml":k()}],"scroll-p":[{"scroll-p":k()}],"scroll-px":[{"scroll-px":k()}],"scroll-py":[{"scroll-py":k()}],"scroll-ps":[{"scroll-ps":k()}],"scroll-pe":[{"scroll-pe":k()}],"scroll-pt":[{"scroll-pt":k()}],"scroll-pr":[{"scroll-pr":k()}],"scroll-pb":[{"scroll-pb":k()}],"scroll-pl":[{"scroll-pl":k()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Qe]}],fill:[{fill:[n,"none"]}],"stroke-w":[{stroke:[jn,Wn,Ca]}],stroke:[{stroke:[n,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},xm=Jp(gm);function Ct(...n){return xm(Lu(n))}const _m=il("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),fe=V.forwardRef(({className:n,variant:e,size:t,asChild:i=!1,...r},a)=>{const l=i?Dp:"button";return s.jsx(l,{className:Ct(_m({variant:e,size:t,className:n})),ref:a,...r})});fe.displayName="Button";const Ue=V.forwardRef(({className:n,...e},t)=>s.jsx("div",{ref:t,className:Ct("rounded-xl border bg-card text-card-foreground shadow",n),...e}));Ue.displayName="Card";const Oe=V.forwardRef(({className:n,...e},t)=>s.jsx("div",{ref:t,className:Ct("flex flex-col space-y-1.5 p-6",n),...e}));Oe.displayName="CardHeader";const Fe=V.forwardRef(({className:n,...e},t)=>s.jsx("h3",{ref:t,className:Ct("font-semibold leading-none tracking-tight",n),...e}));Fe.displayName="CardTitle";const ze=V.forwardRef(({className:n,...e},t)=>s.jsx("p",{ref:t,className:Ct("text-sm text-muted-foreground",n),...e}));ze.displayName="CardDescription";const ke=V.forwardRef(({className:n,...e},t)=>s.jsx("div",{ref:t,className:Ct("p-6 pt-0",n),...e}));ke.displayName="CardContent";const vm=V.forwardRef(({className:n,...e},t)=>s.jsx("div",{ref:t,className:Ct("flex items-center p-6 pt-0",n),...e}));vm.displayName="CardFooter";const ym=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Fu=(...n)=>n.filter((e,t,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===t).join(" ").trim();var bm={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Sm=V.forwardRef(({color:n="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:i,className:r="",children:a,iconNode:l,...o},c)=>V.createElement("svg",{ref:c,...bm,width:e,height:e,stroke:n,strokeWidth:i?Number(t)*24/Number(e):t,className:Fu("lucide",r),...o},[...l.map(([d,u])=>V.createElement(d,u)),...Array.isArray(a)?a:[a]]));const Ge=(n,e)=>{const t=V.forwardRef(({className:i,...r},a)=>V.createElement(Sm,{ref:a,iconNode:e,className:Fu(`lucide-${ym(n)}`,i),...r}));return t.displayName=`${n}`,t};const ku=Ge("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);const wm=Ge("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);const Em=Ge("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);const Mm=Ge("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);const kl=Ge("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);const Ur=Ge("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);const Tm=Ge("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);const Am=Ge("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);const Rm=Ge("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);const Cm=Ge("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);const Nm=Ge("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);const Ei=Ge("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);const Pm=Ge("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);const Bl=Ge("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);const Rn=Ge("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);const Bu=Ge("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);const zl=Ge("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);const St=Ge("GalleryVerticalEnd",[["path",{d:"M7 2h10",key:"nczekb"}],["path",{d:"M5 6h14",key:"u2x4p"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2",key:"l0tzu3"}]]);const Lm=Ge("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);const jm=Ge("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);const zu=Ge("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);const fn=Ge("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);const di=Ge("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);const Ut=Ge("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);const Dm=Ge("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);const Hu=Ge("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);const Hl=Ge("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);const Im=Ge("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);const Or=Ge("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);const Ys=Ge("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);const Um=Ge("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);const zs=Ge("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);const Gu=Ge("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);const Om=Ge("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);const Fm=Ge("PiggyBank",[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",key:"1ivx2i"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1",key:"nm575m"}],["path",{d:"M16 11h.01",key:"xkw8gn"}]]);const Gl=Ge("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);const Vl=Ge("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);const ua=Ge("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);const Wl=Ge("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);const Vu=Ge("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);const Wu=Ge("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);const km=Ge("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);const kt=Ge("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);const Bm=Ge("Tags",[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19",key:"1cbfv1"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z",key:"135mg7"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor",key:"5pm5xn"}]]);const Po=Ge("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);const Fr=Ge("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);const zm=Ge("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);const Na=Ge("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);const Sn=Ge("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);const Hm=Ge("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);const Gm=Ge("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Vm=()=>s.jsxs("div",{className:"container mx-auto py-8",children:[s.jsxs("section",{className:"mb-16 text-center",children:[s.jsxs("div",{className:"inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4",children:[s.jsx(km,{className:"h-4 w-4"}),s.jsx("span",{children:"Новое поколение виртуальных галерей"})]}),s.jsx("h1",{className:"text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",children:"Исследуйте мир искусства в виртуальной реальности"}),s.jsx("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto mb-10",children:"Погрузитесь в захватывающий мир произведений искусства со всего мира. Создавайте персональные коллекции, участвуйте в виртуальных турах и открывайте новые горизонты искусства."}),s.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[s.jsx(mt,{to:"/galleries",children:s.jsxs(fe,{size:"lg",className:"px-8 py-6 text-lg",children:["Начать исследование",s.jsx(wm,{className:"ml-2 h-5 w-5"})]})}),s.jsx(mt,{to:"/vr-gallery",children:s.jsx(fe,{size:"lg",variant:"outline",className:"px-8 py-6 text-lg",children:"Виртуальная галерея"})})]})]}),s.jsxs("section",{className:"mb-16",children:[s.jsxs("div",{className:"text-center mb-12",children:[s.jsx("h2",{className:"text-3xl font-bold mb-4",children:"Возможности платформы"}),s.jsx("p",{className:"text-lg text-muted-foreground max-w-2xl mx-auto",children:"Откройте для себя инновационные возможности для изучения и взаимодействия с искусством"})]}),s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[s.jsxs(Ue,{className:"group hover:shadow-lg transition-all duration-300",children:[s.jsxs(Oe,{children:[s.jsx("div",{className:"bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors",children:s.jsx(Gu,{className:"h-6 w-6 text-primary"})}),s.jsx(Fe,{children:"Экспонаты"}),s.jsx(ze,{children:"Более 10,000 произведений искусства от ведущих музеев мира"})]}),s.jsx(ke,{children:s.jsx(mt,{to:"/artworks",children:s.jsx(fe,{variant:"ghost",className:"w-full",children:"Изучить коллекцию"})})})]}),s.jsxs(Ue,{className:"group hover:shadow-lg transition-all duration-300",children:[s.jsxs(Oe,{children:[s.jsx("div",{className:"bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors",children:s.jsx(Pm,{className:"h-6 w-6 text-primary"})}),s.jsx(Fe,{children:"Виртуальные туры"}),s.jsx(ze,{children:"Погрузитесь в интерактивные туры по знаменитым галереям"})]}),s.jsx(ke,{children:s.jsx(mt,{to:"/tours",children:s.jsx(fe,{variant:"ghost",className:"w-full",children:"Начать тур"})})})]}),s.jsxs(Ue,{className:"group hover:shadow-lg transition-all duration-300",children:[s.jsxs(Oe,{children:[s.jsx("div",{className:"bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors",children:s.jsx(Sn,{className:"h-6 w-6 text-primary"})}),s.jsx(Fe,{children:"Сообщество"}),s.jsx(ze,{children:"Присоединяйтесь к сообществу ценителей искусства"})]}),s.jsx(ke,{children:s.jsx(mt,{to:"/community",children:s.jsx(fe,{variant:"ghost",className:"w-full",children:"Присоединиться"})})})]}),s.jsxs(Ue,{className:"group hover:shadow-lg transition-all duration-300",children:[s.jsxs(Oe,{children:[s.jsx("div",{className:"bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors",children:s.jsx(kt,{className:"h-6 w-6 text-primary"})}),s.jsx(Fe,{children:"Персонализация"}),s.jsx(ze,{children:"Создавайте персональные коллекции и маршруты"})]}),s.jsx(ke,{children:s.jsx(mt,{to:"/collections",children:s.jsx(fe,{variant:"ghost",className:"w-full",children:"Создать коллекцию"})})})]})]})]}),s.jsxs("section",{className:"mb-16",children:[s.jsxs("div",{className:"flex justify-between items-center mb-8",children:[s.jsx("h2",{className:"text-3xl font-bold",children:"Популярные галереи"}),s.jsx(mt,{to:"/galleries",children:s.jsx(fe,{variant:"ghost",children:"Показать все"})})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3].map(n=>s.jsxs(Ue,{className:"group overflow-hidden",children:[s.jsxs("div",{className:"aspect-video bg-muted relative overflow-hidden",children:[s.jsx("div",{className:"bg-gradient-to-t from-black/70 to-transparent absolute inset-0 z-10"}),s.jsxs("div",{className:"absolute bottom-4 left-4 right-4 z-20 text-white",children:[s.jsxs("h3",{className:"font-bold text-lg",children:["Галерея ",n]}),s.jsx("p",{className:"text-sm opacity-80",children:"Москва, Россия"})]})]}),s.jsxs(Oe,{className:"p-4",children:[s.jsxs(Fe,{className:"text-lg",children:["Галерея ",n]}),s.jsxs(ze,{children:["Коллекция произведений искусства от ",2e3+n*10," до ",2020+n*5," года"]})]}),s.jsxs(ke,{className:"p-4 pt-0",children:[s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground mb-3",children:[s.jsx(Or,{className:"h-4 w-4 mr-1"}),s.jsxs("span",{children:["Москва, ул. Искусств, ",n*5]})]}),s.jsx(mt,{to:`/galleries/${n}`,children:s.jsx(fe,{className:"w-full",children:"Посетить галерею"})})]})]},n))})]}),s.jsxs("section",{className:"bg-gradient-to-r from-primary/5 to-purple-50/5 rounded-2xl p-8 md:p-12 text-center",children:[s.jsx("h2",{className:"text-3xl md:text-4xl font-bold mb-4",children:"Готовы начать свое путешествие в мир искусства?"}),s.jsx("p",{className:"text-lg text-muted-foreground max-w-2xl mx-auto mb-8",children:"Присоединяйтесь к миллионам пользователей, которые уже исследуют виртуальные галереи"}),s.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[s.jsx(mt,{to:"/register",children:s.jsx(fe,{size:"lg",className:"px-8 py-6 text-lg",children:"Начать бесплатно"})}),s.jsx(mt,{to:"/demo",children:s.jsx(fe,{size:"lg",variant:"outline",className:"px-8 py-6 text-lg",children:"Посмотреть демо"})})]})]})]}),Wm=il("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function vt({className:n,variant:e,...t}){return s.jsx("div",{className:Ct(Wm({variant:e}),n),...t})}const Xm=({title:n,value:e,change:t,icon:i,trend:r})=>s.jsxs(Ue,{children:[s.jsxs(Oe,{className:"flex flex-row items-center justify-between pb-2",children:[s.jsx(Fe,{className:"text-sm font-medium",children:n}),s.jsx("div",{className:"p-2 bg-primary/10 rounded-lg text-primary",children:i})]}),s.jsxs(ke,{children:[s.jsx("div",{className:"text-2xl font-bold",children:e}),s.jsxs("p",{className:`text-xs ${r==="up"?"text-green-500":"text-red-500"} flex items-center`,children:[r==="up"?s.jsx(Fr,{className:"h-3 w-3 mr-1"}):s.jsx(Fr,{className:"h-3 w-3 mr-1 rotate-180"}),t]})]})]}),qm=()=>{const[n,e]=V.useState("overview"),t=[{title:"Всего пользователей",value:"12,361",change:"+18.2% с прошлого месяца",icon:s.jsx(Sn,{className:"h-4 w-4"}),trend:"up"},{title:"Просмотров экспонатов",value:"1.2M",change:"+22.5% с прошлого месяца",icon:s.jsx(Rn,{className:"h-4 w-4"}),trend:"up"},{title:"Лайков",value:"45.2K",change:"+12.3% с прошлого месяца",icon:s.jsx(fn,{className:"h-4 w-4"}),trend:"up"},{title:"Экспонатов",value:"8,421",change:"+5.7% с прошлого месяца",icon:s.jsx(Ut,{className:"h-4 w-4"}),trend:"up"}],i=[{id:1,user:"Александр Петров",action:"Добавил новый экспонат",time:"2 минуты назад",type:"add"},{id:2,user:"Мария Иванова",action:"Оставил отзыв",time:"15 минут назад",type:"review"},{id:3,user:"Дмитрий Сидоров",action:"Создал коллекцию",time:"1 час назад",type:"collection"},{id:4,user:"Елена Козлова",action:"Присоединился к платформе",time:"2 часа назад",type:"join"},{id:5,user:"Сергей Новиков",action:"Оценил экспонат",time:"3 часа назад",type:"rate"}],r=[{id:1,title:"Абстрактная композиция №1",artist:"Александр Петров",likes:1240,views:12400},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",likes:980,views:9800},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",likes:2100,views:21e3},{id:4,title:"Портрет женщины",artist:"Дмитрий Козлов",likes:1560,views:15600},{id:5,title:"Морской пейзаж",artist:"Елена Васильева",likes:780,views:7800}];return s.jsxs("div",{className:"container mx-auto py-8",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold",children:"Админ-панель"}),s.jsx("p",{className:"text-muted-foreground",children:"Управление платформой виртуальной галереи"})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:t.map((a,l)=>s.jsx(Xm,{title:a.title,value:a.value,change:a.change,icon:a.icon,trend:a.trend},l))}),s.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[s.jsx("button",{className:`pb-3 px-1 ${n==="overview"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("overview"),children:"Обзор"}),s.jsx("button",{className:`pb-3 px-1 ${n==="users"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("users"),children:"Пользователи"}),s.jsx("button",{className:`pb-3 px-1 ${n==="artworks"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("artworks"),children:"Экспонаты"}),s.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="overview"&&s.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[s.jsxs(Ue,{className:"lg:col-span-2",children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Недавние действия"}),s.jsx(fe,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),s.jsx(ze,{children:"Последние действия пользователей на платформе"})]}),s.jsx(ke,{children:s.jsx("div",{className:"space-y-4",children:i.map(a=>s.jsxs("div",{className:"flex items-start space-x-4",children:[s.jsx("div",{className:`p-2 rounded-full ${a.type==="add"?"bg-blue-100 text-blue-600":a.type==="review"?"bg-green-100 text-green-600":a.type==="collection"?"bg-purple-100 text-purple-600":a.type==="join"?"bg-orange-100 text-orange-600":"bg-gray-100 text-gray-600"}`,children:a.type==="add"?s.jsx(St,{className:"h-4 w-4"}):a.type==="review"?s.jsx(kt,{className:"h-4 w-4"}):a.type==="collection"?s.jsx(Ur,{className:"h-4 w-4"}):a.type==="join"?s.jsx(Sn,{className:"h-4 w-4"}):s.jsx(fn,{className:"h-4 w-4"})}),s.jsxs("div",{className:"flex-1",children:[s.jsx("p",{className:"text-sm font-medium",children:a.user}),s.jsx("p",{className:"text-sm text-muted-foreground",children:a.action}),s.jsx("p",{className:"text-xs text-muted-foreground",children:a.time})]})]},a.id))})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Топ экспонатов"}),s.jsx(fe,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),s.jsx(ze,{children:"Самые популярные экспонаты за последний месяц"})]}),s.jsx(ke,{children:s.jsx("div",{className:"space-y-4",children:r.map(a=>s.jsxs("div",{className:"flex items-center space-x-4",children:[s.jsx("div",{className:"bg-muted rounded-lg p-2",children:s.jsx(Ut,{className:"h-8 w-8 text-primary"})}),s.jsxs("div",{className:"flex-1",children:[s.jsx("p",{className:"text-sm font-medium",children:a.title}),s.jsx("p",{className:"text-xs text-muted-foreground",children:a.artist})]}),s.jsxs("div",{className:"text-right",children:[s.jsxs("p",{className:"text-sm font-medium",children:[a.likes," лайков"]}),s.jsxs("p",{className:"text-xs text-muted-foreground",children:[a.views," просмотров"]})]})]},a.id))})})]})]}),n==="users"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Управление пользователями"}),s.jsx(ze,{children:"Просмотр и управление аккаунтами пользователей"})]}),s.jsxs(ke,{children:[s.jsxs("div",{className:"flex justify-between items-center mb-4",children:[s.jsx("h3",{className:"text-lg font-medium",children:"Список пользователей"}),s.jsx(fe,{children:"Добавить пользователя"})]}),s.jsx("div",{className:"border rounded-lg",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{className:"border-b",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left p-4",children:"Пользователь"}),s.jsx("th",{className:"text-left p-4",children:"Роль"}),s.jsx("th",{className:"text-left p-4",children:"Дата регистрации"}),s.jsx("th",{className:"text-left p-4",children:"Статус"}),s.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),s.jsx("tbody",{children:[1,2,3,4,5].map(a=>s.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsx("div",{className:"bg-primary/10 p-2 rounded-full",children:s.jsx(Sn,{className:"h-5 w-5 text-primary"})}),s.jsxs("div",{children:[s.jsxs("p",{className:"font-medium",children:["Пользователь ",a]}),s.jsxs("p",{className:"text-sm text-muted-foreground",children:["user",a,"@example.com"]})]})]})}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:"outline",children:a===1?"admin":a===2?"curator":"user"})}),s.jsxs("td",{className:"p-4",children:["15.",a,".2023"]}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:a%2===0?"default":"secondary",children:a%2===0?"Активен":"Неактивен"})}),s.jsx("td",{className:"p-4",children:s.jsx(fe,{variant:"outline",size:"sm",children:"Редактировать"})})]},a))})]})})]})]}),n==="artworks"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Управление экспонатами"}),s.jsx(ze,{children:"Просмотр и управление экспонатами галереи"})]}),s.jsxs(ke,{children:[s.jsxs("div",{className:"flex justify-between items-center mb-4",children:[s.jsx("h3",{className:"text-lg font-medium",children:"Список экспонатов"}),s.jsx(fe,{children:"Добавить экспонат"})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:[1,2,3,4,5,6].map(a=>s.jsxs(Ue,{className:"overflow-hidden",children:[s.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:s.jsx(Ut,{className:"h-12 w-12 text-primary/20"})}),s.jsxs(Oe,{children:[s.jsxs(Fe,{className:"text-lg",children:["Экспонат ",a]}),s.jsxs(ze,{children:["Художник ",a]})]}),s.jsxs(ke,{children:[s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsxs(vt,{variant:"outline",children:["Категория ",a]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(fn,{className:"h-4 w-4 mr-1"}),s.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),s.jsxs("div",{className:"mt-4 flex space-x-2",children:[s.jsx(fe,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),s.jsx(fe,{size:"sm",children:"Редактировать"})]})]})]},a))})]})]}),n==="analytics"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Аналитика платформы"}),s.jsx(ze,{children:"Статистика использования и взаимодействия пользователей"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Посещаемость"}),s.jsx(ze,{children:"Посетители за последние 30 дней"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[s.jsx(ku,{className:"h-12 w-12 text-primary/20"}),s.jsx("p",{className:"ml-4 text-muted-foreground",children:"График посещаемости"})]})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Популярность экспонатов"}),s.jsx(ze,{children:"Топ-10 самых просматриваемых экспонатов"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[s.jsx(Ur,{className:"h-12 w-12 text-primary/20"}),s.jsx("p",{className:"ml-4 text-muted-foreground",children:"График популярности"})]})})]})]})})]})]})},$m=()=>{const[n,e]=V.useState("dashboard"),[t,i]=V.useState([{id:1,title:"Абстрактная композиция",artist:"Александр Петров",submittedBy:"Мария Иванова",submissionDate:"2023-11-15",status:"pending",image:"/placeholder-artwork.jpg"},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",submittedBy:"Дмитрий Сидоров",submissionDate:"2023-11-14",status:"approved",image:"/placeholder-artwork.jpg"},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",submittedBy:"Елена Козлова",submissionDate:"2023-11-13",status:"rejected",image:"/placeholder-artwork.jpg"}]),r=[{title:"Всего экспонатов",value:"1,240",change:"+12%"},{title:"Новых за сегодня",value:"12",change:"+5%"},{title:"На рассмотрении",value:"24",change:"-3%"},{title:"Одобренных",value:"1,190",change:"+15%"}],a=[{id:1,title:"Абстрактная композиция",artist:"Александр Петров",date:"2 часа назад",status:"pending"},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",date:"5 часов назад",status:"approved"},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",date:"1 день назад",status:"rejected"},{id:4,title:"Портрет женщины",artist:"Дмитрий Козлов",date:"2 дня назад",status:"pending"}],l=c=>{i(t.map(d=>d.id===c?{...d,status:"approved"}:d))},o=c=>{i(t.map(d=>d.id===c?{...d,status:"rejected"}:d))};return s.jsxs("div",{className:"container mx-auto py-8",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold",children:"Панель куратора"}),s.jsx("p",{className:"text-muted-foreground",children:"Управление экспонатами и рассмотрение новых материалов"})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:r.map((c,d)=>s.jsxs(Ue,{children:[s.jsxs(Oe,{className:"pb-2",children:[s.jsx(ze,{children:c.title}),s.jsx(Fe,{className:"text-2xl",children:c.value})]}),s.jsx(ke,{children:s.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[s.jsx(TrendingUp,{className:"h-4 w-4 mr-1"}),c.change]})})]},d))}),s.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[s.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),s.jsx("button",{className:`pb-3 px-1 ${n==="submissions"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("submissions"),children:"Материалы на рассмотрении"}),s.jsx("button",{className:`pb-3 px-1 ${n==="collections"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("collections"),children:"Коллекции"}),s.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="dashboard"&&s.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[s.jsxs(Ue,{className:"lg:col-span-2",children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Недавние материалы"}),s.jsx(fe,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),s.jsx(ze,{children:"Последние материалы, добавленные пользователями"})]}),s.jsx(ke,{children:s.jsx("div",{className:"space-y-4",children:a.map(c=>s.jsxs("div",{className:"flex items-center justify-between p-4 border rounded-lg",children:[s.jsxs("div",{className:"flex items-center space-x-4",children:[s.jsx("div",{className:"bg-muted rounded-lg p-2",children:s.jsx(Ut,{className:"h-6 w-6 text-primary"})}),s.jsxs("div",{children:[s.jsx("p",{className:"font-medium",children:c.title}),s.jsxs("p",{className:"text-sm text-muted-foreground",children:["Автор: ",c.artist]})]})]}),s.jsxs("div",{className:"flex items-center space-x-4",children:[s.jsx(vt,{variant:c.status==="pending"?"default":c.status==="approved"?"secondary":"destructive",children:c.status==="pending"?"На рассмотрении":c.status==="approved"?"Одобрен":"Отклонен"}),s.jsx("span",{className:"text-sm text-muted-foreground",children:c.date})]})]},c.id))})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Быстрые действия"}),s.jsx(ze,{children:"Часто используемые функции"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"space-y-4",children:[s.jsxs(fe,{className:"w-full justify-start",children:[s.jsx(Vl,{className:"h-4 w-4 mr-2"}),"Добавить экспонат"]}),s.jsxs(fe,{variant:"outline",className:"w-full justify-start",children:[s.jsx(St,{className:"h-4 w-4 mr-2"}),"Создать коллекцию"]}),s.jsxs(fe,{variant:"outline",className:"w-full justify-start",children:[s.jsx(zs,{className:"h-4 w-4 mr-2"}),"Ответить на отзывы"]}),s.jsxs(fe,{variant:"outline",className:"w-full justify-start",children:[s.jsx(kt,{className:"h-4 w-4 mr-2"}),"Рекомендовать экспонат"]})]})})]})]}),n==="submissions"&&s.jsxs(Ue,{children:[s.jsx(Oe,{children:s.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[s.jsxs("div",{children:[s.jsx(Fe,{children:"Материалы на рассмотрении"}),s.jsx(ze,{children:"Новые экспонаты, отправленные пользователями для проверки"})]}),s.jsxs("div",{className:"flex gap-2",children:[s.jsxs("div",{className:"relative",children:[s.jsx(ua,{className:"absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),s.jsx("input",{type:"text",placeholder:"Поиск...",className:"pl-8 pr-4 py-2 border rounded-lg w-full sm:w-64"})]}),s.jsxs(fe,{variant:"outline",children:[s.jsx(Bu,{className:"h-4 w-4 mr-2"}),"Фильтр"]})]})]})}),s.jsx(ke,{children:s.jsx("div",{className:"overflow-x-auto",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{className:"border-b",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left p-4",children:"Экспонат"}),s.jsx("th",{className:"text-left p-4",children:"Автор"}),s.jsx("th",{className:"text-left p-4",children:"Отправитель"}),s.jsx("th",{className:"text-left p-4",children:"Дата"}),s.jsx("th",{className:"text-left p-4",children:"Статус"}),s.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),s.jsx("tbody",{children:t.map(c=>s.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsx("div",{className:"bg-muted rounded-lg p-2",children:s.jsx(Ut,{className:"h-6 w-6 text-primary"})}),s.jsx("span",{className:"font-medium",children:c.title})]})}),s.jsx("td",{className:"p-4",children:c.artist}),s.jsx("td",{className:"p-4",children:c.submittedBy}),s.jsx("td",{className:"p-4",children:c.submissionDate}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:c.status==="pending"?"default":c.status==="approved"?"secondary":"destructive",children:c.status==="pending"?"На рассмотрении":c.status==="approved"?"Одобрен":"Отклонен"})}),s.jsx("td",{className:"p-4",children:c.status==="pending"?s.jsxs("div",{className:"flex space-x-2",children:[s.jsxs(fe,{size:"sm",variant:"outline",onClick:()=>l(c.id),children:[s.jsx(Rm,{className:"h-4 w-4 mr-1 text-green-500"}),"Одобрить"]}),s.jsxs(fe,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[s.jsx(Nm,{className:"h-4 w-4 mr-1 text-red-500"}),"Отклонить"]})]}):s.jsx("span",{className:"text-sm text-muted-foreground",children:"-"})})]},c.id))})]})})})]}),n==="collections"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Коллекции"}),s.jsxs(fe,{children:[s.jsx(Vl,{className:"h-4 w-4 mr-2"}),"Создать коллекцию"]})]}),s.jsx(ze,{children:"Управление коллекциями экспонатов"})]}),s.jsx(ke,{children:s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3,4,5,6].map(c=>s.jsxs(Ue,{className:"overflow-hidden",children:[s.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:s.jsx(St,{className:"h-12 w-12 text-primary/20"})}),s.jsxs(Oe,{children:[s.jsxs(Fe,{className:"text-lg",children:["Коллекция ",c]}),s.jsxs(ze,{children:[Math.floor(Math.random()*50)+5," экспонатов"]})]}),s.jsxs(ke,{children:[s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsxs(vt,{variant:"outline",children:["Тема ",c]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(Rn,{className:"h-4 w-4 mr-1"}),s.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),s.jsxs("div",{className:"mt-4 flex space-x-2",children:[s.jsx(fe,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),s.jsx(fe,{size:"sm",children:"Редактировать"})]})]})]},c))})})]}),n==="analytics"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Аналитика куратора"}),s.jsx(ze,{children:"Статистика ваших действий и принятых решений"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Решения по материалам"}),s.jsx(ze,{children:"Статусы принятых решений"})]}),s.jsx(ke,{children:s.jsx("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:s.jsxs("div",{className:"text-center",children:[s.jsx(St,{className:"h-12 w-12 text-primary/20 mx-auto"}),s.jsx("p",{className:"mt-2 text-muted-foreground",children:"График решений"})]})})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Популярность коллекций"}),s.jsx(ze,{children:"Просмотры и взаимодействия с вашими коллекциями"})]}),s.jsx(ke,{children:s.jsx("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:s.jsxs("div",{className:"text-center",children:[s.jsx(kt,{className:"h-12 w-12 text-primary/20 mx-auto"}),s.jsx("p",{className:"mt-2 text-muted-foreground",children:"График популярности"})]})})})]})]})})]})]})},Ym=()=>{const[n,e]=V.useState("dashboard"),[t,i]=V.useState([{id:1,title:"Проверить новые экспонаты",description:"Проверить 15 новых экспонатов, загруженных за вчера",priority:"high",status:"in-progress",assignedTo:"Василий Петров",dueDate:"2023-11-20"},{id:2,title:"Обновить описания",description:'Обновить описания для 20 экспонатов в галерее "Современное искусство"',priority:"medium",status:"pending",assignedTo:"Мария Иванова",dueDate:"2023-11-22"},{id:3,title:"Ответить на отзывы",description:"Ответить на 12 новых отзывов пользователей",priority:"low",status:"pending",assignedTo:"Алексей Сидоров",dueDate:"2023-11-25"}]),r=[{title:"Всего задач",value:"24",change:"+5%"},{title:"Выполнено",value:"18",change:"+12%"},{title:"В работе",value:"4",change:"-2%"},{title:"Просрочено",value:"2",change:"-1%"}],a=[{id:1,user:"Александр Петров",action:"Добавил новый экспонат",time:"2 минуты назад",type:"add"},{id:2,user:"Мария Иванова",action:"Оставил отзыв",time:"15 минут назад",type:"review"},{id:3,user:"Дмитрий Сидоров",action:"Создал коллекцию",time:"1 час назад",type:"collection"},{id:4,user:"Елена Козлова",action:"Присоединился к платформе",time:"2 часа назад",type:"join"},{id:5,user:"Сергей Новиков",action:"Оценил экспонат",time:"3 часа назад",type:"rate"}],l=(o,c)=>{i(t.map(d=>d.id===o?{...d,status:c}:d))};return s.jsxs("div",{className:"container mx-auto py-8",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold",children:"Панель сотрудника"}),s.jsx("p",{className:"text-muted-foreground",children:"Управление задачами и контентом галереи"})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:r.map((o,c)=>s.jsxs(Ue,{children:[s.jsxs(Oe,{className:"pb-2",children:[s.jsx(ze,{children:o.title}),s.jsx(Fe,{className:"text-2xl",children:o.value})]}),s.jsx(ke,{children:s.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[s.jsx(Fr,{className:"h-4 w-4 mr-1"}),o.change]})})]},c))}),s.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[s.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),s.jsx("button",{className:`pb-3 px-1 ${n==="tasks"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("tasks"),children:"Задачи"}),s.jsx("button",{className:`pb-3 px-1 ${n==="content"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("content"),children:"Контент"}),s.jsx("button",{className:`pb-3 px-1 ${n==="reports"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("reports"),children:"Отчеты"})]}),n==="dashboard"&&s.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[s.jsxs(Ue,{className:"lg:col-span-2",children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Недавние действия"}),s.jsx(fe,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),s.jsx(ze,{children:"Последние действия пользователей на платформе"})]}),s.jsx(ke,{children:s.jsx("div",{className:"space-y-4",children:a.map(o=>s.jsxs("div",{className:"flex items-start space-x-4",children:[s.jsx("div",{className:`p-2 rounded-full ${o.type==="add"?"bg-blue-100 text-blue-600":o.type==="review"?"bg-green-100 text-green-600":o.type==="collection"?"bg-purple-100 text-purple-600":o.type==="join"?"bg-orange-100 text-orange-600":"bg-gray-100 text-gray-600"}`,children:o.type==="add"?s.jsx(St,{className:"h-4 w-4"}):o.type==="review"?s.jsx(kt,{className:"h-4 w-4"}):o.type==="collection"?s.jsx(Ur,{className:"h-4 w-4"}):o.type==="join"?s.jsx(Sn,{className:"h-4 w-4"}):s.jsx(fn,{className:"h-4 w-4"})}),s.jsxs("div",{className:"flex-1",children:[s.jsx("p",{className:"text-sm font-medium",children:o.user}),s.jsx("p",{className:"text-sm text-muted-foreground",children:o.action}),s.jsx("p",{className:"text-xs text-muted-foreground",children:o.time})]})]},o.id))})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Мои задачи"}),s.jsx(fe,{variant:"outline",size:"sm",children:"Создать"})]}),s.jsx(ze,{children:"Задачи, назначенные вам"})]}),s.jsx(ke,{children:s.jsx("div",{className:"space-y-4",children:t.slice(0,3).map(o=>s.jsxs("div",{className:"border rounded-lg p-4",children:[s.jsxs("div",{className:"flex justify-between items-start",children:[s.jsx("h4",{className:"font-medium",children:o.title}),s.jsx(vt,{variant:o.priority==="high"?"destructive":o.priority==="medium"?"default":"secondary",children:o.priority==="high"?"Высокий":o.priority==="medium"?"Средний":"Низкий"})]}),s.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:o.description}),s.jsxs("div",{className:"flex justify-between items-center mt-3",children:[s.jsxs("div",{className:"flex items-center text-xs text-muted-foreground",children:[s.jsx(Ei,{className:"h-3 w-3 mr-1"}),s.jsx("span",{children:o.dueDate})]}),s.jsx(vt,{variant:o.status==="pending"?"outline":o.status==="in-progress"?"default":"secondary",children:o.status==="pending"?"В ожидании":o.status==="in-progress"?"В работе":"Завершено"})]})]},o.id))})})]})]}),n==="tasks"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Управление задачами"}),s.jsxs(fe,{children:[s.jsx(zm,{className:"h-4 w-4 mr-2"}),"Создать задачу"]})]}),s.jsx(ze,{children:"Назначение, отслеживание и выполнение задач"})]}),s.jsx(ke,{children:s.jsx("div",{className:"overflow-x-auto",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{className:"border-b",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left p-4",children:"Задача"}),s.jsx("th",{className:"text-left p-4",children:"Описание"}),s.jsx("th",{className:"text-left p-4",children:"Приоритет"}),s.jsx("th",{className:"text-left p-4",children:"Статус"}),s.jsx("th",{className:"text-left p-4",children:"Назначен"}),s.jsx("th",{className:"text-left p-4",children:"Срок"}),s.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),s.jsx("tbody",{children:t.map(o=>s.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[s.jsx("td",{className:"p-4 font-medium",children:o.title}),s.jsx("td",{className:"p-4 text-sm text-muted-foreground max-w-xs truncate",children:o.description}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:o.priority==="high"?"destructive":o.priority==="medium"?"default":"secondary",children:o.priority==="high"?"Высокий":o.priority==="medium"?"Средний":"Низкий"})}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:o.status==="pending"?"outline":o.status==="in-progress"?"default":"secondary",children:o.status==="pending"?"В ожидании":o.status==="in-progress"?"В работе":"Завершено"})}),s.jsx("td",{className:"p-4",children:o.assignedTo}),s.jsx("td",{className:"p-4",children:o.dueDate}),s.jsx("td",{className:"p-4",children:s.jsx("div",{className:"flex space-x-2",children:s.jsx(fe,{size:"sm",variant:o.status==="completed"?"outline":"default",onClick:()=>l(o.id,o.status==="completed"?"in-progress":"completed"),children:o.status==="completed"?"Вернуть":"Выполнить"})})})]},o.id))})]})})})]}),n==="content"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Управление контентом"}),s.jsxs(fe,{children:[s.jsx(Ut,{className:"h-4 w-4 mr-2"}),"Добавить экспонат"]})]}),s.jsx(ze,{children:"Редактирование и управление экспонатами"})]}),s.jsx(ke,{children:s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3,4,5,6].map(o=>s.jsxs(Ue,{className:"overflow-hidden",children:[s.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:s.jsx(Ut,{className:"h-12 w-12 text-primary/20"})}),s.jsxs(Oe,{children:[s.jsxs(Fe,{className:"text-lg",children:["Экспонат ",o]}),s.jsxs(ze,{children:["Художник ",o]})]}),s.jsxs(ke,{children:[s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsxs(vt,{variant:"outline",children:["Категория ",o]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(fn,{className:"h-4 w-4 mr-1"}),s.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),s.jsxs("div",{className:"mt-4 flex space-x-2",children:[s.jsx(fe,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),s.jsx(fe,{size:"sm",children:"Редактировать"})]})]})]},o))})})]}),n==="reports"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Отчеты и аналитика"}),s.jsx(ze,{children:"Статистика ваших действий и активности"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Ваши задачи"}),s.jsx(ze,{children:"Статус выполнения назначенных задач"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[s.jsx(ku,{className:"h-12 w-12 text-primary/20"}),s.jsx("p",{className:"ml-4 text-muted-foreground",children:"График выполнения задач"})]})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Вклад в контент"}),s.jsx(ze,{children:"Ваши вклады в развитие контента галереи"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[s.jsx(Ur,{className:"h-12 w-12 text-primary/20"}),s.jsx("p",{className:"ml-4 text-muted-foreground",children:"График активности"})]})})]})]})})]})]})},Km=()=>{const[n,e]=V.useState("dashboard"),[t,i]=V.useState([{id:1,title:"Введение в современное искусство",description:"Обзор основных направлений современного искусства",duration:"45 мин",participants:12,rating:4.7,status:"scheduled",scheduledDate:"2023-11-20",scheduledTime:"14:00"},{id:2,title:"История импрессионизма",description:"Путешествие через эпоху импрессионизма",duration:"60 мин",participants:8,rating:4.9,status:"ongoing",scheduledDate:"2023-11-20",scheduledTime:"16:00"},{id:3,title:"Цифровые инсталляции",description:"Интерактивные цифровые произведения искусства",duration:"50 мин",participants:15,rating:4.5,status:"completed",scheduledDate:"2023-11-19",scheduledTime:"15:00"}]),r=[{title:"Всего туров",value:"42",change:"+8%"},{title:"Проведено",value:"38",change:"+12%"},{title:"Участников",value:"420",change:"+15%"},{title:"Средний рейтинг",value:"4.7",change:"+0.2"}],a=[{id:1,name:"Александр Петров",email:"alex@example.com",joinedTour:"Введение в современное искусство",engagement:92},{id:2,name:"Мария Иванова",email:"maria@example.com",joinedTour:"История импрессионизма",engagement:87},{id:3,name:"Дмитрий Сидоров",email:"dmitry@example.com",joinedTour:"Цифровые инсталляции",engagement:95},{id:4,name:"Елена Козлова",email:"elena@example.com",joinedTour:"Введение в современное искусство",engagement:78},{id:5,name:"Сергей Новиков",email:"sergey@example.com",joinedTour:"Классическая живопись",engagement:89}],l=c=>{i(t.map(d=>d.id===c?{...d,status:"ongoing"}:d))},o=c=>{i(t.map(d=>d.id===c?{...d,status:"completed"}:d))};return s.jsxs("div",{className:"container mx-auto py-8",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold",children:"Панель гида"}),s.jsx("p",{className:"text-muted-foreground",children:"Управление виртуальными турами и взаимодействие с участниками"})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:r.map((c,d)=>s.jsxs(Ue,{children:[s.jsxs(Oe,{className:"pb-2",children:[s.jsx(ze,{children:c.title}),s.jsx(Fe,{className:"text-2xl",children:c.value})]}),s.jsx(ke,{children:s.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[s.jsx(Fr,{className:"h-4 w-4 mr-1"}),c.change]})})]},d))}),s.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[s.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),s.jsx("button",{className:`pb-3 px-1 ${n==="tours"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("tours"),children:"Мои туры"}),s.jsx("button",{className:`pb-3 px-1 ${n==="participants"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("participants"),children:"Участники"}),s.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="dashboard"&&s.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[s.jsxs(Ue,{className:"lg:col-span-2",children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Предстоящие туры"}),s.jsx(fe,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),s.jsx(ze,{children:"Запланированные виртуальные туры"})]}),s.jsx(ke,{children:s.jsx("div",{className:"space-y-4",children:t.filter(c=>c.status!=="completed").map(c=>s.jsxs("div",{className:"border rounded-lg p-4",children:[s.jsxs("div",{className:"flex justify-between items-start",children:[s.jsxs("div",{children:[s.jsx("h4",{className:"font-medium",children:c.title}),s.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:c.description})]}),s.jsx(vt,{variant:c.status==="scheduled"?"default":c.status==="ongoing"?"secondary":"outline",children:c.status==="scheduled"?"Запланирован":c.status==="ongoing"?"В процессе":"Завершен"})]}),s.jsxs("div",{className:"flex justify-between items-center mt-3",children:[s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(Ei,{className:"h-4 w-4 mr-1"}),s.jsx("span",{children:c.duration}),s.jsx(Sn,{className:"h-4 w-4 ml-4 mr-1"}),s.jsxs("span",{children:[c.participants," участников"]})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-4 w-4 text-yellow-500 mr-1"}),s.jsx("span",{children:c.rating})]})]}),s.jsxs("div",{className:"flex justify-between items-center mt-3",children:[s.jsxs("div",{className:"text-sm text-muted-foreground",children:[c.scheduledDate," в ",c.scheduledTime]}),s.jsxs("div",{className:"flex space-x-2",children:[c.status==="scheduled"&&s.jsxs(fe,{size:"sm",onClick:()=>l(c.id),children:[s.jsx(Gl,{className:"h-4 w-4 mr-1"}),"Начать"]}),c.status==="ongoing"&&s.jsxs(fe,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[s.jsx(zl,{className:"h-4 w-4 mr-1"}),"Завершить"]})]})]})]},c.id))})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Быстрые действия"}),s.jsx(ze,{children:"Часто используемые функции"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"space-y-4",children:[s.jsxs(fe,{className:"w-full justify-start",children:[s.jsx(Ys,{className:"h-4 w-4 mr-2"}),"Создать тур"]}),s.jsxs(fe,{variant:"outline",className:"w-full justify-start",children:[s.jsx(zs,{className:"h-4 w-4 mr-2"}),"Ответить на вопросы"]}),s.jsxs(fe,{variant:"outline",className:"w-full justify-start",children:[s.jsx(St,{className:"h-4 w-4 mr-2"}),"Показать экспонаты"]}),s.jsxs(fe,{variant:"outline",className:"w-full justify-start",children:[s.jsx(kt,{className:"h-4 w-4 mr-2"}),"Оставить отзыв"]})]})})]})]}),n==="tours"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Все туры"}),s.jsxs(fe,{children:[s.jsx(Ys,{className:"h-4 w-4 mr-2"}),"Создать тур"]})]}),s.jsx(ze,{children:"Управление виртуальными турами"})]}),s.jsx(ke,{children:s.jsx("div",{className:"overflow-x-auto",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{className:"border-b",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left p-4",children:"Название"}),s.jsx("th",{className:"text-left p-4",children:"Описание"}),s.jsx("th",{className:"text-left p-4",children:"Продолжительность"}),s.jsx("th",{className:"text-left p-4",children:"Участники"}),s.jsx("th",{className:"text-left p-4",children:"Рейтинг"}),s.jsx("th",{className:"text-left p-4",children:"Статус"}),s.jsx("th",{className:"text-left p-4",children:"Дата"}),s.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),s.jsx("tbody",{children:t.map(c=>s.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[s.jsx("td",{className:"p-4 font-medium",children:c.title}),s.jsx("td",{className:"p-4 text-sm text-muted-foreground max-w-xs truncate",children:c.description}),s.jsx("td",{className:"p-4",children:c.duration}),s.jsx("td",{className:"p-4",children:c.participants}),s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-4 w-4 text-yellow-500 mr-1"}),s.jsx("span",{children:c.rating})]})}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:c.status==="scheduled"?"default":c.status==="ongoing"?"secondary":c.status==="completed"?"outline":"destructive",children:c.status==="scheduled"?"Запланирован":c.status==="ongoing"?"В процессе":c.status==="completed"?"Завершен":"Отменен"})}),s.jsxs("td",{className:"p-4",children:[c.scheduledDate," в ",c.scheduledTime]}),s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex space-x-2",children:[c.status==="scheduled"&&s.jsxs(fe,{size:"sm",onClick:()=>l(c.id),children:[s.jsx(Gl,{className:"h-4 w-4 mr-1"}),"Начать"]}),c.status==="ongoing"&&s.jsxs(fe,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[s.jsx(zl,{className:"h-4 w-4 mr-1"}),"Завершить"]}),s.jsx(fe,{size:"sm",variant:"outline",children:s.jsx(zs,{className:"h-4 w-4"})})]})})]},c.id))})]})})})]}),n==="participants"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Участники туров"}),s.jsx(ze,{children:"Информация об участниках ваших туров"})]}),s.jsx(ke,{children:s.jsx("div",{className:"overflow-x-auto",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{className:"border-b",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left p-4",children:"Имя"}),s.jsx("th",{className:"text-left p-4",children:"Email"}),s.jsx("th",{className:"text-left p-4",children:"Присоединился к"}),s.jsx("th",{className:"text-left p-4",children:"Вовлеченность"}),s.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),s.jsx("tbody",{children:a.map(c=>s.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[s.jsx("td",{className:"p-4 font-medium",children:c.name}),s.jsx("td",{className:"p-4 text-sm text-muted-foreground",children:c.email}),s.jsx("td",{className:"p-4",children:c.joinedTour}),s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex items-center",children:[s.jsx("div",{className:"w-24 bg-muted rounded-full h-2 mr-2",children:s.jsx("div",{className:"bg-primary h-2 rounded-full",style:{width:`${c.engagement}%`}})}),s.jsxs("span",{children:[c.engagement,"%"]})]})}),s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex space-x-2",children:[s.jsx(fe,{size:"sm",variant:"outline",children:s.jsx(zs,{className:"h-4 w-4"})}),s.jsx(fe,{size:"sm",variant:"outline",children:s.jsx(Rn,{className:"h-4 w-4"})})]})})]},c.id))})]})})})]}),n==="analytics"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Аналитика туров"}),s.jsx(ze,{children:"Статистика ваших виртуальных туров"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Популярность туров"}),s.jsx(ze,{children:"Рейтинги и отзывы по турам"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[s.jsx(Ur,{className:"h-12 w-12 text-primary/20"}),s.jsx("p",{className:"ml-4 text-muted-foreground",children:"График популярности"})]})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Вовлеченность участников"}),s.jsx(ze,{children:"Уровень вовлеченности по турам"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[s.jsx(fn,{className:"h-12 w-12 text-primary/20"}),s.jsx("p",{className:"ml-4 text-muted-foreground",children:"График вовлеченности"})]})})]})]})})]})]})},Zm=()=>{const[n,e]=V.useState("dashboard"),[t,i]=V.useState([{id:1,title:"Абстрактная композиция №1",artist:"Александр Петров",currentBid:12500,bidIncrement:500,endTime:"2023-11-25T18:00:00Z",image:"/placeholder-artwork.jpg",bids:12,startingPrice:1e4,reserveMet:!0},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",currentBid:8500,bidIncrement:250,endTime:"2023-11-24T15:30:00Z",image:"/placeholder-artwork.jpg",bids:8,startingPrice:7e3,reserveMet:!0},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",currentBid:22e3,bidIncrement:1e3,endTime:"2023-11-26T20:00:00Z",image:"/placeholder-artwork.jpg",bids:21,startingPrice:2e4,reserveMet:!1}]),r=[{title:"Активные торги",value:"12",change:"+3%"},{title:"Мои ставки",value:"8",change:"+5%"},{title:"Выиграно",value:"3",change:"+2%"},{title:"Потрачено",value:"$42,500",change:"+12%"}],a=[{id:1,artworkTitle:"Абстрактная композиция №1",amount:12500,bidder:"Вы",time:"2023-11-20 14:32"},{id:2,artworkTitle:"Городской пейзаж",amount:8500,bidder:"Иван С.",time:"2023-11-19 16:45"},{id:3,artworkTitle:"Цифровая инсталляция",amount:22e3,bidder:"Вы",time:"2023-11-18 11:20"},{id:4,artworkTitle:"Портрет женщины",amount:15600,bidder:"Анна К.",time:"2023-11-17 09:15"},{id:5,artworkTitle:"Морской пейзаж",amount:7800,bidder:"Вы",time:"2023-11-16 17:30"}],l=(o,c)=>{i(t.map(d=>d.id===o?{...d,currentBid:c,bids:d.bids+1}:d))};return s.jsxs("div",{className:"container mx-auto py-8",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-3xl font-bold",children:"Участник аукциона"}),s.jsx("p",{className:"text-muted-foreground",children:"Управление ставками и участие в торгах"})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:r.map((o,c)=>s.jsxs(Ue,{children:[s.jsxs(Oe,{className:"pb-2",children:[s.jsx(ze,{children:o.title}),s.jsx(Fe,{className:"text-2xl",children:o.value})]}),s.jsx(ke,{children:s.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[s.jsx(Fr,{className:"h-4 w-4 mr-1"}),o.change]})})]},c))}),s.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[s.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),s.jsx("button",{className:`pb-3 px-1 ${n==="auctions"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("auctions"),children:"Аукционы"}),s.jsx("button",{className:`pb-3 px-1 ${n==="bids"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("bids"),children:"Мои ставки"}),s.jsx("button",{className:`pb-3 px-1 ${n==="history"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("history"),children:"История"})]}),n==="dashboard"&&s.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[s.jsxs(Ue,{className:"lg:col-span-2",children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Активные торги"}),s.jsx(fe,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),s.jsx(ze,{children:"Текущие аукционы, в которых вы можете участвовать"})]}),s.jsx(ke,{children:s.jsx("div",{className:"space-y-4",children:t.slice(0,3).map(o=>s.jsx("div",{className:"border rounded-lg p-4",children:s.jsxs("div",{className:"flex items-start space-x-4",children:[s.jsx("div",{className:"bg-muted rounded-lg p-2 flex-shrink-0",children:s.jsx(St,{className:"h-8 w-8 text-primary"})}),s.jsxs("div",{className:"flex-1",children:[s.jsxs("div",{className:"flex justify-between",children:[s.jsx("h4",{className:"font-medium",children:o.title}),s.jsx(vt,{variant:o.reserveMet?"default":"secondary",children:o.reserveMet?"Резерв превышен":"Резерв не достигнут"})]}),s.jsxs("p",{className:"text-sm text-muted-foreground",children:["Автор: ",o.artist]}),s.jsxs("div",{className:"flex justify-between items-center mt-3",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-sm text-muted-foreground",children:"Текущая ставка"}),s.jsxs("p",{className:"font-medium",children:["$",o.currentBid.toLocaleString()]})]}),s.jsxs("div",{children:[s.jsx("p",{className:"text-sm text-muted-foreground",children:"Ставок"}),s.jsx("p",{className:"font-medium",children:o.bids})]}),s.jsxs("div",{children:[s.jsx("p",{className:"text-sm text-muted-foreground",children:"До окончания"}),s.jsxs("p",{className:"font-medium",children:[s.jsx(Ei,{className:"h-4 w-4 inline mr-1"}),new Date(o.endTime).toLocaleDateString()]})]})]}),s.jsxs("div",{className:"flex justify-between items-center mt-4",children:[s.jsxs("div",{className:"flex space-x-2",children:[s.jsxs(fe,{size:"sm",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:[s.jsx(Bl,{className:"h-4 w-4 mr-1"}),"Сделать ставку"]}),s.jsxs(fe,{size:"sm",variant:"outline",children:[s.jsx(fn,{className:"h-4 w-4 mr-1"}),"Следить"]})]}),s.jsxs(fe,{size:"sm",variant:"outline",children:[s.jsx(Rn,{className:"h-4 w-4 mr-1"}),"Подробнее"]})]})]})]})},o.id))})})]}),s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Моя статистика"}),s.jsx(ze,{children:"Ваша активность на аукционах"})]}),s.jsx(ke,{children:s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(Em,{className:"h-5 w-5 text-primary mr-2"}),s.jsx("span",{children:"Выиграно лотов"})]}),s.jsx("span",{className:"font-medium",children:"3"})]}),s.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(Fm,{className:"h-5 w-5 text-primary mr-2"}),s.jsx("span",{children:"Потрачено"})]}),s.jsx("span",{className:"font-medium",children:"$42,500"})]}),s.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(Po,{className:"h-5 w-5 text-primary mr-2"}),s.jsx("span",{children:"Активные ставки"})]}),s.jsx("span",{className:"font-medium",children:"8"})]}),s.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-5 w-5 text-primary mr-2"}),s.jsx("span",{children:"Рейтинг"})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-4 w-4 text-yellow-500"}),s.jsx("span",{className:"ml-1",children:"4.7"})]})]}),s.jsxs(fe,{className:"w-full mt-4",children:[s.jsx(Hm,{className:"h-4 w-4 mr-2"}),"Пополнить баланс"]})]})})]})]}),n==="auctions"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsx(Fe,{children:"Все аукционы"}),s.jsxs(fe,{variant:"outline",children:[s.jsx(Po,{className:"h-4 w-4 mr-2"}),"Мои аукционы"]})]}),s.jsx(ze,{children:"Список всех активных и предстоящих аукционов"})]}),s.jsx(ke,{children:s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(o=>s.jsxs(Ue,{className:"overflow-hidden",children:[s.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:s.jsx(St,{className:"h-12 w-12 text-primary/20"})}),s.jsxs(Oe,{children:[s.jsx(Fe,{className:"text-lg",children:o.title}),s.jsxs(ze,{children:["Автор: ",o.artist]})]}),s.jsx(ke,{children:s.jsxs("div",{className:"space-y-3",children:[s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{className:"text-sm text-muted-foreground",children:"Текущая ставка"}),s.jsxs("span",{className:"font-medium",children:["$",o.currentBid.toLocaleString()]})]}),s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{className:"text-sm text-muted-foreground",children:"Ставок"}),s.jsx("span",{className:"font-medium",children:o.bids})]}),s.jsxs("div",{className:"flex justify-between",children:[s.jsx("span",{className:"text-sm text-muted-foreground",children:"До окончания"}),s.jsx("span",{className:"font-medium",children:new Date(o.endTime).toLocaleDateString()})]}),s.jsx("div",{className:"pt-3",children:s.jsxs(fe,{className:"w-full",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:[s.jsx(Bl,{className:"h-4 w-4 mr-2"}),"Ставка $",o.currentBid+o.bidIncrement]})})]})})]},o.id))})})]}),n==="bids"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"Мои ставки"}),s.jsx(ze,{children:"Текущие ставки, которые вы сделали"})]}),s.jsx(ke,{children:s.jsx("div",{className:"overflow-x-auto",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{className:"border-b",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left p-4",children:"Экспонат"}),s.jsx("th",{className:"text-left p-4",children:"Автор"}),s.jsx("th",{className:"text-left p-4",children:"Моя ставка"}),s.jsx("th",{className:"text-left p-4",children:"Статус"}),s.jsx("th",{className:"text-left p-4",children:"До окончания"}),s.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),s.jsx("tbody",{children:t.map(o=>s.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[s.jsx("td",{className:"p-4 font-medium",children:o.title}),s.jsx("td",{className:"p-4",children:o.artist}),s.jsxs("td",{className:"p-4 font-medium",children:["$",o.currentBid.toLocaleString()]}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:o.bids>0?"default":"secondary",children:o.bids>0?"Активна":"Ожидание"})}),s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex items-center",children:[s.jsx(Ei,{className:"h-4 w-4 mr-1"}),new Date(o.endTime).toLocaleDateString()]})}),s.jsx("td",{className:"p-4",children:s.jsxs("div",{className:"flex space-x-2",children:[s.jsx(fe,{size:"sm",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:"Повысить"}),s.jsx(fe,{size:"sm",variant:"outline",children:"Отменить"})]})})]},o.id))})]})})})]}),n==="history"&&s.jsxs(Ue,{children:[s.jsxs(Oe,{children:[s.jsx(Fe,{children:"История торгов"}),s.jsx(ze,{children:"Ваши прошлые участия в аукционах"})]}),s.jsx(ke,{children:s.jsx("div",{className:"overflow-x-auto",children:s.jsxs("table",{className:"w-full",children:[s.jsx("thead",{className:"border-b",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left p-4",children:"Экспонат"}),s.jsx("th",{className:"text-left p-4",children:"Ставка"}),s.jsx("th",{className:"text-left p-4",children:"Участник"}),s.jsx("th",{className:"text-left p-4",children:"Время"}),s.jsx("th",{className:"text-left p-4",children:"Результат"})]})}),s.jsx("tbody",{children:a.map(o=>s.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[s.jsx("td",{className:"p-4 font-medium",children:o.artworkTitle}),s.jsxs("td",{className:"p-4",children:["$",o.amount.toLocaleString()]}),s.jsx("td",{className:"p-4",children:o.bidder}),s.jsx("td",{className:"p-4",children:o.time}),s.jsx("td",{className:"p-4",children:s.jsx(vt,{variant:o.bidder==="Вы"?"default":"secondary",children:o.bidder==="Вы"?"Выиграно":"Проиграно"})})]},o.id))})]})})})]})]})};function Xu(n,e){return function(){return n.apply(e,arguments)}}const{toString:Jm}=Object.prototype,{getPrototypeOf:ha}=Object,{iterator:fa,toStringTag:qu}=Symbol,pa=(n=>e=>{const t=Jm.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())})(Object.create(null)),En=n=>(n=n.toLowerCase(),e=>pa(e)===n),ma=n=>e=>typeof e===n,{isArray:Mi}=Array,ir=ma("undefined");function fr(n){return n!==null&&!ir(n)&&n.constructor!==null&&!ir(n.constructor)&&Jt(n.constructor.isBuffer)&&n.constructor.isBuffer(n)}const $u=En("ArrayBuffer");function Qm(n){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(n):e=n&&n.buffer&&$u(n.buffer),e}const eg=ma("string"),Jt=ma("function"),Yu=ma("number"),Gr=n=>n!==null&&typeof n=="object",tg=n=>n===!0||n===!1,Hs=n=>{if(pa(n)!=="object")return!1;const e=ha(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(qu in n)&&!(fa in n)},ng=n=>{if(!Gr(n)||fr(n))return!1;try{return Object.keys(n).length===0&&Object.getPrototypeOf(n)===Object.prototype}catch{return!1}},ig=En("Date"),rg=En("File"),sg=n=>!!(n&&typeof n.uri<"u"),ag=n=>n&&typeof n.getParts<"u",og=En("Blob"),lg=En("FileList"),cg=n=>Gr(n)&&Jt(n.pipe);function dg(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Xl=dg(),ql=typeof Xl.FormData<"u"?Xl.FormData:void 0,ug=n=>{if(!n)return!1;if(ql&&n instanceof ql)return!0;const e=ha(n);if(!e||e===Object.prototype||!Jt(n.append))return!1;const t=pa(n);return t==="formdata"||t==="object"&&Jt(n.toString)&&n.toString()==="[object FormData]"},hg=En("URLSearchParams"),[fg,pg,mg,gg]=["ReadableStream","Request","Response","Headers"].map(En),xg=n=>n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Vr(n,e,{allOwnKeys:t=!1}={}){if(n===null||typeof n>"u")return;let i,r;if(typeof n!="object"&&(n=[n]),Mi(n))for(i=0,r=n.length;i<r;i++)e.call(null,n[i],i,n);else{if(fr(n))return;const a=t?Object.getOwnPropertyNames(n):Object.keys(n),l=a.length;let o;for(i=0;i<l;i++)o=a[i],e.call(null,n[o],o,n)}}function Ku(n,e){if(fr(n))return null;e=e.toLowerCase();const t=Object.keys(n);let i=t.length,r;for(;i-- >0;)if(r=t[i],e===r.toLowerCase())return r;return null}const vi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Zu=n=>!ir(n)&&n!==vi;function Lo(...n){const{caseless:e,skipUndefined:t}=Zu(this)&&this||{},i={},r=(a,l)=>{if(l==="__proto__"||l==="constructor"||l==="prototype")return;const o=e&&typeof l=="string"&&Ku(i,l)||l,c=jo(i,o)?i[o]:void 0;Hs(c)&&Hs(a)?i[o]=Lo(c,a):Hs(a)?i[o]=Lo({},a):Mi(a)?i[o]=a.slice():(!t||!ir(a))&&(i[o]=a)};for(let a=0,l=n.length;a<l;a++){const o=n[a];if(!o||fr(o)||(Vr(o,r),typeof o!="object"||Mi(o)))continue;const c=Object.getOwnPropertySymbols(o);for(let d=0;d<c.length;d++){const u=c[d];Cg.call(o,u)&&r(o[u],u)}}return i}const _g=(n,e,t,{allOwnKeys:i}={})=>(Vr(e,(r,a)=>{t&&Jt(r)?Object.defineProperty(n,a,{__proto__:null,value:Xu(r,t),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(n,a,{__proto__:null,value:r,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:i}),n),vg=n=>(n.charCodeAt(0)===65279&&(n=n.slice(1)),n),yg=(n,e,t,i)=>{n.prototype=Object.create(e.prototype,i),Object.defineProperty(n.prototype,"constructor",{__proto__:null,value:n,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(n,"super",{__proto__:null,value:e.prototype}),t&&Object.assign(n.prototype,t)},bg=(n,e,t,i)=>{let r,a,l;const o={};if(e=e||{},n==null)return e;do{for(r=Object.getOwnPropertyNames(n),a=r.length;a-- >0;)l=r[a],(!i||i(l,n,e))&&!o[l]&&(e[l]=n[l],o[l]=!0);n=t!==!1&&ha(n)}while(n&&(!t||t(n,e))&&n!==Object.prototype);return e},Sg=(n,e,t)=>{n=String(n),(t===void 0||t>n.length)&&(t=n.length),t-=e.length;const i=n.indexOf(e,t);return i!==-1&&i===t},wg=n=>{if(!n)return null;if(Mi(n))return n;let e=n.length;if(!Yu(e))return null;const t=new Array(e);for(;e-- >0;)t[e]=n[e];return t},Eg=(n=>e=>n&&e instanceof n)(typeof Uint8Array<"u"&&ha(Uint8Array)),Mg=(n,e)=>{const i=(n&&n[fa]).call(n);let r;for(;(r=i.next())&&!r.done;){const a=r.value;e.call(n,a[0],a[1])}},Tg=(n,e)=>{let t;const i=[];for(;(t=n.exec(e))!==null;)i.push(t);return i},Ag=En("HTMLFormElement"),Rg=n=>n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(t,i,r){return i.toUpperCase()+r}),jo=(({hasOwnProperty:n})=>(e,t)=>n.call(e,t))(Object.prototype),{propertyIsEnumerable:Cg}=Object.prototype,Ng=En("RegExp"),Ju=(n,e)=>{const t=Object.getOwnPropertyDescriptors(n),i={};Vr(t,(r,a)=>{let l;(l=e(r,a,n))!==!1&&(i[a]=l||r)}),Object.defineProperties(n,i)},Pg=n=>{Ju(n,(e,t)=>{if(Jt(n)&&["arguments","caller","callee"].includes(t))return!1;const i=n[t];if(Jt(i)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+t+"'")})}})},Lg=(n,e)=>{const t={},i=r=>{r.forEach(a=>{t[a]=!0})};return Mi(n)?i(n):i(String(n).split(e)),t},jg=()=>{},Dg=(n,e)=>n!=null&&Number.isFinite(n=+n)?n:e;function Ig(n){return!!(n&&Jt(n.append)&&n[qu]==="FormData"&&n[fa])}const Ug=n=>{const e=new WeakSet,t=i=>{if(Gr(i)){if(e.has(i))return;if(fr(i))return i;if(!("toJSON"in i)){e.add(i);const r=Mi(i)?[]:{};return Vr(i,(a,l)=>{const o=t(a);!ir(o)&&(r[l]=o)}),e.delete(i),r}}return i};return t(n)},Og=En("AsyncFunction"),Fg=n=>n&&(Gr(n)||Jt(n))&&Jt(n.then)&&Jt(n.catch),Qu=((n,e)=>n?setImmediate:e?((t,i)=>(vi.addEventListener("message",({source:r,data:a})=>{r===vi&&a===t&&i.length&&i.shift()()},!1),r=>{i.push(r),vi.postMessage(t,"*")}))(`axios@${Math.random()}`,[]):t=>setTimeout(t))(typeof setImmediate=="function",Jt(vi.postMessage)),kg=typeof queueMicrotask<"u"?queueMicrotask.bind(vi):typeof process<"u"&&process.nextTick||Qu,Bg=n=>n!=null&&Jt(n[fa]),H={isArray:Mi,isArrayBuffer:$u,isBuffer:fr,isFormData:ug,isArrayBufferView:Qm,isString:eg,isNumber:Yu,isBoolean:tg,isObject:Gr,isPlainObject:Hs,isEmptyObject:ng,isReadableStream:fg,isRequest:pg,isResponse:mg,isHeaders:gg,isUndefined:ir,isDate:ig,isFile:rg,isReactNativeBlob:sg,isReactNative:ag,isBlob:og,isRegExp:Ng,isFunction:Jt,isStream:cg,isURLSearchParams:hg,isTypedArray:Eg,isFileList:lg,forEach:Vr,merge:Lo,extend:_g,trim:xg,stripBOM:vg,inherits:yg,toFlatObject:bg,kindOf:pa,kindOfTest:En,endsWith:Sg,toArray:wg,forEachEntry:Mg,matchAll:Tg,isHTMLForm:Ag,hasOwnProperty:jo,hasOwnProp:jo,reduceDescriptors:Ju,freezeMethods:Pg,toObjectSet:Lg,toCamelCase:Rg,noop:jg,toFiniteNumber:Dg,findKey:Ku,global:vi,isContextDefined:Zu,isSpecCompliantForm:Ig,toJSONObject:Ug,isAsyncFn:Og,isThenable:Fg,setImmediate:Qu,asap:kg,isIterable:Bg},zg=H.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Hg=n=>{const e={};let t,i,r;return n&&n.split(`
`).forEach(function(l){r=l.indexOf(":"),t=l.substring(0,r).trim().toLowerCase(),i=l.substring(r+1).trim(),!(!t||e[t]&&zg[t])&&(t==="set-cookie"?e[t]?e[t].push(i):e[t]=[i]:e[t]=e[t]?e[t]+", "+i:i)}),e};function Gg(n){let e=0,t=n.length;for(;e<t;){const i=n.charCodeAt(e);if(i!==9&&i!==32)break;e+=1}for(;t>e;){const i=n.charCodeAt(t-1);if(i!==9&&i!==32)break;t-=1}return e===0&&t===n.length?n:n.slice(e,t)}const Vg=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),Wg=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function sl(n,e){return H.isArray(n)?n.map(t=>sl(t,e)):Gg(String(n).replace(e,""))}const Xg=n=>sl(n,Vg),qg=n=>sl(n,Wg);function eh(n){const e=Object.create(null);return H.forEach(n.toJSON(),(t,i)=>{e[i]=qg(t)}),e}const $l=Symbol("internals");function vr(n){return n&&String(n).trim().toLowerCase()}function Gs(n){return n===!1||n==null?n:H.isArray(n)?n.map(Gs):Xg(String(n))}function $g(n){const e=Object.create(null),t=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=t.exec(n);)e[i[1]]=i[2];return e}const Yg=n=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());function Pa(n,e,t,i,r){if(H.isFunction(i))return i.call(this,e,t);if(r&&(e=t),!!H.isString(e)){if(H.isString(i))return e.indexOf(i)!==-1;if(H.isRegExp(i))return i.test(e)}}function Kg(n){return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,i)=>t.toUpperCase()+i)}function Zg(n,e){const t=H.toCamelCase(" "+e);["get","set","has"].forEach(i=>{Object.defineProperty(n,i+t,{__proto__:null,value:function(r,a,l){return this[i].call(this,e,r,a,l)},configurable:!0})})}let qt=class{constructor(e){e&&this.set(e)}set(e,t,i){const r=this;function a(o,c,d){const u=vr(c);if(!u)return;const f=H.findKey(r,u);(!f||r[f]===void 0||d===!0||d===void 0&&r[f]!==!1)&&(r[f||c]=Gs(o))}const l=(o,c)=>H.forEach(o,(d,u)=>a(d,u,c));if(H.isPlainObject(e)||e instanceof this.constructor)l(e,t);else if(H.isString(e)&&(e=e.trim())&&!Yg(e))l(Hg(e),t);else if(H.isObject(e)&&H.isIterable(e)){let o={},c,d;for(const u of e){if(!H.isArray(u))throw new TypeError("Object iterator must return a key-value pair");o[d=u[0]]=(c=o[d])?H.isArray(c)?[...c,u[1]]:[c,u[1]]:u[1]}l(o,t)}else e!=null&&a(t,e,i);return this}get(e,t){if(e=vr(e),e){const i=H.findKey(this,e);if(i){const r=this[i];if(!t)return r;if(t===!0)return $g(r);if(H.isFunction(t))return t.call(this,r,i);if(H.isRegExp(t))return t.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=vr(e),e){const i=H.findKey(this,e);return!!(i&&this[i]!==void 0&&(!t||Pa(this,this[i],i,t)))}return!1}delete(e,t){const i=this;let r=!1;function a(l){if(l=vr(l),l){const o=H.findKey(i,l);o&&(!t||Pa(i,i[o],o,t))&&(delete i[o],r=!0)}}return H.isArray(e)?e.forEach(a):a(e),r}clear(e){const t=Object.keys(this);let i=t.length,r=!1;for(;i--;){const a=t[i];(!e||Pa(this,this[a],a,e,!0))&&(delete this[a],r=!0)}return r}normalize(e){const t=this,i={};return H.forEach(this,(r,a)=>{const l=H.findKey(i,a);if(l){t[l]=Gs(r),delete t[a];return}const o=e?Kg(a):String(a).trim();o!==a&&delete t[a],t[o]=Gs(r),i[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return H.forEach(this,(i,r)=>{i!=null&&i!==!1&&(t[r]=e&&H.isArray(i)?i.join(", "):i)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const i=new this(e);return t.forEach(r=>i.set(r)),i}static accessor(e){const i=(this[$l]=this[$l]={accessors:{}}).accessors,r=this.prototype;function a(l){const o=vr(l);i[o]||(Zg(r,l),i[o]=!0)}return H.isArray(e)?e.forEach(a):a(e),this}};qt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);H.reduceDescriptors(qt.prototype,({value:n},e)=>{let t=e[0].toUpperCase()+e.slice(1);return{get:()=>n,set(i){this[t]=i}}});H.freezeMethods(qt);const Jg="[REDACTED ****]";function Qg(n){if(H.hasOwnProp(n,"toJSON"))return!0;let e=Object.getPrototypeOf(n);for(;e&&e!==Object.prototype;){if(H.hasOwnProp(e,"toJSON"))return!0;e=Object.getPrototypeOf(e)}return!1}function ex(n,e){const t=new Set(e.map(a=>String(a).toLowerCase())),i=[],r=a=>{if(a===null||typeof a!="object"||H.isBuffer(a))return a;if(i.indexOf(a)!==-1)return;a instanceof qt&&(a=a.toJSON()),i.push(a);let l;if(H.isArray(a))l=[],a.forEach((o,c)=>{const d=r(o);H.isUndefined(d)||(l[c]=d)});else{if(!H.isPlainObject(a)&&Qg(a))return i.pop(),a;l=Object.create(null);for(const[o,c]of Object.entries(a)){const d=t.has(o.toLowerCase())?Jg:r(c);H.isUndefined(d)||(l[o]=d)}}return i.pop(),l};return r(n)}let Re=class th extends Error{static from(e,t,i,r,a,l){const o=new th(e.message,t||e.code,i,r,a);return o.cause=e,o.name=e.name,e.status!=null&&o.status==null&&(o.status=e.status),l&&Object.assign(o,l),o}constructor(e,t,i,r,a){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,t&&(this.code=t),i&&(this.config=i),r&&(this.request=r),a&&(this.response=a,this.status=a.status)}toJSON(){const e=this.config,t=e&&H.hasOwnProp(e,"redact")?e.redact:void 0,i=H.isArray(t)&&t.length>0?ex(e,t):H.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:i,code:this.code,status:this.status}}};Re.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Re.ERR_BAD_OPTION="ERR_BAD_OPTION";Re.ECONNABORTED="ECONNABORTED";Re.ETIMEDOUT="ETIMEDOUT";Re.ECONNREFUSED="ECONNREFUSED";Re.ERR_NETWORK="ERR_NETWORK";Re.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Re.ERR_DEPRECATED="ERR_DEPRECATED";Re.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Re.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Re.ERR_CANCELED="ERR_CANCELED";Re.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Re.ERR_INVALID_URL="ERR_INVALID_URL";Re.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const tx=null;function Do(n){return H.isPlainObject(n)||H.isArray(n)}function nh(n){return H.endsWith(n,"[]")?n.slice(0,-2):n}function La(n,e,t){return n?n.concat(e).map(function(r,a){return r=nh(r),!t&&a?"["+r+"]":r}).join(t?".":""):e}function nx(n){return H.isArray(n)&&!n.some(Do)}const ix=H.toFlatObject(H,{},null,function(e){return/^is[A-Z]/.test(e)});function ga(n,e,t){if(!H.isObject(n))throw new TypeError("target must be an object");e=e||new FormData,t=H.toFlatObject(t,{metaTokens:!0,dots:!1,indexes:!1},!1,function(m,p){return!H.isUndefined(p[m])});const i=t.metaTokens,r=t.visitor||f,a=t.dots,l=t.indexes,o=t.Blob||typeof Blob<"u"&&Blob,c=t.maxDepth===void 0?100:t.maxDepth,d=o&&H.isSpecCompliantForm(e);if(!H.isFunction(r))throw new TypeError("visitor must be a function");function u(x){if(x===null)return"";if(H.isDate(x))return x.toISOString();if(H.isBoolean(x))return x.toString();if(!d&&H.isBlob(x))throw new Re("Blob is not supported. Use a Buffer instead.");return H.isArrayBuffer(x)||H.isTypedArray(x)?d&&typeof Blob=="function"?new Blob([x]):Buffer.from(x):x}function f(x,m,p){let y=x;if(H.isReactNative(e)&&H.isReactNativeBlob(x))return e.append(La(p,m,a),u(x)),!1;if(x&&!p&&typeof x=="object"){if(H.endsWith(m,"{}"))m=i?m:m.slice(0,-2),x=JSON.stringify(x);else if(H.isArray(x)&&nx(x)||(H.isFileList(x)||H.endsWith(m,"[]"))&&(y=H.toArray(x)))return m=nh(m),y.forEach(function(E,S){!(H.isUndefined(E)||E===null)&&e.append(l===!0?La([m],S,a):l===null?m:m+"[]",u(E))}),!1}return Do(x)?!0:(e.append(La(p,m,a),u(x)),!1)}const h=[],g=Object.assign(ix,{defaultVisitor:f,convertValue:u,isVisitable:Do});function v(x,m,p=0){if(!H.isUndefined(x)){if(p>c)throw new Re("Object is too deeply nested ("+p+" levels). Max depth: "+c,Re.ERR_FORM_DATA_DEPTH_EXCEEDED);if(h.indexOf(x)!==-1)throw new Error("Circular reference detected in "+m.join("."));h.push(x),H.forEach(x,function(_,E){(!(H.isUndefined(_)||_===null)&&r.call(e,_,H.isString(E)?E.trim():E,m,g))===!0&&v(_,m?m.concat(E):[E],p+1)}),h.pop()}}if(!H.isObject(n))throw new TypeError("data must be an object");return v(n),e}function Yl(n){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(n).replace(/[!'()~]|%20/g,function(i){return e[i]})}function al(n,e){this._pairs=[],n&&ga(n,this,e)}const ih=al.prototype;ih.append=function(e,t){this._pairs.push([e,t])};ih.toString=function(e){const t=e?function(i){return e.call(this,i,Yl)}:Yl;return this._pairs.map(function(r){return t(r[0])+"="+t(r[1])},"").join("&")};function rx(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function rh(n,e,t){if(!e)return n;const i=t&&t.encode||rx,r=H.isFunction(t)?{serialize:t}:t,a=r&&r.serialize;let l;if(a?l=a(e,r):l=H.isURLSearchParams(e)?e.toString():new al(e,r).toString(i),l){const o=n.indexOf("#");o!==-1&&(n=n.slice(0,o)),n+=(n.indexOf("?")===-1?"?":"&")+l}return n}class Kl{constructor(){this.handlers=[]}use(e,t,i){return this.handlers.push({fulfilled:e,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){H.forEach(this.handlers,function(i){i!==null&&e(i)})}}const ol={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1},sx=typeof URLSearchParams<"u"?URLSearchParams:al,ax=typeof FormData<"u"?FormData:null,ox=typeof Blob<"u"?Blob:null,lx={isBrowser:!0,classes:{URLSearchParams:sx,FormData:ax,Blob:ox},protocols:["http","https","file","blob","url","data"]},ll=typeof window<"u"&&typeof document<"u",Io=typeof navigator=="object"&&navigator||void 0,cx=ll&&(!Io||["ReactNative","NativeScript","NS"].indexOf(Io.product)<0),dx=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",ux=ll&&window.location.href||"http://localhost",hx=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ll,hasStandardBrowserEnv:cx,hasStandardBrowserWebWorkerEnv:dx,navigator:Io,origin:ux},Symbol.toStringTag,{value:"Module"})),Ft={...hx,...lx};function fx(n,e){return ga(n,new Ft.classes.URLSearchParams,{visitor:function(t,i,r,a){return Ft.isNode&&H.isBuffer(t)?(this.append(i,t.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...e})}function px(n){return H.matchAll(/\w+|\[(\w*)]/g,n).map(e=>e[0]==="[]"?"":e[1]||e[0])}function mx(n){const e={},t=Object.keys(n);let i;const r=t.length;let a;for(i=0;i<r;i++)a=t[i],e[a]=n[a];return e}function sh(n){function e(t,i,r,a){let l=t[a++];if(l==="__proto__")return!0;const o=Number.isFinite(+l),c=a>=t.length;return l=!l&&H.isArray(r)?r.length:l,c?(H.hasOwnProp(r,l)?r[l]=H.isArray(r[l])?r[l].concat(i):[r[l],i]:r[l]=i,!o):((!H.hasOwnProp(r,l)||!H.isObject(r[l]))&&(r[l]=[]),e(t,i,r[l],a)&&H.isArray(r[l])&&(r[l]=mx(r[l])),!o)}if(H.isFormData(n)&&H.isFunction(n.entries)){const t={};return H.forEachEntry(n,(i,r)=>{e(px(i),r,t,0)}),t}return null}const Li=(n,e)=>n!=null&&H.hasOwnProp(n,e)?n[e]:void 0;function gx(n,e,t){if(H.isString(n))try{return(e||JSON.parse)(n),H.trim(n)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(n)}const Wr={transitional:ol,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const i=t.getContentType()||"",r=i.indexOf("application/json")>-1,a=H.isObject(e);if(a&&H.isHTMLForm(e)&&(e=new FormData(e)),H.isFormData(e))return r?JSON.stringify(sh(e)):e;if(H.isArrayBuffer(e)||H.isBuffer(e)||H.isStream(e)||H.isFile(e)||H.isBlob(e)||H.isReadableStream(e))return e;if(H.isArrayBufferView(e))return e.buffer;if(H.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let o;if(a){const c=Li(this,"formSerializer");if(i.indexOf("application/x-www-form-urlencoded")>-1)return fx(e,c).toString();if((o=H.isFileList(e))||i.indexOf("multipart/form-data")>-1){const d=Li(this,"env"),u=d&&d.FormData;return ga(o?{"files[]":e}:e,u&&new u,c)}}return a||r?(t.setContentType("application/json",!1),gx(e)):e}],transformResponse:[function(e){const t=Li(this,"transitional")||Wr.transitional,i=t&&t.forcedJSONParsing,r=Li(this,"responseType"),a=r==="json";if(H.isResponse(e)||H.isReadableStream(e))return e;if(e&&H.isString(e)&&(i&&!r||a)){const o=!(t&&t.silentJSONParsing)&&a;try{return JSON.parse(e,Li(this,"parseReviver"))}catch(c){if(o)throw c.name==="SyntaxError"?Re.from(c,Re.ERR_BAD_RESPONSE,this,null,Li(this,"response")):c}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ft.classes.FormData,Blob:Ft.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};H.forEach(["delete","get","head","post","put","patch","query"],n=>{Wr.headers[n]={}});function ja(n,e){const t=this||Wr,i=e||t,r=qt.from(i.headers);let a=i.data;return H.forEach(n,function(o){a=o.call(t,a,r.normalize(),e?e.status:void 0)}),r.normalize(),a}function ah(n){return!!(n&&n.__CANCEL__)}let Xr=class extends Re{constructor(e,t,i){super(e??"canceled",Re.ERR_CANCELED,t,i),this.name="CanceledError",this.__CANCEL__=!0}};function oh(n,e,t){const i=t.config.validateStatus;!t.status||!i||i(t.status)?n(t):e(new Re("Request failed with status code "+t.status,t.status>=400&&t.status<500?Re.ERR_BAD_REQUEST:Re.ERR_BAD_RESPONSE,t.config,t.request,t))}function xx(n){const e=/^([-+\w]{1,25}):(?:\/\/)?/.exec(n);return e&&e[1]||""}function _x(n,e){n=n||10;const t=new Array(n),i=new Array(n);let r=0,a=0,l;return e=e!==void 0?e:1e3,function(c){const d=Date.now(),u=i[a];l||(l=d),t[r]=c,i[r]=d;let f=a,h=0;for(;f!==r;)h+=t[f++],f=f%n;if(r=(r+1)%n,r===a&&(a=(a+1)%n),d-l<e)return;const g=u&&d-u;return g?Math.round(h*1e3/g):void 0}}function vx(n,e){let t=0,i=1e3/e,r,a;const l=(d,u=Date.now())=>{t=u,r=null,a&&(clearTimeout(a),a=null),n(...d)};return[(...d)=>{const u=Date.now(),f=u-t;f>=i?l(d,u):(r=d,a||(a=setTimeout(()=>{a=null,l(r)},i-f)))},()=>r&&l(r)]}const Ks=(n,e,t=3)=>{let i=0;const r=_x(50,250);return vx(a=>{if(!a||typeof a.loaded!="number")return;const l=a.loaded,o=a.lengthComputable?a.total:void 0,c=o!=null?Math.min(l,o):l,d=Math.max(0,c-i),u=r(d);i=Math.max(i,c);const f={loaded:c,total:o,progress:o?c/o:void 0,bytes:d,rate:u||void 0,estimated:u&&o?(o-c)/u:void 0,event:a,lengthComputable:o!=null,[e?"download":"upload"]:!0};n(f)},t)},Zl=(n,e)=>{const t=n!=null;return[i=>e[0]({lengthComputable:t,total:n,loaded:i}),e[1]]},Jl=n=>(...e)=>H.asap(()=>n(...e)),yx=Ft.hasStandardBrowserEnv?((n,e)=>t=>(t=new URL(t,Ft.origin),n.protocol===t.protocol&&n.host===t.host&&(e||n.port===t.port)))(new URL(Ft.origin),Ft.navigator&&/(msie|trident)/i.test(Ft.navigator.userAgent)):()=>!0,bx=Ft.hasStandardBrowserEnv?{write(n,e,t,i,r,a,l){if(typeof document>"u")return;const o=[`${n}=${encodeURIComponent(e)}`];H.isNumber(t)&&o.push(`expires=${new Date(t).toUTCString()}`),H.isString(i)&&o.push(`path=${i}`),H.isString(r)&&o.push(`domain=${r}`),a===!0&&o.push("secure"),H.isString(l)&&o.push(`SameSite=${l}`),document.cookie=o.join("; ")},read(n){if(typeof document>"u")return null;const e=document.cookie.split(";");for(let t=0;t<e.length;t++){const i=e[t].replace(/^\s+/,""),r=i.indexOf("=");if(r!==-1&&i.slice(0,r)===n)return decodeURIComponent(i.slice(r+1))}return null},remove(n){this.write(n,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function Sx(n){return typeof n!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(n)}function wx(n,e){return e?n.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):n}function lh(n,e,t){let i=!Sx(e);return n&&(i||t===!1)?wx(n,e):e}const Ql=n=>n instanceof qt?{...n}:n;function Ti(n,e){e=e||{};const t=Object.create(null);Object.defineProperty(t,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function i(d,u,f,h){return H.isPlainObject(d)&&H.isPlainObject(u)?H.merge.call({caseless:h},d,u):H.isPlainObject(u)?H.merge({},u):H.isArray(u)?u.slice():u}function r(d,u,f,h){if(H.isUndefined(u)){if(!H.isUndefined(d))return i(void 0,d,f,h)}else return i(d,u,f,h)}function a(d,u){if(!H.isUndefined(u))return i(void 0,u)}function l(d,u){if(H.isUndefined(u)){if(!H.isUndefined(d))return i(void 0,d)}else return i(void 0,u)}function o(d,u,f){if(H.hasOwnProp(e,f))return i(d,u);if(H.hasOwnProp(n,f))return i(void 0,d)}const c={url:a,method:a,data:a,baseURL:l,transformRequest:l,transformResponse:l,paramsSerializer:l,timeout:l,timeoutMessage:l,withCredentials:l,withXSRFToken:l,adapter:l,responseType:l,xsrfCookieName:l,xsrfHeaderName:l,onUploadProgress:l,onDownloadProgress:l,decompress:l,maxContentLength:l,maxBodyLength:l,beforeRedirect:l,transport:l,httpAgent:l,httpsAgent:l,cancelToken:l,socketPath:l,allowedSocketPaths:l,responseEncoding:l,validateStatus:o,headers:(d,u,f)=>r(Ql(d),Ql(u),f,!0)};return H.forEach(Object.keys({...n,...e}),function(u){if(u==="__proto__"||u==="constructor"||u==="prototype")return;const f=H.hasOwnProp(c,u)?c[u]:r,h=H.hasOwnProp(n,u)?n[u]:void 0,g=H.hasOwnProp(e,u)?e[u]:void 0,v=f(h,g,u);H.isUndefined(v)&&f!==o||(t[u]=v)}),t}const Ex=["content-type","content-length"];function Mx(n,e,t){if(t!=="content-only"){n.set(e);return}Object.entries(e).forEach(([i,r])=>{Ex.includes(i.toLowerCase())&&n.set(i,r)})}const Tx=n=>encodeURIComponent(n).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16)));function ch(n){const e=Ti({},n),t=h=>H.hasOwnProp(e,h)?e[h]:void 0,i=t("data");let r=t("withXSRFToken");const a=t("xsrfHeaderName"),l=t("xsrfCookieName");let o=t("headers");const c=t("auth"),d=t("baseURL"),u=t("allowAbsoluteUrls"),f=t("url");if(e.headers=o=qt.from(o),e.url=rh(lh(d,f,u),t("params"),t("paramsSerializer")),c&&o.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?Tx(c.password):""))),H.isFormData(i)&&(Ft.hasStandardBrowserEnv||Ft.hasStandardBrowserWebWorkerEnv||H.isReactNative(i)?o.setContentType(void 0):H.isFunction(i.getHeaders)&&Mx(o,i.getHeaders(),t("formDataHeaderPolicy"))),Ft.hasStandardBrowserEnv&&(H.isFunction(r)&&(r=r(e)),r===!0||r==null&&yx(e.url))){const g=a&&l&&bx.read(l);g&&o.set(a,g)}return e}const Ax=typeof XMLHttpRequest<"u",Rx=Ax&&function(n){return new Promise(function(t,i){const r=ch(n);let a=r.data;const l=qt.from(r.headers).normalize();let{responseType:o,onUploadProgress:c,onDownloadProgress:d}=r,u,f,h,g,v;function x(){g&&g(),v&&v(),r.cancelToken&&r.cancelToken.unsubscribe(u),r.signal&&r.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(r.method.toUpperCase(),r.url,!0),m.timeout=r.timeout;function p(){if(!m)return;const _=qt.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),S={data:!o||o==="text"||o==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:_,config:n,request:m};oh(function(T){t(T),x()},function(T){i(T),x()},S),m=null}"onloadend"in m?m.onloadend=p:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.startsWith("file:"))||setTimeout(p)},m.onabort=function(){m&&(i(new Re("Request aborted",Re.ECONNABORTED,n,m)),x(),m=null)},m.onerror=function(E){const S=E&&E.message?E.message:"Network Error",A=new Re(S,Re.ERR_NETWORK,n,m);A.event=E||null,i(A),x(),m=null},m.ontimeout=function(){let E=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const S=r.transitional||ol;r.timeoutErrorMessage&&(E=r.timeoutErrorMessage),i(new Re(E,S.clarifyTimeoutError?Re.ETIMEDOUT:Re.ECONNABORTED,n,m)),x(),m=null},a===void 0&&l.setContentType(null),"setRequestHeader"in m&&H.forEach(eh(l),function(E,S){m.setRequestHeader(S,E)}),H.isUndefined(r.withCredentials)||(m.withCredentials=!!r.withCredentials),o&&o!=="json"&&(m.responseType=r.responseType),d&&([h,v]=Ks(d,!0),m.addEventListener("progress",h)),c&&m.upload&&([f,g]=Ks(c),m.upload.addEventListener("progress",f),m.upload.addEventListener("loadend",g)),(r.cancelToken||r.signal)&&(u=_=>{m&&(i(!_||_.type?new Xr(null,n,m):_),m.abort(),x(),m=null)},r.cancelToken&&r.cancelToken.subscribe(u),r.signal&&(r.signal.aborted?u():r.signal.addEventListener("abort",u)));const y=xx(r.url);if(y&&!Ft.protocols.includes(y)){i(new Re("Unsupported protocol "+y+":",Re.ERR_BAD_REQUEST,n));return}m.send(a||null)})},Cx=(n,e)=>{if(n=n?n.filter(Boolean):[],!e&&!n.length)return;const t=new AbortController;let i=!1;const r=function(c){if(!i){i=!0,l();const d=c instanceof Error?c:this.reason;t.abort(d instanceof Re?d:new Xr(d instanceof Error?d.message:d))}};let a=e&&setTimeout(()=>{a=null,r(new Re(`timeout of ${e}ms exceeded`,Re.ETIMEDOUT))},e);const l=()=>{n&&(a&&clearTimeout(a),a=null,n.forEach(c=>{c.unsubscribe?c.unsubscribe(r):c.removeEventListener("abort",r)}),n=null)};n.forEach(c=>c.addEventListener("abort",r));const{signal:o}=t;return o.unsubscribe=()=>H.asap(l),o},Nx=function*(n,e){let t=n.byteLength;if(t<e){yield n;return}let i=0,r;for(;i<t;)r=i+e,yield n.slice(i,r),i=r},Px=async function*(n,e){for await(const t of Lx(n))yield*Nx(t,e)},Lx=async function*(n){if(n[Symbol.asyncIterator]){yield*n;return}const e=n.getReader();try{for(;;){const{done:t,value:i}=await e.read();if(t)break;yield i}}finally{await e.cancel()}},ec=(n,e,t,i)=>{const r=Px(n,e);let a=0,l,o=c=>{l||(l=!0,i&&i(c))};return new ReadableStream({async pull(c){try{const{done:d,value:u}=await r.next();if(d){o(),c.close();return}let f=u.byteLength;if(t){let h=a+=f;t(h)}c.enqueue(new Uint8Array(u))}catch(d){throw o(d),d}},cancel(c){return o(c),r.return()}},{highWaterMark:2})};function jx(n){if(!n||typeof n!="string"||!n.startsWith("data:"))return 0;const e=n.indexOf(",");if(e<0)return 0;const t=n.slice(5,e),i=n.slice(e+1);if(/;base64/i.test(t)){let l=i.length;const o=i.length;for(let g=0;g<o;g++)if(i.charCodeAt(g)===37&&g+2<o){const v=i.charCodeAt(g+1),x=i.charCodeAt(g+2);(v>=48&&v<=57||v>=65&&v<=70||v>=97&&v<=102)&&(x>=48&&x<=57||x>=65&&x<=70||x>=97&&x<=102)&&(l-=2,g+=2)}let c=0,d=o-1;const u=g=>g>=2&&i.charCodeAt(g-2)===37&&i.charCodeAt(g-1)===51&&(i.charCodeAt(g)===68||i.charCodeAt(g)===100);d>=0&&(i.charCodeAt(d)===61?(c++,d--):u(d)&&(c++,d-=3)),c===1&&d>=0&&(i.charCodeAt(d)===61||u(d))&&c++;const h=Math.floor(l/4)*3-(c||0);return h>0?h:0}if(typeof Buffer<"u"&&typeof Buffer.byteLength=="function")return Buffer.byteLength(i,"utf8");let a=0;for(let l=0,o=i.length;l<o;l++){const c=i.charCodeAt(l);if(c<128)a+=1;else if(c<2048)a+=2;else if(c>=55296&&c<=56319&&l+1<o){const d=i.charCodeAt(l+1);d>=56320&&d<=57343?(a+=4,l++):a+=3}else a+=3}return a}const cl="1.17.0",tc=64*1024,{isFunction:ns}=H,Dx=n=>encodeURIComponent(n).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),nc=n=>{if(!H.isString(n))return n;try{return decodeURIComponent(n)}catch{return n}},ic=(n,...e)=>{try{return!!n(...e)}catch{return!1}},Ix=n=>{const e=n.indexOf("://");let t=n;return e!==-1&&(t=t.slice(e+3)),t.includes("@")||t.includes(":")},Ux=n=>{const e=H.global!==void 0&&H.global!==null?H.global:globalThis,{ReadableStream:t,TextEncoder:i}=e;n=H.merge.call({skipUndefined:!0},{Request:e.Request,Response:e.Response},n);const{fetch:r,Request:a,Response:l}=n,o=r?ns(r):typeof fetch=="function",c=ns(a),d=ns(l);if(!o)return!1;const u=o&&ns(t),f=o&&(typeof i=="function"?(p=>y=>p.encode(y))(new i):async p=>new Uint8Array(await new a(p).arrayBuffer())),h=c&&u&&ic(()=>{let p=!1;const y=new a(Ft.origin,{body:new t,method:"POST",get duplex(){return p=!0,"half"}}),_=y.headers.has("Content-Type");return y.body!=null&&y.body.cancel(),p&&!_}),g=d&&u&&ic(()=>H.isReadableStream(new l("").body)),v={stream:g&&(p=>p.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(p=>{!v[p]&&(v[p]=(y,_)=>{let E=y&&y[p];if(E)return E.call(y);throw new Re(`Response type '${p}' is not supported`,Re.ERR_NOT_SUPPORT,_)})});const x=async p=>{if(p==null)return 0;if(H.isBlob(p))return p.size;if(H.isSpecCompliantForm(p))return(await new a(Ft.origin,{method:"POST",body:p}).arrayBuffer()).byteLength;if(H.isArrayBufferView(p)||H.isArrayBuffer(p))return p.byteLength;if(H.isURLSearchParams(p)&&(p=p+""),H.isString(p))return(await f(p)).byteLength},m=async(p,y)=>{const _=H.toFiniteNumber(p.getContentLength());return _??x(y)};return async p=>{let{url:y,method:_,data:E,signal:S,cancelToken:A,timeout:T,onDownloadProgress:N,onUploadProgress:b,responseType:M,headers:I,withCredentials:k="same-origin",fetchOptions:$,maxContentLength:P,maxBodyLength:z}=ch(p);const J=H.isNumber(P)&&P>-1,K=H.isNumber(z)&&z>-1,ae=B=>H.hasOwnProp(p,B)?p[B]:void 0;let ee=r||fetch;M=M?(M+"").toLowerCase():"text";let ie=Cx([S,A&&A.toAbortSignal()],T),D=null;const L=ie&&ie.unsubscribe&&(()=>{ie.unsubscribe()});let G;try{let B;const Q=ae("auth");if(Q){const oe=Q.username||"",U=Q.password||"";B={username:oe,password:U}}if(Ix(y)){const oe=new URL(y,Ft.origin);if(!B&&(oe.username||oe.password)){const U=nc(oe.username),Ze=nc(oe.password);B={username:U,password:Ze}}(oe.username||oe.password)&&(oe.username="",oe.password="",y=oe.href)}if(B&&(I.delete("authorization"),I.set("Authorization","Basic "+btoa(Dx((B.username||"")+":"+(B.password||""))))),J&&typeof y=="string"&&y.startsWith("data:")&&jx(y)>P)throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,p,D);if(K&&_!=="get"&&_!=="head"){const oe=await m(I,E);if(typeof oe=="number"&&isFinite(oe)&&oe>z)throw new Re("Request body larger than maxBodyLength limit",Re.ERR_BAD_REQUEST,p,D)}if(b&&h&&_!=="get"&&_!=="head"&&(G=await m(I,E))!==0){let oe=new a(y,{method:"POST",body:E,duplex:"half"}),U;if(H.isFormData(E)&&(U=oe.headers.get("content-type"))&&I.setContentType(U),oe.body){const[Ze,be]=Zl(G,Ks(Jl(b)));E=ec(oe.body,tc,Ze,be)}}H.isString(k)||(k=k?"include":"omit");const O=c&&"credentials"in a.prototype;if(H.isFormData(E)){const oe=I.getContentType();oe&&/^multipart\/form-data/i.test(oe)&&!/boundary=/i.test(oe)&&I.delete("content-type")}I.set("User-Agent","axios/"+cl,!1);const ye={...$,signal:ie,method:_.toUpperCase(),headers:eh(I.normalize()),body:E,duplex:"half",credentials:O?k:void 0};D=c&&new a(y,ye);let Y=await(c?ee(D,$):ee(y,ye));if(J){const oe=H.toFiniteNumber(Y.headers.get("content-length"));if(oe!=null&&oe>P)throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,p,D)}const we=g&&(M==="stream"||M==="response");if(g&&Y.body&&(N||J||we&&L)){const oe={};["status","statusText","headers"].forEach(Ce=>{oe[Ce]=Y[Ce]});const U=H.toFiniteNumber(Y.headers.get("content-length")),[Ze,be]=N&&Zl(U,Ks(Jl(N),!0))||[];let ge=0;const Ae=Ce=>{if(J&&(ge=Ce,ge>P))throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,p,D);Ze&&Ze(Ce)};Y=new l(ec(Y.body,tc,Ae,()=>{be&&be(),L&&L()}),oe)}M=M||"text";let Me=await v[H.findKey(v,M)||"text"](Y,p);if(J&&!g&&!we){let oe;if(Me!=null&&(typeof Me.byteLength=="number"?oe=Me.byteLength:typeof Me.size=="number"?oe=Me.size:typeof Me=="string"&&(oe=typeof i=="function"?new i().encode(Me).byteLength:Me.length)),typeof oe=="number"&&oe>P)throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,p,D)}return!we&&L&&L(),await new Promise((oe,U)=>{oh(oe,U,{data:Me,headers:qt.from(Y.headers),status:Y.status,statusText:Y.statusText,config:p,request:D})})}catch(B){if(L&&L(),ie&&ie.aborted&&ie.reason instanceof Re){const Q=ie.reason;throw Q.config=p,D&&(Q.request=D),B!==Q&&(Q.cause=B),Q}throw B&&B.name==="TypeError"&&/Load failed|fetch/i.test(B.message)?Object.assign(new Re("Network Error",Re.ERR_NETWORK,p,D,B&&B.response),{cause:B.cause||B}):Re.from(B,B&&B.code,p,D,B&&B.response)}}},Ox=new Map,dh=n=>{let e=n&&n.env||{};const{fetch:t,Request:i,Response:r}=e,a=[i,r,t];let l=a.length,o=l,c,d,u=Ox;for(;o--;)c=a[o],d=u.get(c),d===void 0&&u.set(c,d=o?new Map:Ux(e)),u=d;return d};dh();const dl={http:tx,xhr:Rx,fetch:{get:dh}};H.forEach(dl,(n,e)=>{if(n){try{Object.defineProperty(n,"name",{__proto__:null,value:e})}catch{}Object.defineProperty(n,"adapterName",{__proto__:null,value:e})}});const rc=n=>`- ${n}`,Fx=n=>H.isFunction(n)||n===null||n===!1;function kx(n,e){n=H.isArray(n)?n:[n];const{length:t}=n;let i,r;const a={};for(let l=0;l<t;l++){i=n[l];let o;if(r=i,!Fx(i)&&(r=dl[(o=String(i)).toLowerCase()],r===void 0))throw new Re(`Unknown adapter '${o}'`);if(r&&(H.isFunction(r)||(r=r.get(e))))break;a[o||"#"+l]=r}if(!r){const l=Object.entries(a).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=t?l.length>1?`since :
`+l.map(rc).join(`
`):" "+rc(l[0]):"as no adapter specified";throw new Re("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return r}const uh={getAdapter:kx,adapters:dl};function Da(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new Xr(null,n)}function sc(n){return Da(n),n.headers=qt.from(n.headers),n.data=ja.call(n,n.transformRequest),["post","put","patch"].indexOf(n.method)!==-1&&n.headers.setContentType("application/x-www-form-urlencoded",!1),uh.getAdapter(n.adapter||Wr.adapter,n)(n).then(function(i){Da(n),n.response=i;try{i.data=ja.call(n,n.transformResponse,i)}finally{delete n.response}return i.headers=qt.from(i.headers),i},function(i){if(!ah(i)&&(Da(n),i&&i.response)){n.response=i.response;try{i.response.data=ja.call(n,n.transformResponse,i.response)}finally{delete n.response}i.response.headers=qt.from(i.response.headers)}return Promise.reject(i)})}const xa={};["object","boolean","number","function","string","symbol"].forEach((n,e)=>{xa[n]=function(i){return typeof i===n||"a"+(e<1?"n ":" ")+n}});const ac={};xa.transitional=function(e,t,i){function r(a,l){return"[Axios v"+cl+"] Transitional option '"+a+"'"+l+(i?". "+i:"")}return(a,l,o)=>{if(e===!1)throw new Re(r(l," has been removed"+(t?" in "+t:"")),Re.ERR_DEPRECATED);return t&&!ac[l]&&(ac[l]=!0,console.warn(r(l," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(a,l,o):!0}};xa.spelling=function(e){return(t,i)=>(console.warn(`${i} is likely a misspelling of ${e}`),!0)};function Bx(n,e,t){if(typeof n!="object")throw new Re("options must be an object",Re.ERR_BAD_OPTION_VALUE);const i=Object.keys(n);let r=i.length;for(;r-- >0;){const a=i[r],l=Object.prototype.hasOwnProperty.call(e,a)?e[a]:void 0;if(l){const o=n[a],c=o===void 0||l(o,a,n);if(c!==!0)throw new Re("option "+a+" must be "+c,Re.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new Re("Unknown option "+a,Re.ERR_BAD_OPTION)}}const Vs={assertOptions:Bx,validators:xa},$t=Vs.validators;let yi=class{constructor(e){this.defaults=e||{},this.interceptors={request:new Kl,response:new Kl}}async request(e,t){try{return await this._request(e,t)}catch(i){if(i instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const a=(()=>{if(!r.stack)return"";const l=r.stack.indexOf(`
`);return l===-1?"":r.stack.slice(l+1)})();try{if(!i.stack)i.stack=a;else if(a){const l=a.indexOf(`
`),o=l===-1?-1:a.indexOf(`
`,l+1),c=o===-1?"":a.slice(o+1);String(i.stack).endsWith(c)||(i.stack+=`
`+a)}}catch{}}throw i}}_request(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=Ti(this.defaults,t);const{transitional:i,paramsSerializer:r,headers:a}=t;i!==void 0&&Vs.assertOptions(i,{silentJSONParsing:$t.transitional($t.boolean),forcedJSONParsing:$t.transitional($t.boolean),clarifyTimeoutError:$t.transitional($t.boolean),legacyInterceptorReqResOrdering:$t.transitional($t.boolean),advertiseZstdAcceptEncoding:$t.transitional($t.boolean)},!1),r!=null&&(H.isFunction(r)?t.paramsSerializer={serialize:r}:Vs.assertOptions(r,{encode:$t.function,serialize:$t.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),Vs.assertOptions(t,{baseUrl:$t.spelling("baseURL"),withXsrfToken:$t.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let l=a&&H.merge(a.common,a[t.method]);a&&H.forEach(["delete","get","head","post","put","patch","query","common"],v=>{delete a[v]}),t.headers=qt.concat(l,a);const o=[];let c=!0;this.interceptors.request.forEach(function(x){if(typeof x.runWhen=="function"&&x.runWhen(t)===!1)return;c=c&&x.synchronous;const m=t.transitional||ol;m&&m.legacyInterceptorReqResOrdering?o.unshift(x.fulfilled,x.rejected):o.push(x.fulfilled,x.rejected)});const d=[];this.interceptors.response.forEach(function(x){d.push(x.fulfilled,x.rejected)});let u,f=0,h;if(!c){const v=[sc.bind(this),void 0];for(v.unshift(...o),v.push(...d),h=v.length,u=Promise.resolve(t);f<h;)u=u.then(v[f++],v[f++]);return u}h=o.length;let g=t;for(;f<h;){const v=o[f++],x=o[f++];try{g=v(g)}catch(m){x.call(this,m);break}}try{u=sc.call(this,g)}catch(v){return Promise.reject(v)}for(f=0,h=d.length;f<h;)u=u.then(d[f++],d[f++]);return u}getUri(e){e=Ti(this.defaults,e);const t=lh(e.baseURL,e.url,e.allowAbsoluteUrls);return rh(t,e.params,e.paramsSerializer)}};H.forEach(["delete","get","head","options"],function(e){yi.prototype[e]=function(t,i){return this.request(Ti(i||{},{method:e,url:t,data:(i||{}).data}))}});H.forEach(["post","put","patch","query"],function(e){function t(i){return function(a,l,o){return this.request(Ti(o||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:a,data:l}))}}yi.prototype[e]=t(),e!=="query"&&(yi.prototype[e+"Form"]=t(!0))});let zx=class hh{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(a){t=a});const i=this;this.promise.then(r=>{if(!i._listeners)return;let a=i._listeners.length;for(;a-- >0;)i._listeners[a](r);i._listeners=null}),this.promise.then=r=>{let a;const l=new Promise(o=>{i.subscribe(o),a=o}).then(r);return l.cancel=function(){i.unsubscribe(a)},l},e(function(a,l,o){i.reason||(i.reason=new Xr(a,l,o),t(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=i=>{e.abort(i)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new hh(function(r){e=r}),cancel:e}}};function Hx(n){return function(t){return n.apply(null,t)}}function Gx(n){return H.isObject(n)&&n.isAxiosError===!0}const Uo={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Uo).forEach(([n,e])=>{Uo[e]=n});function fh(n){const e=new yi(n),t=Xu(yi.prototype.request,e);return H.extend(t,yi.prototype,e,{allOwnKeys:!0}),H.extend(t,e,null,{allOwnKeys:!0}),t.create=function(r){return fh(Ti(n,r))},t}const xt=fh(Wr);xt.Axios=yi;xt.CanceledError=Xr;xt.CancelToken=zx;xt.isCancel=ah;xt.VERSION=cl;xt.toFormData=ga;xt.AxiosError=Re;xt.Cancel=xt.CanceledError;xt.all=function(e){return Promise.all(e)};xt.spread=Hx;xt.isAxiosError=Gx;xt.mergeConfig=Ti;xt.AxiosHeaders=qt;xt.formToJSON=n=>sh(H.isHTMLForm(n)?new FormData(n):n);xt.getAdapter=uh.getAdapter;xt.HttpStatusCode=Uo;xt.default=xt;const{Axios:vM,AxiosError:yM,CanceledError:bM,isCancel:SM,CancelToken:wM,VERSION:EM,all:MM,Cancel:TM,isAxiosError:AM,spread:RM,toFormData:CM,AxiosHeaders:NM,HttpStatusCode:PM,formToJSON:LM,getAdapter:jM,mergeConfig:DM,create:IM}=xt,Vx=({onLogin:n})=>{const[e,t]=V.useState(""),[i,r]=V.useState(""),[a,l]=V.useState(""),o=oa(),c=async d=>{d.preventDefault();try{const u=await xt.post("http://localhost:5000/api/auth/login",{email:e,password:i}),{token:f,...h}=u.data;localStorage.setItem("authToken",f),n(h),o("/")}catch(u){l(u.response?.data?.error||"Ошибка входа")}};return s.jsxs("div",{className:"max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4 text-center",children:"Вход в аккаунт"}),a&&s.jsx("p",{className:"text-red-500 text-center mb-4",children:a}),s.jsxs("form",{onSubmit:c,className:"space-y-4",children:[s.jsx("div",{children:s.jsx("input",{type:"email",placeholder:"Email",value:e,onChange:d=>t(d.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),s.jsx("div",{children:s.jsx("input",{type:"password",placeholder:"Пароль",value:i,onChange:d=>r(d.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),s.jsx("button",{type:"submit",className:"w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Войти"})]}),s.jsxs("p",{className:"mt-4 text-center",children:["Нет аккаунта?"," ",s.jsx("a",{href:"/register",className:"text-blue-500 hover:underline",children:"Зарегистрируйтесь"})]})]})},Wx=({onRegister:n})=>{const[e,t]=V.useState(""),[i,r]=V.useState(""),[a,l]=V.useState(""),[o,c]=V.useState("user"),[d,u]=V.useState(""),f=oa(),h=async g=>{g.preventDefault();try{const v=await xt.post("http://localhost:5000/api/auth/register",{username:e,email:i,password:a,role:o}),{token:x,...m}=v.data;localStorage.setItem("authToken",x),n(m),f("/")}catch(v){u(v.response?.data?.error||"Ошибка регистрации")}};return s.jsxs("div",{className:"max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg",children:[s.jsx("h2",{className:"text-2xl font-bold mb-4 text-center",children:"Регистрация"}),d&&s.jsx("p",{className:"text-red-500 text-center mb-4",children:d}),s.jsxs("form",{onSubmit:h,className:"space-y-4",children:[s.jsx("div",{children:s.jsx("input",{type:"text",placeholder:"Имя пользователя",value:e,onChange:g=>t(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),s.jsx("div",{children:s.jsx("input",{type:"email",placeholder:"Email",value:i,onChange:g=>r(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),s.jsx("div",{children:s.jsx("input",{type:"password",placeholder:"Пароль",value:a,onChange:g=>l(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),s.jsx("div",{children:s.jsxs("select",{value:o,onChange:g=>c(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",children:[s.jsx("option",{value:"user",children:"Обычный пользователь"}),s.jsx("option",{value:"tour_guide",children:"Организатор туров"}),s.jsx("option",{value:"auction_participant",children:"Участник аукционов"})]})}),s.jsx("button",{type:"submit",className:"w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Зарегистрироваться"})]}),s.jsxs("p",{className:"mt-4 text-center",children:["Уже есть аккаунт?"," ",s.jsx("a",{href:"/login",className:"text-blue-500 hover:underline",children:"Войдите"})]})]})};var Ia={exports:{}},ct={};var oc;function Xx(){if(oc)return ct;oc=1;var n=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),a=Symbol.for("react.consumer"),l=Symbol.for("react.context"),o=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),u=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),h=Symbol.for("react.view_transition"),g=Symbol.for("react.client.reference");function v(x){if(typeof x=="object"&&x!==null){var m=x.$$typeof;switch(m){case n:switch(x=x.type,x){case t:case r:case i:case c:case d:case h:return x;default:switch(x=x&&x.$$typeof,x){case l:case o:case f:case u:return x;case a:return x;default:return m}}case e:return m}}}return ct.ContextConsumer=a,ct.ContextProvider=l,ct.Element=n,ct.ForwardRef=o,ct.Fragment=t,ct.Lazy=f,ct.Memo=u,ct.Portal=e,ct.Profiler=r,ct.StrictMode=i,ct.Suspense=c,ct.SuspenseList=d,ct.isContextConsumer=function(x){return v(x)===a},ct.isContextProvider=function(x){return v(x)===l},ct.isElement=function(x){return typeof x=="object"&&x!==null&&x.$$typeof===n},ct.isForwardRef=function(x){return v(x)===o},ct.isFragment=function(x){return v(x)===t},ct.isLazy=function(x){return v(x)===f},ct.isMemo=function(x){return v(x)===u},ct.isPortal=function(x){return v(x)===e},ct.isProfiler=function(x){return v(x)===r},ct.isStrictMode=function(x){return v(x)===i},ct.isSuspense=function(x){return v(x)===c},ct.isSuspenseList=function(x){return v(x)===d},ct.isValidElementType=function(x){return typeof x=="string"||typeof x=="function"||x===t||x===r||x===i||x===c||x===d||typeof x=="object"&&x!==null&&(x.$$typeof===f||x.$$typeof===u||x.$$typeof===l||x.$$typeof===a||x.$$typeof===o||x.$$typeof===g||x.getModuleId!==void 0)},ct.typeOf=v,ct}var lc;function qx(){return lc||(lc=1,Ia.exports=Xx()),Ia.exports}var ph=qx();function $x(n){function e(L,G,B,Q,O){for(var ye=0,Y=0,we=0,Me=0,oe,U,Ze=0,be=0,ge,Ae=ge=oe=0,Ce=0,Ne=0,Ve=0,He=0,ht=B.length,_t=ht-1,C,w="",W="",he="",ce="",de;Ce<ht;){if(U=B.charCodeAt(Ce),Ce===_t&&Y+Me+we+ye!==0&&(Y!==0&&(U=Y===47?10:47),Me=we=ye=0,ht++,_t++),Y+Me+we+ye===0){if(Ce===_t&&(0<Ne&&(w=w.replace(h,"")),0<w.trim().length)){switch(U){case 32:case 9:case 59:case 13:case 10:break;default:w+=B.charAt(Ce)}U=59}switch(U){case 123:for(w=w.trim(),oe=w.charCodeAt(0),ge=1,He=++Ce;Ce<ht;){switch(U=B.charCodeAt(Ce)){case 123:ge++;break;case 125:ge--;break;case 47:switch(U=B.charCodeAt(Ce+1)){case 42:case 47:e:{for(Ae=Ce+1;Ae<_t;++Ae)switch(B.charCodeAt(Ae)){case 47:if(U===42&&B.charCodeAt(Ae-1)===42&&Ce+2!==Ae){Ce=Ae+1;break e}break;case 10:if(U===47){Ce=Ae+1;break e}}Ce=Ae}}break;case 91:U++;case 40:U++;case 34:case 39:for(;Ce++<_t&&B.charCodeAt(Ce)!==U;);}if(ge===0)break;Ce++}switch(ge=B.substring(He,Ce),oe===0&&(oe=(w=w.replace(f,"").trim()).charCodeAt(0)),oe){case 64:switch(0<Ne&&(w=w.replace(h,"")),U=w.charCodeAt(1),U){case 100:case 109:case 115:case 45:Ne=G;break;default:Ne=J}if(ge=e(G,Ne,ge,U,O+1),He=ge.length,0<ae&&(Ne=t(J,w,Ve),de=o(3,ge,Ne,G,$,k,He,U,O,Q),w=Ne.join(""),de!==void 0&&(He=(ge=de.trim()).length)===0&&(U=0,ge="")),0<He)switch(U){case 115:w=w.replace(A,l);case 100:case 109:case 45:ge=w+"{"+ge+"}";break;case 107:w=w.replace(y,"$1 $2"),ge=w+"{"+ge+"}",ge=z===1||z===2&&a("@"+ge,3)?"@-webkit-"+ge+"@"+ge:"@"+ge;break;default:ge=w+ge,Q===112&&(ge=(W+=ge,""))}else ge="";break;default:ge=e(G,t(G,w,Ve),ge,Q,O+1)}he+=ge,ge=Ve=Ne=Ae=oe=0,w="",U=B.charCodeAt(++Ce);break;case 125:case 59:if(w=(0<Ne?w.replace(h,""):w).trim(),1<(He=w.length))switch(Ae===0&&(oe=w.charCodeAt(0),oe===45||96<oe&&123>oe)&&(He=(w=w.replace(" ",":")).length),0<ae&&(de=o(1,w,G,L,$,k,W.length,Q,O,Q))!==void 0&&(He=(w=de.trim()).length)===0&&(w="\0\0"),oe=w.charCodeAt(0),U=w.charCodeAt(1),oe){case 0:break;case 64:if(U===105||U===99){ce+=w+B.charAt(Ce);break}default:w.charCodeAt(He-1)!==58&&(W+=r(w,oe,U,w.charCodeAt(2)))}Ve=Ne=Ae=oe=0,w="",U=B.charCodeAt(++Ce)}}switch(U){case 13:case 10:Y===47?Y=0:1+oe===0&&Q!==107&&0<w.length&&(Ne=1,w+="\0"),0<ae*ie&&o(0,w,G,L,$,k,W.length,Q,O,Q),k=1,$++;break;case 59:case 125:if(Y+Me+we+ye===0){k++;break}default:switch(k++,C=B.charAt(Ce),U){case 9:case 32:if(Me+ye+Y===0)switch(Ze){case 44:case 58:case 9:case 32:C="";break;default:U!==32&&(C=" ")}break;case 0:C="\\0";break;case 12:C="\\f";break;case 11:C="\\v";break;case 38:Me+Y+ye===0&&(Ne=Ve=1,C="\f"+C);break;case 108:if(Me+Y+ye+P===0&&0<Ae)switch(Ce-Ae){case 2:Ze===112&&B.charCodeAt(Ce-3)===58&&(P=Ze);case 8:be===111&&(P=be)}break;case 58:Me+Y+ye===0&&(Ae=Ce);break;case 44:Y+we+Me+ye===0&&(Ne=1,C+="\r");break;case 34:case 39:Y===0&&(Me=Me===U?0:Me===0?U:Me);break;case 91:Me+Y+we===0&&ye++;break;case 93:Me+Y+we===0&&ye--;break;case 41:Me+Y+ye===0&&we--;break;case 40:Me+Y+ye===0&&(oe===0&&(2*Ze+3*be===533||(oe=1)),we++);break;case 64:Y+we+Me+ye+Ae+ge===0&&(ge=1);break;case 42:case 47:if(!(0<Me+ye+we))switch(Y){case 0:switch(2*U+3*B.charCodeAt(Ce+1)){case 235:Y=47;break;case 220:He=Ce,Y=42}break;case 42:U===47&&Ze===42&&He+2!==Ce&&(B.charCodeAt(He+2)===33&&(W+=B.substring(He,Ce+1)),C="",Y=0)}}Y===0&&(w+=C)}be=Ze,Ze=U,Ce++}if(He=W.length,0<He){if(Ne=G,0<ae&&(de=o(2,W,Ne,L,$,k,He,Q,O,Q),de!==void 0&&(W=de).length===0))return ce+W+he;if(W=Ne.join(",")+"{"+W+"}",z*P!==0){switch(z!==2||a(W,2)||(P=0),P){case 111:W=W.replace(E,":-moz-$1")+W;break;case 112:W=W.replace(_,"::-webkit-input-$1")+W.replace(_,"::-moz-$1")+W.replace(_,":-ms-input-$1")+W}P=0}}return ce+W+he}function t(L,G,B){var Q=G.trim().split(m);G=Q;var O=Q.length,ye=L.length;switch(ye){case 0:case 1:var Y=0;for(L=ye===0?"":L[0]+" ";Y<O;++Y)G[Y]=i(L,G[Y],B).trim();break;default:var we=Y=0;for(G=[];Y<O;++Y)for(var Me=0;Me<ye;++Me)G[we++]=i(L[Me]+" ",Q[Y],B).trim()}return G}function i(L,G,B){var Q=G.charCodeAt(0);switch(33>Q&&(Q=(G=G.trim()).charCodeAt(0)),Q){case 38:return G.replace(p,"$1"+L.trim());case 58:return L.trim()+G.replace(p,"$1"+L.trim());default:if(0<1*B&&0<G.indexOf("\f"))return G.replace(p,(L.charCodeAt(0)===58?"":"$1")+L.trim())}return L+G}function r(L,G,B,Q){var O=L+";",ye=2*G+3*B+4*Q;if(ye===944){L=O.indexOf(":",9)+1;var Y=O.substring(L,O.length-1).trim();return Y=O.substring(0,L).trim()+Y+";",z===1||z===2&&a(Y,1)?"-webkit-"+Y+Y:Y}if(z===0||z===2&&!a(O,1))return O;switch(ye){case 1015:return O.charCodeAt(10)===97?"-webkit-"+O+O:O;case 951:return O.charCodeAt(3)===116?"-webkit-"+O+O:O;case 963:return O.charCodeAt(5)===110?"-webkit-"+O+O:O;case 1009:if(O.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+O+O;case 978:return"-webkit-"+O+"-moz-"+O+O;case 1019:case 983:return"-webkit-"+O+"-moz-"+O+"-ms-"+O+O;case 883:if(O.charCodeAt(8)===45)return"-webkit-"+O+O;if(0<O.indexOf("image-set(",11))return O.replace(I,"$1-webkit-$2")+O;break;case 932:if(O.charCodeAt(4)===45)switch(O.charCodeAt(5)){case 103:return"-webkit-box-"+O.replace("-grow","")+"-webkit-"+O+"-ms-"+O.replace("grow","positive")+O;case 115:return"-webkit-"+O+"-ms-"+O.replace("shrink","negative")+O;case 98:return"-webkit-"+O+"-ms-"+O.replace("basis","preferred-size")+O}return"-webkit-"+O+"-ms-"+O+O;case 964:return"-webkit-"+O+"-ms-flex-"+O+O;case 1023:if(O.charCodeAt(8)!==99)break;return Y=O.substring(O.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+Y+"-webkit-"+O+"-ms-flex-pack"+Y+O;case 1005:return v.test(O)?O.replace(g,":-webkit-")+O.replace(g,":-moz-")+O:O;case 1e3:switch(Y=O.substring(13).trim(),G=Y.indexOf("-")+1,Y.charCodeAt(0)+Y.charCodeAt(G)){case 226:Y=O.replace(S,"tb");break;case 232:Y=O.replace(S,"tb-rl");break;case 220:Y=O.replace(S,"lr");break;default:return O}return"-webkit-"+O+"-ms-"+Y+O;case 1017:if(O.indexOf("sticky",9)===-1)break;case 975:switch(G=(O=L).length-10,Y=(O.charCodeAt(G)===33?O.substring(0,G):O).substring(L.indexOf(":",7)+1).trim(),ye=Y.charCodeAt(0)+(Y.charCodeAt(7)|0)){case 203:if(111>Y.charCodeAt(8))break;case 115:O=O.replace(Y,"-webkit-"+Y)+";"+O;break;case 207:case 102:O=O.replace(Y,"-webkit-"+(102<ye?"inline-":"")+"box")+";"+O.replace(Y,"-webkit-"+Y)+";"+O.replace(Y,"-ms-"+Y+"box")+";"+O}return O+";";case 938:if(O.charCodeAt(5)===45)switch(O.charCodeAt(6)){case 105:return Y=O.replace("-items",""),"-webkit-"+O+"-webkit-box-"+Y+"-ms-flex-"+Y+O;case 115:return"-webkit-"+O+"-ms-flex-item-"+O.replace(N,"")+O;default:return"-webkit-"+O+"-ms-flex-line-pack"+O.replace("align-content","").replace(N,"")+O}break;case 973:case 989:if(O.charCodeAt(3)!==45||O.charCodeAt(4)===122)break;case 931:case 953:if(M.test(L)===!0)return(Y=L.substring(L.indexOf(":")+1)).charCodeAt(0)===115?r(L.replace("stretch","fill-available"),G,B,Q).replace(":fill-available",":stretch"):O.replace(Y,"-webkit-"+Y)+O.replace(Y,"-moz-"+Y.replace("fill-",""))+O;break;case 962:if(O="-webkit-"+O+(O.charCodeAt(5)===102?"-ms-"+O:"")+O,B+Q===211&&O.charCodeAt(13)===105&&0<O.indexOf("transform",10))return O.substring(0,O.indexOf(";",27)+1).replace(x,"$1-webkit-$2")+O}return O}function a(L,G){var B=L.indexOf(G===1?":":"{"),Q=L.substring(0,G!==3?B:10);return B=L.substring(B+1,L.length-1),ee(G!==2?Q:Q.replace(b,"$1"),B,G)}function l(L,G){var B=r(G,G.charCodeAt(0),G.charCodeAt(1),G.charCodeAt(2));return B!==G+";"?B.replace(T," or ($1)").substring(4):"("+G+")"}function o(L,G,B,Q,O,ye,Y,we,Me,oe){for(var U=0,Ze=G,be;U<ae;++U)switch(be=K[U].call(u,L,Ze,B,Q,O,ye,Y,we,Me,oe)){case void 0:case!1:case!0:case null:break;default:Ze=be}if(Ze!==G)return Ze}function c(L){switch(L){case void 0:case null:ae=K.length=0;break;default:if(typeof L=="function")K[ae++]=L;else if(typeof L=="object")for(var G=0,B=L.length;G<B;++G)c(L[G]);else ie=!!L|0}return c}function d(L){return L=L.prefix,L!==void 0&&(ee=null,L?typeof L!="function"?z=1:(z=2,ee=L):z=0),d}function u(L,G){var B=L;if(33>B.charCodeAt(0)&&(B=B.trim()),D=B,B=[D],0<ae){var Q=o(-1,G,B,B,$,k,0,0,0,0);Q!==void 0&&typeof Q=="string"&&(G=Q)}var O=e(J,B,G,0,0);return 0<ae&&(Q=o(-2,O,B,B,$,k,O.length,0,0,0),Q!==void 0&&(O=Q)),D="",P=0,k=$=1,O}var f=/^\0+/g,h=/[\0\r\f]/g,g=/: */g,v=/zoo|gra/,x=/([,: ])(transform)/g,m=/,\r+?/g,p=/([\t\r\n ])*\f?&/g,y=/@(k\w+)\s*(\S*)\s*/,_=/::(place)/g,E=/:(read-only)/g,S=/[svh]\w+-[tblr]{2}/,A=/\(\s*(.*)\s*\)/g,T=/([\s\S]*?);/g,N=/-self|flex-/g,b=/[^]*?(:[rp][el]a[\w-]+)[^]*/,M=/stretch|:\s*\w+\-(?:conte|avail)/,I=/([^-])(image-set\()/,k=1,$=1,P=0,z=1,J=[],K=[],ae=0,ee=null,ie=0,D="";return u.use=c,u.set=d,n!==void 0&&d(n),u}var Yx={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Kx(n){var e=Object.create(null);return function(t){return e[t]===void 0&&(e[t]=n(t)),e[t]}}var Zx=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,cc=Kx(function(n){return Zx.test(n)||n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)<91}),Ua={exports:{}},lt={};var dc;function Jx(){if(dc)return lt;dc=1;var n=typeof Symbol=="function"&&Symbol.for,e=n?Symbol.for("react.element"):60103,t=n?Symbol.for("react.portal"):60106,i=n?Symbol.for("react.fragment"):60107,r=n?Symbol.for("react.strict_mode"):60108,a=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,o=n?Symbol.for("react.context"):60110,c=n?Symbol.for("react.async_mode"):60111,d=n?Symbol.for("react.concurrent_mode"):60111,u=n?Symbol.for("react.forward_ref"):60112,f=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,g=n?Symbol.for("react.memo"):60115,v=n?Symbol.for("react.lazy"):60116,x=n?Symbol.for("react.block"):60121,m=n?Symbol.for("react.fundamental"):60117,p=n?Symbol.for("react.responder"):60118,y=n?Symbol.for("react.scope"):60119;function _(S){if(typeof S=="object"&&S!==null){var A=S.$$typeof;switch(A){case e:switch(S=S.type,S){case c:case d:case i:case a:case r:case f:return S;default:switch(S=S&&S.$$typeof,S){case o:case u:case v:case g:case l:return S;default:return A}}case t:return A}}}function E(S){return _(S)===d}return lt.AsyncMode=c,lt.ConcurrentMode=d,lt.ContextConsumer=o,lt.ContextProvider=l,lt.Element=e,lt.ForwardRef=u,lt.Fragment=i,lt.Lazy=v,lt.Memo=g,lt.Portal=t,lt.Profiler=a,lt.StrictMode=r,lt.Suspense=f,lt.isAsyncMode=function(S){return E(S)||_(S)===c},lt.isConcurrentMode=E,lt.isContextConsumer=function(S){return _(S)===o},lt.isContextProvider=function(S){return _(S)===l},lt.isElement=function(S){return typeof S=="object"&&S!==null&&S.$$typeof===e},lt.isForwardRef=function(S){return _(S)===u},lt.isFragment=function(S){return _(S)===i},lt.isLazy=function(S){return _(S)===v},lt.isMemo=function(S){return _(S)===g},lt.isPortal=function(S){return _(S)===t},lt.isProfiler=function(S){return _(S)===a},lt.isStrictMode=function(S){return _(S)===r},lt.isSuspense=function(S){return _(S)===f},lt.isValidElementType=function(S){return typeof S=="string"||typeof S=="function"||S===i||S===d||S===a||S===r||S===f||S===h||typeof S=="object"&&S!==null&&(S.$$typeof===v||S.$$typeof===g||S.$$typeof===l||S.$$typeof===o||S.$$typeof===u||S.$$typeof===m||S.$$typeof===p||S.$$typeof===y||S.$$typeof===x)},lt.typeOf=_,lt}var uc;function Qx(){return uc||(uc=1,Ua.exports=Jx()),Ua.exports}var Oa,hc;function e0(){if(hc)return Oa;hc=1;var n=Qx(),e={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},t={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},r={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},a={};a[n.ForwardRef]=i,a[n.Memo]=r;function l(v){return n.isMemo(v)?r:a[v.$$typeof]||e}var o=Object.defineProperty,c=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,u=Object.getOwnPropertyDescriptor,f=Object.getPrototypeOf,h=Object.prototype;function g(v,x,m){if(typeof x!="string"){if(h){var p=f(x);p&&p!==h&&g(v,p,m)}var y=c(x);d&&(y=y.concat(d(x)));for(var _=l(v),E=l(x),S=0;S<y.length;++S){var A=y[S];if(!t[A]&&!(m&&m[A])&&!(E&&E[A])&&!(_&&_[A])){var T=u(x,A);try{o(v,A,T)}catch{}}}}return v}return Oa=g,Oa}var t0=e0();const n0=gu(t0);var ln={};function Bn(){return(Bn=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n}).apply(this,arguments)}var fc=function(n,e){for(var t=[n[0]],i=0,r=e.length;i<r;i+=1)t.push(e[i],n[i+1]);return t},Oo=function(n){return n!==null&&typeof n=="object"&&(n.toString?n.toString():Object.prototype.toString.call(n))==="[object Object]"&&!ph.typeOf(n)},Zs=Object.freeze([]),ni=Object.freeze({});function kr(n){return typeof n=="function"}function pc(n){return n.displayName||n.name||"Component"}function ul(n){return n&&typeof n.styledComponentId=="string"}var rr=typeof process<"u"&&ln!==void 0&&(ln.REACT_APP_SC_ATTR||ln.SC_ATTR)||"data-styled",hl=typeof window<"u"&&"HTMLElement"in window,i0=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&ln!==void 0&&(ln.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&ln.REACT_APP_SC_DISABLE_SPEEDY!==""?ln.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&ln.REACT_APP_SC_DISABLE_SPEEDY:ln.SC_DISABLE_SPEEDY!==void 0&&ln.SC_DISABLE_SPEEDY!==""&&ln.SC_DISABLE_SPEEDY!=="false"&&ln.SC_DISABLE_SPEEDY));function qr(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];throw new Error("An error occurred. See https://git.io/JUIaE#"+n+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var r0=(function(){function n(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var e=n.prototype;return e.indexOfGroup=function(t){for(var i=0,r=0;r<t;r++)i+=this.groupSizes[r];return i},e.insertRules=function(t,i){if(t>=this.groupSizes.length){for(var r=this.groupSizes,a=r.length,l=a;t>=l;)(l<<=1)<0&&qr(16,""+t);this.groupSizes=new Uint32Array(l),this.groupSizes.set(r),this.length=l;for(var o=a;o<l;o++)this.groupSizes[o]=0}for(var c=this.indexOfGroup(t+1),d=0,u=i.length;d<u;d++)this.tag.insertRule(c,i[d])&&(this.groupSizes[t]++,c++)},e.clearGroup=function(t){if(t<this.length){var i=this.groupSizes[t],r=this.indexOfGroup(t),a=r+i;this.groupSizes[t]=0;for(var l=r;l<a;l++)this.tag.deleteRule(r)}},e.getGroup=function(t){var i="";if(t>=this.length||this.groupSizes[t]===0)return i;for(var r=this.groupSizes[t],a=this.indexOfGroup(t),l=a+r,o=a;o<l;o++)i+=this.tag.getRule(o)+`/*!sc*/
`;return i},n})(),Ws=new Map,Js=new Map,Dr=1,is=function(n){if(Ws.has(n))return Ws.get(n);for(;Js.has(Dr);)Dr++;var e=Dr++;return Ws.set(n,e),Js.set(e,n),e},s0=function(n){return Js.get(n)},a0=function(n,e){e>=Dr&&(Dr=e+1),Ws.set(n,e),Js.set(e,n)},o0="style["+rr+'][data-styled-version="5.3.11"]',l0=new RegExp("^"+rr+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),c0=function(n,e,t){for(var i,r=t.split(","),a=0,l=r.length;a<l;a++)(i=r[a])&&n.registerName(e,i)},d0=function(n,e){for(var t=(e.textContent||"").split(`/*!sc*/
`),i=[],r=0,a=t.length;r<a;r++){var l=t[r].trim();if(l){var o=l.match(l0);if(o){var c=0|parseInt(o[1],10),d=o[2];c!==0&&(a0(d,c),c0(n,d,o[3]),n.getTag().insertRules(c,i)),i.length=0}else i.push(l)}}},u0=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},mh=function(n){var e=document.head,t=n||e,i=document.createElement("style"),r=(function(o){for(var c=o.childNodes,d=c.length;d>=0;d--){var u=c[d];if(u&&u.nodeType===1&&u.hasAttribute(rr))return u}})(t),a=r!==void 0?r.nextSibling:null;i.setAttribute(rr,"active"),i.setAttribute("data-styled-version","5.3.11");var l=u0();return l&&i.setAttribute("nonce",l),t.insertBefore(i,a),i},h0=(function(){function n(t){var i=this.element=mh(t);i.appendChild(document.createTextNode("")),this.sheet=(function(r){if(r.sheet)return r.sheet;for(var a=document.styleSheets,l=0,o=a.length;l<o;l++){var c=a[l];if(c.ownerNode===r)return c}qr(17)})(i),this.length=0}var e=n.prototype;return e.insertRule=function(t,i){try{return this.sheet.insertRule(i,t),this.length++,!0}catch{return!1}},e.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.getRule=function(t){var i=this.sheet.cssRules[t];return i!==void 0&&typeof i.cssText=="string"?i.cssText:""},n})(),f0=(function(){function n(t){var i=this.element=mh(t);this.nodes=i.childNodes,this.length=0}var e=n.prototype;return e.insertRule=function(t,i){if(t<=this.length&&t>=0){var r=document.createTextNode(i),a=this.nodes[t];return this.element.insertBefore(r,a||null),this.length++,!0}return!1},e.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},n})(),p0=(function(){function n(t){this.rules=[],this.length=0}var e=n.prototype;return e.insertRule=function(t,i){return t<=this.length&&(this.rules.splice(t,0,i),this.length++,!0)},e.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.getRule=function(t){return t<this.length?this.rules[t]:""},n})(),mc=hl,m0={isServer:!hl,useCSSOMInjection:!i0},gh=(function(){function n(t,i,r){t===void 0&&(t=ni),i===void 0&&(i={}),this.options=Bn({},m0,{},t),this.gs=i,this.names=new Map(r),this.server=!!t.isServer,!this.server&&hl&&mc&&(mc=!1,(function(a){for(var l=document.querySelectorAll(o0),o=0,c=l.length;o<c;o++){var d=l[o];d&&d.getAttribute(rr)!=="active"&&(d0(a,d),d.parentNode&&d.parentNode.removeChild(d))}})(this))}n.registerId=function(t){return is(t)};var e=n.prototype;return e.reconstructWithOptions=function(t,i){return i===void 0&&(i=!0),new n(Bn({},this.options,{},t),this.gs,i&&this.names||void 0)},e.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.getTag=function(){return this.tag||(this.tag=(r=(i=this.options).isServer,a=i.useCSSOMInjection,l=i.target,t=r?new p0(l):a?new h0(l):new f0(l),new r0(t)));var t,i,r,a,l},e.hasNameForId=function(t,i){return this.names.has(t)&&this.names.get(t).has(i)},e.registerName=function(t,i){if(is(t),this.names.has(t))this.names.get(t).add(i);else{var r=new Set;r.add(i),this.names.set(t,r)}},e.insertRules=function(t,i,r){this.registerName(t,i),this.getTag().insertRules(is(t),r)},e.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.clearRules=function(t){this.getTag().clearGroup(is(t)),this.clearNames(t)},e.clearTag=function(){this.tag=void 0},e.toString=function(){return(function(t){for(var i=t.getTag(),r=i.length,a="",l=0;l<r;l++){var o=s0(l);if(o!==void 0){var c=t.names.get(o),d=i.getGroup(l);if(c&&d&&c.size){var u=rr+".g"+l+'[id="'+o+'"]',f="";c!==void 0&&c.forEach((function(h){h.length>0&&(f+=h+",")})),a+=""+d+u+'{content:"'+f+`"}/*!sc*/
`}}}return a})(this)},n})(),g0=/(a)(d)/gi,gc=function(n){return String.fromCharCode(n+(n>25?39:97))};function Fo(n){var e,t="";for(e=Math.abs(n);e>52;e=e/52|0)t=gc(e%52)+t;return(gc(e%52)+t).replace(g0,"$1-$2")}var Ji=function(n,e){for(var t=e.length;t;)n=33*n^e.charCodeAt(--t);return n},xh=function(n){return Ji(5381,n)};function x0(n){for(var e=0;e<n.length;e+=1){var t=n[e];if(kr(t)&&!ul(t))return!1}return!0}var _0=xh("5.3.11"),v0=(function(){function n(e,t,i){this.rules=e,this.staticRulesId="",this.isStatic=(i===void 0||i.isStatic)&&x0(e),this.componentId=t,this.baseHash=Ji(_0,t),this.baseStyle=i,gh.registerId(t)}return n.prototype.generateAndInjectStyles=function(e,t,i){var r=this.componentId,a=[];if(this.baseStyle&&a.push(this.baseStyle.generateAndInjectStyles(e,t,i)),this.isStatic&&!i.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))a.push(this.staticRulesId);else{var l=sr(this.rules,e,t,i).join(""),o=Fo(Ji(this.baseHash,l)>>>0);if(!t.hasNameForId(r,o)){var c=i(l,"."+o,void 0,r);t.insertRules(r,o,c)}a.push(o),this.staticRulesId=o}else{for(var d=this.rules.length,u=Ji(this.baseHash,i.hash),f="",h=0;h<d;h++){var g=this.rules[h];if(typeof g=="string")f+=g;else if(g){var v=sr(g,e,t,i),x=Array.isArray(v)?v.join(""):v;u=Ji(u,x+h),f+=x}}if(f){var m=Fo(u>>>0);if(!t.hasNameForId(r,m)){var p=i(f,"."+m,void 0,r);t.insertRules(r,m,p)}a.push(m)}}return a.join(" ")},n})(),y0=/^\s*\/\/.*$/gm,b0=[":","[",".","#"];function S0(n){var e,t,i,r,a=ni,l=a.options,o=l===void 0?ni:l,c=a.plugins,d=c===void 0?Zs:c,u=new $x(o),f=[],h=(function(x){function m(p){if(p)try{x(p+"}")}catch{}}return function(p,y,_,E,S,A,T,N,b,M){switch(p){case 1:if(b===0&&y.charCodeAt(0)===64)return x(y+";"),"";break;case 2:if(N===0)return y+"/*|*/";break;case 3:switch(N){case 102:case 112:return x(_[0]+y),"";default:return y+(M===0?"/*|*/":"")}case-2:y.split("/*|*/}").forEach(m)}}})((function(x){f.push(x)})),g=function(x,m,p){return m===0&&b0.indexOf(p[t.length])!==-1||p.match(r)?x:"."+e};function v(x,m,p,y){y===void 0&&(y="&");var _=x.replace(y0,""),E=m&&p?p+" "+m+" { "+_+" }":_;return e=y,t=m,i=new RegExp("\\"+t+"\\b","g"),r=new RegExp("(\\"+t+"\\b){2,}"),u(p||!m?"":m,E)}return u.use([].concat(d,[function(x,m,p){x===2&&p.length&&p[0].lastIndexOf(t)>0&&(p[0]=p[0].replace(i,g))},h,function(x){if(x===-2){var m=f;return f=[],m}}])),v.hash=d.length?d.reduce((function(x,m){return m.name||qr(15),Ji(x,m.name)}),5381).toString():"",v}var _h=Hr.createContext();_h.Consumer;var vh=Hr.createContext(),w0=(vh.Consumer,new gh),ko=S0();function E0(){return V.useContext(_h)||w0}function M0(){return V.useContext(vh)||ko}var T0=(function(){function n(e,t){var i=this;this.inject=function(r,a){a===void 0&&(a=ko);var l=i.name+a.hash;r.hasNameForId(i.id,l)||r.insertRules(i.id,l,a(i.rules,l,"@keyframes"))},this.toString=function(){return qr(12,String(i.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return n.prototype.getName=function(e){return e===void 0&&(e=ko),this.name+e.hash},n})(),A0=/([A-Z])/,R0=/([A-Z])/g,C0=/^ms-/,N0=function(n){return"-"+n.toLowerCase()};function xc(n){return A0.test(n)?n.replace(R0,N0).replace(C0,"-ms-"):n}var _c=function(n){return n==null||n===!1||n===""};function sr(n,e,t,i){if(Array.isArray(n)){for(var r,a=[],l=0,o=n.length;l<o;l+=1)(r=sr(n[l],e,t,i))!==""&&(Array.isArray(r)?a.push.apply(a,r):a.push(r));return a}if(_c(n))return"";if(ul(n))return"."+n.styledComponentId;if(kr(n)){if(typeof(d=n)!="function"||d.prototype&&d.prototype.isReactComponent||!e)return n;var c=n(e);return sr(c,e,t,i)}var d;return n instanceof T0?t?(n.inject(t,i),n.getName(i)):n:Oo(n)?(function u(f,h){var g,v,x=[];for(var m in f)f.hasOwnProperty(m)&&!_c(f[m])&&(Array.isArray(f[m])&&f[m].isCss||kr(f[m])?x.push(xc(m)+":",f[m],";"):Oo(f[m])?x.push.apply(x,u(f[m],m)):x.push(xc(m)+": "+(g=m,(v=f[m])==null||typeof v=="boolean"||v===""?"":typeof v!="number"||v===0||g in Yx||g.startsWith("--")?String(v).trim():v+"px")+";"));return h?[h+" {"].concat(x,["}"]):x})(n):n.toString()}var vc=function(n){return Array.isArray(n)&&(n.isCss=!0),n};function P0(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];return kr(n)||Oo(n)?vc(sr(fc(Zs,[n].concat(t)))):t.length===0&&n.length===1&&typeof n[0]=="string"?n:vc(sr(fc(n,t)))}var L0=function(n,e,t){return t===void 0&&(t=ni),n.theme!==t.theme&&n.theme||e||t.theme},j0=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,D0=/(^-|-$)/g;function Fa(n){return n.replace(j0,"-").replace(D0,"")}var I0=function(n){return Fo(xh(n)>>>0)};function rs(n){return typeof n=="string"&&!0}var Bo=function(n){return typeof n=="function"||typeof n=="object"&&n!==null&&!Array.isArray(n)},U0=function(n){return n!=="__proto__"&&n!=="constructor"&&n!=="prototype"};function O0(n,e,t){var i=n[t];Bo(e)&&Bo(i)?yh(i,e):n[t]=e}function yh(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];for(var r=0,a=t;r<a.length;r++){var l=a[r];if(Bo(l))for(var o in l)U0(o)&&O0(n,l[o],o)}return n}var bh=Hr.createContext();bh.Consumer;var ka={};function Sh(n,e,t){var i=ul(n),r=!rs(n),a=e.attrs,l=a===void 0?Zs:a,o=e.componentId,c=o===void 0?(function(y,_){var E=typeof y!="string"?"sc":Fa(y);ka[E]=(ka[E]||0)+1;var S=E+"-"+I0("5.3.11"+E+ka[E]);return _?_+"-"+S:S})(e.displayName,e.parentComponentId):o,d=e.displayName,u=d===void 0?(function(y){return rs(y)?"styled."+y:"Styled("+pc(y)+")"})(n):d,f=e.displayName&&e.componentId?Fa(e.displayName)+"-"+e.componentId:e.componentId||c,h=i&&n.attrs?Array.prototype.concat(n.attrs,l).filter(Boolean):l,g=e.shouldForwardProp;i&&n.shouldForwardProp&&(g=e.shouldForwardProp?function(y,_,E){return n.shouldForwardProp(y,_,E)&&e.shouldForwardProp(y,_,E)}:n.shouldForwardProp);var v,x=new v0(t,f,i?n.componentStyle:void 0),m=x.isStatic&&l.length===0,p=function(y,_){return(function(E,S,A,T){var N=E.attrs,b=E.componentStyle,M=E.defaultProps,I=E.foldedComponentIds,k=E.shouldForwardProp,$=E.styledComponentId,P=E.target,z=(function(Q,O,ye){Q===void 0&&(Q=ni);var Y=Bn({},O,{theme:Q}),we={};return ye.forEach((function(Me){var oe,U,Ze,be=Me;for(oe in kr(be)&&(be=be(Y)),be)Y[oe]=we[oe]=oe==="className"?(U=we[oe],Ze=be[oe],U&&Ze?U+" "+Ze:U||Ze):be[oe]})),[Y,we]})(L0(S,V.useContext(bh),M)||ni,S,N),J=z[0],K=z[1],ae=(function(Q,O,ye,Y){var we=E0(),Me=M0(),oe=O?Q.generateAndInjectStyles(ni,we,Me):Q.generateAndInjectStyles(ye,we,Me);return oe})(b,T,J),ee=A,ie=K.$as||S.$as||K.as||S.as||P,D=rs(ie),L=K!==S?Bn({},S,{},K):S,G={};for(var B in L)B[0]!=="$"&&B!=="as"&&(B==="forwardedAs"?G.as=L[B]:(k?k(B,cc,ie):!D||cc(B))&&(G[B]=L[B]));return S.style&&K.style!==S.style&&(G.style=Bn({},S.style,{},K.style)),G.className=Array.prototype.concat(I,$,ae!==$?ae:null,S.className,K.className).filter(Boolean).join(" "),G.ref=ee,V.createElement(ie,G)})(v,y,_,m)};return p.displayName=u,(v=Hr.forwardRef(p)).attrs=h,v.componentStyle=x,v.displayName=u,v.shouldForwardProp=g,v.foldedComponentIds=i?Array.prototype.concat(n.foldedComponentIds,n.styledComponentId):Zs,v.styledComponentId=f,v.target=i?n.target:n,v.withComponent=function(y){var _=e.componentId,E=(function(A,T){if(A==null)return{};var N,b,M={},I=Object.keys(A);for(b=0;b<I.length;b++)N=I[b],T.indexOf(N)>=0||(M[N]=A[N]);return M})(e,["componentId"]),S=_&&_+"-"+(rs(y)?y:Fa(pc(y)));return Sh(y,Bn({},E,{attrs:h,componentId:S}),t)},Object.defineProperty(v,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(y){this._foldedDefaultProps=i?yh({},n.defaultProps,y):y}}),Object.defineProperty(v,"toString",{value:function(){return"."+v.styledComponentId}}),r&&n0(v,n,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),v}var re=function(n){return(function e(t,i,r){if(r===void 0&&(r=ni),!ph.isValidElementType(i))return qr(1,String(i));var a=function(){return t(i,r,P0.apply(void 0,arguments))};return a.withConfig=function(l){return e(t,i,Bn({},r,{},l))},a.attrs=function(l){return e(t,i,Bn({},r,{attrs:Array.prototype.concat(r.attrs,l).filter(Boolean)}))},a})(Sh,n)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(n){re[n]=re(n)}));const F0="http://localhost:5000/api",Ke=xt.create({baseURL:F0,timeout:1e4,headers:{"Content-Type":"application/json"}});Ke.interceptors.request.use(n=>{const e=localStorage.getItem("authToken");return e&&(n.headers.Authorization=`Bearer ${e}`),n},n=>Promise.reject(n));Ke.interceptors.response.use(n=>n,n=>(n.response?.status===401&&localStorage.removeItem("authToken"),Promise.reject(n)));const Qs={async getAllArtworks(){return(await Ke.get("/artworks")).data},async getArtworkById(n){return(await Ke.get(`/artworks/${n}`)).data},async searchArtworks(n){return(await Ke.get(`/artworks/search/${encodeURIComponent(n)}`)).data},async filterArtworksByTags(n){return(await Ke.get(`/artworks/filter/${n.join(",")}`)).data},async createArtwork(n){return(await Ke.post("/artworks",n)).data},async updateArtwork(n,e){return(await Ke.put(`/artworks/${n}`,e)).data},async deleteArtwork(n){await Ke.delete(`/artworks/${n}`)},async getRecommendedArtworks(n){return(await Ke.get(`/artworks/recommendations${n?`?count=${n}`:""}`)).data},async getSimilarArtworks(n,e){return(await Ke.get(`/artworks/${n}/similar${e?`?count=${e}`:""}`)).data},async getArtworkAnalytics(n){return(await Ke.get(`/artworks/${n}/analytics`)).data}},Pr={async getAllGalleries(){return(await Ke.get("/galleries")).data},async getGalleryById(n){return(await Ke.get(`/galleries/${n}`)).data},async createGallery(n){return(await Ke.post("/galleries",n)).data},async updateGallery(n,e){return(await Ke.put(`/galleries/${n}`,e)).data},async deleteGallery(n){await Ke.delete(`/galleries/${n}`)},async getRooms(n){return(await Ke.get(`/galleries/${n}/rooms`)).data},async getRoomById(n){return(await Ke.get(`/rooms/${n}`)).data},async createRoom(n,e){return(await Ke.post(`/galleries/${n}/rooms`,e)).data},async updateRoom(n,e){return(await Ke.put(`/rooms/${n}`,e)).data},async deleteRoom(n){await Ke.delete(`/rooms/${n}`)},async getExhibitions(n){return(await Ke.get(`/galleries/${n}/exhibitions`)).data},async getExhibitionById(n){return(await Ke.get(`/exhibitions/${n}`)).data},async createExhibition(n,e){return(await Ke.post(`/galleries/${n}/exhibitions`,e)).data},async updateExhibition(n,e){return(await Ke.put(`/exhibitions/${n}`,e)).data},async deleteExhibition(n){await Ke.delete(`/exhibitions/${n}`)},async getVirtualTours(n){return(await Ke.get(`/galleries/${n}/virtual-tours`)).data},async getVirtualTourById(n){return(await Ke.get(`/virtual-tours/${n}`)).data},async createVirtualTour(n,e){return(await Ke.post(`/galleries/${n}/virtual-tours`,e)).data},async updateVirtualTour(n,e){return(await Ke.put(`/virtual-tours/${n}`,e)).data},async deleteVirtualTour(n){await Ke.delete(`/virtual-tours/${n}`)}};class k0{cache=new Map;maxSize;currentSize=0;constructor(e=100){this.maxSize=e*1024*1024}async loadImage(e){if(this.cache.has(e)){const t=this.cache.get(e);return t.timestamp=Date.now(),URL.createObjectURL(t.blob)}try{const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load image: ${t.statusText}`);const i=await t.blob(),r=i.size;if(r>this.maxSize)return console.warn(`Image ${e} is too large to cache (${r} bytes)`),e;this.evictIfNeeded(r);const a={url:e,blob:i,timestamp:Date.now(),size:r};return this.cache.set(e,a),this.currentSize+=r,URL.createObjectURL(i)}catch(t){throw console.error(`Error loading image ${e}:`,t),t}}async loadImages(e){const t=e.map(i=>this.loadImage(i).catch(r=>r));return Promise.all(t)}removeFromCache(e){if(this.cache.has(e)){const t=this.cache.get(e);return this.cache.delete(e),this.currentSize-=t.size,!0}return!1}clearCache(){this.cache.forEach(e=>{URL.revokeObjectURL(URL.createObjectURL(e.blob))}),this.cache.clear(),this.currentSize=0}getCacheInfo(){return{size:this.currentSize,count:this.cache.size,maxSize:this.maxSize}}evictIfNeeded(e){for(;this.currentSize+e>this.maxSize&&this.cache.size>0;){let t=null,i=Number.MAX_SAFE_INTEGER;for(const[r,a]of this.cache)a.timestamp<i&&(i=a.timestamp,t=r);if(t){const r=this.cache.get(t);this.cache.delete(t),this.currentSize-=r.size,URL.revokeObjectURL(this.getUrlFromBlob(r.blob))}else break}}getUrlFromBlob(e){return""}async preloadImages(e,t){const i=e.length;let r=0;const a=e.map(async l=>{try{await this.loadImage(l),r++,t?.(r,i)}catch(o){console.error(`Failed to preload image ${l}:`,o),r++,t?.(r,i)}});await Promise.all(a)}}const yr=new k0(100),Zt={async uploadImage(n,e){const t=new FormData;return t.append("image",n),t.append("uploaded_by",e.toString()),(await Ke.post("/api/artworks/upload",t,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:r=>{const a=Math.round(r.loaded*100/(r.total||1));console.log(`Загрузка: ${a}%`)}})).data},async analyzeImage(n){return(await Ke.post(`/artworks/${n}/analyze`)).data},async getImageAnalysis(n){return(await Ke.get(`/artworks/${n}/analysis`)).data},async submitArtworkForReview(n){return(await Ke.post("/artworks/submit-for-review",n)).data},async getUserUploads(n){return(await Ke.get(`/users/${n}/uploads`)).data},async getSubmissionsForReview(){return(await Ke.get("/artworks/submissions-for-review")).data},async approveSubmission(n,e){await Ke.post(`/artworks/submissions/${n}/approve`,e)},async rejectSubmission(n,e){await Ke.post(`/artworks/submissions/${n}/reject`,{reason:e})},async reanalyzeImage(n){return(await Ke.post(`/artworks/${n}/reanalyze`)).data},async generateNFT(n,e){return(await Ke.post("/artworks/generate-nft",{artworkId:n,ownerInfo:e})).data},async loadAndCacheImage(n){return await yr.loadImage(n)},async loadAndCacheImages(n){return await yr.loadImages(n)},async preloadImages(n,e){return await yr.preloadImages(n,e)},getCacheInfo(){return yr.getCacheInfo()},clearCache(){yr.clearCache()}},Ba=re.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`,B0=re.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`,z0=re.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`,H0=re.div`
  flex: 1;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`,G0=re.div`
  flex: 1;
`,V0=re.h1`
  margin: 0 0 1rem 0;
  color: #333;
`,W0=re.h2`
  margin: 0 0 1.5rem 0;
  color: #666;
  font-weight: 500;
`,X0=re.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,q0=re.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`,ss=re.div`
  display: flex;
  flex-direction: column;
`,br=re.span`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.25rem;
`,as=re.span`
  color: #333;
`,$0=re.div`
  margin-top: 1.5rem;
`,Y0=re.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,K0=re.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`,wh=re.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`,Z0=re(wh)`
  background-color: ${({isFavorite:n})=>n?"#f44336":"#2196f3"};
  color: white;
`,J0=re(wh)`
  background-color: #4caf50;
  color: white;
`,Q0=re.div`
  margin-top: 3rem;
`,e_=re.h3`
  margin-bottom: 1.5rem;
  color: #333;
`,t_=re.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`,n_=()=>{const{id:n}=la(),e=oa(),[t,i]=V.useState(null),[r,a]=V.useState([]),[l,o]=V.useState(!0),[c,d]=V.useState(!1);V.useEffect(()=>{(async()=>{try{if(n){const v=await Qs.getArtworkById(parseInt(n));i(v);const x=await Qs.getSimilarArtworks(parseInt(n),6);a(x)}}catch(v){console.error("Ошибка при загрузке экспоната:",v)}finally{o(!1)}})()},[n]);const u=()=>{e(-1)},f=()=>{d(!c)},h=()=>{navigator.share?navigator.share({title:t?.title,text:`Посмотрите это удивительное произведение искусства: ${t?.title} от ${t?.artist_name}`,url:window.location.href}).catch(console.error):navigator.clipboard.writeText(window.location.href).then(()=>{alert("Ссылка скопирована в буфер обмена!")})};return l?s.jsx(Ba,{children:"Загрузка экспоната..."}):t?s.jsxs(Ba,{children:[s.jsx(B0,{onClick:u,children:"← Назад"}),s.jsxs(z0,{children:[s.jsx(H0,{children:t.image_url?s.jsx("img",{src:t.image_url,alt:t.title,style:{width:"100%",height:"100%",objectFit:"contain"}}):s.jsx("span",{children:"Изображение недоступно"})}),s.jsxs(G0,{children:[s.jsx(V0,{children:t.title}),s.jsx(W0,{children:t.artist_name}),s.jsx(X0,{children:t.description}),s.jsxs(q0,{children:[s.jsxs(ss,{children:[s.jsx(br,{children:"Год создания"}),s.jsx(as,{children:t.year_created||"Неизвестно"})]}),s.jsxs(ss,{children:[s.jsx(br,{children:"Техника"}),s.jsx(as,{children:t.medium||"Неизвестно"})]}),s.jsxs(ss,{children:[s.jsx(br,{children:"Размеры"}),s.jsx(as,{children:t.dimensions||"Неизвестны"})]}),s.jsxs(ss,{children:[s.jsx(br,{children:"Стиль"}),s.jsx(as,{children:t.style||"Неизвестно"})]})]}),s.jsxs($0,{children:[s.jsx(br,{children:"Теги:"}),t.tags&&t.tags.length>0?t.tags.map((g,v)=>s.jsx(Y0,{children:g},v)):s.jsx("span",{children:"Теги отсутствуют"})]}),s.jsxs(K0,{children:[s.jsx(Z0,{isFavorite:c,onClick:f,children:c?"Удалить из избранного":"Добавить в избранное"}),s.jsx(J0,{onClick:h,children:"Поделиться"})]})]})]}),r.length>0&&s.jsxs(Q0,{children:[s.jsx(e_,{children:"Похожие экспонаты"}),s.jsx(t_,{children:r.map(g=>s.jsxs("div",{onClick:()=>e(`/artworks/${g.artwork_id}`),style:{cursor:"pointer"},children:[s.jsx("img",{src:g.image_url||"",alt:g.title,style:{width:"100%",height:"150px",objectFit:"cover",borderRadius:"4px"}}),s.jsxs("div",{children:[s.jsx("h4",{children:g.title}),s.jsx("p",{children:g.artist_name})]})]},g.artwork_id))})]})]}):s.jsx(Ba,{children:"Экспонат не найден"})};const fl="158",ji={ROTATE:0,DOLLY:1,PAN:2},Di={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},i_=0,yc=1,r_=2,Eh=1,Mh=2,kn=3,ai=0,Qt=1,An=2,ii=0,tr=1,bc=2,Sc=3,wc=4,s_=5,xi=100,a_=101,o_=102,Ec=103,Mc=104,l_=200,c_=201,d_=202,u_=203,zo=204,Ho=205,h_=206,f_=207,p_=208,m_=209,g_=210,x_=211,__=212,v_=213,y_=214,b_=0,S_=1,w_=2,ea=3,E_=4,M_=5,T_=6,A_=7,Th=0,R_=1,C_=2,ri=0,N_=1,P_=2,L_=3,Ah=4,j_=5,Rh=300,ar=301,or=302,Go=303,Vo=304,_a=306,Wo=1e3,yn=1001,Xo=1002,Wt=1003,Tc=1004,za=1005,dn=1006,D_=1007,Br=1008,si=1009,I_=1010,U_=1011,pl=1012,Ch=1013,Qn=1014,ei=1015,zr=1016,Nh=1017,Ph=1018,bi=1020,O_=1021,bn=1023,F_=1024,k_=1025,Si=1026,lr=1027,B_=1028,Lh=1029,z_=1030,jh=1031,Dh=1033,Ha=33776,Ga=33777,Va=33778,Wa=33779,Ac=35840,Rc=35841,Cc=35842,Nc=35843,H_=36196,Pc=37492,Lc=37496,jc=37808,Dc=37809,Ic=37810,Uc=37811,Oc=37812,Fc=37813,kc=37814,Bc=37815,zc=37816,Hc=37817,Gc=37818,Vc=37819,Wc=37820,Xc=37821,Xa=36492,qc=36494,$c=36495,G_=36283,Yc=36284,Kc=36285,Zc=36286,Ih=3e3,wi=3001,V_=3200,W_=3201,Uh=0,X_=1,hn="",Ot="srgb",Gn="srgb-linear",ml="display-p3",va="display-p3-linear",ta="linear",pt="srgb",na="rec709",ia="p3",Ii=7680,Jc=519,q_=512,$_=513,Y_=514,K_=515,Z_=516,J_=517,Q_=518,ev=519,Qc=35044,ed="300 es",qo=1035,zn=2e3,ra=2001;class Ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,l=r.length;a<l;a++)r[a].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xs=Math.PI/180,sa=180/Math.PI;function $r(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]).toLowerCase()}function Xt(n,e,t){return Math.max(e,Math.min(t,n))}function tv(n,e){return(n%e+e)%e}function qa(n,e,t){return(1-t)*n+t*e}function td(n){return(n&n-1)===0&&n!==0}function $o(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Sr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Yt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const nv={DEG2RAD:Xs};class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,l=this.y-e.y;return this.x=a*i-l*r+e.x,this.y=a*r+l*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,i,r,a,l,o,c,d){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,l,o,c,d)}set(e,t,i,r,a,l,o,c,d){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=l,u[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,l=i[0],o=i[3],c=i[6],d=i[1],u=i[4],f=i[7],h=i[2],g=i[5],v=i[8],x=r[0],m=r[3],p=r[6],y=r[1],_=r[4],E=r[7],S=r[2],A=r[5],T=r[8];return a[0]=l*x+o*y+c*S,a[3]=l*m+o*_+c*A,a[6]=l*p+o*E+c*T,a[1]=d*x+u*y+f*S,a[4]=d*m+u*_+f*A,a[7]=d*p+u*E+f*T,a[2]=h*x+g*y+v*S,a[5]=h*m+g*_+v*A,a[8]=h*p+g*E+v*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8];return t*l*u-t*o*d-i*a*u+i*o*c+r*a*d-r*l*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8],f=u*l-o*d,h=o*c-u*a,g=d*a-l*c,v=t*f+i*h+r*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=f*x,e[1]=(r*d-u*i)*x,e[2]=(o*i-r*l)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*a-o*t)*x,e[6]=g*x,e[7]=(i*c-d*t)*x,e[8]=(l*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,l,o){const c=Math.cos(a),d=Math.sin(a);return this.set(i*c,i*d,-i*(c*l+d*o)+l+e,-r*d,r*c,-r*(-d*l+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply($a.makeScale(e,t)),this}rotate(e){return this.premultiply($a.makeRotation(-e)),this}translate(e,t){return this.premultiply($a.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $a=new nt;function Oh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function iv(){const n=aa("canvas");return n.style.display="block",n}const nd={};function Ir(n){n in nd||(nd[n]=!0,console.warn(n))}const id=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),rd=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),os={[Gn]:{transfer:ta,primaries:na,toReference:n=>n,fromReference:n=>n},[Ot]:{transfer:pt,primaries:na,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[va]:{transfer:ta,primaries:ia,toReference:n=>n.applyMatrix3(rd),fromReference:n=>n.applyMatrix3(id)},[ml]:{transfer:pt,primaries:ia,toReference:n=>n.convertSRGBToLinear().applyMatrix3(rd),fromReference:n=>n.applyMatrix3(id).convertLinearToSRGB()}},rv=new Set([Gn,va]),dt={enabled:!0,_workingColorSpace:Gn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!rv.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=os[e].toReference,r=os[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return os[n].primaries},getTransfer:function(n){return n===hn?ta:os[n].transfer}};function nr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ya(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ui;class Fh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ui===void 0&&(Ui=aa("canvas")),Ui.width=e.width,Ui.height=e.height;const i=Ui.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ui}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=aa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let l=0;l<a.length;l++)a[l]=nr(a[l]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(nr(t[i]/255)*255):t[i]=nr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sv=0;class kh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sv++}),this.uuid=$r(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let l=0,o=r.length;l<o;l++)r[l].isDataTexture?a.push(Ka(r[l].image)):a.push(Ka(r[l]))}else a=Ka(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function Ka(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let av=0;class en extends Ni{constructor(e=en.DEFAULT_IMAGE,t=en.DEFAULT_MAPPING,i=yn,r=yn,a=dn,l=Br,o=bn,c=si,d=en.DEFAULT_ANISOTROPY,u=hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:av++}),this.uuid=$r(),this.name="",this.source=new kh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=o,this.internalFormat=null,this.type=c,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===wi?Ot:hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wo:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wo:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ot?wi:Ih}set encoding(e){Ir("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===wi?Ot:hn}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Rh;en.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,t=0,i=0,r=1){Dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,l=e.elements;return this.x=l[0]*t+l[4]*i+l[8]*r+l[12]*a,this.y=l[1]*t+l[5]*i+l[9]*r+l[13]*a,this.z=l[2]*t+l[6]*i+l[10]*r+l[14]*a,this.w=l[3]*t+l[7]*i+l[11]*r+l[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,d=c[0],u=c[4],f=c[8],h=c[1],g=c[5],v=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(v+m)<.1&&Math.abs(d+g+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(d+1)/2,E=(g+1)/2,S=(p+1)/2,A=(u+h)/4,T=(f+x)/4,N=(v+m)/4;return _>E&&_>S?_<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(_),r=A/i,a=T/i):E>S?E<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(E),i=A/r,a=N/r):S<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(S),i=T/a,r=N/a),this.set(i,r,a,t),this}let y=Math.sqrt((m-v)*(m-v)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-v)/y,this.y=(f-x)/y,this.z=(h-u)/y,this.w=Math.acos((d+g+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ov extends Ni{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Ir("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===wi?Ot:hn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new en(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new kh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends ov{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Bh extends en{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lv extends en{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ri{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,l,o){let c=i[r+0],d=i[r+1],u=i[r+2],f=i[r+3];const h=a[l+0],g=a[l+1],v=a[l+2],x=a[l+3];if(o===0){e[t+0]=c,e[t+1]=d,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=h,e[t+1]=g,e[t+2]=v,e[t+3]=x;return}if(f!==x||c!==h||d!==g||u!==v){let m=1-o;const p=c*h+d*g+u*v+f*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const S=Math.sqrt(_),A=Math.atan2(S,p*y);m=Math.sin(m*A)/S,o=Math.sin(o*A)/S}const E=o*y;if(c=c*m+h*E,d=d*m+g*E,u=u*m+v*E,f=f*m+x*E,m===1-o){const S=1/Math.sqrt(c*c+d*d+u*u+f*f);c*=S,d*=S,u*=S,f*=S}}e[t]=c,e[t+1]=d,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,l){const o=i[r],c=i[r+1],d=i[r+2],u=i[r+3],f=a[l],h=a[l+1],g=a[l+2],v=a[l+3];return e[t]=o*v+u*f+c*g-d*h,e[t+1]=c*v+u*h+d*f-o*g,e[t+2]=d*v+u*g+o*h-c*f,e[t+3]=u*v-o*f-c*h-d*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,r=e._y,a=e._z,l=e._order,o=Math.cos,c=Math.sin,d=o(i/2),u=o(r/2),f=o(a/2),h=c(i/2),g=c(r/2),v=c(a/2);switch(l){case"XYZ":this._x=h*u*f+d*g*v,this._y=d*g*f-h*u*v,this._z=d*u*v+h*g*f,this._w=d*u*f-h*g*v;break;case"YXZ":this._x=h*u*f+d*g*v,this._y=d*g*f-h*u*v,this._z=d*u*v-h*g*f,this._w=d*u*f+h*g*v;break;case"ZXY":this._x=h*u*f-d*g*v,this._y=d*g*f+h*u*v,this._z=d*u*v+h*g*f,this._w=d*u*f-h*g*v;break;case"ZYX":this._x=h*u*f-d*g*v,this._y=d*g*f+h*u*v,this._z=d*u*v-h*g*f,this._w=d*u*f+h*g*v;break;case"YZX":this._x=h*u*f+d*g*v,this._y=d*g*f+h*u*v,this._z=d*u*v-h*g*f,this._w=d*u*f-h*g*v;break;case"XZY":this._x=h*u*f-d*g*v,this._y=d*g*f-h*u*v,this._z=d*u*v+h*g*f,this._w=d*u*f+h*g*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],l=t[1],o=t[5],c=t[9],d=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(u-c)*g,this._y=(a-d)*g,this._z=(l-r)*g}else if(i>o&&i>f){const g=2*Math.sqrt(1+i-o-f);this._w=(u-c)/g,this._x=.25*g,this._y=(r+l)/g,this._z=(a+d)/g}else if(o>f){const g=2*Math.sqrt(1+o-i-f);this._w=(a-d)/g,this._x=(r+l)/g,this._y=.25*g,this._z=(c+u)/g}else{const g=2*Math.sqrt(1+f-i-o);this._w=(l-r)/g,this._x=(a+d)/g,this._y=(c+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,l=e._w,o=t._x,c=t._y,d=t._z,u=t._w;return this._x=i*u+l*o+r*d-a*c,this._y=r*u+l*c+a*o-i*d,this._z=a*u+l*d+i*c-r*o,this._w=l*u-i*o-r*c-a*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,a=this._z,l=this._w;let o=l*e._w+i*e._x+r*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=l,this._x=i,this._y=r,this._z=a,this;const c=1-o*o;if(c<=Number.EPSILON){const g=1-t;return this._w=g*l+t*this._w,this._x=g*i+t*this._x,this._y=g*r+t*this._y,this._z=g*a+t*this._z,this.normalize(),this._onChangeCallback(),this}const d=Math.sqrt(c),u=Math.atan2(d,o),f=Math.sin((1-t)*u)/d,h=Math.sin(t*u)/d;return this._w=l*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=a*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(a),i*Math.cos(a),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,t=0,i=0){q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,l=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*l,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*l,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*l,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,l=e.y,o=e.z,c=e.w,d=2*(l*r-o*i),u=2*(o*t-a*r),f=2*(a*i-l*t);return this.x=t+c*d+l*f-o*u,this.y=i+c*u+o*d-a*f,this.z=r+c*f+a*u-l*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,l=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*l-i*c,this.z=i*o-r*l,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Za.copy(this).projectOnVector(e),this.sub(Za)}reflect(e){return this.sub(Za.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Za=new q,sd=new Ri;class Pi{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let l=0,o=a.count;l<o;l++)e.isMesh===!0?e.getVertexPosition(l,mn):mn.fromBufferAttribute(a,l),mn.applyMatrix4(e.matrixWorld),this.expandByPoint(mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ls.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(e.matrixWorld),this.union(ls)}const r=e.children;for(let a=0,l=r.length;a<l;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,mn),mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),cs.subVectors(this.max,wr),Oi.subVectors(e.a,wr),Fi.subVectors(e.b,wr),ki.subVectors(e.c,wr),qn.subVectors(Fi,Oi),$n.subVectors(ki,Fi),ui.subVectors(Oi,ki);let t=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-ui.z,ui.y,qn.z,0,-qn.x,$n.z,0,-$n.x,ui.z,0,-ui.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-ui.y,ui.x,0];return!Ja(t,Oi,Fi,ki,cs)||(t=[1,0,0,0,1,0,0,0,1],!Ja(t,Oi,Fi,ki,cs))?!1:(ds.crossVectors(qn,$n),t=[ds.x,ds.y,ds.z],Ja(t,Oi,Fi,ki,cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Dn=[new q,new q,new q,new q,new q,new q,new q,new q],mn=new q,ls=new Pi,Oi=new q,Fi=new q,ki=new q,qn=new q,$n=new q,ui=new q,wr=new q,cs=new q,ds=new q,hi=new q;function Ja(n,e,t,i,r){for(let a=0,l=n.length-3;a<=l;a+=3){hi.fromArray(n,a);const o=r.x*Math.abs(hi.x)+r.y*Math.abs(hi.y)+r.z*Math.abs(hi.z),c=e.dot(hi),d=t.dot(hi),u=i.dot(hi);if(Math.max(-Math.max(c,d,u),Math.min(c,d,u))>o)return!1}return!0}const cv=new Pi,Er=new q,Qa=new q;class Yr{constructor(e=new q,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):cv.setFromPoints(e).getCenter(i);let r=0;for(let a=0,l=e.length;a<l;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);const t=Er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Er,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Qa)),this.expandByPoint(Er.copy(e.center).sub(Qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new q,eo=new q,us=new q,Yn=new q,to=new q,hs=new q,no=new q;class gl{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){eo.copy(e).add(t).multiplyScalar(.5),us.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(eo);const a=e.distanceTo(t)*.5,l=-this.direction.dot(us),o=Yn.dot(this.direction),c=-Yn.dot(us),d=Yn.lengthSq(),u=Math.abs(1-l*l);let f,h,g,v;if(u>0)if(f=l*c-o,h=l*o-c,v=a*u,f>=0)if(h>=-v)if(h<=v){const x=1/u;f*=x,h*=x,g=f*(f+l*h+2*o)+h*(l*f+h+2*c)+d}else h=a,f=Math.max(0,-(l*h+o)),g=-f*f+h*(h+2*c)+d;else h=-a,f=Math.max(0,-(l*h+o)),g=-f*f+h*(h+2*c)+d;else h<=-v?(f=Math.max(0,-(-l*a+o)),h=f>0?-a:Math.min(Math.max(-a,-c),a),g=-f*f+h*(h+2*c)+d):h<=v?(f=0,h=Math.min(Math.max(-a,-c),a),g=h*(h+2*c)+d):(f=Math.max(0,-(l*a+o)),h=f>0?a:Math.min(Math.max(-a,-c),a),g=-f*f+h*(h+2*c)+d);else h=l>0?-a:a,f=Math.max(0,-(l*h+o)),g=-f*f+h*(h+2*c)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(eo).addScaledVector(us,h),g}intersectSphere(e,t){In.subVectors(e.center,this.origin);const i=In.dot(this.direction),r=In.dot(In)-i*i,a=e.radius*e.radius;if(r>a)return null;const l=Math.sqrt(a-r),o=i-l,c=i+l;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,l,o,c;const d=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return d>=0?(i=(e.min.x-h.x)*d,r=(e.max.x-h.x)*d):(i=(e.max.x-h.x)*d,r=(e.min.x-h.x)*d),u>=0?(a=(e.min.y-h.y)*u,l=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,l=(e.min.y-h.y)*u),i>l||a>r||((a>i||isNaN(i))&&(i=a),(l<r||isNaN(r))&&(r=l),f>=0?(o=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,i,r,a){to.subVectors(t,e),hs.subVectors(i,e),no.crossVectors(to,hs);let l=this.direction.dot(no),o;if(l>0){if(r)return null;o=1}else if(l<0)o=-1,l=-l;else return null;Yn.subVectors(this.origin,e);const c=o*this.direction.dot(hs.crossVectors(Yn,hs));if(c<0)return null;const d=o*this.direction.dot(to.cross(Yn));if(d<0||c+d>l)return null;const u=-o*Yn.dot(no);return u<0?null:this.at(u/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,r,a,l,o,c,d,u,f,h,g,v,x,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,l,o,c,d,u,f,h,g,v,x,m)}set(e,t,i,r,a,l,o,c,d,u,f,h,g,v,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=a,p[5]=l,p[9]=o,p[13]=c,p[2]=d,p[6]=u,p[10]=f,p[14]=h,p[3]=g,p[7]=v,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Bi.setFromMatrixColumn(e,0).length(),a=1/Bi.setFromMatrixColumn(e,1).length(),l=1/Bi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*l,t[9]=i[9]*l,t[10]=i[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,l=Math.cos(i),o=Math.sin(i),c=Math.cos(r),d=Math.sin(r),u=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const h=l*u,g=l*f,v=o*u,x=o*f;t[0]=c*u,t[4]=-c*f,t[8]=d,t[1]=g+v*d,t[5]=h-x*d,t[9]=-o*c,t[2]=x-h*d,t[6]=v+g*d,t[10]=l*c}else if(e.order==="YXZ"){const h=c*u,g=c*f,v=d*u,x=d*f;t[0]=h+x*o,t[4]=v*o-g,t[8]=l*d,t[1]=l*f,t[5]=l*u,t[9]=-o,t[2]=g*o-v,t[6]=x+h*o,t[10]=l*c}else if(e.order==="ZXY"){const h=c*u,g=c*f,v=d*u,x=d*f;t[0]=h-x*o,t[4]=-l*f,t[8]=v+g*o,t[1]=g+v*o,t[5]=l*u,t[9]=x-h*o,t[2]=-l*d,t[6]=o,t[10]=l*c}else if(e.order==="ZYX"){const h=l*u,g=l*f,v=o*u,x=o*f;t[0]=c*u,t[4]=v*d-g,t[8]=h*d+x,t[1]=c*f,t[5]=x*d+h,t[9]=g*d-v,t[2]=-d,t[6]=o*c,t[10]=l*c}else if(e.order==="YZX"){const h=l*c,g=l*d,v=o*c,x=o*d;t[0]=c*u,t[4]=x-h*f,t[8]=v*f+g,t[1]=f,t[5]=l*u,t[9]=-o*u,t[2]=-d*u,t[6]=g*f+v,t[10]=h-x*f}else if(e.order==="XZY"){const h=l*c,g=l*d,v=o*c,x=o*d;t[0]=c*u,t[4]=-f,t[8]=d*u,t[1]=h*f+x,t[5]=l*u,t[9]=g*f-v,t[2]=v*f-g,t[6]=o*u,t[10]=x*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dv,e,uv)}lookAt(e,t,i){const r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),Kn.crossVectors(i,rn),Kn.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),Kn.crossVectors(i,rn)),Kn.normalize(),fs.crossVectors(rn,Kn),r[0]=Kn.x,r[4]=fs.x,r[8]=rn.x,r[1]=Kn.y,r[5]=fs.y,r[9]=rn.y,r[2]=Kn.z,r[6]=fs.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,l=i[0],o=i[4],c=i[8],d=i[12],u=i[1],f=i[5],h=i[9],g=i[13],v=i[2],x=i[6],m=i[10],p=i[14],y=i[3],_=i[7],E=i[11],S=i[15],A=r[0],T=r[4],N=r[8],b=r[12],M=r[1],I=r[5],k=r[9],$=r[13],P=r[2],z=r[6],J=r[10],K=r[14],ae=r[3],ee=r[7],ie=r[11],D=r[15];return a[0]=l*A+o*M+c*P+d*ae,a[4]=l*T+o*I+c*z+d*ee,a[8]=l*N+o*k+c*J+d*ie,a[12]=l*b+o*$+c*K+d*D,a[1]=u*A+f*M+h*P+g*ae,a[5]=u*T+f*I+h*z+g*ee,a[9]=u*N+f*k+h*J+g*ie,a[13]=u*b+f*$+h*K+g*D,a[2]=v*A+x*M+m*P+p*ae,a[6]=v*T+x*I+m*z+p*ee,a[10]=v*N+x*k+m*J+p*ie,a[14]=v*b+x*$+m*K+p*D,a[3]=y*A+_*M+E*P+S*ae,a[7]=y*T+_*I+E*z+S*ee,a[11]=y*N+_*k+E*J+S*ie,a[15]=y*b+_*$+E*K+S*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],l=e[1],o=e[5],c=e[9],d=e[13],u=e[2],f=e[6],h=e[10],g=e[14],v=e[3],x=e[7],m=e[11],p=e[15];return v*(+a*c*f-r*d*f-a*o*h+i*d*h+r*o*g-i*c*g)+x*(+t*c*g-t*d*h+a*l*h-r*l*g+r*d*u-a*c*u)+m*(+t*d*f-t*o*g-a*l*f+i*l*g+a*o*u-i*d*u)+p*(-r*o*u-t*c*f+t*o*h+r*l*f-i*l*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8],f=e[9],h=e[10],g=e[11],v=e[12],x=e[13],m=e[14],p=e[15],y=f*m*d-x*h*d+x*c*g-o*m*g-f*c*p+o*h*p,_=v*h*d-u*m*d-v*c*g+l*m*g+u*c*p-l*h*p,E=u*x*d-v*f*d+v*o*g-l*x*g-u*o*p+l*f*p,S=v*f*c-u*x*c-v*o*h+l*x*h+u*o*m-l*f*m,A=t*y+i*_+r*E+a*S;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=y*T,e[1]=(x*h*a-f*m*a-x*r*g+i*m*g+f*r*p-i*h*p)*T,e[2]=(o*m*a-x*c*a+x*r*d-i*m*d-o*r*p+i*c*p)*T,e[3]=(f*c*a-o*h*a-f*r*d+i*h*d+o*r*g-i*c*g)*T,e[4]=_*T,e[5]=(u*m*a-v*h*a+v*r*g-t*m*g-u*r*p+t*h*p)*T,e[6]=(v*c*a-l*m*a-v*r*d+t*m*d+l*r*p-t*c*p)*T,e[7]=(l*h*a-u*c*a+u*r*d-t*h*d-l*r*g+t*c*g)*T,e[8]=E*T,e[9]=(v*f*a-u*x*a-v*i*g+t*x*g+u*i*p-t*f*p)*T,e[10]=(l*x*a-v*o*a+v*i*d-t*x*d-l*i*p+t*o*p)*T,e[11]=(u*o*a-l*f*a-u*i*d+t*f*d+l*i*g-t*o*g)*T,e[12]=S*T,e[13]=(u*x*r-v*f*r+v*i*h-t*x*h-u*i*m+t*f*m)*T,e[14]=(v*o*r-l*x*r-v*i*c+t*x*c+l*i*m-t*o*m)*T,e[15]=(l*f*r-u*o*r+u*i*c-t*f*c-l*i*h+t*o*h)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,l=e.x,o=e.y,c=e.z,d=a*l,u=a*o;return this.set(d*l+i,d*o-r*c,d*c+r*o,0,d*o+r*c,u*o+i,u*c-r*l,0,d*c-r*o,u*c+r*l,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,l){return this.set(1,i,a,0,e,1,l,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,l=t._y,o=t._z,c=t._w,d=a+a,u=l+l,f=o+o,h=a*d,g=a*u,v=a*f,x=l*u,m=l*f,p=o*f,y=c*d,_=c*u,E=c*f,S=i.x,A=i.y,T=i.z;return r[0]=(1-(x+p))*S,r[1]=(g+E)*S,r[2]=(v-_)*S,r[3]=0,r[4]=(g-E)*A,r[5]=(1-(h+p))*A,r[6]=(m+y)*A,r[7]=0,r[8]=(v+_)*T,r[9]=(m-y)*T,r[10]=(1-(h+x))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let a=Bi.set(r[0],r[1],r[2]).length();const l=Bi.set(r[4],r[5],r[6]).length(),o=Bi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],gn.copy(this);const d=1/a,u=1/l,f=1/o;return gn.elements[0]*=d,gn.elements[1]*=d,gn.elements[2]*=d,gn.elements[4]*=u,gn.elements[5]*=u,gn.elements[6]*=u,gn.elements[8]*=f,gn.elements[9]*=f,gn.elements[10]*=f,t.setFromRotationMatrix(gn),i.x=a,i.y=l,i.z=o,this}makePerspective(e,t,i,r,a,l,o=zn){const c=this.elements,d=2*a/(t-e),u=2*a/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let g,v;if(o===zn)g=-(l+a)/(l-a),v=-2*l*a/(l-a);else if(o===ra)g=-l/(l-a),v=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,a,l,o=zn){const c=this.elements,d=1/(t-e),u=1/(i-r),f=1/(l-a),h=(t+e)*d,g=(i+r)*u;let v,x;if(o===zn)v=(l+a)*f,x=-2*f;else if(o===ra)v=a*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*d,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-g,c[2]=0,c[6]=0,c[10]=x,c[14]=-v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Bi=new q,gn=new yt,dv=new q(0,0,0),uv=new q(1,1,1),Kn=new q,fs=new q,rn=new q,ad=new yt,od=new Ri;class cr{constructor(e=0,t=0,i=0,r=cr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],l=r[4],o=r[8],c=r[1],d=r[5],u=r[9],f=r[2],h=r[6],g=r[10];switch(t){case"XYZ":this._y=Math.asin(Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(h,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,d)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(h,d),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ad.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ad,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return od.setFromEuler(this),this.setFromQuaternion(od,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cr.DEFAULT_ORDER="XYZ";class xl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let hv=0;const ld=new q,zi=new Ri,Un=new yt,ps=new q,Mr=new q,fv=new q,pv=new Ri,cd=new q(1,0,0),dd=new q(0,1,0),ud=new q(0,0,1),mv={type:"added"},gv={type:"removed"};class It extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hv++}),this.uuid=$r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new q,t=new cr,i=new Ri,r=new q(1,1,1);function a(){i.setFromEuler(t,!1)}function l(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new yt},normalMatrix:{value:new nt}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new xl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.multiply(zi),this}rotateOnWorldAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.premultiply(zi),this}rotateX(e){return this.rotateOnAxis(cd,e)}rotateY(e){return this.rotateOnAxis(dd,e)}rotateZ(e){return this.rotateOnAxis(ud,e)}translateOnAxis(e,t){return ld.copy(e).applyQuaternion(this.quaternion),this.position.add(ld.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cd,e)}translateY(e){return this.translateOnAxis(dd,e)}translateZ(e){return this.translateOnAxis(ud,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ps.copy(e):ps.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Mr,ps,this.up):Un.lookAt(ps,Mr,this.up),this.quaternion.setFromRotationMatrix(Un),r&&(Un.extractRotation(r.matrixWorld),zi.setFromRotationMatrix(Un),this.quaternion.premultiply(zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(mv)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gv)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const l=this.children[i].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let r=0,a=this.children.length;r<a;r++){const l=this.children[r].getObjectsByProperty(e,t);l.length>0&&(i=i.concat(l))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,e,fv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,pv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const a=t[i];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++){const o=r[a];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let d=0,u=c.length;d<u;d++){const f=c[d];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,d=this.material.length;c<d;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=l(e.geometries),c=l(e.materials),d=l(e.textures),u=l(e.images),f=l(e.shapes),h=l(e.skeletons),g=l(e.animations),v=l(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),d.length>0&&(i.textures=d),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=r,i;function l(o){const c=[];for(const d in o){const u=o[d];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}It.DEFAULT_UP=new q(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new q,On=new q,io=new q,Fn=new q,Hi=new q,Gi=new q,hd=new q,ro=new q,so=new q,ao=new q;let ms=!1;class vn{constructor(e=new q,t=new q,i=new q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),xn.subVectors(e,t),r.cross(xn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){xn.subVectors(r,t),On.subVectors(i,t),io.subVectors(e,t);const l=xn.dot(xn),o=xn.dot(On),c=xn.dot(io),d=On.dot(On),u=On.dot(io),f=l*d-o*o;if(f===0)return a.set(-2,-1,-1);const h=1/f,g=(d*c-o*u)*h,v=(l*u-o*c)*h;return a.set(1-g-v,v,g)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Fn),Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getUV(e,t,i,r,a,l,o,c){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),this.getInterpolation(e,t,i,r,a,l,o,c)}static getInterpolation(e,t,i,r,a,l,o,c){return this.getBarycoord(e,t,i,r,Fn),c.setScalar(0),c.addScaledVector(a,Fn.x),c.addScaledVector(l,Fn.y),c.addScaledVector(o,Fn.z),c}static isFrontFacing(e,t,i,r){return xn.subVectors(i,t),On.subVectors(e,t),xn.cross(On).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),xn.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,a){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),vn.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}getInterpolation(e,t,i,r,a){return vn.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let l,o;Hi.subVectors(r,i),Gi.subVectors(a,i),ro.subVectors(e,i);const c=Hi.dot(ro),d=Gi.dot(ro);if(c<=0&&d<=0)return t.copy(i);so.subVectors(e,r);const u=Hi.dot(so),f=Gi.dot(so);if(u>=0&&f<=u)return t.copy(r);const h=c*f-u*d;if(h<=0&&c>=0&&u<=0)return l=c/(c-u),t.copy(i).addScaledVector(Hi,l);ao.subVectors(e,a);const g=Hi.dot(ao),v=Gi.dot(ao);if(v>=0&&g<=v)return t.copy(a);const x=g*d-c*v;if(x<=0&&d>=0&&v<=0)return o=d/(d-v),t.copy(i).addScaledVector(Gi,o);const m=u*v-g*f;if(m<=0&&f-u>=0&&g-v>=0)return hd.subVectors(a,r),o=(f-u)/(f-u+(g-v)),t.copy(r).addScaledVector(hd,o);const p=1/(m+x+h);return l=x*p,o=h*p,t.copy(i).addScaledVector(Hi,l).addScaledVector(Gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function oo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=dt.workingColorSpace){if(e=tv(e,1),t=Xt(t,0,1),i=Xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,l=2*i-a;this.r=oo(l,a,e+1/3),this.g=oo(l,a,e),this.b=oo(l,a,e-1/3)}return dt.toWorkingColorSpace(this,r),this}setStyle(e,t=Ot){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const l=r[1],o=r[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(l===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ot){const i=zh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=nr(e.r),this.g=nr(e.g),this.b=nr(e.b),this}copyLinearToSRGB(e){return this.r=Ya(e.r),this.g=Ya(e.g),this.b=Ya(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ot){return dt.fromWorkingColorSpace(zt.copy(this),e),Math.round(Xt(zt.r*255,0,255))*65536+Math.round(Xt(zt.g*255,0,255))*256+Math.round(Xt(zt.b*255,0,255))}getHexString(e=Ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(zt.copy(this),t);const i=zt.r,r=zt.g,a=zt.b,l=Math.max(i,r,a),o=Math.min(i,r,a);let c,d;const u=(o+l)/2;if(o===l)c=0,d=0;else{const f=l-o;switch(d=u<=.5?f/(l+o):f/(2-l-o),l){case i:c=(r-a)/f+(r<a?6:0);break;case r:c=(a-i)/f+2;break;case a:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=d,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Ot){dt.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,i=zt.g,r=zt.b;return e!==Ot?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(gs);const i=qa(Zn.h,gs.h,t),r=qa(Zn.s,gs.s,t),a=qa(Zn.l,gs.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new ot;ot.NAMES=zh;let xv=0;class Kr extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xv++}),this.uuid=$r(),this.name="",this.type="Material",this.blending=tr,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=Ho,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=ea,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==tr&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zo&&(i.blendSrc=this.blendSrc),this.blendDst!==Ho&&(i.blendDst=this.blendDst),this.blendEquation!==xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ea&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const l=[];for(const o in a){const c=a[o];delete c.metadata,l.push(c)}return l}if(t){const a=r(e.textures),l=r(e.images);a.length>0&&(i.textures=a),l.length>0&&(i.images=l)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Hh extends Kr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Th,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new q,xs=new $e;class wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qc,this.updateRange={offset:0,count:-1},this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xs.fromBufferAttribute(this,t),xs.applyMatrix3(e),this.setXY(t,xs.x,xs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Sr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Yt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array),r=Yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array),r=Yt(r,this.array),a=Yt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qc&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Gh extends wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Vh extends wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Nn extends wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let _v=0;const on=new yt,lo=new It,Vi=new q,sn=new Pi,Tr=new Pi,jt=new q;class oi extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_v++}),this.uuid=$r(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Oh(e)?Vh:Gh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new nt().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,i){return on.makeTranslation(e,t,i),this.applyMatrix4(on),this}scale(e,t,i){return on.makeScale(e,t,i),this.applyMatrix4(on),this}lookAt(e){return lo.lookAt(e),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Nn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];sn.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let a=0,l=t.length;a<l;a++){const o=t[a];Tr.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(sn.min,Tr.min),sn.expandByPoint(jt),jt.addVectors(sn.max,Tr.max),sn.expandByPoint(jt)):(sn.expandByPoint(Tr.min),sn.expandByPoint(Tr.max))}sn.getCenter(i);let r=0;for(let a=0,l=e.count;a<l;a++)jt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(jt));if(t)for(let a=0,l=t.length;a<l;a++){const o=t[a],c=this.morphTargetsRelative;for(let d=0,u=o.count;d<u;d++)jt.fromBufferAttribute(o,d),c&&(Vi.fromBufferAttribute(e,d),jt.add(Vi)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,a=t.normal.array,l=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,d=[],u=[];for(let M=0;M<o;M++)d[M]=new q,u[M]=new q;const f=new q,h=new q,g=new q,v=new $e,x=new $e,m=new $e,p=new q,y=new q;function _(M,I,k){f.fromArray(r,M*3),h.fromArray(r,I*3),g.fromArray(r,k*3),v.fromArray(l,M*2),x.fromArray(l,I*2),m.fromArray(l,k*2),h.sub(f),g.sub(f),x.sub(v),m.sub(v);const $=1/(x.x*m.y-m.x*x.y);isFinite($)&&(p.copy(h).multiplyScalar(m.y).addScaledVector(g,-x.y).multiplyScalar($),y.copy(g).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar($),d[M].add(p),d[I].add(p),d[k].add(p),u[M].add(y),u[I].add(y),u[k].add(y))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let M=0,I=E.length;M<I;++M){const k=E[M],$=k.start,P=k.count;for(let z=$,J=$+P;z<J;z+=3)_(i[z+0],i[z+1],i[z+2])}const S=new q,A=new q,T=new q,N=new q;function b(M){T.fromArray(a,M*3),N.copy(T);const I=d[M];S.copy(I),S.sub(T.multiplyScalar(T.dot(I))).normalize(),A.crossVectors(N,I);const $=A.dot(u[M])<0?-1:1;c[M*4]=S.x,c[M*4+1]=S.y,c[M*4+2]=S.z,c[M*4+3]=$}for(let M=0,I=E.length;M<I;++M){const k=E[M],$=k.start,P=k.count;for(let z=$,J=$+P;z<J;z+=3)b(i[z+0]),b(i[z+1]),b(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);const r=new q,a=new q,l=new q,o=new q,c=new q,d=new q,u=new q,f=new q;if(e)for(let h=0,g=e.count;h<g;h+=3){const v=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),l.fromBufferAttribute(t,m),u.subVectors(l,a),f.subVectors(r,a),u.cross(f),o.fromBufferAttribute(i,v),c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,m),o.add(u),c.add(u),d.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,d.x,d.y,d.z)}else for(let h=0,g=t.count;h<g;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),l.fromBufferAttribute(t,h+2),u.subVectors(l,a),f.subVectors(r,a),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(o,c){const d=o.array,u=o.itemSize,f=o.normalized,h=new d.constructor(c.length*u);let g=0,v=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?g=c[x]*o.data.stride+o.offset:g=c[x]*u;for(let p=0;p<u;p++)h[v++]=d[g++]}return new wn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new oi,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],d=e(c,i);t.setAttribute(o,d)}const a=this.morphAttributes;for(const o in a){const c=[],d=a[o];for(let u=0,f=d.length;u<f;u++){const h=d[u],g=e(h,i);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let o=0,c=l.length;o<c;o++){const d=l[o];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const d in c)c[d]!==void 0&&(e[d]=c[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const d=i[c];e.data.attributes[c]=d.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const d=this.morphAttributes[c],u=[];for(let f=0,h=d.length;f<h;f++){const g=d[f];u.push(g.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const d in r){const u=r[d];this.setAttribute(d,u.clone(t))}const a=e.morphAttributes;for(const d in a){const u=[],f=a[d];for(let h=0,g=f.length;h<g;h++)u.push(f[h].clone(t));this.morphAttributes[d]=u}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let d=0,u=l.length;d<u;d++){const f=l[d];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fd=new yt,fi=new gl,_s=new Yr,pd=new q,Wi=new q,Xi=new q,qi=new q,co=new q,vs=new q,ys=new $e,bs=new $e,Ss=new $e,md=new q,gd=new q,xd=new q,ws=new q,Es=new q;class gt extends It{constructor(e=new oi,t=new Hh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=r.length;a<l;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,l=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){vs.set(0,0,0);for(let c=0,d=a.length;c<d;c++){const u=o[c],f=a[c];u!==0&&(co.fromBufferAttribute(f,e),l?vs.addScaledVector(co,u):vs.addScaledVector(co.sub(t),u))}t.add(vs)}return t}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_s.copy(i.boundingSphere),_s.applyMatrix4(a),fi.copy(e.ray).recast(e.near),!(_s.containsPoint(fi.origin)===!1&&(fi.intersectSphere(_s,pd)===null||fi.origin.distanceToSquared(pd)>(e.far-e.near)**2))&&(fd.copy(a).invert(),fi.copy(e.ray).applyMatrix4(fd),!(i.boundingBox!==null&&fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,i){let r;const a=this.geometry,l=this.material,o=a.index,c=a.attributes.position,d=a.attributes.uv,u=a.attributes.uv1,f=a.attributes.normal,h=a.groups,g=a.drawRange;if(o!==null)if(Array.isArray(l))for(let v=0,x=h.length;v<x;v++){const m=h[v],p=l[m.materialIndex],y=Math.max(m.start,g.start),_=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let E=y,S=_;E<S;E+=3){const A=o.getX(E),T=o.getX(E+1),N=o.getX(E+2);r=Ms(this,p,e,i,d,u,f,A,T,N),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,g.start),x=Math.min(o.count,g.start+g.count);for(let m=v,p=x;m<p;m+=3){const y=o.getX(m),_=o.getX(m+1),E=o.getX(m+2);r=Ms(this,l,e,i,d,u,f,y,_,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(l))for(let v=0,x=h.length;v<x;v++){const m=h[v],p=l[m.materialIndex],y=Math.max(m.start,g.start),_=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let E=y,S=_;E<S;E+=3){const A=E,T=E+1,N=E+2;r=Ms(this,p,e,i,d,u,f,A,T,N),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,g.start),x=Math.min(c.count,g.start+g.count);for(let m=v,p=x;m<p;m+=3){const y=m,_=m+1,E=m+2;r=Ms(this,l,e,i,d,u,f,y,_,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function vv(n,e,t,i,r,a,l,o){let c;if(e.side===Qt?c=i.intersectTriangle(l,a,r,!0,o):c=i.intersectTriangle(r,a,l,e.side===ai,o),c===null)return null;Es.copy(o),Es.applyMatrix4(n.matrixWorld);const d=t.ray.origin.distanceTo(Es);return d<t.near||d>t.far?null:{distance:d,point:Es.clone(),object:n}}function Ms(n,e,t,i,r,a,l,o,c,d){n.getVertexPosition(o,Wi),n.getVertexPosition(c,Xi),n.getVertexPosition(d,qi);const u=vv(n,e,t,i,Wi,Xi,qi,ws);if(u){r&&(ys.fromBufferAttribute(r,o),bs.fromBufferAttribute(r,c),Ss.fromBufferAttribute(r,d),u.uv=vn.getInterpolation(ws,Wi,Xi,qi,ys,bs,Ss,new $e)),a&&(ys.fromBufferAttribute(a,o),bs.fromBufferAttribute(a,c),Ss.fromBufferAttribute(a,d),u.uv1=vn.getInterpolation(ws,Wi,Xi,qi,ys,bs,Ss,new $e),u.uv2=u.uv1),l&&(md.fromBufferAttribute(l,o),gd.fromBufferAttribute(l,c),xd.fromBufferAttribute(l,d),u.normal=vn.getInterpolation(ws,Wi,Xi,qi,md,gd,xd,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:d,normal:new q,materialIndex:0};vn.getNormal(Wi,Xi,qi,f.normal),u.face=f}return u}class Vn extends oi{constructor(e=1,t=1,i=1,r=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:l};const o=this;r=Math.floor(r),a=Math.floor(a),l=Math.floor(l);const c=[],d=[],u=[],f=[];let h=0,g=0;v("z","y","x",-1,-1,i,t,e,l,a,0),v("z","y","x",1,-1,i,t,-e,l,a,1),v("x","z","y",1,1,e,i,t,r,l,2),v("x","z","y",1,-1,e,i,-t,r,l,3),v("x","y","z",1,-1,e,t,i,r,a,4),v("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new Nn(d,3)),this.setAttribute("normal",new Nn(u,3)),this.setAttribute("uv",new Nn(f,2));function v(x,m,p,y,_,E,S,A,T,N,b){const M=E/T,I=S/N,k=E/2,$=S/2,P=A/2,z=T+1,J=N+1;let K=0,ae=0;const ee=new q;for(let ie=0;ie<J;ie++){const D=ie*I-$;for(let L=0;L<z;L++){const G=L*M-k;ee[x]=G*y,ee[m]=D*_,ee[p]=P,d.push(ee.x,ee.y,ee.z),ee[x]=0,ee[m]=0,ee[p]=A>0?1:-1,u.push(ee.x,ee.y,ee.z),f.push(L/T),f.push(1-ie/N),K+=1}}for(let ie=0;ie<N;ie++)for(let D=0;D<T;D++){const L=h+D+z*ie,G=h+D+z*(ie+1),B=h+(D+1)+z*(ie+1),Q=h+(D+1)+z*ie;c.push(L,G,Q),c.push(G,B,Q),ae+=6}o.addGroup(g,ae,b),g+=ae,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function dr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Vt(n){const e={};for(let t=0;t<n.length;t++){const i=dr(n[t]);for(const r in i)e[r]=i[r]}return e}function yv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Wh(n){return n.getRenderTarget()===null?n.outputColorSpace:dt.workingColorSpace}const bv={clone:dr,merge:Vt};var Sv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ci extends Kr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sv,this.fragmentShader=wv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=yv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const l=this.uniforms[r].value;l&&l.isTexture?t.uniforms[r]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[r]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[r]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[r]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[r]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[r]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[r]={type:"m4",value:l.toArray()}:t.uniforms[r]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Xh extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Kt extends Xh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sa*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,a,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xs*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const l=this.view;if(this.view!==null&&this.view.enabled){const c=l.fullWidth,d=l.fullHeight;a+=l.offsetX*r/c,t-=l.offsetY*i/d,r*=l.width/c,i*=l.height/d}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $i=-90,Yi=1;class Ev extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kt($i,Yi,e,t);r.layers=this.layers,this.add(r);const a=new Kt($i,Yi,e,t);a.layers=this.layers,this.add(a);const l=new Kt($i,Yi,e,t);l.layers=this.layers,this.add(l);const o=new Kt($i,Yi,e,t);o.layers=this.layers,this.add(o);const c=new Kt($i,Yi,e,t);c.layers=this.layers,this.add(c);const d=new Kt($i,Yi,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,l,o,c]=t;for(const d of t)this.remove(d);if(e===zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ra)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,l,o,c,d,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,a),e.setRenderTarget(i,1,r),e.render(t,l),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,d),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,g),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class qh extends en{constructor(e,t,i,r,a,l,o,c,d,u){e=e!==void 0?e:[],t=t!==void 0?t:ar,super(e,t,i,r,a,l,o,c,d,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mv extends Ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Ir("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===wi?Ot:hn),this.texture=new qh(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vn(5,5,5),a=new Ci({name:"CubemapFromEquirect",uniforms:dr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:ii});a.uniforms.tEquirect.value=t;const l=new gt(r,a),o=t.minFilter;return t.minFilter===Br&&(t.minFilter=dn),new Ev(1,10,this).update(e,l),t.minFilter=o,l.geometry.dispose(),l.material.dispose(),this}clear(e,t,i,r){const a=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,i,r);e.setRenderTarget(a)}}const uo=new q,Tv=new q,Av=new nt;class Jn{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=uo.subVectors(i,t).cross(Tv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(uo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Av.getNormalMatrix(e),r=this.coplanarPoint(uo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Yr,Ts=new q;class _l{constructor(e=new Jn,t=new Jn,i=new Jn,r=new Jn,a=new Jn,l=new Jn){this.planes=[e,t,i,r,a,l]}set(e,t,i,r,a,l){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(l),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zn){const i=this.planes,r=e.elements,a=r[0],l=r[1],o=r[2],c=r[3],d=r[4],u=r[5],f=r[6],h=r[7],g=r[8],v=r[9],x=r[10],m=r[11],p=r[12],y=r[13],_=r[14],E=r[15];if(i[0].setComponents(c-a,h-d,m-g,E-p).normalize(),i[1].setComponents(c+a,h+d,m+g,E+p).normalize(),i[2].setComponents(c+l,h+u,m+v,E+y).normalize(),i[3].setComponents(c-l,h-u,m-v,E-y).normalize(),i[4].setComponents(c-o,h-f,m-x,E-_).normalize(),t===zn)i[5].setComponents(c+o,h+f,m+x,E+_).normalize();else if(t===ra)i[5].setComponents(o,f,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ts.x=r.normal.x>0?e.max.x:e.min.x,Ts.y=r.normal.y>0?e.max.y:e.min.y,Ts.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ts)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $h(){let n=null,e=!1,t=null,i=null;function r(a,l){t(a,l),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Rv(n,e){const t=e.isWebGL2,i=new WeakMap;function r(d,u){const f=d.array,h=d.usage,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,f,h),d.onUploadCallback();let v;if(f instanceof Float32Array)v=n.FLOAT;else if(f instanceof Uint16Array)if(d.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)v=n.SHORT;else if(f instanceof Uint32Array)v=n.UNSIGNED_INT;else if(f instanceof Int32Array)v=n.INT;else if(f instanceof Int8Array)v=n.BYTE;else if(f instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:v,bytesPerElement:f.BYTES_PER_ELEMENT,version:d.version}}function a(d,u,f){const h=u.array,g=u.updateRange;n.bindBuffer(f,d),g.count===-1?n.bufferSubData(f,0,h):(t?n.bufferSubData(f,g.offset*h.BYTES_PER_ELEMENT,h,g.offset,g.count):n.bufferSubData(f,g.offset*h.BYTES_PER_ELEMENT,h.subarray(g.offset,g.offset+g.count)),g.count=-1),u.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),i.get(d)}function o(d){d.isInterleavedBufferAttribute&&(d=d.data);const u=i.get(d);u&&(n.deleteBuffer(u.buffer),i.delete(d))}function c(d,u){if(d.isGLBufferAttribute){const h=i.get(d);(!h||h.version<d.version)&&i.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}d.isInterleavedBufferAttribute&&(d=d.data);const f=i.get(d);f===void 0?i.set(d,r(d,u)):f.version<d.version&&(a(f.buffer,d,u),f.version=d.version)}return{get:l,remove:o,update:c}}class Hn extends oi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,l=t/2,o=Math.floor(i),c=Math.floor(r),d=o+1,u=c+1,f=e/o,h=t/c,g=[],v=[],x=[],m=[];for(let p=0;p<u;p++){const y=p*h-l;for(let _=0;_<d;_++){const E=_*f-a;v.push(E,-y,0),x.push(0,0,1),m.push(_/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const _=y+d*p,E=y+d*(p+1),S=y+1+d*(p+1),A=y+1+d*p;g.push(_,E,A),g.push(E,S,A)}this.setIndex(g),this.setAttribute("position",new Nn(v,3)),this.setAttribute("normal",new Nn(x,3)),this.setAttribute("uv",new Nn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Cv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Dv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Iv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ov=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Gv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$v=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Yv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Kv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jv=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ey=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ty=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ny=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iy="gl_FragColor = linearToOutputTexel( gl_FragColor );",ry=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,sy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ay=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,oy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ly=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,py=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,my=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,gy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_y=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,by=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ey=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,My=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,Ty=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ay=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ry=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ny=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Py=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ly=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,jy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Dy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Iy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Uy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Oy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ky=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,By=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Hy=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Gy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Vy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$y=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ky=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ib=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ab=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ob=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,cb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,db=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ub=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,pb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_b=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Sb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Eb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ab=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lb=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Db=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ib=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ob=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bb=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$b=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nS=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Cv,alphahash_pars_fragment:Nv,alphamap_fragment:Pv,alphamap_pars_fragment:Lv,alphatest_fragment:jv,alphatest_pars_fragment:Dv,aomap_fragment:Iv,aomap_pars_fragment:Uv,begin_vertex:Ov,beginnormal_vertex:Fv,bsdfs:kv,iridescence_fragment:Bv,bumpmap_pars_fragment:zv,clipping_planes_fragment:Hv,clipping_planes_pars_fragment:Gv,clipping_planes_pars_vertex:Vv,clipping_planes_vertex:Wv,color_fragment:Xv,color_pars_fragment:qv,color_pars_vertex:$v,color_vertex:Yv,common:Kv,cube_uv_reflection_fragment:Zv,defaultnormal_vertex:Jv,displacementmap_pars_vertex:Qv,displacementmap_vertex:ey,emissivemap_fragment:ty,emissivemap_pars_fragment:ny,colorspace_fragment:iy,colorspace_pars_fragment:ry,envmap_fragment:sy,envmap_common_pars_fragment:ay,envmap_pars_fragment:oy,envmap_pars_vertex:ly,envmap_physical_pars_fragment:yy,envmap_vertex:cy,fog_vertex:dy,fog_pars_vertex:uy,fog_fragment:hy,fog_pars_fragment:fy,gradientmap_pars_fragment:py,lightmap_fragment:my,lightmap_pars_fragment:gy,lights_lambert_fragment:xy,lights_lambert_pars_fragment:_y,lights_pars_begin:vy,lights_toon_fragment:by,lights_toon_pars_fragment:Sy,lights_phong_fragment:wy,lights_phong_pars_fragment:Ey,lights_physical_fragment:My,lights_physical_pars_fragment:Ty,lights_fragment_begin:Ay,lights_fragment_maps:Ry,lights_fragment_end:Cy,logdepthbuf_fragment:Ny,logdepthbuf_pars_fragment:Py,logdepthbuf_pars_vertex:Ly,logdepthbuf_vertex:jy,map_fragment:Dy,map_pars_fragment:Iy,map_particle_fragment:Uy,map_particle_pars_fragment:Oy,metalnessmap_fragment:Fy,metalnessmap_pars_fragment:ky,morphcolor_vertex:By,morphnormal_vertex:zy,morphtarget_pars_vertex:Hy,morphtarget_vertex:Gy,normal_fragment_begin:Vy,normal_fragment_maps:Wy,normal_pars_fragment:Xy,normal_pars_vertex:qy,normal_vertex:$y,normalmap_pars_fragment:Yy,clearcoat_normal_fragment_begin:Ky,clearcoat_normal_fragment_maps:Zy,clearcoat_pars_fragment:Jy,iridescence_pars_fragment:Qy,opaque_fragment:eb,packing:tb,premultiplied_alpha_fragment:nb,project_vertex:ib,dithering_fragment:rb,dithering_pars_fragment:sb,roughnessmap_fragment:ab,roughnessmap_pars_fragment:ob,shadowmap_pars_fragment:lb,shadowmap_pars_vertex:cb,shadowmap_vertex:db,shadowmask_pars_fragment:ub,skinbase_vertex:hb,skinning_pars_vertex:fb,skinning_vertex:pb,skinnormal_vertex:mb,specularmap_fragment:gb,specularmap_pars_fragment:xb,tonemapping_fragment:_b,tonemapping_pars_fragment:vb,transmission_fragment:yb,transmission_pars_fragment:bb,uv_pars_fragment:Sb,uv_pars_vertex:wb,uv_vertex:Eb,worldpos_vertex:Mb,background_vert:Tb,background_frag:Ab,backgroundCube_vert:Rb,backgroundCube_frag:Cb,cube_vert:Nb,cube_frag:Pb,depth_vert:Lb,depth_frag:jb,distanceRGBA_vert:Db,distanceRGBA_frag:Ib,equirect_vert:Ub,equirect_frag:Ob,linedashed_vert:Fb,linedashed_frag:kb,meshbasic_vert:Bb,meshbasic_frag:zb,meshlambert_vert:Hb,meshlambert_frag:Gb,meshmatcap_vert:Vb,meshmatcap_frag:Wb,meshnormal_vert:Xb,meshnormal_frag:qb,meshphong_vert:$b,meshphong_frag:Yb,meshphysical_vert:Kb,meshphysical_frag:Zb,meshtoon_vert:Jb,meshtoon_frag:Qb,points_vert:eS,points_frag:tS,shadow_vert:nS,shadow_frag:iS,sprite_vert:rS,sprite_frag:sS},ve={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},Tn={basic:{uniforms:Vt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Vt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ot(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Vt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Vt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Vt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new ot(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Vt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Vt([ve.points,ve.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Vt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Vt([ve.common,ve.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Vt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Vt([ve.sprite,ve.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:Vt([ve.common,ve.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:Vt([ve.lights,ve.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Tn.physical={uniforms:Vt([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const As={r:0,b:0,g:0};function aS(n,e,t,i,r,a,l){const o=new ot(0);let c=a===!0?0:1,d,u,f=null,h=0,g=null;function v(m,p){let y=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?x(o,c):_&&_.isColor&&(x(_,1),y=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,l):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,l),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===_a)?(u===void 0&&(u=new gt(new Vn(1,1,1),new Ci({name:"BackgroundCubeMaterial",uniforms:dr(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=dt.getTransfer(_.colorSpace)!==pt,(f!==_||h!==_.version||g!==n.toneMapping)&&(u.material.needsUpdate=!0,f=_,h=_.version,g=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(d===void 0&&(d=new gt(new Hn(2,2),new Ci({name:"BackgroundMaterial",uniforms:dr(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=_,d.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,d.material.toneMapped=dt.getTransfer(_.colorSpace)!==pt,_.matrixAutoUpdate===!0&&_.updateMatrix(),d.material.uniforms.uvTransform.value.copy(_.matrix),(f!==_||h!==_.version||g!==n.toneMapping)&&(d.material.needsUpdate=!0,f=_,h=_.version,g=n.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null))}function x(m,p){m.getRGB(As,Wh(n)),i.buffers.color.setClear(As.r,As.g,As.b,p,l)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),c=p,x(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(o,c)},render:v}}function oS(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),a=i.isWebGL2?null:e.get("OES_vertex_array_object"),l=i.isWebGL2||a!==null,o={},c=m(null);let d=c,u=!1;function f(P,z,J,K,ae){let ee=!1;if(l){const ie=x(K,J,z);d!==ie&&(d=ie,g(d.object)),ee=p(P,K,J,ae),ee&&y(P,K,J,ae)}else{const ie=z.wireframe===!0;(d.geometry!==K.id||d.program!==J.id||d.wireframe!==ie)&&(d.geometry=K.id,d.program=J.id,d.wireframe=ie,ee=!0)}ae!==null&&t.update(ae,n.ELEMENT_ARRAY_BUFFER),(ee||u)&&(u=!1,N(P,z,J,K),ae!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ae).buffer))}function h(){return i.isWebGL2?n.createVertexArray():a.createVertexArrayOES()}function g(P){return i.isWebGL2?n.bindVertexArray(P):a.bindVertexArrayOES(P)}function v(P){return i.isWebGL2?n.deleteVertexArray(P):a.deleteVertexArrayOES(P)}function x(P,z,J){const K=J.wireframe===!0;let ae=o[P.id];ae===void 0&&(ae={},o[P.id]=ae);let ee=ae[z.id];ee===void 0&&(ee={},ae[z.id]=ee);let ie=ee[K];return ie===void 0&&(ie=m(h()),ee[K]=ie),ie}function m(P){const z=[],J=[],K=[];for(let ae=0;ae<r;ae++)z[ae]=0,J[ae]=0,K[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:J,attributeDivisors:K,object:P,attributes:{},index:null}}function p(P,z,J,K){const ae=d.attributes,ee=z.attributes;let ie=0;const D=J.getAttributes();for(const L in D)if(D[L].location>=0){const B=ae[L];let Q=ee[L];if(Q===void 0&&(L==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),L==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor)),B===void 0||B.attribute!==Q||Q&&B.data!==Q.data)return!0;ie++}return d.attributesNum!==ie||d.index!==K}function y(P,z,J,K){const ae={},ee=z.attributes;let ie=0;const D=J.getAttributes();for(const L in D)if(D[L].location>=0){let B=ee[L];B===void 0&&(L==="instanceMatrix"&&P.instanceMatrix&&(B=P.instanceMatrix),L==="instanceColor"&&P.instanceColor&&(B=P.instanceColor));const Q={};Q.attribute=B,B&&B.data&&(Q.data=B.data),ae[L]=Q,ie++}d.attributes=ae,d.attributesNum=ie,d.index=K}function _(){const P=d.newAttributes;for(let z=0,J=P.length;z<J;z++)P[z]=0}function E(P){S(P,0)}function S(P,z){const J=d.newAttributes,K=d.enabledAttributes,ae=d.attributeDivisors;J[P]=1,K[P]===0&&(n.enableVertexAttribArray(P),K[P]=1),ae[P]!==z&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,z),ae[P]=z)}function A(){const P=d.newAttributes,z=d.enabledAttributes;for(let J=0,K=z.length;J<K;J++)z[J]!==P[J]&&(n.disableVertexAttribArray(J),z[J]=0)}function T(P,z,J,K,ae,ee,ie){ie===!0?n.vertexAttribIPointer(P,z,J,ae,ee):n.vertexAttribPointer(P,z,J,K,ae,ee)}function N(P,z,J,K){if(i.isWebGL2===!1&&(P.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const ae=K.attributes,ee=J.getAttributes(),ie=z.defaultAttributeValues;for(const D in ee){const L=ee[D];if(L.location>=0){let G=ae[D];if(G===void 0&&(D==="instanceMatrix"&&P.instanceMatrix&&(G=P.instanceMatrix),D==="instanceColor"&&P.instanceColor&&(G=P.instanceColor)),G!==void 0){const B=G.normalized,Q=G.itemSize,O=t.get(G);if(O===void 0)continue;const ye=O.buffer,Y=O.type,we=O.bytesPerElement,Me=i.isWebGL2===!0&&(Y===n.INT||Y===n.UNSIGNED_INT||G.gpuType===Ch);if(G.isInterleavedBufferAttribute){const oe=G.data,U=oe.stride,Ze=G.offset;if(oe.isInstancedInterleavedBuffer){for(let be=0;be<L.locationSize;be++)S(L.location+be,oe.meshPerAttribute);P.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let be=0;be<L.locationSize;be++)E(L.location+be);n.bindBuffer(n.ARRAY_BUFFER,ye);for(let be=0;be<L.locationSize;be++)T(L.location+be,Q/L.locationSize,Y,B,U*we,(Ze+Q/L.locationSize*be)*we,Me)}else{if(G.isInstancedBufferAttribute){for(let oe=0;oe<L.locationSize;oe++)S(L.location+oe,G.meshPerAttribute);P.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let oe=0;oe<L.locationSize;oe++)E(L.location+oe);n.bindBuffer(n.ARRAY_BUFFER,ye);for(let oe=0;oe<L.locationSize;oe++)T(L.location+oe,Q/L.locationSize,Y,B,Q*we,Q/L.locationSize*oe*we,Me)}}else if(ie!==void 0){const B=ie[D];if(B!==void 0)switch(B.length){case 2:n.vertexAttrib2fv(L.location,B);break;case 3:n.vertexAttrib3fv(L.location,B);break;case 4:n.vertexAttrib4fv(L.location,B);break;default:n.vertexAttrib1fv(L.location,B)}}}}A()}function b(){k();for(const P in o){const z=o[P];for(const J in z){const K=z[J];for(const ae in K)v(K[ae].object),delete K[ae];delete z[J]}delete o[P]}}function M(P){if(o[P.id]===void 0)return;const z=o[P.id];for(const J in z){const K=z[J];for(const ae in K)v(K[ae].object),delete K[ae];delete z[J]}delete o[P.id]}function I(P){for(const z in o){const J=o[z];if(J[P.id]===void 0)continue;const K=J[P.id];for(const ae in K)v(K[ae].object),delete K[ae];delete J[P.id]}}function k(){$(),u=!0,d!==c&&(d=c,g(d.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:k,resetDefaultState:$,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:E,disableUnusedAttributes:A}}function lS(n,e,t,i){const r=i.isWebGL2;let a;function l(d){a=d}function o(d,u){n.drawArrays(a,d,u),t.update(u,a,1)}function c(d,u,f){if(f===0)return;let h,g;if(r)h=n,g="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[g](a,d,u,f),t.update(u,a,f)}this.setMode=l,this.render=o,this.renderInstances=c}function cS(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const l=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=a(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const d=l||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=h>0,E=l||e.has("OES_texture_float"),S=_&&E,A=l?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:l,drawBuffers:d,getMaxAnisotropy:r,getMaxPrecision:a,precision:o,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:y,vertexTextures:_,floatFragmentTextures:E,floatVertexTextures:S,maxSamples:A}}function dS(n){const e=this;let t=null,i=0,r=!1,a=!1;const l=new Jn,o=new nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const g=f.length!==0||h||i!==0||r;return r=h,i=f.length,g},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,g){const v=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||v===null||v.length===0||a&&!m)a?u(null):d();else{const y=a?0:i,_=y*4;let E=p.clippingState||null;c.value=E,E=u(v,h,_,g);for(let S=0;S!==_;++S)E[S]=t[S];p.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function d(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,g,v){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=c.value,v!==!0||m===null){const p=g+x*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,E=g;_!==x;++_,E+=4)l.copy(f[_]).applyMatrix4(y,o),l.normal.toArray(m,E),m[E+3]=l.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function uS(n){let e=new WeakMap;function t(l,o){return o===Go?l.mapping=ar:o===Vo&&(l.mapping=or),l}function i(l){if(l&&l.isTexture&&l.isRenderTargetTexture===!1){const o=l.mapping;if(o===Go||o===Vo)if(e.has(l)){const c=e.get(l).texture;return t(c,l.mapping)}else{const c=l.image;if(c&&c.height>0){const d=new Mv(c.height/2);return d.fromEquirectangularTexture(n,l),e.set(l,d),l.addEventListener("dispose",r),t(d.texture,l.mapping)}else return null}}return l}function r(l){const o=l.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class Yh extends Xh{constructor(e=-1,t=1,i=1,r=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,l=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,l,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Qi=4,_d=[.125,.215,.35,.446,.526,.582],_i=20,ho=new Yh,vd=new ot;let fo=null,po=0,mo=0;const gi=(1+Math.sqrt(5))/2,Ki=1/gi,yd=[new q(1,1,1),new q(-1,1,1),new q(1,1,-1),new q(-1,1,-1),new q(0,gi,Ki),new q(0,gi,-Ki),new q(Ki,0,gi),new q(-Ki,0,gi),new q(gi,Ki,0),new q(-gi,Ki,0)];class bd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fo,po,mo),e.scissorTest=!1,Rs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ar||e.mapping===or?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:zr,format:bn,colorSpace:Gn,depthBuffer:!1},r=Sd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sd(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hS(a)),this._blurMaterial=fS(a,e,t)}return r}_compileMaterial(e){const t=new gt(this._lodPlanes[0],e);this._renderer.compile(t,ho)}_sceneToCubeUV(e,t,i,r){const o=new Kt(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(vd),u.toneMapping=ri,u.autoClear=!1;const g=new Hh({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1}),v=new gt(new Vn,g);let x=!1;const m=e.background;m?m.isColor&&(g.color.copy(m),e.background=null,x=!0):(g.color.copy(vd),x=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,c[p],0),o.lookAt(d[p],0,0)):y===1?(o.up.set(0,0,c[p]),o.lookAt(0,d[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,d[p]));const _=this._cubeSize;Rs(r,y*_,p>2?_:0,_,_),u.setRenderTarget(r),x&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ar||e.mapping===or;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());const a=r?this._cubemapMaterial:this._equirectMaterial,l=new gt(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;Rs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(l,ho)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=yd[(r-1)%yd.length];this._blur(e,r-1,r,a,l)}t.autoClear=i}_blur(e,t,i,r,a){const l=this._pingPongRenderTarget;this._halfBlur(e,l,t,i,r,"latitudinal",a),this._halfBlur(l,e,i,i,r,"longitudinal",a)}_halfBlur(e,t,i,r,a,l,o){const c=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new gt(this._lodPlanes[r],d),h=d.uniforms,g=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*g):2*Math.PI/(2*_i-1),x=a/v,m=isFinite(a)?1+Math.floor(u*x):_i;m>_i&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${_i}`);const p=[];let y=0;for(let T=0;T<_i;++T){const N=T/x,b=Math.exp(-N*N/2);p.push(b),T===0?y+=b:T<m&&(y+=2*b)}for(let T=0;T<p.length;T++)p[T]=p[T]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=l==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:_}=this;h.dTheta.value=v,h.mipInt.value=_-i;const E=this._sizeLods[r],S=3*E*(r>_-Qi?r-_+Qi:0),A=4*(this._cubeSize-E);Rs(t,S,A,3*E,2*E),c.setRenderTarget(t),c.render(f,ho)}}function hS(n){const e=[],t=[],i=[];let r=n;const a=n-Qi+1+_d.length;for(let l=0;l<a;l++){const o=Math.pow(2,r);t.push(o);let c=1/o;l>n-Qi?c=_d[l-n+Qi-1]:l===0&&(c=0),i.push(c);const d=1/(o-2),u=-d,f=1+d,h=[u,u,f,u,f,f,u,u,f,f,u,f],g=6,v=6,x=3,m=2,p=1,y=new Float32Array(x*v*g),_=new Float32Array(m*v*g),E=new Float32Array(p*v*g);for(let A=0;A<g;A++){const T=A%3*2/3-1,N=A>2?0:-1,b=[T,N,0,T+2/3,N,0,T+2/3,N+1,0,T,N,0,T+2/3,N+1,0,T,N+1,0];y.set(b,x*v*A),_.set(h,m*v*A);const M=[A,A,A,A,A,A];E.set(M,p*v*A)}const S=new oi;S.setAttribute("position",new wn(y,x)),S.setAttribute("uv",new wn(_,m)),S.setAttribute("faceIndex",new wn(E,p)),e.push(S),r>Qi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Sd(n,e,t){const i=new Ai(n,e,t);return i.texture.mapping=_a,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Rs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function fS(n,e,t){const i=new Float32Array(_i),r=new q(0,1,0);return new Ci({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function wd(){return new Ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Ed(){return new Ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function vl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function pS(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,d=c===Go||c===Vo,u=c===ar||c===or;if(d||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let f=e.get(o);return t===null&&(t=new bd(n)),f=d?t.fromEquirectangular(o,f):t.fromCubemap(o,f),e.set(o,f),f.texture}else{if(e.has(o))return e.get(o).texture;{const f=o.image;if(d&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new bd(n));const h=d?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,h),o.addEventListener("dispose",a),h.texture}else return null}}}return o}function r(o){let c=0;const d=6;for(let u=0;u<d;u++)o[u]!==void 0&&c++;return c===d}function a(o){const c=o.target;c.removeEventListener("dispose",a);const d=e.get(c);d!==void 0&&(e.delete(c),d.dispose())}function l(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:l}}function mS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function gS(n,e,t,i){const r={},a=new WeakMap;function l(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const v in h.attributes)e.remove(h.attributes[v]);for(const v in h.morphAttributes){const x=h.morphAttributes[v];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}h.removeEventListener("dispose",l),delete r[h.id];const g=a.get(h);g&&(e.remove(g),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",l),r[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const v in h)e.update(h[v],n.ARRAY_BUFFER);const g=f.morphAttributes;for(const v in g){const x=g[v];for(let m=0,p=x.length;m<p;m++)e.update(x[m],n.ARRAY_BUFFER)}}function d(f){const h=[],g=f.index,v=f.attributes.position;let x=0;if(g!==null){const y=g.array;x=g.version;for(let _=0,E=y.length;_<E;_+=3){const S=y[_+0],A=y[_+1],T=y[_+2];h.push(S,A,A,T,T,S)}}else if(v!==void 0){const y=v.array;x=v.version;for(let _=0,E=y.length/3-1;_<E;_+=3){const S=_+0,A=_+1,T=_+2;h.push(S,A,A,T,T,S)}}else return;const m=new(Oh(h)?Vh:Gh)(h,1);m.version=x;const p=a.get(f);p&&e.remove(p),a.set(f,m)}function u(f){const h=a.get(f);if(h){const g=f.index;g!==null&&h.version<g.version&&d(f)}else d(f);return a.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function xS(n,e,t,i){const r=i.isWebGL2;let a;function l(h){a=h}let o,c;function d(h){o=h.type,c=h.bytesPerElement}function u(h,g){n.drawElements(a,g,o,h*c),t.update(g,a,1)}function f(h,g,v){if(v===0)return;let x,m;if(r)x=n,m="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[m](a,g,o,h*c,v),t.update(g,a,v)}this.setMode=l,this.setIndex=d,this.render=u,this.renderInstances=f}function _S(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,l,o){switch(t.calls++,l){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function vS(n,e){return n[0]-e[0]}function yS(n,e){return Math.abs(e[1])-Math.abs(n[1])}function bS(n,e,t){const i={},r=new Float32Array(8),a=new WeakMap,l=new Dt,o=[];for(let d=0;d<8;d++)o[d]=[d,0];function c(d,u,f){const h=d.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=g!==void 0?g.length:0;let x=a.get(u);if(x===void 0||x.count!==v){let P=function(){k.dispose(),a.delete(u),u.removeEventListener("dispose",P)};x!==void 0&&x.texture.dispose();const y=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let N=0;y===!0&&(N=1),_===!0&&(N=2),E===!0&&(N=3);let b=u.attributes.position.count*N,M=1;b>e.maxTextureSize&&(M=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const I=new Float32Array(b*M*4*v),k=new Bh(I,b,M,v);k.type=ei,k.needsUpdate=!0;const $=N*4;for(let z=0;z<v;z++){const J=S[z],K=A[z],ae=T[z],ee=b*M*4*z;for(let ie=0;ie<J.count;ie++){const D=ie*$;y===!0&&(l.fromBufferAttribute(J,ie),I[ee+D+0]=l.x,I[ee+D+1]=l.y,I[ee+D+2]=l.z,I[ee+D+3]=0),_===!0&&(l.fromBufferAttribute(K,ie),I[ee+D+4]=l.x,I[ee+D+5]=l.y,I[ee+D+6]=l.z,I[ee+D+7]=0),E===!0&&(l.fromBufferAttribute(ae,ie),I[ee+D+8]=l.x,I[ee+D+9]=l.y,I[ee+D+10]=l.z,I[ee+D+11]=ae.itemSize===4?l.w:1)}}x={count:v,texture:k,size:new $e(b,M)},a.set(u,x),u.addEventListener("dispose",P)}let m=0;for(let y=0;y<h.length;y++)m+=h[y];const p=u.morphTargetsRelative?1:1-m;f.getUniforms().setValue(n,"morphTargetBaseInfluence",p),f.getUniforms().setValue(n,"morphTargetInfluences",h),f.getUniforms().setValue(n,"morphTargetsTexture",x.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",x.size)}else{const g=h===void 0?0:h.length;let v=i[u.id];if(v===void 0||v.length!==g){v=[];for(let _=0;_<g;_++)v[_]=[_,0];i[u.id]=v}for(let _=0;_<g;_++){const E=v[_];E[0]=_,E[1]=h[_]}v.sort(yS);for(let _=0;_<8;_++)_<g&&v[_][1]?(o[_][0]=v[_][0],o[_][1]=v[_][1]):(o[_][0]=Number.MAX_SAFE_INTEGER,o[_][1]=0);o.sort(vS);const x=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let _=0;_<8;_++){const E=o[_],S=E[0],A=E[1];S!==Number.MAX_SAFE_INTEGER&&A?(x&&u.getAttribute("morphTarget"+_)!==x[S]&&u.setAttribute("morphTarget"+_,x[S]),m&&u.getAttribute("morphNormal"+_)!==m[S]&&u.setAttribute("morphNormal"+_,m[S]),r[_]=A,p+=A):(x&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),r[_]=0)}const y=u.morphTargetsRelative?1:1-p;f.getUniforms().setValue(n,"morphTargetBaseInfluence",y),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:c}}function SS(n,e,t,i){let r=new WeakMap;function a(c){const d=i.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==d&&(e.update(f),r.set(f,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==d&&(h.update(),r.set(h,d))}return f}function l(){r=new WeakMap}function o(c){const d=c.target;d.removeEventListener("dispose",o),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:l}}const Kh=new en,Zh=new Bh,Jh=new lv,Qh=new qh,Md=[],Td=[],Ad=new Float32Array(16),Rd=new Float32Array(9),Cd=new Float32Array(4);function pr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=Md[r];if(a===void 0&&(a=new Float32Array(r),Md[r]=a),e!==0){i.toArray(a,0);for(let l=1,o=0;l!==e;++l)o+=t,n[l].toArray(a,o)}return a}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ya(n,e){let t=Td[e];t===void 0&&(t=new Int32Array(e),Td[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function wS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function ES(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Pt(t,e)}}function MS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Pt(t,e)}}function TS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Pt(t,e)}}function AS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Nt(t,i))return;Cd.set(i),n.uniformMatrix2fv(this.addr,!1,Cd),Pt(t,i)}}function RS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Nt(t,i))return;Rd.set(i),n.uniformMatrix3fv(this.addr,!1,Rd),Pt(t,i)}}function CS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Nt(t,i))return;Ad.set(i),n.uniformMatrix4fv(this.addr,!1,Ad),Pt(t,i)}}function NS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function PS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Pt(t,e)}}function LS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Pt(t,e)}}function jS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Pt(t,e)}}function DS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function IS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Pt(t,e)}}function US(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Pt(t,e)}}function OS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Pt(t,e)}}function FS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2D(e||Kh,r)}function kS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Jh,r)}function BS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Qh,r)}function zS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Zh,r)}function HS(n){switch(n){case 5126:return wS;case 35664:return ES;case 35665:return MS;case 35666:return TS;case 35674:return AS;case 35675:return RS;case 35676:return CS;case 5124:case 35670:return NS;case 35667:case 35671:return PS;case 35668:case 35672:return LS;case 35669:case 35673:return jS;case 5125:return DS;case 36294:return IS;case 36295:return US;case 36296:return OS;case 35678:case 36198:case 36298:case 36306:case 35682:return FS;case 35679:case 36299:case 36307:return kS;case 35680:case 36300:case 36308:case 36293:return BS;case 36289:case 36303:case 36311:case 36292:return zS}}function GS(n,e){n.uniform1fv(this.addr,e)}function VS(n,e){const t=pr(e,this.size,2);n.uniform2fv(this.addr,t)}function WS(n,e){const t=pr(e,this.size,3);n.uniform3fv(this.addr,t)}function XS(n,e){const t=pr(e,this.size,4);n.uniform4fv(this.addr,t)}function qS(n,e){const t=pr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $S(n,e){const t=pr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function YS(n,e){const t=pr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function KS(n,e){n.uniform1iv(this.addr,e)}function ZS(n,e){n.uniform2iv(this.addr,e)}function JS(n,e){n.uniform3iv(this.addr,e)}function QS(n,e){n.uniform4iv(this.addr,e)}function ew(n,e){n.uniform1uiv(this.addr,e)}function tw(n,e){n.uniform2uiv(this.addr,e)}function nw(n,e){n.uniform3uiv(this.addr,e)}function iw(n,e){n.uniform4uiv(this.addr,e)}function rw(n,e,t){const i=this.cache,r=e.length,a=ya(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Pt(i,a));for(let l=0;l!==r;++l)t.setTexture2D(e[l]||Kh,a[l])}function sw(n,e,t){const i=this.cache,r=e.length,a=ya(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Pt(i,a));for(let l=0;l!==r;++l)t.setTexture3D(e[l]||Jh,a[l])}function aw(n,e,t){const i=this.cache,r=e.length,a=ya(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Pt(i,a));for(let l=0;l!==r;++l)t.setTextureCube(e[l]||Qh,a[l])}function ow(n,e,t){const i=this.cache,r=e.length,a=ya(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Pt(i,a));for(let l=0;l!==r;++l)t.setTexture2DArray(e[l]||Zh,a[l])}function lw(n){switch(n){case 5126:return GS;case 35664:return VS;case 35665:return WS;case 35666:return XS;case 35674:return qS;case 35675:return $S;case 35676:return YS;case 5124:case 35670:return KS;case 35667:case 35671:return ZS;case 35668:case 35672:return JS;case 35669:case 35673:return QS;case 5125:return ew;case 36294:return tw;case 36295:return nw;case 36296:return iw;case 35678:case 36198:case 36298:case 36306:case 35682:return rw;case 35679:case 36299:case 36307:return sw;case 35680:case 36300:case 36308:case 36293:return aw;case 36289:case 36303:case 36311:case 36292:return ow}}class cw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=HS(t.type)}}class dw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=lw(t.type)}}class uw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,l=r.length;a!==l;++a){const o=r[a];o.setValue(e,t[o.id],i)}}}const go=/(\w+)(\])?(\[|\.)?/g;function Nd(n,e){n.seq.push(e),n.map[e.id]=e}function hw(n,e,t){const i=n.name,r=i.length;for(go.lastIndex=0;;){const a=go.exec(i),l=go.lastIndex;let o=a[1];const c=a[2]==="]",d=a[3];if(c&&(o=o|0),d===void 0||d==="["&&l+2===r){Nd(t,d===void 0?new cw(o,n,e):new dw(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new uw(o),Nd(t,f)),t=f}}}class qs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=e.getActiveUniform(t,r),l=e.getUniformLocation(t,a.name);hw(a,l,this)}}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,l=t.length;a!==l;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const l=e[r];l.id in t&&i.push(l)}return i}}function Pd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const fw=37297;let pw=0;function mw(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let l=r;l<a;l++){const o=l+1;i.push(`${o===e?">":" "} ${o}: ${t[l]}`)}return i.join(`
`)}function gw(n){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(n);let i;switch(e===t?i="":e===ia&&t===na?i="LinearDisplayP3ToLinearSRGB":e===na&&t===ia&&(i="LinearSRGBToLinearDisplayP3"),n){case Gn:case va:return[i,"LinearTransferOETF"];case Ot:case ml:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ld(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+mw(n.getShaderSource(e),l)}else return r}function xw(n,e){const t=gw(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function _w(n,e){let t;switch(e){case N_:t="Linear";break;case P_:t="Reinhard";break;case L_:t="OptimizedCineon";break;case Ah:t="ACESFilmic";break;case j_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function vw(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Lr).join(`
`)}function yw(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function bw(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),l=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[l]={type:a.type,location:n.getAttribLocation(e,l),locationSize:o}}return t}function Lr(n){return n!==""}function jd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yo(n){return n.replace(Sw,Ew)}const ww=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ew(n,e){let t=et[e];if(t===void 0){const i=ww.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Yo(t)}const Mw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Id(n){return n.replace(Mw,Tw)}function Tw(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Ud(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Aw(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Eh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Mh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===kn&&(e="SHADOWMAP_TYPE_VSM"),e}function Rw(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ar:case or:e="ENVMAP_TYPE_CUBE";break;case _a:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Cw(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===or&&(e="ENVMAP_MODE_REFRACTION"),e}function Nw(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Th:e="ENVMAP_BLENDING_MULTIPLY";break;case R_:e="ENVMAP_BLENDING_MIX";break;case C_:e="ENVMAP_BLENDING_ADD";break}return e}function Pw(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Lw(n,e,t,i){const r=n.getContext(),a=t.defines;let l=t.vertexShader,o=t.fragmentShader;const c=Aw(t),d=Rw(t),u=Cw(t),f=Nw(t),h=Pw(t),g=t.isWebGL2?"":vw(t),v=yw(a),x=r.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Lr).join(`
`),m.length>0&&(m+=`
`),p=[g,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Lr).join(`
`),p.length>0&&(p+=`
`)):(m=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),p=[g,Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ri?"#define TONE_MAPPING":"",t.toneMapping!==ri?et.tonemapping_pars_fragment:"",t.toneMapping!==ri?_w("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,xw("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),l=Yo(l),l=jd(l,t),l=Dd(l,t),o=Yo(o),o=jd(o,t),o=Dd(o,t),l=Id(l),o=Id(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ed?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ed?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=y+m+l,E=y+p+o,S=Pd(r,r.VERTEX_SHADER,_),A=Pd(r,r.FRAGMENT_SHADER,E);r.attachShader(x,S),r.attachShader(x,A),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function T(I){if(n.debug.checkShaderErrors){const k=r.getProgramInfoLog(x).trim(),$=r.getShaderInfoLog(S).trim(),P=r.getShaderInfoLog(A).trim();let z=!0,J=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,S,A);else{const K=Ld(r,S,"vertex"),ae=Ld(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Program Info Log: `+k+`
`+K+`
`+ae)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):($===""||P==="")&&(J=!1);J&&(I.diagnostics={runnable:z,programLog:k,vertexShader:{log:$,prefix:m},fragmentShader:{log:P,prefix:p}})}r.deleteShader(S),r.deleteShader(A),N=new qs(r,x),b=bw(r,x)}let N;this.getUniforms=function(){return N===void 0&&T(this),N};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,fw)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pw++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=A,this}let jw=0;class Dw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),l=this._getShaderCacheForMaterial(e);return l.has(r)===!1&&(l.add(r),r.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Iw(e),t.set(e,i)),i}}class Iw{constructor(e){this.id=jw++,this.code=e,this.usedTimes=0}}function Uw(n,e,t,i,r,a,l){const o=new xl,c=new Dw,d=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let g=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return b===0?"uv":`uv${b}`}function m(b,M,I,k,$){const P=k.fog,z=$.geometry,J=b.isMeshStandardMaterial?k.environment:null,K=(b.isMeshStandardMaterial?t:e).get(b.envMap||J),ae=K&&K.mapping===_a?K.image.height:null,ee=v[b.type];b.precision!==null&&(g=r.getMaxPrecision(b.precision),g!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const ie=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,D=ie!==void 0?ie.length:0;let L=0;z.morphAttributes.position!==void 0&&(L=1),z.morphAttributes.normal!==void 0&&(L=2),z.morphAttributes.color!==void 0&&(L=3);let G,B,Q,O;if(ee){const Mt=Tn[ee];G=Mt.vertexShader,B=Mt.fragmentShader}else G=b.vertexShader,B=b.fragmentShader,c.update(b),Q=c.getVertexShaderID(b),O=c.getFragmentShaderID(b);const ye=n.getRenderTarget(),Y=$.isInstancedMesh===!0,we=!!b.map,Me=!!b.matcap,oe=!!K,U=!!b.aoMap,Ze=!!b.lightMap,be=!!b.bumpMap,ge=!!b.normalMap,Ae=!!b.displacementMap,Ce=!!b.emissiveMap,Ne=!!b.metalnessMap,Ve=!!b.roughnessMap,He=b.anisotropy>0,ht=b.clearcoat>0,_t=b.iridescence>0,C=b.sheen>0,w=b.transmission>0,W=He&&!!b.anisotropyMap,he=ht&&!!b.clearcoatMap,ce=ht&&!!b.clearcoatNormalMap,de=ht&&!!b.clearcoatRoughnessMap,Le=_t&&!!b.iridescenceMap,xe=_t&&!!b.iridescenceThicknessMap,Se=C&&!!b.sheenColorMap,j=C&&!!b.sheenRoughnessMap,me=!!b.specularMap,le=!!b.specularColorMap,We=!!b.specularIntensityMap,je=w&&!!b.transmissionMap,Be=w&&!!b.thicknessMap,Pe=!!b.gradientMap,Te=!!b.alphaMap,it=b.alphaTest>0,F=!!b.alphaHash,_e=!!b.extensions,ue=!!z.attributes.uv1,se=!!z.attributes.uv2,pe=!!z.attributes.uv3;let Ie=ri;return b.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(Ie=n.toneMapping),{isWebGL2:u,shaderID:ee,shaderType:b.type,shaderName:b.name,vertexShader:G,fragmentShader:B,defines:b.defines,customVertexShaderID:Q,customFragmentShaderID:O,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,instancing:Y,instancingColor:Y&&$.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:ye===null?n.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:Gn,map:we,matcap:Me,envMap:oe,envMapMode:oe&&K.mapping,envMapCubeUVHeight:ae,aoMap:U,lightMap:Ze,bumpMap:be,normalMap:ge,displacementMap:h&&Ae,emissiveMap:Ce,normalMapObjectSpace:ge&&b.normalMapType===X_,normalMapTangentSpace:ge&&b.normalMapType===Uh,metalnessMap:Ne,roughnessMap:Ve,anisotropy:He,anisotropyMap:W,clearcoat:ht,clearcoatMap:he,clearcoatNormalMap:ce,clearcoatRoughnessMap:de,iridescence:_t,iridescenceMap:Le,iridescenceThicknessMap:xe,sheen:C,sheenColorMap:Se,sheenRoughnessMap:j,specularMap:me,specularColorMap:le,specularIntensityMap:We,transmission:w,transmissionMap:je,thicknessMap:Be,gradientMap:Pe,opaque:b.transparent===!1&&b.blending===tr,alphaMap:Te,alphaTest:it,alphaHash:F,combine:b.combine,mapUv:we&&x(b.map.channel),aoMapUv:U&&x(b.aoMap.channel),lightMapUv:Ze&&x(b.lightMap.channel),bumpMapUv:be&&x(b.bumpMap.channel),normalMapUv:ge&&x(b.normalMap.channel),displacementMapUv:Ae&&x(b.displacementMap.channel),emissiveMapUv:Ce&&x(b.emissiveMap.channel),metalnessMapUv:Ne&&x(b.metalnessMap.channel),roughnessMapUv:Ve&&x(b.roughnessMap.channel),anisotropyMapUv:W&&x(b.anisotropyMap.channel),clearcoatMapUv:he&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:ce&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:j&&x(b.sheenRoughnessMap.channel),specularMapUv:me&&x(b.specularMap.channel),specularColorMapUv:le&&x(b.specularColorMap.channel),specularIntensityMapUv:We&&x(b.specularIntensityMap.channel),transmissionMapUv:je&&x(b.transmissionMap.channel),thicknessMapUv:Be&&x(b.thicknessMap.channel),alphaMapUv:Te&&x(b.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ge||He),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:ue,vertexUv2s:se,vertexUv3s:pe,pointsUvs:$.isPoints===!0&&!!z.attributes.uv&&(we||Te),fog:!!P,useFog:b.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:$.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:L,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ie,useLegacyLights:n._useLegacyLights,decodeVideoTexture:we&&b.map.isVideoTexture===!0&&dt.getTransfer(b.map.colorSpace)===pt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===An,flipSided:b.side===Qt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:_e&&b.extensions.derivatives===!0,extensionFragDepth:_e&&b.extensions.fragDepth===!0,extensionDrawBuffers:_e&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:_e&&b.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(M,b),_(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function _(b,M){o.disableAll(),M.isWebGL2&&o.enable(0),M.supportsVertexTextures&&o.enable(1),M.instancing&&o.enable(2),M.instancingColor&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.useLegacyLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),b.push(o.mask)}function E(b){const M=v[b.type];let I;if(M){const k=Tn[M];I=bv.clone(k.uniforms)}else I=b.uniforms;return I}function S(b,M){let I;for(let k=0,$=d.length;k<$;k++){const P=d[k];if(P.cacheKey===M){I=P,++I.usedTimes;break}}return I===void 0&&(I=new Lw(n,M,b,a),d.push(I)),I}function A(b){if(--b.usedTimes===0){const M=d.indexOf(b);d[M]=d[d.length-1],d.pop(),b.destroy()}}function T(b){c.remove(b)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:S,releaseProgram:A,releaseShaderCache:T,programs:d,dispose:N}}function Ow(){let n=new WeakMap;function e(a){let l=n.get(a);return l===void 0&&(l={},n.set(a,l)),l}function t(a){n.delete(a)}function i(a,l,o){n.get(a)[l]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function Fw(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Od(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Fd(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function l(f,h,g,v,x,m){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:g,groupOrder:v,renderOrder:f.renderOrder,z:x,group:m},n[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=g,p.groupOrder=v,p.renderOrder=f.renderOrder,p.z=x,p.group=m),e++,p}function o(f,h,g,v,x,m){const p=l(f,h,g,v,x,m);g.transmission>0?i.push(p):g.transparent===!0?r.push(p):t.push(p)}function c(f,h,g,v,x,m){const p=l(f,h,g,v,x,m);g.transmission>0?i.unshift(p):g.transparent===!0?r.unshift(p):t.unshift(p)}function d(f,h){t.length>1&&t.sort(f||Fw),i.length>1&&i.sort(h||Od),r.length>1&&r.sort(h||Od)}function u(){for(let f=e,h=n.length;f<h;f++){const g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:o,unshift:c,finish:u,sort:d}}function kw(){let n=new WeakMap;function e(i,r){const a=n.get(i);let l;return a===void 0?(l=new Fd,n.set(i,[l])):r>=a.length?(l=new Fd,a.push(l)):l=a[r],l}function t(){n=new WeakMap}return{get:e,dispose:t}}function Bw(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new ot};break;case"SpotLight":t={position:new q,direction:new q,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new q,halfWidth:new q,halfHeight:new q};break}return n[e.id]=t,t}}}function zw(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Hw=0;function Gw(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Vw(n,e){const t=new Bw,i=zw(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new q);const a=new q,l=new yt,o=new yt;function c(u,f){let h=0,g=0,v=0;for(let k=0;k<9;k++)r.probe[k].set(0,0,0);let x=0,m=0,p=0,y=0,_=0,E=0,S=0,A=0,T=0,N=0,b=0;u.sort(Gw);const M=f===!0?Math.PI:1;for(let k=0,$=u.length;k<$;k++){const P=u[k],z=P.color,J=P.intensity,K=P.distance,ae=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*J*M,g+=z.g*J*M,v+=z.b*J*M;else if(P.isLightProbe){for(let ee=0;ee<9;ee++)r.probe[ee].addScaledVector(P.sh.coefficients[ee],J);b++}else if(P.isDirectionalLight){const ee=t.get(P);if(ee.color.copy(P.color).multiplyScalar(P.intensity*M),P.castShadow){const ie=P.shadow,D=i.get(P);D.shadowBias=ie.bias,D.shadowNormalBias=ie.normalBias,D.shadowRadius=ie.radius,D.shadowMapSize=ie.mapSize,r.directionalShadow[x]=D,r.directionalShadowMap[x]=ae,r.directionalShadowMatrix[x]=P.shadow.matrix,E++}r.directional[x]=ee,x++}else if(P.isSpotLight){const ee=t.get(P);ee.position.setFromMatrixPosition(P.matrixWorld),ee.color.copy(z).multiplyScalar(J*M),ee.distance=K,ee.coneCos=Math.cos(P.angle),ee.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),ee.decay=P.decay,r.spot[p]=ee;const ie=P.shadow;if(P.map&&(r.spotLightMap[T]=P.map,T++,ie.updateMatrices(P),P.castShadow&&N++),r.spotLightMatrix[p]=ie.matrix,P.castShadow){const D=i.get(P);D.shadowBias=ie.bias,D.shadowNormalBias=ie.normalBias,D.shadowRadius=ie.radius,D.shadowMapSize=ie.mapSize,r.spotShadow[p]=D,r.spotShadowMap[p]=ae,A++}p++}else if(P.isRectAreaLight){const ee=t.get(P);ee.color.copy(z).multiplyScalar(J),ee.halfWidth.set(P.width*.5,0,0),ee.halfHeight.set(0,P.height*.5,0),r.rectArea[y]=ee,y++}else if(P.isPointLight){const ee=t.get(P);if(ee.color.copy(P.color).multiplyScalar(P.intensity*M),ee.distance=P.distance,ee.decay=P.decay,P.castShadow){const ie=P.shadow,D=i.get(P);D.shadowBias=ie.bias,D.shadowNormalBias=ie.normalBias,D.shadowRadius=ie.radius,D.shadowMapSize=ie.mapSize,D.shadowCameraNear=ie.camera.near,D.shadowCameraFar=ie.camera.far,r.pointShadow[m]=D,r.pointShadowMap[m]=ae,r.pointShadowMatrix[m]=P.shadow.matrix,S++}r.point[m]=ee,m++}else if(P.isHemisphereLight){const ee=t.get(P);ee.skyColor.copy(P.color).multiplyScalar(J*M),ee.groundColor.copy(P.groundColor).multiplyScalar(J*M),r.hemi[_]=ee,_++}}y>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_FLOAT_1,r.rectAreaLTC2=ve.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ve.LTC_HALF_1,r.rectAreaLTC2=ve.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=g,r.ambient[2]=v;const I=r.hash;(I.directionalLength!==x||I.pointLength!==m||I.spotLength!==p||I.rectAreaLength!==y||I.hemiLength!==_||I.numDirectionalShadows!==E||I.numPointShadows!==S||I.numSpotShadows!==A||I.numSpotMaps!==T||I.numLightProbes!==b)&&(r.directional.length=x,r.spot.length=p,r.rectArea.length=y,r.point.length=m,r.hemi.length=_,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=S,r.pointShadowMap.length=S,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=S,r.spotLightMatrix.length=A+T-N,r.spotLightMap.length=T,r.numSpotLightShadowsWithMaps=N,r.numLightProbes=b,I.directionalLength=x,I.pointLength=m,I.spotLength=p,I.rectAreaLength=y,I.hemiLength=_,I.numDirectionalShadows=E,I.numPointShadows=S,I.numSpotShadows=A,I.numSpotMaps=T,I.numLightProbes=b,r.version=Hw++)}function d(u,f){let h=0,g=0,v=0,x=0,m=0;const p=f.matrixWorldInverse;for(let y=0,_=u.length;y<_;y++){const E=u[y];if(E.isDirectionalLight){const S=r.directional[h];S.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(p),h++}else if(E.isSpotLight){const S=r.spot[v];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(p),v++}else if(E.isRectAreaLight){const S=r.rectArea[x];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(p),o.identity(),l.copy(E.matrixWorld),l.premultiply(p),o.extractRotation(l),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(E.isPointLight){const S=r.point[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(p),g++}else if(E.isHemisphereLight){const S=r.hemi[m];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:c,setupView:d,state:r}}function kd(n,e){const t=new Vw(n,e),i=[],r=[];function a(){i.length=0,r.length=0}function l(f){i.push(f)}function o(f){r.push(f)}function c(f){t.setup(i,f)}function d(f){t.setupView(i,f)}return{init:a,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:c,setupLightsView:d,pushLight:l,pushShadow:o}}function Ww(n,e){let t=new WeakMap;function i(a,l=0){const o=t.get(a);let c;return o===void 0?(c=new kd(n,e),t.set(a,[c])):l>=o.length?(c=new kd(n,e),o.push(c)):c=o[l],c}function r(){t=new WeakMap}return{get:i,dispose:r}}class Xw extends Kr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=V_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qw extends Kr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const $w=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Kw(n,e,t){let i=new _l;const r=new $e,a=new $e,l=new Dt,o=new Xw({depthPacking:W_}),c=new qw,d={},u=t.maxTextureSize,f={[ai]:Qt,[Qt]:ai,[An]:An},h=new Ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:$w,fragmentShader:Yw}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const v=new oi;v.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new gt(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eh;let p=this.type;this.render=function(S,A,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const N=n.getRenderTarget(),b=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),I=n.state;I.setBlending(ii),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const k=p!==kn&&this.type===kn,$=p===kn&&this.type!==kn;for(let P=0,z=S.length;P<z;P++){const J=S[P],K=J.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const ae=K.getFrameExtents();if(r.multiply(ae),a.copy(K.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ae.x),r.x=a.x*ae.x,K.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ae.y),r.y=a.y*ae.y,K.mapSize.y=a.y)),K.map===null||k===!0||$===!0){const ie=this.type!==kn?{minFilter:Wt,magFilter:Wt}:{};K.map!==null&&K.map.dispose(),K.map=new Ai(r.x,r.y,ie),K.map.texture.name=J.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const ee=K.getViewportCount();for(let ie=0;ie<ee;ie++){const D=K.getViewport(ie);l.set(a.x*D.x,a.y*D.y,a.x*D.z,a.y*D.w),I.viewport(l),K.updateMatrices(J,ie),i=K.getFrustum(),E(A,T,K.camera,J,this.type)}K.isPointLightShadow!==!0&&this.type===kn&&y(K,T),K.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(N,b,M)};function y(S,A){const T=e.update(x);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,g.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ai(r.x,r.y)),h.uniforms.shadow_pass.value=S.map.texture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(A,null,T,h,x,null),g.uniforms.shadow_pass.value=S.mapPass.texture,g.uniforms.resolution.value=S.mapSize,g.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(A,null,T,g,x,null)}function _(S,A,T,N){let b=null;const M=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(M!==void 0)b=M;else if(b=T.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const I=b.uuid,k=A.uuid;let $=d[I];$===void 0&&($={},d[I]=$);let P=$[k];P===void 0&&(P=b.clone(),$[k]=P),b=P}if(b.visible=A.visible,b.wireframe=A.wireframe,N===kn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:f[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,T.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const I=n.properties.get(b);I.light=T}return b}function E(S,A,T,N,b){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&b===kn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);const k=e.update(S),$=S.material;if(Array.isArray($)){const P=k.groups;for(let z=0,J=P.length;z<J;z++){const K=P[z],ae=$[K.materialIndex];if(ae&&ae.visible){const ee=_(S,ae,N,b);n.renderBufferDirect(T,null,k,ee,S,K)}}}else if($.visible){const P=_(S,$,N,b);n.renderBufferDirect(T,null,k,P,S,null)}}const I=S.children;for(let k=0,$=I.length;k<$;k++)E(I[k],A,T,N,b)}}function Zw(n,e,t){const i=t.isWebGL2;function r(){let F=!1;const _e=new Dt;let ue=null;const se=new Dt(0,0,0,0);return{setMask:function(pe){ue!==pe&&!F&&(n.colorMask(pe,pe,pe,pe),ue=pe)},setLocked:function(pe){F=pe},setClear:function(pe,Ie,rt,Mt,an){an===!0&&(pe*=Mt,Ie*=Mt,rt*=Mt),_e.set(pe,Ie,rt,Mt),se.equals(_e)===!1&&(n.clearColor(pe,Ie,rt,Mt),se.copy(_e))},reset:function(){F=!1,ue=null,se.set(-1,0,0,0)}}}function a(){let F=!1,_e=null,ue=null,se=null;return{setTest:function(pe){pe?we(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(pe){_e!==pe&&!F&&(n.depthMask(pe),_e=pe)},setFunc:function(pe){if(ue!==pe){switch(pe){case b_:n.depthFunc(n.NEVER);break;case S_:n.depthFunc(n.ALWAYS);break;case w_:n.depthFunc(n.LESS);break;case ea:n.depthFunc(n.LEQUAL);break;case E_:n.depthFunc(n.EQUAL);break;case M_:n.depthFunc(n.GEQUAL);break;case T_:n.depthFunc(n.GREATER);break;case A_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=pe}},setLocked:function(pe){F=pe},setClear:function(pe){se!==pe&&(n.clearDepth(pe),se=pe)},reset:function(){F=!1,_e=null,ue=null,se=null}}}function l(){let F=!1,_e=null,ue=null,se=null,pe=null,Ie=null,rt=null,Mt=null,an=null;return{setTest:function(ut){F||(ut?we(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(ut){_e!==ut&&!F&&(n.stencilMask(ut),_e=ut)},setFunc:function(ut,Ht,Mn){(ue!==ut||se!==Ht||pe!==Mn)&&(n.stencilFunc(ut,Ht,Mn),ue=ut,se=Ht,pe=Mn)},setOp:function(ut,Ht,Mn){(Ie!==ut||rt!==Ht||Mt!==Mn)&&(n.stencilOp(ut,Ht,Mn),Ie=ut,rt=Ht,Mt=Mn)},setLocked:function(ut){F=ut},setClear:function(ut){an!==ut&&(n.clearStencil(ut),an=ut)},reset:function(){F=!1,_e=null,ue=null,se=null,pe=null,Ie=null,rt=null,Mt=null,an=null}}}const o=new r,c=new a,d=new l,u=new WeakMap,f=new WeakMap;let h={},g={},v=new WeakMap,x=[],m=null,p=!1,y=null,_=null,E=null,S=null,A=null,T=null,N=null,b=new ot(0,0,0),M=0,I=!1,k=null,$=null,P=null,z=null,J=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ae=!1,ee=0;const ie=n.getParameter(n.VERSION);ie.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ie)[1]),ae=ee>=1):ie.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),ae=ee>=2);let D=null,L={};const G=n.getParameter(n.SCISSOR_BOX),B=n.getParameter(n.VIEWPORT),Q=new Dt().fromArray(G),O=new Dt().fromArray(B);function ye(F,_e,ue,se){const pe=new Uint8Array(4),Ie=n.createTexture();n.bindTexture(F,Ie),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let rt=0;rt<ue;rt++)i&&(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)?n.texImage3D(_e,0,n.RGBA,1,1,se,0,n.RGBA,n.UNSIGNED_BYTE,pe):n.texImage2D(_e+rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pe);return Ie}const Y={};Y[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Y[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),d.setClear(0),we(n.DEPTH_TEST),c.setFunc(ea),Ne(!1),Ve(yc),we(n.CULL_FACE),Ae(ii);function we(F){h[F]!==!0&&(n.enable(F),h[F]=!0)}function Me(F){h[F]!==!1&&(n.disable(F),h[F]=!1)}function oe(F,_e){return g[F]!==_e?(n.bindFramebuffer(F,_e),g[F]=_e,i&&(F===n.DRAW_FRAMEBUFFER&&(g[n.FRAMEBUFFER]=_e),F===n.FRAMEBUFFER&&(g[n.DRAW_FRAMEBUFFER]=_e)),!0):!1}function U(F,_e){let ue=x,se=!1;if(F)if(ue=v.get(_e),ue===void 0&&(ue=[],v.set(_e,ue)),F.isWebGLMultipleRenderTargets){const pe=F.texture;if(ue.length!==pe.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let Ie=0,rt=pe.length;Ie<rt;Ie++)ue[Ie]=n.COLOR_ATTACHMENT0+Ie;ue.length=pe.length,se=!0}}else ue[0]!==n.COLOR_ATTACHMENT0&&(ue[0]=n.COLOR_ATTACHMENT0,se=!0);else ue[0]!==n.BACK&&(ue[0]=n.BACK,se=!0);se&&(t.isWebGL2?n.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function Ze(F){return m!==F?(n.useProgram(F),m=F,!0):!1}const be={[xi]:n.FUNC_ADD,[a_]:n.FUNC_SUBTRACT,[o_]:n.FUNC_REVERSE_SUBTRACT};if(i)be[Ec]=n.MIN,be[Mc]=n.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(be[Ec]=F.MIN_EXT,be[Mc]=F.MAX_EXT)}const ge={[l_]:n.ZERO,[c_]:n.ONE,[d_]:n.SRC_COLOR,[zo]:n.SRC_ALPHA,[g_]:n.SRC_ALPHA_SATURATE,[p_]:n.DST_COLOR,[h_]:n.DST_ALPHA,[u_]:n.ONE_MINUS_SRC_COLOR,[Ho]:n.ONE_MINUS_SRC_ALPHA,[m_]:n.ONE_MINUS_DST_COLOR,[f_]:n.ONE_MINUS_DST_ALPHA,[x_]:n.CONSTANT_COLOR,[__]:n.ONE_MINUS_CONSTANT_COLOR,[v_]:n.CONSTANT_ALPHA,[y_]:n.ONE_MINUS_CONSTANT_ALPHA};function Ae(F,_e,ue,se,pe,Ie,rt,Mt,an,ut){if(F===ii){p===!0&&(Me(n.BLEND),p=!1);return}if(p===!1&&(we(n.BLEND),p=!0),F!==s_){if(F!==y||ut!==I){if((_!==xi||A!==xi)&&(n.blendEquation(n.FUNC_ADD),_=xi,A=xi),ut)switch(F){case tr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bc:n.blendFunc(n.ONE,n.ONE);break;case Sc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Sc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}E=null,S=null,T=null,N=null,b.set(0,0,0),M=0,y=F,I=ut}return}pe=pe||_e,Ie=Ie||ue,rt=rt||se,(_e!==_||pe!==A)&&(n.blendEquationSeparate(be[_e],be[pe]),_=_e,A=pe),(ue!==E||se!==S||Ie!==T||rt!==N)&&(n.blendFuncSeparate(ge[ue],ge[se],ge[Ie],ge[rt]),E=ue,S=se,T=Ie,N=rt),(Mt.equals(b)===!1||an!==M)&&(n.blendColor(Mt.r,Mt.g,Mt.b,an),b.copy(Mt),M=an),y=F,I=!1}function Ce(F,_e){F.side===An?Me(n.CULL_FACE):we(n.CULL_FACE);let ue=F.side===Qt;_e&&(ue=!ue),Ne(ue),F.blending===tr&&F.transparent===!1?Ae(ii):Ae(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),c.setFunc(F.depthFunc),c.setTest(F.depthTest),c.setMask(F.depthWrite),o.setMask(F.colorWrite);const se=F.stencilWrite;d.setTest(se),se&&(d.setMask(F.stencilWriteMask),d.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),d.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ht(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?we(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(F){k!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),k=F)}function Ve(F){F!==i_?(we(n.CULL_FACE),F!==$&&(F===yc?n.cullFace(n.BACK):F===r_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),$=F}function He(F){F!==P&&(ae&&n.lineWidth(F),P=F)}function ht(F,_e,ue){F?(we(n.POLYGON_OFFSET_FILL),(z!==_e||J!==ue)&&(n.polygonOffset(_e,ue),z=_e,J=ue)):Me(n.POLYGON_OFFSET_FILL)}function _t(F){F?we(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function C(F){F===void 0&&(F=n.TEXTURE0+K-1),D!==F&&(n.activeTexture(F),D=F)}function w(F,_e,ue){ue===void 0&&(D===null?ue=n.TEXTURE0+K-1:ue=D);let se=L[ue];se===void 0&&(se={type:void 0,texture:void 0},L[ue]=se),(se.type!==F||se.texture!==_e)&&(D!==ue&&(n.activeTexture(ue),D=ue),n.bindTexture(F,_e||Y[F]),se.type=F,se.texture=_e)}function W(){const F=L[D];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function he(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Le(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function le(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function We(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function je(F){Q.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Q.copy(F))}function Be(F){O.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),O.copy(F))}function Pe(F,_e){let ue=f.get(_e);ue===void 0&&(ue=new WeakMap,f.set(_e,ue));let se=ue.get(F);se===void 0&&(se=n.getUniformBlockIndex(_e,F.name),ue.set(F,se))}function Te(F,_e){const se=f.get(_e).get(F);u.get(_e)!==se&&(n.uniformBlockBinding(_e,se,F.__bindingPointIndex),u.set(_e,se))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},D=null,L={},g={},v=new WeakMap,x=[],m=null,p=!1,y=null,_=null,E=null,S=null,A=null,T=null,N=null,b=new ot(0,0,0),M=0,I=!1,k=null,$=null,P=null,z=null,J=null,Q.set(0,0,n.canvas.width,n.canvas.height),O.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),d.reset()}return{buffers:{color:o,depth:c,stencil:d},enable:we,disable:Me,bindFramebuffer:oe,drawBuffers:U,useProgram:Ze,setBlending:Ae,setMaterial:Ce,setFlipSided:Ne,setCullFace:Ve,setLineWidth:He,setPolygonOffset:ht,setScissorTest:_t,activeTexture:C,bindTexture:w,unbindTexture:W,compressedTexImage2D:he,compressedTexImage3D:ce,texImage2D:le,texImage3D:We,updateUBOMapping:Pe,uniformBlockBinding:Te,texStorage2D:j,texStorage3D:me,texSubImage2D:de,texSubImage3D:Le,compressedTexSubImage2D:xe,compressedTexSubImage3D:Se,scissor:je,viewport:Be,reset:it}}function Jw(n,e,t,i,r,a,l){const o=r.isWebGL2,c=r.maxTextures,d=r.maxCubemapSize,u=r.maxTextureSize,f=r.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,g=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),v=new WeakMap;let x;const m=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,w){return p?new OffscreenCanvas(C,w):aa("canvas")}function _(C,w,W,he){let ce=1;if((C.width>he||C.height>he)&&(ce=he/Math.max(C.width,C.height)),ce<1||w===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const de=w?$o:Math.floor,Le=de(ce*C.width),xe=de(ce*C.height);x===void 0&&(x=y(Le,xe));const Se=W?y(Le,xe):x;return Se.width=Le,Se.height=xe,Se.getContext("2d").drawImage(C,0,0,Le,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+Le+"x"+xe+")."),Se}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function E(C){return td(C.width)&&td(C.height)}function S(C){return o?!1:C.wrapS!==yn||C.wrapT!==yn||C.minFilter!==Wt&&C.minFilter!==dn}function A(C,w){return C.generateMipmaps&&w&&C.minFilter!==Wt&&C.minFilter!==dn}function T(C){n.generateMipmap(C)}function N(C,w,W,he,ce=!1){if(o===!1)return w;if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let de=w;if(w===n.RED&&(W===n.FLOAT&&(de=n.R32F),W===n.HALF_FLOAT&&(de=n.R16F),W===n.UNSIGNED_BYTE&&(de=n.R8)),w===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(de=n.R8UI),W===n.UNSIGNED_SHORT&&(de=n.R16UI),W===n.UNSIGNED_INT&&(de=n.R32UI),W===n.BYTE&&(de=n.R8I),W===n.SHORT&&(de=n.R16I),W===n.INT&&(de=n.R32I)),w===n.RG&&(W===n.FLOAT&&(de=n.RG32F),W===n.HALF_FLOAT&&(de=n.RG16F),W===n.UNSIGNED_BYTE&&(de=n.RG8)),w===n.RGBA){const Le=ce?ta:dt.getTransfer(he);W===n.FLOAT&&(de=n.RGBA32F),W===n.HALF_FLOAT&&(de=n.RGBA16F),W===n.UNSIGNED_BYTE&&(de=Le===pt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(de=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(de=n.RGB5_A1)}return(de===n.R16F||de===n.R32F||de===n.RG16F||de===n.RG32F||de===n.RGBA16F||de===n.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function b(C,w,W){return A(C,W)===!0||C.isFramebufferTexture&&C.minFilter!==Wt&&C.minFilter!==dn?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function M(C){return C===Wt||C===Tc||C===za?n.NEAREST:n.LINEAR}function I(C){const w=C.target;w.removeEventListener("dispose",I),$(w),w.isVideoTexture&&v.delete(w)}function k(C){const w=C.target;w.removeEventListener("dispose",k),z(w)}function $(C){const w=i.get(C);if(w.__webglInit===void 0)return;const W=C.source,he=m.get(W);if(he){const ce=he[w.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&P(C),Object.keys(he).length===0&&m.delete(W)}i.remove(C)}function P(C){const w=i.get(C);n.deleteTexture(w.__webglTexture);const W=C.source,he=m.get(W);delete he[w.__cacheKey],l.memory.textures--}function z(C){const w=C.texture,W=i.get(C),he=i.get(w);if(he.__webglTexture!==void 0&&(n.deleteTexture(he.__webglTexture),l.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(W.__webglFramebuffer[ce]))for(let de=0;de<W.__webglFramebuffer[ce].length;de++)n.deleteFramebuffer(W.__webglFramebuffer[ce][de]);else n.deleteFramebuffer(W.__webglFramebuffer[ce]);W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer[ce])}else{if(Array.isArray(W.__webglFramebuffer))for(let ce=0;ce<W.__webglFramebuffer.length;ce++)n.deleteFramebuffer(W.__webglFramebuffer[ce]);else n.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&n.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ce=0;ce<W.__webglColorRenderbuffer.length;ce++)W.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(W.__webglColorRenderbuffer[ce]);W.__webglDepthRenderbuffer&&n.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let ce=0,de=w.length;ce<de;ce++){const Le=i.get(w[ce]);Le.__webglTexture&&(n.deleteTexture(Le.__webglTexture),l.memory.textures--),i.remove(w[ce])}i.remove(w),i.remove(C)}let J=0;function K(){J=0}function ae(){const C=J;return C>=c&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+c),J+=1,C}function ee(C){const w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function ie(C,w){const W=i.get(C);if(C.isVideoTexture&&ht(C),C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){const he=C.image;if(he===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{we(W,C,w);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+w)}function D(C,w){const W=i.get(C);if(C.version>0&&W.__version!==C.version){we(W,C,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+w)}function L(C,w){const W=i.get(C);if(C.version>0&&W.__version!==C.version){we(W,C,w);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+w)}function G(C,w){const W=i.get(C);if(C.version>0&&W.__version!==C.version){Me(W,C,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+w)}const B={[Wo]:n.REPEAT,[yn]:n.CLAMP_TO_EDGE,[Xo]:n.MIRRORED_REPEAT},Q={[Wt]:n.NEAREST,[Tc]:n.NEAREST_MIPMAP_NEAREST,[za]:n.NEAREST_MIPMAP_LINEAR,[dn]:n.LINEAR,[D_]:n.LINEAR_MIPMAP_NEAREST,[Br]:n.LINEAR_MIPMAP_LINEAR},O={[q_]:n.NEVER,[ev]:n.ALWAYS,[$_]:n.LESS,[K_]:n.LEQUAL,[Y_]:n.EQUAL,[Q_]:n.GEQUAL,[Z_]:n.GREATER,[J_]:n.NOTEQUAL};function ye(C,w,W){if(W?(n.texParameteri(C,n.TEXTURE_WRAP_S,B[w.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,B[w.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,B[w.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Q[w.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Q[w.minFilter])):(n.texParameteri(C,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(C,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(w.wrapS!==yn||w.wrapT!==yn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(C,n.TEXTURE_MAG_FILTER,M(w.magFilter)),n.texParameteri(C,n.TEXTURE_MIN_FILTER,M(w.minFilter)),w.minFilter!==Wt&&w.minFilter!==dn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,O[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const he=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===Wt||w.minFilter!==za&&w.minFilter!==Br||w.type===ei&&e.has("OES_texture_float_linear")===!1||o===!1&&w.type===zr&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||i.get(w).__currentAnisotropy)&&(n.texParameterf(C,he.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy)}}function Y(C,w){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",I));const he=w.source;let ce=m.get(he);ce===void 0&&(ce={},m.set(he,ce));const de=ee(w);if(de!==C.__cacheKey){ce[de]===void 0&&(ce[de]={texture:n.createTexture(),usedTimes:0},l.memory.textures++,W=!0),ce[de].usedTimes++;const Le=ce[C.__cacheKey];Le!==void 0&&(ce[C.__cacheKey].usedTimes--,Le.usedTimes===0&&P(w)),C.__cacheKey=de,C.__webglTexture=ce[de].texture}return W}function we(C,w,W){let he=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(he=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(he=n.TEXTURE_3D);const ce=Y(C,w),de=w.source;t.bindTexture(he,C.__webglTexture,n.TEXTURE0+W);const Le=i.get(de);if(de.version!==Le.__version||ce===!0){t.activeTexture(n.TEXTURE0+W);const xe=dt.getPrimaries(dt.workingColorSpace),Se=w.colorSpace===hn?null:dt.getPrimaries(w.colorSpace),j=w.colorSpace===hn||xe===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const me=S(w)&&E(w.image)===!1;let le=_(w.image,me,!1,u);le=_t(w,le);const We=E(le)||o,je=a.convert(w.format,w.colorSpace);let Be=a.convert(w.type),Pe=N(w.internalFormat,je,Be,w.colorSpace,w.isVideoTexture);ye(he,w,We);let Te;const it=w.mipmaps,F=o&&w.isVideoTexture!==!0,_e=Le.__version===void 0||ce===!0,ue=b(w,le,We);if(w.isDepthTexture)Pe=n.DEPTH_COMPONENT,o?w.type===ei?Pe=n.DEPTH_COMPONENT32F:w.type===Qn?Pe=n.DEPTH_COMPONENT24:w.type===bi?Pe=n.DEPTH24_STENCIL8:Pe=n.DEPTH_COMPONENT16:w.type===ei&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===Si&&Pe===n.DEPTH_COMPONENT&&w.type!==pl&&w.type!==Qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Qn,Be=a.convert(w.type)),w.format===lr&&Pe===n.DEPTH_COMPONENT&&(Pe=n.DEPTH_STENCIL,w.type!==bi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=bi,Be=a.convert(w.type))),_e&&(F?t.texStorage2D(n.TEXTURE_2D,1,Pe,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,Pe,le.width,le.height,0,je,Be,null));else if(w.isDataTexture)if(it.length>0&&We){F&&_e&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,it[0].width,it[0].height);for(let se=0,pe=it.length;se<pe;se++)Te=it[se],F?t.texSubImage2D(n.TEXTURE_2D,se,0,0,Te.width,Te.height,je,Be,Te.data):t.texImage2D(n.TEXTURE_2D,se,Pe,Te.width,Te.height,0,je,Be,Te.data);w.generateMipmaps=!1}else F?(_e&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,le.width,le.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,le.width,le.height,je,Be,le.data)):t.texImage2D(n.TEXTURE_2D,0,Pe,le.width,le.height,0,je,Be,le.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){F&&_e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,it[0].width,it[0].height,le.depth);for(let se=0,pe=it.length;se<pe;se++)Te=it[se],w.format!==bn?je!==null?F?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,Te.width,Te.height,le.depth,je,Te.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Pe,Te.width,Te.height,le.depth,0,Te.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,Te.width,Te.height,le.depth,je,Be,Te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Pe,Te.width,Te.height,le.depth,0,je,Be,Te.data)}else{F&&_e&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,it[0].width,it[0].height);for(let se=0,pe=it.length;se<pe;se++)Te=it[se],w.format!==bn?je!==null?F?t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,Te.width,Te.height,je,Te.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Pe,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?t.texSubImage2D(n.TEXTURE_2D,se,0,0,Te.width,Te.height,je,Be,Te.data):t.texImage2D(n.TEXTURE_2D,se,Pe,Te.width,Te.height,0,je,Be,Te.data)}else if(w.isDataArrayTexture)F?(_e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,le.width,le.height,le.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,je,Be,le.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,le.width,le.height,le.depth,0,je,Be,le.data);else if(w.isData3DTexture)F?(_e&&t.texStorage3D(n.TEXTURE_3D,ue,Pe,le.width,le.height,le.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,je,Be,le.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,le.width,le.height,le.depth,0,je,Be,le.data);else if(w.isFramebufferTexture){if(_e)if(F)t.texStorage2D(n.TEXTURE_2D,ue,Pe,le.width,le.height);else{let se=le.width,pe=le.height;for(let Ie=0;Ie<ue;Ie++)t.texImage2D(n.TEXTURE_2D,Ie,Pe,se,pe,0,je,Be,null),se>>=1,pe>>=1}}else if(it.length>0&&We){F&&_e&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,it[0].width,it[0].height);for(let se=0,pe=it.length;se<pe;se++)Te=it[se],F?t.texSubImage2D(n.TEXTURE_2D,se,0,0,je,Be,Te):t.texImage2D(n.TEXTURE_2D,se,Pe,je,Be,Te);w.generateMipmaps=!1}else F?(_e&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,le.width,le.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,je,Be,le)):t.texImage2D(n.TEXTURE_2D,0,Pe,je,Be,le);A(w,We)&&T(he),Le.__version=de.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Me(C,w,W){if(w.image.length!==6)return;const he=Y(C,w),ce=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+W);const de=i.get(ce);if(ce.version!==de.__version||he===!0){t.activeTexture(n.TEXTURE0+W);const Le=dt.getPrimaries(dt.workingColorSpace),xe=w.colorSpace===hn?null:dt.getPrimaries(w.colorSpace),Se=w.colorSpace===hn||Le===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const j=w.isCompressedTexture||w.image[0].isCompressedTexture,me=w.image[0]&&w.image[0].isDataTexture,le=[];for(let se=0;se<6;se++)!j&&!me?le[se]=_(w.image[se],!1,!0,d):le[se]=me?w.image[se].image:w.image[se],le[se]=_t(w,le[se]);const We=le[0],je=E(We)||o,Be=a.convert(w.format,w.colorSpace),Pe=a.convert(w.type),Te=N(w.internalFormat,Be,Pe,w.colorSpace),it=o&&w.isVideoTexture!==!0,F=de.__version===void 0||he===!0;let _e=b(w,We,je);ye(n.TEXTURE_CUBE_MAP,w,je);let ue;if(j){it&&F&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Te,We.width,We.height);for(let se=0;se<6;se++){ue=le[se].mipmaps;for(let pe=0;pe<ue.length;pe++){const Ie=ue[pe];w.format!==bn?Be!==null?it?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe,0,0,Ie.width,Ie.height,Be,Ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe,Te,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe,0,0,Ie.width,Ie.height,Be,Pe,Ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe,Te,Ie.width,Ie.height,0,Be,Pe,Ie.data)}}}else{ue=w.mipmaps,it&&F&&(ue.length>0&&_e++,t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Te,le[0].width,le[0].height));for(let se=0;se<6;se++)if(me){it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,le[se].width,le[se].height,Be,Pe,le[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Te,le[se].width,le[se].height,0,Be,Pe,le[se].data);for(let pe=0;pe<ue.length;pe++){const rt=ue[pe].image[se].image;it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe+1,0,0,rt.width,rt.height,Be,Pe,rt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe+1,Te,rt.width,rt.height,0,Be,Pe,rt.data)}}else{it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Be,Pe,le[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Te,Be,Pe,le[se]);for(let pe=0;pe<ue.length;pe++){const Ie=ue[pe];it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe+1,0,0,Be,Pe,Ie.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,pe+1,Te,Be,Pe,Ie.image[se])}}}A(w,je)&&T(n.TEXTURE_CUBE_MAP),de.__version=ce.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function oe(C,w,W,he,ce,de){const Le=a.convert(W.format,W.colorSpace),xe=a.convert(W.type),Se=N(W.internalFormat,Le,xe,W.colorSpace);if(!i.get(w).__hasExternalTextures){const me=Math.max(1,w.width>>de),le=Math.max(1,w.height>>de);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,de,Se,me,le,w.depth,0,Le,xe,null):t.texImage2D(ce,de,Se,me,le,0,Le,xe,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),He(w)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,he,ce,i.get(W).__webglTexture,0,Ve(w)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,he,ce,i.get(W).__webglTexture,de),t.bindFramebuffer(n.FRAMEBUFFER,null)}function U(C,w,W){if(n.bindRenderbuffer(n.RENDERBUFFER,C),w.depthBuffer&&!w.stencilBuffer){let he=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(W||He(w)){const ce=w.depthTexture;ce&&ce.isDepthTexture&&(ce.type===ei?he=n.DEPTH_COMPONENT32F:ce.type===Qn&&(he=n.DEPTH_COMPONENT24));const de=Ve(w);He(w)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,he,w.width,w.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,de,he,w.width,w.height)}else n.renderbufferStorage(n.RENDERBUFFER,he,w.width,w.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,C)}else if(w.depthBuffer&&w.stencilBuffer){const he=Ve(w);W&&He(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,w.width,w.height):He(w)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,C)}else{const he=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let ce=0;ce<he.length;ce++){const de=he[ce],Le=a.convert(de.format,de.colorSpace),xe=a.convert(de.type),Se=N(de.internalFormat,Le,xe,de.colorSpace),j=Ve(w);W&&He(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,j,Se,w.width,w.height):He(w)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,j,Se,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Se,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ze(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ie(w.depthTexture,0);const he=i.get(w.depthTexture).__webglTexture,ce=Ve(w);if(w.depthTexture.format===Si)He(w)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0);else if(w.depthTexture.format===lr)He(w)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function be(C){const w=i.get(C),W=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ze(w.__webglFramebuffer,C)}else if(W){w.__webglDepthbuffer=[];for(let he=0;he<6;he++)t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[he]),w.__webglDepthbuffer[he]=n.createRenderbuffer(),U(w.__webglDepthbuffer[he],C,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=n.createRenderbuffer(),U(w.__webglDepthbuffer,C,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(C,w,W){const he=i.get(C);w!==void 0&&oe(he.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&be(C)}function Ae(C){const w=C.texture,W=i.get(C),he=i.get(w);C.addEventListener("dispose",k),C.isWebGLMultipleRenderTargets!==!0&&(he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture()),he.__version=w.version,l.memory.textures++);const ce=C.isWebGLCubeRenderTarget===!0,de=C.isWebGLMultipleRenderTargets===!0,Le=E(C)||o;if(ce){W.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(o&&w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer[xe]=[];for(let Se=0;Se<w.mipmaps.length;Se++)W.__webglFramebuffer[xe][Se]=n.createFramebuffer()}else W.__webglFramebuffer[xe]=n.createFramebuffer()}else{if(o&&w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer=[];for(let xe=0;xe<w.mipmaps.length;xe++)W.__webglFramebuffer[xe]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(de)if(r.drawBuffers){const xe=C.texture;for(let Se=0,j=xe.length;Se<j;Se++){const me=i.get(xe[Se]);me.__webglTexture===void 0&&(me.__webglTexture=n.createTexture(),l.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&C.samples>0&&He(C)===!1){const xe=de?w:[w];W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Se=0;Se<xe.length;Se++){const j=xe[Se];W.__webglColorRenderbuffer[Se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[Se]);const me=a.convert(j.format,j.colorSpace),le=a.convert(j.type),We=N(j.internalFormat,me,le,j.colorSpace,C.isXRRenderTarget===!0),je=Ve(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,je,We,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,W.__webglColorRenderbuffer[Se])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),U(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,he.__webglTexture),ye(n.TEXTURE_CUBE_MAP,w,Le);for(let xe=0;xe<6;xe++)if(o&&w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)oe(W.__webglFramebuffer[xe][Se],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Se);else oe(W.__webglFramebuffer[xe],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);A(w,Le)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){const xe=C.texture;for(let Se=0,j=xe.length;Se<j;Se++){const me=xe[Se],le=i.get(me);t.bindTexture(n.TEXTURE_2D,le.__webglTexture),ye(n.TEXTURE_2D,me,Le),oe(W.__webglFramebuffer,C,me,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,0),A(me,Le)&&T(n.TEXTURE_2D)}t.unbindTexture()}else{let xe=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(o?xe=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(xe,he.__webglTexture),ye(xe,w,Le),o&&w.mipmaps&&w.mipmaps.length>0)for(let Se=0;Se<w.mipmaps.length;Se++)oe(W.__webglFramebuffer[Se],C,w,n.COLOR_ATTACHMENT0,xe,Se);else oe(W.__webglFramebuffer,C,w,n.COLOR_ATTACHMENT0,xe,0);A(w,Le)&&T(xe),t.unbindTexture()}C.depthBuffer&&be(C)}function Ce(C){const w=E(C)||o,W=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let he=0,ce=W.length;he<ce;he++){const de=W[he];if(A(de,w)){const Le=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,xe=i.get(de).__webglTexture;t.bindTexture(Le,xe),T(Le),t.unbindTexture()}}}function Ne(C){if(o&&C.samples>0&&He(C)===!1){const w=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],W=C.width,he=C.height;let ce=n.COLOR_BUFFER_BIT;const de=[],Le=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=i.get(C),Se=C.isWebGLMultipleRenderTargets===!0;if(Se)for(let j=0;j<w.length;j++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let j=0;j<w.length;j++){de.push(n.COLOR_ATTACHMENT0+j),C.depthBuffer&&de.push(Le);const me=xe.__ignoreDepthValues!==void 0?xe.__ignoreDepthValues:!1;if(me===!1&&(C.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),Se&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[j]),me===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Le]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Le])),Se){const le=i.get(w[j]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,W,he,0,0,W,he,ce,n.NEAREST),g&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Se)for(let j=0;j<w.length;j++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,xe.__webglColorRenderbuffer[j]);const me=i.get(w[j]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.TEXTURE_2D,me,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}}function Ve(C){return Math.min(f,C.samples)}function He(C){const w=i.get(C);return o&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ht(C){const w=l.render.frame;v.get(C)!==w&&(v.set(C,w),C.update())}function _t(C,w){const W=C.colorSpace,he=C.format,ce=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===qo||W!==Gn&&W!==hn&&(dt.getTransfer(W)===pt?o===!1?e.has("EXT_sRGB")===!0&&he===bn?(C.format=qo,C.minFilter=dn,C.generateMipmaps=!1):w=Fh.sRGBToLinear(w):(he!==bn||ce!==si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),w}this.allocateTextureUnit=ae,this.resetTextureUnits=K,this.setTexture2D=ie,this.setTexture2DArray=D,this.setTexture3D=L,this.setTextureCube=G,this.rebindTextures=ge,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=He}function Qw(n,e,t){const i=t.isWebGL2;function r(a,l=hn){let o;const c=dt.getTransfer(l);if(a===si)return n.UNSIGNED_BYTE;if(a===Nh)return n.UNSIGNED_SHORT_4_4_4_4;if(a===Ph)return n.UNSIGNED_SHORT_5_5_5_1;if(a===I_)return n.BYTE;if(a===U_)return n.SHORT;if(a===pl)return n.UNSIGNED_SHORT;if(a===Ch)return n.INT;if(a===Qn)return n.UNSIGNED_INT;if(a===ei)return n.FLOAT;if(a===zr)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(a===O_)return n.ALPHA;if(a===bn)return n.RGBA;if(a===F_)return n.LUMINANCE;if(a===k_)return n.LUMINANCE_ALPHA;if(a===Si)return n.DEPTH_COMPONENT;if(a===lr)return n.DEPTH_STENCIL;if(a===qo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(a===B_)return n.RED;if(a===Lh)return n.RED_INTEGER;if(a===z_)return n.RG;if(a===jh)return n.RG_INTEGER;if(a===Dh)return n.RGBA_INTEGER;if(a===Ha||a===Ga||a===Va||a===Wa)if(c===pt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(a===Ha)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===Ga)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===Va)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Wa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(a===Ha)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===Ga)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===Va)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Wa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Ac||a===Rc||a===Cc||a===Nc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(a===Ac)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Rc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Cc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Nc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===H_)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===Pc||a===Lc)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(a===Pc)return c===pt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(a===Lc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===jc||a===Dc||a===Ic||a===Uc||a===Oc||a===Fc||a===kc||a===Bc||a===zc||a===Hc||a===Gc||a===Vc||a===Wc||a===Xc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(a===jc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Dc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Ic)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Uc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Oc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Fc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===kc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Bc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===zc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===Hc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Gc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Vc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Wc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Xc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===Xa||a===qc||a===$c)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(a===Xa)return c===pt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===qc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===$c)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===G_||a===Yc||a===Kc||a===Zc)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(a===Xa)return o.COMPRESSED_RED_RGTC1_EXT;if(a===Yc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Kc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Zc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===bi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[a]!==void 0?n[a]:null}return{convert:r}}class e1 extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class jr extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const t1={type:"move"};class xo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,l=null;const o=this._targetRay,c=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){l=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),p=this._getHandJoint(d,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=d.joints["index-finger-tip"],f=d.joints["thumb-tip"],h=u.position.distanceTo(f.position),g=.02,v=.005;d.inputState.pinching&&h>g+v?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&h<=g-v&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(t1)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new jr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class n1 extends en{constructor(e,t,i,r,a,l,o,c,d,u){if(u=u!==void 0?u:Si,u!==Si&&u!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Si&&(i=Qn),i===void 0&&u===lr&&(i=bi),super(null,r,a,l,o,c,u,i,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Wt,this.minFilter=c!==void 0?c:Wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class i1 extends Ni{constructor(e,t){super();const i=this;let r=null,a=1,l=null,o="local-floor",c=1,d=null,u=null,f=null,h=null,g=null,v=null;const x=t.getContextAttributes();let m=null,p=null;const y=[],_=[],E=new Kt;E.layers.enable(1),E.viewport=new Dt;const S=new Kt;S.layers.enable(2),S.viewport=new Dt;const A=[E,S],T=new e1;T.layers.enable(1),T.layers.enable(2);let N=null,b=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let L=y[D];return L===void 0&&(L=new xo,y[D]=L),L.getTargetRaySpace()},this.getControllerGrip=function(D){let L=y[D];return L===void 0&&(L=new xo,y[D]=L),L.getGripSpace()},this.getHand=function(D){let L=y[D];return L===void 0&&(L=new xo,y[D]=L),L.getHandSpace()};function M(D){const L=_.indexOf(D.inputSource);if(L===-1)return;const G=y[L];G!==void 0&&(G.update(D.inputSource,D.frame,d||l),G.dispatchEvent({type:D.type,data:D.inputSource}))}function I(){r.removeEventListener("select",M),r.removeEventListener("selectstart",M),r.removeEventListener("selectend",M),r.removeEventListener("squeeze",M),r.removeEventListener("squeezestart",M),r.removeEventListener("squeezeend",M),r.removeEventListener("end",I),r.removeEventListener("inputsourceschange",k);for(let D=0;D<y.length;D++){const L=_[D];L!==null&&(_[D]=null,y[D].disconnect(L))}N=null,b=null,e.setRenderTarget(m),g=null,h=null,f=null,r=null,p=null,ie.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){a=D,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){o=D,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(D){d=D},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(D){if(r=D,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",M),r.addEventListener("selectstart",M),r.addEventListener("selectend",M),r.addEventListener("squeeze",M),r.addEventListener("squeezestart",M),r.addEventListener("squeezeend",M),r.addEventListener("end",I),r.addEventListener("inputsourceschange",k),x.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const L={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};g=new XRWebGLLayer(r,t,L),r.updateRenderState({baseLayer:g}),p=new Ai(g.framebufferWidth,g.framebufferHeight,{format:bn,type:si,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let L=null,G=null,B=null;x.depth&&(B=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,L=x.stencil?lr:Si,G=x.stencil?bi:Qn);const Q={colorFormat:t.RGBA8,depthFormat:B,scaleFactor:a};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(Q),r.updateRenderState({layers:[h]}),p=new Ai(h.textureWidth,h.textureHeight,{format:bn,type:si,depthTexture:new n1(h.textureWidth,h.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,L),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const O=e.properties.get(p);O.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),d=null,l=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function k(D){for(let L=0;L<D.removed.length;L++){const G=D.removed[L],B=_.indexOf(G);B>=0&&(_[B]=null,y[B].disconnect(G))}for(let L=0;L<D.added.length;L++){const G=D.added[L];let B=_.indexOf(G);if(B===-1){for(let O=0;O<y.length;O++)if(O>=_.length){_.push(G),B=O;break}else if(_[O]===null){_[O]=G,B=O;break}if(B===-1)break}const Q=y[B];Q&&Q.connect(G)}}const $=new q,P=new q;function z(D,L,G){$.setFromMatrixPosition(L.matrixWorld),P.setFromMatrixPosition(G.matrixWorld);const B=$.distanceTo(P),Q=L.projectionMatrix.elements,O=G.projectionMatrix.elements,ye=Q[14]/(Q[10]-1),Y=Q[14]/(Q[10]+1),we=(Q[9]+1)/Q[5],Me=(Q[9]-1)/Q[5],oe=(Q[8]-1)/Q[0],U=(O[8]+1)/O[0],Ze=ye*oe,be=ye*U,ge=B/(-oe+U),Ae=ge*-oe;L.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Ae),D.translateZ(ge),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const Ce=ye+ge,Ne=Y+ge,Ve=Ze-Ae,He=be+(B-Ae),ht=we*Y/Ne*Ce,_t=Me*Y/Ne*Ce;D.projectionMatrix.makePerspective(Ve,He,ht,_t,Ce,Ne),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function J(D,L){L===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(L.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(r===null)return;T.near=S.near=E.near=D.near,T.far=S.far=E.far=D.far,(N!==T.near||b!==T.far)&&(r.updateRenderState({depthNear:T.near,depthFar:T.far}),N=T.near,b=T.far);const L=D.parent,G=T.cameras;J(T,L);for(let B=0;B<G.length;B++)J(G[B],L);G.length===2?z(T,E,S):T.projectionMatrix.copy(E.projectionMatrix),K(D,T,L)};function K(D,L,G){G===null?D.matrix.copy(L.matrixWorld):(D.matrix.copy(G.matrixWorld),D.matrix.invert(),D.matrix.multiply(L.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(L.projectionMatrix),D.projectionMatrixInverse.copy(L.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=sa*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(h===null&&g===null))return c},this.setFoveation=function(D){c=D,h!==null&&(h.fixedFoveation=D),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=D)};let ae=null;function ee(D,L){if(u=L.getViewerPose(d||l),v=L,u!==null){const G=u.views;g!==null&&(e.setRenderTargetFramebuffer(p,g.framebuffer),e.setRenderTarget(p));let B=!1;G.length!==T.cameras.length&&(T.cameras.length=0,B=!0);for(let Q=0;Q<G.length;Q++){const O=G[Q];let ye=null;if(g!==null)ye=g.getViewport(O);else{const we=f.getViewSubImage(h,O);ye=we.viewport,Q===0&&(e.setRenderTargetTextures(p,we.colorTexture,h.ignoreDepthValues?void 0:we.depthStencilTexture),e.setRenderTarget(p))}let Y=A[Q];Y===void 0&&(Y=new Kt,Y.layers.enable(Q),Y.viewport=new Dt,A[Q]=Y),Y.matrix.fromArray(O.transform.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.projectionMatrix.fromArray(O.projectionMatrix),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert(),Y.viewport.set(ye.x,ye.y,ye.width,ye.height),Q===0&&(T.matrix.copy(Y.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),B===!0&&T.cameras.push(Y)}}for(let G=0;G<y.length;G++){const B=_[G],Q=y[G];B!==null&&Q!==void 0&&Q.update(B,L,d||l)}ae&&ae(D,L),L.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:L}),v=null}const ie=new $h;ie.setAnimationLoop(ee),this.setAnimationLoop=function(D){ae=D},this.dispose=function(){}}}function r1(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Wh(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,_,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),f(m,p)):p.isMeshPhongMaterial?(a(m,p),u(m,p)):p.isMeshStandardMaterial?(a(m,p),h(m,p),p.isMeshPhysicalMaterial&&g(m,p,E)):p.isMeshMatcapMaterial?(a(m,p),v(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),x(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(l(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,y,_):p.isSpriteMaterial?d(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const _=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function g(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function s1(n,e,t,i){let r={},a={},l=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,_){const E=_.program;i.uniformBlockBinding(y,E)}function d(y,_){let E=r[y.id];E===void 0&&(v(y),E=u(y),r[y.id]=E,y.addEventListener("dispose",m));const S=_.program;i.updateUBOMapping(y,S);const A=e.render.frame;a[y.id]!==A&&(h(y),a[y.id]=A)}function u(y){const _=f();y.__bindingPointIndex=_;const E=n.createBuffer(),S=y.__size,A=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,S,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,E),E}function f(){for(let y=0;y<o;y++)if(l.indexOf(y)===-1)return l.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const _=r[y.id],E=y.uniforms,S=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let A=0,T=E.length;A<T;A++){const N=E[A];if(g(N,A,S)===!0){const b=N.__offset,M=Array.isArray(N.value)?N.value:[N.value];let I=0;for(let k=0;k<M.length;k++){const $=M[k],P=x($);typeof $=="number"?(N.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,b+I,N.__data)):$.isMatrix3?(N.__data[0]=$.elements[0],N.__data[1]=$.elements[1],N.__data[2]=$.elements[2],N.__data[3]=$.elements[0],N.__data[4]=$.elements[3],N.__data[5]=$.elements[4],N.__data[6]=$.elements[5],N.__data[7]=$.elements[0],N.__data[8]=$.elements[6],N.__data[9]=$.elements[7],N.__data[10]=$.elements[8],N.__data[11]=$.elements[0]):($.toArray(N.__data,I),I+=P.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,b,N.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(y,_,E){const S=y.value;if(E[_]===void 0){if(typeof S=="number")E[_]=S;else{const A=Array.isArray(S)?S:[S],T=[];for(let N=0;N<A.length;N++)T.push(A[N].clone());E[_]=T}return!0}else if(typeof S=="number"){if(E[_]!==S)return E[_]=S,!0}else{const A=Array.isArray(E[_])?E[_]:[E[_]],T=Array.isArray(S)?S:[S];for(let N=0;N<A.length;N++){const b=A[N];if(b.equals(T[N])===!1)return b.copy(T[N]),!0}}return!1}function v(y){const _=y.uniforms;let E=0;const S=16;let A=0;for(let T=0,N=_.length;T<N;T++){const b=_[T],M={boundary:0,storage:0},I=Array.isArray(b.value)?b.value:[b.value];for(let k=0,$=I.length;k<$;k++){const P=I[k],z=x(P);M.boundary+=z.boundary,M.storage+=z.storage}if(b.__data=new Float32Array(M.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=E,T>0){A=E%S;const k=S-A;A!==0&&k-M.boundary<0&&(E+=S-A,b.__offset=E)}E+=M.storage}return A=E%S,A>0&&(E+=S-A),y.__size=E,y.__cache={},this}function x(y){const _={boundary:0,storage:0};return typeof y=="number"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){const _=y.target;_.removeEventListener("dispose",m);const E=l.indexOf(_.__bindingPointIndex);l.splice(E,1),n.deleteBuffer(r[_.id]),delete r[_.id],delete a[_.id]}function p(){for(const y in r)n.deleteBuffer(r[y]);l=[],r={},a={}}return{bind:c,update:d,dispose:p}}class yl{constructor(e={}){const{canvas:t=iv(),context:i=null,depth:r=!0,stencil:a=!0,alpha:l=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:d=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=l;const g=new Uint32Array(4),v=new Int32Array(4);let x=null,m=null;const p=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ot,this._useLegacyLights=!1,this.toneMapping=ri,this.toneMappingExposure=1;const _=this;let E=!1,S=0,A=0,T=null,N=-1,b=null;const M=new Dt,I=new Dt;let k=null;const $=new ot(0);let P=0,z=t.width,J=t.height,K=1,ae=null,ee=null;const ie=new Dt(0,0,z,J),D=new Dt(0,0,z,J);let L=!1;const G=new _l;let B=!1,Q=!1,O=null;const ye=new yt,Y=new $e,we=new q,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function oe(){return T===null?K:1}let U=i;function Ze(R,X){for(let Z=0;Z<R.length;Z++){const te=R[Z],ne=t.getContext(te,X);if(ne!==null)return ne}return null}try{const R={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:d,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${fl}`),t.addEventListener("webglcontextlost",it,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",_e,!1),U===null){const X=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&X.shift(),U=Ze(X,R),U===null)throw Ze(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let be,ge,Ae,Ce,Ne,Ve,He,ht,_t,C,w,W,he,ce,de,Le,xe,Se,j,me,le,We,je,Be;function Pe(){be=new mS(U),ge=new cS(U,be,e),be.init(ge),We=new Qw(U,be,ge),Ae=new Zw(U,be,ge),Ce=new _S(U),Ne=new Ow,Ve=new Jw(U,be,Ae,Ne,ge,We,Ce),He=new uS(_),ht=new pS(_),_t=new Rv(U,ge),je=new oS(U,be,_t,ge),C=new gS(U,_t,Ce,je),w=new SS(U,C,_t,Ce),j=new bS(U,ge,Ve),Le=new dS(Ne),W=new Uw(_,He,ht,be,ge,je,Le),he=new r1(_,Ne),ce=new kw,de=new Ww(be,ge),Se=new aS(_,He,ht,Ae,w,h,c),xe=new Kw(_,w,ge),Be=new s1(U,Ce,ge,Ae),me=new lS(U,be,Ce,ge),le=new xS(U,be,Ce,ge),Ce.programs=W.programs,_.capabilities=ge,_.extensions=be,_.properties=Ne,_.renderLists=ce,_.shadowMap=xe,_.state=Ae,_.info=Ce}Pe();const Te=new i1(_,U);this.xr=Te,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=be.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=be.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(R){R!==void 0&&(K=R,this.setSize(z,J,!1))},this.getSize=function(R){return R.set(z,J)},this.setSize=function(R,X,Z=!0){if(Te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=R,J=X,t.width=Math.floor(R*K),t.height=Math.floor(X*K),Z===!0&&(t.style.width=R+"px",t.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(z*K,J*K).floor()},this.setDrawingBufferSize=function(R,X,Z){z=R,J=X,K=Z,t.width=Math.floor(R*Z),t.height=Math.floor(X*Z),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(M)},this.getViewport=function(R){return R.copy(ie)},this.setViewport=function(R,X,Z,te){R.isVector4?ie.set(R.x,R.y,R.z,R.w):ie.set(R,X,Z,te),Ae.viewport(M.copy(ie).multiplyScalar(K).floor())},this.getScissor=function(R){return R.copy(D)},this.setScissor=function(R,X,Z,te){R.isVector4?D.set(R.x,R.y,R.z,R.w):D.set(R,X,Z,te),Ae.scissor(I.copy(D).multiplyScalar(K).floor())},this.getScissorTest=function(){return L},this.setScissorTest=function(R){Ae.setScissorTest(L=R)},this.setOpaqueSort=function(R){ae=R},this.setTransparentSort=function(R){ee=R},this.getClearColor=function(R){return R.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor.apply(Se,arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha.apply(Se,arguments)},this.clear=function(R=!0,X=!0,Z=!0){let te=0;if(R){let ne=!1;if(T!==null){const Ee=T.texture.format;ne=Ee===Dh||Ee===jh||Ee===Lh}if(ne){const Ee=T.texture.type,De=Ee===si||Ee===Qn||Ee===pl||Ee===bi||Ee===Nh||Ee===Ph,Xe=Se.getClearColor(),qe=Se.getClearAlpha(),tt=Xe.r,Ye=Xe.g,Je=Xe.b;De?(g[0]=tt,g[1]=Ye,g[2]=Je,g[3]=qe,U.clearBufferuiv(U.COLOR,0,g)):(v[0]=tt,v[1]=Ye,v[2]=Je,v[3]=qe,U.clearBufferiv(U.COLOR,0,v))}else te|=U.COLOR_BUFFER_BIT}X&&(te|=U.DEPTH_BUFFER_BIT),Z&&(te|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ce.dispose(),de.dispose(),Ne.dispose(),He.dispose(),ht.dispose(),w.dispose(),je.dispose(),Be.dispose(),W.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",an),Te.removeEventListener("sessionend",ut),O&&(O.dispose(),O=null),Ht.stop()};function it(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const R=Ce.autoReset,X=xe.enabled,Z=xe.autoUpdate,te=xe.needsUpdate,ne=xe.type;Pe(),Ce.autoReset=R,xe.enabled=X,xe.autoUpdate=Z,xe.needsUpdate=te,xe.type=ne}function _e(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){const X=R.target;X.removeEventListener("dispose",ue),se(X)}function se(R){pe(R),Ne.remove(R)}function pe(R){const X=Ne.get(R).programs;X!==void 0&&(X.forEach(function(Z){W.releaseProgram(Z)}),R.isShaderMaterial&&W.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,Z,te,ne,Ee){X===null&&(X=Me);const De=ne.isMesh&&ne.matrixWorld.determinant()<0,Xe=pf(R,X,Z,te,ne);Ae.setMaterial(te,De);let qe=Z.index,tt=1;if(te.wireframe===!0){if(qe=C.getWireframeAttribute(Z),qe===void 0)return;tt=2}const Ye=Z.drawRange,Je=Z.attributes.position;let wt=Ye.start*tt,tn=(Ye.start+Ye.count)*tt;Ee!==null&&(wt=Math.max(wt,Ee.start*tt),tn=Math.min(tn,(Ee.start+Ee.count)*tt)),qe!==null?(wt=Math.max(wt,0),tn=Math.min(tn,qe.count)):Je!=null&&(wt=Math.max(wt,0),tn=Math.min(tn,Je.count));const Lt=tn-wt;if(Lt<0||Lt===1/0)return;je.setup(ne,te,Xe,Z,qe);let Ln,bt=me;if(qe!==null&&(Ln=_t.get(qe),bt=le,bt.setIndex(Ln)),ne.isMesh)te.wireframe===!0?(Ae.setLineWidth(te.wireframeLinewidth*oe()),bt.setMode(U.LINES)):bt.setMode(U.TRIANGLES);else if(ne.isLine){let st=te.linewidth;st===void 0&&(st=1),Ae.setLineWidth(st*oe()),ne.isLineSegments?bt.setMode(U.LINES):ne.isLineLoop?bt.setMode(U.LINE_LOOP):bt.setMode(U.LINE_STRIP)}else ne.isPoints?bt.setMode(U.POINTS):ne.isSprite&&bt.setMode(U.TRIANGLES);if(ne.isInstancedMesh)bt.renderInstances(wt,Lt,ne.count);else if(Z.isInstancedBufferGeometry){const st=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Sa=Math.min(Z.instanceCount,st);bt.renderInstances(wt,Lt,Sa)}else bt.render(wt,Lt)};function Ie(R,X,Z){R.transparent===!0&&R.side===An&&R.forceSinglePass===!1?(R.side=Qt,R.needsUpdate=!0,Jr(R,X,Z),R.side=ai,R.needsUpdate=!0,Jr(R,X,Z),R.side=An):Jr(R,X,Z)}this.compile=function(R,X,Z=null){Z===null&&(Z=R),m=de.get(Z),m.init(),y.push(m),Z.traverseVisible(function(ne){ne.isLight&&ne.layers.test(X.layers)&&(m.pushLight(ne),ne.castShadow&&m.pushShadow(ne))}),R!==Z&&R.traverseVisible(function(ne){ne.isLight&&ne.layers.test(X.layers)&&(m.pushLight(ne),ne.castShadow&&m.pushShadow(ne))}),m.setupLights(_._useLegacyLights);const te=new Set;return R.traverse(function(ne){const Ee=ne.material;if(Ee)if(Array.isArray(Ee))for(let De=0;De<Ee.length;De++){const Xe=Ee[De];Ie(Xe,Z,ne),te.add(Xe)}else Ie(Ee,Z,ne),te.add(Ee)}),y.pop(),m=null,te},this.compileAsync=function(R,X,Z=null){const te=this.compile(R,X,Z);return new Promise(ne=>{function Ee(){if(te.forEach(function(De){Ne.get(De).currentProgram.isReady()&&te.delete(De)}),te.size===0){ne(R);return}setTimeout(Ee,10)}be.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let rt=null;function Mt(R){rt&&rt(R)}function an(){Ht.stop()}function ut(){Ht.start()}const Ht=new $h;Ht.setAnimationLoop(Mt),typeof self<"u"&&Ht.setContext(self),this.setAnimationLoop=function(R){rt=R,Te.setAnimationLoop(R),R===null?Ht.stop():Ht.start()},Te.addEventListener("sessionstart",an),Te.addEventListener("sessionend",ut),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(X),X=Te.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,X,T),m=de.get(R,y.length),m.init(),y.push(m),ye.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),G.setFromProjectionMatrix(ye),Q=this.localClippingEnabled,B=Le.init(this.clippingPlanes,Q),x=ce.get(R,p.length),x.init(),p.push(x),Mn(R,X,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(ae,ee),this.info.render.frame++,B===!0&&Le.beginShadows();const Z=m.state.shadowsArray;if(xe.render(Z,R,X),B===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset(),Se.render(x,R),m.setupLights(_._useLegacyLights),X.isArrayCamera){const te=X.cameras;for(let ne=0,Ee=te.length;ne<Ee;ne++){const De=te[ne];wl(x,R,De,De.viewport)}}else wl(x,R,X);T!==null&&(Ve.updateMultisampleRenderTarget(T),Ve.updateRenderTargetMipmap(T)),R.isScene===!0&&R.onAfterRender(_,R,X),je.resetDefaultState(),N=-1,b=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function Mn(R,X,Z,te){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)Z=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||G.intersectsSprite(R)){te&&we.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ye);const De=w.update(R),Xe=R.material;Xe.visible&&x.push(R,De,Xe,Z,we.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||G.intersectsObject(R))){const De=w.update(R),Xe=R.material;if(te&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),we.copy(R.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),we.copy(De.boundingSphere.center)),we.applyMatrix4(R.matrixWorld).applyMatrix4(ye)),Array.isArray(Xe)){const qe=De.groups;for(let tt=0,Ye=qe.length;tt<Ye;tt++){const Je=qe[tt],wt=Xe[Je.materialIndex];wt&&wt.visible&&x.push(R,De,wt,Z,we.z,Je)}}else Xe.visible&&x.push(R,De,Xe,Z,we.z,null)}}const Ee=R.children;for(let De=0,Xe=Ee.length;De<Xe;De++)Mn(Ee[De],X,Z,te)}function wl(R,X,Z,te){const ne=R.opaque,Ee=R.transmissive,De=R.transparent;m.setupLightsView(Z),B===!0&&Le.setGlobalState(_.clippingPlanes,Z),Ee.length>0&&ff(ne,Ee,X,Z),te&&Ae.viewport(M.copy(te)),ne.length>0&&Zr(ne,X,Z),Ee.length>0&&Zr(Ee,X,Z),De.length>0&&Zr(De,X,Z),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function ff(R,X,Z,te){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;const Ee=ge.isWebGL2;O===null&&(O=new Ai(1,1,{generateMipmaps:!0,type:be.has("EXT_color_buffer_half_float")?zr:si,minFilter:Br,samples:Ee?4:0})),_.getDrawingBufferSize(Y),Ee?O.setSize(Y.x,Y.y):O.setSize($o(Y.x),$o(Y.y));const De=_.getRenderTarget();_.setRenderTarget(O),_.getClearColor($),P=_.getClearAlpha(),P<1&&_.setClearColor(16777215,.5),_.clear();const Xe=_.toneMapping;_.toneMapping=ri,Zr(R,Z,te),Ve.updateMultisampleRenderTarget(O),Ve.updateRenderTargetMipmap(O);let qe=!1;for(let tt=0,Ye=X.length;tt<Ye;tt++){const Je=X[tt],wt=Je.object,tn=Je.geometry,Lt=Je.material,Ln=Je.group;if(Lt.side===An&&wt.layers.test(te.layers)){const bt=Lt.side;Lt.side=Qt,Lt.needsUpdate=!0,El(wt,Z,te,tn,Lt,Ln),Lt.side=bt,Lt.needsUpdate=!0,qe=!0}}qe===!0&&(Ve.updateMultisampleRenderTarget(O),Ve.updateRenderTargetMipmap(O)),_.setRenderTarget(De),_.setClearColor($,P),_.toneMapping=Xe}function Zr(R,X,Z){const te=X.isScene===!0?X.overrideMaterial:null;for(let ne=0,Ee=R.length;ne<Ee;ne++){const De=R[ne],Xe=De.object,qe=De.geometry,tt=te===null?De.material:te,Ye=De.group;Xe.layers.test(Z.layers)&&El(Xe,X,Z,qe,tt,Ye)}}function El(R,X,Z,te,ne,Ee){R.onBeforeRender(_,X,Z,te,ne,Ee),R.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(_,X,Z,te,R,Ee),ne.transparent===!0&&ne.side===An&&ne.forceSinglePass===!1?(ne.side=Qt,ne.needsUpdate=!0,_.renderBufferDirect(Z,X,te,ne,R,Ee),ne.side=ai,ne.needsUpdate=!0,_.renderBufferDirect(Z,X,te,ne,R,Ee),ne.side=An):_.renderBufferDirect(Z,X,te,ne,R,Ee),R.onAfterRender(_,X,Z,te,ne,Ee)}function Jr(R,X,Z){X.isScene!==!0&&(X=Me);const te=Ne.get(R),ne=m.state.lights,Ee=m.state.shadowsArray,De=ne.state.version,Xe=W.getParameters(R,ne.state,Ee,X,Z),qe=W.getProgramCacheKey(Xe);let tt=te.programs;te.environment=R.isMeshStandardMaterial?X.environment:null,te.fog=X.fog,te.envMap=(R.isMeshStandardMaterial?ht:He).get(R.envMap||te.environment),tt===void 0&&(R.addEventListener("dispose",ue),tt=new Map,te.programs=tt);let Ye=tt.get(qe);if(Ye!==void 0){if(te.currentProgram===Ye&&te.lightsStateVersion===De)return Tl(R,Xe),Ye}else Xe.uniforms=W.getUniforms(R),R.onBuild(Z,Xe,_),R.onBeforeCompile(Xe,_),Ye=W.acquireProgram(Xe,qe),tt.set(qe,Ye),te.uniforms=Xe.uniforms;const Je=te.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Je.clippingPlanes=Le.uniform),Tl(R,Xe),te.needsLights=gf(R),te.lightsStateVersion=De,te.needsLights&&(Je.ambientLightColor.value=ne.state.ambient,Je.lightProbe.value=ne.state.probe,Je.directionalLights.value=ne.state.directional,Je.directionalLightShadows.value=ne.state.directionalShadow,Je.spotLights.value=ne.state.spot,Je.spotLightShadows.value=ne.state.spotShadow,Je.rectAreaLights.value=ne.state.rectArea,Je.ltc_1.value=ne.state.rectAreaLTC1,Je.ltc_2.value=ne.state.rectAreaLTC2,Je.pointLights.value=ne.state.point,Je.pointLightShadows.value=ne.state.pointShadow,Je.hemisphereLights.value=ne.state.hemi,Je.directionalShadowMap.value=ne.state.directionalShadowMap,Je.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,Je.spotShadowMap.value=ne.state.spotShadowMap,Je.spotLightMatrix.value=ne.state.spotLightMatrix,Je.spotLightMap.value=ne.state.spotLightMap,Je.pointShadowMap.value=ne.state.pointShadowMap,Je.pointShadowMatrix.value=ne.state.pointShadowMatrix),te.currentProgram=Ye,te.uniformsList=null,Ye}function Ml(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=qs.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function Tl(R,X){const Z=Ne.get(R);Z.outputColorSpace=X.outputColorSpace,Z.instancing=X.instancing,Z.instancingColor=X.instancingColor,Z.skinning=X.skinning,Z.morphTargets=X.morphTargets,Z.morphNormals=X.morphNormals,Z.morphColors=X.morphColors,Z.morphTargetsCount=X.morphTargetsCount,Z.numClippingPlanes=X.numClippingPlanes,Z.numIntersection=X.numClipIntersection,Z.vertexAlphas=X.vertexAlphas,Z.vertexTangents=X.vertexTangents,Z.toneMapping=X.toneMapping}function pf(R,X,Z,te,ne){X.isScene!==!0&&(X=Me),Ve.resetTextureUnits();const Ee=X.fog,De=te.isMeshStandardMaterial?X.environment:null,Xe=T===null?_.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Gn,qe=(te.isMeshStandardMaterial?ht:He).get(te.envMap||De),tt=te.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ye=!!Z.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Je=!!Z.morphAttributes.position,wt=!!Z.morphAttributes.normal,tn=!!Z.morphAttributes.color;let Lt=ri;te.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Lt=_.toneMapping);const Ln=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,bt=Ln!==void 0?Ln.length:0,st=Ne.get(te),Sa=m.state.lights;if(B===!0&&(Q===!0||R!==b)){const nn=R===b&&te.id===N;Le.setState(te,R,nn)}let Tt=!1;te.version===st.__version?(st.needsLights&&st.lightsStateVersion!==Sa.state.version||st.outputColorSpace!==Xe||ne.isInstancedMesh&&st.instancing===!1||!ne.isInstancedMesh&&st.instancing===!0||ne.isSkinnedMesh&&st.skinning===!1||!ne.isSkinnedMesh&&st.skinning===!0||ne.isInstancedMesh&&st.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&st.instancingColor===!1&&ne.instanceColor!==null||st.envMap!==qe||te.fog===!0&&st.fog!==Ee||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==Le.numPlanes||st.numIntersection!==Le.numIntersection)||st.vertexAlphas!==tt||st.vertexTangents!==Ye||st.morphTargets!==Je||st.morphNormals!==wt||st.morphColors!==tn||st.toneMapping!==Lt||ge.isWebGL2===!0&&st.morphTargetsCount!==bt)&&(Tt=!0):(Tt=!0,st.__version=te.version);let li=st.currentProgram;Tt===!0&&(li=Jr(te,X,ne));let Al=!1,mr=!1,wa=!1;const Gt=li.getUniforms(),ci=st.uniforms;if(Ae.useProgram(li.program)&&(Al=!0,mr=!0,wa=!0),te.id!==N&&(N=te.id,mr=!0),Al||b!==R){Gt.setValue(U,"projectionMatrix",R.projectionMatrix),Gt.setValue(U,"viewMatrix",R.matrixWorldInverse);const nn=Gt.map.cameraPosition;nn!==void 0&&nn.setValue(U,we.setFromMatrixPosition(R.matrixWorld)),ge.logarithmicDepthBuffer&&Gt.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Gt.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,mr=!0,wa=!0)}if(ne.isSkinnedMesh){Gt.setOptional(U,ne,"bindMatrix"),Gt.setOptional(U,ne,"bindMatrixInverse");const nn=ne.skeleton;nn&&(ge.floatVertexTextures?(nn.boneTexture===null&&nn.computeBoneTexture(),Gt.setValue(U,"boneTexture",nn.boneTexture,Ve),Gt.setValue(U,"boneTextureSize",nn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Ea=Z.morphAttributes;if((Ea.position!==void 0||Ea.normal!==void 0||Ea.color!==void 0&&ge.isWebGL2===!0)&&j.update(ne,Z,li),(mr||st.receiveShadow!==ne.receiveShadow)&&(st.receiveShadow=ne.receiveShadow,Gt.setValue(U,"receiveShadow",ne.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(ci.envMap.value=qe,ci.flipEnvMap.value=qe.isCubeTexture&&qe.isRenderTargetTexture===!1?-1:1),mr&&(Gt.setValue(U,"toneMappingExposure",_.toneMappingExposure),st.needsLights&&mf(ci,wa),Ee&&te.fog===!0&&he.refreshFogUniforms(ci,Ee),he.refreshMaterialUniforms(ci,te,K,J,O),qs.upload(U,Ml(st),ci,Ve)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(qs.upload(U,Ml(st),ci,Ve),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Gt.setValue(U,"center",ne.center),Gt.setValue(U,"modelViewMatrix",ne.modelViewMatrix),Gt.setValue(U,"normalMatrix",ne.normalMatrix),Gt.setValue(U,"modelMatrix",ne.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const nn=te.uniformsGroups;for(let Ma=0,xf=nn.length;Ma<xf;Ma++)if(ge.isWebGL2){const Rl=nn[Ma];Be.update(Rl,li),Be.bind(Rl,li)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return li}function mf(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function gf(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(R,X,Z){Ne.get(R.texture).__webglTexture=X,Ne.get(R.depthTexture).__webglTexture=Z;const te=Ne.get(R);te.__hasExternalTextures=!0,te.__hasExternalTextures&&(te.__autoAllocateDepthBuffer=Z===void 0,te.__autoAllocateDepthBuffer||be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,X){const Z=Ne.get(R);Z.__webglFramebuffer=X,Z.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,Z=0){T=R,S=X,A=Z;let te=!0,ne=null,Ee=!1,De=!1;if(R){const qe=Ne.get(R);qe.__useDefaultFramebuffer!==void 0?(Ae.bindFramebuffer(U.FRAMEBUFFER,null),te=!1):qe.__webglFramebuffer===void 0?Ve.setupRenderTarget(R):qe.__hasExternalTextures&&Ve.rebindTextures(R,Ne.get(R.texture).__webglTexture,Ne.get(R.depthTexture).__webglTexture);const tt=R.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(De=!0);const Ye=Ne.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ye[X])?ne=Ye[X][Z]:ne=Ye[X],Ee=!0):ge.isWebGL2&&R.samples>0&&Ve.useMultisampledRTT(R)===!1?ne=Ne.get(R).__webglMultisampledFramebuffer:Array.isArray(Ye)?ne=Ye[Z]:ne=Ye,M.copy(R.viewport),I.copy(R.scissor),k=R.scissorTest}else M.copy(ie).multiplyScalar(K).floor(),I.copy(D).multiplyScalar(K).floor(),k=L;if(Ae.bindFramebuffer(U.FRAMEBUFFER,ne)&&ge.drawBuffers&&te&&Ae.drawBuffers(R,ne),Ae.viewport(M),Ae.scissor(I),Ae.setScissorTest(k),Ee){const qe=Ne.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+X,qe.__webglTexture,Z)}else if(De){const qe=Ne.get(R.texture),tt=X||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,qe.__webglTexture,Z||0,tt)}N=-1},this.readRenderTargetPixels=function(R,X,Z,te,ne,Ee,De){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(Xe=Xe[De]),Xe){Ae.bindFramebuffer(U.FRAMEBUFFER,Xe);try{const qe=R.texture,tt=qe.format,Ye=qe.type;if(tt!==bn&&We.convert(tt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Je=Ye===zr&&(be.has("EXT_color_buffer_half_float")||ge.isWebGL2&&be.has("EXT_color_buffer_float"));if(Ye!==si&&We.convert(Ye)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ye===ei&&(ge.isWebGL2||be.has("OES_texture_float")||be.has("WEBGL_color_buffer_float")))&&!Je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-te&&Z>=0&&Z<=R.height-ne&&U.readPixels(X,Z,te,ne,We.convert(tt),We.convert(Ye),Ee)}finally{const qe=T!==null?Ne.get(T).__webglFramebuffer:null;Ae.bindFramebuffer(U.FRAMEBUFFER,qe)}}},this.copyFramebufferToTexture=function(R,X,Z=0){const te=Math.pow(2,-Z),ne=Math.floor(X.image.width*te),Ee=Math.floor(X.image.height*te);Ve.setTexture2D(X,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,R.x,R.y,ne,Ee),Ae.unbindTexture()},this.copyTextureToTexture=function(R,X,Z,te=0){const ne=X.image.width,Ee=X.image.height,De=We.convert(Z.format),Xe=We.convert(Z.type);Ve.setTexture2D(Z,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,Z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,Z.unpackAlignment),X.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,te,R.x,R.y,ne,Ee,De,Xe,X.image.data):X.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,te,R.x,R.y,X.mipmaps[0].width,X.mipmaps[0].height,De,X.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,te,R.x,R.y,De,Xe,X.image),te===0&&Z.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),Ae.unbindTexture()},this.copyTextureToTexture3D=function(R,X,Z,te,ne=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ee=R.max.x-R.min.x+1,De=R.max.y-R.min.y+1,Xe=R.max.z-R.min.z+1,qe=We.convert(te.format),tt=We.convert(te.type);let Ye;if(te.isData3DTexture)Ve.setTexture3D(te,0),Ye=U.TEXTURE_3D;else if(te.isDataArrayTexture)Ve.setTexture2DArray(te,0),Ye=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,te.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,te.unpackAlignment);const Je=U.getParameter(U.UNPACK_ROW_LENGTH),wt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),tn=U.getParameter(U.UNPACK_SKIP_PIXELS),Lt=U.getParameter(U.UNPACK_SKIP_ROWS),Ln=U.getParameter(U.UNPACK_SKIP_IMAGES),bt=Z.isCompressedTexture?Z.mipmaps[0]:Z.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,bt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,bt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,R.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,R.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,R.min.z),Z.isDataTexture||Z.isData3DTexture?U.texSubImage3D(Ye,ne,X.x,X.y,X.z,Ee,De,Xe,qe,tt,bt.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ye,ne,X.x,X.y,X.z,Ee,De,Xe,qe,bt.data)):U.texSubImage3D(Ye,ne,X.x,X.y,X.z,Ee,De,Xe,qe,tt,bt),U.pixelStorei(U.UNPACK_ROW_LENGTH,Je),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,wt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,tn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Lt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ln),ne===0&&te.generateMipmaps&&U.generateMipmap(Ye),Ae.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?Ve.setTextureCube(R,0):R.isData3DTexture?Ve.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ve.setTexture2DArray(R,0):Ve.setTexture2D(R,0),Ae.unbindTexture()},this.resetState=function(){S=0,A=0,T=null,Ae.reset(),je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ml?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===va?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ot?wi:Ih}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===wi?Ot:Gn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class a1 extends yl{}a1.prototype.isWebGL1Renderer=!0;class bl{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ot(e),this.near=t,this.far=i}clone(){return new bl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ef extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Bd extends wn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zi=new yt,zd=new yt,Cs=[],Hd=new Pi,o1=new yt,Ar=new gt,Rr=new Yr;class l1 extends gt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bd(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,o1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Hd.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(Hd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Rr.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Rr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Ar.geometry=this.geometry,Ar.material=this.material,Ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rr.copy(this.boundingSphere),Rr.applyMatrix4(i),e.ray.intersectsSphere(Rr)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,Zi),zd.multiplyMatrices(i,Zi),Ar.matrixWorld=zd,Ar.raycast(e,Cs);for(let l=0,o=Cs.length;l<o;l++){const c=Cs[l];c.instanceId=a,c.object=this,t.push(c)}Cs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Bd(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class c1 extends en{constructor(e,t,i,r,a,l,o,c,d){super(e,t,i,r,a,l,o,c,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ba extends oi{constructor(e=1,t=1,i=1,r=32,a=1,l=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:a,openEnded:l,thetaStart:o,thetaLength:c};const d=this;r=Math.floor(r),a=Math.floor(a);const u=[],f=[],h=[],g=[];let v=0;const x=[],m=i/2;let p=0;y(),l===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Nn(f,3)),this.setAttribute("normal",new Nn(h,3)),this.setAttribute("uv",new Nn(g,2));function y(){const E=new q,S=new q;let A=0;const T=(t-e)/i;for(let N=0;N<=a;N++){const b=[],M=N/a,I=M*(t-e)+e;for(let k=0;k<=r;k++){const $=k/r,P=$*c+o,z=Math.sin(P),J=Math.cos(P);S.x=I*z,S.y=-M*i+m,S.z=I*J,f.push(S.x,S.y,S.z),E.set(z,T,J).normalize(),h.push(E.x,E.y,E.z),g.push($,1-M),b.push(v++)}x.push(b)}for(let N=0;N<r;N++)for(let b=0;b<a;b++){const M=x[b][N],I=x[b+1][N],k=x[b+1][N+1],$=x[b][N+1];u.push(M,I,$),u.push(I,k,$),A+=6}d.addGroup(p,A,0),p+=A}function _(E){const S=v,A=new $e,T=new q;let N=0;const b=E===!0?e:t,M=E===!0?1:-1;for(let k=1;k<=r;k++)f.push(0,m*M,0),h.push(0,M,0),g.push(.5,.5),v++;const I=v;for(let k=0;k<=r;k++){const P=k/r*c+o,z=Math.cos(P),J=Math.sin(P);T.x=b*J,T.y=m*M,T.z=b*z,f.push(T.x,T.y,T.z),h.push(0,M,0),A.x=z*.5+.5,A.y=J*.5*M+.5,g.push(A.x,A.y),v++}for(let k=0;k<r;k++){const $=S+k,P=I+k;E===!0?u.push(P,P+1,$):u.push(P+1,P,$),N+=3}d.addGroup(p,N,E===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ba(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class un extends Kr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uh,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sl extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const _o=new yt,Gd=new q,Vd=new q;class tf{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _l,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Gd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gd),Vd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vd),t.updateMatrixWorld(),_o.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_o),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_o)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class d1 extends tf{constructor(){super(new Kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=sa*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(i!==t.fov||r!==t.aspect||a!==t.far)&&(t.fov=i,t.aspect=r,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class nf extends Sl{constructor(e,t,i=0,r=Math.PI/3,a=0,l=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.distance=i,this.angle=r,this.penumbra=a,this.decay=l,this.map=null,this.shadow=new d1}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class u1 extends tf{constructor(){super(new Yh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rf extends Sl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new u1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class sf extends Sl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class h1{constructor(e,t,i=0,r=1/0){this.ray=new gl(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new xl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Ko(e,this,i,t),i.sort(Wd),i}intersectObjects(e,t=!0,i=[]){for(let r=0,a=e.length;r<a;r++)Ko(e[r],this,i,t);return i.sort(Wd),i}}function Wd(n,e){return n.distance-e.distance}function Ko(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let a=0,l=r.length;a<l;a++)Ko(r[a],e,t,!0)}}class Xd{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fl);const qd={type:"change"},vo={type:"start"},$d={type:"end"},Ns=new gl,Yd=new Jn,f1=Math.cos(70*nv.DEG2RAD);class af extends Ni{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new q,this.cursor=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ji.ROTATE,MIDDLE:ji.DOLLY,RIGHT:ji.PAN},this.touches={ONE:Di.ROTATE,TWO:Di.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(j){j.addEventListener("keydown",w),this._domElementKeyEvents=j},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",w),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(qd),i.update(),a=r.NONE},this.update=(function(){const j=new q,me=new Ri().setFromUnitVectors(e.up,new q(0,1,0)),le=me.clone().invert(),We=new q,je=new Ri,Be=new q,Pe=2*Math.PI;return function(it=null){const F=i.object.position;j.copy(F).sub(i.target),j.applyQuaternion(me),o.setFromVector3(j),i.autoRotate&&a===r.NONE&&I(b(it)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let _e=i.minAzimuthAngle,ue=i.maxAzimuthAngle;isFinite(_e)&&isFinite(ue)&&(_e<-Math.PI?_e+=Pe:_e>Math.PI&&(_e-=Pe),ue<-Math.PI?ue+=Pe:ue>Math.PI&&(ue-=Pe),_e<=ue?o.theta=Math.max(_e,Math.min(ue,o.theta)):o.theta=o.theta>(_e+ue)/2?Math.max(_e,o.theta):Math.min(ue,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&A||i.object.isOrthographicCamera?o.radius=ee(o.radius):o.radius=ee(o.radius*d),j.setFromSpherical(o),j.applyQuaternion(le),F.copy(i.target).add(j),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let se=!1;if(i.zoomToCursor&&A){let pe=null;if(i.object.isPerspectiveCamera){const Ie=j.length();pe=ee(Ie*d);const rt=Ie-pe;i.object.position.addScaledVector(E,rt),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Ie=new q(S.x,S.y,0);Ie.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),se=!0;const rt=new q(S.x,S.y,0);rt.unproject(i.object),i.object.position.sub(rt).add(Ie),i.object.updateMatrixWorld(),pe=j.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;pe!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(pe).add(i.object.position):(Ns.origin.copy(i.object.position),Ns.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Ns.direction))<f1?e.lookAt(i.target):(Yd.setFromNormalAndCoplanarPoint(i.object.up,i.target),Ns.intersectPlane(Yd,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),se=!0);return d=1,A=!1,se||We.distanceToSquared(i.object.position)>l||8*(1-je.dot(i.object.quaternion))>l||Be.distanceToSquared(i.target)>0?(i.dispatchEvent(qd),We.copy(i.object.position),je.copy(i.object.quaternion),Be.copy(i.target),se=!1,!0):!1}})(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",ce),i.domElement.removeEventListener("pointerdown",Ne),i.domElement.removeEventListener("pointercancel",He),i.domElement.removeEventListener("wheel",C),i.domElement.removeEventListener("pointermove",Ve),i.domElement.removeEventListener("pointerup",He),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",w),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=r.NONE;const l=1e-6,o=new Xd,c=new Xd;let d=1;const u=new q,f=new $e,h=new $e,g=new $e,v=new $e,x=new $e,m=new $e,p=new $e,y=new $e,_=new $e,E=new q,S=new $e;let A=!1;const T=[],N={};function b(j){return j!==null?2*Math.PI/60*i.autoRotateSpeed*j:2*Math.PI/60/60*i.autoRotateSpeed}function M(){return Math.pow(.95,i.zoomSpeed)}function I(j){c.theta-=j}function k(j){c.phi-=j}const $=(function(){const j=new q;return function(le,We){j.setFromMatrixColumn(We,0),j.multiplyScalar(-le),u.add(j)}})(),P=(function(){const j=new q;return function(le,We){i.screenSpacePanning===!0?j.setFromMatrixColumn(We,1):(j.setFromMatrixColumn(We,0),j.crossVectors(i.object.up,j)),j.multiplyScalar(le),u.add(j)}})(),z=(function(){const j=new q;return function(le,We){const je=i.domElement;if(i.object.isPerspectiveCamera){const Be=i.object.position;j.copy(Be).sub(i.target);let Pe=j.length();Pe*=Math.tan(i.object.fov/2*Math.PI/180),$(2*le*Pe/je.clientHeight,i.object.matrix),P(2*We*Pe/je.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?($(le*(i.object.right-i.object.left)/i.object.zoom/je.clientWidth,i.object.matrix),P(We*(i.object.top-i.object.bottom)/i.object.zoom/je.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}})();function J(j){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d/=j:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function K(j){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d*=j:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ae(j){if(!i.zoomToCursor)return;A=!0;const me=i.domElement.getBoundingClientRect(),le=j.clientX-me.left,We=j.clientY-me.top,je=me.width,Be=me.height;S.x=le/je*2-1,S.y=-(We/Be)*2+1,E.set(S.x,S.y,1).unproject(i.object).sub(i.object.position).normalize()}function ee(j){return Math.max(i.minDistance,Math.min(i.maxDistance,j))}function ie(j){f.set(j.clientX,j.clientY)}function D(j){ae(j),p.set(j.clientX,j.clientY)}function L(j){v.set(j.clientX,j.clientY)}function G(j){h.set(j.clientX,j.clientY),g.subVectors(h,f).multiplyScalar(i.rotateSpeed);const me=i.domElement;I(2*Math.PI*g.x/me.clientHeight),k(2*Math.PI*g.y/me.clientHeight),f.copy(h),i.update()}function B(j){y.set(j.clientX,j.clientY),_.subVectors(y,p),_.y>0?J(M()):_.y<0&&K(M()),p.copy(y),i.update()}function Q(j){x.set(j.clientX,j.clientY),m.subVectors(x,v).multiplyScalar(i.panSpeed),z(m.x,m.y),v.copy(x),i.update()}function O(j){ae(j),j.deltaY<0?K(M()):j.deltaY>0&&J(M()),i.update()}function ye(j){let me=!1;switch(j.code){case i.keys.UP:j.ctrlKey||j.metaKey||j.shiftKey?k(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(0,i.keyPanSpeed),me=!0;break;case i.keys.BOTTOM:j.ctrlKey||j.metaKey||j.shiftKey?k(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(0,-i.keyPanSpeed),me=!0;break;case i.keys.LEFT:j.ctrlKey||j.metaKey||j.shiftKey?I(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(i.keyPanSpeed,0),me=!0;break;case i.keys.RIGHT:j.ctrlKey||j.metaKey||j.shiftKey?I(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):z(-i.keyPanSpeed,0),me=!0;break}me&&(j.preventDefault(),i.update())}function Y(){if(T.length===1)f.set(T[0].pageX,T[0].pageY);else{const j=.5*(T[0].pageX+T[1].pageX),me=.5*(T[0].pageY+T[1].pageY);f.set(j,me)}}function we(){if(T.length===1)v.set(T[0].pageX,T[0].pageY);else{const j=.5*(T[0].pageX+T[1].pageX),me=.5*(T[0].pageY+T[1].pageY);v.set(j,me)}}function Me(){const j=T[0].pageX-T[1].pageX,me=T[0].pageY-T[1].pageY,le=Math.sqrt(j*j+me*me);p.set(0,le)}function oe(){i.enableZoom&&Me(),i.enablePan&&we()}function U(){i.enableZoom&&Me(),i.enableRotate&&Y()}function Ze(j){if(T.length==1)h.set(j.pageX,j.pageY);else{const le=Se(j),We=.5*(j.pageX+le.x),je=.5*(j.pageY+le.y);h.set(We,je)}g.subVectors(h,f).multiplyScalar(i.rotateSpeed);const me=i.domElement;I(2*Math.PI*g.x/me.clientHeight),k(2*Math.PI*g.y/me.clientHeight),f.copy(h)}function be(j){if(T.length===1)x.set(j.pageX,j.pageY);else{const me=Se(j),le=.5*(j.pageX+me.x),We=.5*(j.pageY+me.y);x.set(le,We)}m.subVectors(x,v).multiplyScalar(i.panSpeed),z(m.x,m.y),v.copy(x)}function ge(j){const me=Se(j),le=j.pageX-me.x,We=j.pageY-me.y,je=Math.sqrt(le*le+We*We);y.set(0,je),_.set(0,Math.pow(y.y/p.y,i.zoomSpeed)),J(_.y),p.copy(y)}function Ae(j){i.enableZoom&&ge(j),i.enablePan&&be(j)}function Ce(j){i.enableZoom&&ge(j),i.enableRotate&&Ze(j)}function Ne(j){i.enabled!==!1&&(T.length===0&&(i.domElement.setPointerCapture(j.pointerId),i.domElement.addEventListener("pointermove",Ve),i.domElement.addEventListener("pointerup",He)),de(j),j.pointerType==="touch"?W(j):ht(j))}function Ve(j){i.enabled!==!1&&(j.pointerType==="touch"?he(j):_t(j))}function He(j){Le(j),T.length===0&&(i.domElement.releasePointerCapture(j.pointerId),i.domElement.removeEventListener("pointermove",Ve),i.domElement.removeEventListener("pointerup",He)),i.dispatchEvent($d),a=r.NONE}function ht(j){let me;switch(j.button){case 0:me=i.mouseButtons.LEFT;break;case 1:me=i.mouseButtons.MIDDLE;break;case 2:me=i.mouseButtons.RIGHT;break;default:me=-1}switch(me){case ji.DOLLY:if(i.enableZoom===!1)return;D(j),a=r.DOLLY;break;case ji.ROTATE:if(j.ctrlKey||j.metaKey||j.shiftKey){if(i.enablePan===!1)return;L(j),a=r.PAN}else{if(i.enableRotate===!1)return;ie(j),a=r.ROTATE}break;case ji.PAN:if(j.ctrlKey||j.metaKey||j.shiftKey){if(i.enableRotate===!1)return;ie(j),a=r.ROTATE}else{if(i.enablePan===!1)return;L(j),a=r.PAN}break;default:a=r.NONE}a!==r.NONE&&i.dispatchEvent(vo)}function _t(j){switch(a){case r.ROTATE:if(i.enableRotate===!1)return;G(j);break;case r.DOLLY:if(i.enableZoom===!1)return;B(j);break;case r.PAN:if(i.enablePan===!1)return;Q(j);break}}function C(j){i.enabled===!1||i.enableZoom===!1||a!==r.NONE||(j.preventDefault(),i.dispatchEvent(vo),O(j),i.dispatchEvent($d))}function w(j){i.enabled===!1||i.enablePan===!1||ye(j)}function W(j){switch(xe(j),T.length){case 1:switch(i.touches.ONE){case Di.ROTATE:if(i.enableRotate===!1)return;Y(),a=r.TOUCH_ROTATE;break;case Di.PAN:if(i.enablePan===!1)return;we(),a=r.TOUCH_PAN;break;default:a=r.NONE}break;case 2:switch(i.touches.TWO){case Di.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;oe(),a=r.TOUCH_DOLLY_PAN;break;case Di.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;U(),a=r.TOUCH_DOLLY_ROTATE;break;default:a=r.NONE}break;default:a=r.NONE}a!==r.NONE&&i.dispatchEvent(vo)}function he(j){switch(xe(j),a){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ze(j),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;be(j),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ae(j),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ce(j),i.update();break;default:a=r.NONE}}function ce(j){i.enabled!==!1&&j.preventDefault()}function de(j){T.push(j)}function Le(j){delete N[j.pointerId];for(let me=0;me<T.length;me++)if(T[me].pointerId==j.pointerId){T.splice(me,1);return}}function xe(j){let me=N[j.pointerId];me===void 0&&(me=new $e,N[j.pointerId]=me),me.set(j.pageX,j.pageY)}function Se(j){const me=j.pointerId===T[0].pointerId?T[1]:T[0];return N[me.pointerId]}i.domElement.addEventListener("contextmenu",ce),i.domElement.addEventListener("pointerdown",Ne),i.domElement.addEventListener("pointercancel",He),i.domElement.addEventListener("wheel",C,{passive:!1}),this.update()}}class p1{state={isSupported:!1,isSessionActive:!1};onFrameCallback;lastFrameTime=0;constructor(){this.checkSupport()}async checkSupport(){if("xr"in navigator)try{this.state.isSupported=await navigator.xr.isSessionSupported("immersive-vr"),console.log("WebXR VR support:",this.state.isSupported)}catch(e){console.error("Error checking WebXR support:",e),this.state.isSupported=!1}else console.log("WebXR not supported in this browser"),this.state.isSupported=!1}async requestSession(e={}){if(!this.state.isSupported)return console.error("WebXR is not supported"),!1;try{const t=e.requiredFeatures||["local-floor"],i=[...e.optionalFeatures||[],"hand-tracking","dom-overlay","layers"],r=await navigator.xr.requestSession("immersive-vr",{requiredFeatures:t,optionalFeatures:i});return this.state.session=r,this.state.isSessionActive=!0,r.addEventListener("end",this.onSessionEnded.bind(this)),r.addEventListener("inputsourceschange",this.onInputSourcesChange.bind(this)),this.state.referenceSpace=await r.requestReferenceSpace("local-floor"),r.requestAnimationFrame(this.onXRFrame.bind(this)),console.log("WebXR session started successfully"),!0}catch(t){return console.error("Error requesting WebXR session:",t),!1}}onXRFrame(e,t){this.state.frame=t,this.state.referenceSpace&&(this.state.viewerPose=t.getViewerPose(this.state.referenceSpace));const i=this.lastFrameTime>0?(e-this.lastFrameTime)/1e3:0;this.lastFrameTime=e,this.onFrameCallback&&this.onFrameCallback(t,i),this.state.session&&this.state.session.requestAnimationFrame(this.onXRFrame.bind(this))}onSessionEnded(){this.state.isSessionActive=!1,this.state.session=void 0,this.state.referenceSpace=void 0,this.state.viewerPose=void 0,console.log("WebXR session ended")}onInputSourcesChange(e){if(console.log("XR Input Sources Changed:",e),this.state.session){const t=this.state.session.inputSources;console.log("Current input sources:",t)}}setFrameCallback(e){this.onFrameCallback=e}getViewerPose(){return this.state.viewerPose}getReferenceSpace(){return this.state.referenceSpace}getSession(){return this.state.session}getFrame(){return this.state.frame}getState(){return{...this.state}}async exitSession(){this.state.session&&await this.state.session.end()}getSupportedFeatures(){return["local-floor","bounded-floor","unbounded","viewer","hand-tracking","dom-overlay","layers"]}isFeatureSupported(e){return this.getSupportedFeatures().includes(e)}xrPoseToThreeJS(e){if(!e||!e.transform)return{position:new q,rotation:new cr};const t=e.transform.position,i=e.transform.orientation;return{position:new q(t.x,t.y,t.z),rotation:new cr().setFromQuaternion({x:i.x,y:i.y,z:i.z,w:i.w})}}getHandJointPositions(e,t){if(e.hand&&this.state.frame){const i=new Map;for(const r of e.hand.keys()){const a=this.state.frame.getJointPose(e.hand.get(r),t);if(a){const l=a.transform.position;i.set(r,new q(l.x,l.y,l.z))}}return i}return null}}const mi=new p1,m1=re.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,g1=re.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,yo=re.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    background: #3700b3;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`,x1=({artworks:n,onArtworkSelect:e,onExitVR:t})=>{const i=V.useRef(null),[r,a]=V.useState(!1),[l,o]=V.useState(!1),[c,d]=V.useState(!0),u=V.useRef(null),f=V.useRef(null),h=V.useRef(null),g=V.useRef(null),v=V.useRef(null),x=V.useRef([]);V.useEffect(()=>{if(!i.current)return;(async()=>{const $=mi.getState();a($.isSupported)})();const T=new ef;T.background=new ot(1118483),u.current=T;const N=new Kt(75,window.innerWidth/window.innerHeight,.1,1e3);N.position.set(0,1.6,5),f.current=N;const b=new yl({antialias:!0});b.setSize(window.innerWidth,window.innerHeight),b.setPixelRatio(window.devicePixelRatio),b.shadowMap.enabled=!0,b.xr.enabled=!0,i.current.appendChild(b.domElement),h.current=b,m(T),p(T),_(T,n);const M=new af(N,b.domElement);M.enableDamping=!0,M.dampingFactor=.05,g.current=M;const I=()=>{N&&b&&(N.aspect=window.innerWidth/window.innerHeight,N.updateProjectionMatrix(),b.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",I);const k=()=>{v.current=requestAnimationFrame(k),M&&!b.xr.isPresenting&&M.update(),b&&b.render(T,N)};return k(),d(!1),()=>{window.removeEventListener("resize",I),v.current&&cancelAnimationFrame(v.current),i.current&&b?.domElement&&i.current.removeChild(b.domElement),b&&b.dispose()}},[n]);const m=A=>{const T=new sf(16777215,.6);A.add(T);const N=new rf(16777215,.8);N.position.set(5,10,7),N.castShadow=!0,A.add(N),n.forEach((b,M)=>{const I=new nf(16777215,.8);I.position.set(-6+M%4*4,4,-8+Math.floor(M/4)*-4),I.castShadow=!0,I.angle=Math.PI/6,I.penumbra=.2,I.decay=2,I.distance=200,A.add(I)})},p=A=>{const T=new Hn(40,40),N=new un({color:3355443,roughness:.8,metalness:.2}),b=new gt(T,N);b.rotation.x=-Math.PI/2,b.receiveShadow=!0,A.add(b);const M=new Vn(40,8,.5),I=new un({color:4473924,roughness:.7,metalness:.3}),k=new gt(M,I);k.position.z=-20,k.position.y=4,k.castShadow=!1,k.receiveShadow=!0,A.add(k);const $=new gt(M,I);$.position.x=-20,$.position.y=4,$.rotation.y=Math.PI/2,$.castShadow=!1,$.receiveShadow=!0,A.add($);const P=new gt(M,I);P.position.x=20,P.position.y=4,P.rotation.y=Math.PI/2,P.castShadow=!1,P.receiveShadow=!0,A.add(P);const z=new Hn(40,40),J=new un({color:2236962,roughness:.9,metalness:.1}),K=new gt(z,J);K.rotation.x=Math.PI/2,K.position.y=8,K.castShadow=!1,A.add(K),y(A)},y=A=>{const T=new ba(.5,.5,8,16),N=new un({color:8947848,roughness:.6,metalness:.2});for(let b=0;b<4;b++){const M=new gt(T,N);M.position.x=-15+b*10,M.position.z=-18,M.position.y=4,M.castShadow=!0,M.receiveShadow=!0,A.add(M)}},_=(A,T)=>{x.current.forEach(I=>A.remove(I)),x.current=[];const N=Math.ceil(Math.sqrt(T.length)),b=Math.ceil(T.length/N),M=4;T.forEach((I,k)=>{const $=Math.floor(k/b),z=(k%b-(b-1)/2)*M,J=-($-(N-1)/2)*M-19,K=2,ae=new Vn(2.5,2.5,.1),ee=new un({color:9127187,metalness:.3,roughness:.7}),ie=new gt(ae,ee);ie.position.set(z,K,J),ie.userData={type:"artwork",artworkId:I.artwork_id,artwork:I},A.add(ie),x.current.push(ie);const D=new Hn(2.3,2.3),L=new un({color:11184810,emissive:3355443,roughness:.5,metalness:.1}),G=new gt(D,L);G.position.set(z,K,J+.06),G.userData={type:"artwork",artworkId:I.artwork_id,artwork:I},A.add(G),x.current.push(G),ie.addEventListener("click",()=>{e(I)})})},E=async()=>{if(!r){console.error("WebXR is not supported in this browser");return}try{await mi.requestSession({requiredFeatures:["local-floor"],optionalFeatures:["hand-tracking"]})&&h.current?(h.current.xr.enabled=!0,mi.setFrameCallback((T,N)=>{if(mi.getViewerPose()&&f.current){const b=mi.getViewerPose();b&&b.views&&b.views.length>0}}),o(!0),console.log("Entered VR mode")):console.error("Failed to enter VR mode")}catch(A){console.error("Error entering VR mode:",A)}},S=async()=>{mi.getSession()&&await mi.exitSession(),h.current&&(h.current.xr.enabled=!1),o(!1),console.log("Exited VR mode")};return s.jsxs(m1,{ref:i,children:[c&&s.jsx("div",{children:"Loading VR Gallery..."}),s.jsxs(g1,{children:[s.jsxs("div",{children:[s.jsx("h3",{children:"Virtual Gallery"}),s.jsxs("p",{children:[l?"In VR Mode":"In Desktop Mode"," • ",n.length," artworks displayed"]})]}),s.jsxs("div",{children:[l?s.jsx(yo,{onClick:S,children:"Exit VR Mode"}):s.jsx(yo,{onClick:E,disabled:!r,children:r?"Enter VR Mode":"VR Not Supported"}),s.jsx(yo,{onClick:t,children:"Back to Gallery"})]})]})]})},_1=()=>{const[n,e]=V.useState([]),[t,i]=V.useState(!0),[r,a]=V.useState(null);V.useEffect(()=>{(async()=>{try{const d=await xt.get("http://localhost:5000/api/artworks");e(d.data)}catch(d){console.error("Error fetching artworks:",d),a("Failed to load artworks")}finally{i(!1)}})()},[]);const l=c=>{console.log("Selected artwork:",c)},o=()=>{window.history.back()};return t?s.jsx("div",{children:"Loading VR Gallery..."}):r?s.jsxs("div",{children:["Error: ",r]}):s.jsx(x1,{artworks:n,onArtworkSelect:l,onExitVR:o})},of=V.forwardRef(({className:n,type:e,...t},i)=>s.jsx("input",{type:e,className:Ct("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n),ref:i,...t}));of.displayName="Input";const v1=Ef,y1=Mf,lf=V.forwardRef(({className:n,children:e,...t},i)=>s.jsxs(ou,{ref:i,className:Ct("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",n),...t,children:[e,s.jsx(vf,{asChild:!0,children:s.jsx(Am,{className:"h-4 w-4 opacity-50"})})]}));lf.displayName=ou.displayName;const cf=V.forwardRef(({className:n,children:e,position:t="popper",...i},r)=>s.jsx(yf,{children:s.jsx(lu,{ref:r,className:Ct("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",n),position:t,...i,children:s.jsx(bf,{className:Ct("p-1",t==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:e})})}));cf.displayName=lu.displayName;const b1=V.forwardRef(({className:n,...e},t)=>s.jsx(cu,{ref:t,className:Ct("py-1.5 pl-8 pr-2 text-sm font-semibold",n),...e}));b1.displayName=cu.displayName;const Zo=V.forwardRef(({className:n,children:e,...t},i)=>s.jsxs(du,{ref:i,className:Ct("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",n),...t,children:[s.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:s.jsx(Sf,{children:s.jsx(Tm,{className:"h-4 w-4"})})}),s.jsx(wf,{children:e})]}));Zo.displayName=du.displayName;const S1=V.forwardRef(({className:n,...e},t)=>s.jsx(uu,{ref:t,className:Ct("-mx-1 my-1 h-px bg-muted",n),...e}));S1.displayName=uu.displayName;const w1=()=>{const{id:n}=la(),[e,t]=V.useState(null),[i,r]=V.useState([]),[a,l]=V.useState(""),[o,c]=V.useState("all");if(V.useEffect(()=>{const u={id:"1",name:"Галерея современного искусства",description:"Коллекция современных произведений искусства от ведущих художников 21 века.",location:"Центральный район, ул. Искусств, 15",openingHours:"Ежедневно 10:00-20:00",visitorCount:12500,artworks:[{id:"1",title:"Абстрактная композиция №1",artist:"Александр Петров",year:2020,description:"Экспериментальная работа, исследующая взаимодействие цвета и формы.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","современное","краски"]},{id:"2",title:"Городской пейзаж",artist:"Мария Иванова",year:2022,description:"Реалистичное изображение городской архитектуры в вечернем свете.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","реализм","город"]},{id:"3",title:"Цифровая инсталляция",artist:"Анна Смирнова",year:2023,description:"Интерактивная инсталляция, реагирующая на движения посетителей.",imageUrl:"/placeholder-artwork.jpg",tags:["цифровое","инсталляция","интерактив"]}]};t(u),r(u.artworks)},[n]),V.useEffect(()=>{if(!e)return;let u=e.artworks;a&&(u=u.filter(f=>f.title.toLowerCase().includes(a.toLowerCase())||f.artist.toLowerCase().includes(a.toLowerCase()))),o!=="all"&&(u=u.filter(f=>f.tags.includes(o))),r(u)},[a,o,e]),!e)return s.jsx("div",{className:"container mx-auto px-4 py-8 flex justify-center items-center h-64",children:s.jsx("p",{className:"text-lg",children:"Загрузка галереи..."})});const d=Array.from(new Set(e.artworks.flatMap(u=>u.tags)));return s.jsxs("div",{className:"container mx-auto px-4 py-8",children:[s.jsxs("div",{className:"mb-8",children:[s.jsx("h1",{className:"text-4xl font-bold mb-4",children:e.name}),s.jsx("p",{className:"text-lg text-muted-foreground mb-6",children:e.description}),s.jsxs("div",{className:"flex flex-wrap gap-6 mb-6",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(Or,{className:"h-5 w-5 mr-2 text-primary"}),s.jsx("span",{children:e.location})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(Ei,{className:"h-5 w-5 mr-2 text-primary"}),s.jsx("span",{children:e.openingHours})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(Sn,{className:"h-5 w-5 mr-2 text-primary"}),s.jsxs("span",{children:[e.visitorCount.toLocaleString()," посетителей"]})]})]})]}),s.jsxs("div",{className:"flex flex-col md:flex-row gap-6 mb-8",children:[s.jsx("div",{className:"flex-1",children:s.jsxs("div",{className:"relative",children:[s.jsx(ua,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),s.jsx(of,{placeholder:"Поиск экспонатов...",value:a,onChange:u=>l(u.target.value),className:"pl-10"})]})}),s.jsxs("div",{className:"flex gap-2",children:[s.jsxs(v1,{value:o,onValueChange:c,children:[s.jsxs(lf,{className:"w-[180px]",children:[s.jsx(Bu,{className:"h-4 w-4 mr-2"}),s.jsx(y1,{placeholder:"Фильтр"})]}),s.jsxs(cf,{children:[s.jsx(Zo,{value:"all",children:"Все теги"}),d.map(u=>s.jsx(Zo,{value:u,children:u},u))]})]}),s.jsx(fe,{children:"Сортировать"})]})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:i.map(u=>s.jsxs(Ue,{className:"overflow-hidden",children:[s.jsx("img",{src:u.imageUrl,alt:u.title,className:"w-full h-48 object-cover"}),s.jsxs(Oe,{children:[s.jsx(Fe,{children:u.title}),s.jsxs(ze,{children:["Автор: ",u.artist,", ",u.year]})]}),s.jsxs(ke,{children:[s.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:u.description}),s.jsx("div",{className:"flex flex-wrap gap-2",children:u.tags.map(f=>s.jsx("span",{className:"px-2 py-1 bg-primary/10 text-primary text-xs rounded-full",children:f},f))}),s.jsx(fe,{className:"w-full mt-4",children:"Подробнее"})]})]},u.id))}),i.length===0&&s.jsxs("div",{className:"text-center py-12",children:[s.jsx("p",{className:"text-lg text-muted-foreground",children:"Не найдено экспонатов по заданным критериям"}),s.jsx(fe,{variant:"outline",className:"mt-4",onClick:()=>{l(""),c("all")},children:"Сбросить фильтры"})]})]})},Kd=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,E1=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,M1=re.h1`
  color: #333;
  margin: 0;
`,T1=re.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,Ps=re.div`
  margin-bottom: 1.5rem;
`,Ls=re.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`,A1=re.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,R1=re.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`,Zd=re.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,js=re.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #3700b3;
  }
`;re.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;re.div`
  border: 2px solid ${({selected:n})=>n?"#6200ee":"#ddd"};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  background-color: ${({selected:n})=>n?"#f0e6ff":"white"};

  &:hover {
    border-color: #6200ee;
  }
`;const C1=()=>{const{galleryId:n}=la(),[e,t]=V.useState([]),[i,r]=V.useState([]),[a,l]=V.useState(!0),[o,c]=V.useState(""),[d,u]=V.useState(""),[f,h]=V.useState(""),[g,v]=V.useState(""),[x,m]=V.useState([]),[p,y]=V.useState(null);V.useEffect(()=>{(async()=>{try{if(n){const b=await Pr.getRooms(parseInt(n));t(b);const M=await Qs.getAllArtworks();r(M)}}catch(b){console.error("Ошибка при загрузке данных:",b)}finally{l(!1)}})()},[n]);const _=async N=>{N.preventDefault();try{const b={name:o,description:d,theme:f,region:g,tags:[f],layout_settings:{background_color:"#ffffff",lighting_settings:{ambient_intensity:.6,directional_intensity:.8,color_temperature:6500},wall_configurations:[],navigation_points:[]}},M=await Pr.createRoom(parseInt(n),b);t([...e,M]),T()}catch(b){console.error("Ошибка при создании зала:",b)}},E=async N=>{if(N.preventDefault(),!!p)try{const b={name:o,description:d,theme:f,region:g},M=await Pr.updateRoom(p.room_id,b);t(e.map(I=>I.room_id===M.room_id?M:I)),T()}catch(b){console.error("Ошибка при обновлении зала:",b)}},S=async N=>{if(window.confirm("Вы уверены, что хотите удалить этот зал?"))try{await Pr.deleteRoom(N),t(e.filter(b=>b.room_id!==N))}catch(b){console.error("Ошибка при удалении зала:",b)}},A=N=>{y(N),c(N.name),u(N.description||""),h(N.theme),v(N.region||"")},T=()=>{c(""),u(""),h(""),v(""),m([]),y(null)};return a?s.jsx(Kd,{children:"Загрузка данных..."}):s.jsxs(Kd,{children:[s.jsx(E1,{children:s.jsx(M1,{children:"Управление залами галереи"})}),s.jsxs(T1,{children:[s.jsx("h2",{children:p?"Редактировать зал":"Создать новый зал"}),s.jsxs("form",{onSubmit:p?E:_,children:[s.jsxs(Ps,{children:[s.jsx(Ls,{htmlFor:"name",children:"Название зала:"}),s.jsx(A1,{id:"name",type:"text",value:o,onChange:N=>c(N.target.value),required:!0})]}),s.jsxs(Ps,{children:[s.jsx(Ls,{htmlFor:"description",children:"Описание:"}),s.jsx(R1,{id:"description",value:d,onChange:N=>u(N.target.value)})]}),s.jsxs(Ps,{children:[s.jsx(Ls,{htmlFor:"theme",children:"Тема зала:"}),s.jsxs(Zd,{id:"theme",value:f,onChange:N=>h(N.target.value),required:!0,children:[s.jsx("option",{value:"",children:"Выберите тему"}),s.jsx("option",{value:"impressionism",children:"Импрессионизм"}),s.jsx("option",{value:"sculpture",children:"Скульптура"}),s.jsx("option",{value:"renaissance",children:"Ренессанс"}),s.jsx("option",{value:"contemporary",children:"Современное искусство"}),s.jsx("option",{value:"photography",children:"Фотография"}),s.jsx("option",{value:"asian_art",children:"Азиатское искусство"}),s.jsx("option",{value:"european_art",children:"Европейское искусство"}),s.jsx("option",{value:"american_art",children:"Американское искусство"})]})]}),s.jsxs(Ps,{children:[s.jsx(Ls,{htmlFor:"region",children:"Регион (необязательно):"}),s.jsxs(Zd,{id:"region",value:g,onChange:N=>v(N.target.value),children:[s.jsx("option",{value:"",children:"Выберите регион"}),s.jsx("option",{value:"european",children:"Европейский"}),s.jsx("option",{value:"asian",children:"Азиатский"}),s.jsx("option",{value:"american",children:"Американский"}),s.jsx("option",{value:"african",children:"Африканский"}),s.jsx("option",{value:"middle_eastern",children:"Ближневосточный"})]})]}),s.jsx(js,{type:"submit",children:p?"Обновить зал":"Создать зал"}),p&&s.jsx(js,{type:"button",style:{marginLeft:"1rem",backgroundColor:"#f44336"},onClick:T,children:"Отмена"})]})]}),s.jsxs("div",{children:[s.jsx("h2",{children:"Существующие залы"}),e.length>0?s.jsx("div",{children:e.map(N=>s.jsxs("div",{style:{border:"1px solid #ddd",borderRadius:"8px",padding:"1rem",marginBottom:"1rem"},children:[s.jsx("h3",{children:N.name}),s.jsxs("p",{children:[s.jsx("strong",{children:"Тема:"})," ",N.theme]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Регион:"})," ",N.region||"Не указан"]}),N.description&&s.jsxs("p",{children:[s.jsx("strong",{children:"Описание:"})," ",N.description]}),s.jsxs("div",{style:{marginTop:"1rem"},children:[s.jsx(js,{onClick:()=>A(N),children:"Редактировать"}),s.jsx(js,{style:{marginLeft:"0.5rem",backgroundColor:"#f44336"},onClick:()=>S(N.room_id),children:"Удалить"})]})]},N.room_id))}):s.jsx("p",{children:"В этой галерее пока нет залов"})]})]})},N1=re.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,P1=re.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`,L1=re.div`
  padding: 1rem;
`,j1=re.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`,D1=re.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`,I1=re.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`,U1=re.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`,O1=({artwork:n,onClick:e})=>s.jsxs(N1,{onClick:e,children:[s.jsx(P1,{children:n.image_url?s.jsx("img",{src:n.image_url,alt:n.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):s.jsx("span",{children:"Изображение недоступно"})}),s.jsxs(L1,{children:[s.jsx(j1,{children:n.title}),s.jsxs(D1,{children:["Автор: ",n.artist_name]}),s.jsx(I1,{children:n.description?.substring(0,100)+"..."}),s.jsxs(U1,{children:[s.jsx("span",{children:n.year_created||"Неизвестно"}),s.jsx("span",{children:n.medium||"Неизвестно"})]})]})]}),bo=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,F1=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,k1=re.h1`
  color: #333;
  margin: 0;
`,B1=re.p`
  color: #666;
  margin: 0.5rem 0 2rem 0;
`,z1=re.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`,H1=re.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`,G1=()=>{const{id:n}=la(),e=oa(),[t,i]=V.useState(null),[r,a]=V.useState([]),[l,o]=V.useState(!0);V.useEffect(()=>{(async()=>{try{if(n){const u=await Pr.getRoomById(parseInt(n));i(u);const h=(await Qs.getAllArtworks()).filter(g=>g.tags.some(v=>u.tags.includes(v)));a(h)}}catch(u){console.error("Ошибка при загрузке данных зала:",u)}finally{o(!1)}})()},[n]);const c=()=>{e(-1)};return l?s.jsx(bo,{children:"Загрузка зала..."}):t?s.jsxs(bo,{children:[s.jsx(H1,{onClick:c,children:"← Назад к галерее"}),s.jsx(F1,{children:s.jsxs("div",{children:[s.jsx(k1,{children:t.name}),t.description&&s.jsx(B1,{children:t.description}),s.jsxs("p",{children:[s.jsx("strong",{children:"Тема:"})," ",t.theme]}),t.region&&s.jsxs("p",{children:[s.jsx("strong",{children:"Регион:"})," ",t.region]})]})}),s.jsxs("div",{children:[s.jsx("h2",{children:"Экспонаты в зале"}),r.length>0?s.jsx(z1,{children:r.map(d=>s.jsx(O1,{artwork:d,onClick:()=>e(`/artworks/${d.artwork_id}`)},d.artwork_id))}):s.jsx("p",{children:"В этом зале пока нет экспонатов"})]})]}):s.jsx(bo,{children:"Зал не найден"})},V1=re.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
`,W1=re.div`
  height: 20px;
  background: linear-gradient(90deg, #6200ee, #3700b3);
  width: ${({percentage:n})=>`${n}%`};
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
`,X1=re.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
`,q1=({percentage:n,status:e,showPercentage:t=!0})=>s.jsxs("div",{children:[s.jsx(V1,{children:s.jsx(W1,{percentage:n,children:t&&`${Math.round(n)}%`})}),s.jsx(X1,{children:e})]}),$1=re.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,Y1=re.div`
  border: 2px dashed ${({isDragActive:n})=>n?"#6200ee":"#ddd"};
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({isDragActive:n})=>n?"rgba(98, 0, 238, 0.05)":"#fafafa"};
  transition: all 0.3s ease;

  &:hover {
    border-color: #6200ee;
  }
`,K1=re.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
`,Jd=re.p`
  color: #666;
  margin: 0.5rem 0;
`,Qd=re.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    background-color: #3700b3;
  }
`,Z1=re.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`,J1=re.div`
  position: relative;
  width: 150px;
  height: 150px;
`,Q1=re.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`,eE=re.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;re.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
`;re.div`
  height: 100%;
  width: ${({percentage:n})=>`${n}%`};
  background-color: #6200ee;
  transition: width 0.3s ease;
`;const tE=({onUploadComplete:n})=>{const[e,t]=V.useState(!1),[i,r]=V.useState([]),[a,l]=V.useState([]),[o,c]=V.useState(null),[d,u]=V.useState(!1),f=V.useRef(null),h=_=>{_.preventDefault(),_.stopPropagation(),_.type==="dragenter"||_.type==="dragover"?t(!0):_.type==="dragleave"&&t(!1)},g=_=>{_.preventDefault(),_.stopPropagation(),t(!1),_.dataTransfer.files&&_.dataTransfer.files[0]&&x(_.dataTransfer.files)},v=_=>{_.preventDefault(),_.target.files&&_.target.files[0]&&x(_.target.files)},x=_=>{const E=Array.from(_),S=E.filter(A=>A.type.startsWith("image/")&&(A.type==="image/jpeg"||A.type==="image/png"||A.type==="image/webp"||A.type==="image/jpg"));if(S.length!==E.length&&alert("Поддерживаются только изображения форматов JPEG, PNG, WebP"),S.length>0){r(T=>[...T,...S]);const A=S.map(T=>URL.createObjectURL(T));l(T=>[...T,...A])}},m=_=>{r(E=>E.filter((S,A)=>A!==_)),l(E=>E.filter((S,A)=>A!==_))},p=async()=>{if(i.length===0){alert("Пожалуйста, выберите изображения для загрузки");return}u(!0),c(0);try{for(let _=0;_<i.length;_++){const E=i[_],S=setInterval(()=>{c(T=>{if(T===null)return 0;const N=T+10;return N>=100?(clearInterval(S),100):N})},200),A=await Zt.uploadImage(E,1);await Zt.analyzeImage(A.artwork_id||1),clearInterval(S),c(100),n(A)}setTimeout(()=>{r([]),l([]),c(null),u(!1),alert("Изображения успешно загружены и отправлены на анализ")},1e3)}catch(_){console.error("Ошибка при загрузке изображений:",_),alert("Ошибка при загрузке изображений"),u(!1),c(null)}},y=()=>{f.current&&f.current.click()};return s.jsxs($1,{children:[s.jsx("h3",{children:"Загрузка изображений экспонатов"}),s.jsxs(Y1,{isDragActive:e,onDragEnter:h,onDragLeave:h,onDragOver:h,onDrop:g,onClick:y,children:[s.jsx(K1,{children:"📁"}),s.jsx(Jd,{children:"Перетащите изображения сюда или нажмите для выбора"}),s.jsx(Jd,{children:"Поддерживаются форматы: JPEG, PNG, WebP"}),s.jsx(Qd,{children:"Выбрать файлы"}),s.jsx("input",{ref:f,type:"file",multiple:!0,accept:"image/jpeg,image/png,image/webp,image/jpg",onChange:v,style:{display:"none"}})]}),o!==null&&s.jsx(q1,{percentage:o,status:o<100?"Загрузка...":"Загрузка завершена"}),a.length>0&&s.jsx(Z1,{children:a.map((_,E)=>s.jsxs(J1,{children:[s.jsx(Q1,{src:_,alt:`Preview ${E}`}),s.jsx(eE,{onClick:()=>m(E),children:"×"})]},E))}),i.length>0&&s.jsx(Qd,{onClick:p,disabled:d,style:{marginTop:"1rem"},children:d?"Загрузка...":`Загрузить ${i.length} файл(ов)`})]})},nE=re.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
`,eu=re.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`,iE=re.div`
  margin: 1rem 0;
`,rE=re.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,sE=re.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${({color:n})=>n};
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
`,aE=re.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
`,oE=re.div`
  height: 100%;
  width: ${({percentage:n})=>`${n}%`};
  background-color: #4caf50;
`,lE=re.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`,df=({analysis:n,artwork:e,onArtworkChange:t})=>s.jsxs(nE,{children:[s.jsx(eu,{children:"Результаты ИИ-анализа"}),s.jsxs("div",{children:[s.jsxs("h4",{children:["Предполагаемый стиль: ",s.jsx("strong",{children:n.style})]}),s.jsxs("p",{children:["Доверительная оценка: ",Math.round(n.confidence*100),"%"]}),s.jsx(aE,{children:s.jsx(oE,{percentage:n.confidence*100})})]}),s.jsx("div",{children:s.jsxs("h4",{children:["Оценка периода: ",s.jsx("strong",{children:n.estimated_period})]})}),s.jsxs(iE,{children:[s.jsx("h4",{children:"Обнаруженные теги:"}),n.tags.map((i,r)=>s.jsx(rE,{children:i},r))]}),s.jsxs("div",{children:[s.jsx("h4",{children:"Доминирующие цвета:"}),s.jsx("div",{children:n.dominant_colors.map((i,r)=>s.jsx(sE,{color:i,title:i},r))})]}),s.jsxs("div",{children:[s.jsx("h4",{children:"Обнаруженные объекты:"}),n.detected_objects.map((i,r)=>s.jsxs(lE,{children:[s.jsxs("div",{children:[s.jsx("strong",{children:i.name})," (доверие: ",Math.round(i.confidence*100),"%)"]}),s.jsxs("div",{children:["Позиция: (",i.bounding_box.x,", ",i.bounding_box.y,"), Размер: ",i.bounding_box.width,"x",i.bounding_box.height]})]},r))]}),s.jsxs("div",{children:[s.jsx("h4",{children:"Качество изображения:"}),s.jsxs("p",{children:["Яркость: ",n.image_quality.brightness.toFixed(2)]}),s.jsxs("p",{children:["Контрастность: ",n.image_quality.contrast.toFixed(2)]}),s.jsxs("p",{children:["Резкость: ",n.image_quality.sharpness.toFixed(2)]}),s.jsxs("p",{children:["Разрешение: ",n.image_quality.resolution.width,"x",n.image_quality.resolution.height]})]}),s.jsx(eu,{children:"Редактирование карточки экспоната"}),s.jsx("div",{children:s.jsxs("label",{children:[s.jsx("strong",{children:"Название:"}),s.jsx("input",{type:"text",value:e.title||"",onChange:i=>t("title",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),s.jsx("div",{children:s.jsxs("label",{children:[s.jsx("strong",{children:"Имя художника:"}),s.jsx("input",{type:"text",value:e.artist_name||"",onChange:i=>t("artist_name",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),s.jsx("div",{children:s.jsxs("label",{children:[s.jsx("strong",{children:"Год создания:"}),s.jsx("input",{type:"number",value:e.year_created||"",onChange:i=>t("year_created",i.target.value?parseInt(i.target.value):void 0),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),s.jsx("div",{children:s.jsxs("label",{children:[s.jsx("strong",{children:"Техника:"}),s.jsx("input",{type:"text",value:e.medium||"",onChange:i=>t("medium",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),s.jsx("div",{children:s.jsxs("label",{children:[s.jsx("strong",{children:"Стиль:"}),s.jsx("input",{type:"text",value:e.style||"",onChange:i=>t("style",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),s.jsx("div",{children:s.jsxs("label",{children:[s.jsx("strong",{children:"Описание:"}),s.jsx("textarea",{value:e.description||"",onChange:i=>t("description",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0",minHeight:"100px"}})]})}),s.jsx("div",{children:s.jsxs("label",{children:[s.jsx("strong",{children:"Теги (через запятую):"}),s.jsx("input",{type:"text",value:e.tags?.join(", ")||"",onChange:i=>t("tags",i.target.value.split(",").map(r=>r.trim())),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})})]}),tu=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,cE=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,dE=re.h1`
  color: #333;
  margin: 0;
`,uE=re.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`,Ds=re.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`,Is=re.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`,So=re.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,wo=re.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,Cr=re.button`
  padding: 0.75rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #3700b3;
  }
`,hE=re.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`,fE=re.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:n})=>{switch(n){case"uploaded":return"#2196f3";case"analyzing":return"#ff9800";case"analyzed":return"#4caf50";case"review_pending":return"#9c27b0";case"published":return"#8bc34a";case"rejected":return"#f44336";default:return"#9e9e9e"}}};
  color: white;
`,pE=()=>{const[n,e]=V.useState([]),[t,i]=V.useState(null),[r,a]=V.useState(null),[l,o]=V.useState({}),[c,d]=V.useState(!0),[u,f]=V.useState({totalUploads:0,analyzing:0,analyzed:0,published:0});V.useEffect(()=>{(async()=>{try{const _=await Zt.getUserUploads(1);e(_);const E=_.length,S=_.filter(N=>N.status==="analyzing").length,A=_.filter(N=>N.status==="analyzed").length,T=_.filter(N=>N.status==="published").length;f({totalUploads:E,analyzing:S,analyzed:A,published:T})}catch(_){console.error("Ошибка при загрузке загрузок:",_)}finally{d(!1)}})()},[]);const h=async y=>{e(_=>[..._,y]),f(_=>({..._,totalUploads:_.totalUploads+1,analyzing:_.analyzing+1})),i(y);try{const _=await Zt.getImageAnalysis(y.artwork_id||1);a(_),e(E=>E.map(S=>S.artwork_id===y.artwork_id?{...S,status:"analyzed",analysis_result:_}:S)),f(E=>({...E,analyzing:E.analyzing-1,analyzed:E.analyzed+1}))}catch(_){console.error("Ошибка при загрузке результатов анализа:",_)}},g=async y=>{if(i(y),y.analysis_result)a(y.analysis_result),o(y.artwork_data||{});else try{const _=await Zt.getImageAnalysis(y.artwork_id||1);a(_),o({...y.artwork_data,title:y.original_name.replace(/\.[^/.]+$/,"")})}catch(_){console.error("Ошибка при загрузке результатов анализа:",_)}},v=(y,_)=>{o(E=>({...E,[y]:_}))},x=async()=>{if(!t){alert("Сначала выберите изображение для сохранения");return}try{e(y=>y.map(_=>_.artwork_id===t.artwork_id?{..._,status:"review_pending",artwork_data:l}:_)),f(y=>({...y,analyzed:y.analyzed-1})),alert("Карточка экспоната сохранена и отправлена на проверку")}catch(y){console.error("Ошибка при сохранении карточки:",y),alert("Ошибка при сохранении карточки")}},m=async()=>{if(!t){alert("Сначала выберите изображение для публикации");return}try{e(y=>y.map(_=>_.artwork_id===t.artwork_id?{..._,status:"published"}:_)),f(y=>({...y,analyzed:y.analyzed-1,published:y.published+1})),alert("Экспонат опубликован")}catch(y){console.error("Ошибка при публикации:",y),alert("Ошибка при публикации экспоната")}},p=async()=>{if(!t){alert("Сначала выберите изображение для повторного анализа");return}try{e(_=>_.map(E=>E.artwork_id===t.artwork_id?{...E,status:"analyzing"}:E)),f(_=>({..._,analyzed:_.analyzed-1,analyzing:_.analyzing+1}));const y=await Zt.reanalyzeImage(t.artwork_id||1);a(y),e(_=>_.map(E=>E.artwork_id===t.artwork_id?{...E,status:"analyzed",analysis_result:y}:E)),f(_=>({..._,analyzing:_.analyzing-1,analyzed:_.analyzed+1})),alert("Повторный анализ завершен")}catch(y){console.error("Ошибка при повторном анализе:",y),alert("Ошибка при повторном анализе")}};return c?s.jsx(tu,{children:"Загрузка данных..."}):s.jsxs(tu,{children:[s.jsx(cE,{children:s.jsx(dE,{children:"Дашборд сотрудника музея"})}),s.jsxs(uE,{children:[s.jsxs(Ds,{children:[s.jsx("h3",{children:"Всего загрузок"}),s.jsx(Is,{children:u.totalUploads})]}),s.jsxs(Ds,{children:[s.jsx("h3",{children:"На анализе"}),s.jsx(Is,{children:u.analyzing})]}),s.jsxs(Ds,{children:[s.jsx("h3",{children:"Проанализировано"}),s.jsx(Is,{children:u.analyzed})]}),s.jsxs(Ds,{children:[s.jsx("h3",{children:"Опубликовано"}),s.jsx(Is,{children:u.published})]})]}),s.jsxs(So,{children:[s.jsx(wo,{children:"Загрузка новых изображений"}),s.jsx(tE,{onUploadComplete:h})]}),s.jsxs(So,{children:[s.jsx(wo,{children:"Загруженные изображения"}),s.jsxs(hE,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Имя файла"}),s.jsx("th",{children:"Дата загрузки"}),s.jsx("th",{children:"Статус"}),s.jsx("th",{children:"Действия"})]})}),s.jsx("tbody",{children:n.map(y=>s.jsxs("tr",{children:[s.jsx("td",{children:y.original_name}),s.jsx("td",{children:new Date(y.upload_date).toLocaleDateString()}),s.jsx("td",{children:s.jsxs(fE,{status:y.status,children:[y.status==="uploaded"&&"Загружено",y.status==="analyzing"&&"Анализируется",y.status==="analyzed"&&"Проанализировано",y.status==="review_pending"&&"На проверке",y.status==="published"&&"Опубликовано",y.status==="rejected"&&"Отклонено"]})}),s.jsxs("td",{children:[s.jsx(Cr,{onClick:()=>g(y),children:t?.artwork_id===y.artwork_id?"Выбрано":"Выбрать"}),y.status==="analyzed"&&s.jsx(Cr,{onClick:p,children:"Повторный анализ"})]})]},y.artwork_id))})]})]}),t&&r&&s.jsxs(So,{children:[s.jsxs(wo,{children:["Анализ изображения: ",t.original_name]}),s.jsx(df,{analysis:r,artwork:l,onArtworkChange:v}),s.jsx(Cr,{onClick:x,children:"Сохранить карточку и отправить на проверку"}),s.jsx(Cr,{onClick:m,children:"Опубликовать (для подтвержденных карточек)"}),s.jsx(Cr,{onClick:p,children:"Повторный анализ"})]})]})},nu=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,mE=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,gE=re.h1`
  color: #333;
  margin: 0;
`,iu=re.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,ru=re.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,Us=re.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  ${({variant:n})=>{switch(n){case"success":return"background-color: #4caf50; color: white;";case"danger":return"background-color: #f44336; color: white;";default:return"background-color: #6200ee; color: white;"}}}

  &:hover {
    opacity: 0.9;
  }
`,xE=re.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
`,_E=re.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:n})=>{switch(n){case"pending":return"#2196f3";case"approved":return"#4caf50";case"rejected":return"#f44336";case"needs_revision":return"#ff9800";default:return"#9e9e9e"}}};
  color: white;
`,vE=re.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
  min-height: 100px;
`,yE=()=>{const[n,e]=V.useState([]),[t,i]=V.useState(null),[r,a]=V.useState(""),[l,o]=V.useState(!0);V.useEffect(()=>{(async()=>{try{const g=await Zt.getSubmissionsForReview();e(g)}catch(g){console.error("Ошибка при загрузке материалов на проверку:",g)}finally{o(!1)}})()},[]);const c=h=>{i(h),a(h.reviewer_notes||"")},d=async()=>{if(!t){alert("Сначала выберите материал для одобрения");return}try{await Zt.approveSubmission(t.submission_id,{...t.artwork_upload.artwork_data,status:"published",reviewed_by:1,reviewed_at:new Date}),e(h=>h.map(g=>g.submission_id===t.submission_id?{...g,status:"approved"}:g)),alert("Материал одобрен и опубликован")}catch(h){console.error("Ошибка при одобрении материала:",h),alert("Ошибка при одобрении материала")}},u=async()=>{if(!t){alert("Сначала выберите материал для отклонения");return}try{await Zt.rejectSubmission(t.submission_id,r),e(h=>h.map(g=>g.submission_id===t.submission_id?{...g,status:"rejected",reviewer_notes:r}:g)),alert("Материал отклонен")}catch(h){console.error("Ошибка при отклонении материала:",h),alert("Ошибка при отклонении материала")}},f=async()=>{if(!t){alert("Сначала выберите материал для возврата на доработку");return}try{await Zt.rejectSubmission(t.submission_id,r),e(h=>h.map(g=>g.submission_id===t.submission_id?{...g,status:"needs_revision",reviewer_notes:r}:g)),alert("Материал возвращен на доработку")}catch(h){console.error("Ошибка при возврате на доработку:",h),alert("Ошибка при возврате на доработку")}};return l?s.jsx(nu,{children:"Загрузка материалов на проверку..."}):s.jsxs(nu,{children:[s.jsx(mE,{children:s.jsx(gE,{children:"Проверка карточек экспонатов"})}),s.jsxs(iu,{children:[s.jsx(ru,{children:"Материалы на проверке"}),s.jsxs(xE,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Имя файла"}),s.jsx("th",{children:"Загружено пользователем"}),s.jsx("th",{children:"Дата загрузки"}),s.jsx("th",{children:"Статус"}),s.jsx("th",{children:"Действия"})]})}),s.jsx("tbody",{children:n.map(h=>s.jsxs("tr",{children:[s.jsx("td",{children:h.artwork_upload.original_name}),s.jsx("td",{children:h.submitted_by}),s.jsx("td",{children:new Date(h.submitted_at).toLocaleDateString()}),s.jsx("td",{children:s.jsxs(_E,{status:h.status,children:[h.status==="pending"&&"На проверке",h.status==="approved"&&"Одобрено",h.status==="rejected"&&"Отклонено",h.status==="needs_revision"&&"Требует доработки"]})}),s.jsx("td",{children:s.jsx(Us,{variant:"primary",onClick:()=>c(h),children:"Просмотреть"})})]},h.submission_id))})]})]}),t&&s.jsxs(iu,{children:[s.jsxs(ru,{children:["Просмотр карточки: ",t.artwork_upload.original_name]}),s.jsx(df,{analysis:t.artwork_upload.analysis_result,artwork:t.artwork_upload.artwork_data||{},onArtworkChange:()=>{}}),s.jsx(vE,{value:r,onChange:h=>a(h.target.value),placeholder:"Комментарии к проверке (необходимы при отклонении или возврате на доработку)"}),s.jsx(Us,{variant:"success",onClick:d,children:"Одобрить и опубликовать"}),s.jsx(Us,{variant:"danger",onClick:u,children:"Отклонить"}),s.jsx(Us,{variant:"primary",onClick:f,children:"Вернуть на доработку"})]}),n.length===0&&s.jsx("p",{children:"Нет материалов, ожидающих проверки"})]})},bE=re.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,SE=re.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`,wE=re.div`
  border: 2px dashed ${n=>n.isDragOver?"#3498db":"#bdc3c7"};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: ${n=>(n.isDragOver,"#f8f9fa")};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    border-color: #3498db;
  }
`,EE=re.div`
  font-size: 3rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
`,su=re.p`
  color: #7f8c8d;
  margin: 0.5rem 0;
`,ME=re.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;re.div`
  margin-top: 1.5rem;
`;re.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
  display: block;
  margin: 0 auto;
`;const TE=re.div`
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`,AE=re.div`
  height: 100%;
  background-color: #3498db;
  width: ${n=>n.width}%;
  transition: width 0.3s ease;
`,RE=re.div`
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
  background-color: ${n=>n.type==="success"?"#d4edda":n.type==="error"?"#f8d7da":"#d1ecf1"};
  color: ${n=>n.type==="success"?"#155724":n.type==="error"?"#721c24":"#0c5460"};
`,CE=re.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e8f4fd;
  border-radius: 4px;
  font-size: 0.9rem;
`,NE=()=>{const[n,e]=V.useState([]),[t,i]=V.useState([]),[r,a]=V.useState(!1),[l,o]=V.useState(0),[c,d]=V.useState(0),[u,f]=V.useState(0),[h,g]=V.useState(!1),[v,x]=V.useState(null),[m,p]=V.useState(1),[y,_]=V.useState("drag"),[E,S]=V.useState(""),[A,T]=V.useState(!1),[N,b]=V.useState(Zt.getCacheInfo()),M=V.useRef(null);V.useEffect(()=>{const L=setInterval(()=>{b(Zt.getCacheInfo())},5e3);return()=>clearInterval(L)},[]);const I=L=>{if(L.target.files&&L.target.files.length>0){const G=Array.from(L.target.files);k(G)}},k=L=>{const G=[];let B="";for(const Q of L)if(Q.type.startsWith("image/")){if(Q.size>10*1024*1024){B="Размер файла не должен превышать 10MB";break}G.push(Q)}else if(y==="archive"&&(Q.type==="application/zip"||Q.name.endsWith(".zip")))G.push(Q);else{B="Пожалуйста, выберите изображения или ZIP-архив с изображениями";break}if(B){x({type:"error",message:B});return}e(Q=>[...Q,...G]),x(null)},$=L=>{L.preventDefault(),a(!0)},P=()=>{a(!1)},z=L=>{if(L.preventDefault(),a(!1),L.dataTransfer.files&&L.dataTransfer.files.length>0){const G=Array.from(L.dataTransfer.files);k(G)}},J=L=>{L.preventDefault(),E.trim()&&(i(G=>[...G,E]),S(""),x({type:"info",message:`Добавлена ссылка: ${E}`}))},K=async()=>{if(n.length===0&&t.length===0){x({type:"error",message:"Пожалуйста, добавьте изображения или ссылки для загрузки"});return}g(!0),o(0),f(0);let L=n.length;y==="archive"&&(L=1),d(L),x({type:"info",message:"Загрузка изображений..."});try{if(y==="archive"&&n.length>0){for(const B of n)if(B.type==="application/zip"||B.name.endsWith(".zip")){x({type:"info",message:`Извлечение файлов из архива ${B.name}...`}),await new Promise(O=>setTimeout(O,1e3));const Q=5;d(Q);for(let O=0;O<Q;O++){f(Y=>Y+1);const ye=Math.round((O+1)/Q*100);o(ye),await new Promise(Y=>setTimeout(Y,200))}}}else for(let B=0;B<n.length;B++){const Q=n[B];f(B+1);const O=Math.round((B+1)/n.length*100);o(O),x({type:"info",message:`Загрузка файла ${B+1} из ${n.length}: ${Q.name}`});const ye=await Zt.uploadImage(Q,m);await new Promise(Y=>setTimeout(Y,300))}for(let B=0;B<t.length;B++){const Q=t[B];f(Y=>Y+1);const O=n.length+t.length,ye=Math.round((n.length+B+1)/O*100);o(ye),x({type:"info",message:`Загрузка по ссылке ${B+1} из ${t.length}: ${Q}`}),await new Promise(Y=>setTimeout(Y,500))}x({type:"success",message:`Все файлы успешно загружены! Обработано: ${n.length} файлов, ${t.length} ссылок.`}),x({type:"info",message:"Запуск ИИ-анализа и генерации миниатюр..."}),await new Promise(B=>setTimeout(B,2e3)),x({type:"success",message:"ИИ-анализ завершен! Миниатюры сгенерированы, водяные знаки добавлены."}),window.confirm("Хотите создать NFT для загруженных произведений?")&&(x({type:"info",message:"Создание NFT..."}),await new Promise(B=>setTimeout(B,1500)),x({type:"success",message:"NFT успешно сформированы и готовы к размещению в блокчейне!"})),e([]),i([]),o(0),f(0),d(0),M.current&&(M.current.value="")}catch(G){console.error("Ошибка при загрузке изображений:",G),x({type:"error",message:`Ошибка при загрузке: ${G.message}`})}finally{g(!1)}},ae=()=>{M.current&&M.current.click()},ee=L=>{e(G=>G.filter((B,Q)=>Q!==L))},ie=L=>{i(G=>G.filter((B,Q)=>Q!==L))},D=()=>{Zt.clearCache(),x({type:"success",message:"Кэш изображений очищен"})};return s.jsxs(bE,{children:[s.jsx(SE,{children:"Загрузка изображений экспонатов"}),s.jsxs("div",{style:{marginBottom:"1rem"},children:[s.jsxs("label",{children:[s.jsx("input",{type:"radio",checked:y==="drag",onChange:()=>_("drag")})," Загрузка файлов"]}),s.jsxs("label",{style:{marginLeft:"1rem"},children:[s.jsx("input",{type:"radio",checked:y==="archive",onChange:()=>_("archive")})," Загрузка архива"]}),s.jsxs("label",{style:{marginLeft:"1rem"},children:[s.jsx("input",{type:"radio",checked:y==="url",onChange:()=>{_("url"),T(!0)}})," Загрузка по ссылке"]})]}),A&&s.jsxs("form",{onSubmit:J,style:{marginBottom:"1rem"},children:[s.jsx("input",{type:"text",value:E,onChange:L=>S(L.target.value),placeholder:"Введите URL изображения",style:{width:"70%",padding:"0.5rem",marginRight:"0.5rem",borderRadius:"4px",border:"1px solid #ccc"}}),s.jsx("button",{type:"submit",style:{padding:"0.5rem 1rem",backgroundColor:"#3498db",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Добавить"})]}),s.jsxs(wE,{isDragOver:r,onDragOver:$,onDragLeave:P,onDrop:z,onClick:y!=="url"?ae:void 0,children:[s.jsx(EE,{children:"📁"}),s.jsx(su,{children:y==="archive"?"Перетащите ZIP-архив с изображениями сюда или нажмите для выбора":"Перетащите изображения сюда или нажмите для выбора"}),s.jsx(su,{children:s.jsx("small",{children:y==="archive"?"Поддерживаемые форматы: ZIP (макс. 50MB)":"Поддерживаемые форматы: JPG, PNG, GIF (макс. 10MB)"})}),s.jsx("input",{type:"file",ref:M,onChange:I,accept:y==="archive"?".zip,application/zip":"image/*",multiple:y!=="archive",style:{display:"none"}})]}),n.length>0&&s.jsxs("div",{style:{marginTop:"1rem"},children:[s.jsx("h4",{children:"Выбранные файлы:"}),s.jsx("ul",{children:n.map((L,G)=>s.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsxs("span",{children:[L.name," (",(L.size/1024/1024).toFixed(2)," MB)"]}),s.jsx("button",{onClick:()=>ee(G),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},G))})]}),t.length>0&&s.jsxs("div",{style:{marginTop:"1rem"},children:[s.jsx("h4",{children:"Ссылки для загрузки:"}),s.jsx("ul",{children:t.map((L,G)=>s.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx("span",{children:L}),s.jsx("button",{onClick:()=>ie(G),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},G))})]}),l>0&&s.jsxs(s.Fragment,{children:[s.jsx(TE,{children:s.jsx(AE,{width:l})}),s.jsxs("div",{style:{textAlign:"center",fontSize:"0.9rem",color:"#7f8c8d"},children:[u," из ",c||n.length+t.length," файлов обработано (",l,"%)"]})]}),v&&s.jsx(RE,{type:v.type,children:v.message}),s.jsxs(CE,{children:[s.jsxs("div",{children:["Кэш изображений: ",(N.size/1024/1024).toFixed(2)," MB / ",(N.maxSize/1024/1024).toFixed(0)," MB"]}),s.jsxs("div",{children:["Количество закэшированных изображений: ",N.count]}),s.jsx("button",{onClick:D,style:{marginTop:"0.5rem",padding:"0.25rem 0.5rem",backgroundColor:"#f39c12",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.8rem"},children:"Очистить кэш"})]}),s.jsx("div",{style:{textAlign:"center"},children:s.jsx(ME,{onClick:K,disabled:n.length===0&&t.length===0||h,children:h?"Загрузка...":"Загрузить и обработать"})})]})},PE=re.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`,LE=re.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,jE=re.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,DE=re.aside`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  overflow-y: auto;
`,IE=re.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #fafafa;
`,UE=re.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: ${n=>n.active?"#34495e":"transparent"};
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`,OE=re.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
`,FE=({title:n,children:e,activeNav:t,onNavClick:i,userRole:r})=>{const a=r==="admin"?["Overview","Users","Artworks","Collections","Exhibitions","Auctions","Reports","Settings"]:["Overview","Artworks","Collections","Exhibitions","Reports"];return s.jsxs(PE,{children:[s.jsxs(LE,{children:[s.jsx(OE,{children:n}),s.jsxs("div",{children:["Welcome, ",r.charAt(0).toUpperCase()+r.slice(1),"!"]})]}),s.jsxs(jE,{children:[s.jsx(DE,{children:a.map(l=>s.jsx(UE,{active:t===l.toLowerCase(),onClick:()=>i(l.toLowerCase()),children:l},l))}),s.jsx(IE,{children:e})]})]})},kE=re.div`
  padding: 2rem;
`,BE=()=>s.jsx(FE,{title:"Загрузка экспонатов",activeNav:"artworks",onNavClick:()=>{},userRole:"admin",children:s.jsx(kE,{children:s.jsx(NE,{})})}),zE=re.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,HE=re.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  max-width: 300px;
`,GE=re.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  gap: 1rem;
`,au=re.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`,VE=({artworks:n,onArtworkClick:e,onExitVR:t})=>{const i=V.useRef(null),r=V.useRef(null),a=V.useRef(null),l=V.useRef(null),o=V.useRef(null),c=V.useRef(null),d=V.useRef({}),u=V.useRef(new h1),f=V.useRef(new $e),[h,g]=V.useState({fps:0,objects:0}),v=V.useRef(new Map);V.useEffect(()=>{if(!i.current)return;const E=new ef;E.background=new ot(1118483),E.fog=new bl(1118483,10,30),r.current=E;const S=new Kt(75,window.innerWidth/window.innerHeight,.1,1e3);S.position.set(0,1.6,5),a.current=S;const A=new yl({antialias:!0,powerPreference:"high-performance",alpha:!0});A.setSize(window.innerWidth,window.innerHeight),A.setPixelRatio(Math.min(window.devicePixelRatio,2)),A.shadowMap.enabled=!0,A.shadowMap.type=Mh,A.toneMapping=Ah,A.toneMappingExposure=1.2,A.xr.enabled=!0,i.current.appendChild(A.domElement),l.current=A;const T=x(E);m(E),y(E,n);const N=new af(S,A.domElement);N.enableDamping=!0,N.dampingFactor=.05,o.current=N;let b=0,M=performance.now();const I=()=>{S&&A&&(S.aspect=window.innerWidth/window.innerHeight,S.updateProjectionMatrix(),A.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",I);const k=()=>{c.current=requestAnimationFrame(k),N&&N.update(),b++;const $=performance.now();if($>=M+1e3){const P=Math.round(b*1e3/($-M));g({fps:P,objects:E.children.length}),b=0,M=$}A&&E&&S&&A.render(E,S)};return k(),()=>{window.removeEventListener("resize",I),c.current&&cancelAnimationFrame(c.current),v.current.forEach($=>$.dispose()),v.current.clear(),i.current&&A?.domElement&&i.current.removeChild(A.domElement),A?.domElement.removeEventListener("click",_),A&&(A.dispose(),E.traverse($=>{$.geometry&&$.geometry.dispose(),$.material&&(Array.isArray($.material)?$.material.forEach(P=>P.dispose()):$.material.dispose())})),T.forEach($=>$.removeFromParent())}},[n]);const x=E=>{const S=[],A=new sf(16777215,.4);E.add(A),S.push(A);const T=new rf(16777215,.8);return T.position.set(5,10,7),T.castShadow=!0,T.shadow.mapSize.width=2048,T.shadow.mapSize.height=2048,T.shadow.camera.near=.5,T.shadow.camera.far=50,T.shadow.camera.left=-10,T.shadow.camera.right=10,T.shadow.camera.top=10,T.shadow.camera.bottom=-10,E.add(T),S.push(T),n.slice(0,20).forEach((b,M)=>{const I=new nf(16768426,.6);I.position.set(-6+M%4*4,4,-8+Math.floor(M/4)*-4),I.castShadow=!0,I.angle=Math.PI/6,I.penumbra=.2,I.decay=2,I.distance=20,I.shadow.mapSize.width=512,I.shadow.mapSize.height=512,I.shadow.camera.near=.5,I.shadow.camera.far=20,E.add(I),S.push(I)}),S},m=E=>{const S=new Hn(40,40),A=new un({color:3355443,roughness:.8,metalness:.2}),T=new gt(S,A);T.rotation.x=-Math.PI/2,T.receiveShadow=!0,E.add(T);const N=new Vn(40,8,.5),b=new un({color:4473924,roughness:.7,metalness:.3}),M=new gt(N,b);M.position.z=-20,M.position.y=4,M.castShadow=!1,M.receiveShadow=!0,E.add(M);const I=new gt(N,b);I.position.x=-20,I.position.y=4,I.rotation.y=Math.PI/2,I.castShadow=!1,I.receiveShadow=!0,E.add(I);const k=new gt(N,b);k.position.x=20,k.position.y=4,k.rotation.y=Math.PI/2,k.castShadow=!1,k.receiveShadow=!0,E.add(k);const $=new Hn(40,40),P=new un({color:2236962,roughness:.9,metalness:.1}),z=new gt($,P);z.rotation.x=Math.PI/2,z.position.y=8,z.castShadow=!1,E.add(z),p(E)},p=E=>{const S=new ba(.5,.5,8,16),A=new un({color:8947848,roughness:.6,metalness:.2}),T=new l1(S,A,4),N=new yt;for(let b=0;b<4;b++)N.setPosition(-15+b*10,4,-18),T.setMatrixAt(b,N);T.instanceMatrix.needsUpdate=!0,T.castShadow=!0,T.receiveShadow=!0,E.add(T)},y=(E,S)=>{Object.values(d.current).forEach(A=>{A.parent&&A.parent.remove(A)}),d.current={},S.forEach((A,T)=>{const N=-6+T%4*4,b=-8+Math.floor(T/4)*-4,M=2,I=new jr;I.position.set(N,M,b),E.add(I);const k=new Vn(2.5,2.5,.1),$=new un({color:9127187,metalness:.3,roughness:.7}),P=new gt(k,$);P.userData={type:"artwork",artworkId:A.artwork_id,artwork:A},I.add(P);const z=new Hn(2.3,2.3);let J=null;if(A.image_url&&v.current.has(A.image_url))J=v.current.get(A.image_url);else if(A.image_url){const ee=document.createElement("canvas");ee.width=512,ee.height=512;const ie=ee.getContext("2d");ie.fillStyle="#aaaaaa",ie.fillRect(0,0,ee.width,ee.height),ie.fillStyle="#ffffff",ie.font="20px Arial",ie.textAlign="center",ie.fillText(A.title||"Artwork",ee.width/2,ee.height/2);const D=new c1(ee);v.current.set(A.image_url,D),J=D}const K=new un({map:J||void 0,color:J?16777215:11184810,emissive:J?3355443:2236962,roughness:.5,metalness:.1,side:An}),ae=new gt(z,K);ae.position.z=.06,ae.userData={type:"artwork",artworkId:A.artwork_id,artwork:A},I.add(ae),d.current[A.artwork_id]=ae})},_=E=>{if(!a.current||!l.current||!r.current)return;const S=l.current.domElement.getBoundingClientRect();f.current.x=(E.clientX-S.left)/S.width*2-1,f.current.y=-((E.clientY-S.top)/S.height)*2+1,u.current.setFromCamera(f.current,a.current);const A=Object.values(d.current),T=u.current.intersectObjects(A);if(T.length>0){const N=T[0].object;N.userData&&N.userData.artwork&&e(N.userData.artwork)}};return V.useEffect(()=>{const E=l.current?.domElement;if(E)return E.addEventListener("click",_),()=>{E.removeEventListener("click",_)}},[]),s.jsxs(zE,{ref:i,children:[s.jsxs(HE,{children:[s.jsx("h3",{children:"Виртуальная галерея"}),s.jsx("p",{children:"Используйте мышь для навигации по галерее"}),s.jsxs("p",{children:["Всего экспонатов: ",n.length]}),s.jsxs("p",{children:["FPS: ",h.fps]}),s.jsxs("p",{children:["Объектов: ",h.objects]})]}),s.jsxs(GE,{children:[s.jsx(au,{onClick:()=>l.current?.xr.isPresenting?l.current.xr.getSession()?.end():null,children:l.current?.xr.isPresenting?"Выйти из VR":"Войти в VR"}),s.jsx(au,{onClick:t,children:"Назад к галерее"})]})]})},WE=re.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`,XE=re.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`,qE=re.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,$E=re.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,YE=re.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
`,KE=re.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,ZE=()=>{const[n,e]=V.useState([]),[t,i]=V.useState(!0),[r,a]=V.useState(null),[l,o]=V.useState(null);V.useEffect(()=>{(async()=>{try{const h=await xt.get("http://localhost:5000/api/artworks");e(h.data)}catch(h){console.error("Ошибка при загрузке экспонатов:",h),a("Не удалось загрузить экспонаты")}finally{i(!1)}})()},[]);const c=f=>{o(f)},d=()=>{o(null)},u=()=>{window.history.back()};return t?s.jsx(WE,{children:"Загрузка виртуальной галереи..."}):r?s.jsx(XE,{children:r}):s.jsxs("div",{children:[s.jsx(VE,{artworks:n,onArtworkClick:c,onExitVR:u}),l&&s.jsx(qE,{onClick:d,children:s.jsxs($E,{onClick:f=>f.stopPropagation(),children:[s.jsx(YE,{onClick:d,children:"×"}),s.jsx("h2",{children:l.title}),s.jsxs("p",{children:[s.jsx("strong",{children:"Художник:"})," ",l.artist_name]}),l.year_created&&s.jsxs("p",{children:[s.jsx("strong",{children:"Год создания:"})," ",l.year_created]}),l.medium&&s.jsxs("p",{children:[s.jsx("strong",{children:"Материал:"})," ",l.medium]}),l.style&&s.jsxs("p",{children:[s.jsx("strong",{children:"Стиль:"})," ",l.style]}),l.dimensions&&s.jsxs("p",{children:[s.jsx("strong",{children:"Размеры:"})," ",l.dimensions]}),l.description&&s.jsxs("p",{children:[s.jsx("strong",{children:"Описание:"})," ",l.description]}),l.image_url&&s.jsx(KE,{src:l.image_url,alt:l.title,onError:f=>{const h=f.target;h.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})},JE=()=>{const[n,e]=V.useState([{id:"1",title:"Абстрактная композиция №1",artist:"Александр Петров",year:2020,description:"Экспериментальная работа, исследующая взаимодействие цвета и формы.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","современное","краски"],likes:124,views:1240,rating:4.7,category:"Живопись",medium:"Масло"},{id:"2",title:"Городской пейзаж",artist:"Мария Иванова",year:2022,description:"Реалистичное изображение городской архитектуры в вечернем свете.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","реализм","город"],likes:89,views:890,rating:4.5,category:"Живопись",medium:"Акварель"},{id:"3",title:"Цифровая инсталляция",artist:"Анна Смирнова",year:2023,description:"Интерактивная инсталляция, реагирующая на движения посетителей.",imageUrl:"/placeholder-artwork.jpg",tags:["цифровое","инсталляция","интерактив"],likes:210,views:2100,rating:4.9,category:"Инсталляция",medium:"Цифровое"},{id:"4",title:"Портрет женщины",artist:"Дмитрий Козлов",year:2019,description:"Выразительный портрет, передающий внутреннее состояние модели.",imageUrl:"/placeholder-artwork.jpg",tags:["портрет","классическое","масло"],likes:156,views:1560,rating:4.6,category:"Портрет",medium:"Масло"},{id:"5",title:"Морской пейзаж",artist:"Елена Васильева",year:2021,description:"Романтичный образ морского побережья в разное время суток.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","романтизм","акварель"],likes:78,views:780,rating:4.3,category:"Пейзаж",medium:"Акварель"},{id:"6",title:"Геометрическая абстракция",artist:"Сергей Новиков",year:2023,description:"Современная интерпретация геометрических форм и линий.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","геометрия","современное"],likes:95,views:950,rating:4.4,category:"Живопись",medium:"Акрил"}]),[t,i]=V.useState(""),[r,a]=V.useState("all"),[l,o]=V.useState("rating"),[c,d]=V.useState("grid"),[u,f]=V.useState("all"),[h,g]=V.useState("all"),v=n.filter(y=>{const _=y.title.toLowerCase().includes(t.toLowerCase())||y.artist.toLowerCase().includes(t.toLowerCase())||y.description.toLowerCase().includes(t.toLowerCase()),E=r==="all"||y.tags.includes(r),S=u==="all"||y.category===u,A=h==="all"||y.medium===h;return _&&E&&S&&A}).sort((y,_)=>l==="rating"?_.rating-y.rating:l==="likes"?_.likes-y.likes:l==="views"?_.views-y.views:l==="year"?_.year-y.year:l==="title"?y.title.localeCompare(_.title):0),x=Array.from(new Set(n.flatMap(y=>y.tags))),m=Array.from(new Set(n.map(y=>y.category))),p=Array.from(new Set(n.map(y=>y.medium)));return s.jsxs("div",{className:"container mx-auto px-4 py-8",children:[s.jsxs("div",{className:"mb-8 text-center",children:[s.jsx("h1",{className:"text-4xl font-bold mb-4",children:"Экспонаты галереи"}),s.jsx("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto",children:"Исследуйте разнообразные произведения искусства от талантливых художников со всего мира"})]}),s.jsxs("div",{className:"mb-8",children:[s.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[s.jsxs("div",{className:"flex-1 relative",children:[s.jsx(ua,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),s.jsx("input",{placeholder:"Поиск экспонатов...",value:t,onChange:y=>i(y.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg"})]}),s.jsxs("div",{className:"flex gap-2",children:[s.jsx(fe,{variant:c==="grid"?"default":"outline",size:"sm",onClick:()=>d("grid"),children:s.jsx(zu,{className:"h-4 w-4"})}),s.jsx(fe,{variant:c==="list"?"default":"outline",size:"sm",onClick:()=>d("list"),children:s.jsx(Hu,{className:"h-4 w-4"})})]})]}),s.jsxs("div",{className:"flex flex-wrap gap-4 mb-6",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(Wu,{className:"h-4 w-4 text-muted-foreground"}),s.jsx("span",{className:"text-sm font-medium",children:"Фильтры:"})]}),s.jsxs("div",{className:"flex flex-wrap gap-2",children:[s.jsxs("select",{value:u,onChange:y=>f(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[s.jsx("option",{value:"all",children:"Все категории"}),m.map(y=>s.jsx("option",{value:y,children:y},y))]}),s.jsxs("select",{value:h,onChange:y=>g(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[s.jsx("option",{value:"all",children:"Все техники"}),p.map(y=>s.jsx("option",{value:y,children:y},y))]}),s.jsxs("select",{value:r,onChange:y=>a(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[s.jsx("option",{value:"all",children:"Все теги"}),x.map(y=>s.jsx("option",{value:y,children:y},y))]}),s.jsxs("select",{value:l,onChange:y=>o(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[s.jsx("option",{value:"rating",children:"По рейтингу"}),s.jsx("option",{value:"likes",children:"По популярности"}),s.jsx("option",{value:"views",children:"По просмотрам"}),s.jsx("option",{value:"year",children:"По году создания"}),s.jsx("option",{value:"title",children:"По названию"})]})]})]})]}),c==="grid"?s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:v.map(y=>s.jsxs(Ue,{className:"overflow-hidden flex flex-col h-full group",children:[s.jsxs("div",{className:"relative",children:[s.jsx("div",{className:"bg-muted aspect-square flex items-center justify-center",children:s.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:s.jsxs("div",{className:"text-center p-8",children:[s.jsx("div",{className:"bg-primary/10 p-4 rounded-full inline-block mb-4",children:s.jsx(Na,{className:"h-12 w-12 text-primary"})}),s.jsx("h3",{className:"text-xl font-bold",children:y.title}),s.jsx("p",{className:"text-muted-foreground",children:y.artist})]})})}),s.jsxs("div",{className:"absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",children:[s.jsx(fe,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:s.jsx(fn,{className:"h-4 w-4"})}),s.jsx(fe,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:s.jsx(Vu,{className:"h-4 w-4"})})]})]}),s.jsxs(Oe,{className:"pb-3",children:[s.jsx(Fe,{className:"text-lg",children:y.title}),s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsxs(ze,{children:["Автор: ",y.artist]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),s.jsx("span",{className:"text-sm",children:y.rating.toFixed(1)})]})]})]}),s.jsx(ke,{className:"flex-grow",children:s.jsxs("div",{className:"space-y-3",children:[s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(kl,{className:"h-4 w-4 mr-2"}),s.jsx("span",{children:y.year})]}),s.jsx("p",{className:"text-sm text-muted-foreground line-clamp-2",children:y.description}),s.jsx("div",{className:"flex flex-wrap gap-2 mt-2",children:y.tags.map(_=>s.jsx(vt,{variant:"secondary",className:"text-xs",children:_},_))}),s.jsxs("div",{className:"flex justify-between text-sm mt-4 pt-4 border-t",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(fn,{className:"h-4 w-4 mr-1 text-red-500"}),s.jsx("span",{children:y.likes})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(Rn,{className:"h-4 w-4 mr-1"}),s.jsx("span",{children:y.views})]}),s.jsxs(fe,{variant:"outline",size:"sm",className:"text-xs",children:[s.jsx(Na,{className:"h-3 w-3 mr-1"}),"Профиль художника"]})]}),s.jsxs(fe,{className:"w-full mt-4",children:[s.jsx(Rn,{className:"h-4 w-4 mr-2"}),"Подробнее"]})]})})]},y.id))}):s.jsx("div",{className:"space-y-4",children:v.map(y=>s.jsxs(Ue,{className:"flex flex-col sm:flex-row",children:[s.jsx("div",{className:"bg-muted sm:w-48 aspect-square sm:aspect-auto flex items-center justify-center",children:s.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:s.jsx(Na,{className:"h-12 w-12 text-primary"})})}),s.jsxs("div",{className:"flex-1 flex flex-col",children:[s.jsx(Oe,{className:"pb-3 sm:pb-2",children:s.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2",children:[s.jsxs("div",{children:[s.jsx(Fe,{className:"text-xl",children:y.title}),s.jsxs(ze,{children:["Автор: ",y.artist]})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),s.jsx("span",{className:"text-sm",children:y.rating.toFixed(1)})]})]})}),s.jsxs(ke,{className:"flex-1 flex flex-col sm:flex-row",children:[s.jsxs("div",{className:"sm:flex-1",children:[s.jsx("p",{className:"text-sm text-muted-foreground mb-3",children:y.description}),s.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:y.tags.map(_=>s.jsx(vt,{variant:"secondary",className:"text-xs",children:_},_))})]}),s.jsxs("div",{className:"flex flex-col justify-between sm:items-end",children:[s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground mb-2",children:[s.jsx(kl,{className:"h-4 w-4 mr-2"}),s.jsx("span",{children:y.year})]}),s.jsxs("div",{className:"flex gap-4",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(fn,{className:"h-4 w-4 mr-1 text-red-500"}),s.jsx("span",{children:y.likes})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(Rn,{className:"h-4 w-4 mr-1"}),s.jsx("span",{children:y.views})]})]}),s.jsxs("div",{className:"flex gap-2 mt-4",children:[s.jsxs(fe,{variant:"outline",size:"sm",children:[s.jsx(fn,{className:"h-4 w-4 mr-2"}),"Нравится"]}),s.jsxs(fe,{size:"sm",children:[s.jsx(Rn,{className:"h-4 w-4 mr-2"}),"Подробнее"]})]})]})]})]})]},y.id))}),v.length===0&&s.jsxs("div",{className:"text-center py-12",children:[s.jsx("div",{className:"bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",children:s.jsx(Bm,{className:"h-12 w-12 text-primary"})}),s.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Экспонаты не найдены"}),s.jsx("p",{className:"text-muted-foreground mb-6",children:"Попробуйте изменить параметры поиска"}),s.jsx(fe,{variant:"outline",onClick:()=>{i(""),a("all"),f("all"),g("all")},children:"Сбросить фильтры"})]}),v.length>0&&s.jsx("div",{className:"flex justify-center mt-12",children:s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(fe,{variant:"outline",size:"sm",children:"Предыдущая"}),s.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(y=>s.jsx(fe,{variant:y===1?"default":"outline",size:"sm",className:"w-10",children:y},y))}),s.jsx(fe,{variant:"outline",size:"sm",children:"Следующая"})]})})]})},QE=()=>{const[n,e]=V.useState([{id:"1",name:"Галерея современного искусства",description:"Коллекция современных произведений искусства от ведущих художников 21 века.",location:"Центральный район, ул. Искусств, 15",openingHours:"Ежедневно 10:00-20:00",visitorCount:12500,tags:["современное","экспериментальное","цифровое"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.8,artworksCount:1240},{id:"2",name:"Классическая галерея",description:"Шедевры живописи и скульптуры от мастеров прошлых эпох.",location:"Исторический квартал, пр. Культуры, 42",openingHours:"Пн-Пт 9:00-18:00, Сб-Вс 10:00-17:00",visitorCount:8700,tags:["классическое","живопись","скульптура"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.7,artworksCount:850},{id:"3",name:"Галерея цифрового искусства",description:"Инновационные работы, созданные с использованием цифровых технологий.",location:"Технопарк, здание 5, эт. 3",openingHours:"Круглосуточно",visitorCount:5400,tags:["цифровое","интерактивное","VR"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.6,artworksCount:420},{id:"4",name:"Галерея народного искусства",description:"Традиционные ремесла и народные промыслы со всего мира.",location:"Этноквартал, ул. Ремесел, 7",openingHours:"Пн-Вс 11:00-19:00",visitorCount:3200,tags:["народное","ремесла","традиции"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.5,artworksCount:680},{id:"5",name:"Музей импрессионизма",description:"Коллекция работ импрессионистов 19-го века.",location:"Парк культуры, ул. Художников, 25",openingHours:"Вт-Вс 10:00-18:00",visitorCount:7200,tags:["импрессионизм","19 век","франция"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.9,artworksCount:320},{id:"6",name:"Современные инсталляции",description:"Интерактивные и мультимедийные инсталляции современных художников.",location:"Арт-квартал, ул. Инноваций, 8",openingHours:"Пн-Сб 12:00-21:00",visitorCount:4100,tags:["инсталляция","интерактив","цифровое"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.4,artworksCount:150}]),[t,i]=V.useState(""),[r,a]=V.useState("all"),[l,o]=V.useState("rating"),[c,d]=V.useState("grid"),u=n.filter(h=>{const g=h.name.toLowerCase().includes(t.toLowerCase())||h.description.toLowerCase().includes(t.toLowerCase()),v=r==="all"||h.tags.includes(r);return g&&v}).sort((h,g)=>l==="rating"?g.rating-h.rating:l==="visitors"?g.visitorCount-h.visitorCount:l==="artworks"?g.artworksCount-h.artworksCount:l==="name"?h.name.localeCompare(g.name):0),f=Array.from(new Set(n.flatMap(h=>h.tags)));return s.jsxs("div",{className:"container mx-auto px-4 py-8",children:[s.jsxs("div",{className:"mb-8 text-center",children:[s.jsx("h1",{className:"text-4xl font-bold mb-4",children:"Виртуальные галереи"}),s.jsx("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto",children:"Исследуйте разнообразные коллекции искусства со всего мира в immersive 3D-окружении"})]}),s.jsxs("div",{className:"mb-8",children:[s.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[s.jsxs("div",{className:"flex-1 relative",children:[s.jsx(ua,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),s.jsx("input",{placeholder:"Поиск галерей...",value:t,onChange:h=>i(h.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg"})]}),s.jsxs("div",{className:"flex gap-2",children:[s.jsx(fe,{variant:c==="grid"?"default":"outline",size:"sm",onClick:()=>d("grid"),children:s.jsx(zu,{className:"h-4 w-4"})}),s.jsx(fe,{variant:c==="list"?"default":"outline",size:"sm",onClick:()=>d("list"),children:s.jsx(Hu,{className:"h-4 w-4"})})]})]}),s.jsxs("div",{className:"flex flex-wrap gap-4 mb-6",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(Wu,{className:"h-4 w-4 text-muted-foreground"}),s.jsx("span",{className:"text-sm font-medium",children:"Фильтры:"})]}),s.jsxs("div",{className:"flex flex-wrap gap-2",children:[s.jsxs("select",{value:r,onChange:h=>a(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[s.jsx("option",{value:"all",children:"Все теги"}),f.map(h=>s.jsx("option",{value:h,children:h},h))]}),s.jsxs("select",{value:l,onChange:h=>o(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[s.jsx("option",{value:"rating",children:"По рейтингу"}),s.jsx("option",{value:"visitors",children:"По популярности"}),s.jsx("option",{value:"artworks",children:"По числу экспонатов"}),s.jsx("option",{value:"name",children:"По названию"})]})]})]})]}),c==="grid"?s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:u.map(h=>s.jsxs(Ue,{className:"overflow-hidden flex flex-col h-full group",children:[h.featured&&s.jsx("div",{className:"bg-primary text-primary-foreground text-center py-1 text-sm font-medium",children:"Рекомендуем"}),s.jsxs("div",{className:"relative",children:[s.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:s.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:s.jsxs("div",{className:"text-center p-8",children:[s.jsx("div",{className:"bg-primary/10 p-4 rounded-full inline-block mb-4",children:s.jsx(St,{className:"h-12 w-12 text-primary"})}),s.jsx("h3",{className:"text-xl font-bold",children:h.name}),s.jsx("p",{className:"text-muted-foreground",children:"Галерея"})]})})}),s.jsxs("div",{className:"absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",children:[s.jsx(fe,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:s.jsx(fn,{className:"h-4 w-4"})}),s.jsx(fe,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:s.jsx(Vu,{className:"h-4 w-4"})})]})]}),s.jsxs(Oe,{className:"pb-3",children:[s.jsxs("div",{className:"flex justify-between items-start",children:[s.jsx(Fe,{children:h.name}),s.jsxs(vt,{variant:"outline",className:"self-start",children:[h.visitorCount.toLocaleString()," посетителей"]})]}),s.jsx(ze,{children:h.description})]}),s.jsx(ke,{className:"flex-grow",children:s.jsxs("div",{className:"space-y-3",children:[s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(Or,{className:"h-4 w-4 mr-2"}),s.jsx("span",{children:h.location})]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(Ei,{className:"h-4 w-4 mr-2"}),s.jsx("span",{children:h.openingHours})]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(St,{className:"h-4 w-4 mr-2"}),s.jsxs("span",{children:[h.artworksCount," экспонатов"]})]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),s.jsxs("span",{children:[h.rating.toFixed(1)," (",h.visitorCount," оценок)"]})]}),s.jsx("div",{className:"flex flex-wrap gap-2 mt-4",children:h.tags.map(g=>s.jsx(vt,{variant:"secondary",children:g},g))}),s.jsxs("div",{className:"flex justify-between mt-4 pt-4 border-t",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(Sn,{className:"h-4 w-4 mr-1 text-muted-foreground"}),s.jsx("span",{className:"text-sm",children:h.visitorCount.toLocaleString()})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),s.jsx("span",{className:"text-sm",children:h.rating.toFixed(1)})]})]}),s.jsxs(fe,{className:"w-full mt-4",children:[s.jsx(Rn,{className:"h-4 w-4 mr-2"}),"Посетить галерею"]})]})})]},h.id))}):s.jsx("div",{className:"space-y-6",children:u.map(h=>s.jsxs(Ue,{className:"flex flex-col sm:flex-row",children:[s.jsx("div",{className:"bg-muted sm:w-64 aspect-video sm:aspect-auto flex items-center justify-center",children:s.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:s.jsx(St,{className:"h-16 w-16 text-primary"})})}),s.jsxs("div",{className:"flex-1 flex flex-col",children:[s.jsx(Oe,{className:"pb-3 sm:pb-2",children:s.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2",children:[s.jsxs("div",{children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(Fe,{children:h.name}),h.featured&&s.jsx(vt,{variant:"default",children:"Рекомендуем"})]}),s.jsx(ze,{children:h.description})]}),s.jsxs(vt,{variant:"outline",children:[h.visitorCount.toLocaleString()," посетителей"]})]})}),s.jsxs(ke,{className:"flex-1 flex flex-col sm:flex-row",children:[s.jsxs("div",{className:"sm:flex-1",children:[s.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4",children:[s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(Or,{className:"h-4 w-4 mr-2"}),s.jsx("span",{children:h.location})]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(Ei,{className:"h-4 w-4 mr-2"}),s.jsx("span",{children:h.openingHours})]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(St,{className:"h-4 w-4 mr-2"}),s.jsxs("span",{children:[h.artworksCount," экспонатов"]})]}),s.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[s.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),s.jsxs("span",{children:[h.rating.toFixed(1)," (",h.visitorCount," оценок)"]})]})]}),s.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:h.tags.map(g=>s.jsx(vt,{variant:"secondary",className:"text-xs",children:g},g))})]}),s.jsxs("div",{className:"flex flex-col justify-between sm:items-end",children:[s.jsxs("div",{className:"flex gap-4 mb-4 sm:mb-0",children:[s.jsxs("div",{className:"flex items-center",children:[s.jsx(Sn,{className:"h-4 w-4 mr-1 text-muted-foreground"}),s.jsx("span",{className:"text-sm",children:h.visitorCount.toLocaleString()})]}),s.jsxs("div",{className:"flex items-center",children:[s.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),s.jsx("span",{className:"text-sm",children:h.rating.toFixed(1)})]})]}),s.jsxs(fe,{className:"w-full sm:w-auto",children:[s.jsx(Rn,{className:"h-4 w-4 mr-2"}),"Посетить галерею"]})]})]})]})]},h.id))}),u.length===0&&s.jsxs("div",{className:"text-center py-12",children:[s.jsx("div",{className:"bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",children:s.jsx(St,{className:"h-12 w-12 text-primary"})}),s.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Галереи не найдены"}),s.jsx("p",{className:"text-muted-foreground mb-6",children:"Попробуйте изменить параметры поиска"}),s.jsx(fe,{variant:"outline",onClick:()=>{i(""),a("all")},children:"Сбросить фильтры"})]}),u.length>0&&s.jsx("div",{className:"flex justify-center mt-12",children:s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(fe,{variant:"outline",size:"sm",children:"Предыдущая"}),s.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(h=>s.jsx(fe,{variant:h===1?"default":"outline",size:"sm",className:"w-10",children:h},h))}),s.jsx(fe,{variant:"outline",size:"sm",children:"Следующая"})]})})]})},eM=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`,tM=()=>s.jsxs(eM,{children:[s.jsx("h1",{children:"Виртуальные туры"}),s.jsx("p",{children:"Здесь будет отображаться информация о доступных виртуальных турах по галерее."})]}),nM=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`,iM=()=>s.jsxs(nM,{children:[s.jsx("h1",{children:"Коллекции"}),s.jsx("p",{children:"Здесь будет отображаться информация о различных коллекциях произведений искусства."})]}),rM=Rf,sM=Cf,aM=Tf,uf=V.forwardRef(({className:n,...e},t)=>s.jsx(hu,{className:Ct("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",n),...e,ref:t}));uf.displayName=hu.displayName;const oM=il("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",{variants:{side:{top:"inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",bottom:"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",left:"inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"}},defaultVariants:{side:"right"}}),hf=V.forwardRef(({side:n="right",className:e,children:t,...i},r)=>s.jsxs(aM,{children:[s.jsx(uf,{}),s.jsxs(fu,{ref:r,className:Ct(oM({side:n}),e),...i,children:[t,s.jsxs(Af,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",children:[s.jsx(Gm,{className:"h-4 w-4"}),s.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));hf.displayName=fu.displayName;const lM=V.forwardRef(({className:n,...e},t)=>s.jsx(pu,{ref:t,className:Ct("text-lg font-semibold text-foreground",n),...e}));lM.displayName=pu.displayName;const cM=V.forwardRef(({className:n,...e},t)=>s.jsx(mu,{ref:t,className:Ct("text-sm text-muted-foreground",n),...e}));cM.displayName=mu.displayName;const dM=({currentUser:n,onLogout:e})=>{const[t,i]=V.useState(!1),r=Lf(),a=()=>{e(),i(!1)},l=d=>r.pathname===d,c=(()=>{if(!n)return[{title:"Главная",path:"/",icon:di},{title:"Галереи",path:"/galleries",icon:St},{title:"Экспонаты",path:"/artworks",icon:Ut}];switch(n.role){case"admin":return[{title:"Главная",path:"/",icon:di},{title:"Галереи",path:"/galleries",icon:St},{title:"Экспонаты",path:"/artworks",icon:Ut},{title:"Пользователи",path:"/admin/users",icon:Sn},{title:"Админ-панель",path:"/admin",icon:Wl},{title:"Загрузка",path:"/artwork-upload",icon:Ut}];case"curator":return[{title:"Главная",path:"/",icon:di},{title:"Галереи",path:"/galleries",icon:St},{title:"Экспонаты",path:"/artworks",icon:Ut},{title:"Куратор",path:"/curator",icon:kt},{title:"Загрузка",path:"/artwork-upload",icon:Ut},{title:"Рецензии",path:"/curator-review",icon:Wl}];case"staff":return[{title:"Главная",path:"/",icon:di},{title:"Галереи",path:"/galleries",icon:St},{title:"Экспонаты",path:"/artworks",icon:Ut},{title:"Сотрудник",path:"/staff",icon:Sn},{title:"Загрузка",path:"/artwork-upload",icon:Ut},{title:"Дашборд",path:"/staff-dashboard",icon:Dm}];case"tour_guide":return[{title:"Главная",path:"/",icon:di},{title:"Галереи",path:"/galleries",icon:St},{title:"Экспонаты",path:"/artworks",icon:Ut},{title:"Организатор туров",path:"/tour-guide",icon:Ys},{title:"Туры",path:"/tours",icon:Ys}];case"auction_participant":return[{title:"Главная",path:"/",icon:di},{title:"Галереи",path:"/galleries",icon:St},{title:"Экспонаты",path:"/artworks",icon:Ut},{title:"Участник аукциона",path:"/auction-participant",icon:Po}];default:return[{title:"Главная",path:"/",icon:di},{title:"Галереи",path:"/galleries",icon:St},{title:"Экспонаты",path:"/artworks",icon:Ut},{title:"Коллекции",path:"/collections",icon:Gu}]}})();return s.jsx("header",{className:"sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",children:s.jsxs("div",{className:"container flex h-16 items-center",children:[s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsxs(rM,{open:t,onOpenChange:i,children:[s.jsx(sM,{asChild:!0,children:s.jsxs(fe,{variant:"ghost",size:"icon",className:"shrink-0 md:hidden",children:[s.jsx(Um,{className:"h-5 w-5"}),s.jsx("span",{className:"sr-only",children:"Переключить меню"})]})}),s.jsxs(hf,{side:"left",className:"w-64",children:[s.jsxs("div",{className:"flex items-center gap-2 py-4",children:[s.jsx(St,{className:"h-6 w-6"}),s.jsx("span",{className:"text-xl font-bold",children:"Виртуальная галерея"})]}),s.jsxs("nav",{className:"flex flex-col gap-2",children:[c.map(d=>s.jsxs(mt,{to:d.path,className:`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${l(d.path)?"bg-primary text-primary-foreground":"hover:bg-accent hover:text-accent-foreground"}`,onClick:()=>i(!1),children:[s.jsx(d.icon,{className:"h-4 w-4"}),d.title]},d.path)),n&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"my-2 h-px bg-border"}),s.jsxs("button",{onClick:a,className:"flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground",children:[s.jsx(Hl,{className:"h-4 w-4"}),"Выйти"]})]})]})]})]}),s.jsxs(mt,{to:"/",className:"flex items-center gap-2",children:[s.jsx(St,{className:"h-6 w-6"}),s.jsx("span",{className:"text-xl font-bold hidden sm:block",children:"Виртуальная галерея"})]})]}),s.jsx("nav",{className:"mx-6 hidden md:flex items-center gap-2",children:c.slice(0,5).map(d=>s.jsxs(mt,{to:d.path,className:`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${l(d.path)?"bg-primary text-primary-foreground":"hover:bg-accent hover:text-accent-foreground"}`,children:[s.jsx(d.icon,{className:"h-4 w-4"}),s.jsx("span",{className:"hidden sm:inline",children:d.title})]},d.path))}),s.jsxs("div",{className:"flex flex-1 items-center justify-end gap-4",children:[n?s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsxs("span",{className:"hidden sm:inline text-sm font-medium",children:["Привет, ",n.username]}),s.jsxs(fe,{onClick:a,variant:"outline",size:"sm",children:[s.jsx(Hl,{className:"h-4 w-4 sm:mr-2"}),s.jsx("span",{className:"hidden sm:inline",children:"Выйти"})]})]}):s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(mt,{to:"/login",children:s.jsx(fe,{variant:"outline",size:"sm",children:"Войти"})}),s.jsx(mt,{to:"/register",children:s.jsx(fe,{size:"sm",children:"Регистрация"})})]}),s.jsxs(fe,{variant:"ghost",size:"icon",className:"relative",children:[s.jsx(Mm,{className:"h-5 w-5"}),s.jsx("span",{className:"absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-white",children:"3"})]}),s.jsxs(fe,{variant:"secondary",size:"icon",className:"rounded-full",children:[s.jsx(Cm,{className:"h-5 w-5"}),s.jsx("span",{className:"sr-only",children:"Профиль"})]})]})]})})},uM=()=>s.jsx("footer",{className:"bg-background border-t",children:s.jsxs("div",{className:"container py-12 md:py-16",children:[s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-8",children:[s.jsxs("div",{children:[s.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[s.jsx(jm,{className:"h-6 w-6 text-primary"}),s.jsx("span",{className:"text-xl font-bold",children:"Виртуальная галерея"})]}),s.jsx("p",{className:"text-muted-foreground text-sm",children:"Современная платформа для просмотра и управления коллекциями произведений искусства в виртуальной среде."})]}),s.jsxs("div",{children:[s.jsx("h3",{className:"text-sm font-semibold mb-4",children:"Навигация"}),s.jsxs("ul",{className:"space-y-2",children:[s.jsx("li",{children:s.jsx(mt,{to:"/",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Главная"})}),s.jsx("li",{children:s.jsx(mt,{to:"/galleries",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Галереи"})}),s.jsx("li",{children:s.jsx(mt,{to:"/artworks",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Экспонаты"})}),s.jsx("li",{children:s.jsx(mt,{to:"/tours",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Виртуальные туры"})})]})]}),s.jsxs("div",{children:[s.jsx("h3",{className:"text-sm font-semibold mb-4",children:"Поддержка"}),s.jsxs("ul",{className:"space-y-2",children:[s.jsx("li",{children:s.jsx(mt,{to:"/help",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Помощь"})}),s.jsx("li",{children:s.jsx(mt,{to:"/faq",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Частые вопросы"})}),s.jsx("li",{children:s.jsx(mt,{to:"/contact",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Контакты"})}),s.jsx("li",{children:s.jsx(mt,{to:"/privacy",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Конфиденциальность"})})]})]}),s.jsxs("div",{children:[s.jsx("h3",{className:"text-sm font-semibold mb-4",children:"Контакты"}),s.jsxs("ul",{className:"space-y-3",children:[s.jsxs("li",{className:"flex items-center gap-2 text-muted-foreground text-sm",children:[s.jsx(Im,{className:"h-4 w-4"}),s.jsx("span",{children:"info@virtualgallery.com"})]}),s.jsxs("li",{className:"flex items-center gap-2 text-muted-foreground text-sm",children:[s.jsx(Om,{className:"h-4 w-4"}),s.jsx("span",{children:"+7 (XXX) XXX-XX-XX"})]}),s.jsxs("li",{className:"flex items-center gap-2 text-muted-foreground text-sm",children:[s.jsx(Or,{className:"h-4 w-4"}),s.jsx("span",{children:"Москва, ул. Искусств, 15"})]}),s.jsx("li",{className:"flex items-center gap-2",children:s.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",className:"text-muted-foreground hover:text-foreground transition-colors",children:s.jsx(Lm,{className:"h-5 w-5"})})})]})]})]}),s.jsxs("div",{className:"border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center",children:[s.jsxs("p",{className:"text-muted-foreground text-sm",children:["© ",new Date().getFullYear()," Виртуальная галерея искусств. Все права защищены."]}),s.jsxs("div",{className:"flex gap-6 mt-4 md:mt-0",children:[s.jsx(mt,{to:"/terms",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Условия использования"}),s.jsx(mt,{to:"/privacy",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Политика конфиденциальности"})]})]})]})}),hM=()=>{const[n,e]=V.useState(null),[t,i]=V.useState(null);V.useEffect(()=>{const l=Bs(window.location.origin,{path:"/socket.io"});return i(l),localStorage.getItem("authToken"),()=>{l.close()}},[]);const r=l=>{e(l)},a=()=>{e(null),localStorage.removeItem("authToken")};return s.jsx(jf,{children:s.jsxs("div",{className:"flex flex-col min-h-screen bg-background",children:[s.jsx(dM,{currentUser:n,onLogout:a}),s.jsx("div",{className:"flex flex-1",children:s.jsx("main",{className:"flex-1 p-4 md:p-6",children:s.jsxs(Df,{children:[s.jsx(Et,{path:"/",element:s.jsx(Vm,{})}),s.jsx(Et,{path:"/artworks",element:s.jsx(JE,{})}),s.jsx(Et,{path:"/artworks/:id",element:s.jsx(n_,{})}),s.jsx(Et,{path:"/vr-gallery",element:s.jsx(_1,{})}),s.jsx(Et,{path:"/galleries",element:s.jsx(QE,{})}),s.jsx(Et,{path:"/galleries/:id",element:s.jsx(w1,{})}),s.jsx(Et,{path:"/rooms/:id",element:s.jsx(G1,{})}),s.jsx(Et,{path:"/galleries/:galleryId/rooms/manage",element:n?.role==="curator"||n?.role==="admin"?s.jsx(C1,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/staff-dashboard",element:n?.role==="staff"||n?.role==="admin"?s.jsx(pE,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/curator-review",element:n?.role==="curator"||n?.role==="admin"?s.jsx(yE,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/artwork-upload",element:n?.role==="admin"||n?.role==="curator"?s.jsx(BE,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/virtual-gallery",element:s.jsx(ZE,{})}),s.jsx(Et,{path:"/tours",element:s.jsx(tM,{})}),s.jsx(Et,{path:"/collections",element:s.jsx(iM,{})}),s.jsx(Et,{path:"/admin",element:n?.role==="admin"?s.jsx(qm,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/curator",element:n?.role==="curator"?s.jsx($m,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/staff",element:n?.role==="staff"?s.jsx(Ym,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/tour-guide",element:n?.role==="tour_guide"?s.jsx(Km,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/auction-participant",element:n?.role==="auction_participant"?s.jsx(Zm,{}):s.jsx(pn,{to:"/login"})}),s.jsx(Et,{path:"/login",element:n?s.jsx(pn,{to:"/"}):s.jsx(Vx,{onLogin:r})}),s.jsx(Et,{path:"/register",element:n?s.jsx(pn,{to:"/"}):s.jsx(Wx,{onRegister:r})})]})})}),s.jsx(uM,{})]})})};Of.createRoot(document.getElementById("root")).render(s.jsx(Hr.StrictMode,{children:s.jsx(hM,{})}));

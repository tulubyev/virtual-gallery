import{j as r,c as _f,T as ou,I as yf,P as bf,C as lu,V as wf,L as cu,a as du,b as Sf,d as Ef,S as uu,R as Mf,e as Tf}from"./ui-CdlxpsQg.js";import{e as Af,g as hu,a as z,L as _t,c as Rf,u as oa,R as Br,f as la,h as Cf,B as Nf,i as Pf,j as vt,N as fn}from"./router-DO4-FiBH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();var Zr={},Rl;function Lf(){if(Rl)return Zr;Rl=1;var n=Af();return Zr.createRoot=n.createRoot,Zr.hydrateRoot=n.hydrateRoot,Zr}var jf=Lf();const Df=hu(jf),Cn=Object.create(null);Cn.open="0";Cn.close="1";Cn.ping="2";Cn.pong="3";Cn.message="4";Cn.upgrade="5";Cn.noop="6";const Os=Object.create(null);Object.keys(Cn).forEach(n=>{Os[Cn[n]]=n});const Mo={type:"error",data:"parser error"},fu=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",pu=typeof ArrayBuffer=="function",mu=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,Jo=({type:n,data:e},t,i)=>fu&&e instanceof Blob?t?i(e):Cl(e,i):pu&&(e instanceof ArrayBuffer||mu(e))?t?i(e):Cl(new Blob([e]),i):i(Cn[n]+(e||"")),Cl=(n,e)=>{const t=new FileReader;return t.onload=function(){const i=t.result.split(",")[1];e("b"+(i||""))},t.readAsDataURL(n)};function Nl(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let Ta;function If(n,e){if(fu&&n.data instanceof Blob)return n.data.arrayBuffer().then(Nl).then(e);if(pu&&(n.data instanceof ArrayBuffer||mu(n.data)))return e(Nl(n.data));Jo(n,!1,t=>{Ta||(Ta=new TextEncoder),e(Ta.encode(t))})}const Pl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Cr=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<Pl.length;n++)Cr[Pl.charCodeAt(n)]=n;const Uf=n=>{let e=n.length*.75,t=n.length,i,s=0,a,l,o,c;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);const d=new ArrayBuffer(e),u=new Uint8Array(d);for(i=0;i<t;i+=4)a=Cr[n.charCodeAt(i)],l=Cr[n.charCodeAt(i+1)],o=Cr[n.charCodeAt(i+2)],c=Cr[n.charCodeAt(i+3)],u[s++]=a<<2|l>>4,u[s++]=(l&15)<<4|o>>2,u[s++]=(o&3)<<6|c&63;return d},Of=typeof ArrayBuffer=="function",Qo=(n,e)=>{if(typeof n!="string")return{type:"message",data:gu(n,e)};const t=n.charAt(0);return t==="b"?{type:"message",data:kf(n.substring(1),e)}:Os[t]?n.length>1?{type:Os[t],data:n.substring(1)}:{type:Os[t]}:Mo},kf=(n,e)=>{if(Of){const t=Uf(n);return gu(t,e)}else return{base64:!0,data:n}},gu=(n,e)=>e==="blob"?n instanceof Blob?n:new Blob([n]):n instanceof ArrayBuffer?n:n.buffer,xu="",Ff=(n,e)=>{const t=n.length,i=new Array(t);let s=0;n.forEach((a,l)=>{Jo(a,!1,o=>{i[l]=o,++s===t&&e(i.join(xu))})})},Bf=(n,e)=>{const t=n.split(xu),i=[];for(let s=0;s<t.length;s++){const a=Qo(t[s],e);if(i.push(a),a.type==="error")break}return i};function zf(){return new TransformStream({transform(n,e){If(n,t=>{const i=t.length;let s;if(i<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,i);else if(i<65536){s=new Uint8Array(3);const a=new DataView(s.buffer);a.setUint8(0,126),a.setUint16(1,i)}else{s=new Uint8Array(9);const a=new DataView(s.buffer);a.setUint8(0,127),a.setBigUint64(1,BigInt(i))}n.data&&typeof n.data!="string"&&(s[0]|=128),e.enqueue(s),e.enqueue(t)})}})}let Aa;function Jr(n){return n.reduce((e,t)=>e+t.length,0)}function Qr(n,e){if(n[0].length===e)return n.shift();const t=new Uint8Array(e);let i=0;for(let s=0;s<e;s++)t[s]=n[0][i++],i===n[0].length&&(n.shift(),i=0);return n.length&&i<n[0].length&&(n[0]=n[0].slice(i)),t}function Hf(n,e){Aa||(Aa=new TextDecoder);const t=[];let i=0,s=-1,a=!1;return new TransformStream({transform(l,o){for(t.push(l);;){if(i===0){if(Jr(t)<1)break;const c=Qr(t,1);a=(c[0]&128)===128,s=c[0]&127,s<126?i=3:s===126?i=1:i=2}else if(i===1){if(Jr(t)<2)break;const c=Qr(t,2);s=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),i=3}else if(i===2){if(Jr(t)<8)break;const c=Qr(t,8),d=new DataView(c.buffer,c.byteOffset,c.length),u=d.getUint32(0);if(u>Math.pow(2,21)-1){o.enqueue(Mo);break}s=u*Math.pow(2,32)+d.getUint32(4),i=3}else{if(Jr(t)<s)break;const c=Qr(t,s);o.enqueue(Qo(a?c:Aa.decode(c),e)),i=0}if(s===0||s>n){o.enqueue(Mo);break}}}})}const vu=4;function At(n){if(n)return Gf(n)}function Gf(n){for(var e in At.prototype)n[e]=At.prototype[e];return n}At.prototype.on=At.prototype.addEventListener=function(n,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(e),this};At.prototype.once=function(n,e){function t(){this.off(n,t),e.apply(this,arguments)}return t.fn=e,this.on(n,t),this};At.prototype.off=At.prototype.removeListener=At.prototype.removeAllListeners=At.prototype.removeEventListener=function(n,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+n];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var i,s=0;s<t.length;s++)if(i=t[s],i===e||i.fn===e){t.splice(s,1);break}return t.length===0&&delete this._callbacks["$"+n],this};At.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+n],i=1;i<arguments.length;i++)e[i-1]=arguments[i];if(t){t=t.slice(0);for(var i=0,s=t.length;i<s;++i)t[i].apply(this,e)}return this};At.prototype.emitReserved=At.prototype.emit;At.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};At.prototype.hasListeners=function(n){return!!this.listeners(n).length};const ca=typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0),ln=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),Vf="arraybuffer";function _u(n,...e){return e.reduce((t,i)=>(n.hasOwnProperty(i)&&(t[i]=n[i]),t),{})}const Wf=ln.setTimeout,Xf=ln.clearTimeout;function da(n,e){e.useNativeTimers?(n.setTimeoutFn=Wf.bind(ln),n.clearTimeoutFn=Xf.bind(ln)):(n.setTimeoutFn=ln.setTimeout.bind(ln),n.clearTimeoutFn=ln.clearTimeout.bind(ln))}const qf=1.33;function $f(n){return typeof n=="string"?Yf(n):Math.ceil((n.byteLength||n.size)*qf)}function Yf(n){let e=0,t=0;for(let i=0,s=n.length;i<s;i++)e=n.charCodeAt(i),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(i++,t+=4);return t}function yu(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function Kf(n){let e="";for(let t in n)n.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(n[t]));return e}function Zf(n){let e={},t=n.split("&");for(let i=0,s=t.length;i<s;i++){let a=t[i].split("=");e[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}return e}class Jf extends Error{constructor(e,t,i){super(e),this.description=t,this.context=i,this.type="TransportError"}}class el extends At{constructor(e){super(),this.writable=!1,da(this,e),this.opts=e,this.query=e.query,this.socket=e.socket,this.supportsBinary=!e.forceBase64}onError(e,t,i){return super.emitReserved("error",new Jf(e,t,i)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=Qo(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}createUri(e,t={}){return e+"://"+this._hostname()+this._port()+this.opts.path+this._query(t)}_hostname(){const e=this.opts.hostname;return e.indexOf(":")===-1?e:"["+e+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(e){const t=Kf(e);return t.length?"?"+t:""}}class Qf extends el{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this._polling||!this.writable){let i=0;this._polling&&(i++,this.once("pollComplete",function(){--i||t()})),this.writable||(i++,this.once("drain",function(){--i||t()}))}else t()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=i=>{if(this.readyState==="opening"&&i.type==="open"&&this.onOpen(),i.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(i)};Bf(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,Ff(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const e=this.opts.secure?"https":"http",t=this.query||{};return this.opts.timestampRequests!==!1&&(t[this.opts.timestampParam]=yu()),!this.supportsBinary&&!t.sid&&(t.b64=1),this.createUri(e,t)}}let bu=!1;try{bu=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const ep=bu;function tp(){}class np extends Qf{constructor(e){if(super(e),typeof location<"u"){const t=location.protocol==="https:";let i=location.port;i||(i=t?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||i!==e.port}}doWrite(e,t){const i=this.request({method:"POST",data:e});i.on("success",t),i.on("error",(s,a)=>{this.onError("xhr post error",s,a)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,i)=>{this.onError("xhr poll error",t,i)}),this.pollXhr=e}}class An extends At{constructor(e,t,i){super(),this.createRequest=e,da(this,i),this._opts=i,this._method=i.method||"GET",this._uri=t,this._data=i.data!==void 0?i.data:null,this._create()}_create(){var e;const t=_u(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");t.xdomain=!!this._opts.xd;const i=this._xhr=this.createRequest(t);try{i.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){i.setDisableHeaderCheck&&i.setDisableHeaderCheck(!0);for(let s in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(s)&&i.setRequestHeader(s,this._opts.extraHeaders[s])}}catch{}if(this._method==="POST")try{i.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{i.setRequestHeader("Accept","*/*")}catch{}(e=this._opts.cookieJar)===null||e===void 0||e.addCookies(i),"withCredentials"in i&&(i.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(i.timeout=this._opts.requestTimeout),i.onreadystatechange=()=>{var s;i.readyState===3&&((s=this._opts.cookieJar)===null||s===void 0||s.parseCookies(i.getResponseHeader("set-cookie"))),i.readyState===4&&(i.status===200||i.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof i.status=="number"?i.status:0)},0))},i.send(this._data)}catch(s){this.setTimeoutFn(()=>{this._onError(s)},0);return}typeof document<"u"&&(this._index=An.requestsCount++,An.requests[this._index]=this)}_onError(e){this.emitReserved("error",e,this._xhr),this._cleanup(!0)}_cleanup(e){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=tp,e)try{this._xhr.abort()}catch{}typeof document<"u"&&delete An.requests[this._index],this._xhr=null}}_onLoad(){const e=this._xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}An.requestsCount=0;An.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Ll);else if(typeof addEventListener=="function"){const n="onpagehide"in ln?"pagehide":"unload";addEventListener(n,Ll,!1)}}function Ll(){for(let n in An.requests)An.requests.hasOwnProperty(n)&&An.requests[n].abort()}const ip=(function(){const n=wu({xdomain:!1});return n&&n.responseType!==null})();class rp extends np{constructor(e){super(e);const t=e&&e.forceBase64;this.supportsBinary=ip&&!t}request(e={}){return Object.assign(e,{xd:this.xd},this.opts),new An(wu,this.uri(),e)}}function wu(n){const e=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||ep))return new XMLHttpRequest}catch{}if(!e)try{return new ln[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Su=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class sp extends el{get name(){return"websocket"}doOpen(){const e=this.uri(),t=this.opts.protocols,i=Su?{}:_u(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(i.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(e,t,i)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],s=t===e.length-1;Jo(i,this.supportsBinary,a=>{try{this.doWrite(i,a)}catch{}s&&ca(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const e=this.opts.secure?"wss":"ws",t=this.query||{};return this.opts.timestampRequests&&(t[this.opts.timestampParam]=yu()),this.supportsBinary||(t.b64=1),this.createUri(e,t)}}const Ra=ln.WebSocket||ln.MozWebSocket;class ap extends sp{createSocket(e,t,i){return Su?new Ra(e,t,i):t?new Ra(e,t):new Ra(e)}doWrite(e,t){this.ws.send(t)}}class op extends el{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(e){return this.emitReserved("error",e)}this._transport.closed.then(()=>{this.onClose()}).catch(e=>{this.onError("webtransport error",e)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(e=>{const t=Hf(Number.MAX_SAFE_INTEGER,this.socket.binaryType),i=e.readable.pipeThrough(t).getReader(),s=zf();s.readable.pipeTo(e.writable),this._writer=s.writable.getWriter();const a=()=>{i.read().then(({done:o,value:c})=>{o||(this.onPacket(c),a())}).catch(o=>{})};a();const l={type:"open"};this.query.sid&&(l.data=`{"sid":"${this.query.sid}"}`),this._writer.write(l).then(()=>this.onOpen())})})}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const i=e[t],s=t===e.length-1;this._writer.write(i).then(()=>{s&&ca(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var e;(e=this._transport)===null||e===void 0||e.close()}}const lp={websocket:ap,webtransport:op,polling:rp},cp=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,dp=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function To(n){if(n.length>8e3)throw"URI too long";const e=n,t=n.indexOf("["),i=n.indexOf("]");t!=-1&&i!=-1&&(n=n.substring(0,t)+n.substring(t,i).replace(/:/g,";")+n.substring(i,n.length));let s=cp.exec(n||""),a={},l=14;for(;l--;)a[dp[l]]=s[l]||"";return t!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=up(a,a.path),a.queryKey=hp(a,a.query),a}function up(n,e){const t=/\/{2,9}/g,i=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&i.splice(0,1),e.slice(-1)=="/"&&i.splice(i.length-1,1),i}function hp(n,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(i,s,a){s&&(t[s]=a)}),t}const Ao=typeof addEventListener=="function"&&typeof removeEventListener=="function",ks=[];Ao&&addEventListener("offline",()=>{ks.forEach(n=>n())},!1);class Qn extends At{constructor(e,t){if(super(),this.binaryType=Vf,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,e&&typeof e=="object"&&(t=e,e=null),e){const i=To(e);t.hostname=i.host,t.secure=i.protocol==="https"||i.protocol==="wss",t.port=i.port,i.query&&(t.query=i.query)}else t.host&&(t.hostname=To(t.host).host);da(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},t.transports.forEach(i=>{const s=i.prototype.name;this.transports.push(s),this._transportsByName[s]=i}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=Zf(this.opts.query)),Ao&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},ks.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=vu,t.transport=e,this.id&&(t.sid=this.id);const i=Object.assign({},this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[e]);return new this._transportsByName[e](i)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const e=this.opts.rememberUpgrade&&Qn.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const t=this.createTransport(e);t.open(),this.setTransport(t)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",t=>this._onClose("transport close",t))}onOpen(){this.readyState="open",Qn.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const t=new Error("server error");t.code=e.data,this._onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this._pingInterval=e.pingInterval,this._pingTimeout=e.pingTimeout,this._maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const e=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+e,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},e),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this._getWritablePackets();this.transport.send(e),this._prevBufferLen=e.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let i=0;i<this.writeBuffer.length;i++){const s=this.writeBuffer[i].data;if(s&&(t+=$f(s)),i>0&&t>this._maxPayload)return this.writeBuffer.slice(0,i);t+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const e=Date.now()>this._pingTimeoutTime;return e&&(this._pingTimeoutTime=0,ca(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),e}write(e,t,i){return this._sendPacket("message",e,t,i),this}send(e,t,i){return this._sendPacket("message",e,t,i),this}_sendPacket(e,t,i,s){if(typeof t=="function"&&(s=t,t=void 0),typeof i=="function"&&(s=i,i=null),this.readyState==="closing"||this.readyState==="closed")return;i=i||{},i.compress=i.compress!==!1;const a={type:e,data:t,options:i};this.emitReserved("packetCreate",a),this.writeBuffer.push(a),s&&this.once("flush",s),this.flush()}close(){const e=()=>{this._onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},i=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?i():e()}):this.upgrading?i():e()),this}_onError(e){if(Qn.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",e),this._onClose("transport error",e)}_onClose(e,t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Ao&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const i=ks.indexOf(this._offlineEventListener);i!==-1&&ks.splice(i,1)}this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this._prevBufferLen=0}}}Qn.protocol=vu;class fp extends Qn{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let e=0;e<this._upgrades.length;e++)this._probe(this._upgrades[e])}_probe(e){let t=this.createTransport(e),i=!1;Qn.priorWebsocketSuccess=!1;const s=()=>{i||(t.send([{type:"ping",data:"probe"}]),t.once("packet",p=>{if(!i)if(p.type==="pong"&&p.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;Qn.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{i||this.readyState!=="closed"&&(u(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const h=new Error("probe error");h.transport=t.name,this.emitReserved("upgradeError",h)}}))};function a(){i||(i=!0,u(),t.close(),t=null)}const l=p=>{const h=new Error("probe error: "+p);h.transport=t.name,a(),this.emitReserved("upgradeError",h)};function o(){l("transport closed")}function c(){l("socket closed")}function d(p){t&&p.name!==t.name&&a()}const u=()=>{t.removeListener("open",s),t.removeListener("error",l),t.removeListener("close",o),this.off("close",c),this.off("upgrading",d)};t.once("open",s),t.once("error",l),t.once("close",o),this.once("close",c),this.once("upgrading",d),this._upgrades.indexOf("webtransport")!==-1&&e!=="webtransport"?this.setTimeoutFn(()=>{i||t.open()},200):t.open()}onHandshake(e){this._upgrades=this._filterUpgrades(e.upgrades),super.onHandshake(e)}_filterUpgrades(e){const t=[];for(let i=0;i<e.length;i++)~this.transports.indexOf(e[i])&&t.push(e[i]);return t}}let pp=class extends fp{constructor(e,t={}){const i=typeof e=="object"?e:t;(!i.transports||i.transports&&typeof i.transports[0]=="string")&&(i.transports=(i.transports||["polling","websocket","webtransport"]).map(s=>lp[s]).filter(s=>!!s)),super(e,i)}};function mp(n,e="",t){let i=n;t=t||typeof location<"u"&&location,n==null&&(n=t.protocol+"//"+t.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=t.protocol+n:n=t.host+n),/^(https?|wss?):\/\//.test(n)||(typeof t<"u"?n=t.protocol+"//"+n:n="https://"+n),i=To(n)),i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443")),i.path=i.path||"/";const a=i.host.indexOf(":")!==-1?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+a+":"+i.port+e,i.href=i.protocol+"://"+a+(t&&t.port===i.port?"":":"+i.port),i}const gp=typeof ArrayBuffer=="function",xp=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,Eu=Object.prototype.toString,vp=typeof Blob=="function"||typeof Blob<"u"&&Eu.call(Blob)==="[object BlobConstructor]",_p=typeof File=="function"||typeof File<"u"&&Eu.call(File)==="[object FileConstructor]";function tl(n){return gp&&(n instanceof ArrayBuffer||xp(n))||vp&&n instanceof Blob||_p&&n instanceof File}function Fs(n,e){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let t=0,i=n.length;t<i;t++)if(Fs(n[t]))return!0;return!1}if(tl(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return Fs(n.toJSON(),!0);for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&Fs(n[t]))return!0;return!1}function yp(n){const e=[],t=n.data,i=n;return i.data=Ro(t,e),i.attachments=e.length,{packet:i,buffers:e}}function Ro(n,e){if(!n)return n;if(tl(n)){const t={_placeholder:!0,num:e.length};return e.push(n),t}else if(Array.isArray(n)){const t=new Array(n.length);for(let i=0;i<n.length;i++)t[i]=Ro(n[i],e);return t}else if(typeof n=="object"&&!(n instanceof Date)){const t={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=Ro(n[i],e));return t}return n}function bp(n,e){return n.data=Co(n.data,e),delete n.attachments,n}function Co(n,e){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<e.length)return e[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let t=0;t<n.length;t++)n[t]=Co(n[t],e);else if(typeof n=="object")for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&(n[t]=Co(n[t],e));return n}const wp=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var at;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(at||(at={}));class Sp{constructor(e){this.replacer=e}encode(e){return(e.type===at.EVENT||e.type===at.ACK)&&Fs(e)?this.encodeAsBinary({type:e.type===at.EVENT?at.BINARY_EVENT:at.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===at.BINARY_EVENT||e.type===at.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=yp(e),i=this.encodeAsString(t.packet),s=t.buffers;return s.unshift(i),s}}class nl extends At{constructor(e){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof e=="function"?{reviver:e}:e)}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const i=t.type===at.BINARY_EVENT;i||t.type===at.BINARY_ACK?(t.type=i?at.EVENT:at.ACK,this.reconstructor=new Ep(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(tl(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const i={type:Number(e.charAt(0))};if(at[i.type]===void 0)throw new Error("unknown packet type "+i.type);if(i.type===at.BINARY_EVENT||i.type===at.BINARY_ACK){const a=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const l=e.substring(a,t);if(l!=Number(l)||e.charAt(t)!=="-")throw new Error("Illegal attachments");const o=Number(l);if(!Mp(o)||o<0)throw new Error("Illegal attachments");if(o>this.opts.maxAttachments)throw new Error("too many attachments");i.attachments=o}if(e.charAt(t+1)==="/"){const a=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););i.nsp=e.substring(a,t)}else i.nsp="/";const s=e.charAt(t+1);if(s!==""&&Number(s)==s){const a=t+1;for(;++t;){const l=e.charAt(t);if(l==null||Number(l)!=l){--t;break}if(t===e.length)break}i.id=Number(e.substring(a,t+1))}if(e.charAt(++t)){const a=this.tryParse(e.substr(t));if(nl.isPayloadValid(i.type,a))i.data=a;else throw new Error("invalid payload")}return i}tryParse(e){try{return JSON.parse(e,this.opts.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case at.CONNECT:return jl(t);case at.DISCONNECT:return t===void 0;case at.CONNECT_ERROR:return typeof t=="string"||jl(t);case at.EVENT:case at.BINARY_EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&wp.indexOf(t[0])===-1);case at.ACK:case at.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Ep{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=bp(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Mp=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function jl(n){return Object.prototype.toString.call(n)==="[object Object]"}const Tp=Object.freeze(Object.defineProperty({__proto__:null,Decoder:nl,Encoder:Sp,get PacketType(){return at}},Symbol.toStringTag,{value:"Module"}));function xn(n,e,t){return n.on(e,t),function(){n.off(e,t)}}const Ap=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Mu extends At{constructor(e,t,i){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,i&&i.auth&&(this.auth=i.auth),this._opts=Object.assign({},i),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[xn(e,"open",this.onopen.bind(this)),xn(e,"packet",this.onpacket.bind(this)),xn(e,"error",this.onerror.bind(this)),xn(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){var i,s,a;if(Ap.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const l={type:at.EVENT,data:t};if(l.options={},l.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const u=this.ids++,p=t.pop();this._registerAckCallback(u,p),l.id=u}const o=(s=(i=this.io.engine)===null||i===void 0?void 0:i.transport)===null||s===void 0?void 0:s.writable,c=this.connected&&!(!((a=this.io.engine)===null||a===void 0)&&a._hasPingExpired());return this.flags.volatile&&!o||(c?(this.notifyOutgoingListeners(l),this.packet(l)):this.sendBuffer.push(l)),this.flags={},this}_registerAckCallback(e,t){var i;const s=(i=this.flags.timeout)!==null&&i!==void 0?i:this._opts.ackTimeout;if(s===void 0){this.acks[e]=t;return}const a=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);t.call(this,new Error("operation has timed out"))},s),l=(...o)=>{this.io.clearTimeoutFn(a),t.apply(this,o)};l.withError=!0,this.acks[e]=l}emitWithAck(e,...t){return new Promise((i,s)=>{const a=(l,o)=>l?s(l):i(o);a.withError=!0,t.push(a),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const i={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((s,...a)=>(this._queue[0],s!==null?i.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(s)):(this._queue.shift(),t&&t(null,...a)),i.pending=!1,this._drainQueue())),this._queue.push(i),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:at.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(e=>{if(!this.sendBuffer.some(i=>String(i.id)===e)){const i=this.acks[e];delete this.acks[e],i.withError&&i.call(this,new Error("socket has been disconnected"))}})}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case at.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case at.EVENT:case at.BINARY_EVENT:this.onevent(e);break;case at.ACK:case at.BINARY_ACK:this.onack(e);break;case at.DISCONNECT:this.ondisconnect();break;case at.CONNECT_ERROR:this.destroy();const i=new Error(e.data.message);i.data=e.data.data,this.emitReserved("connect_error",i);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const i of t)i.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let i=!1;return function(...s){i||(i=!0,t.packet({type:at.ACK,id:e,data:s}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(delete this.acks[e.id],t.withError&&e.data.unshift(null),t.apply(this,e.data))}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:at.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let i=0;i<t.length;i++)if(e===t[i])return t.splice(i,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const i of t)i.apply(this,e.data)}}}function dr(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}dr.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*n);n=(Math.floor(e*10)&1)==0?n-t:n+t}return Math.min(n,this.max)|0};dr.prototype.reset=function(){this.attempts=0};dr.prototype.setMin=function(n){this.ms=n};dr.prototype.setMax=function(n){this.max=n};dr.prototype.setJitter=function(n){this.jitter=n};class No extends At{constructor(e,t){var i;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,da(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((i=t.randomizationFactor)!==null&&i!==void 0?i:.5),this.backoff=new dr({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const s=t.parser||Tp;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,e||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new pp(this.uri,this.opts);const t=this.engine,i=this;this._readyState="opening",this.skipReconnect=!1;const s=xn(t,"open",function(){i.onopen(),e&&e()}),a=o=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",o),e?e(o):this.maybeReconnectOnOpen()},l=xn(t,"error",a);if(this._timeout!==!1){const o=this._timeout,c=this.setTimeoutFn(()=>{s(),a(new Error("timeout")),t.close()},o);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(s),this.subs.push(l),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(xn(e,"ping",this.onping.bind(this)),xn(e,"data",this.ondata.bind(this)),xn(e,"error",this.onerror.bind(this)),xn(e,"close",this.onclose.bind(this)),xn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){ca(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let i=this.nsps[e];return i?this._autoConnect&&!i.active&&i.connect():(i=new Mu(this,e,t),this.nsps[e]=i),i}_destroy(e){const t=Object.keys(this.nsps);for(const i of t)if(this.nsps[i].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let i=0;i<t.length;i++)this.engine.write(t[i],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(e,t){var i;this.cleanup(),(i=this.engine)===null||i===void 0||i.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const i=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(s=>{s?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",s)):e.onreconnect()}))},t);this.opts.autoUnref&&i.unref(),this.subs.push(()=>{this.clearTimeoutFn(i)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const mr={};function Bs(n,e){typeof n=="object"&&(e=n,n=void 0),e=e||{};const t=mp(n,e.path||"/socket.io"),i=t.source,s=t.id,a=t.path,l=mr[s]&&a in mr[s].nsps,o=e.forceNew||e["force new connection"]||e.multiplex===!1||l;let c;return o?c=new No(i,e):(mr[s]||(mr[s]=new No(i,e)),c=mr[s]),t.query&&!e.query&&(e.query=t.queryKey),c.socket(t.path,e)}Object.assign(Bs,{Manager:No,Socket:Mu,io:Bs,connect:Bs});const Rp=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Tu=(...n)=>n.filter((e,t,i)=>!!e&&e.trim()!==""&&i.indexOf(e)===t).join(" ").trim();var Cp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Np=z.forwardRef(({color:n="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:i,className:s="",children:a,iconNode:l,...o},c)=>z.createElement("svg",{ref:c,...Cp,width:e,height:e,stroke:n,strokeWidth:i?Number(t)*24/Number(e):t,className:Tu("lucide",s),...o},[...l.map(([d,u])=>z.createElement(d,u)),...Array.isArray(a)?a:[a]]));const Oe=(n,e)=>{const t=z.forwardRef(({className:i,...s},a)=>z.createElement(Np,{ref:a,iconNode:e,className:Tu(`lucide-${Rp(n)}`,i),...s}));return t.displayName=`${n}`,t};const Au=Oe("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);const Ru=Oe("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);const Pp=Oe("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);const Cu=Oe("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);const Dl=Oe("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);const Lp=Oe("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);const Ir=Oe("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);const jp=Oe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);const Dp=Oe("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);const Ip=Oe("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);const Up=Oe("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);const Si=Oe("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);const Op=Oe("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);const Il=Oe("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);const Tn=Oe("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);const Nu=Oe("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);const Pu=Oe("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);const Ul=Oe("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);const rn=Oe("GalleryVerticalEnd",[["path",{d:"M7 2h10",key:"nczekb"}],["path",{d:"M5 6h14",key:"u2x4p"}],["rect",{width:"18",height:"12",x:"3",y:"10",rx:"2",key:"l0tzu3"}]]);const Lu=Oe("Gavel",[["path",{d:"m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8",key:"15492f"}],["path",{d:"m16 16 6-6",key:"vzrcl6"}],["path",{d:"m8 8 6-6",key:"18bi4p"}],["path",{d:"m9 7 8 8",key:"5jnvq1"}],["path",{d:"m21 11-8-8",key:"z4y7zo"}]]);const kp=Oe("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);const ju=Oe("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);const Du=Oe("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);const hn=Oe("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);const vi=Oe("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);const Fp=Oe("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);const Bp=Oe("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);const Iu=Oe("List",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);const zp=Oe("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);const Hp=Oe("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);const $s=Oe("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);const Ol=Oe("Map",[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]]);const Gp=Oe("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);const zs=Oe("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);const Uu=Oe("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);const Vp=Oe("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);const Wp=Oe("PiggyBank",[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",key:"1ivx2i"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1",key:"nm575m"}],["path",{d:"M16 11h.01",key:"xkw8gn"}]]);const kl=Oe("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);const Fl=Oe("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);const ua=Oe("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);const Ou=Oe("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);const ku=Oe("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);const Fu=Oe("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);const kt=Oe("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);const Xp=Oe("Tags",[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19",key:"1cbfv1"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z",key:"135mg7"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor",key:"5pm5xn"}]]);const Bl=Oe("Ticket",[["path",{d:"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",key:"qn84l0"}],["path",{d:"M13 5v2",key:"dyzc3o"}],["path",{d:"M13 17v2",key:"1ont0d"}],["path",{d:"M13 11v2",key:"1wjjxi"}]]);const Ur=Oe("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);const qp=Oe("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);const Ca=Oe("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);const ei=Oe("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);const $p=Oe("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);const Yp=Oe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Kp=[{title:"Галерея",desc:"Исследуйте виртуальные залы с произведениями искусства",path:"/galleries",icon:Fu,color:"bg-indigo-50 text-indigo-600",hover:"hover:bg-indigo-100"},{title:"Аукцион",desc:"Участвуйте в торгах за уникальные произведения",path:"/auction",icon:Lu,color:"bg-orange-50 text-orange-600",hover:"hover:bg-orange-100"},{title:"ArtWiki",desc:"AI-ассистент и энциклопедия искусства",path:"/artwiki",icon:Cu,color:"bg-purple-50 text-purple-600",hover:"hover:bg-purple-100"},{title:"RAG",desc:"Загружайте документы в базу знаний AI",path:"/rag",icon:Nu,color:"bg-teal-50 text-teal-600",hover:"hover:bg-teal-100"}],Zp=()=>r.jsxs("div",{className:"min-h-screen",children:[r.jsx("section",{className:"bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white py-20 px-4",children:r.jsxs("div",{className:"max-w-4xl mx-auto text-center",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6",children:[r.jsx(Fu,{className:"h-4 w-4"}),"Новое поколение виртуальных галерей"]}),r.jsx("h1",{className:"text-4xl md:text-6xl font-bold mb-6 leading-tight",children:"Исследуйте мир искусства в виртуальной реальности"}),r.jsx("p",{className:"text-lg text-indigo-200 max-w-2xl mx-auto mb-10",children:"Погрузитесь в захватывающий мир произведений искусства со всего мира. Создавайте персональные коллекции, участвуйте в виртуальных турах и открывайте новые горизонты искусства."}),r.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[r.jsxs(_t,{to:"/galleries",className:"inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors",children:["Начать исследование",r.jsx(Ru,{className:"h-5 w-5"})]}),r.jsxs(_t,{to:"/about",className:"inline-flex items-center gap-2 px-8 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors",children:[r.jsx(Fp,{className:"h-5 w-5"}),"О платформе"]})]})]})}),r.jsxs("section",{className:"max-w-6xl mx-auto px-4 py-16",children:[r.jsxs("div",{className:"text-center mb-10",children:[r.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-2",children:"Разделы платформы"}),r.jsx("p",{className:"text-gray-500",children:"Выберите нужный раздел для работы"})]}),r.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",children:Kp.map(n=>r.jsxs(_t,{to:n.path,className:`block p-6 bg-white rounded-xl border border-gray-100 shadow-sm ${n.hover} transition-all hover:shadow-md hover:-translate-y-0.5`,children:[r.jsx("div",{className:`inline-flex p-2.5 rounded-lg ${n.color} mb-4`,children:r.jsx(n.icon,{className:"h-6 w-6"})}),r.jsx("h3",{className:"font-semibold text-gray-900 mb-1",children:n.title}),r.jsx("p",{className:"text-sm text-gray-500 leading-snug",children:n.desc})]},n.path))})]}),r.jsxs("section",{className:"bg-gray-50 border-t border-gray-100 py-12 px-4 text-center",children:[r.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-3",children:"Готовы начать своё путешествие в мир искусства?"}),r.jsx("p",{className:"text-gray-500 max-w-xl mx-auto mb-6",children:"Присоединяйтесь к пользователям, которые уже исследуют виртуальные галереи"}),r.jsxs("div",{className:"flex flex-col sm:flex-row gap-3 justify-center",children:[r.jsx(_t,{to:"/register",className:"inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors",children:"Начать бесплатно"}),r.jsx(_t,{to:"/login",className:"inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors",children:"Войти"})]})]})]});function Bu(n){var e,t,i="";if(typeof n=="string"||typeof n=="number")i+=n;else if(typeof n=="object")if(Array.isArray(n)){var s=n.length;for(e=0;e<s;e++)n[e]&&(t=Bu(n[e]))&&(i&&(i+=" "),i+=t)}else for(t in n)n[t]&&(i&&(i+=" "),i+=t);return i}function zu(){for(var n,e,t=0,i="",s=arguments.length;t<s;t++)(n=arguments[t])&&(e=Bu(n))&&(i&&(i+=" "),i+=e);return i}const il="-",Jp=n=>{const e=em(n),{conflictingClassGroups:t,conflictingClassGroupModifiers:i}=n;return{getClassGroupId:l=>{const o=l.split(il);return o[0]===""&&o.length!==1&&o.shift(),Hu(o,e)||Qp(l)},getConflictingClassGroupIds:(l,o)=>{const c=t[l]||[];return o&&i[l]?[...c,...i[l]]:c}}},Hu=(n,e)=>{if(n.length===0)return e.classGroupId;const t=n[0],i=e.nextPart.get(t),s=i?Hu(n.slice(1),i):void 0;if(s)return s;if(e.validators.length===0)return;const a=n.join(il);return e.validators.find(({validator:l})=>l(a))?.classGroupId},zl=/^\[(.+)\]$/,Qp=n=>{if(zl.test(n)){const e=zl.exec(n)[1],t=e?.substring(0,e.indexOf(":"));if(t)return"arbitrary.."+t}},em=n=>{const{theme:e,prefix:t}=n,i={nextPart:new Map,validators:[]};return nm(Object.entries(n.classGroups),t).forEach(([a,l])=>{Po(l,i,a,e)}),i},Po=(n,e,t,i)=>{n.forEach(s=>{if(typeof s=="string"){const a=s===""?e:Hl(e,s);a.classGroupId=t;return}if(typeof s=="function"){if(tm(s)){Po(s(i),e,t,i);return}e.validators.push({validator:s,classGroupId:t});return}Object.entries(s).forEach(([a,l])=>{Po(l,Hl(e,a),t,i)})})},Hl=(n,e)=>{let t=n;return e.split(il).forEach(i=>{t.nextPart.has(i)||t.nextPart.set(i,{nextPart:new Map,validators:[]}),t=t.nextPart.get(i)}),t},tm=n=>n.isThemeGetter,nm=(n,e)=>e?n.map(([t,i])=>{const s=i.map(a=>typeof a=="string"?e+a:typeof a=="object"?Object.fromEntries(Object.entries(a).map(([l,o])=>[e+l,o])):a);return[t,s]}):n,im=n=>{if(n<1)return{get:()=>{},set:()=>{}};let e=0,t=new Map,i=new Map;const s=(a,l)=>{t.set(a,l),e++,e>n&&(e=0,i=t,t=new Map)};return{get(a){let l=t.get(a);if(l!==void 0)return l;if((l=i.get(a))!==void 0)return s(a,l),l},set(a,l){t.has(a)?t.set(a,l):s(a,l)}}},Gu="!",rm=n=>{const{separator:e,experimentalParseClassName:t}=n,i=e.length===1,s=e[0],a=e.length,l=o=>{const c=[];let d=0,u=0,p;for(let m=0;m<o.length;m++){let f=o[m];if(d===0){if(f===s&&(i||o.slice(m,m+a)===e)){c.push(o.slice(u,m)),u=m+a;continue}if(f==="/"){p=m;continue}}f==="["?d++:f==="]"&&d--}const h=c.length===0?o:o.substring(u),g=h.startsWith(Gu),_=g?h.substring(1):h,x=p&&p>u?p-u:void 0;return{modifiers:c,hasImportantModifier:g,baseClassName:_,maybePostfixModifierPosition:x}};return t?o=>t({className:o,parseClassName:l}):l},sm=n=>{if(n.length<=1)return n;const e=[];let t=[];return n.forEach(i=>{i[0]==="["?(e.push(...t.sort(),i),t=[]):t.push(i)}),e.push(...t.sort()),e},am=n=>({cache:im(n.cacheSize),parseClassName:rm(n),...Jp(n)}),om=/\s+/,lm=(n,e)=>{const{parseClassName:t,getClassGroupId:i,getConflictingClassGroupIds:s}=e,a=[],l=n.trim().split(om);let o="";for(let c=l.length-1;c>=0;c-=1){const d=l[c],{modifiers:u,hasImportantModifier:p,baseClassName:h,maybePostfixModifierPosition:g}=t(d);let _=!!g,x=i(_?h.substring(0,g):h);if(!x){if(!_){o=d+(o.length>0?" "+o:o);continue}if(x=i(h),!x){o=d+(o.length>0?" "+o:o);continue}_=!1}const m=sm(u).join(":"),f=p?m+Gu:m,y=f+x;if(a.includes(y))continue;a.push(y);const v=s(x,_);for(let E=0;E<v.length;++E){const b=v[E];a.push(f+b)}o=d+(o.length>0?" "+o:o)}return o};function cm(){let n=0,e,t,i="";for(;n<arguments.length;)(e=arguments[n++])&&(t=Vu(e))&&(i&&(i+=" "),i+=t);return i}const Vu=n=>{if(typeof n=="string")return n;let e,t="";for(let i=0;i<n.length;i++)n[i]&&(e=Vu(n[i]))&&(t&&(t+=" "),t+=e);return t};function dm(n,...e){let t,i,s,a=l;function l(c){const d=e.reduce((u,p)=>p(u),n());return t=am(d),i=t.cache.get,s=t.cache.set,a=o,o(c)}function o(c){const d=i(c);if(d)return d;const u=lm(c,t);return s(c,u),u}return function(){return a(cm.apply(null,arguments))}}const ft=n=>{const e=t=>t[n]||[];return e.isThemeGetter=!0,e},Wu=/^\[(?:([a-z-]+):)?(.+)\]$/i,um=/^\d+\/\d+$/,hm=new Set(["px","full","screen"]),fm=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,pm=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,mm=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,gm=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,xm=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Pn=n=>Qi(n)||hm.has(n)||um.test(n),Gn=n=>ur(n,"length",Mm),Qi=n=>!!n&&!Number.isNaN(Number(n)),Na=n=>ur(n,"number",Qi),gr=n=>!!n&&Number.isInteger(Number(n)),vm=n=>n.endsWith("%")&&Qi(n.slice(0,-1)),Qe=n=>Wu.test(n),Vn=n=>fm.test(n),_m=new Set(["length","size","percentage"]),ym=n=>ur(n,_m,Xu),bm=n=>ur(n,"position",Xu),wm=new Set(["image","url"]),Sm=n=>ur(n,wm,Am),Em=n=>ur(n,"",Tm),xr=()=>!0,ur=(n,e,t)=>{const i=Wu.exec(n);return i?i[1]?typeof e=="string"?i[1]===e:e.has(i[1]):t(i[2]):!1},Mm=n=>pm.test(n)&&!mm.test(n),Xu=()=>!1,Tm=n=>gm.test(n),Am=n=>xm.test(n),Rm=()=>{const n=ft("colors"),e=ft("spacing"),t=ft("blur"),i=ft("brightness"),s=ft("borderColor"),a=ft("borderRadius"),l=ft("borderSpacing"),o=ft("borderWidth"),c=ft("contrast"),d=ft("grayscale"),u=ft("hueRotate"),p=ft("invert"),h=ft("gap"),g=ft("gradientColorStops"),_=ft("gradientColorStopPositions"),x=ft("inset"),m=ft("margin"),f=ft("opacity"),y=ft("padding"),v=ft("saturate"),E=ft("scale"),b=ft("sepia"),M=ft("skew"),T=ft("space"),N=ft("translate"),w=()=>["auto","contain","none"],A=()=>["auto","hidden","clip","visible","scroll"],I=()=>["auto",Qe,e],F=()=>[Qe,e],$=()=>["",Pn,Gn],P=()=>["auto",Qi,Qe],H=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],J=()=>["solid","dashed","dotted","double","none"],K=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],ae=()=>["start","end","center","between","around","evenly","stretch"],ee=()=>["","0",Qe],ie=()=>["auto","avoid","all","avoid-page","page","left","right","column"],D=()=>[Qi,Qe];return{cacheSize:500,separator:":",theme:{colors:[xr],spacing:[Pn,Gn],blur:["none","",Vn,Qe],brightness:D(),borderColor:[n],borderRadius:["none","","full",Vn,Qe],borderSpacing:F(),borderWidth:$(),contrast:D(),grayscale:ee(),hueRotate:D(),invert:ee(),gap:F(),gradientColorStops:[n],gradientColorStopPositions:[vm,Gn],inset:I(),margin:I(),opacity:D(),padding:F(),saturate:D(),scale:D(),sepia:ee(),skew:D(),space:F(),translate:F()},classGroups:{aspect:[{aspect:["auto","square","video",Qe]}],container:["container"],columns:[{columns:[Vn]}],"break-after":[{"break-after":ie()}],"break-before":[{"break-before":ie()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...H(),Qe]}],overflow:[{overflow:A()}],"overflow-x":[{"overflow-x":A()}],"overflow-y":[{"overflow-y":A()}],overscroll:[{overscroll:w()}],"overscroll-x":[{"overscroll-x":w()}],"overscroll-y":[{"overscroll-y":w()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[x]}],"inset-x":[{"inset-x":[x]}],"inset-y":[{"inset-y":[x]}],start:[{start:[x]}],end:[{end:[x]}],top:[{top:[x]}],right:[{right:[x]}],bottom:[{bottom:[x]}],left:[{left:[x]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",gr,Qe]}],basis:[{basis:I()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",Qe]}],grow:[{grow:ee()}],shrink:[{shrink:ee()}],order:[{order:["first","last","none",gr,Qe]}],"grid-cols":[{"grid-cols":[xr]}],"col-start-end":[{col:["auto",{span:["full",gr,Qe]},Qe]}],"col-start":[{"col-start":P()}],"col-end":[{"col-end":P()}],"grid-rows":[{"grid-rows":[xr]}],"row-start-end":[{row:["auto",{span:[gr,Qe]},Qe]}],"row-start":[{"row-start":P()}],"row-end":[{"row-end":P()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",Qe]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",Qe]}],gap:[{gap:[h]}],"gap-x":[{"gap-x":[h]}],"gap-y":[{"gap-y":[h]}],"justify-content":[{justify:["normal",...ae()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...ae(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...ae(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[y]}],px:[{px:[y]}],py:[{py:[y]}],ps:[{ps:[y]}],pe:[{pe:[y]}],pt:[{pt:[y]}],pr:[{pr:[y]}],pb:[{pb:[y]}],pl:[{pl:[y]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[T]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[T]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",Qe,e]}],"min-w":[{"min-w":[Qe,e,"min","max","fit"]}],"max-w":[{"max-w":[Qe,e,"none","full","min","max","fit","prose",{screen:[Vn]},Vn]}],h:[{h:[Qe,e,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[Qe,e,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[Qe,e,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[Qe,e,"auto","min","max","fit"]}],"font-size":[{text:["base",Vn,Gn]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Na]}],"font-family":[{font:[xr]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",Qe]}],"line-clamp":[{"line-clamp":["none",Qi,Na]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",Pn,Qe]}],"list-image":[{"list-image":["none",Qe]}],"list-style-type":[{list:["none","disc","decimal",Qe]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[n]}],"placeholder-opacity":[{"placeholder-opacity":[f]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[n]}],"text-opacity":[{"text-opacity":[f]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...J(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",Pn,Gn]}],"underline-offset":[{"underline-offset":["auto",Pn,Qe]}],"text-decoration-color":[{decoration:[n]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:F()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Qe]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Qe]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[f]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...H(),bm]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",ym]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Sm]}],"bg-color":[{bg:[n]}],"gradient-from-pos":[{from:[_]}],"gradient-via-pos":[{via:[_]}],"gradient-to-pos":[{to:[_]}],"gradient-from":[{from:[g]}],"gradient-via":[{via:[g]}],"gradient-to":[{to:[g]}],rounded:[{rounded:[a]}],"rounded-s":[{"rounded-s":[a]}],"rounded-e":[{"rounded-e":[a]}],"rounded-t":[{"rounded-t":[a]}],"rounded-r":[{"rounded-r":[a]}],"rounded-b":[{"rounded-b":[a]}],"rounded-l":[{"rounded-l":[a]}],"rounded-ss":[{"rounded-ss":[a]}],"rounded-se":[{"rounded-se":[a]}],"rounded-ee":[{"rounded-ee":[a]}],"rounded-es":[{"rounded-es":[a]}],"rounded-tl":[{"rounded-tl":[a]}],"rounded-tr":[{"rounded-tr":[a]}],"rounded-br":[{"rounded-br":[a]}],"rounded-bl":[{"rounded-bl":[a]}],"border-w":[{border:[o]}],"border-w-x":[{"border-x":[o]}],"border-w-y":[{"border-y":[o]}],"border-w-s":[{"border-s":[o]}],"border-w-e":[{"border-e":[o]}],"border-w-t":[{"border-t":[o]}],"border-w-r":[{"border-r":[o]}],"border-w-b":[{"border-b":[o]}],"border-w-l":[{"border-l":[o]}],"border-opacity":[{"border-opacity":[f]}],"border-style":[{border:[...J(),"hidden"]}],"divide-x":[{"divide-x":[o]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[o]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[f]}],"divide-style":[{divide:J()}],"border-color":[{border:[s]}],"border-color-x":[{"border-x":[s]}],"border-color-y":[{"border-y":[s]}],"border-color-s":[{"border-s":[s]}],"border-color-e":[{"border-e":[s]}],"border-color-t":[{"border-t":[s]}],"border-color-r":[{"border-r":[s]}],"border-color-b":[{"border-b":[s]}],"border-color-l":[{"border-l":[s]}],"divide-color":[{divide:[s]}],"outline-style":[{outline:["",...J()]}],"outline-offset":[{"outline-offset":[Pn,Qe]}],"outline-w":[{outline:[Pn,Gn]}],"outline-color":[{outline:[n]}],"ring-w":[{ring:$()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[n]}],"ring-opacity":[{"ring-opacity":[f]}],"ring-offset-w":[{"ring-offset":[Pn,Gn]}],"ring-offset-color":[{"ring-offset":[n]}],shadow:[{shadow:["","inner","none",Vn,Em]}],"shadow-color":[{shadow:[xr]}],opacity:[{opacity:[f]}],"mix-blend":[{"mix-blend":[...K(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":K()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[i]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",Vn,Qe]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[p]}],saturate:[{saturate:[v]}],sepia:[{sepia:[b]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[i]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[p]}],"backdrop-opacity":[{"backdrop-opacity":[f]}],"backdrop-saturate":[{"backdrop-saturate":[v]}],"backdrop-sepia":[{"backdrop-sepia":[b]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",Qe]}],duration:[{duration:D()}],ease:[{ease:["linear","in","out","in-out",Qe]}],delay:[{delay:D()}],animate:[{animate:["none","spin","ping","pulse","bounce",Qe]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[E]}],"scale-x":[{"scale-x":[E]}],"scale-y":[{"scale-y":[E]}],rotate:[{rotate:[gr,Qe]}],"translate-x":[{"translate-x":[N]}],"translate-y":[{"translate-y":[N]}],"skew-x":[{"skew-x":[M]}],"skew-y":[{"skew-y":[M]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",Qe]}],accent:[{accent:["auto",n]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Qe]}],"caret-color":[{caret:[n]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":F()}],"scroll-mx":[{"scroll-mx":F()}],"scroll-my":[{"scroll-my":F()}],"scroll-ms":[{"scroll-ms":F()}],"scroll-me":[{"scroll-me":F()}],"scroll-mt":[{"scroll-mt":F()}],"scroll-mr":[{"scroll-mr":F()}],"scroll-mb":[{"scroll-mb":F()}],"scroll-ml":[{"scroll-ml":F()}],"scroll-p":[{"scroll-p":F()}],"scroll-px":[{"scroll-px":F()}],"scroll-py":[{"scroll-py":F()}],"scroll-ps":[{"scroll-ps":F()}],"scroll-pe":[{"scroll-pe":F()}],"scroll-pt":[{"scroll-pt":F()}],"scroll-pr":[{"scroll-pr":F()}],"scroll-pb":[{"scroll-pb":F()}],"scroll-pl":[{"scroll-pl":F()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Qe]}],fill:[{fill:[n,"none"]}],"stroke-w":[{stroke:[Pn,Gn,Na]}],stroke:[{stroke:[n,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Cm=dm(Rm);function Wt(...n){return Cm(zu(n))}const He=z.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Wt("rounded-xl border bg-card text-card-foreground shadow",n),...e}));He.displayName="Card";const Ge=z.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Wt("flex flex-col space-y-1.5 p-6",n),...e}));Ge.displayName="CardHeader";const Ve=z.forwardRef(({className:n,...e},t)=>r.jsx("h3",{ref:t,className:Wt("font-semibold leading-none tracking-tight",n),...e}));Ve.displayName="CardTitle";const Xe=z.forwardRef(({className:n,...e},t)=>r.jsx("p",{ref:t,className:Wt("text-sm text-muted-foreground",n),...e}));Xe.displayName="CardDescription";const We=z.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Wt("p-6 pt-0",n),...e}));We.displayName="CardContent";const Nm=z.forwardRef(({className:n,...e},t)=>r.jsx("div",{ref:t,className:Wt("flex items-center p-6 pt-0",n),...e}));Nm.displayName="CardFooter";var Pm=Symbol.for("react.lazy"),Ys=Rf[" use ".trim().toString()];function Lm(n){return typeof n=="object"&&n!==null&&"then"in n}function qu(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===Pm&&"_payload"in n&&Lm(n._payload)}function jm(n){const e=Im(n),t=z.forwardRef((i,s)=>{let{children:a,...l}=i;qu(a)&&typeof Ys=="function"&&(a=Ys(a._payload));const o=z.Children.toArray(a),c=o.find(Om);if(c){const d=c.props.children,u=o.map(p=>p===c?z.Children.count(d)>1?z.Children.only(null):z.isValidElement(d)?d.props.children:null:p);return r.jsx(e,{...l,ref:s,children:z.isValidElement(d)?z.cloneElement(d,void 0,u):null})}return r.jsx(e,{...l,ref:s,children:a})});return t.displayName=`${n}.Slot`,t}var Dm=jm("Slot");function Im(n){const e=z.forwardRef((t,i)=>{let{children:s,...a}=t;if(qu(s)&&typeof Ys=="function"&&(s=Ys(s._payload)),z.isValidElement(s)){const l=Fm(s),o=km(a,s.props);return s.type!==z.Fragment&&(o.ref=i?_f(i,l):l),z.cloneElement(s,o)}return z.Children.count(s)>1?z.Children.only(null):null});return e.displayName=`${n}.SlotClone`,e}var Um=Symbol("radix.slottable");function Om(n){return z.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===Um}function km(n,e){const t={...e};for(const i in e){const s=n[i],a=e[i];/^on[A-Z]/.test(i)?s&&a?t[i]=(...o)=>{const c=a(...o);return s(...o),c}:s&&(t[i]=s):i==="style"?t[i]={...s,...a}:i==="className"&&(t[i]=[s,a].filter(Boolean).join(" "))}return{...n,...t}}function Fm(n){let e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get,t=e&&"isReactWarning"in e&&e.isReactWarning;return t?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get,t=e&&"isReactWarning"in e&&e.isReactWarning,t?n.props.ref:n.props.ref||n.ref)}const Gl=n=>typeof n=="boolean"?`${n}`:n===0?"0":n,Vl=zu,$u=(n,e)=>t=>{var i;if(e?.variants==null)return Vl(n,t?.class,t?.className);const{variants:s,defaultVariants:a}=e,l=Object.keys(s).map(d=>{const u=t?.[d],p=a?.[d];if(u===null)return null;const h=Gl(u)||Gl(p);return s[d][h]}),o=t&&Object.entries(t).reduce((d,u)=>{let[p,h]=u;return h===void 0||(d[p]=h),d},{}),c=e==null||(i=e.compoundVariants)===null||i===void 0?void 0:i.reduce((d,u)=>{let{class:p,className:h,...g}=u;return Object.entries(g).every(_=>{let[x,m]=_;return Array.isArray(m)?m.includes({...a,...o}[x]):{...a,...o}[x]===m})?[...d,p,h]:d},[]);return Vl(n,l,c,t?.class,t?.className)},Bm=$u("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),be=z.forwardRef(({className:n,variant:e,size:t,asChild:i=!1,...s},a)=>{const l=i?Dm:"button";return r.jsx(l,{className:Wt(Bm({variant:e,size:t,className:n})),ref:a,...s})});be.displayName="Button";const zm=$u("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function yt({className:n,variant:e,...t}){return r.jsx("div",{className:Wt(zm({variant:e}),n),...t})}const Hm=({title:n,value:e,change:t,icon:i,trend:s})=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"flex flex-row items-center justify-between pb-2",children:[r.jsx(Ve,{className:"text-sm font-medium",children:n}),r.jsx("div",{className:"p-2 bg-primary/10 rounded-lg text-primary",children:i})]}),r.jsxs(We,{children:[r.jsx("div",{className:"text-2xl font-bold",children:e}),r.jsxs("p",{className:`text-xs ${s==="up"?"text-green-500":"text-red-500"} flex items-center`,children:[s==="up"?r.jsx(Ur,{className:"h-3 w-3 mr-1"}):r.jsx(Ur,{className:"h-3 w-3 mr-1 rotate-180"}),t]})]})]}),Gm=()=>{const[n,e]=z.useState("overview"),t=[{title:"Всего пользователей",value:"12,361",change:"+18.2% с прошлого месяца",icon:r.jsx(ei,{className:"h-4 w-4"}),trend:"up"},{title:"Просмотров экспонатов",value:"1.2M",change:"+22.5% с прошлого месяца",icon:r.jsx(Tn,{className:"h-4 w-4"}),trend:"up"},{title:"Лайков",value:"45.2K",change:"+12.3% с прошлого месяца",icon:r.jsx(hn,{className:"h-4 w-4"}),trend:"up"},{title:"Экспонатов",value:"8,421",change:"+5.7% с прошлого месяца",icon:r.jsx(vi,{className:"h-4 w-4"}),trend:"up"}],i=[{id:1,user:"Александр Петров",action:"Добавил новый экспонат",time:"2 минуты назад",type:"add"},{id:2,user:"Мария Иванова",action:"Оставил отзыв",time:"15 минут назад",type:"review"},{id:3,user:"Дмитрий Сидоров",action:"Создал коллекцию",time:"1 час назад",type:"collection"},{id:4,user:"Елена Козлова",action:"Присоединился к платформе",time:"2 часа назад",type:"join"},{id:5,user:"Сергей Новиков",action:"Оценил экспонат",time:"3 часа назад",type:"rate"}],s=[{id:1,title:"Абстрактная композиция №1",artist:"Александр Петров",likes:1240,views:12400},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",likes:980,views:9800},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",likes:2100,views:21e3},{id:4,title:"Портрет женщины",artist:"Дмитрий Козлов",likes:1560,views:15600},{id:5,title:"Морской пейзаж",artist:"Елена Васильева",likes:780,views:7800}];return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Админ-панель"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление платформой виртуальной галереи"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:t.map((a,l)=>r.jsx(Hm,{title:a.title,value:a.value,change:a.change,icon:a.icon,trend:a.trend},l))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="overview"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("overview"),children:"Обзор"}),r.jsx("button",{className:`pb-3 px-1 ${n==="users"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("users"),children:"Пользователи"}),r.jsx("button",{className:`pb-3 px-1 ${n==="artworks"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("artworks"),children:"Экспонаты"}),r.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="overview"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Недавние действия"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Последние действия пользователей на платформе"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:i.map(a=>r.jsxs("div",{className:"flex items-start space-x-4",children:[r.jsx("div",{className:`p-2 rounded-full ${a.type==="add"?"bg-blue-100 text-blue-600":a.type==="review"?"bg-green-100 text-green-600":a.type==="collection"?"bg-purple-100 text-purple-600":a.type==="join"?"bg-orange-100 text-orange-600":"bg-gray-100 text-gray-600"}`,children:a.type==="add"?r.jsx(rn,{className:"h-4 w-4"}):a.type==="review"?r.jsx(kt,{className:"h-4 w-4"}):a.type==="collection"?r.jsx(Ir,{className:"h-4 w-4"}):a.type==="join"?r.jsx(ei,{className:"h-4 w-4"}):r.jsx(hn,{className:"h-4 w-4"})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("p",{className:"text-sm font-medium",children:a.user}),r.jsx("p",{className:"text-sm text-muted-foreground",children:a.action}),r.jsx("p",{className:"text-xs text-muted-foreground",children:a.time})]})]},a.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Топ экспонатов"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Самые популярные экспонаты за последний месяц"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:s.map(a=>r.jsxs("div",{className:"flex items-center space-x-4",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2",children:r.jsx(vi,{className:"h-8 w-8 text-primary"})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("p",{className:"text-sm font-medium",children:a.title}),r.jsx("p",{className:"text-xs text-muted-foreground",children:a.artist})]}),r.jsxs("div",{className:"text-right",children:[r.jsxs("p",{className:"text-sm font-medium",children:[a.likes," лайков"]}),r.jsxs("p",{className:"text-xs text-muted-foreground",children:[a.views," просмотров"]})]})]},a.id))})})]})]}),n==="users"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Управление пользователями"}),r.jsx(Xe,{children:"Просмотр и управление аккаунтами пользователей"})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center mb-4",children:[r.jsx("h3",{className:"text-lg font-medium",children:"Список пользователей"}),r.jsx(be,{children:"Добавить пользователя"})]}),r.jsx("div",{className:"border rounded-lg",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Пользователь"}),r.jsx("th",{className:"text-left p-4",children:"Роль"}),r.jsx("th",{className:"text-left p-4",children:"Дата регистрации"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:[1,2,3,4,5].map(a=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center space-x-3",children:[r.jsx("div",{className:"bg-primary/10 p-2 rounded-full",children:r.jsx(ei,{className:"h-5 w-5 text-primary"})}),r.jsxs("div",{children:[r.jsxs("p",{className:"font-medium",children:["Пользователь ",a]}),r.jsxs("p",{className:"text-sm text-muted-foreground",children:["user",a,"@example.com"]})]})]})}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:"outline",children:a===1?"admin":a===2?"curator":"user"})}),r.jsxs("td",{className:"p-4",children:["15.",a,".2023"]}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:a%2===0?"default":"secondary",children:a%2===0?"Активен":"Неактивен"})}),r.jsx("td",{className:"p-4",children:r.jsx(be,{variant:"outline",size:"sm",children:"Редактировать"})})]},a))})]})})]})]}),n==="artworks"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Управление экспонатами"}),r.jsx(Xe,{children:"Просмотр и управление экспонатами галереи"})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center mb-4",children:[r.jsx("h3",{className:"text-lg font-medium",children:"Список экспонатов"}),r.jsx(be,{children:"Добавить экспонат"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:[1,2,3,4,5,6].map(a=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(vi,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsxs(Ve,{className:"text-lg",children:["Экспонат ",a]}),r.jsxs(Xe,{children:["Художник ",a]})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(yt,{variant:"outline",children:["Категория ",a]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(hn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),r.jsxs("div",{className:"mt-4 flex space-x-2",children:[r.jsx(be,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),r.jsx(be,{size:"sm",children:"Редактировать"})]})]})]},a))})]})]}),n==="analytics"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Аналитика платформы"}),r.jsx(Xe,{children:"Статистика использования и взаимодействия пользователей"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Посещаемость"}),r.jsx(Xe,{children:"Посетители за последние 30 дней"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Au,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График посещаемости"})]})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Популярность экспонатов"}),r.jsx(Xe,{children:"Топ-10 самых просматриваемых экспонатов"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Ir,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График популярности"})]})})]})]})})]})]})},Vm=()=>{const[n,e]=z.useState("dashboard"),[t,i]=z.useState([{id:1,title:"Абстрактная композиция",artist:"Александр Петров",submittedBy:"Мария Иванова",submissionDate:"2023-11-15",status:"pending",image:"/placeholder-artwork.jpg"},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",submittedBy:"Дмитрий Сидоров",submissionDate:"2023-11-14",status:"approved",image:"/placeholder-artwork.jpg"},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",submittedBy:"Елена Козлова",submissionDate:"2023-11-13",status:"rejected",image:"/placeholder-artwork.jpg"}]),s=[{title:"Всего экспонатов",value:"1,240",change:"+12%"},{title:"Новых за сегодня",value:"12",change:"+5%"},{title:"На рассмотрении",value:"24",change:"-3%"},{title:"Одобренных",value:"1,190",change:"+15%"}],a=[{id:1,title:"Абстрактная композиция",artist:"Александр Петров",date:"2 часа назад",status:"pending"},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",date:"5 часов назад",status:"approved"},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",date:"1 день назад",status:"rejected"},{id:4,title:"Портрет женщины",artist:"Дмитрий Козлов",date:"2 дня назад",status:"pending"}],l=c=>{i(t.map(d=>d.id===c?{...d,status:"approved"}:d))},o=c=>{i(t.map(d=>d.id===c?{...d,status:"rejected"}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Панель куратора"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление экспонатами и рассмотрение новых материалов"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((c,d)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:c.title}),r.jsx(Ve,{className:"text-2xl",children:c.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(TrendingUp,{className:"h-4 w-4 mr-1"}),c.change]})})]},d))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="submissions"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("submissions"),children:"Материалы на рассмотрении"}),r.jsx("button",{className:`pb-3 px-1 ${n==="collections"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("collections"),children:"Коллекции"}),r.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Недавние материалы"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Последние материалы, добавленные пользователями"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:a.map(c=>r.jsxs("div",{className:"flex items-center justify-between p-4 border rounded-lg",children:[r.jsxs("div",{className:"flex items-center space-x-4",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2",children:r.jsx(vi,{className:"h-6 w-6 text-primary"})}),r.jsxs("div",{children:[r.jsx("p",{className:"font-medium",children:c.title}),r.jsxs("p",{className:"text-sm text-muted-foreground",children:["Автор: ",c.artist]})]})]}),r.jsxs("div",{className:"flex items-center space-x-4",children:[r.jsx(yt,{variant:c.status==="pending"?"default":c.status==="approved"?"secondary":"destructive",children:c.status==="pending"?"На рассмотрении":c.status==="approved"?"Одобрен":"Отклонен"}),r.jsx("span",{className:"text-sm text-muted-foreground",children:c.date})]})]},c.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Быстрые действия"}),r.jsx(Xe,{children:"Часто используемые функции"})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-4",children:[r.jsxs(be,{className:"w-full justify-start",children:[r.jsx(Fl,{className:"h-4 w-4 mr-2"}),"Добавить экспонат"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(rn,{className:"h-4 w-4 mr-2"}),"Создать коллекцию"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(zs,{className:"h-4 w-4 mr-2"}),"Ответить на отзывы"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(kt,{className:"h-4 w-4 mr-2"}),"Рекомендовать экспонат"]})]})})]})]}),n==="submissions"&&r.jsxs(He,{children:[r.jsx(Ge,{children:r.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[r.jsxs("div",{children:[r.jsx(Ve,{children:"Материалы на рассмотрении"}),r.jsx(Xe,{children:"Новые экспонаты, отправленные пользователями для проверки"})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsxs("div",{className:"relative",children:[r.jsx(ua,{className:"absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx("input",{type:"text",placeholder:"Поиск...",className:"pl-8 pr-4 py-2 border rounded-lg w-full sm:w-64"})]}),r.jsxs(be,{variant:"outline",children:[r.jsx(Pu,{className:"h-4 w-4 mr-2"}),"Фильтр"]})]})]})}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Экспонат"}),r.jsx("th",{className:"text-left p-4",children:"Автор"}),r.jsx("th",{className:"text-left p-4",children:"Отправитель"}),r.jsx("th",{className:"text-left p-4",children:"Дата"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(c=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center space-x-3",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2",children:r.jsx(vi,{className:"h-6 w-6 text-primary"})}),r.jsx("span",{className:"font-medium",children:c.title})]})}),r.jsx("td",{className:"p-4",children:c.artist}),r.jsx("td",{className:"p-4",children:c.submittedBy}),r.jsx("td",{className:"p-4",children:c.submissionDate}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:c.status==="pending"?"default":c.status==="approved"?"secondary":"destructive",children:c.status==="pending"?"На рассмотрении":c.status==="approved"?"Одобрен":"Отклонен"})}),r.jsx("td",{className:"p-4",children:c.status==="pending"?r.jsxs("div",{className:"flex space-x-2",children:[r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>l(c.id),children:[r.jsx(Ip,{className:"h-4 w-4 mr-1 text-green-500"}),"Одобрить"]}),r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[r.jsx(Up,{className:"h-4 w-4 mr-1 text-red-500"}),"Отклонить"]})]}):r.jsx("span",{className:"text-sm text-muted-foreground",children:"-"})})]},c.id))})]})})})]}),n==="collections"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Коллекции"}),r.jsxs(be,{children:[r.jsx(Fl,{className:"h-4 w-4 mr-2"}),"Создать коллекцию"]})]}),r.jsx(Xe,{children:"Управление коллекциями экспонатов"})]}),r.jsx(We,{children:r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3,4,5,6].map(c=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(rn,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsxs(Ve,{className:"text-lg",children:["Коллекция ",c]}),r.jsxs(Xe,{children:[Math.floor(Math.random()*50)+5," экспонатов"]})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(yt,{variant:"outline",children:["Тема ",c]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),r.jsxs("div",{className:"mt-4 flex space-x-2",children:[r.jsx(be,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),r.jsx(be,{size:"sm",children:"Редактировать"})]})]})]},c))})})]}),n==="analytics"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Аналитика куратора"}),r.jsx(Xe,{children:"Статистика ваших действий и принятых решений"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Решения по материалам"}),r.jsx(Xe,{children:"Статусы принятых решений"})]}),r.jsx(We,{children:r.jsx("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:r.jsxs("div",{className:"text-center",children:[r.jsx(rn,{className:"h-12 w-12 text-primary/20 mx-auto"}),r.jsx("p",{className:"mt-2 text-muted-foreground",children:"График решений"})]})})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Популярность коллекций"}),r.jsx(Xe,{children:"Просмотры и взаимодействия с вашими коллекциями"})]}),r.jsx(We,{children:r.jsx("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:r.jsxs("div",{className:"text-center",children:[r.jsx(kt,{className:"h-12 w-12 text-primary/20 mx-auto"}),r.jsx("p",{className:"mt-2 text-muted-foreground",children:"График популярности"})]})})})]})]})})]})]})},Wm=()=>{const[n,e]=z.useState("dashboard"),[t,i]=z.useState([{id:1,title:"Проверить новые экспонаты",description:"Проверить 15 новых экспонатов, загруженных за вчера",priority:"high",status:"in-progress",assignedTo:"Василий Петров",dueDate:"2023-11-20"},{id:2,title:"Обновить описания",description:'Обновить описания для 20 экспонатов в галерее "Современное искусство"',priority:"medium",status:"pending",assignedTo:"Мария Иванова",dueDate:"2023-11-22"},{id:3,title:"Ответить на отзывы",description:"Ответить на 12 новых отзывов пользователей",priority:"low",status:"pending",assignedTo:"Алексей Сидоров",dueDate:"2023-11-25"}]),s=[{title:"Всего задач",value:"24",change:"+5%"},{title:"Выполнено",value:"18",change:"+12%"},{title:"В работе",value:"4",change:"-2%"},{title:"Просрочено",value:"2",change:"-1%"}],a=[{id:1,user:"Александр Петров",action:"Добавил новый экспонат",time:"2 минуты назад",type:"add"},{id:2,user:"Мария Иванова",action:"Оставил отзыв",time:"15 минут назад",type:"review"},{id:3,user:"Дмитрий Сидоров",action:"Создал коллекцию",time:"1 час назад",type:"collection"},{id:4,user:"Елена Козлова",action:"Присоединился к платформе",time:"2 часа назад",type:"join"},{id:5,user:"Сергей Новиков",action:"Оценил экспонат",time:"3 часа назад",type:"rate"}],l=(o,c)=>{i(t.map(d=>d.id===o?{...d,status:c}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Панель сотрудника"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление задачами и контентом галереи"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((o,c)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:o.title}),r.jsx(Ve,{className:"text-2xl",children:o.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(Ur,{className:"h-4 w-4 mr-1"}),o.change]})})]},c))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="tasks"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("tasks"),children:"Задачи"}),r.jsx("button",{className:`pb-3 px-1 ${n==="content"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("content"),children:"Контент"}),r.jsx("button",{className:`pb-3 px-1 ${n==="reports"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("reports"),children:"Отчеты"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Недавние действия"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Последние действия пользователей на платформе"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:a.map(o=>r.jsxs("div",{className:"flex items-start space-x-4",children:[r.jsx("div",{className:`p-2 rounded-full ${o.type==="add"?"bg-blue-100 text-blue-600":o.type==="review"?"bg-green-100 text-green-600":o.type==="collection"?"bg-purple-100 text-purple-600":o.type==="join"?"bg-orange-100 text-orange-600":"bg-gray-100 text-gray-600"}`,children:o.type==="add"?r.jsx(rn,{className:"h-4 w-4"}):o.type==="review"?r.jsx(kt,{className:"h-4 w-4"}):o.type==="collection"?r.jsx(Ir,{className:"h-4 w-4"}):o.type==="join"?r.jsx(ei,{className:"h-4 w-4"}):r.jsx(hn,{className:"h-4 w-4"})}),r.jsxs("div",{className:"flex-1",children:[r.jsx("p",{className:"text-sm font-medium",children:o.user}),r.jsx("p",{className:"text-sm text-muted-foreground",children:o.action}),r.jsx("p",{className:"text-xs text-muted-foreground",children:o.time})]})]},o.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Мои задачи"}),r.jsx(be,{variant:"outline",size:"sm",children:"Создать"})]}),r.jsx(Xe,{children:"Задачи, назначенные вам"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:t.slice(0,3).map(o=>r.jsxs("div",{className:"border rounded-lg p-4",children:[r.jsxs("div",{className:"flex justify-between items-start",children:[r.jsx("h4",{className:"font-medium",children:o.title}),r.jsx(yt,{variant:o.priority==="high"?"destructive":o.priority==="medium"?"default":"secondary",children:o.priority==="high"?"Высокий":o.priority==="medium"?"Средний":"Низкий"})]}),r.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:o.description}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{className:"flex items-center text-xs text-muted-foreground",children:[r.jsx(Si,{className:"h-3 w-3 mr-1"}),r.jsx("span",{children:o.dueDate})]}),r.jsx(yt,{variant:o.status==="pending"?"outline":o.status==="in-progress"?"default":"secondary",children:o.status==="pending"?"В ожидании":o.status==="in-progress"?"В работе":"Завершено"})]})]},o.id))})})]})]}),n==="tasks"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Управление задачами"}),r.jsxs(be,{children:[r.jsx(qp,{className:"h-4 w-4 mr-2"}),"Создать задачу"]})]}),r.jsx(Xe,{children:"Назначение, отслеживание и выполнение задач"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Задача"}),r.jsx("th",{className:"text-left p-4",children:"Описание"}),r.jsx("th",{className:"text-left p-4",children:"Приоритет"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Назначен"}),r.jsx("th",{className:"text-left p-4",children:"Срок"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(o=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:o.title}),r.jsx("td",{className:"p-4 text-sm text-muted-foreground max-w-xs truncate",children:o.description}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.priority==="high"?"destructive":o.priority==="medium"?"default":"secondary",children:o.priority==="high"?"Высокий":o.priority==="medium"?"Средний":"Низкий"})}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.status==="pending"?"outline":o.status==="in-progress"?"default":"secondary",children:o.status==="pending"?"В ожидании":o.status==="in-progress"?"В работе":"Завершено"})}),r.jsx("td",{className:"p-4",children:o.assignedTo}),r.jsx("td",{className:"p-4",children:o.dueDate}),r.jsx("td",{className:"p-4",children:r.jsx("div",{className:"flex space-x-2",children:r.jsx(be,{size:"sm",variant:o.status==="completed"?"outline":"default",onClick:()=>l(o.id,o.status==="completed"?"in-progress":"completed"),children:o.status==="completed"?"Вернуть":"Выполнить"})})})]},o.id))})]})})})]}),n==="content"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Управление контентом"}),r.jsxs(be,{children:[r.jsx(vi,{className:"h-4 w-4 mr-2"}),"Добавить экспонат"]})]}),r.jsx(Xe,{children:"Редактирование и управление экспонатами"})]}),r.jsx(We,{children:r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3,4,5,6].map(o=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(vi,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsxs(Ve,{className:"text-lg",children:["Экспонат ",o]}),r.jsxs(Xe,{children:["Художник ",o]})]}),r.jsxs(We,{children:[r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(yt,{variant:"outline",children:["Категория ",o]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(hn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:Math.floor(Math.random()*1e3)})]})]}),r.jsxs("div",{className:"mt-4 flex space-x-2",children:[r.jsx(be,{variant:"outline",size:"sm",className:"flex-1",children:"Просмотр"}),r.jsx(be,{size:"sm",children:"Редактировать"})]})]})]},o))})})]}),n==="reports"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Отчеты и аналитика"}),r.jsx(Xe,{children:"Статистика ваших действий и активности"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Ваши задачи"}),r.jsx(Xe,{children:"Статус выполнения назначенных задач"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Au,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График выполнения задач"})]})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Вклад в контент"}),r.jsx(Xe,{children:"Ваши вклады в развитие контента галереи"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Ir,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График активности"})]})})]})]})})]})]})},Xm=()=>{const[n,e]=z.useState("dashboard"),[t,i]=z.useState([{id:1,title:"Введение в современное искусство",description:"Обзор основных направлений современного искусства",duration:"45 мин",participants:12,rating:4.7,status:"scheduled",scheduledDate:"2023-11-20",scheduledTime:"14:00"},{id:2,title:"История импрессионизма",description:"Путешествие через эпоху импрессионизма",duration:"60 мин",participants:8,rating:4.9,status:"ongoing",scheduledDate:"2023-11-20",scheduledTime:"16:00"},{id:3,title:"Цифровые инсталляции",description:"Интерактивные цифровые произведения искусства",duration:"50 мин",participants:15,rating:4.5,status:"completed",scheduledDate:"2023-11-19",scheduledTime:"15:00"}]),s=[{title:"Всего туров",value:"42",change:"+8%"},{title:"Проведено",value:"38",change:"+12%"},{title:"Участников",value:"420",change:"+15%"},{title:"Средний рейтинг",value:"4.7",change:"+0.2"}],a=[{id:1,name:"Александр Петров",email:"alex@example.com",joinedTour:"Введение в современное искусство",engagement:92},{id:2,name:"Мария Иванова",email:"maria@example.com",joinedTour:"История импрессионизма",engagement:87},{id:3,name:"Дмитрий Сидоров",email:"dmitry@example.com",joinedTour:"Цифровые инсталляции",engagement:95},{id:4,name:"Елена Козлова",email:"elena@example.com",joinedTour:"Введение в современное искусство",engagement:78},{id:5,name:"Сергей Новиков",email:"sergey@example.com",joinedTour:"Классическая живопись",engagement:89}],l=c=>{i(t.map(d=>d.id===c?{...d,status:"ongoing"}:d))},o=c=>{i(t.map(d=>d.id===c?{...d,status:"completed"}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Панель гида"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление виртуальными турами и взаимодействие с участниками"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((c,d)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:c.title}),r.jsx(Ve,{className:"text-2xl",children:c.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(Ur,{className:"h-4 w-4 mr-1"}),c.change]})})]},d))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="tours"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("tours"),children:"Мои туры"}),r.jsx("button",{className:`pb-3 px-1 ${n==="participants"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("participants"),children:"Участники"}),r.jsx("button",{className:`pb-3 px-1 ${n==="analytics"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("analytics"),children:"Аналитика"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Предстоящие туры"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Запланированные виртуальные туры"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:t.filter(c=>c.status!=="completed").map(c=>r.jsxs("div",{className:"border rounded-lg p-4",children:[r.jsxs("div",{className:"flex justify-between items-start",children:[r.jsxs("div",{children:[r.jsx("h4",{className:"font-medium",children:c.title}),r.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:c.description})]}),r.jsx(yt,{variant:c.status==="scheduled"?"default":c.status==="ongoing"?"secondary":"outline",children:c.status==="scheduled"?"Запланирован":c.status==="ongoing"?"В процессе":"Завершен"})]}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Si,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:c.duration}),r.jsx(ei,{className:"h-4 w-4 ml-4 mr-1"}),r.jsxs("span",{children:[c.participants," участников"]})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-4 w-4 text-yellow-500 mr-1"}),r.jsx("span",{children:c.rating})]})]}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{className:"text-sm text-muted-foreground",children:[c.scheduledDate," в ",c.scheduledTime]}),r.jsxs("div",{className:"flex space-x-2",children:[c.status==="scheduled"&&r.jsxs(be,{size:"sm",onClick:()=>l(c.id),children:[r.jsx(kl,{className:"h-4 w-4 mr-1"}),"Начать"]}),c.status==="ongoing"&&r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[r.jsx(Ul,{className:"h-4 w-4 mr-1"}),"Завершить"]})]})]})]},c.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Быстрые действия"}),r.jsx(Xe,{children:"Часто используемые функции"})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-4",children:[r.jsxs(be,{className:"w-full justify-start",children:[r.jsx(Ol,{className:"h-4 w-4 mr-2"}),"Создать тур"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(zs,{className:"h-4 w-4 mr-2"}),"Ответить на вопросы"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(rn,{className:"h-4 w-4 mr-2"}),"Показать экспонаты"]}),r.jsxs(be,{variant:"outline",className:"w-full justify-start",children:[r.jsx(kt,{className:"h-4 w-4 mr-2"}),"Оставить отзыв"]})]})})]})]}),n==="tours"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Все туры"}),r.jsxs(be,{children:[r.jsx(Ol,{className:"h-4 w-4 mr-2"}),"Создать тур"]})]}),r.jsx(Xe,{children:"Управление виртуальными турами"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Название"}),r.jsx("th",{className:"text-left p-4",children:"Описание"}),r.jsx("th",{className:"text-left p-4",children:"Продолжительность"}),r.jsx("th",{className:"text-left p-4",children:"Участники"}),r.jsx("th",{className:"text-left p-4",children:"Рейтинг"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"Дата"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(c=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:c.title}),r.jsx("td",{className:"p-4 text-sm text-muted-foreground max-w-xs truncate",children:c.description}),r.jsx("td",{className:"p-4",children:c.duration}),r.jsx("td",{className:"p-4",children:c.participants}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-4 w-4 text-yellow-500 mr-1"}),r.jsx("span",{children:c.rating})]})}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:c.status==="scheduled"?"default":c.status==="ongoing"?"secondary":c.status==="completed"?"outline":"destructive",children:c.status==="scheduled"?"Запланирован":c.status==="ongoing"?"В процессе":c.status==="completed"?"Завершен":"Отменен"})}),r.jsxs("td",{className:"p-4",children:[c.scheduledDate," в ",c.scheduledTime]}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex space-x-2",children:[c.status==="scheduled"&&r.jsxs(be,{size:"sm",onClick:()=>l(c.id),children:[r.jsx(kl,{className:"h-4 w-4 mr-1"}),"Начать"]}),c.status==="ongoing"&&r.jsxs(be,{size:"sm",variant:"outline",onClick:()=>o(c.id),children:[r.jsx(Ul,{className:"h-4 w-4 mr-1"}),"Завершить"]}),r.jsx(be,{size:"sm",variant:"outline",children:r.jsx(zs,{className:"h-4 w-4"})})]})})]},c.id))})]})})})]}),n==="participants"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Участники туров"}),r.jsx(Xe,{children:"Информация об участниках ваших туров"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Имя"}),r.jsx("th",{className:"text-left p-4",children:"Email"}),r.jsx("th",{className:"text-left p-4",children:"Присоединился к"}),r.jsx("th",{className:"text-left p-4",children:"Вовлеченность"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:a.map(c=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:c.name}),r.jsx("td",{className:"p-4 text-sm text-muted-foreground",children:c.email}),r.jsx("td",{className:"p-4",children:c.joinedTour}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center",children:[r.jsx("div",{className:"w-24 bg-muted rounded-full h-2 mr-2",children:r.jsx("div",{className:"bg-primary h-2 rounded-full",style:{width:`${c.engagement}%`}})}),r.jsxs("span",{children:[c.engagement,"%"]})]})}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex space-x-2",children:[r.jsx(be,{size:"sm",variant:"outline",children:r.jsx(zs,{className:"h-4 w-4"})}),r.jsx(be,{size:"sm",variant:"outline",children:r.jsx(Tn,{className:"h-4 w-4"})})]})})]},c.id))})]})})})]}),n==="analytics"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Аналитика туров"}),r.jsx(Xe,{children:"Статистика ваших виртуальных туров"})]}),r.jsx(We,{children:r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Популярность туров"}),r.jsx(Xe,{children:"Рейтинги и отзывы по турам"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(Ir,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График популярности"})]})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Вовлеченность участников"}),r.jsx(Xe,{children:"Уровень вовлеченности по турам"})]}),r.jsx(We,{children:r.jsxs("div",{className:"h-64 flex items-center justify-center bg-muted rounded-lg",children:[r.jsx(hn,{className:"h-12 w-12 text-primary/20"}),r.jsx("p",{className:"ml-4 text-muted-foreground",children:"График вовлеченности"})]})})]})]})})]})]})},qm=()=>{const[n,e]=z.useState("dashboard"),[t,i]=z.useState([{id:1,title:"Абстрактная композиция №1",artist:"Александр Петров",currentBid:12500,bidIncrement:500,endTime:"2023-11-25T18:00:00Z",image:"/placeholder-artwork.jpg",bids:12,startingPrice:1e4,reserveMet:!0},{id:2,title:"Городской пейзаж",artist:"Мария Иванова",currentBid:8500,bidIncrement:250,endTime:"2023-11-24T15:30:00Z",image:"/placeholder-artwork.jpg",bids:8,startingPrice:7e3,reserveMet:!0},{id:3,title:"Цифровая инсталляция",artist:"Анна Смирнова",currentBid:22e3,bidIncrement:1e3,endTime:"2023-11-26T20:00:00Z",image:"/placeholder-artwork.jpg",bids:21,startingPrice:2e4,reserveMet:!1}]),s=[{title:"Активные торги",value:"12",change:"+3%"},{title:"Мои ставки",value:"8",change:"+5%"},{title:"Выиграно",value:"3",change:"+2%"},{title:"Потрачено",value:"$42,500",change:"+12%"}],a=[{id:1,artworkTitle:"Абстрактная композиция №1",amount:12500,bidder:"Вы",time:"2023-11-20 14:32"},{id:2,artworkTitle:"Городской пейзаж",amount:8500,bidder:"Иван С.",time:"2023-11-19 16:45"},{id:3,artworkTitle:"Цифровая инсталляция",amount:22e3,bidder:"Вы",time:"2023-11-18 11:20"},{id:4,artworkTitle:"Портрет женщины",amount:15600,bidder:"Анна К.",time:"2023-11-17 09:15"},{id:5,artworkTitle:"Морской пейзаж",amount:7800,bidder:"Вы",time:"2023-11-16 17:30"}],l=(o,c)=>{i(t.map(d=>d.id===o?{...d,currentBid:c,bids:d.bids+1}:d))};return r.jsxs("div",{className:"container mx-auto py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Участник аукциона"}),r.jsx("p",{className:"text-muted-foreground",children:"Управление ставками и участие в торгах"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:s.map((o,c)=>r.jsxs(He,{children:[r.jsxs(Ge,{className:"pb-2",children:[r.jsx(Xe,{children:o.title}),r.jsx(Ve,{className:"text-2xl",children:o.value})]}),r.jsx(We,{children:r.jsxs("div",{className:"flex items-center text-sm text-green-500",children:[r.jsx(Ur,{className:"h-4 w-4 mr-1"}),o.change]})})]},c))}),r.jsxs("div",{className:"flex space-x-4 mb-6 border-b",children:[r.jsx("button",{className:`pb-3 px-1 ${n==="dashboard"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("dashboard"),children:"Дашборд"}),r.jsx("button",{className:`pb-3 px-1 ${n==="auctions"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("auctions"),children:"Аукционы"}),r.jsx("button",{className:`pb-3 px-1 ${n==="bids"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("bids"),children:"Мои ставки"}),r.jsx("button",{className:`pb-3 px-1 ${n==="history"?"border-b-2 border-primary text-primary font-medium":"text-muted-foreground"}`,onClick:()=>e("history"),children:"История"})]}),n==="dashboard"&&r.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[r.jsxs(He,{className:"lg:col-span-2",children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Активные торги"}),r.jsx(be,{variant:"outline",size:"sm",children:"Просмотреть все"})]}),r.jsx(Xe,{children:"Текущие аукционы, в которых вы можете участвовать"})]}),r.jsx(We,{children:r.jsx("div",{className:"space-y-4",children:t.slice(0,3).map(o=>r.jsx("div",{className:"border rounded-lg p-4",children:r.jsxs("div",{className:"flex items-start space-x-4",children:[r.jsx("div",{className:"bg-muted rounded-lg p-2 flex-shrink-0",children:r.jsx(rn,{className:"h-8 w-8 text-primary"})}),r.jsxs("div",{className:"flex-1",children:[r.jsxs("div",{className:"flex justify-between",children:[r.jsx("h4",{className:"font-medium",children:o.title}),r.jsx(yt,{variant:o.reserveMet?"default":"secondary",children:o.reserveMet?"Резерв превышен":"Резерв не достигнут"})]}),r.jsxs("p",{className:"text-sm text-muted-foreground",children:["Автор: ",o.artist]}),r.jsxs("div",{className:"flex justify-between items-center mt-3",children:[r.jsxs("div",{children:[r.jsx("p",{className:"text-sm text-muted-foreground",children:"Текущая ставка"}),r.jsxs("p",{className:"font-medium",children:["$",o.currentBid.toLocaleString()]})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm text-muted-foreground",children:"Ставок"}),r.jsx("p",{className:"font-medium",children:o.bids})]}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm text-muted-foreground",children:"До окончания"}),r.jsxs("p",{className:"font-medium",children:[r.jsx(Si,{className:"h-4 w-4 inline mr-1"}),new Date(o.endTime).toLocaleDateString()]})]})]}),r.jsxs("div",{className:"flex justify-between items-center mt-4",children:[r.jsxs("div",{className:"flex space-x-2",children:[r.jsxs(be,{size:"sm",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:[r.jsx(Il,{className:"h-4 w-4 mr-1"}),"Сделать ставку"]}),r.jsxs(be,{size:"sm",variant:"outline",children:[r.jsx(hn,{className:"h-4 w-4 mr-1"}),"Следить"]})]}),r.jsxs(be,{size:"sm",variant:"outline",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),"Подробнее"]})]})]})]})},o.id))})})]}),r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Моя статистика"}),r.jsx(Xe,{children:"Ваша активность на аукционах"})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-4",children:[r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Pp,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Выиграно лотов"})]}),r.jsx("span",{className:"font-medium",children:"3"})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Wp,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Потрачено"})]}),r.jsx("span",{className:"font-medium",children:"$42,500"})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(Bl,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Активные ставки"})]}),r.jsx("span",{className:"font-medium",children:"8"})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-muted rounded-lg",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-5 w-5 text-primary mr-2"}),r.jsx("span",{children:"Рейтинг"})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-4 w-4 text-yellow-500"}),r.jsx("span",{className:"ml-1",children:"4.7"})]})]}),r.jsxs(be,{className:"w-full mt-4",children:[r.jsx($p,{className:"h-4 w-4 mr-2"}),"Пополнить баланс"]})]})})]})]}),n==="auctions"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx(Ve,{children:"Все аукционы"}),r.jsxs(be,{variant:"outline",children:[r.jsx(Bl,{className:"h-4 w-4 mr-2"}),"Мои аукционы"]})]}),r.jsx(Xe,{children:"Список всех активных и предстоящих аукционов"})]}),r.jsx(We,{children:r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:t.map(o=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx(rn,{className:"h-12 w-12 text-primary/20"})}),r.jsxs(Ge,{children:[r.jsx(Ve,{className:"text-lg",children:o.title}),r.jsxs(Xe,{children:["Автор: ",o.artist]})]}),r.jsx(We,{children:r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-sm text-muted-foreground",children:"Текущая ставка"}),r.jsxs("span",{className:"font-medium",children:["$",o.currentBid.toLocaleString()]})]}),r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-sm text-muted-foreground",children:"Ставок"}),r.jsx("span",{className:"font-medium",children:o.bids})]}),r.jsxs("div",{className:"flex justify-between",children:[r.jsx("span",{className:"text-sm text-muted-foreground",children:"До окончания"}),r.jsx("span",{className:"font-medium",children:new Date(o.endTime).toLocaleDateString()})]}),r.jsx("div",{className:"pt-3",children:r.jsxs(be,{className:"w-full",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:[r.jsx(Il,{className:"h-4 w-4 mr-2"}),"Ставка $",o.currentBid+o.bidIncrement]})})]})})]},o.id))})})]}),n==="bids"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"Мои ставки"}),r.jsx(Xe,{children:"Текущие ставки, которые вы сделали"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Экспонат"}),r.jsx("th",{className:"text-left p-4",children:"Автор"}),r.jsx("th",{className:"text-left p-4",children:"Моя ставка"}),r.jsx("th",{className:"text-left p-4",children:"Статус"}),r.jsx("th",{className:"text-left p-4",children:"До окончания"}),r.jsx("th",{className:"text-left p-4",children:"Действия"})]})}),r.jsx("tbody",{children:t.map(o=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:o.title}),r.jsx("td",{className:"p-4",children:o.artist}),r.jsxs("td",{className:"p-4 font-medium",children:["$",o.currentBid.toLocaleString()]}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.bids>0?"default":"secondary",children:o.bids>0?"Активна":"Ожидание"})}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex items-center",children:[r.jsx(Si,{className:"h-4 w-4 mr-1"}),new Date(o.endTime).toLocaleDateString()]})}),r.jsx("td",{className:"p-4",children:r.jsxs("div",{className:"flex space-x-2",children:[r.jsx(be,{size:"sm",onClick:()=>l(o.id,o.currentBid+o.bidIncrement),children:"Повысить"}),r.jsx(be,{size:"sm",variant:"outline",children:"Отменить"})]})})]},o.id))})]})})})]}),n==="history"&&r.jsxs(He,{children:[r.jsxs(Ge,{children:[r.jsx(Ve,{children:"История торгов"}),r.jsx(Xe,{children:"Ваши прошлые участия в аукционах"})]}),r.jsx(We,{children:r.jsx("div",{className:"overflow-x-auto",children:r.jsxs("table",{className:"w-full",children:[r.jsx("thead",{className:"border-b",children:r.jsxs("tr",{children:[r.jsx("th",{className:"text-left p-4",children:"Экспонат"}),r.jsx("th",{className:"text-left p-4",children:"Ставка"}),r.jsx("th",{className:"text-left p-4",children:"Участник"}),r.jsx("th",{className:"text-left p-4",children:"Время"}),r.jsx("th",{className:"text-left p-4",children:"Результат"})]})}),r.jsx("tbody",{children:a.map(o=>r.jsxs("tr",{className:"border-b hover:bg-muted/50",children:[r.jsx("td",{className:"p-4 font-medium",children:o.artworkTitle}),r.jsxs("td",{className:"p-4",children:["$",o.amount.toLocaleString()]}),r.jsx("td",{className:"p-4",children:o.bidder}),r.jsx("td",{className:"p-4",children:o.time}),r.jsx("td",{className:"p-4",children:r.jsx(yt,{variant:o.bidder==="Вы"?"default":"secondary",children:o.bidder==="Вы"?"Выиграно":"Проиграно"})})]},o.id))})]})})})]})]})};function Yu(n,e){return function(){return n.apply(e,arguments)}}const{toString:$m}=Object.prototype,{getPrototypeOf:ha}=Object,{iterator:fa,toStringTag:Ku}=Symbol,pa=(n=>e=>{const t=$m.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())})(Object.create(null)),wn=n=>(n=n.toLowerCase(),e=>pa(e)===n),ma=n=>e=>typeof e===n,{isArray:Ei}=Array,nr=ma("undefined");function hr(n){return n!==null&&!nr(n)&&n.constructor!==null&&!nr(n.constructor)&&Kt(n.constructor.isBuffer)&&n.constructor.isBuffer(n)}const Zu=wn("ArrayBuffer");function Ym(n){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(n):e=n&&n.buffer&&Zu(n.buffer),e}const Km=ma("string"),Kt=ma("function"),Ju=ma("number"),zr=n=>n!==null&&typeof n=="object",Zm=n=>n===!0||n===!1,Hs=n=>{if(pa(n)!=="object")return!1;const e=ha(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Ku in n)&&!(fa in n)},Jm=n=>{if(!zr(n)||hr(n))return!1;try{return Object.keys(n).length===0&&Object.getPrototypeOf(n)===Object.prototype}catch{return!1}},Qm=wn("Date"),eg=wn("File"),tg=n=>!!(n&&typeof n.uri<"u"),ng=n=>n&&typeof n.getParts<"u",ig=wn("Blob"),rg=wn("FileList"),sg=n=>zr(n)&&Kt(n.pipe);function ag(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const Wl=ag(),Xl=typeof Wl.FormData<"u"?Wl.FormData:void 0,og=n=>{if(!n)return!1;if(Xl&&n instanceof Xl)return!0;const e=ha(n);if(!e||e===Object.prototype||!Kt(n.append))return!1;const t=pa(n);return t==="formdata"||t==="object"&&Kt(n.toString)&&n.toString()==="[object FormData]"},lg=wn("URLSearchParams"),[cg,dg,ug,hg]=["ReadableStream","Request","Response","Headers"].map(wn),fg=n=>n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Hr(n,e,{allOwnKeys:t=!1}={}){if(n===null||typeof n>"u")return;let i,s;if(typeof n!="object"&&(n=[n]),Ei(n))for(i=0,s=n.length;i<s;i++)e.call(null,n[i],i,n);else{if(hr(n))return;const a=t?Object.getOwnPropertyNames(n):Object.keys(n),l=a.length;let o;for(i=0;i<l;i++)o=a[i],e.call(null,n[o],o,n)}}function Qu(n,e){if(hr(n))return null;e=e.toLowerCase();const t=Object.keys(n);let i=t.length,s;for(;i-- >0;)if(s=t[i],e===s.toLowerCase())return s;return null}const xi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,eh=n=>!nr(n)&&n!==xi;function Lo(...n){const{caseless:e,skipUndefined:t}=eh(this)&&this||{},i={},s=(a,l)=>{if(l==="__proto__"||l==="constructor"||l==="prototype")return;const o=e&&typeof l=="string"&&Qu(i,l)||l,c=jo(i,o)?i[o]:void 0;Hs(c)&&Hs(a)?i[o]=Lo(c,a):Hs(a)?i[o]=Lo({},a):Ei(a)?i[o]=a.slice():(!t||!nr(a))&&(i[o]=a)};for(let a=0,l=n.length;a<l;a++){const o=n[a];if(!o||hr(o)||(Hr(o,s),typeof o!="object"||Ei(o)))continue;const c=Object.getOwnPropertySymbols(o);for(let d=0;d<c.length;d++){const u=c[d];Mg.call(o,u)&&s(o[u],u)}}return i}const pg=(n,e,t,{allOwnKeys:i}={})=>(Hr(e,(s,a)=>{t&&Kt(s)?Object.defineProperty(n,a,{__proto__:null,value:Yu(s,t),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(n,a,{__proto__:null,value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:i}),n),mg=n=>(n.charCodeAt(0)===65279&&(n=n.slice(1)),n),gg=(n,e,t,i)=>{n.prototype=Object.create(e.prototype,i),Object.defineProperty(n.prototype,"constructor",{__proto__:null,value:n,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(n,"super",{__proto__:null,value:e.prototype}),t&&Object.assign(n.prototype,t)},xg=(n,e,t,i)=>{let s,a,l;const o={};if(e=e||{},n==null)return e;do{for(s=Object.getOwnPropertyNames(n),a=s.length;a-- >0;)l=s[a],(!i||i(l,n,e))&&!o[l]&&(e[l]=n[l],o[l]=!0);n=t!==!1&&ha(n)}while(n&&(!t||t(n,e))&&n!==Object.prototype);return e},vg=(n,e,t)=>{n=String(n),(t===void 0||t>n.length)&&(t=n.length),t-=e.length;const i=n.indexOf(e,t);return i!==-1&&i===t},_g=n=>{if(!n)return null;if(Ei(n))return n;let e=n.length;if(!Ju(e))return null;const t=new Array(e);for(;e-- >0;)t[e]=n[e];return t},yg=(n=>e=>n&&e instanceof n)(typeof Uint8Array<"u"&&ha(Uint8Array)),bg=(n,e)=>{const i=(n&&n[fa]).call(n);let s;for(;(s=i.next())&&!s.done;){const a=s.value;e.call(n,a[0],a[1])}},wg=(n,e)=>{let t;const i=[];for(;(t=n.exec(e))!==null;)i.push(t);return i},Sg=wn("HTMLFormElement"),Eg=n=>n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(t,i,s){return i.toUpperCase()+s}),jo=(({hasOwnProperty:n})=>(e,t)=>n.call(e,t))(Object.prototype),{propertyIsEnumerable:Mg}=Object.prototype,Tg=wn("RegExp"),th=(n,e)=>{const t=Object.getOwnPropertyDescriptors(n),i={};Hr(t,(s,a)=>{let l;(l=e(s,a,n))!==!1&&(i[a]=l||s)}),Object.defineProperties(n,i)},Ag=n=>{th(n,(e,t)=>{if(Kt(n)&&["arguments","caller","callee"].includes(t))return!1;const i=n[t];if(Kt(i)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+t+"'")})}})},Rg=(n,e)=>{const t={},i=s=>{s.forEach(a=>{t[a]=!0})};return Ei(n)?i(n):i(String(n).split(e)),t},Cg=()=>{},Ng=(n,e)=>n!=null&&Number.isFinite(n=+n)?n:e;function Pg(n){return!!(n&&Kt(n.append)&&n[Ku]==="FormData"&&n[fa])}const Lg=n=>{const e=new WeakSet,t=i=>{if(zr(i)){if(e.has(i))return;if(hr(i))return i;if(!("toJSON"in i)){e.add(i);const s=Ei(i)?[]:{};return Hr(i,(a,l)=>{const o=t(a);!nr(o)&&(s[l]=o)}),e.delete(i),s}}return i};return t(n)},jg=wn("AsyncFunction"),Dg=n=>n&&(zr(n)||Kt(n))&&Kt(n.then)&&Kt(n.catch),nh=((n,e)=>n?setImmediate:e?((t,i)=>(xi.addEventListener("message",({source:s,data:a})=>{s===xi&&a===t&&i.length&&i.shift()()},!1),s=>{i.push(s),xi.postMessage(t,"*")}))(`axios@${Math.random()}`,[]):t=>setTimeout(t))(typeof setImmediate=="function",Kt(xi.postMessage)),Ig=typeof queueMicrotask<"u"?queueMicrotask.bind(xi):typeof process<"u"&&process.nextTick||nh,Ug=n=>n!=null&&Kt(n[fa]),G={isArray:Ei,isArrayBuffer:Zu,isBuffer:hr,isFormData:og,isArrayBufferView:Ym,isString:Km,isNumber:Ju,isBoolean:Zm,isObject:zr,isPlainObject:Hs,isEmptyObject:Jm,isReadableStream:cg,isRequest:dg,isResponse:ug,isHeaders:hg,isUndefined:nr,isDate:Qm,isFile:eg,isReactNativeBlob:tg,isReactNative:ng,isBlob:ig,isRegExp:Tg,isFunction:Kt,isStream:sg,isURLSearchParams:lg,isTypedArray:yg,isFileList:rg,forEach:Hr,merge:Lo,extend:pg,trim:fg,stripBOM:mg,inherits:gg,toFlatObject:xg,kindOf:pa,kindOfTest:wn,endsWith:vg,toArray:_g,forEachEntry:bg,matchAll:wg,isHTMLForm:Sg,hasOwnProperty:jo,hasOwnProp:jo,reduceDescriptors:th,freezeMethods:Ag,toObjectSet:Rg,toCamelCase:Eg,noop:Cg,toFiniteNumber:Ng,findKey:Qu,global:xi,isContextDefined:eh,isSpecCompliantForm:Pg,toJSONObject:Lg,isAsyncFn:jg,isThenable:Dg,setImmediate:nh,asap:Ig,isIterable:Ug},Og=G.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),kg=n=>{const e={};let t,i,s;return n&&n.split(`
`).forEach(function(l){s=l.indexOf(":"),t=l.substring(0,s).trim().toLowerCase(),i=l.substring(s+1).trim(),!(!t||e[t]&&Og[t])&&(t==="set-cookie"?e[t]?e[t].push(i):e[t]=[i]:e[t]=e[t]?e[t]+", "+i:i)}),e};function Fg(n){let e=0,t=n.length;for(;e<t;){const i=n.charCodeAt(e);if(i!==9&&i!==32)break;e+=1}for(;t>e;){const i=n.charCodeAt(t-1);if(i!==9&&i!==32)break;t-=1}return e===0&&t===n.length?n:n.slice(e,t)}const Bg=new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+","g"),zg=new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+","g");function rl(n,e){return G.isArray(n)?n.map(t=>rl(t,e)):Fg(String(n).replace(e,""))}const Hg=n=>rl(n,Bg),Gg=n=>rl(n,zg);function ih(n){const e=Object.create(null);return G.forEach(n.toJSON(),(t,i)=>{e[i]=Gg(t)}),e}const ql=Symbol("internals");function vr(n){return n&&String(n).trim().toLowerCase()}function Gs(n){return n===!1||n==null?n:G.isArray(n)?n.map(Gs):Hg(String(n))}function Vg(n){const e=Object.create(null),t=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=t.exec(n);)e[i[1]]=i[2];return e}const Wg=n=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());function Pa(n,e,t,i,s){if(G.isFunction(i))return i.call(this,e,t);if(s&&(e=t),!!G.isString(e)){if(G.isString(i))return e.indexOf(i)!==-1;if(G.isRegExp(i))return i.test(e)}}function Xg(n){return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,i)=>t.toUpperCase()+i)}function qg(n,e){const t=G.toCamelCase(" "+e);["get","set","has"].forEach(i=>{Object.defineProperty(n,i+t,{__proto__:null,value:function(s,a,l){return this[i].call(this,e,s,a,l)},configurable:!0})})}let Vt=class{constructor(e){e&&this.set(e)}set(e,t,i){const s=this;function a(o,c,d){const u=vr(c);if(!u)return;const p=G.findKey(s,u);(!p||s[p]===void 0||d===!0||d===void 0&&s[p]!==!1)&&(s[p||c]=Gs(o))}const l=(o,c)=>G.forEach(o,(d,u)=>a(d,u,c));if(G.isPlainObject(e)||e instanceof this.constructor)l(e,t);else if(G.isString(e)&&(e=e.trim())&&!Wg(e))l(kg(e),t);else if(G.isObject(e)&&G.isIterable(e)){let o={},c,d;for(const u of e){if(!G.isArray(u))throw new TypeError("Object iterator must return a key-value pair");o[d=u[0]]=(c=o[d])?G.isArray(c)?[...c,u[1]]:[c,u[1]]:u[1]}l(o,t)}else e!=null&&a(t,e,i);return this}get(e,t){if(e=vr(e),e){const i=G.findKey(this,e);if(i){const s=this[i];if(!t)return s;if(t===!0)return Vg(s);if(G.isFunction(t))return t.call(this,s,i);if(G.isRegExp(t))return t.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=vr(e),e){const i=G.findKey(this,e);return!!(i&&this[i]!==void 0&&(!t||Pa(this,this[i],i,t)))}return!1}delete(e,t){const i=this;let s=!1;function a(l){if(l=vr(l),l){const o=G.findKey(i,l);o&&(!t||Pa(i,i[o],o,t))&&(delete i[o],s=!0)}}return G.isArray(e)?e.forEach(a):a(e),s}clear(e){const t=Object.keys(this);let i=t.length,s=!1;for(;i--;){const a=t[i];(!e||Pa(this,this[a],a,e,!0))&&(delete this[a],s=!0)}return s}normalize(e){const t=this,i={};return G.forEach(this,(s,a)=>{const l=G.findKey(i,a);if(l){t[l]=Gs(s),delete t[a];return}const o=e?Xg(a):String(a).trim();o!==a&&delete t[a],t[o]=Gs(s),i[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return G.forEach(this,(i,s)=>{i!=null&&i!==!1&&(t[s]=e&&G.isArray(i)?i.join(", "):i)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const i=new this(e);return t.forEach(s=>i.set(s)),i}static accessor(e){const i=(this[ql]=this[ql]={accessors:{}}).accessors,s=this.prototype;function a(l){const o=vr(l);i[o]||(qg(s,l),i[o]=!0)}return G.isArray(e)?e.forEach(a):a(e),this}};Vt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);G.reduceDescriptors(Vt.prototype,({value:n},e)=>{let t=e[0].toUpperCase()+e.slice(1);return{get:()=>n,set(i){this[t]=i}}});G.freezeMethods(Vt);const $g="[REDACTED ****]";function Yg(n){if(G.hasOwnProp(n,"toJSON"))return!0;let e=Object.getPrototypeOf(n);for(;e&&e!==Object.prototype;){if(G.hasOwnProp(e,"toJSON"))return!0;e=Object.getPrototypeOf(e)}return!1}function Kg(n,e){const t=new Set(e.map(a=>String(a).toLowerCase())),i=[],s=a=>{if(a===null||typeof a!="object"||G.isBuffer(a))return a;if(i.indexOf(a)!==-1)return;a instanceof Vt&&(a=a.toJSON()),i.push(a);let l;if(G.isArray(a))l=[],a.forEach((o,c)=>{const d=s(o);G.isUndefined(d)||(l[c]=d)});else{if(!G.isPlainObject(a)&&Yg(a))return i.pop(),a;l=Object.create(null);for(const[o,c]of Object.entries(a)){const d=t.has(o.toLowerCase())?$g:s(c);G.isUndefined(d)||(l[o]=d)}}return i.pop(),l};return s(n)}let Re=class rh extends Error{static from(e,t,i,s,a,l){const o=new rh(e.message,t||e.code,i,s,a);return o.cause=e,o.name=e.name,e.status!=null&&o.status==null&&(o.status=e.status),l&&Object.assign(o,l),o}constructor(e,t,i,s,a){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,t&&(this.code=t),i&&(this.config=i),s&&(this.request=s),a&&(this.response=a,this.status=a.status)}toJSON(){const e=this.config,t=e&&G.hasOwnProp(e,"redact")?e.redact:void 0,i=G.isArray(t)&&t.length>0?Kg(e,t):G.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:i,code:this.code,status:this.status}}};Re.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Re.ERR_BAD_OPTION="ERR_BAD_OPTION";Re.ECONNABORTED="ECONNABORTED";Re.ETIMEDOUT="ETIMEDOUT";Re.ECONNREFUSED="ECONNREFUSED";Re.ERR_NETWORK="ERR_NETWORK";Re.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Re.ERR_DEPRECATED="ERR_DEPRECATED";Re.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Re.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Re.ERR_CANCELED="ERR_CANCELED";Re.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Re.ERR_INVALID_URL="ERR_INVALID_URL";Re.ERR_FORM_DATA_DEPTH_EXCEEDED="ERR_FORM_DATA_DEPTH_EXCEEDED";const Zg=null;function Do(n){return G.isPlainObject(n)||G.isArray(n)}function sh(n){return G.endsWith(n,"[]")?n.slice(0,-2):n}function La(n,e,t){return n?n.concat(e).map(function(s,a){return s=sh(s),!t&&a?"["+s+"]":s}).join(t?".":""):e}function Jg(n){return G.isArray(n)&&!n.some(Do)}const Qg=G.toFlatObject(G,{},null,function(e){return/^is[A-Z]/.test(e)});function ga(n,e,t){if(!G.isObject(n))throw new TypeError("target must be an object");e=e||new FormData,t=G.toFlatObject(t,{metaTokens:!0,dots:!1,indexes:!1},!1,function(m,f){return!G.isUndefined(f[m])});const i=t.metaTokens,s=t.visitor||p,a=t.dots,l=t.indexes,o=t.Blob||typeof Blob<"u"&&Blob,c=t.maxDepth===void 0?100:t.maxDepth,d=o&&G.isSpecCompliantForm(e);if(!G.isFunction(s))throw new TypeError("visitor must be a function");function u(x){if(x===null)return"";if(G.isDate(x))return x.toISOString();if(G.isBoolean(x))return x.toString();if(!d&&G.isBlob(x))throw new Re("Blob is not supported. Use a Buffer instead.");return G.isArrayBuffer(x)||G.isTypedArray(x)?d&&typeof Blob=="function"?new Blob([x]):Buffer.from(x):x}function p(x,m,f){let y=x;if(G.isReactNative(e)&&G.isReactNativeBlob(x))return e.append(La(f,m,a),u(x)),!1;if(x&&!f&&typeof x=="object"){if(G.endsWith(m,"{}"))m=i?m:m.slice(0,-2),x=JSON.stringify(x);else if(G.isArray(x)&&Jg(x)||(G.isFileList(x)||G.endsWith(m,"[]"))&&(y=G.toArray(x)))return m=sh(m),y.forEach(function(E,b){!(G.isUndefined(E)||E===null)&&e.append(l===!0?La([m],b,a):l===null?m:m+"[]",u(E))}),!1}return Do(x)?!0:(e.append(La(f,m,a),u(x)),!1)}const h=[],g=Object.assign(Qg,{defaultVisitor:p,convertValue:u,isVisitable:Do});function _(x,m,f=0){if(!G.isUndefined(x)){if(f>c)throw new Re("Object is too deeply nested ("+f+" levels). Max depth: "+c,Re.ERR_FORM_DATA_DEPTH_EXCEEDED);if(h.indexOf(x)!==-1)throw new Error("Circular reference detected in "+m.join("."));h.push(x),G.forEach(x,function(v,E){(!(G.isUndefined(v)||v===null)&&s.call(e,v,G.isString(E)?E.trim():E,m,g))===!0&&_(v,m?m.concat(E):[E],f+1)}),h.pop()}}if(!G.isObject(n))throw new TypeError("data must be an object");return _(n),e}function $l(n){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(n).replace(/[!'()~]|%20/g,function(i){return e[i]})}function sl(n,e){this._pairs=[],n&&ga(n,this,e)}const ah=sl.prototype;ah.append=function(e,t){this._pairs.push([e,t])};ah.toString=function(e){const t=e?function(i){return e.call(this,i,$l)}:$l;return this._pairs.map(function(s){return t(s[0])+"="+t(s[1])},"").join("&")};function ex(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function oh(n,e,t){if(!e)return n;const i=t&&t.encode||ex,s=G.isFunction(t)?{serialize:t}:t,a=s&&s.serialize;let l;if(a?l=a(e,s):l=G.isURLSearchParams(e)?e.toString():new sl(e,s).toString(i),l){const o=n.indexOf("#");o!==-1&&(n=n.slice(0,o)),n+=(n.indexOf("?")===-1?"?":"&")+l}return n}class Yl{constructor(){this.handlers=[]}use(e,t,i){return this.handlers.push({fulfilled:e,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){G.forEach(this.handlers,function(i){i!==null&&e(i)})}}const al={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1},tx=typeof URLSearchParams<"u"?URLSearchParams:sl,nx=typeof FormData<"u"?FormData:null,ix=typeof Blob<"u"?Blob:null,rx={isBrowser:!0,classes:{URLSearchParams:tx,FormData:nx,Blob:ix},protocols:["http","https","file","blob","url","data"]},ol=typeof window<"u"&&typeof document<"u",Io=typeof navigator=="object"&&navigator||void 0,sx=ol&&(!Io||["ReactNative","NativeScript","NS"].indexOf(Io.product)<0),ax=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",ox=ol&&window.location.href||"http://localhost",lx=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ol,hasStandardBrowserEnv:sx,hasStandardBrowserWebWorkerEnv:ax,navigator:Io,origin:ox},Symbol.toStringTag,{value:"Module"})),It={...lx,...rx};function cx(n,e){return ga(n,new It.classes.URLSearchParams,{visitor:function(t,i,s,a){return It.isNode&&G.isBuffer(t)?(this.append(i,t.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...e})}function dx(n){return G.matchAll(/\w+|\[(\w*)]/g,n).map(e=>e[0]==="[]"?"":e[1]||e[0])}function ux(n){const e={},t=Object.keys(n);let i;const s=t.length;let a;for(i=0;i<s;i++)a=t[i],e[a]=n[a];return e}function lh(n){function e(t,i,s,a){let l=t[a++];if(l==="__proto__")return!0;const o=Number.isFinite(+l),c=a>=t.length;return l=!l&&G.isArray(s)?s.length:l,c?(G.hasOwnProp(s,l)?s[l]=G.isArray(s[l])?s[l].concat(i):[s[l],i]:s[l]=i,!o):((!G.hasOwnProp(s,l)||!G.isObject(s[l]))&&(s[l]=[]),e(t,i,s[l],a)&&G.isArray(s[l])&&(s[l]=ux(s[l])),!o)}if(G.isFormData(n)&&G.isFunction(n.entries)){const t={};return G.forEachEntry(n,(i,s)=>{e(dx(i),s,t,0)}),t}return null}const Pi=(n,e)=>n!=null&&G.hasOwnProp(n,e)?n[e]:void 0;function hx(n,e,t){if(G.isString(n))try{return(e||JSON.parse)(n),G.trim(n)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(n)}const Gr={transitional:al,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const i=t.getContentType()||"",s=i.indexOf("application/json")>-1,a=G.isObject(e);if(a&&G.isHTMLForm(e)&&(e=new FormData(e)),G.isFormData(e))return s?JSON.stringify(lh(e)):e;if(G.isArrayBuffer(e)||G.isBuffer(e)||G.isStream(e)||G.isFile(e)||G.isBlob(e)||G.isReadableStream(e))return e;if(G.isArrayBufferView(e))return e.buffer;if(G.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let o;if(a){const c=Pi(this,"formSerializer");if(i.indexOf("application/x-www-form-urlencoded")>-1)return cx(e,c).toString();if((o=G.isFileList(e))||i.indexOf("multipart/form-data")>-1){const d=Pi(this,"env"),u=d&&d.FormData;return ga(o?{"files[]":e}:e,u&&new u,c)}}return a||s?(t.setContentType("application/json",!1),hx(e)):e}],transformResponse:[function(e){const t=Pi(this,"transitional")||Gr.transitional,i=t&&t.forcedJSONParsing,s=Pi(this,"responseType"),a=s==="json";if(G.isResponse(e)||G.isReadableStream(e))return e;if(e&&G.isString(e)&&(i&&!s||a)){const o=!(t&&t.silentJSONParsing)&&a;try{return JSON.parse(e,Pi(this,"parseReviver"))}catch(c){if(o)throw c.name==="SyntaxError"?Re.from(c,Re.ERR_BAD_RESPONSE,this,null,Pi(this,"response")):c}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:It.classes.FormData,Blob:It.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};G.forEach(["delete","get","head","post","put","patch","query"],n=>{Gr.headers[n]={}});function ja(n,e){const t=this||Gr,i=e||t,s=Vt.from(i.headers);let a=i.data;return G.forEach(n,function(o){a=o.call(t,a,s.normalize(),e?e.status:void 0)}),s.normalize(),a}function ch(n){return!!(n&&n.__CANCEL__)}let Vr=class extends Re{constructor(e,t,i){super(e??"canceled",Re.ERR_CANCELED,t,i),this.name="CanceledError",this.__CANCEL__=!0}};function dh(n,e,t){const i=t.config.validateStatus;!t.status||!i||i(t.status)?n(t):e(new Re("Request failed with status code "+t.status,t.status>=400&&t.status<500?Re.ERR_BAD_REQUEST:Re.ERR_BAD_RESPONSE,t.config,t.request,t))}function fx(n){const e=/^([-+\w]{1,25}):(?:\/\/)?/.exec(n);return e&&e[1]||""}function px(n,e){n=n||10;const t=new Array(n),i=new Array(n);let s=0,a=0,l;return e=e!==void 0?e:1e3,function(c){const d=Date.now(),u=i[a];l||(l=d),t[s]=c,i[s]=d;let p=a,h=0;for(;p!==s;)h+=t[p++],p=p%n;if(s=(s+1)%n,s===a&&(a=(a+1)%n),d-l<e)return;const g=u&&d-u;return g?Math.round(h*1e3/g):void 0}}function mx(n,e){let t=0,i=1e3/e,s,a;const l=(d,u=Date.now())=>{t=u,s=null,a&&(clearTimeout(a),a=null),n(...d)};return[(...d)=>{const u=Date.now(),p=u-t;p>=i?l(d,u):(s=d,a||(a=setTimeout(()=>{a=null,l(s)},i-p)))},()=>s&&l(s)]}const Ks=(n,e,t=3)=>{let i=0;const s=px(50,250);return mx(a=>{if(!a||typeof a.loaded!="number")return;const l=a.loaded,o=a.lengthComputable?a.total:void 0,c=o!=null?Math.min(l,o):l,d=Math.max(0,c-i),u=s(d);i=Math.max(i,c);const p={loaded:c,total:o,progress:o?c/o:void 0,bytes:d,rate:u||void 0,estimated:u&&o?(o-c)/u:void 0,event:a,lengthComputable:o!=null,[e?"download":"upload"]:!0};n(p)},t)},Kl=(n,e)=>{const t=n!=null;return[i=>e[0]({lengthComputable:t,total:n,loaded:i}),e[1]]},Zl=n=>(...e)=>G.asap(()=>n(...e)),gx=It.hasStandardBrowserEnv?((n,e)=>t=>(t=new URL(t,It.origin),n.protocol===t.protocol&&n.host===t.host&&(e||n.port===t.port)))(new URL(It.origin),It.navigator&&/(msie|trident)/i.test(It.navigator.userAgent)):()=>!0,xx=It.hasStandardBrowserEnv?{write(n,e,t,i,s,a,l){if(typeof document>"u")return;const o=[`${n}=${encodeURIComponent(e)}`];G.isNumber(t)&&o.push(`expires=${new Date(t).toUTCString()}`),G.isString(i)&&o.push(`path=${i}`),G.isString(s)&&o.push(`domain=${s}`),a===!0&&o.push("secure"),G.isString(l)&&o.push(`SameSite=${l}`),document.cookie=o.join("; ")},read(n){if(typeof document>"u")return null;const e=document.cookie.split(";");for(let t=0;t<e.length;t++){const i=e[t].replace(/^\s+/,""),s=i.indexOf("=");if(s!==-1&&i.slice(0,s)===n)return decodeURIComponent(i.slice(s+1))}return null},remove(n){this.write(n,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function vx(n){return typeof n!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(n)}function _x(n,e){return e?n.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):n}function uh(n,e,t){let i=!vx(e);return n&&(i||t===!1)?_x(n,e):e}const Jl=n=>n instanceof Vt?{...n}:n;function Mi(n,e){e=e||{};const t=Object.create(null);Object.defineProperty(t,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function i(d,u,p,h){return G.isPlainObject(d)&&G.isPlainObject(u)?G.merge.call({caseless:h},d,u):G.isPlainObject(u)?G.merge({},u):G.isArray(u)?u.slice():u}function s(d,u,p,h){if(G.isUndefined(u)){if(!G.isUndefined(d))return i(void 0,d,p,h)}else return i(d,u,p,h)}function a(d,u){if(!G.isUndefined(u))return i(void 0,u)}function l(d,u){if(G.isUndefined(u)){if(!G.isUndefined(d))return i(void 0,d)}else return i(void 0,u)}function o(d,u,p){if(G.hasOwnProp(e,p))return i(d,u);if(G.hasOwnProp(n,p))return i(void 0,d)}const c={url:a,method:a,data:a,baseURL:l,transformRequest:l,transformResponse:l,paramsSerializer:l,timeout:l,timeoutMessage:l,withCredentials:l,withXSRFToken:l,adapter:l,responseType:l,xsrfCookieName:l,xsrfHeaderName:l,onUploadProgress:l,onDownloadProgress:l,decompress:l,maxContentLength:l,maxBodyLength:l,beforeRedirect:l,transport:l,httpAgent:l,httpsAgent:l,cancelToken:l,socketPath:l,allowedSocketPaths:l,responseEncoding:l,validateStatus:o,headers:(d,u,p)=>s(Jl(d),Jl(u),p,!0)};return G.forEach(Object.keys({...n,...e}),function(u){if(u==="__proto__"||u==="constructor"||u==="prototype")return;const p=G.hasOwnProp(c,u)?c[u]:s,h=G.hasOwnProp(n,u)?n[u]:void 0,g=G.hasOwnProp(e,u)?e[u]:void 0,_=p(h,g,u);G.isUndefined(_)&&p!==o||(t[u]=_)}),t}const yx=["content-type","content-length"];function bx(n,e,t){if(t!=="content-only"){n.set(e);return}Object.entries(e).forEach(([i,s])=>{yx.includes(i.toLowerCase())&&n.set(i,s)})}const wx=n=>encodeURIComponent(n).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16)));function hh(n){const e=Mi({},n),t=h=>G.hasOwnProp(e,h)?e[h]:void 0,i=t("data");let s=t("withXSRFToken");const a=t("xsrfHeaderName"),l=t("xsrfCookieName");let o=t("headers");const c=t("auth"),d=t("baseURL"),u=t("allowAbsoluteUrls"),p=t("url");if(e.headers=o=Vt.from(o),e.url=oh(uh(d,p,u),t("params"),t("paramsSerializer")),c&&o.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?wx(c.password):""))),G.isFormData(i)&&(It.hasStandardBrowserEnv||It.hasStandardBrowserWebWorkerEnv||G.isReactNative(i)?o.setContentType(void 0):G.isFunction(i.getHeaders)&&bx(o,i.getHeaders(),t("formDataHeaderPolicy"))),It.hasStandardBrowserEnv&&(G.isFunction(s)&&(s=s(e)),s===!0||s==null&&gx(e.url))){const g=a&&l&&xx.read(l);g&&o.set(a,g)}return e}const Sx=typeof XMLHttpRequest<"u",Ex=Sx&&function(n){return new Promise(function(t,i){const s=hh(n);let a=s.data;const l=Vt.from(s.headers).normalize();let{responseType:o,onUploadProgress:c,onDownloadProgress:d}=s,u,p,h,g,_;function x(){g&&g(),_&&_(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(s.method.toUpperCase(),s.url,!0),m.timeout=s.timeout;function f(){if(!m)return;const v=Vt.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),b={data:!o||o==="text"||o==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:v,config:n,request:m};dh(function(T){t(T),x()},function(T){i(T),x()},b),m=null}"onloadend"in m?m.onloadend=f:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.startsWith("file:"))||setTimeout(f)},m.onabort=function(){m&&(i(new Re("Request aborted",Re.ECONNABORTED,n,m)),x(),m=null)},m.onerror=function(E){const b=E&&E.message?E.message:"Network Error",M=new Re(b,Re.ERR_NETWORK,n,m);M.event=E||null,i(M),x(),m=null},m.ontimeout=function(){let E=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const b=s.transitional||al;s.timeoutErrorMessage&&(E=s.timeoutErrorMessage),i(new Re(E,b.clarifyTimeoutError?Re.ETIMEDOUT:Re.ECONNABORTED,n,m)),x(),m=null},a===void 0&&l.setContentType(null),"setRequestHeader"in m&&G.forEach(ih(l),function(E,b){m.setRequestHeader(b,E)}),G.isUndefined(s.withCredentials)||(m.withCredentials=!!s.withCredentials),o&&o!=="json"&&(m.responseType=s.responseType),d&&([h,_]=Ks(d,!0),m.addEventListener("progress",h)),c&&m.upload&&([p,g]=Ks(c),m.upload.addEventListener("progress",p),m.upload.addEventListener("loadend",g)),(s.cancelToken||s.signal)&&(u=v=>{m&&(i(!v||v.type?new Vr(null,n,m):v),m.abort(),x(),m=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const y=fx(s.url);if(y&&!It.protocols.includes(y)){i(new Re("Unsupported protocol "+y+":",Re.ERR_BAD_REQUEST,n));return}m.send(a||null)})},Mx=(n,e)=>{if(n=n?n.filter(Boolean):[],!e&&!n.length)return;const t=new AbortController;let i=!1;const s=function(c){if(!i){i=!0,l();const d=c instanceof Error?c:this.reason;t.abort(d instanceof Re?d:new Vr(d instanceof Error?d.message:d))}};let a=e&&setTimeout(()=>{a=null,s(new Re(`timeout of ${e}ms exceeded`,Re.ETIMEDOUT))},e);const l=()=>{n&&(a&&clearTimeout(a),a=null,n.forEach(c=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),n=null)};n.forEach(c=>c.addEventListener("abort",s));const{signal:o}=t;return o.unsubscribe=()=>G.asap(l),o},Tx=function*(n,e){let t=n.byteLength;if(t<e){yield n;return}let i=0,s;for(;i<t;)s=i+e,yield n.slice(i,s),i=s},Ax=async function*(n,e){for await(const t of Rx(n))yield*Tx(t,e)},Rx=async function*(n){if(n[Symbol.asyncIterator]){yield*n;return}const e=n.getReader();try{for(;;){const{done:t,value:i}=await e.read();if(t)break;yield i}}finally{await e.cancel()}},Ql=(n,e,t,i)=>{const s=Ax(n,e);let a=0,l,o=c=>{l||(l=!0,i&&i(c))};return new ReadableStream({async pull(c){try{const{done:d,value:u}=await s.next();if(d){o(),c.close();return}let p=u.byteLength;if(t){let h=a+=p;t(h)}c.enqueue(new Uint8Array(u))}catch(d){throw o(d),d}},cancel(c){return o(c),s.return()}},{highWaterMark:2})};function Cx(n){if(!n||typeof n!="string"||!n.startsWith("data:"))return 0;const e=n.indexOf(",");if(e<0)return 0;const t=n.slice(5,e),i=n.slice(e+1);if(/;base64/i.test(t)){let l=i.length;const o=i.length;for(let g=0;g<o;g++)if(i.charCodeAt(g)===37&&g+2<o){const _=i.charCodeAt(g+1),x=i.charCodeAt(g+2);(_>=48&&_<=57||_>=65&&_<=70||_>=97&&_<=102)&&(x>=48&&x<=57||x>=65&&x<=70||x>=97&&x<=102)&&(l-=2,g+=2)}let c=0,d=o-1;const u=g=>g>=2&&i.charCodeAt(g-2)===37&&i.charCodeAt(g-1)===51&&(i.charCodeAt(g)===68||i.charCodeAt(g)===100);d>=0&&(i.charCodeAt(d)===61?(c++,d--):u(d)&&(c++,d-=3)),c===1&&d>=0&&(i.charCodeAt(d)===61||u(d))&&c++;const h=Math.floor(l/4)*3-(c||0);return h>0?h:0}if(typeof Buffer<"u"&&typeof Buffer.byteLength=="function")return Buffer.byteLength(i,"utf8");let a=0;for(let l=0,o=i.length;l<o;l++){const c=i.charCodeAt(l);if(c<128)a+=1;else if(c<2048)a+=2;else if(c>=55296&&c<=56319&&l+1<o){const d=i.charCodeAt(l+1);d>=56320&&d<=57343?(a+=4,l++):a+=3}else a+=3}return a}const ll="1.17.0",ec=64*1024,{isFunction:es}=G,Nx=n=>encodeURIComponent(n).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),tc=n=>{if(!G.isString(n))return n;try{return decodeURIComponent(n)}catch{return n}},nc=(n,...e)=>{try{return!!n(...e)}catch{return!1}},Px=n=>{const e=n.indexOf("://");let t=n;return e!==-1&&(t=t.slice(e+3)),t.includes("@")||t.includes(":")},Lx=n=>{const e=G.global!==void 0&&G.global!==null?G.global:globalThis,{ReadableStream:t,TextEncoder:i}=e;n=G.merge.call({skipUndefined:!0},{Request:e.Request,Response:e.Response},n);const{fetch:s,Request:a,Response:l}=n,o=s?es(s):typeof fetch=="function",c=es(a),d=es(l);if(!o)return!1;const u=o&&es(t),p=o&&(typeof i=="function"?(f=>y=>f.encode(y))(new i):async f=>new Uint8Array(await new a(f).arrayBuffer())),h=c&&u&&nc(()=>{let f=!1;const y=new a(It.origin,{body:new t,method:"POST",get duplex(){return f=!0,"half"}}),v=y.headers.has("Content-Type");return y.body!=null&&y.body.cancel(),f&&!v}),g=d&&u&&nc(()=>G.isReadableStream(new l("").body)),_={stream:g&&(f=>f.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(f=>{!_[f]&&(_[f]=(y,v)=>{let E=y&&y[f];if(E)return E.call(y);throw new Re(`Response type '${f}' is not supported`,Re.ERR_NOT_SUPPORT,v)})});const x=async f=>{if(f==null)return 0;if(G.isBlob(f))return f.size;if(G.isSpecCompliantForm(f))return(await new a(It.origin,{method:"POST",body:f}).arrayBuffer()).byteLength;if(G.isArrayBufferView(f)||G.isArrayBuffer(f))return f.byteLength;if(G.isURLSearchParams(f)&&(f=f+""),G.isString(f))return(await p(f)).byteLength},m=async(f,y)=>{const v=G.toFiniteNumber(f.getContentLength());return v??x(y)};return async f=>{let{url:y,method:v,data:E,signal:b,cancelToken:M,timeout:T,onDownloadProgress:N,onUploadProgress:w,responseType:A,headers:I,withCredentials:F="same-origin",fetchOptions:$,maxContentLength:P,maxBodyLength:H}=hh(f);const J=G.isNumber(P)&&P>-1,K=G.isNumber(H)&&H>-1,ae=B=>G.hasOwnProp(f,B)?f[B]:void 0;let ee=s||fetch;A=A?(A+"").toLowerCase():"text";let ie=Mx([b,M&&M.toAbortSignal()],T),D=null;const L=ie&&ie.unsubscribe&&(()=>{ie.unsubscribe()});let V;try{let B;const Q=ae("auth");if(Q){const oe=Q.username||"",U=Q.password||"";B={username:oe,password:U}}if(Px(y)){const oe=new URL(y,It.origin);if(!B&&(oe.username||oe.password)){const U=tc(oe.username),Ze=tc(oe.password);B={username:U,password:Ze}}(oe.username||oe.password)&&(oe.username="",oe.password="",y=oe.href)}if(B&&(I.delete("authorization"),I.set("Authorization","Basic "+btoa(Nx((B.username||"")+":"+(B.password||""))))),J&&typeof y=="string"&&y.startsWith("data:")&&Cx(y)>P)throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,f,D);if(K&&v!=="get"&&v!=="head"){const oe=await m(I,E);if(typeof oe=="number"&&isFinite(oe)&&oe>H)throw new Re("Request body larger than maxBodyLength limit",Re.ERR_BAD_REQUEST,f,D)}if(w&&h&&v!=="get"&&v!=="head"&&(V=await m(I,E))!==0){let oe=new a(y,{method:"POST",body:E,duplex:"half"}),U;if(G.isFormData(E)&&(U=oe.headers.get("content-type"))&&I.setContentType(U),oe.body){const[Ze,ye]=Kl(V,Ks(Zl(w)));E=Ql(oe.body,ec,Ze,ye)}}G.isString(F)||(F=F?"include":"omit");const O=c&&"credentials"in a.prototype;if(G.isFormData(E)){const oe=I.getContentType();oe&&/^multipart\/form-data/i.test(oe)&&!/boundary=/i.test(oe)&&I.delete("content-type")}I.set("User-Agent","axios/"+ll,!1);const _e={...$,signal:ie,method:v.toUpperCase(),headers:ih(I.normalize()),body:E,duplex:"half",credentials:O?F:void 0};D=c&&new a(y,_e);let Y=await(c?ee(D,$):ee(y,_e));if(J){const oe=G.toFiniteNumber(Y.headers.get("content-length"));if(oe!=null&&oe>P)throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,f,D)}const Se=g&&(A==="stream"||A==="response");if(g&&Y.body&&(N||J||Se&&L)){const oe={};["status","statusText","headers"].forEach(Ce=>{oe[Ce]=Y[Ce]});const U=G.toFiniteNumber(Y.headers.get("content-length")),[Ze,ye]=N&&Kl(U,Ks(Zl(N),!0))||[];let me=0;const Ae=Ce=>{if(J&&(me=Ce,me>P))throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,f,D);Ze&&Ze(Ce)};Y=new l(Ql(Y.body,ec,Ae,()=>{ye&&ye(),L&&L()}),oe)}A=A||"text";let Me=await _[G.findKey(_,A)||"text"](Y,f);if(J&&!g&&!Se){let oe;if(Me!=null&&(typeof Me.byteLength=="number"?oe=Me.byteLength:typeof Me.size=="number"?oe=Me.size:typeof Me=="string"&&(oe=typeof i=="function"?new i().encode(Me).byteLength:Me.length)),typeof oe=="number"&&oe>P)throw new Re("maxContentLength size of "+P+" exceeded",Re.ERR_BAD_RESPONSE,f,D)}return!Se&&L&&L(),await new Promise((oe,U)=>{dh(oe,U,{data:Me,headers:Vt.from(Y.headers),status:Y.status,statusText:Y.statusText,config:f,request:D})})}catch(B){if(L&&L(),ie&&ie.aborted&&ie.reason instanceof Re){const Q=ie.reason;throw Q.config=f,D&&(Q.request=D),B!==Q&&(Q.cause=B),Q}throw B&&B.name==="TypeError"&&/Load failed|fetch/i.test(B.message)?Object.assign(new Re("Network Error",Re.ERR_NETWORK,f,D,B&&B.response),{cause:B.cause||B}):Re.from(B,B&&B.code,f,D,B&&B.response)}}},jx=new Map,fh=n=>{let e=n&&n.env||{};const{fetch:t,Request:i,Response:s}=e,a=[i,s,t];let l=a.length,o=l,c,d,u=jx;for(;o--;)c=a[o],d=u.get(c),d===void 0&&u.set(c,d=o?new Map:Lx(e)),u=d;return d};fh();const cl={http:Zg,xhr:Ex,fetch:{get:fh}};G.forEach(cl,(n,e)=>{if(n){try{Object.defineProperty(n,"name",{__proto__:null,value:e})}catch{}Object.defineProperty(n,"adapterName",{__proto__:null,value:e})}});const ic=n=>`- ${n}`,Dx=n=>G.isFunction(n)||n===null||n===!1;function Ix(n,e){n=G.isArray(n)?n:[n];const{length:t}=n;let i,s;const a={};for(let l=0;l<t;l++){i=n[l];let o;if(s=i,!Dx(i)&&(s=cl[(o=String(i)).toLowerCase()],s===void 0))throw new Re(`Unknown adapter '${o}'`);if(s&&(G.isFunction(s)||(s=s.get(e))))break;a[o||"#"+l]=s}if(!s){const l=Object.entries(a).map(([c,d])=>`adapter ${c} `+(d===!1?"is not supported by the environment":"is not available in the build"));let o=t?l.length>1?`since :
`+l.map(ic).join(`
`):" "+ic(l[0]):"as no adapter specified";throw new Re("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return s}const ph={getAdapter:Ix,adapters:cl};function Da(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new Vr(null,n)}function rc(n){return Da(n),n.headers=Vt.from(n.headers),n.data=ja.call(n,n.transformRequest),["post","put","patch"].indexOf(n.method)!==-1&&n.headers.setContentType("application/x-www-form-urlencoded",!1),ph.getAdapter(n.adapter||Gr.adapter,n)(n).then(function(i){Da(n),n.response=i;try{i.data=ja.call(n,n.transformResponse,i)}finally{delete n.response}return i.headers=Vt.from(i.headers),i},function(i){if(!ch(i)&&(Da(n),i&&i.response)){n.response=i.response;try{i.response.data=ja.call(n,n.transformResponse,i.response)}finally{delete n.response}i.response.headers=Vt.from(i.response.headers)}return Promise.reject(i)})}const xa={};["object","boolean","number","function","string","symbol"].forEach((n,e)=>{xa[n]=function(i){return typeof i===n||"a"+(e<1?"n ":" ")+n}});const sc={};xa.transitional=function(e,t,i){function s(a,l){return"[Axios v"+ll+"] Transitional option '"+a+"'"+l+(i?". "+i:"")}return(a,l,o)=>{if(e===!1)throw new Re(s(l," has been removed"+(t?" in "+t:"")),Re.ERR_DEPRECATED);return t&&!sc[l]&&(sc[l]=!0,console.warn(s(l," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(a,l,o):!0}};xa.spelling=function(e){return(t,i)=>(console.warn(`${i} is likely a misspelling of ${e}`),!0)};function Ux(n,e,t){if(typeof n!="object")throw new Re("options must be an object",Re.ERR_BAD_OPTION_VALUE);const i=Object.keys(n);let s=i.length;for(;s-- >0;){const a=i[s],l=Object.prototype.hasOwnProperty.call(e,a)?e[a]:void 0;if(l){const o=n[a],c=o===void 0||l(o,a,n);if(c!==!0)throw new Re("option "+a+" must be "+c,Re.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new Re("Unknown option "+a,Re.ERR_BAD_OPTION)}}const Vs={assertOptions:Ux,validators:xa},Xt=Vs.validators;let _i=class{constructor(e){this.defaults=e||{},this.interceptors={request:new Yl,response:new Yl}}async request(e,t){try{return await this._request(e,t)}catch(i){if(i instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const a=(()=>{if(!s.stack)return"";const l=s.stack.indexOf(`
`);return l===-1?"":s.stack.slice(l+1)})();try{if(!i.stack)i.stack=a;else if(a){const l=a.indexOf(`
`),o=l===-1?-1:a.indexOf(`
`,l+1),c=o===-1?"":a.slice(o+1);String(i.stack).endsWith(c)||(i.stack+=`
`+a)}}catch{}}throw i}}_request(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=Mi(this.defaults,t);const{transitional:i,paramsSerializer:s,headers:a}=t;i!==void 0&&Vs.assertOptions(i,{silentJSONParsing:Xt.transitional(Xt.boolean),forcedJSONParsing:Xt.transitional(Xt.boolean),clarifyTimeoutError:Xt.transitional(Xt.boolean),legacyInterceptorReqResOrdering:Xt.transitional(Xt.boolean),advertiseZstdAcceptEncoding:Xt.transitional(Xt.boolean)},!1),s!=null&&(G.isFunction(s)?t.paramsSerializer={serialize:s}:Vs.assertOptions(s,{encode:Xt.function,serialize:Xt.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),Vs.assertOptions(t,{baseUrl:Xt.spelling("baseURL"),withXsrfToken:Xt.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let l=a&&G.merge(a.common,a[t.method]);a&&G.forEach(["delete","get","head","post","put","patch","query","common"],_=>{delete a[_]}),t.headers=Vt.concat(l,a);const o=[];let c=!0;this.interceptors.request.forEach(function(x){if(typeof x.runWhen=="function"&&x.runWhen(t)===!1)return;c=c&&x.synchronous;const m=t.transitional||al;m&&m.legacyInterceptorReqResOrdering?o.unshift(x.fulfilled,x.rejected):o.push(x.fulfilled,x.rejected)});const d=[];this.interceptors.response.forEach(function(x){d.push(x.fulfilled,x.rejected)});let u,p=0,h;if(!c){const _=[rc.bind(this),void 0];for(_.unshift(...o),_.push(...d),h=_.length,u=Promise.resolve(t);p<h;)u=u.then(_[p++],_[p++]);return u}h=o.length;let g=t;for(;p<h;){const _=o[p++],x=o[p++];try{g=_(g)}catch(m){x.call(this,m);break}}try{u=rc.call(this,g)}catch(_){return Promise.reject(_)}for(p=0,h=d.length;p<h;)u=u.then(d[p++],d[p++]);return u}getUri(e){e=Mi(this.defaults,e);const t=uh(e.baseURL,e.url,e.allowAbsoluteUrls);return oh(t,e.params,e.paramsSerializer)}};G.forEach(["delete","get","head","options"],function(e){_i.prototype[e]=function(t,i){return this.request(Mi(i||{},{method:e,url:t,data:(i||{}).data}))}});G.forEach(["post","put","patch","query"],function(e){function t(i){return function(a,l,o){return this.request(Mi(o||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:a,data:l}))}}_i.prototype[e]=t(),e!=="query"&&(_i.prototype[e+"Form"]=t(!0))});let Ox=class mh{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(a){t=a});const i=this;this.promise.then(s=>{if(!i._listeners)return;let a=i._listeners.length;for(;a-- >0;)i._listeners[a](s);i._listeners=null}),this.promise.then=s=>{let a;const l=new Promise(o=>{i.subscribe(o),a=o}).then(s);return l.cancel=function(){i.unsubscribe(a)},l},e(function(a,l,o){i.reason||(i.reason=new Vr(a,l,o),t(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=i=>{e.abort(i)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new mh(function(s){e=s}),cancel:e}}};function kx(n){return function(t){return n.apply(null,t)}}function Fx(n){return G.isObject(n)&&n.isAxiosError===!0}const Uo={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Uo).forEach(([n,e])=>{Uo[e]=n});function gh(n){const e=new _i(n),t=Yu(_i.prototype.request,e);return G.extend(t,_i.prototype,e,{allOwnKeys:!0}),G.extend(t,e,null,{allOwnKeys:!0}),t.create=function(s){return gh(Mi(n,s))},t}const gt=gh(Gr);gt.Axios=_i;gt.CanceledError=Vr;gt.CancelToken=Ox;gt.isCancel=ch;gt.VERSION=ll;gt.toFormData=ga;gt.AxiosError=Re;gt.Cancel=gt.CanceledError;gt.all=function(e){return Promise.all(e)};gt.spread=kx;gt.isAxiosError=Fx;gt.mergeConfig=Mi;gt.AxiosHeaders=Vt;gt.formToJSON=n=>lh(G.isHTMLForm(n)?new FormData(n):n);gt.getAdapter=ph.getAdapter;gt.HttpStatusCode=Uo;gt.default=gt;const{Axios:bM,AxiosError:wM,CanceledError:SM,isCancel:EM,CancelToken:MM,VERSION:TM,all:AM,Cancel:RM,isAxiosError:CM,spread:NM,toFormData:PM,AxiosHeaders:LM,HttpStatusCode:jM,formToJSON:DM,getAdapter:IM,mergeConfig:UM,create:OM}=gt,Bx=({onLogin:n})=>{const[e,t]=z.useState(""),[i,s]=z.useState(""),[a,l]=z.useState(""),o=oa(),c=async d=>{d.preventDefault();try{const u=await gt.post("http://localhost:5000/api/auth/login",{email:e,password:i}),{token:p,...h}=u.data;localStorage.setItem("authToken",p),n(h),o("/")}catch(u){l(u.response?.data?.error||"Ошибка входа")}};return r.jsxs("div",{className:"max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg",children:[r.jsx("h2",{className:"text-2xl font-bold mb-4 text-center",children:"Вход в аккаунт"}),a&&r.jsx("p",{className:"text-red-500 text-center mb-4",children:a}),r.jsxs("form",{onSubmit:c,className:"space-y-4",children:[r.jsx("div",{children:r.jsx("input",{type:"email",placeholder:"Email",value:e,onChange:d=>t(d.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsx("input",{type:"password",placeholder:"Пароль",value:i,onChange:d=>s(d.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("button",{type:"submit",className:"w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Войти"})]}),r.jsxs("p",{className:"mt-4 text-center",children:["Нет аккаунта?"," ",r.jsx("a",{href:"/register",className:"text-blue-500 hover:underline",children:"Зарегистрируйтесь"})]})]})},zx=({onRegister:n})=>{const[e,t]=z.useState(""),[i,s]=z.useState(""),[a,l]=z.useState(""),[o,c]=z.useState("user"),[d,u]=z.useState(""),p=oa(),h=async g=>{g.preventDefault();try{const _=await gt.post("http://localhost:5000/api/auth/register",{username:e,email:i,password:a,role:o}),{token:x,...m}=_.data;localStorage.setItem("authToken",x),n(m),p("/")}catch(_){u(_.response?.data?.error||"Ошибка регистрации")}};return r.jsxs("div",{className:"max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg",children:[r.jsx("h2",{className:"text-2xl font-bold mb-4 text-center",children:"Регистрация"}),d&&r.jsx("p",{className:"text-red-500 text-center mb-4",children:d}),r.jsxs("form",{onSubmit:h,className:"space-y-4",children:[r.jsx("div",{children:r.jsx("input",{type:"text",placeholder:"Имя пользователя",value:e,onChange:g=>t(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsx("input",{type:"email",placeholder:"Email",value:i,onChange:g=>s(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsx("input",{type:"password",placeholder:"Пароль",value:a,onChange:g=>l(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})}),r.jsx("div",{children:r.jsxs("select",{value:o,onChange:g=>c(g.target.value),className:"w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",children:[r.jsx("option",{value:"user",children:"Обычный пользователь"}),r.jsx("option",{value:"tour_guide",children:"Организатор туров"}),r.jsx("option",{value:"auction_participant",children:"Участник аукционов"})]})}),r.jsx("button",{type:"submit",className:"w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",children:"Зарегистрироваться"})]}),r.jsxs("p",{className:"mt-4 text-center",children:["Уже есть аккаунт?"," ",r.jsx("a",{href:"/login",className:"text-blue-500 hover:underline",children:"Войдите"})]})]})};var Ia={exports:{}},ct={};var ac;function Hx(){if(ac)return ct;ac=1;var n=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),a=Symbol.for("react.consumer"),l=Symbol.for("react.context"),o=Symbol.for("react.forward_ref"),c=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),u=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),h=Symbol.for("react.view_transition"),g=Symbol.for("react.client.reference");function _(x){if(typeof x=="object"&&x!==null){var m=x.$$typeof;switch(m){case n:switch(x=x.type,x){case t:case s:case i:case c:case d:case h:return x;default:switch(x=x&&x.$$typeof,x){case l:case o:case p:case u:return x;case a:return x;default:return m}}case e:return m}}}return ct.ContextConsumer=a,ct.ContextProvider=l,ct.Element=n,ct.ForwardRef=o,ct.Fragment=t,ct.Lazy=p,ct.Memo=u,ct.Portal=e,ct.Profiler=s,ct.StrictMode=i,ct.Suspense=c,ct.SuspenseList=d,ct.isContextConsumer=function(x){return _(x)===a},ct.isContextProvider=function(x){return _(x)===l},ct.isElement=function(x){return typeof x=="object"&&x!==null&&x.$$typeof===n},ct.isForwardRef=function(x){return _(x)===o},ct.isFragment=function(x){return _(x)===t},ct.isLazy=function(x){return _(x)===p},ct.isMemo=function(x){return _(x)===u},ct.isPortal=function(x){return _(x)===e},ct.isProfiler=function(x){return _(x)===s},ct.isStrictMode=function(x){return _(x)===i},ct.isSuspense=function(x){return _(x)===c},ct.isSuspenseList=function(x){return _(x)===d},ct.isValidElementType=function(x){return typeof x=="string"||typeof x=="function"||x===t||x===s||x===i||x===c||x===d||typeof x=="object"&&x!==null&&(x.$$typeof===p||x.$$typeof===u||x.$$typeof===l||x.$$typeof===a||x.$$typeof===o||x.$$typeof===g||x.getModuleId!==void 0)},ct.typeOf=_,ct}var oc;function Gx(){return oc||(oc=1,Ia.exports=Hx()),Ia.exports}var xh=Gx();function Vx(n){function e(L,V,B,Q,O){for(var _e=0,Y=0,Se=0,Me=0,oe,U,Ze=0,ye=0,me,Ae=me=oe=0,Ce=0,Ne=0,Fe=0,ke=0,ht=B.length,xt=ht-1,C,S="",W="",he="",ce="",de;Ce<ht;){if(U=B.charCodeAt(Ce),Ce===xt&&Y+Me+Se+_e!==0&&(Y!==0&&(U=Y===47?10:47),Me=Se=_e=0,ht++,xt++),Y+Me+Se+_e===0){if(Ce===xt&&(0<Ne&&(S=S.replace(h,"")),0<S.trim().length)){switch(U){case 32:case 9:case 59:case 13:case 10:break;default:S+=B.charAt(Ce)}U=59}switch(U){case 123:for(S=S.trim(),oe=S.charCodeAt(0),me=1,ke=++Ce;Ce<ht;){switch(U=B.charCodeAt(Ce)){case 123:me++;break;case 125:me--;break;case 47:switch(U=B.charCodeAt(Ce+1)){case 42:case 47:e:{for(Ae=Ce+1;Ae<xt;++Ae)switch(B.charCodeAt(Ae)){case 47:if(U===42&&B.charCodeAt(Ae-1)===42&&Ce+2!==Ae){Ce=Ae+1;break e}break;case 10:if(U===47){Ce=Ae+1;break e}}Ce=Ae}}break;case 91:U++;case 40:U++;case 34:case 39:for(;Ce++<xt&&B.charCodeAt(Ce)!==U;);}if(me===0)break;Ce++}switch(me=B.substring(ke,Ce),oe===0&&(oe=(S=S.replace(p,"").trim()).charCodeAt(0)),oe){case 64:switch(0<Ne&&(S=S.replace(h,"")),U=S.charCodeAt(1),U){case 100:case 109:case 115:case 45:Ne=V;break;default:Ne=J}if(me=e(V,Ne,me,U,O+1),ke=me.length,0<ae&&(Ne=t(J,S,Fe),de=o(3,me,Ne,V,$,F,ke,U,O,Q),S=Ne.join(""),de!==void 0&&(ke=(me=de.trim()).length)===0&&(U=0,me="")),0<ke)switch(U){case 115:S=S.replace(M,l);case 100:case 109:case 45:me=S+"{"+me+"}";break;case 107:S=S.replace(y,"$1 $2"),me=S+"{"+me+"}",me=H===1||H===2&&a("@"+me,3)?"@-webkit-"+me+"@"+me:"@"+me;break;default:me=S+me,Q===112&&(me=(W+=me,""))}else me="";break;default:me=e(V,t(V,S,Fe),me,Q,O+1)}he+=me,me=Fe=Ne=Ae=oe=0,S="",U=B.charCodeAt(++Ce);break;case 125:case 59:if(S=(0<Ne?S.replace(h,""):S).trim(),1<(ke=S.length))switch(Ae===0&&(oe=S.charCodeAt(0),oe===45||96<oe&&123>oe)&&(ke=(S=S.replace(" ",":")).length),0<ae&&(de=o(1,S,V,L,$,F,W.length,Q,O,Q))!==void 0&&(ke=(S=de.trim()).length)===0&&(S="\0\0"),oe=S.charCodeAt(0),U=S.charCodeAt(1),oe){case 0:break;case 64:if(U===105||U===99){ce+=S+B.charAt(Ce);break}default:S.charCodeAt(ke-1)!==58&&(W+=s(S,oe,U,S.charCodeAt(2)))}Fe=Ne=Ae=oe=0,S="",U=B.charCodeAt(++Ce)}}switch(U){case 13:case 10:Y===47?Y=0:1+oe===0&&Q!==107&&0<S.length&&(Ne=1,S+="\0"),0<ae*ie&&o(0,S,V,L,$,F,W.length,Q,O,Q),F=1,$++;break;case 59:case 125:if(Y+Me+Se+_e===0){F++;break}default:switch(F++,C=B.charAt(Ce),U){case 9:case 32:if(Me+_e+Y===0)switch(Ze){case 44:case 58:case 9:case 32:C="";break;default:U!==32&&(C=" ")}break;case 0:C="\\0";break;case 12:C="\\f";break;case 11:C="\\v";break;case 38:Me+Y+_e===0&&(Ne=Fe=1,C="\f"+C);break;case 108:if(Me+Y+_e+P===0&&0<Ae)switch(Ce-Ae){case 2:Ze===112&&B.charCodeAt(Ce-3)===58&&(P=Ze);case 8:ye===111&&(P=ye)}break;case 58:Me+Y+_e===0&&(Ae=Ce);break;case 44:Y+Se+Me+_e===0&&(Ne=1,C+="\r");break;case 34:case 39:Y===0&&(Me=Me===U?0:Me===0?U:Me);break;case 91:Me+Y+Se===0&&_e++;break;case 93:Me+Y+Se===0&&_e--;break;case 41:Me+Y+_e===0&&Se--;break;case 40:Me+Y+_e===0&&(oe===0&&(2*Ze+3*ye===533||(oe=1)),Se++);break;case 64:Y+Se+Me+_e+Ae+me===0&&(me=1);break;case 42:case 47:if(!(0<Me+_e+Se))switch(Y){case 0:switch(2*U+3*B.charCodeAt(Ce+1)){case 235:Y=47;break;case 220:ke=Ce,Y=42}break;case 42:U===47&&Ze===42&&ke+2!==Ce&&(B.charCodeAt(ke+2)===33&&(W+=B.substring(ke,Ce+1)),C="",Y=0)}}Y===0&&(S+=C)}ye=Ze,Ze=U,Ce++}if(ke=W.length,0<ke){if(Ne=V,0<ae&&(de=o(2,W,Ne,L,$,F,ke,Q,O,Q),de!==void 0&&(W=de).length===0))return ce+W+he;if(W=Ne.join(",")+"{"+W+"}",H*P!==0){switch(H!==2||a(W,2)||(P=0),P){case 111:W=W.replace(E,":-moz-$1")+W;break;case 112:W=W.replace(v,"::-webkit-input-$1")+W.replace(v,"::-moz-$1")+W.replace(v,":-ms-input-$1")+W}P=0}}return ce+W+he}function t(L,V,B){var Q=V.trim().split(m);V=Q;var O=Q.length,_e=L.length;switch(_e){case 0:case 1:var Y=0;for(L=_e===0?"":L[0]+" ";Y<O;++Y)V[Y]=i(L,V[Y],B).trim();break;default:var Se=Y=0;for(V=[];Y<O;++Y)for(var Me=0;Me<_e;++Me)V[Se++]=i(L[Me]+" ",Q[Y],B).trim()}return V}function i(L,V,B){var Q=V.charCodeAt(0);switch(33>Q&&(Q=(V=V.trim()).charCodeAt(0)),Q){case 38:return V.replace(f,"$1"+L.trim());case 58:return L.trim()+V.replace(f,"$1"+L.trim());default:if(0<1*B&&0<V.indexOf("\f"))return V.replace(f,(L.charCodeAt(0)===58?"":"$1")+L.trim())}return L+V}function s(L,V,B,Q){var O=L+";",_e=2*V+3*B+4*Q;if(_e===944){L=O.indexOf(":",9)+1;var Y=O.substring(L,O.length-1).trim();return Y=O.substring(0,L).trim()+Y+";",H===1||H===2&&a(Y,1)?"-webkit-"+Y+Y:Y}if(H===0||H===2&&!a(O,1))return O;switch(_e){case 1015:return O.charCodeAt(10)===97?"-webkit-"+O+O:O;case 951:return O.charCodeAt(3)===116?"-webkit-"+O+O:O;case 963:return O.charCodeAt(5)===110?"-webkit-"+O+O:O;case 1009:if(O.charCodeAt(4)!==100)break;case 969:case 942:return"-webkit-"+O+O;case 978:return"-webkit-"+O+"-moz-"+O+O;case 1019:case 983:return"-webkit-"+O+"-moz-"+O+"-ms-"+O+O;case 883:if(O.charCodeAt(8)===45)return"-webkit-"+O+O;if(0<O.indexOf("image-set(",11))return O.replace(I,"$1-webkit-$2")+O;break;case 932:if(O.charCodeAt(4)===45)switch(O.charCodeAt(5)){case 103:return"-webkit-box-"+O.replace("-grow","")+"-webkit-"+O+"-ms-"+O.replace("grow","positive")+O;case 115:return"-webkit-"+O+"-ms-"+O.replace("shrink","negative")+O;case 98:return"-webkit-"+O+"-ms-"+O.replace("basis","preferred-size")+O}return"-webkit-"+O+"-ms-"+O+O;case 964:return"-webkit-"+O+"-ms-flex-"+O+O;case 1023:if(O.charCodeAt(8)!==99)break;return Y=O.substring(O.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),"-webkit-box-pack"+Y+"-webkit-"+O+"-ms-flex-pack"+Y+O;case 1005:return _.test(O)?O.replace(g,":-webkit-")+O.replace(g,":-moz-")+O:O;case 1e3:switch(Y=O.substring(13).trim(),V=Y.indexOf("-")+1,Y.charCodeAt(0)+Y.charCodeAt(V)){case 226:Y=O.replace(b,"tb");break;case 232:Y=O.replace(b,"tb-rl");break;case 220:Y=O.replace(b,"lr");break;default:return O}return"-webkit-"+O+"-ms-"+Y+O;case 1017:if(O.indexOf("sticky",9)===-1)break;case 975:switch(V=(O=L).length-10,Y=(O.charCodeAt(V)===33?O.substring(0,V):O).substring(L.indexOf(":",7)+1).trim(),_e=Y.charCodeAt(0)+(Y.charCodeAt(7)|0)){case 203:if(111>Y.charCodeAt(8))break;case 115:O=O.replace(Y,"-webkit-"+Y)+";"+O;break;case 207:case 102:O=O.replace(Y,"-webkit-"+(102<_e?"inline-":"")+"box")+";"+O.replace(Y,"-webkit-"+Y)+";"+O.replace(Y,"-ms-"+Y+"box")+";"+O}return O+";";case 938:if(O.charCodeAt(5)===45)switch(O.charCodeAt(6)){case 105:return Y=O.replace("-items",""),"-webkit-"+O+"-webkit-box-"+Y+"-ms-flex-"+Y+O;case 115:return"-webkit-"+O+"-ms-flex-item-"+O.replace(N,"")+O;default:return"-webkit-"+O+"-ms-flex-line-pack"+O.replace("align-content","").replace(N,"")+O}break;case 973:case 989:if(O.charCodeAt(3)!==45||O.charCodeAt(4)===122)break;case 931:case 953:if(A.test(L)===!0)return(Y=L.substring(L.indexOf(":")+1)).charCodeAt(0)===115?s(L.replace("stretch","fill-available"),V,B,Q).replace(":fill-available",":stretch"):O.replace(Y,"-webkit-"+Y)+O.replace(Y,"-moz-"+Y.replace("fill-",""))+O;break;case 962:if(O="-webkit-"+O+(O.charCodeAt(5)===102?"-ms-"+O:"")+O,B+Q===211&&O.charCodeAt(13)===105&&0<O.indexOf("transform",10))return O.substring(0,O.indexOf(";",27)+1).replace(x,"$1-webkit-$2")+O}return O}function a(L,V){var B=L.indexOf(V===1?":":"{"),Q=L.substring(0,V!==3?B:10);return B=L.substring(B+1,L.length-1),ee(V!==2?Q:Q.replace(w,"$1"),B,V)}function l(L,V){var B=s(V,V.charCodeAt(0),V.charCodeAt(1),V.charCodeAt(2));return B!==V+";"?B.replace(T," or ($1)").substring(4):"("+V+")"}function o(L,V,B,Q,O,_e,Y,Se,Me,oe){for(var U=0,Ze=V,ye;U<ae;++U)switch(ye=K[U].call(u,L,Ze,B,Q,O,_e,Y,Se,Me,oe)){case void 0:case!1:case!0:case null:break;default:Ze=ye}if(Ze!==V)return Ze}function c(L){switch(L){case void 0:case null:ae=K.length=0;break;default:if(typeof L=="function")K[ae++]=L;else if(typeof L=="object")for(var V=0,B=L.length;V<B;++V)c(L[V]);else ie=!!L|0}return c}function d(L){return L=L.prefix,L!==void 0&&(ee=null,L?typeof L!="function"?H=1:(H=2,ee=L):H=0),d}function u(L,V){var B=L;if(33>B.charCodeAt(0)&&(B=B.trim()),D=B,B=[D],0<ae){var Q=o(-1,V,B,B,$,F,0,0,0,0);Q!==void 0&&typeof Q=="string"&&(V=Q)}var O=e(J,B,V,0,0);return 0<ae&&(Q=o(-2,O,B,B,$,F,O.length,0,0,0),Q!==void 0&&(O=Q)),D="",P=0,F=$=1,O}var p=/^\0+/g,h=/[\0\r\f]/g,g=/: */g,_=/zoo|gra/,x=/([,: ])(transform)/g,m=/,\r+?/g,f=/([\t\r\n ])*\f?&/g,y=/@(k\w+)\s*(\S*)\s*/,v=/::(place)/g,E=/:(read-only)/g,b=/[svh]\w+-[tblr]{2}/,M=/\(\s*(.*)\s*\)/g,T=/([\s\S]*?);/g,N=/-self|flex-/g,w=/[^]*?(:[rp][el]a[\w-]+)[^]*/,A=/stretch|:\s*\w+\-(?:conte|avail)/,I=/([^-])(image-set\()/,F=1,$=1,P=0,H=1,J=[],K=[],ae=0,ee=null,ie=0,D="";return u.use=c,u.set=d,n!==void 0&&d(n),u}var Wx={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Xx(n){var e=Object.create(null);return function(t){return e[t]===void 0&&(e[t]=n(t)),e[t]}}var qx=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,lc=Xx(function(n){return qx.test(n)||n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)<91}),Ua={exports:{}},lt={};var cc;function $x(){if(cc)return lt;cc=1;var n=typeof Symbol=="function"&&Symbol.for,e=n?Symbol.for("react.element"):60103,t=n?Symbol.for("react.portal"):60106,i=n?Symbol.for("react.fragment"):60107,s=n?Symbol.for("react.strict_mode"):60108,a=n?Symbol.for("react.profiler"):60114,l=n?Symbol.for("react.provider"):60109,o=n?Symbol.for("react.context"):60110,c=n?Symbol.for("react.async_mode"):60111,d=n?Symbol.for("react.concurrent_mode"):60111,u=n?Symbol.for("react.forward_ref"):60112,p=n?Symbol.for("react.suspense"):60113,h=n?Symbol.for("react.suspense_list"):60120,g=n?Symbol.for("react.memo"):60115,_=n?Symbol.for("react.lazy"):60116,x=n?Symbol.for("react.block"):60121,m=n?Symbol.for("react.fundamental"):60117,f=n?Symbol.for("react.responder"):60118,y=n?Symbol.for("react.scope"):60119;function v(b){if(typeof b=="object"&&b!==null){var M=b.$$typeof;switch(M){case e:switch(b=b.type,b){case c:case d:case i:case a:case s:case p:return b;default:switch(b=b&&b.$$typeof,b){case o:case u:case _:case g:case l:return b;default:return M}}case t:return M}}}function E(b){return v(b)===d}return lt.AsyncMode=c,lt.ConcurrentMode=d,lt.ContextConsumer=o,lt.ContextProvider=l,lt.Element=e,lt.ForwardRef=u,lt.Fragment=i,lt.Lazy=_,lt.Memo=g,lt.Portal=t,lt.Profiler=a,lt.StrictMode=s,lt.Suspense=p,lt.isAsyncMode=function(b){return E(b)||v(b)===c},lt.isConcurrentMode=E,lt.isContextConsumer=function(b){return v(b)===o},lt.isContextProvider=function(b){return v(b)===l},lt.isElement=function(b){return typeof b=="object"&&b!==null&&b.$$typeof===e},lt.isForwardRef=function(b){return v(b)===u},lt.isFragment=function(b){return v(b)===i},lt.isLazy=function(b){return v(b)===_},lt.isMemo=function(b){return v(b)===g},lt.isPortal=function(b){return v(b)===t},lt.isProfiler=function(b){return v(b)===a},lt.isStrictMode=function(b){return v(b)===s},lt.isSuspense=function(b){return v(b)===p},lt.isValidElementType=function(b){return typeof b=="string"||typeof b=="function"||b===i||b===d||b===a||b===s||b===p||b===h||typeof b=="object"&&b!==null&&(b.$$typeof===_||b.$$typeof===g||b.$$typeof===l||b.$$typeof===o||b.$$typeof===u||b.$$typeof===m||b.$$typeof===f||b.$$typeof===y||b.$$typeof===x)},lt.typeOf=v,lt}var dc;function Yx(){return dc||(dc=1,Ua.exports=$x()),Ua.exports}var Oa,uc;function Kx(){if(uc)return Oa;uc=1;var n=Yx(),e={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},t={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},a={};a[n.ForwardRef]=i,a[n.Memo]=s;function l(_){return n.isMemo(_)?s:a[_.$$typeof]||e}var o=Object.defineProperty,c=Object.getOwnPropertyNames,d=Object.getOwnPropertySymbols,u=Object.getOwnPropertyDescriptor,p=Object.getPrototypeOf,h=Object.prototype;function g(_,x,m){if(typeof x!="string"){if(h){var f=p(x);f&&f!==h&&g(_,f,m)}var y=c(x);d&&(y=y.concat(d(x)));for(var v=l(_),E=l(x),b=0;b<y.length;++b){var M=y[b];if(!t[M]&&!(m&&m[M])&&!(E&&E[M])&&!(v&&v[M])){var T=u(x,M);try{o(_,M,T)}catch{}}}}return _}return Oa=g,Oa}var Zx=Kx();const Jx=hu(Zx);var on={};function kn(){return(kn=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n}).apply(this,arguments)}var hc=function(n,e){for(var t=[n[0]],i=0,s=e.length;i<s;i+=1)t.push(e[i],n[i+1]);return t},Oo=function(n){return n!==null&&typeof n=="object"&&(n.toString?n.toString():Object.prototype.toString.call(n))==="[object Object]"&&!xh.typeOf(n)},Zs=Object.freeze([]),ti=Object.freeze({});function Or(n){return typeof n=="function"}function fc(n){return n.displayName||n.name||"Component"}function dl(n){return n&&typeof n.styledComponentId=="string"}var ir=typeof process<"u"&&on!==void 0&&(on.REACT_APP_SC_ATTR||on.SC_ATTR)||"data-styled",ul=typeof window<"u"&&"HTMLElement"in window,Qx=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&on!==void 0&&(on.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&on.REACT_APP_SC_DISABLE_SPEEDY!==""?on.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&on.REACT_APP_SC_DISABLE_SPEEDY:on.SC_DISABLE_SPEEDY!==void 0&&on.SC_DISABLE_SPEEDY!==""&&on.SC_DISABLE_SPEEDY!=="false"&&on.SC_DISABLE_SPEEDY));function Wr(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];throw new Error("An error occurred. See https://git.io/JUIaE#"+n+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var e0=(function(){function n(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var e=n.prototype;return e.indexOfGroup=function(t){for(var i=0,s=0;s<t;s++)i+=this.groupSizes[s];return i},e.insertRules=function(t,i){if(t>=this.groupSizes.length){for(var s=this.groupSizes,a=s.length,l=a;t>=l;)(l<<=1)<0&&Wr(16,""+t);this.groupSizes=new Uint32Array(l),this.groupSizes.set(s),this.length=l;for(var o=a;o<l;o++)this.groupSizes[o]=0}for(var c=this.indexOfGroup(t+1),d=0,u=i.length;d<u;d++)this.tag.insertRule(c,i[d])&&(this.groupSizes[t]++,c++)},e.clearGroup=function(t){if(t<this.length){var i=this.groupSizes[t],s=this.indexOfGroup(t),a=s+i;this.groupSizes[t]=0;for(var l=s;l<a;l++)this.tag.deleteRule(s)}},e.getGroup=function(t){var i="";if(t>=this.length||this.groupSizes[t]===0)return i;for(var s=this.groupSizes[t],a=this.indexOfGroup(t),l=a+s,o=a;o<l;o++)i+=this.tag.getRule(o)+`/*!sc*/
`;return i},n})(),Ws=new Map,Js=new Map,jr=1,ts=function(n){if(Ws.has(n))return Ws.get(n);for(;Js.has(jr);)jr++;var e=jr++;return Ws.set(n,e),Js.set(e,n),e},t0=function(n){return Js.get(n)},n0=function(n,e){e>=jr&&(jr=e+1),Ws.set(n,e),Js.set(e,n)},i0="style["+ir+'][data-styled-version="5.3.11"]',r0=new RegExp("^"+ir+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),s0=function(n,e,t){for(var i,s=t.split(","),a=0,l=s.length;a<l;a++)(i=s[a])&&n.registerName(e,i)},a0=function(n,e){for(var t=(e.textContent||"").split(`/*!sc*/
`),i=[],s=0,a=t.length;s<a;s++){var l=t[s].trim();if(l){var o=l.match(r0);if(o){var c=0|parseInt(o[1],10),d=o[2];c!==0&&(n0(d,c),s0(n,d,o[3]),n.getTag().insertRules(c,i)),i.length=0}else i.push(l)}}},o0=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},vh=function(n){var e=document.head,t=n||e,i=document.createElement("style"),s=(function(o){for(var c=o.childNodes,d=c.length;d>=0;d--){var u=c[d];if(u&&u.nodeType===1&&u.hasAttribute(ir))return u}})(t),a=s!==void 0?s.nextSibling:null;i.setAttribute(ir,"active"),i.setAttribute("data-styled-version","5.3.11");var l=o0();return l&&i.setAttribute("nonce",l),t.insertBefore(i,a),i},l0=(function(){function n(t){var i=this.element=vh(t);i.appendChild(document.createTextNode("")),this.sheet=(function(s){if(s.sheet)return s.sheet;for(var a=document.styleSheets,l=0,o=a.length;l<o;l++){var c=a[l];if(c.ownerNode===s)return c}Wr(17)})(i),this.length=0}var e=n.prototype;return e.insertRule=function(t,i){try{return this.sheet.insertRule(i,t),this.length++,!0}catch{return!1}},e.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.getRule=function(t){var i=this.sheet.cssRules[t];return i!==void 0&&typeof i.cssText=="string"?i.cssText:""},n})(),c0=(function(){function n(t){var i=this.element=vh(t);this.nodes=i.childNodes,this.length=0}var e=n.prototype;return e.insertRule=function(t,i){if(t<=this.length&&t>=0){var s=document.createTextNode(i),a=this.nodes[t];return this.element.insertBefore(s,a||null),this.length++,!0}return!1},e.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},n})(),d0=(function(){function n(t){this.rules=[],this.length=0}var e=n.prototype;return e.insertRule=function(t,i){return t<=this.length&&(this.rules.splice(t,0,i),this.length++,!0)},e.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.getRule=function(t){return t<this.length?this.rules[t]:""},n})(),pc=ul,u0={isServer:!ul,useCSSOMInjection:!Qx},_h=(function(){function n(t,i,s){t===void 0&&(t=ti),i===void 0&&(i={}),this.options=kn({},u0,{},t),this.gs=i,this.names=new Map(s),this.server=!!t.isServer,!this.server&&ul&&pc&&(pc=!1,(function(a){for(var l=document.querySelectorAll(i0),o=0,c=l.length;o<c;o++){var d=l[o];d&&d.getAttribute(ir)!=="active"&&(a0(a,d),d.parentNode&&d.parentNode.removeChild(d))}})(this))}n.registerId=function(t){return ts(t)};var e=n.prototype;return e.reconstructWithOptions=function(t,i){return i===void 0&&(i=!0),new n(kn({},this.options,{},t),this.gs,i&&this.names||void 0)},e.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.getTag=function(){return this.tag||(this.tag=(s=(i=this.options).isServer,a=i.useCSSOMInjection,l=i.target,t=s?new d0(l):a?new l0(l):new c0(l),new e0(t)));var t,i,s,a,l},e.hasNameForId=function(t,i){return this.names.has(t)&&this.names.get(t).has(i)},e.registerName=function(t,i){if(ts(t),this.names.has(t))this.names.get(t).add(i);else{var s=new Set;s.add(i),this.names.set(t,s)}},e.insertRules=function(t,i,s){this.registerName(t,i),this.getTag().insertRules(ts(t),s)},e.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.clearRules=function(t){this.getTag().clearGroup(ts(t)),this.clearNames(t)},e.clearTag=function(){this.tag=void 0},e.toString=function(){return(function(t){for(var i=t.getTag(),s=i.length,a="",l=0;l<s;l++){var o=t0(l);if(o!==void 0){var c=t.names.get(o),d=i.getGroup(l);if(c&&d&&c.size){var u=ir+".g"+l+'[id="'+o+'"]',p="";c!==void 0&&c.forEach((function(h){h.length>0&&(p+=h+",")})),a+=""+d+u+'{content:"'+p+`"}/*!sc*/
`}}}return a})(this)},n})(),h0=/(a)(d)/gi,mc=function(n){return String.fromCharCode(n+(n>25?39:97))};function ko(n){var e,t="";for(e=Math.abs(n);e>52;e=e/52|0)t=mc(e%52)+t;return(mc(e%52)+t).replace(h0,"$1-$2")}var Zi=function(n,e){for(var t=e.length;t;)n=33*n^e.charCodeAt(--t);return n},yh=function(n){return Zi(5381,n)};function f0(n){for(var e=0;e<n.length;e+=1){var t=n[e];if(Or(t)&&!dl(t))return!1}return!0}var p0=yh("5.3.11"),m0=(function(){function n(e,t,i){this.rules=e,this.staticRulesId="",this.isStatic=(i===void 0||i.isStatic)&&f0(e),this.componentId=t,this.baseHash=Zi(p0,t),this.baseStyle=i,_h.registerId(t)}return n.prototype.generateAndInjectStyles=function(e,t,i){var s=this.componentId,a=[];if(this.baseStyle&&a.push(this.baseStyle.generateAndInjectStyles(e,t,i)),this.isStatic&&!i.hash)if(this.staticRulesId&&t.hasNameForId(s,this.staticRulesId))a.push(this.staticRulesId);else{var l=rr(this.rules,e,t,i).join(""),o=ko(Zi(this.baseHash,l)>>>0);if(!t.hasNameForId(s,o)){var c=i(l,"."+o,void 0,s);t.insertRules(s,o,c)}a.push(o),this.staticRulesId=o}else{for(var d=this.rules.length,u=Zi(this.baseHash,i.hash),p="",h=0;h<d;h++){var g=this.rules[h];if(typeof g=="string")p+=g;else if(g){var _=rr(g,e,t,i),x=Array.isArray(_)?_.join(""):_;u=Zi(u,x+h),p+=x}}if(p){var m=ko(u>>>0);if(!t.hasNameForId(s,m)){var f=i(p,"."+m,void 0,s);t.insertRules(s,m,f)}a.push(m)}}return a.join(" ")},n})(),g0=/^\s*\/\/.*$/gm,x0=[":","[",".","#"];function v0(n){var e,t,i,s,a=ti,l=a.options,o=l===void 0?ti:l,c=a.plugins,d=c===void 0?Zs:c,u=new Vx(o),p=[],h=(function(x){function m(f){if(f)try{x(f+"}")}catch{}}return function(f,y,v,E,b,M,T,N,w,A){switch(f){case 1:if(w===0&&y.charCodeAt(0)===64)return x(y+";"),"";break;case 2:if(N===0)return y+"/*|*/";break;case 3:switch(N){case 102:case 112:return x(v[0]+y),"";default:return y+(A===0?"/*|*/":"")}case-2:y.split("/*|*/}").forEach(m)}}})((function(x){p.push(x)})),g=function(x,m,f){return m===0&&x0.indexOf(f[t.length])!==-1||f.match(s)?x:"."+e};function _(x,m,f,y){y===void 0&&(y="&");var v=x.replace(g0,""),E=m&&f?f+" "+m+" { "+v+" }":v;return e=y,t=m,i=new RegExp("\\"+t+"\\b","g"),s=new RegExp("(\\"+t+"\\b){2,}"),u(f||!m?"":m,E)}return u.use([].concat(d,[function(x,m,f){x===2&&f.length&&f[0].lastIndexOf(t)>0&&(f[0]=f[0].replace(i,g))},h,function(x){if(x===-2){var m=p;return p=[],m}}])),_.hash=d.length?d.reduce((function(x,m){return m.name||Wr(15),Zi(x,m.name)}),5381).toString():"",_}var bh=Br.createContext();bh.Consumer;var wh=Br.createContext(),_0=(wh.Consumer,new _h),Fo=v0();function y0(){return z.useContext(bh)||_0}function b0(){return z.useContext(wh)||Fo}var w0=(function(){function n(e,t){var i=this;this.inject=function(s,a){a===void 0&&(a=Fo);var l=i.name+a.hash;s.hasNameForId(i.id,l)||s.insertRules(i.id,l,a(i.rules,l,"@keyframes"))},this.toString=function(){return Wr(12,String(i.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return n.prototype.getName=function(e){return e===void 0&&(e=Fo),this.name+e.hash},n})(),S0=/([A-Z])/,E0=/([A-Z])/g,M0=/^ms-/,T0=function(n){return"-"+n.toLowerCase()};function gc(n){return S0.test(n)?n.replace(E0,T0).replace(M0,"-ms-"):n}var xc=function(n){return n==null||n===!1||n===""};function rr(n,e,t,i){if(Array.isArray(n)){for(var s,a=[],l=0,o=n.length;l<o;l+=1)(s=rr(n[l],e,t,i))!==""&&(Array.isArray(s)?a.push.apply(a,s):a.push(s));return a}if(xc(n))return"";if(dl(n))return"."+n.styledComponentId;if(Or(n)){if(typeof(d=n)!="function"||d.prototype&&d.prototype.isReactComponent||!e)return n;var c=n(e);return rr(c,e,t,i)}var d;return n instanceof w0?t?(n.inject(t,i),n.getName(i)):n:Oo(n)?(function u(p,h){var g,_,x=[];for(var m in p)p.hasOwnProperty(m)&&!xc(p[m])&&(Array.isArray(p[m])&&p[m].isCss||Or(p[m])?x.push(gc(m)+":",p[m],";"):Oo(p[m])?x.push.apply(x,u(p[m],m)):x.push(gc(m)+": "+(g=m,(_=p[m])==null||typeof _=="boolean"||_===""?"":typeof _!="number"||_===0||g in Wx||g.startsWith("--")?String(_).trim():_+"px")+";"));return h?[h+" {"].concat(x,["}"]):x})(n):n.toString()}var vc=function(n){return Array.isArray(n)&&(n.isCss=!0),n};function A0(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];return Or(n)||Oo(n)?vc(rr(hc(Zs,[n].concat(t)))):t.length===0&&n.length===1&&typeof n[0]=="string"?n:vc(rr(hc(n,t)))}var R0=function(n,e,t){return t===void 0&&(t=ti),n.theme!==t.theme&&n.theme||e||t.theme},C0=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,N0=/(^-|-$)/g;function ka(n){return n.replace(C0,"-").replace(N0,"")}var P0=function(n){return ko(yh(n)>>>0)};function ns(n){return typeof n=="string"&&!0}var Bo=function(n){return typeof n=="function"||typeof n=="object"&&n!==null&&!Array.isArray(n)},L0=function(n){return n!=="__proto__"&&n!=="constructor"&&n!=="prototype"};function j0(n,e,t){var i=n[t];Bo(e)&&Bo(i)?Sh(i,e):n[t]=e}function Sh(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];for(var s=0,a=t;s<a.length;s++){var l=a[s];if(Bo(l))for(var o in l)L0(o)&&j0(n,l[o],o)}return n}var Eh=Br.createContext();Eh.Consumer;var Fa={};function Mh(n,e,t){var i=dl(n),s=!ns(n),a=e.attrs,l=a===void 0?Zs:a,o=e.componentId,c=o===void 0?(function(y,v){var E=typeof y!="string"?"sc":ka(y);Fa[E]=(Fa[E]||0)+1;var b=E+"-"+P0("5.3.11"+E+Fa[E]);return v?v+"-"+b:b})(e.displayName,e.parentComponentId):o,d=e.displayName,u=d===void 0?(function(y){return ns(y)?"styled."+y:"Styled("+fc(y)+")"})(n):d,p=e.displayName&&e.componentId?ka(e.displayName)+"-"+e.componentId:e.componentId||c,h=i&&n.attrs?Array.prototype.concat(n.attrs,l).filter(Boolean):l,g=e.shouldForwardProp;i&&n.shouldForwardProp&&(g=e.shouldForwardProp?function(y,v,E){return n.shouldForwardProp(y,v,E)&&e.shouldForwardProp(y,v,E)}:n.shouldForwardProp);var _,x=new m0(t,p,i?n.componentStyle:void 0),m=x.isStatic&&l.length===0,f=function(y,v){return(function(E,b,M,T){var N=E.attrs,w=E.componentStyle,A=E.defaultProps,I=E.foldedComponentIds,F=E.shouldForwardProp,$=E.styledComponentId,P=E.target,H=(function(Q,O,_e){Q===void 0&&(Q=ti);var Y=kn({},O,{theme:Q}),Se={};return _e.forEach((function(Me){var oe,U,Ze,ye=Me;for(oe in Or(ye)&&(ye=ye(Y)),ye)Y[oe]=Se[oe]=oe==="className"?(U=Se[oe],Ze=ye[oe],U&&Ze?U+" "+Ze:U||Ze):ye[oe]})),[Y,Se]})(R0(b,z.useContext(Eh),A)||ti,b,N),J=H[0],K=H[1],ae=(function(Q,O,_e,Y){var Se=y0(),Me=b0(),oe=O?Q.generateAndInjectStyles(ti,Se,Me):Q.generateAndInjectStyles(_e,Se,Me);return oe})(w,T,J),ee=M,ie=K.$as||b.$as||K.as||b.as||P,D=ns(ie),L=K!==b?kn({},b,{},K):b,V={};for(var B in L)B[0]!=="$"&&B!=="as"&&(B==="forwardedAs"?V.as=L[B]:(F?F(B,lc,ie):!D||lc(B))&&(V[B]=L[B]));return b.style&&K.style!==b.style&&(V.style=kn({},b.style,{},K.style)),V.className=Array.prototype.concat(I,$,ae!==$?ae:null,b.className,K.className).filter(Boolean).join(" "),V.ref=ee,z.createElement(ie,V)})(_,y,v,m)};return f.displayName=u,(_=Br.forwardRef(f)).attrs=h,_.componentStyle=x,_.displayName=u,_.shouldForwardProp=g,_.foldedComponentIds=i?Array.prototype.concat(n.foldedComponentIds,n.styledComponentId):Zs,_.styledComponentId=p,_.target=i?n.target:n,_.withComponent=function(y){var v=e.componentId,E=(function(M,T){if(M==null)return{};var N,w,A={},I=Object.keys(M);for(w=0;w<I.length;w++)N=I[w],T.indexOf(N)>=0||(A[N]=M[N]);return A})(e,["componentId"]),b=v&&v+"-"+(ns(y)?y:ka(fc(y)));return Mh(y,kn({},E,{attrs:h,componentId:b}),t)},Object.defineProperty(_,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(y){this._foldedDefaultProps=i?Sh({},n.defaultProps,y):y}}),Object.defineProperty(_,"toString",{value:function(){return"."+_.styledComponentId}}),s&&Jx(_,n,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),_}var re=function(n){return(function e(t,i,s){if(s===void 0&&(s=ti),!xh.isValidElementType(i))return Wr(1,String(i));var a=function(){return t(i,s,A0.apply(void 0,arguments))};return a.withConfig=function(l){return e(t,i,kn({},s,{},l))},a.attrs=function(l){return e(t,i,kn({},s,{attrs:Array.prototype.concat(s.attrs,l).filter(Boolean)}))},a})(Mh,n)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(n){re[n]=re(n)}));const D0="http://localhost:5000/api",Ke=gt.create({baseURL:D0,timeout:1e4,headers:{"Content-Type":"application/json"}});Ke.interceptors.request.use(n=>{const e=localStorage.getItem("authToken");return e&&(n.headers.Authorization=`Bearer ${e}`),n},n=>Promise.reject(n));Ke.interceptors.response.use(n=>n,n=>(n.response?.status===401&&localStorage.removeItem("authToken"),Promise.reject(n)));const Qs={async getAllArtworks(){return(await Ke.get("/artworks")).data},async getArtworkById(n){return(await Ke.get(`/artworks/${n}`)).data},async searchArtworks(n){return(await Ke.get(`/artworks/search/${encodeURIComponent(n)}`)).data},async filterArtworksByTags(n){return(await Ke.get(`/artworks/filter/${n.join(",")}`)).data},async createArtwork(n){return(await Ke.post("/artworks",n)).data},async updateArtwork(n,e){return(await Ke.put(`/artworks/${n}`,e)).data},async deleteArtwork(n){await Ke.delete(`/artworks/${n}`)},async getRecommendedArtworks(n){return(await Ke.get(`/artworks/recommendations${n?`?count=${n}`:""}`)).data},async getSimilarArtworks(n,e){return(await Ke.get(`/artworks/${n}/similar${e?`?count=${e}`:""}`)).data},async getArtworkAnalytics(n){return(await Ke.get(`/artworks/${n}/analytics`)).data}},Nr={async getAllGalleries(){return(await Ke.get("/galleries")).data},async getGalleryById(n){return(await Ke.get(`/galleries/${n}`)).data},async createGallery(n){return(await Ke.post("/galleries",n)).data},async updateGallery(n,e){return(await Ke.put(`/galleries/${n}`,e)).data},async deleteGallery(n){await Ke.delete(`/galleries/${n}`)},async getRooms(n){return(await Ke.get(`/galleries/${n}/rooms`)).data},async getRoomById(n){return(await Ke.get(`/rooms/${n}`)).data},async createRoom(n,e){return(await Ke.post(`/galleries/${n}/rooms`,e)).data},async updateRoom(n,e){return(await Ke.put(`/rooms/${n}`,e)).data},async deleteRoom(n){await Ke.delete(`/rooms/${n}`)},async getExhibitions(n){return(await Ke.get(`/galleries/${n}/exhibitions`)).data},async getExhibitionById(n){return(await Ke.get(`/exhibitions/${n}`)).data},async createExhibition(n,e){return(await Ke.post(`/galleries/${n}/exhibitions`,e)).data},async updateExhibition(n,e){return(await Ke.put(`/exhibitions/${n}`,e)).data},async deleteExhibition(n){await Ke.delete(`/exhibitions/${n}`)},async getVirtualTours(n){return(await Ke.get(`/galleries/${n}/virtual-tours`)).data},async getVirtualTourById(n){return(await Ke.get(`/virtual-tours/${n}`)).data},async createVirtualTour(n,e){return(await Ke.post(`/galleries/${n}/virtual-tours`,e)).data},async updateVirtualTour(n,e){return(await Ke.put(`/virtual-tours/${n}`,e)).data},async deleteVirtualTour(n){await Ke.delete(`/virtual-tours/${n}`)}};class I0{cache=new Map;maxSize;currentSize=0;constructor(e=100){this.maxSize=e*1024*1024}async loadImage(e){if(this.cache.has(e)){const t=this.cache.get(e);return t.timestamp=Date.now(),URL.createObjectURL(t.blob)}try{const t=await fetch(e);if(!t.ok)throw new Error(`Failed to load image: ${t.statusText}`);const i=await t.blob(),s=i.size;if(s>this.maxSize)return console.warn(`Image ${e} is too large to cache (${s} bytes)`),e;this.evictIfNeeded(s);const a={url:e,blob:i,timestamp:Date.now(),size:s};return this.cache.set(e,a),this.currentSize+=s,URL.createObjectURL(i)}catch(t){throw console.error(`Error loading image ${e}:`,t),t}}async loadImages(e){const t=e.map(i=>this.loadImage(i).catch(s=>s));return Promise.all(t)}removeFromCache(e){if(this.cache.has(e)){const t=this.cache.get(e);return this.cache.delete(e),this.currentSize-=t.size,!0}return!1}clearCache(){this.cache.forEach(e=>{URL.revokeObjectURL(URL.createObjectURL(e.blob))}),this.cache.clear(),this.currentSize=0}getCacheInfo(){return{size:this.currentSize,count:this.cache.size,maxSize:this.maxSize}}evictIfNeeded(e){for(;this.currentSize+e>this.maxSize&&this.cache.size>0;){let t=null,i=Number.MAX_SAFE_INTEGER;for(const[s,a]of this.cache)a.timestamp<i&&(i=a.timestamp,t=s);if(t){const s=this.cache.get(t);this.cache.delete(t),this.currentSize-=s.size,URL.revokeObjectURL(this.getUrlFromBlob(s.blob))}else break}}getUrlFromBlob(e){return""}async preloadImages(e,t){const i=e.length;let s=0;const a=e.map(async l=>{try{await this.loadImage(l),s++,t?.(s,i)}catch(o){console.error(`Failed to preload image ${l}:`,o),s++,t?.(s,i)}});await Promise.all(a)}}const _r=new I0(100),Yt={async uploadImage(n,e){const t=new FormData;return t.append("image",n),t.append("uploaded_by",e.toString()),(await Ke.post("/api/artworks/upload",t,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:s=>{const a=Math.round(s.loaded*100/(s.total||1));console.log(`Загрузка: ${a}%`)}})).data},async analyzeImage(n){return(await Ke.post(`/artworks/${n}/analyze`)).data},async getImageAnalysis(n){return(await Ke.get(`/artworks/${n}/analysis`)).data},async submitArtworkForReview(n){return(await Ke.post("/artworks/submit-for-review",n)).data},async getUserUploads(n){return(await Ke.get(`/users/${n}/uploads`)).data},async getSubmissionsForReview(){return(await Ke.get("/artworks/submissions-for-review")).data},async approveSubmission(n,e){await Ke.post(`/artworks/submissions/${n}/approve`,e)},async rejectSubmission(n,e){await Ke.post(`/artworks/submissions/${n}/reject`,{reason:e})},async reanalyzeImage(n){return(await Ke.post(`/artworks/${n}/reanalyze`)).data},async generateNFT(n,e){return(await Ke.post("/artworks/generate-nft",{artworkId:n,ownerInfo:e})).data},async loadAndCacheImage(n){return await _r.loadImage(n)},async loadAndCacheImages(n){return await _r.loadImages(n)},async preloadImages(n,e){return await _r.preloadImages(n,e)},getCacheInfo(){return _r.getCacheInfo()},clearCache(){_r.clearCache()}},Ba=re.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`,U0=re.button`
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
`,O0=re.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`,k0=re.div`
  flex: 1;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`,F0=re.div`
  flex: 1;
`,B0=re.h1`
  margin: 0 0 1rem 0;
  color: #333;
`,z0=re.h2`
  margin: 0 0 1.5rem 0;
  color: #666;
  font-weight: 500;
`,H0=re.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,G0=re.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`,is=re.div`
  display: flex;
  flex-direction: column;
`,yr=re.span`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.25rem;
`,rs=re.span`
  color: #333;
`,V0=re.div`
  margin-top: 1.5rem;
`,W0=re.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,X0=re.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`,Th=re.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`,q0=re(Th)`
  background-color: ${({isFavorite:n})=>n?"#f44336":"#2196f3"};
  color: white;
`,$0=re(Th)`
  background-color: #4caf50;
  color: white;
`,Y0=re.div`
  margin-top: 3rem;
`,K0=re.h3`
  margin-bottom: 1.5rem;
  color: #333;
`,Z0=re.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`,J0=()=>{const{id:n}=la(),e=oa(),[t,i]=z.useState(null),[s,a]=z.useState([]),[l,o]=z.useState(!0),[c,d]=z.useState(!1);z.useEffect(()=>{(async()=>{try{if(n){const _=await Qs.getArtworkById(parseInt(n));i(_);const x=await Qs.getSimilarArtworks(parseInt(n),6);a(x)}}catch(_){console.error("Ошибка при загрузке экспоната:",_)}finally{o(!1)}})()},[n]);const u=()=>{e(-1)},p=()=>{d(!c)},h=()=>{navigator.share?navigator.share({title:t?.title,text:`Посмотрите это удивительное произведение искусства: ${t?.title} от ${t?.artist_name}`,url:window.location.href}).catch(console.error):navigator.clipboard.writeText(window.location.href).then(()=>{alert("Ссылка скопирована в буфер обмена!")})};return l?r.jsx(Ba,{children:"Загрузка экспоната..."}):t?r.jsxs(Ba,{children:[r.jsx(U0,{onClick:u,children:"← Назад"}),r.jsxs(O0,{children:[r.jsx(k0,{children:t.image_url?r.jsx("img",{src:t.image_url,alt:t.title,style:{width:"100%",height:"100%",objectFit:"contain"}}):r.jsx("span",{children:"Изображение недоступно"})}),r.jsxs(F0,{children:[r.jsx(B0,{children:t.title}),r.jsx(z0,{children:t.artist_name}),r.jsx(H0,{children:t.description}),r.jsxs(G0,{children:[r.jsxs(is,{children:[r.jsx(yr,{children:"Год создания"}),r.jsx(rs,{children:t.year_created||"Неизвестно"})]}),r.jsxs(is,{children:[r.jsx(yr,{children:"Техника"}),r.jsx(rs,{children:t.medium||"Неизвестно"})]}),r.jsxs(is,{children:[r.jsx(yr,{children:"Размеры"}),r.jsx(rs,{children:t.dimensions||"Неизвестны"})]}),r.jsxs(is,{children:[r.jsx(yr,{children:"Стиль"}),r.jsx(rs,{children:t.style||"Неизвестно"})]})]}),r.jsxs(V0,{children:[r.jsx(yr,{children:"Теги:"}),t.tags&&t.tags.length>0?t.tags.map((g,_)=>r.jsx(W0,{children:g},_)):r.jsx("span",{children:"Теги отсутствуют"})]}),r.jsxs(X0,{children:[r.jsx(q0,{isFavorite:c,onClick:p,children:c?"Удалить из избранного":"Добавить в избранное"}),r.jsx($0,{onClick:h,children:"Поделиться"})]})]})]}),s.length>0&&r.jsxs(Y0,{children:[r.jsx(K0,{children:"Похожие экспонаты"}),r.jsx(Z0,{children:s.map(g=>r.jsxs("div",{onClick:()=>e(`/artworks/${g.artwork_id}`),style:{cursor:"pointer"},children:[r.jsx("img",{src:g.image_url||"",alt:g.title,style:{width:"100%",height:"150px",objectFit:"cover",borderRadius:"4px"}}),r.jsxs("div",{children:[r.jsx("h4",{children:g.title}),r.jsx("p",{children:g.artist_name})]})]},g.artwork_id))})]})]}):r.jsx(Ba,{children:"Экспонат не найден"})};const hl="158",Li={ROTATE:0,DOLLY:1,PAN:2},ji={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Q0=0,_c=1,ev=2,Ah=1,Rh=2,On=3,si=0,Zt=1,Mn=2,ni=0,er=1,yc=2,bc=3,wc=4,tv=5,mi=100,nv=101,iv=102,Sc=103,Ec=104,rv=200,sv=201,av=202,ov=203,zo=204,Ho=205,lv=206,cv=207,dv=208,uv=209,hv=210,fv=211,pv=212,mv=213,gv=214,xv=0,vv=1,_v=2,ea=3,yv=4,bv=5,wv=6,Sv=7,Ch=0,Ev=1,Mv=2,ii=0,Tv=1,Av=2,Rv=3,Nh=4,Cv=5,Ph=300,sr=301,ar=302,Go=303,Vo=304,va=306,Wo=1e3,_n=1001,Xo=1002,Ht=1003,Mc=1004,za=1005,cn=1006,Nv=1007,kr=1008,ri=1009,Pv=1010,Lv=1011,fl=1012,Lh=1013,Zn=1014,Jn=1015,Fr=1016,jh=1017,Dh=1018,yi=1020,jv=1021,yn=1023,Dv=1024,Iv=1025,bi=1026,or=1027,Uv=1028,Ih=1029,Ov=1030,Uh=1031,Oh=1033,Ha=33776,Ga=33777,Va=33778,Wa=33779,Tc=35840,Ac=35841,Rc=35842,Cc=35843,kv=36196,Nc=37492,Pc=37496,Lc=37808,jc=37809,Dc=37810,Ic=37811,Uc=37812,Oc=37813,kc=37814,Fc=37815,Bc=37816,zc=37817,Hc=37818,Gc=37819,Vc=37820,Wc=37821,Xa=36492,Xc=36494,qc=36495,Fv=36283,$c=36284,Yc=36285,Kc=36286,kh=3e3,wi=3001,Bv=3200,zv=3201,Fh=0,Hv=1,un="",Dt="srgb",zn="srgb-linear",pl="display-p3",_a="display-p3-linear",ta="linear",pt="srgb",na="rec709",ia="p3",Di=7680,Zc=519,Gv=512,Vv=513,Wv=514,Xv=515,qv=516,$v=517,Yv=518,Kv=519,Jc=35044,Qc="300 es",qo=1035,Fn=2e3,ra=2001;class Ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,l=s.length;a<l;a++)s[a].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xs=Math.PI/180,sa=180/Math.PI;function Xr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]).toLowerCase()}function Gt(n,e,t){return Math.max(e,Math.min(t,n))}function Zv(n,e){return(n%e+e)%e}function qa(n,e,t){return(1-t)*n+t*e}function ed(n){return(n&n-1)===0&&n!==0}function $o(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function br(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function qt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Jv={DEG2RAD:Xs};class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Gt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,l=this.y-e.y;return this.x=a*i-l*s+e.x,this.y=a*s+l*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,i,s,a,l,o,c,d){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,l,o,c,d)}set(e,t,i,s,a,l,o,c,d){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=l,u[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,l=i[0],o=i[3],c=i[6],d=i[1],u=i[4],p=i[7],h=i[2],g=i[5],_=i[8],x=s[0],m=s[3],f=s[6],y=s[1],v=s[4],E=s[7],b=s[2],M=s[5],T=s[8];return a[0]=l*x+o*y+c*b,a[3]=l*m+o*v+c*M,a[6]=l*f+o*E+c*T,a[1]=d*x+u*y+p*b,a[4]=d*m+u*v+p*M,a[7]=d*f+u*E+p*T,a[2]=h*x+g*y+_*b,a[5]=h*m+g*v+_*M,a[8]=h*f+g*E+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8];return t*l*u-t*o*d-i*a*u+i*o*c+s*a*d-s*l*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8],p=u*l-o*d,h=o*c-u*a,g=d*a-l*c,_=t*p+i*h+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=p*x,e[1]=(s*d-u*i)*x,e[2]=(o*i-s*l)*x,e[3]=h*x,e[4]=(u*t-s*c)*x,e[5]=(s*a-o*t)*x,e[6]=g*x,e[7]=(i*c-d*t)*x,e[8]=(l*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,l,o){const c=Math.cos(a),d=Math.sin(a);return this.set(i*c,i*d,-i*(c*l+d*o)+l+e,-s*d,s*c,-s*(-d*l+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply($a.makeScale(e,t)),this}rotate(e){return this.premultiply($a.makeRotation(-e)),this}translate(e,t){return this.premultiply($a.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $a=new nt;function Bh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qv(){const n=aa("canvas");return n.style.display="block",n}const td={};function Dr(n){n in td||(td[n]=!0,console.warn(n))}const nd=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),id=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ss={[zn]:{transfer:ta,primaries:na,toReference:n=>n,fromReference:n=>n},[Dt]:{transfer:pt,primaries:na,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[_a]:{transfer:ta,primaries:ia,toReference:n=>n.applyMatrix3(id),fromReference:n=>n.applyMatrix3(nd)},[pl]:{transfer:pt,primaries:ia,toReference:n=>n.convertSRGBToLinear().applyMatrix3(id),fromReference:n=>n.applyMatrix3(nd).convertLinearToSRGB()}},e_=new Set([zn,_a]),dt={enabled:!0,_workingColorSpace:zn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!e_.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=ss[e].toReference,s=ss[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return ss[n].primaries},getTransfer:function(n){return n===un?ta:ss[n].transfer}};function tr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ya(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ii;class zh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ii===void 0&&(Ii=aa("canvas")),Ii.width=e.width,Ii.height=e.height;const i=Ii.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ii}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=aa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let l=0;l<a.length;l++)a[l]=tr(a[l]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(tr(t[i]/255)*255):t[i]=tr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let t_=0;class Hh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:t_++}),this.uuid=Xr(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let l=0,o=s.length;l<o;l++)s[l].isDataTexture?a.push(Ka(s[l].image)):a.push(Ka(s[l]))}else a=Ka(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function Ka(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let n_=0;class Jt extends Ci{constructor(e=Jt.DEFAULT_IMAGE,t=Jt.DEFAULT_MAPPING,i=_n,s=_n,a=cn,l=kr,o=yn,c=ri,d=Jt.DEFAULT_ANISOTROPY,u=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:n_++}),this.uuid=Xr(),this.name="",this.source=new Hh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=o,this.internalFormat=null,this.type=c,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===wi?Dt:un),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ph)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wo:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case Xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wo:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case Xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Dt?wi:kh}set encoding(e){Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===wi?Dt:un}}Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=Ph;Jt.DEFAULT_ANISOTROPY=1;class Lt{constructor(e=0,t=0,i=0,s=1){Lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,l=e.elements;return this.x=l[0]*t+l[4]*i+l[8]*s+l[12]*a,this.y=l[1]*t+l[5]*i+l[9]*s+l[13]*a,this.z=l[2]*t+l[6]*i+l[10]*s+l[14]*a,this.w=l[3]*t+l[7]*i+l[11]*s+l[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const c=e.elements,d=c[0],u=c[4],p=c[8],h=c[1],g=c[5],_=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(p-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+x)<.1&&Math.abs(_+m)<.1&&Math.abs(d+g+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(d+1)/2,E=(g+1)/2,b=(f+1)/2,M=(u+h)/4,T=(p+x)/4,N=(_+m)/4;return v>E&&v>b?v<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(v),s=M/i,a=T/i):E>b?E<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(E),i=M/s,a=N/s):b<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(b),i=T/a,s=N/a),this.set(i,s,a,t),this}let y=Math.sqrt((m-_)*(m-_)+(p-x)*(p-x)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(p-x)/y,this.z=(h-u)/y,this.w=Math.acos((d+g+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class i_ extends Ci{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(Dr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===wi?Dt:un),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Jt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Hh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends i_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gh extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class r_ extends Jt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ai{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,l,o){let c=i[s+0],d=i[s+1],u=i[s+2],p=i[s+3];const h=a[l+0],g=a[l+1],_=a[l+2],x=a[l+3];if(o===0){e[t+0]=c,e[t+1]=d,e[t+2]=u,e[t+3]=p;return}if(o===1){e[t+0]=h,e[t+1]=g,e[t+2]=_,e[t+3]=x;return}if(p!==x||c!==h||d!==g||u!==_){let m=1-o;const f=c*h+d*g+u*_+p*x,y=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const b=Math.sqrt(v),M=Math.atan2(b,f*y);m=Math.sin(m*M)/b,o=Math.sin(o*M)/b}const E=o*y;if(c=c*m+h*E,d=d*m+g*E,u=u*m+_*E,p=p*m+x*E,m===1-o){const b=1/Math.sqrt(c*c+d*d+u*u+p*p);c*=b,d*=b,u*=b,p*=b}}e[t]=c,e[t+1]=d,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,a,l){const o=i[s],c=i[s+1],d=i[s+2],u=i[s+3],p=a[l],h=a[l+1],g=a[l+2],_=a[l+3];return e[t]=o*_+u*p+c*g-d*h,e[t+1]=c*_+u*h+d*p-o*g,e[t+2]=d*_+u*g+o*h-c*p,e[t+3]=u*_-o*p-c*h-d*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,s=e._y,a=e._z,l=e._order,o=Math.cos,c=Math.sin,d=o(i/2),u=o(s/2),p=o(a/2),h=c(i/2),g=c(s/2),_=c(a/2);switch(l){case"XYZ":this._x=h*u*p+d*g*_,this._y=d*g*p-h*u*_,this._z=d*u*_+h*g*p,this._w=d*u*p-h*g*_;break;case"YXZ":this._x=h*u*p+d*g*_,this._y=d*g*p-h*u*_,this._z=d*u*_-h*g*p,this._w=d*u*p+h*g*_;break;case"ZXY":this._x=h*u*p-d*g*_,this._y=d*g*p+h*u*_,this._z=d*u*_+h*g*p,this._w=d*u*p-h*g*_;break;case"ZYX":this._x=h*u*p-d*g*_,this._y=d*g*p+h*u*_,this._z=d*u*_-h*g*p,this._w=d*u*p+h*g*_;break;case"YZX":this._x=h*u*p+d*g*_,this._y=d*g*p+h*u*_,this._z=d*u*_-h*g*p,this._w=d*u*p-h*g*_;break;case"XZY":this._x=h*u*p-d*g*_,this._y=d*g*p-h*u*_,this._z=d*u*_+h*g*p,this._w=d*u*p+h*g*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],l=t[1],o=t[5],c=t[9],d=t[2],u=t[6],p=t[10],h=i+o+p;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(u-c)*g,this._y=(a-d)*g,this._z=(l-s)*g}else if(i>o&&i>p){const g=2*Math.sqrt(1+i-o-p);this._w=(u-c)/g,this._x=.25*g,this._y=(s+l)/g,this._z=(a+d)/g}else if(o>p){const g=2*Math.sqrt(1+o-i-p);this._w=(a-d)/g,this._x=(s+l)/g,this._y=.25*g,this._z=(c+u)/g}else{const g=2*Math.sqrt(1+p-i-o);this._w=(l-s)/g,this._x=(a+d)/g,this._y=(c+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,l=e._w,o=t._x,c=t._y,d=t._z,u=t._w;return this._x=i*u+l*o+s*d-a*c,this._y=s*u+l*c+a*o-i*d,this._z=a*u+l*d+i*c-s*o,this._w=l*u-i*o-s*c-a*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,l=this._w;let o=l*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=l,this._x=i,this._y=s,this._z=a,this;const c=1-o*o;if(c<=Number.EPSILON){const g=1-t;return this._w=g*l+t*this._w,this._x=g*i+t*this._x,this._y=g*s+t*this._y,this._z=g*a+t*this._z,this.normalize(),this._onChangeCallback(),this}const d=Math.sqrt(c),u=Math.atan2(d,o),p=Math.sin((1-t)*u)/d,h=Math.sin(t*u)/d;return this._w=l*p+this._w*h,this._x=i*p+this._x*h,this._y=s*p+this._y*h,this._z=a*p+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),a=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(a),i*Math.cos(a),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,t=0,i=0){q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,l=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*l,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*l,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*l,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,l=e.y,o=e.z,c=e.w,d=2*(l*s-o*i),u=2*(o*t-a*s),p=2*(a*i-l*t);return this.x=t+c*d+l*p-o*u,this.y=i+c*u+o*d-a*p,this.z=s+c*p+a*u-l*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,l=t.x,o=t.y,c=t.z;return this.x=s*c-a*o,this.y=a*l-i*c,this.z=i*o-s*l,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Za.copy(this).projectOnVector(e),this.sub(Za)}reflect(e){return this.sub(Za.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Gt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Za=new q,rd=new Ai;class Ni{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let l=0,o=a.count;l<o;l++)e.isMesh===!0?e.getVertexPosition(l,pn):pn.fromBufferAttribute(a,l),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),as.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),as.copy(i.boundingBox)),as.applyMatrix4(e.matrixWorld),this.union(as)}const s=e.children;for(let a=0,l=s.length;a<l;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),os.subVectors(this.max,wr),Ui.subVectors(e.a,wr),Oi.subVectors(e.b,wr),ki.subVectors(e.c,wr),Wn.subVectors(Oi,Ui),Xn.subVectors(ki,Oi),ci.subVectors(Ui,ki);let t=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ci.z,ci.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ci.z,0,-ci.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ci.y,ci.x,0];return!Ja(t,Ui,Oi,ki,os)||(t=[1,0,0,0,1,0,0,0,1],!Ja(t,Ui,Oi,ki,os))?!1:(ls.crossVectors(Wn,Xn),t=[ls.x,ls.y,ls.z],Ja(t,Ui,Oi,ki,os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ln=[new q,new q,new q,new q,new q,new q,new q,new q],pn=new q,as=new Ni,Ui=new q,Oi=new q,ki=new q,Wn=new q,Xn=new q,ci=new q,wr=new q,os=new q,ls=new q,di=new q;function Ja(n,e,t,i,s){for(let a=0,l=n.length-3;a<=l;a+=3){di.fromArray(n,a);const o=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),c=e.dot(di),d=t.dot(di),u=i.dot(di);if(Math.max(-Math.max(c,d,u),Math.min(c,d,u))>o)return!1}return!0}const s_=new Ni,Sr=new q,Qa=new q;class qr{constructor(e=new q,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):s_.setFromPoints(e).getCenter(i);let s=0;for(let a=0,l=e.length;a<l;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);const t=Sr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Sr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Qa)),this.expandByPoint(Sr.copy(e.center).sub(Qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const jn=new q,eo=new q,cs=new q,qn=new q,to=new q,ds=new q,no=new q;class ml{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){eo.copy(e).add(t).multiplyScalar(.5),cs.copy(t).sub(e).normalize(),qn.copy(this.origin).sub(eo);const a=e.distanceTo(t)*.5,l=-this.direction.dot(cs),o=qn.dot(this.direction),c=-qn.dot(cs),d=qn.lengthSq(),u=Math.abs(1-l*l);let p,h,g,_;if(u>0)if(p=l*c-o,h=l*o-c,_=a*u,p>=0)if(h>=-_)if(h<=_){const x=1/u;p*=x,h*=x,g=p*(p+l*h+2*o)+h*(l*p+h+2*c)+d}else h=a,p=Math.max(0,-(l*h+o)),g=-p*p+h*(h+2*c)+d;else h=-a,p=Math.max(0,-(l*h+o)),g=-p*p+h*(h+2*c)+d;else h<=-_?(p=Math.max(0,-(-l*a+o)),h=p>0?-a:Math.min(Math.max(-a,-c),a),g=-p*p+h*(h+2*c)+d):h<=_?(p=0,h=Math.min(Math.max(-a,-c),a),g=h*(h+2*c)+d):(p=Math.max(0,-(l*a+o)),h=p>0?a:Math.min(Math.max(-a,-c),a),g=-p*p+h*(h+2*c)+d);else h=l>0?-a:a,p=Math.max(0,-(l*h+o)),g=-p*p+h*(h+2*c)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(eo).addScaledVector(cs,h),g}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const i=jn.dot(this.direction),s=jn.dot(jn)-i*i,a=e.radius*e.radius;if(s>a)return null;const l=Math.sqrt(a-s),o=i-l,c=i+l;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,l,o,c;const d=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return d>=0?(i=(e.min.x-h.x)*d,s=(e.max.x-h.x)*d):(i=(e.max.x-h.x)*d,s=(e.min.x-h.x)*d),u>=0?(a=(e.min.y-h.y)*u,l=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,l=(e.min.y-h.y)*u),i>l||a>s||((a>i||isNaN(i))&&(i=a),(l<s||isNaN(s))&&(s=l),p>=0?(o=(e.min.z-h.z)*p,c=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,c=(e.min.z-h.z)*p),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,i,s,a){to.subVectors(t,e),ds.subVectors(i,e),no.crossVectors(to,ds);let l=this.direction.dot(no),o;if(l>0){if(s)return null;o=1}else if(l<0)o=-1,l=-l;else return null;qn.subVectors(this.origin,e);const c=o*this.direction.dot(ds.crossVectors(qn,ds));if(c<0)return null;const d=o*this.direction.dot(to.cross(qn));if(d<0||c+d>l)return null;const u=-o*qn.dot(no);return u<0?null:this.at(u/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bt{constructor(e,t,i,s,a,l,o,c,d,u,p,h,g,_,x,m){bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,l,o,c,d,u,p,h,g,_,x,m)}set(e,t,i,s,a,l,o,c,d,u,p,h,g,_,x,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=a,f[5]=l,f[9]=o,f[13]=c,f[2]=d,f[6]=u,f[10]=p,f[14]=h,f[3]=g,f[7]=_,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Fi.setFromMatrixColumn(e,0).length(),a=1/Fi.setFromMatrixColumn(e,1).length(),l=1/Fi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*l,t[9]=i[9]*l,t[10]=i[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,l=Math.cos(i),o=Math.sin(i),c=Math.cos(s),d=Math.sin(s),u=Math.cos(a),p=Math.sin(a);if(e.order==="XYZ"){const h=l*u,g=l*p,_=o*u,x=o*p;t[0]=c*u,t[4]=-c*p,t[8]=d,t[1]=g+_*d,t[5]=h-x*d,t[9]=-o*c,t[2]=x-h*d,t[6]=_+g*d,t[10]=l*c}else if(e.order==="YXZ"){const h=c*u,g=c*p,_=d*u,x=d*p;t[0]=h+x*o,t[4]=_*o-g,t[8]=l*d,t[1]=l*p,t[5]=l*u,t[9]=-o,t[2]=g*o-_,t[6]=x+h*o,t[10]=l*c}else if(e.order==="ZXY"){const h=c*u,g=c*p,_=d*u,x=d*p;t[0]=h-x*o,t[4]=-l*p,t[8]=_+g*o,t[1]=g+_*o,t[5]=l*u,t[9]=x-h*o,t[2]=-l*d,t[6]=o,t[10]=l*c}else if(e.order==="ZYX"){const h=l*u,g=l*p,_=o*u,x=o*p;t[0]=c*u,t[4]=_*d-g,t[8]=h*d+x,t[1]=c*p,t[5]=x*d+h,t[9]=g*d-_,t[2]=-d,t[6]=o*c,t[10]=l*c}else if(e.order==="YZX"){const h=l*c,g=l*d,_=o*c,x=o*d;t[0]=c*u,t[4]=x-h*p,t[8]=_*p+g,t[1]=p,t[5]=l*u,t[9]=-o*u,t[2]=-d*u,t[6]=g*p+_,t[10]=h-x*p}else if(e.order==="XZY"){const h=l*c,g=l*d,_=o*c,x=o*d;t[0]=c*u,t[4]=-p,t[8]=d*u,t[1]=h*p+x,t[5]=l*u,t[9]=g*p-_,t[2]=_*p-g,t[6]=o*u,t[10]=x*p+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(a_,e,o_)}lookAt(e,t,i){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),$n.crossVectors(i,tn),$n.lengthSq()===0&&(Math.abs(i.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),$n.crossVectors(i,tn)),$n.normalize(),us.crossVectors(tn,$n),s[0]=$n.x,s[4]=us.x,s[8]=tn.x,s[1]=$n.y,s[5]=us.y,s[9]=tn.y,s[2]=$n.z,s[6]=us.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,l=i[0],o=i[4],c=i[8],d=i[12],u=i[1],p=i[5],h=i[9],g=i[13],_=i[2],x=i[6],m=i[10],f=i[14],y=i[3],v=i[7],E=i[11],b=i[15],M=s[0],T=s[4],N=s[8],w=s[12],A=s[1],I=s[5],F=s[9],$=s[13],P=s[2],H=s[6],J=s[10],K=s[14],ae=s[3],ee=s[7],ie=s[11],D=s[15];return a[0]=l*M+o*A+c*P+d*ae,a[4]=l*T+o*I+c*H+d*ee,a[8]=l*N+o*F+c*J+d*ie,a[12]=l*w+o*$+c*K+d*D,a[1]=u*M+p*A+h*P+g*ae,a[5]=u*T+p*I+h*H+g*ee,a[9]=u*N+p*F+h*J+g*ie,a[13]=u*w+p*$+h*K+g*D,a[2]=_*M+x*A+m*P+f*ae,a[6]=_*T+x*I+m*H+f*ee,a[10]=_*N+x*F+m*J+f*ie,a[14]=_*w+x*$+m*K+f*D,a[3]=y*M+v*A+E*P+b*ae,a[7]=y*T+v*I+E*H+b*ee,a[11]=y*N+v*F+E*J+b*ie,a[15]=y*w+v*$+E*K+b*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],l=e[1],o=e[5],c=e[9],d=e[13],u=e[2],p=e[6],h=e[10],g=e[14],_=e[3],x=e[7],m=e[11],f=e[15];return _*(+a*c*p-s*d*p-a*o*h+i*d*h+s*o*g-i*c*g)+x*(+t*c*g-t*d*h+a*l*h-s*l*g+s*d*u-a*c*u)+m*(+t*d*p-t*o*g-a*l*p+i*l*g+a*o*u-i*d*u)+f*(-s*o*u-t*c*p+t*o*h+s*l*p-i*l*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],l=e[4],o=e[5],c=e[6],d=e[7],u=e[8],p=e[9],h=e[10],g=e[11],_=e[12],x=e[13],m=e[14],f=e[15],y=p*m*d-x*h*d+x*c*g-o*m*g-p*c*f+o*h*f,v=_*h*d-u*m*d-_*c*g+l*m*g+u*c*f-l*h*f,E=u*x*d-_*p*d+_*o*g-l*x*g-u*o*f+l*p*f,b=_*p*c-u*x*c-_*o*h+l*x*h+u*o*m-l*p*m,M=t*y+i*v+s*E+a*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=y*T,e[1]=(x*h*a-p*m*a-x*s*g+i*m*g+p*s*f-i*h*f)*T,e[2]=(o*m*a-x*c*a+x*s*d-i*m*d-o*s*f+i*c*f)*T,e[3]=(p*c*a-o*h*a-p*s*d+i*h*d+o*s*g-i*c*g)*T,e[4]=v*T,e[5]=(u*m*a-_*h*a+_*s*g-t*m*g-u*s*f+t*h*f)*T,e[6]=(_*c*a-l*m*a-_*s*d+t*m*d+l*s*f-t*c*f)*T,e[7]=(l*h*a-u*c*a+u*s*d-t*h*d-l*s*g+t*c*g)*T,e[8]=E*T,e[9]=(_*p*a-u*x*a-_*i*g+t*x*g+u*i*f-t*p*f)*T,e[10]=(l*x*a-_*o*a+_*i*d-t*x*d-l*i*f+t*o*f)*T,e[11]=(u*o*a-l*p*a-u*i*d+t*p*d+l*i*g-t*o*g)*T,e[12]=b*T,e[13]=(u*x*s-_*p*s+_*i*h-t*x*h-u*i*m+t*p*m)*T,e[14]=(_*o*s-l*x*s-_*i*c+t*x*c+l*i*m-t*o*m)*T,e[15]=(l*p*s-u*o*s+u*i*c-t*p*c-l*i*h+t*o*h)*T,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,l=e.x,o=e.y,c=e.z,d=a*l,u=a*o;return this.set(d*l+i,d*o-s*c,d*c+s*o,0,d*o+s*c,u*o+i,u*c-s*l,0,d*c-s*o,u*c+s*l,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,l){return this.set(1,i,a,0,e,1,l,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,l=t._y,o=t._z,c=t._w,d=a+a,u=l+l,p=o+o,h=a*d,g=a*u,_=a*p,x=l*u,m=l*p,f=o*p,y=c*d,v=c*u,E=c*p,b=i.x,M=i.y,T=i.z;return s[0]=(1-(x+f))*b,s[1]=(g+E)*b,s[2]=(_-v)*b,s[3]=0,s[4]=(g-E)*M,s[5]=(1-(h+f))*M,s[6]=(m+y)*M,s[7]=0,s[8]=(_+v)*T,s[9]=(m-y)*T,s[10]=(1-(h+x))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=Fi.set(s[0],s[1],s[2]).length();const l=Fi.set(s[4],s[5],s[6]).length(),o=Fi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],mn.copy(this);const d=1/a,u=1/l,p=1/o;return mn.elements[0]*=d,mn.elements[1]*=d,mn.elements[2]*=d,mn.elements[4]*=u,mn.elements[5]*=u,mn.elements[6]*=u,mn.elements[8]*=p,mn.elements[9]*=p,mn.elements[10]*=p,t.setFromRotationMatrix(mn),i.x=a,i.y=l,i.z=o,this}makePerspective(e,t,i,s,a,l,o=Fn){const c=this.elements,d=2*a/(t-e),u=2*a/(i-s),p=(t+e)/(t-e),h=(i+s)/(i-s);let g,_;if(o===Fn)g=-(l+a)/(l-a),_=-2*l*a/(l-a);else if(o===ra)g=-l/(l-a),_=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,l,o=Fn){const c=this.elements,d=1/(t-e),u=1/(i-s),p=1/(l-a),h=(t+e)*d,g=(i+s)*u;let _,x;if(o===Fn)_=(l+a)*p,x=-2*p;else if(o===ra)_=a*p,x=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*d,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-g,c[2]=0,c[6]=0,c[10]=x,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Fi=new q,mn=new bt,a_=new q(0,0,0),o_=new q(1,1,1),$n=new q,us=new q,tn=new q,sd=new bt,ad=new Ai;class lr{constructor(e=0,t=0,i=0,s=lr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],l=s[4],o=s[8],c=s[1],d=s[5],u=s[9],p=s[2],h=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(h,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,d)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,g),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Gt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(h,d),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return sd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ad.setFromEuler(this),this.setFromQuaternion(ad,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}lr.DEFAULT_ORDER="XYZ";class gl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let l_=0;const od=new q,Bi=new Ai,Dn=new bt,hs=new q,Er=new q,c_=new q,d_=new Ai,ld=new q(1,0,0),cd=new q(0,1,0),dd=new q(0,0,1),u_={type:"added"},h_={type:"removed"};class jt extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=Xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new q,t=new lr,i=new Ai,s=new q(1,1,1);function a(){i.setFromEuler(t,!1)}function l(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new bt},normalMatrix:{value:new nt}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new gl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.premultiply(Bi),this}rotateX(e){return this.rotateOnAxis(ld,e)}rotateY(e){return this.rotateOnAxis(cd,e)}rotateZ(e){return this.rotateOnAxis(dd,e)}translateOnAxis(e,t){return od.copy(e).applyQuaternion(this.quaternion),this.position.add(od.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ld,e)}translateY(e){return this.translateOnAxis(cd,e)}translateZ(e){return this.translateOnAxis(dd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?hs.copy(e):hs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(Er,hs,this.up):Dn.lookAt(hs,Er,this.up),this.quaternion.setFromRotationMatrix(Dn),s&&(Dn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(u_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(h_)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Dn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const l=this.children[i].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let s=0,a=this.children.length;s<a;s++){const l=this.children[s].getObjectsByProperty(e,t);l.length>0&&(i=i.concat(l))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,e,c_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Er,d_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const a=t[i];(a.matrixWorldAutoUpdate===!0||e===!0)&&a.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let a=0,l=s.length;a<l;a++){const o=s[a];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let d=0,u=c.length;d<u;d++){const p=c[d];a(e.shapes,p)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,d=this.material.length;c<d;c++)o.push(a(e.materials,this.material[c]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(e.animations,c))}}if(t){const o=l(e.geometries),c=l(e.materials),d=l(e.textures),u=l(e.images),p=l(e.shapes),h=l(e.skeletons),g=l(e.animations),_=l(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),d.length>0&&(i.textures=d),u.length>0&&(i.images=u),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function l(o){const c=[];for(const d in o){const u=o[d];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}jt.DEFAULT_UP=new q(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new q,In=new q,io=new q,Un=new q,zi=new q,Hi=new q,ud=new q,ro=new q,so=new q,ao=new q;let fs=!1;class vn{constructor(e=new q,t=new q,i=new q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),gn.subVectors(e,t),s.cross(gn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){gn.subVectors(s,t),In.subVectors(i,t),io.subVectors(e,t);const l=gn.dot(gn),o=gn.dot(In),c=gn.dot(io),d=In.dot(In),u=In.dot(io),p=l*d-o*o;if(p===0)return a.set(-2,-1,-1);const h=1/p,g=(d*c-o*u)*h,_=(l*u-o*c)*h;return a.set(1-g-_,_,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Un),Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getUV(e,t,i,s,a,l,o,c){return fs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fs=!0),this.getInterpolation(e,t,i,s,a,l,o,c)}static getInterpolation(e,t,i,s,a,l,o,c){return this.getBarycoord(e,t,i,s,Un),c.setScalar(0),c.addScaledVector(a,Un.x),c.addScaledVector(l,Un.y),c.addScaledVector(o,Un.z),c}static isFrontFacing(e,t,i,s){return gn.subVectors(i,t),In.subVectors(e,t),gn.cross(In).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),gn.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,a){return fs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fs=!0),vn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}getInterpolation(e,t,i,s,a){return vn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let l,o;zi.subVectors(s,i),Hi.subVectors(a,i),ro.subVectors(e,i);const c=zi.dot(ro),d=Hi.dot(ro);if(c<=0&&d<=0)return t.copy(i);so.subVectors(e,s);const u=zi.dot(so),p=Hi.dot(so);if(u>=0&&p<=u)return t.copy(s);const h=c*p-u*d;if(h<=0&&c>=0&&u<=0)return l=c/(c-u),t.copy(i).addScaledVector(zi,l);ao.subVectors(e,a);const g=zi.dot(ao),_=Hi.dot(ao);if(_>=0&&g<=_)return t.copy(a);const x=g*d-c*_;if(x<=0&&d>=0&&_<=0)return o=d/(d-_),t.copy(i).addScaledVector(Hi,o);const m=u*_-g*p;if(m<=0&&p-u>=0&&g-_>=0)return ud.subVectors(a,s),o=(p-u)/(p-u+(g-_)),t.copy(s).addScaledVector(ud,o);const f=1/(m+x+h);return l=x*f,o=h*f,t.copy(i).addScaledVector(zi,l).addScaledVector(Hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},ps={h:0,s:0,l:0};function oo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=dt.workingColorSpace){if(e=Zv(e,1),t=Gt(t,0,1),i=Gt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,l=2*i-a;this.r=oo(l,a,e+1/3),this.g=oo(l,a,e),this.b=oo(l,a,e-1/3)}return dt.toWorkingColorSpace(this,s),this}setStyle(e,t=Dt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const l=s[1],o=s[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(l===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const i=Vh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}copyLinearToSRGB(e){return this.r=Ya(e.r),this.g=Ya(e.g),this.b=Ya(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return dt.fromWorkingColorSpace(Ot.copy(this),e),Math.round(Gt(Ot.r*255,0,255))*65536+Math.round(Gt(Ot.g*255,0,255))*256+Math.round(Gt(Ot.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(Ot.copy(this),t);const i=Ot.r,s=Ot.g,a=Ot.b,l=Math.max(i,s,a),o=Math.min(i,s,a);let c,d;const u=(o+l)/2;if(o===l)c=0,d=0;else{const p=l-o;switch(d=u<=.5?p/(l+o):p/(2-l-o),l){case i:c=(s-a)/p+(s<a?6:0);break;case s:c=(a-i)/p+2;break;case a:c=(i-s)/p+4;break}c/=6}return e.h=c,e.s=d,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Dt){dt.fromWorkingColorSpace(Ot.copy(this),e);const t=Ot.r,i=Ot.g,s=Ot.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Yn),this.setHSL(Yn.h+e,Yn.s+t,Yn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Yn),e.getHSL(ps);const i=qa(Yn.h,ps.h,t),s=qa(Yn.s,ps.s,t),a=qa(Yn.l,ps.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new ot;ot.NAMES=Vh;let f_=0;class $r extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f_++}),this.uuid=Xr(),this.name="",this.type="Material",this.blending=er,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=Ho,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=ea,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zo&&(i.blendSrc=this.blendSrc),this.blendDst!==Ho&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ea&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const l=[];for(const o in a){const c=a[o];delete c.metadata,l.push(c)}return l}if(t){const a=s(e.textures),l=s(e.images);a.length>0&&(i.textures=a),l.length>0&&(i.images=l)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wh extends $r{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new q,ms=new $e;class bn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Jc,this.updateRange={offset:0,count:-1},this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ms.fromBufferAttribute(this,t),ms.applyMatrix3(e),this.setXY(t,ms.x,ms.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=br(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=br(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=br(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=br(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=br(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),s=qt(s,this.array),a=qt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jc&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Xh extends bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class qh extends bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Rn extends bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let p_=0;const an=new bt,lo=new jt,Gi=new q,nn=new Ni,Mr=new Ni,Pt=new q;class ai extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:p_++}),this.uuid=Xr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bh(e)?qh:Xh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new nt().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,i){return an.makeTranslation(e,t,i),this.applyMatrix4(an),this}scale(e,t,i){return an.makeScale(e,t,i),this.applyMatrix4(an),this}lookAt(e){return lo.lookAt(e),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Rn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];nn.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let a=0,l=t.length;a<l;a++){const o=t[a];Mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(nn.min,Mr.min),nn.expandByPoint(Pt),Pt.addVectors(nn.max,Mr.max),nn.expandByPoint(Pt)):(nn.expandByPoint(Mr.min),nn.expandByPoint(Mr.max))}nn.getCenter(i);let s=0;for(let a=0,l=e.count;a<l;a++)Pt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Pt));if(t)for(let a=0,l=t.length;a<l;a++){const o=t[a],c=this.morphTargetsRelative;for(let d=0,u=o.count;d<u;d++)Pt.fromBufferAttribute(o,d),c&&(Gi.fromBufferAttribute(e,d),Pt.add(Gi)),s=Math.max(s,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,a=t.normal.array,l=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,d=[],u=[];for(let A=0;A<o;A++)d[A]=new q,u[A]=new q;const p=new q,h=new q,g=new q,_=new $e,x=new $e,m=new $e,f=new q,y=new q;function v(A,I,F){p.fromArray(s,A*3),h.fromArray(s,I*3),g.fromArray(s,F*3),_.fromArray(l,A*2),x.fromArray(l,I*2),m.fromArray(l,F*2),h.sub(p),g.sub(p),x.sub(_),m.sub(_);const $=1/(x.x*m.y-m.x*x.y);isFinite($)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(g,-x.y).multiplyScalar($),y.copy(g).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar($),d[A].add(f),d[I].add(f),d[F].add(f),u[A].add(y),u[I].add(y),u[F].add(y))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let A=0,I=E.length;A<I;++A){const F=E[A],$=F.start,P=F.count;for(let H=$,J=$+P;H<J;H+=3)v(i[H+0],i[H+1],i[H+2])}const b=new q,M=new q,T=new q,N=new q;function w(A){T.fromArray(a,A*3),N.copy(T);const I=d[A];b.copy(I),b.sub(T.multiplyScalar(T.dot(I))).normalize(),M.crossVectors(N,I);const $=M.dot(u[A])<0?-1:1;c[A*4]=b.x,c[A*4+1]=b.y,c[A*4+2]=b.z,c[A*4+3]=$}for(let A=0,I=E.length;A<I;++A){const F=E[A],$=F.start,P=F.count;for(let H=$,J=$+P;H<J;H+=3)w(i[H+0]),w(i[H+1]),w(i[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);const s=new q,a=new q,l=new q,o=new q,c=new q,d=new q,u=new q,p=new q;if(e)for(let h=0,g=e.count;h<g;h+=3){const _=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,x),l.fromBufferAttribute(t,m),u.subVectors(l,a),p.subVectors(s,a),u.cross(p),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,m),o.add(u),c.add(u),d.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,d.x,d.y,d.z)}else for(let h=0,g=t.count;h<g;h+=3)s.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),l.fromBufferAttribute(t,h+2),u.subVectors(l,a),p.subVectors(s,a),u.cross(p),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,c){const d=o.array,u=o.itemSize,p=o.normalized,h=new d.constructor(c.length*u);let g=0,_=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?g=c[x]*o.data.stride+o.offset:g=c[x]*u;for(let f=0;f<u;f++)h[_++]=d[g++]}return new bn(h,u,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ai,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],d=e(c,i);t.setAttribute(o,d)}const a=this.morphAttributes;for(const o in a){const c=[],d=a[o];for(let u=0,p=d.length;u<p;u++){const h=d[u],g=e(h,i);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let o=0,c=l.length;o<c;o++){const d=l[o];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const d in c)c[d]!==void 0&&(e[d]=c[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const d=i[c];e.data.attributes[c]=d.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const d=this.morphAttributes[c],u=[];for(let p=0,h=d.length;p<h;p++){const g=d[p];u.push(g.toJSON(e.data))}u.length>0&&(s[c]=u,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const d in s){const u=s[d];this.setAttribute(d,u.clone(t))}const a=e.morphAttributes;for(const d in a){const u=[],p=a[d];for(let h=0,g=p.length;h<g;h++)u.push(p[h].clone(t));this.morphAttributes[d]=u}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let d=0,u=l.length;d<u;d++){const p=l[d];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hd=new bt,ui=new ml,gs=new qr,fd=new q,Vi=new q,Wi=new q,Xi=new q,co=new q,xs=new q,vs=new $e,_s=new $e,ys=new $e,pd=new q,md=new q,gd=new q,bs=new q,ws=new q;class mt extends jt{constructor(e=new ai,t=new Wh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=s.length;a<l;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,l=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){xs.set(0,0,0);for(let c=0,d=a.length;c<d;c++){const u=o[c],p=a[c];u!==0&&(co.fromBufferAttribute(p,e),l?xs.addScaledVector(co,u):xs.addScaledVector(co.sub(t),u))}t.add(xs)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),gs.copy(i.boundingSphere),gs.applyMatrix4(a),ui.copy(e.ray).recast(e.near),!(gs.containsPoint(ui.origin)===!1&&(ui.intersectSphere(gs,fd)===null||ui.origin.distanceToSquared(fd)>(e.far-e.near)**2))&&(hd.copy(a).invert(),ui.copy(e.ray).applyMatrix4(hd),!(i.boundingBox!==null&&ui.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ui)))}_computeIntersections(e,t,i){let s;const a=this.geometry,l=this.material,o=a.index,c=a.attributes.position,d=a.attributes.uv,u=a.attributes.uv1,p=a.attributes.normal,h=a.groups,g=a.drawRange;if(o!==null)if(Array.isArray(l))for(let _=0,x=h.length;_<x;_++){const m=h[_],f=l[m.materialIndex],y=Math.max(m.start,g.start),v=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let E=y,b=v;E<b;E+=3){const M=o.getX(E),T=o.getX(E+1),N=o.getX(E+2);s=Ss(this,f,e,i,d,u,p,M,T,N),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),x=Math.min(o.count,g.start+g.count);for(let m=_,f=x;m<f;m+=3){const y=o.getX(m),v=o.getX(m+1),E=o.getX(m+2);s=Ss(this,l,e,i,d,u,p,y,v,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(l))for(let _=0,x=h.length;_<x;_++){const m=h[_],f=l[m.materialIndex],y=Math.max(m.start,g.start),v=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let E=y,b=v;E<b;E+=3){const M=E,T=E+1,N=E+2;s=Ss(this,f,e,i,d,u,p,M,T,N),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),x=Math.min(c.count,g.start+g.count);for(let m=_,f=x;m<f;m+=3){const y=m,v=m+1,E=m+2;s=Ss(this,l,e,i,d,u,p,y,v,E),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function m_(n,e,t,i,s,a,l,o){let c;if(e.side===Zt?c=i.intersectTriangle(l,a,s,!0,o):c=i.intersectTriangle(s,a,l,e.side===si,o),c===null)return null;ws.copy(o),ws.applyMatrix4(n.matrixWorld);const d=t.ray.origin.distanceTo(ws);return d<t.near||d>t.far?null:{distance:d,point:ws.clone(),object:n}}function Ss(n,e,t,i,s,a,l,o,c,d){n.getVertexPosition(o,Vi),n.getVertexPosition(c,Wi),n.getVertexPosition(d,Xi);const u=m_(n,e,t,i,Vi,Wi,Xi,bs);if(u){s&&(vs.fromBufferAttribute(s,o),_s.fromBufferAttribute(s,c),ys.fromBufferAttribute(s,d),u.uv=vn.getInterpolation(bs,Vi,Wi,Xi,vs,_s,ys,new $e)),a&&(vs.fromBufferAttribute(a,o),_s.fromBufferAttribute(a,c),ys.fromBufferAttribute(a,d),u.uv1=vn.getInterpolation(bs,Vi,Wi,Xi,vs,_s,ys,new $e),u.uv2=u.uv1),l&&(pd.fromBufferAttribute(l,o),md.fromBufferAttribute(l,c),gd.fromBufferAttribute(l,d),u.normal=vn.getInterpolation(bs,Vi,Wi,Xi,pd,md,gd,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:c,c:d,normal:new q,materialIndex:0};vn.getNormal(Vi,Wi,Xi,p.normal),u.face=p}return u}class Hn extends ai{constructor(e=1,t=1,i=1,s=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:l};const o=this;s=Math.floor(s),a=Math.floor(a),l=Math.floor(l);const c=[],d=[],u=[],p=[];let h=0,g=0;_("z","y","x",-1,-1,i,t,e,l,a,0),_("z","y","x",1,-1,i,t,-e,l,a,1),_("x","z","y",1,1,e,i,t,s,l,2),_("x","z","y",1,-1,e,i,-t,s,l,3),_("x","y","z",1,-1,e,t,i,s,a,4),_("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new Rn(d,3)),this.setAttribute("normal",new Rn(u,3)),this.setAttribute("uv",new Rn(p,2));function _(x,m,f,y,v,E,b,M,T,N,w){const A=E/T,I=b/N,F=E/2,$=b/2,P=M/2,H=T+1,J=N+1;let K=0,ae=0;const ee=new q;for(let ie=0;ie<J;ie++){const D=ie*I-$;for(let L=0;L<H;L++){const V=L*A-F;ee[x]=V*y,ee[m]=D*v,ee[f]=P,d.push(ee.x,ee.y,ee.z),ee[x]=0,ee[m]=0,ee[f]=M>0?1:-1,u.push(ee.x,ee.y,ee.z),p.push(L/T),p.push(1-ie/N),K+=1}}for(let ie=0;ie<N;ie++)for(let D=0;D<T;D++){const L=h+D+H*ie,V=h+D+H*(ie+1),B=h+(D+1)+H*(ie+1),Q=h+(D+1)+H*ie;c.push(L,V,Q),c.push(V,B,Q),ae+=6}o.addGroup(g,ae,w),g+=ae,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function zt(n){const e={};for(let t=0;t<n.length;t++){const i=cr(n[t]);for(const s in i)e[s]=i[s]}return e}function g_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function $h(n){return n.getRenderTarget()===null?n.outputColorSpace:dt.workingColorSpace}const x_={clone:cr,merge:zt};var v_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,__=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends $r{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=v_,this.fragmentShader=__,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=g_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?t.uniforms[s]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[s]={type:"m4",value:l.toArray()}:t.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Yh extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=Fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class $t extends Yh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sa*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,a,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const c=l.fullWidth,d=l.fullHeight;a+=l.offsetX*s/c,t-=l.offsetY*i/d,s*=l.width/c,i*=l.height/d}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const qi=-90,$i=1;class y_ extends jt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $t(qi,$i,e,t);s.layers=this.layers,this.add(s);const a=new $t(qi,$i,e,t);a.layers=this.layers,this.add(a);const l=new $t(qi,$i,e,t);l.layers=this.layers,this.add(l);const o=new $t(qi,$i,e,t);o.layers=this.layers,this.add(o);const c=new $t(qi,$i,e,t);c.layers=this.layers,this.add(c);const d=new $t(qi,$i,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,l,o,c]=t;for(const d of t)this.remove(d);if(e===Fn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ra)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,l,o,c,d,u]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,l),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,d),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(p,h,g),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Kh extends Jt{constructor(e,t,i,s,a,l,o,c,d,u){e=e!==void 0?e:[],t=t!==void 0?t:sr,super(e,t,i,s,a,l,o,c,d,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class b_ extends Ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(Dr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===wi?Dt:un),this.texture=new Kh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:cn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Hn(5,5,5),a=new Ri({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Zt,blending:ni});a.uniforms.tEquirect.value=t;const l=new mt(s,a),o=t.minFilter;return t.minFilter===kr&&(t.minFilter=cn),new y_(1,10,this).update(e,l),t.minFilter=o,l.geometry.dispose(),l.material.dispose(),this}clear(e,t,i,s){const a=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,i,s);e.setRenderTarget(a)}}const uo=new q,w_=new q,S_=new nt;class Kn{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=uo.subVectors(i,t).cross(w_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(uo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||S_.getNormalMatrix(e),s=this.coplanarPoint(uo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hi=new qr,Es=new q;class xl{constructor(e=new Kn,t=new Kn,i=new Kn,s=new Kn,a=new Kn,l=new Kn){this.planes=[e,t,i,s,a,l]}set(e,t,i,s,a,l){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(l),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Fn){const i=this.planes,s=e.elements,a=s[0],l=s[1],o=s[2],c=s[3],d=s[4],u=s[5],p=s[6],h=s[7],g=s[8],_=s[9],x=s[10],m=s[11],f=s[12],y=s[13],v=s[14],E=s[15];if(i[0].setComponents(c-a,h-d,m-g,E-f).normalize(),i[1].setComponents(c+a,h+d,m+g,E+f).normalize(),i[2].setComponents(c+l,h+u,m+_,E+y).normalize(),i[3].setComponents(c-l,h-u,m-_,E-y).normalize(),i[4].setComponents(c-o,h-p,m-x,E-v).normalize(),t===Fn)i[5].setComponents(c+o,h+p,m+x,E+v).normalize();else if(t===ra)i[5].setComponents(o,p,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){return hi.center.set(0,0,0),hi.radius=.7071067811865476,hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Es.x=s.normal.x>0?e.max.x:e.min.x,Es.y=s.normal.y>0?e.max.y:e.min.y,Es.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zh(){let n=null,e=!1,t=null,i=null;function s(a,l){t(a,l),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function E_(n,e){const t=e.isWebGL2,i=new WeakMap;function s(d,u){const p=d.array,h=d.usage,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,p,h),d.onUploadCallback();let _;if(p instanceof Float32Array)_=n.FLOAT;else if(p instanceof Uint16Array)if(d.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(p instanceof Int16Array)_=n.SHORT;else if(p instanceof Uint32Array)_=n.UNSIGNED_INT;else if(p instanceof Int32Array)_=n.INT;else if(p instanceof Int8Array)_=n.BYTE;else if(p instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:_,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version}}function a(d,u,p){const h=u.array,g=u.updateRange;n.bindBuffer(p,d),g.count===-1?n.bufferSubData(p,0,h):(t?n.bufferSubData(p,g.offset*h.BYTES_PER_ELEMENT,h,g.offset,g.count):n.bufferSubData(p,g.offset*h.BYTES_PER_ELEMENT,h.subarray(g.offset,g.offset+g.count)),g.count=-1),u.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),i.get(d)}function o(d){d.isInterleavedBufferAttribute&&(d=d.data);const u=i.get(d);u&&(n.deleteBuffer(u.buffer),i.delete(d))}function c(d,u){if(d.isGLBufferAttribute){const h=i.get(d);(!h||h.version<d.version)&&i.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}d.isInterleavedBufferAttribute&&(d=d.data);const p=i.get(d);p===void 0?i.set(d,s(d,u)):p.version<d.version&&(a(p.buffer,d,u),p.version=d.version)}return{get:l,remove:o,update:c}}class Bn extends ai{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,l=t/2,o=Math.floor(i),c=Math.floor(s),d=o+1,u=c+1,p=e/o,h=t/c,g=[],_=[],x=[],m=[];for(let f=0;f<u;f++){const y=f*h-l;for(let v=0;v<d;v++){const E=v*p-a;_.push(E,-y,0),x.push(0,0,1),m.push(v/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<o;y++){const v=y+d*f,E=y+d*(f+1),b=y+1+d*(f+1),M=y+1+d*f;g.push(v,E,M),g.push(E,b,M)}this.setIndex(g),this.setAttribute("position",new Rn(_,3)),this.setAttribute("normal",new Rn(x,3)),this.setAttribute("uv",new Rn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.width,e.height,e.widthSegments,e.heightSegments)}}var M_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T_=`#ifdef USE_ALPHAHASH
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
#endif`,A_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,N_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P_=`#ifdef USE_AOMAP
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
#endif`,L_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,j_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,D_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,I_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,U_=`#ifdef USE_IRIDESCENCE
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
#endif`,O_=`#ifdef USE_BUMPMAP
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
#endif`,k_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,F_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,B_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,z_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,H_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,G_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,V_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,W_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,X_=`#define PI 3.141592653589793
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
} // validated`,q_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$_=`vec3 transformedNormal = objectNormal;
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
#endif`,Y_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,K_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Z_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,J_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Q_="gl_FragColor = linearToOutputTexel( gl_FragColor );",ey=`
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
}`,ty=`#ifdef USE_ENVMAP
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
#endif`,ny=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,iy=`#ifdef USE_ENVMAP
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
#endif`,ry=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sy=`#ifdef USE_ENVMAP
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
#endif`,ay=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ly=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dy=`#ifdef USE_GRADIENTMAP
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
}`,uy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,py=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,my=`uniform bool receiveShadow;
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
#endif`,gy=`#ifdef USE_ENVMAP
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
#endif`,xy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_y=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,by=`PhysicalMaterial material;
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
#endif`,wy=`struct PhysicalMaterial {
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
}`,Sy=`
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
#endif`,Ey=`#if defined( RE_IndirectDiffuse )
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
#endif`,My=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ty=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ay=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ry=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Cy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ny=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Py=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ly=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jy=`#if defined( USE_POINTS_UV )
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
#endif`,Dy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Iy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Uy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Oy=`#ifdef USE_MORPHNORMALS
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
#endif`,ky=`#ifdef USE_MORPHTARGETS
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
#endif`,Fy=`#ifdef USE_MORPHTARGETS
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
#endif`,By=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wy=`#ifdef USE_NORMALMAP
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
#endif`,Xy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$y=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ib=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ab=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ob=`float getShadowMask() {
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
}`,lb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cb=`#ifdef USE_SKINNING
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
#endif`,db=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ub=`#ifdef USE_SKINNING
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
#endif`,hb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gb=`#ifdef USE_TRANSMISSION
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
#endif`,xb=`#ifdef USE_TRANSMISSION
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
#endif`,vb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_b=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sb=`uniform sampler2D t2D;
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
}`,Eb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ab=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rb=`#include <common>
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
}`,Cb=`#if DEPTH_PACKING == 3200
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
}`,Nb=`#define DISTANCE
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
}`,Pb=`#define DISTANCE
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
}`,Lb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Db=`uniform float scale;
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
}`,Ib=`uniform vec3 diffuse;
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
}`,Ub=`#include <common>
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
}`,Ob=`uniform vec3 diffuse;
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
}`,kb=`#define LAMBERT
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
}`,Fb=`#define LAMBERT
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
}`,Bb=`#define MATCAP
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
}`,zb=`#define MATCAP
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
}`,Hb=`#define NORMAL
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
}`,Gb=`#define NORMAL
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
}`,Vb=`#define PHONG
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
}`,Wb=`#define PHONG
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
}`,Xb=`#define STANDARD
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
}`,qb=`#define STANDARD
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
}`,$b=`#define TOON
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
}`,Yb=`#define TOON
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
}`,Kb=`uniform float size;
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
}`,Zb=`uniform vec3 diffuse;
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
}`,Jb=`#include <common>
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
}`,Qb=`uniform vec3 color;
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
}`,ew=`uniform float rotation;
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
}`,tw=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:M_,alphahash_pars_fragment:T_,alphamap_fragment:A_,alphamap_pars_fragment:R_,alphatest_fragment:C_,alphatest_pars_fragment:N_,aomap_fragment:P_,aomap_pars_fragment:L_,begin_vertex:j_,beginnormal_vertex:D_,bsdfs:I_,iridescence_fragment:U_,bumpmap_pars_fragment:O_,clipping_planes_fragment:k_,clipping_planes_pars_fragment:F_,clipping_planes_pars_vertex:B_,clipping_planes_vertex:z_,color_fragment:H_,color_pars_fragment:G_,color_pars_vertex:V_,color_vertex:W_,common:X_,cube_uv_reflection_fragment:q_,defaultnormal_vertex:$_,displacementmap_pars_vertex:Y_,displacementmap_vertex:K_,emissivemap_fragment:Z_,emissivemap_pars_fragment:J_,colorspace_fragment:Q_,colorspace_pars_fragment:ey,envmap_fragment:ty,envmap_common_pars_fragment:ny,envmap_pars_fragment:iy,envmap_pars_vertex:ry,envmap_physical_pars_fragment:gy,envmap_vertex:sy,fog_vertex:ay,fog_pars_vertex:oy,fog_fragment:ly,fog_pars_fragment:cy,gradientmap_pars_fragment:dy,lightmap_fragment:uy,lightmap_pars_fragment:hy,lights_lambert_fragment:fy,lights_lambert_pars_fragment:py,lights_pars_begin:my,lights_toon_fragment:xy,lights_toon_pars_fragment:vy,lights_phong_fragment:_y,lights_phong_pars_fragment:yy,lights_physical_fragment:by,lights_physical_pars_fragment:wy,lights_fragment_begin:Sy,lights_fragment_maps:Ey,lights_fragment_end:My,logdepthbuf_fragment:Ty,logdepthbuf_pars_fragment:Ay,logdepthbuf_pars_vertex:Ry,logdepthbuf_vertex:Cy,map_fragment:Ny,map_pars_fragment:Py,map_particle_fragment:Ly,map_particle_pars_fragment:jy,metalnessmap_fragment:Dy,metalnessmap_pars_fragment:Iy,morphcolor_vertex:Uy,morphnormal_vertex:Oy,morphtarget_pars_vertex:ky,morphtarget_vertex:Fy,normal_fragment_begin:By,normal_fragment_maps:zy,normal_pars_fragment:Hy,normal_pars_vertex:Gy,normal_vertex:Vy,normalmap_pars_fragment:Wy,clearcoat_normal_fragment_begin:Xy,clearcoat_normal_fragment_maps:qy,clearcoat_pars_fragment:$y,iridescence_pars_fragment:Yy,opaque_fragment:Ky,packing:Zy,premultiplied_alpha_fragment:Jy,project_vertex:Qy,dithering_fragment:eb,dithering_pars_fragment:tb,roughnessmap_fragment:nb,roughnessmap_pars_fragment:ib,shadowmap_pars_fragment:rb,shadowmap_pars_vertex:sb,shadowmap_vertex:ab,shadowmask_pars_fragment:ob,skinbase_vertex:lb,skinning_pars_vertex:cb,skinning_vertex:db,skinnormal_vertex:ub,specularmap_fragment:hb,specularmap_pars_fragment:fb,tonemapping_fragment:pb,tonemapping_pars_fragment:mb,transmission_fragment:gb,transmission_pars_fragment:xb,uv_pars_fragment:vb,uv_pars_vertex:_b,uv_vertex:yb,worldpos_vertex:bb,background_vert:wb,background_frag:Sb,backgroundCube_vert:Eb,backgroundCube_frag:Mb,cube_vert:Tb,cube_frag:Ab,depth_vert:Rb,depth_frag:Cb,distanceRGBA_vert:Nb,distanceRGBA_frag:Pb,equirect_vert:Lb,equirect_frag:jb,linedashed_vert:Db,linedashed_frag:Ib,meshbasic_vert:Ub,meshbasic_frag:Ob,meshlambert_vert:kb,meshlambert_frag:Fb,meshmatcap_vert:Bb,meshmatcap_frag:zb,meshnormal_vert:Hb,meshnormal_frag:Gb,meshphong_vert:Vb,meshphong_frag:Wb,meshphysical_vert:Xb,meshphysical_frag:qb,meshtoon_vert:$b,meshtoon_frag:Yb,points_vert:Kb,points_frag:Zb,shadow_vert:Jb,shadow_frag:Qb,sprite_vert:ew,sprite_frag:tw},ve={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},En={basic:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ot(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:zt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:zt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new ot(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:zt([ve.points,ve.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:zt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:zt([ve.common,ve.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:zt([ve.sprite,ve.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:zt([ve.common,ve.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:zt([ve.lights,ve.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};En.physical={uniforms:zt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Ms={r:0,b:0,g:0};function nw(n,e,t,i,s,a,l){const o=new ot(0);let c=a===!0?0:1,d,u,p=null,h=0,g=null;function _(m,f){let y=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?x(o,c):v&&v.isColor&&(x(v,1),y=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,l):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,l),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===va)?(u===void 0&&(u=new mt(new Hn(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:cr(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,M,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=dt.getTransfer(v.colorSpace)!==pt,(p!==v||h!==v.version||g!==n.toneMapping)&&(u.material.needsUpdate=!0,p=v,h=v.version,g=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(d===void 0&&(d=new mt(new Bn(2,2),new Ri({name:"BackgroundMaterial",uniforms:cr(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=v,d.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,d.material.toneMapped=dt.getTransfer(v.colorSpace)!==pt,v.matrixAutoUpdate===!0&&v.updateMatrix(),d.material.uniforms.uvTransform.value.copy(v.matrix),(p!==v||h!==v.version||g!==n.toneMapping)&&(d.material.needsUpdate=!0,p=v,h=v.version,g=n.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null))}function x(m,f){m.getRGB(Ms,$h(n)),i.buffers.color.setClear(Ms.r,Ms.g,Ms.b,f,l)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),c=f,x(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(o,c)},render:_}}function iw(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),a=i.isWebGL2?null:e.get("OES_vertex_array_object"),l=i.isWebGL2||a!==null,o={},c=m(null);let d=c,u=!1;function p(P,H,J,K,ae){let ee=!1;if(l){const ie=x(K,J,H);d!==ie&&(d=ie,g(d.object)),ee=f(P,K,J,ae),ee&&y(P,K,J,ae)}else{const ie=H.wireframe===!0;(d.geometry!==K.id||d.program!==J.id||d.wireframe!==ie)&&(d.geometry=K.id,d.program=J.id,d.wireframe=ie,ee=!0)}ae!==null&&t.update(ae,n.ELEMENT_ARRAY_BUFFER),(ee||u)&&(u=!1,N(P,H,J,K),ae!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ae).buffer))}function h(){return i.isWebGL2?n.createVertexArray():a.createVertexArrayOES()}function g(P){return i.isWebGL2?n.bindVertexArray(P):a.bindVertexArrayOES(P)}function _(P){return i.isWebGL2?n.deleteVertexArray(P):a.deleteVertexArrayOES(P)}function x(P,H,J){const K=J.wireframe===!0;let ae=o[P.id];ae===void 0&&(ae={},o[P.id]=ae);let ee=ae[H.id];ee===void 0&&(ee={},ae[H.id]=ee);let ie=ee[K];return ie===void 0&&(ie=m(h()),ee[K]=ie),ie}function m(P){const H=[],J=[],K=[];for(let ae=0;ae<s;ae++)H[ae]=0,J[ae]=0,K[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:J,attributeDivisors:K,object:P,attributes:{},index:null}}function f(P,H,J,K){const ae=d.attributes,ee=H.attributes;let ie=0;const D=J.getAttributes();for(const L in D)if(D[L].location>=0){const B=ae[L];let Q=ee[L];if(Q===void 0&&(L==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),L==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor)),B===void 0||B.attribute!==Q||Q&&B.data!==Q.data)return!0;ie++}return d.attributesNum!==ie||d.index!==K}function y(P,H,J,K){const ae={},ee=H.attributes;let ie=0;const D=J.getAttributes();for(const L in D)if(D[L].location>=0){let B=ee[L];B===void 0&&(L==="instanceMatrix"&&P.instanceMatrix&&(B=P.instanceMatrix),L==="instanceColor"&&P.instanceColor&&(B=P.instanceColor));const Q={};Q.attribute=B,B&&B.data&&(Q.data=B.data),ae[L]=Q,ie++}d.attributes=ae,d.attributesNum=ie,d.index=K}function v(){const P=d.newAttributes;for(let H=0,J=P.length;H<J;H++)P[H]=0}function E(P){b(P,0)}function b(P,H){const J=d.newAttributes,K=d.enabledAttributes,ae=d.attributeDivisors;J[P]=1,K[P]===0&&(n.enableVertexAttribArray(P),K[P]=1),ae[P]!==H&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,H),ae[P]=H)}function M(){const P=d.newAttributes,H=d.enabledAttributes;for(let J=0,K=H.length;J<K;J++)H[J]!==P[J]&&(n.disableVertexAttribArray(J),H[J]=0)}function T(P,H,J,K,ae,ee,ie){ie===!0?n.vertexAttribIPointer(P,H,J,ae,ee):n.vertexAttribPointer(P,H,J,K,ae,ee)}function N(P,H,J,K){if(i.isWebGL2===!1&&(P.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const ae=K.attributes,ee=J.getAttributes(),ie=H.defaultAttributeValues;for(const D in ee){const L=ee[D];if(L.location>=0){let V=ae[D];if(V===void 0&&(D==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),D==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){const B=V.normalized,Q=V.itemSize,O=t.get(V);if(O===void 0)continue;const _e=O.buffer,Y=O.type,Se=O.bytesPerElement,Me=i.isWebGL2===!0&&(Y===n.INT||Y===n.UNSIGNED_INT||V.gpuType===Lh);if(V.isInterleavedBufferAttribute){const oe=V.data,U=oe.stride,Ze=V.offset;if(oe.isInstancedInterleavedBuffer){for(let ye=0;ye<L.locationSize;ye++)b(L.location+ye,oe.meshPerAttribute);P.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ye=0;ye<L.locationSize;ye++)E(L.location+ye);n.bindBuffer(n.ARRAY_BUFFER,_e);for(let ye=0;ye<L.locationSize;ye++)T(L.location+ye,Q/L.locationSize,Y,B,U*Se,(Ze+Q/L.locationSize*ye)*Se,Me)}else{if(V.isInstancedBufferAttribute){for(let oe=0;oe<L.locationSize;oe++)b(L.location+oe,V.meshPerAttribute);P.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let oe=0;oe<L.locationSize;oe++)E(L.location+oe);n.bindBuffer(n.ARRAY_BUFFER,_e);for(let oe=0;oe<L.locationSize;oe++)T(L.location+oe,Q/L.locationSize,Y,B,Q*Se,Q/L.locationSize*oe*Se,Me)}}else if(ie!==void 0){const B=ie[D];if(B!==void 0)switch(B.length){case 2:n.vertexAttrib2fv(L.location,B);break;case 3:n.vertexAttrib3fv(L.location,B);break;case 4:n.vertexAttrib4fv(L.location,B);break;default:n.vertexAttrib1fv(L.location,B)}}}}M()}function w(){F();for(const P in o){const H=o[P];for(const J in H){const K=H[J];for(const ae in K)_(K[ae].object),delete K[ae];delete H[J]}delete o[P]}}function A(P){if(o[P.id]===void 0)return;const H=o[P.id];for(const J in H){const K=H[J];for(const ae in K)_(K[ae].object),delete K[ae];delete H[J]}delete o[P.id]}function I(P){for(const H in o){const J=o[H];if(J[P.id]===void 0)continue;const K=J[P.id];for(const ae in K)_(K[ae].object),delete K[ae];delete J[P.id]}}function F(){$(),u=!0,d!==c&&(d=c,g(d.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:p,reset:F,resetDefaultState:$,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:E,disableUnusedAttributes:M}}function rw(n,e,t,i){const s=i.isWebGL2;let a;function l(d){a=d}function o(d,u){n.drawArrays(a,d,u),t.update(u,a,1)}function c(d,u,p){if(p===0)return;let h,g;if(s)h=n,g="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[g](a,d,u,p),t.update(u,a,p)}this.setMode=l,this.render=o,this.renderInstances=c}function sw(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const l=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=a(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const d=l||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,E=l||e.has("OES_texture_float"),b=v&&E,M=l?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:l,drawBuffers:d,getMaxAnisotropy:s,getMaxPrecision:a,precision:o,logarithmicDepthBuffer:u,maxTextures:p,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:E,floatVertexTextures:b,maxSamples:M}}function aw(n){const e=this;let t=null,i=0,s=!1,a=!1;const l=new Kn,o=new nt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const g=p.length!==0||h||i!==0||s;return s=h,i=p.length,g},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,h){t=u(p,h,0)},this.setState=function(p,h,g){const _=p.clippingPlanes,x=p.clipIntersection,m=p.clipShadows,f=n.get(p);if(!s||_===null||_.length===0||a&&!m)a?u(null):d();else{const y=a?0:i,v=y*4;let E=f.clippingState||null;c.value=E,E=u(_,h,v,g);for(let b=0;b!==v;++b)E[b]=t[b];f.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function d(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(p,h,g,_){const x=p!==null?p.length:0;let m=null;if(x!==0){if(m=c.value,_!==!0||m===null){const f=g+x*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,E=g;v!==x;++v,E+=4)l.copy(p[v]).applyMatrix4(y,o),l.normal.toArray(m,E),m[E+3]=l.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function ow(n){let e=new WeakMap;function t(l,o){return o===Go?l.mapping=sr:o===Vo&&(l.mapping=ar),l}function i(l){if(l&&l.isTexture&&l.isRenderTargetTexture===!1){const o=l.mapping;if(o===Go||o===Vo)if(e.has(l)){const c=e.get(l).texture;return t(c,l.mapping)}else{const c=l.image;if(c&&c.height>0){const d=new b_(c.height/2);return d.fromEquirectangularTexture(n,l),e.set(l,d),l.addEventListener("dispose",s),t(d.texture,l.mapping)}else return null}}return l}function s(l){const o=l.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}class Jh extends Yh{constructor(e=-1,t=1,i=1,s=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,l=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,l,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ji=4,xd=[.125,.215,.35,.446,.526,.582],gi=20,ho=new Jh,vd=new ot;let fo=null,po=0,mo=0;const pi=(1+Math.sqrt(5))/2,Yi=1/pi,_d=[new q(1,1,1),new q(-1,1,1),new q(1,1,-1),new q(-1,1,-1),new q(0,pi,Yi),new q(0,pi,-Yi),new q(Yi,0,pi),new q(-Yi,0,pi),new q(pi,Yi,0),new q(-pi,Yi,0)];class yd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fo,po,mo),e.scissorTest=!1,Ts(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sr||e.mapping===ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Fr,format:yn,colorSpace:zn,depthBuffer:!1},s=bd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bd(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lw(a)),this._blurMaterial=cw(a,e,t)}return s}_compileMaterial(e){const t=new mt(this._lodPlanes[0],e);this._renderer.compile(t,ho)}_sceneToCubeUV(e,t,i,s){const o=new $t(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,h=u.toneMapping;u.getClearColor(vd),u.toneMapping=ii,u.autoClear=!1;const g=new Wh({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1}),_=new mt(new Hn,g);let x=!1;const m=e.background;m?m.isColor&&(g.color.copy(m),e.background=null,x=!0):(g.color.copy(vd),x=!0);for(let f=0;f<6;f++){const y=f%3;y===0?(o.up.set(0,c[f],0),o.lookAt(d[f],0,0)):y===1?(o.up.set(0,0,c[f]),o.lookAt(0,d[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,d[f]));const v=this._cubeSize;Ts(s,y*v,f>2?v:0,v,v),u.setRenderTarget(s),x&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=p,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===sr||e.mapping===ar;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());const a=s?this._cubemapMaterial:this._equirectMaterial,l=new mt(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;Ts(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(l,ho)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=_d[(s-1)%_d.length];this._blur(e,s-1,s,a,l)}t.autoClear=i}_blur(e,t,i,s,a){const l=this._pingPongRenderTarget;this._halfBlur(e,l,t,i,s,"latitudinal",a),this._halfBlur(l,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,l,o){const c=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,p=new mt(this._lodPlanes[s],d),h=d.uniforms,g=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*g):2*Math.PI/(2*gi-1),x=a/_,m=isFinite(a)?1+Math.floor(u*x):gi;m>gi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gi}`);const f=[];let y=0;for(let T=0;T<gi;++T){const N=T/x,w=Math.exp(-N*N/2);f.push(w),T===0?y+=w:T<m&&(y+=2*w)}for(let T=0;T<f.length;T++)f[T]=f[T]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=l==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:v}=this;h.dTheta.value=_,h.mipInt.value=v-i;const E=this._sizeLods[s],b=3*E*(s>v-Ji?s-v+Ji:0),M=4*(this._cubeSize-E);Ts(t,b,M,3*E,2*E),c.setRenderTarget(t),c.render(p,ho)}}function lw(n){const e=[],t=[],i=[];let s=n;const a=n-Ji+1+xd.length;for(let l=0;l<a;l++){const o=Math.pow(2,s);t.push(o);let c=1/o;l>n-Ji?c=xd[l-n+Ji-1]:l===0&&(c=0),i.push(c);const d=1/(o-2),u=-d,p=1+d,h=[u,u,p,u,p,p,u,u,p,p,u,p],g=6,_=6,x=3,m=2,f=1,y=new Float32Array(x*_*g),v=new Float32Array(m*_*g),E=new Float32Array(f*_*g);for(let M=0;M<g;M++){const T=M%3*2/3-1,N=M>2?0:-1,w=[T,N,0,T+2/3,N,0,T+2/3,N+1,0,T,N,0,T+2/3,N+1,0,T,N+1,0];y.set(w,x*_*M),v.set(h,m*_*M);const A=[M,M,M,M,M,M];E.set(A,f*_*M)}const b=new ai;b.setAttribute("position",new bn(y,x)),b.setAttribute("uv",new bn(v,m)),b.setAttribute("faceIndex",new bn(E,f)),e.push(b),s>Ji&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function bd(n,e,t){const i=new Ti(n,e,t);return i.texture.mapping=va,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ts(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function cw(n,e,t){const i=new Float32Array(gi),s=new q(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function wd(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Sd(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function vl(){return`

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
	`}function dw(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,d=c===Go||c===Vo,u=c===sr||c===ar;if(d||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let p=e.get(o);return t===null&&(t=new yd(n)),p=d?t.fromEquirectangular(o,p):t.fromCubemap(o,p),e.set(o,p),p.texture}else{if(e.has(o))return e.get(o).texture;{const p=o.image;if(d&&p&&p.height>0||u&&p&&s(p)){t===null&&(t=new yd(n));const h=d?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,h),o.addEventListener("dispose",a),h.texture}else return null}}}return o}function s(o){let c=0;const d=6;for(let u=0;u<d;u++)o[u]!==void 0&&c++;return c===d}function a(o){const c=o.target;c.removeEventListener("dispose",a);const d=e.get(c);d!==void 0&&(e.delete(c),d.dispose())}function l(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:l}}function uw(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function hw(n,e,t,i){const s={},a=new WeakMap;function l(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const x=h.morphAttributes[_];for(let m=0,f=x.length;m<f;m++)e.remove(x[m])}h.removeEventListener("dispose",l),delete s[h.id];const g=a.get(h);g&&(e.remove(g),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(p,h){return s[h.id]===!0||(h.addEventListener("dispose",l),s[h.id]=!0,t.memory.geometries++),h}function c(p){const h=p.attributes;for(const _ in h)e.update(h[_],n.ARRAY_BUFFER);const g=p.morphAttributes;for(const _ in g){const x=g[_];for(let m=0,f=x.length;m<f;m++)e.update(x[m],n.ARRAY_BUFFER)}}function d(p){const h=[],g=p.index,_=p.attributes.position;let x=0;if(g!==null){const y=g.array;x=g.version;for(let v=0,E=y.length;v<E;v+=3){const b=y[v+0],M=y[v+1],T=y[v+2];h.push(b,M,M,T,T,b)}}else if(_!==void 0){const y=_.array;x=_.version;for(let v=0,E=y.length/3-1;v<E;v+=3){const b=v+0,M=v+1,T=v+2;h.push(b,M,M,T,T,b)}}else return;const m=new(Bh(h)?qh:Xh)(h,1);m.version=x;const f=a.get(p);f&&e.remove(f),a.set(p,m)}function u(p){const h=a.get(p);if(h){const g=p.index;g!==null&&h.version<g.version&&d(p)}else d(p);return a.get(p)}return{get:o,update:c,getWireframeAttribute:u}}function fw(n,e,t,i){const s=i.isWebGL2;let a;function l(h){a=h}let o,c;function d(h){o=h.type,c=h.bytesPerElement}function u(h,g){n.drawElements(a,g,o,h*c),t.update(g,a,1)}function p(h,g,_){if(_===0)return;let x,m;if(s)x=n,m="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[m](a,g,o,h*c,_),t.update(g,a,_)}this.setMode=l,this.setIndex=d,this.render=u,this.renderInstances=p}function pw(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,l,o){switch(t.calls++,l){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function mw(n,e){return n[0]-e[0]}function gw(n,e){return Math.abs(e[1])-Math.abs(n[1])}function xw(n,e,t){const i={},s=new Float32Array(8),a=new WeakMap,l=new Lt,o=[];for(let d=0;d<8;d++)o[d]=[d,0];function c(d,u,p){const h=d.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let x=a.get(u);if(x===void 0||x.count!==_){let P=function(){F.dispose(),a.delete(u),u.removeEventListener("dispose",P)};x!==void 0&&x.texture.dispose();const y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,b=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let N=0;y===!0&&(N=1),v===!0&&(N=2),E===!0&&(N=3);let w=u.attributes.position.count*N,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const I=new Float32Array(w*A*4*_),F=new Gh(I,w,A,_);F.type=Jn,F.needsUpdate=!0;const $=N*4;for(let H=0;H<_;H++){const J=b[H],K=M[H],ae=T[H],ee=w*A*4*H;for(let ie=0;ie<J.count;ie++){const D=ie*$;y===!0&&(l.fromBufferAttribute(J,ie),I[ee+D+0]=l.x,I[ee+D+1]=l.y,I[ee+D+2]=l.z,I[ee+D+3]=0),v===!0&&(l.fromBufferAttribute(K,ie),I[ee+D+4]=l.x,I[ee+D+5]=l.y,I[ee+D+6]=l.z,I[ee+D+7]=0),E===!0&&(l.fromBufferAttribute(ae,ie),I[ee+D+8]=l.x,I[ee+D+9]=l.y,I[ee+D+10]=l.z,I[ee+D+11]=ae.itemSize===4?l.w:1)}}x={count:_,texture:F,size:new $e(w,A)},a.set(u,x),u.addEventListener("dispose",P)}let m=0;for(let y=0;y<h.length;y++)m+=h[y];const f=u.morphTargetsRelative?1:1-m;p.getUniforms().setValue(n,"morphTargetBaseInfluence",f),p.getUniforms().setValue(n,"morphTargetInfluences",h),p.getUniforms().setValue(n,"morphTargetsTexture",x.texture,t),p.getUniforms().setValue(n,"morphTargetsTextureSize",x.size)}else{const g=h===void 0?0:h.length;let _=i[u.id];if(_===void 0||_.length!==g){_=[];for(let v=0;v<g;v++)_[v]=[v,0];i[u.id]=_}for(let v=0;v<g;v++){const E=_[v];E[0]=v,E[1]=h[v]}_.sort(gw);for(let v=0;v<8;v++)v<g&&_[v][1]?(o[v][0]=_[v][0],o[v][1]=_[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(mw);const x=u.morphAttributes.position,m=u.morphAttributes.normal;let f=0;for(let v=0;v<8;v++){const E=o[v],b=E[0],M=E[1];b!==Number.MAX_SAFE_INTEGER&&M?(x&&u.getAttribute("morphTarget"+v)!==x[b]&&u.setAttribute("morphTarget"+v,x[b]),m&&u.getAttribute("morphNormal"+v)!==m[b]&&u.setAttribute("morphNormal"+v,m[b]),s[v]=M,f+=M):(x&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),s[v]=0)}const y=u.morphTargetsRelative?1:1-f;p.getUniforms().setValue(n,"morphTargetBaseInfluence",y),p.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function vw(n,e,t,i){let s=new WeakMap;function a(c){const d=i.render.frame,u=c.geometry,p=e.get(c,u);if(s.get(p)!==d&&(e.update(p),s.set(p,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==d&&(h.update(),s.set(h,d))}return p}function l(){s=new WeakMap}function o(c){const d=c.target;d.removeEventListener("dispose",o),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:l}}const Qh=new Jt,ef=new Gh,tf=new r_,nf=new Kh,Ed=[],Md=[],Td=new Float32Array(16),Ad=new Float32Array(9),Rd=new Float32Array(4);function fr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Ed[s];if(a===void 0&&(a=new Float32Array(s),Ed[s]=a),e!==0){i.toArray(a,0);for(let l=1,o=0;l!==e;++l)o+=t,n[l].toArray(a,o)}return a}function Rt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ct(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ya(n,e){let t=Md[e];t===void 0&&(t=new Int32Array(e),Md[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function _w(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function yw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2fv(this.addr,e),Ct(t,e)}}function bw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;n.uniform3fv(this.addr,e),Ct(t,e)}}function ww(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4fv(this.addr,e),Ct(t,e)}}function Sw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;Rd.set(i),n.uniformMatrix2fv(this.addr,!1,Rd),Ct(t,i)}}function Ew(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;Ad.set(i),n.uniformMatrix3fv(this.addr,!1,Ad),Ct(t,i)}}function Mw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Rt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,i))return;Td.set(i),n.uniformMatrix4fv(this.addr,!1,Td),Ct(t,i)}}function Tw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Aw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2iv(this.addr,e),Ct(t,e)}}function Rw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3iv(this.addr,e),Ct(t,e)}}function Cw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4iv(this.addr,e),Ct(t,e)}}function Nw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Pw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;n.uniform2uiv(this.addr,e),Ct(t,e)}}function Lw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;n.uniform3uiv(this.addr,e),Ct(t,e)}}function jw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;n.uniform4uiv(this.addr,e),Ct(t,e)}}function Dw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2D(e||Qh,s)}function Iw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||tf,s)}function Uw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||nf,s)}function Ow(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||ef,s)}function kw(n){switch(n){case 5126:return _w;case 35664:return yw;case 35665:return bw;case 35666:return ww;case 35674:return Sw;case 35675:return Ew;case 35676:return Mw;case 5124:case 35670:return Tw;case 35667:case 35671:return Aw;case 35668:case 35672:return Rw;case 35669:case 35673:return Cw;case 5125:return Nw;case 36294:return Pw;case 36295:return Lw;case 36296:return jw;case 35678:case 36198:case 36298:case 36306:case 35682:return Dw;case 35679:case 36299:case 36307:return Iw;case 35680:case 36300:case 36308:case 36293:return Uw;case 36289:case 36303:case 36311:case 36292:return Ow}}function Fw(n,e){n.uniform1fv(this.addr,e)}function Bw(n,e){const t=fr(e,this.size,2);n.uniform2fv(this.addr,t)}function zw(n,e){const t=fr(e,this.size,3);n.uniform3fv(this.addr,t)}function Hw(n,e){const t=fr(e,this.size,4);n.uniform4fv(this.addr,t)}function Gw(n,e){const t=fr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Vw(n,e){const t=fr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ww(n,e){const t=fr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Xw(n,e){n.uniform1iv(this.addr,e)}function qw(n,e){n.uniform2iv(this.addr,e)}function $w(n,e){n.uniform3iv(this.addr,e)}function Yw(n,e){n.uniform4iv(this.addr,e)}function Kw(n,e){n.uniform1uiv(this.addr,e)}function Zw(n,e){n.uniform2uiv(this.addr,e)}function Jw(n,e){n.uniform3uiv(this.addr,e)}function Qw(n,e){n.uniform4uiv(this.addr,e)}function eS(n,e,t){const i=this.cache,s=e.length,a=ya(t,s);Rt(i,a)||(n.uniform1iv(this.addr,a),Ct(i,a));for(let l=0;l!==s;++l)t.setTexture2D(e[l]||Qh,a[l])}function tS(n,e,t){const i=this.cache,s=e.length,a=ya(t,s);Rt(i,a)||(n.uniform1iv(this.addr,a),Ct(i,a));for(let l=0;l!==s;++l)t.setTexture3D(e[l]||tf,a[l])}function nS(n,e,t){const i=this.cache,s=e.length,a=ya(t,s);Rt(i,a)||(n.uniform1iv(this.addr,a),Ct(i,a));for(let l=0;l!==s;++l)t.setTextureCube(e[l]||nf,a[l])}function iS(n,e,t){const i=this.cache,s=e.length,a=ya(t,s);Rt(i,a)||(n.uniform1iv(this.addr,a),Ct(i,a));for(let l=0;l!==s;++l)t.setTexture2DArray(e[l]||ef,a[l])}function rS(n){switch(n){case 5126:return Fw;case 35664:return Bw;case 35665:return zw;case 35666:return Hw;case 35674:return Gw;case 35675:return Vw;case 35676:return Ww;case 5124:case 35670:return Xw;case 35667:case 35671:return qw;case 35668:case 35672:return $w;case 35669:case 35673:return Yw;case 5125:return Kw;case 36294:return Zw;case 36295:return Jw;case 36296:return Qw;case 35678:case 36198:case 36298:case 36306:case 35682:return eS;case 35679:case 36299:case 36307:return tS;case 35680:case 36300:case 36308:case 36293:return nS;case 36289:case 36303:case 36311:case 36292:return iS}}class sS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=kw(t.type)}}class aS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=rS(t.type)}}class oS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,l=s.length;a!==l;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const go=/(\w+)(\])?(\[|\.)?/g;function Cd(n,e){n.seq.push(e),n.map[e.id]=e}function lS(n,e,t){const i=n.name,s=i.length;for(go.lastIndex=0;;){const a=go.exec(i),l=go.lastIndex;let o=a[1];const c=a[2]==="]",d=a[3];if(c&&(o=o|0),d===void 0||d==="["&&l+2===s){Cd(t,d===void 0?new sS(o,n,e):new aS(o,n,e));break}else{let p=t.map[o];p===void 0&&(p=new oS(o),Cd(t,p)),t=p}}}class qs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),l=e.getUniformLocation(t,a.name);lS(a,l,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,l=t.length;a!==l;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const l=e[s];l.id in t&&i.push(l)}return i}}function Nd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const cS=37297;let dS=0;function uS(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let l=s;l<a;l++){const o=l+1;i.push(`${o===e?">":" "} ${o}: ${t[l]}`)}return i.join(`
`)}function hS(n){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(n);let i;switch(e===t?i="":e===ia&&t===na?i="LinearDisplayP3ToLinearSRGB":e===na&&t===ia&&(i="LinearSRGBToLinearDisplayP3"),n){case zn:case _a:return[i,"LinearTransferOETF"];case Dt:case pl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Pd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+uS(n.getShaderSource(e),l)}else return s}function fS(n,e){const t=hS(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function pS(n,e){let t;switch(e){case Tv:t="Linear";break;case Av:t="Reinhard";break;case Rv:t="OptimizedCineon";break;case Nh:t="ACESFilmic";break;case Cv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function mS(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pr).join(`
`)}function gS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function xS(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),l=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[l]={type:a.type,location:n.getAttribLocation(e,l),locationSize:o}}return t}function Pr(n){return n!==""}function Ld(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yo(n){return n.replace(vS,yS)}const _S=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function yS(n,e){let t=et[e];if(t===void 0){const i=_S.get(e);if(i!==void 0)t=et[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Yo(t)}const bS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dd(n){return n.replace(bS,wS)}function wS(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Id(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function SS(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ah?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Rh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function ES(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case sr:case ar:e="ENVMAP_TYPE_CUBE";break;case va:e="ENVMAP_TYPE_CUBE_UV";break}return e}function MS(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===ar&&(e="ENVMAP_MODE_REFRACTION"),e}function TS(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ch:e="ENVMAP_BLENDING_MULTIPLY";break;case Ev:e="ENVMAP_BLENDING_MIX";break;case Mv:e="ENVMAP_BLENDING_ADD";break}return e}function AS(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function RS(n,e,t,i){const s=n.getContext(),a=t.defines;let l=t.vertexShader,o=t.fragmentShader;const c=SS(t),d=ES(t),u=MS(t),p=TS(t),h=AS(t),g=t.isWebGL2?"":mS(t),_=gS(a),x=s.createProgram();let m,f,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Pr).join(`
`),m.length>0&&(m+=`
`),f=[g,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Pr).join(`
`),f.length>0&&(f+=`
`)):(m=[Id(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),f=[g,Id(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?et.tonemapping_pars_fragment:"",t.toneMapping!==ii?pS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,fS("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pr).join(`
`)),l=Yo(l),l=Ld(l,t),l=jd(l,t),o=Yo(o),o=Ld(o,t),o=jd(o,t),l=Dd(l),o=Dd(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=y+m+l,E=y+f+o,b=Nd(s,s.VERTEX_SHADER,v),M=Nd(s,s.FRAGMENT_SHADER,E);s.attachShader(x,b),s.attachShader(x,M),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function T(I){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(x).trim(),$=s.getShaderInfoLog(b).trim(),P=s.getShaderInfoLog(M).trim();let H=!0,J=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,b,M);else{const K=Pd(s,b,"vertex"),ae=Pd(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Program Info Log: `+F+`
`+K+`
`+ae)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):($===""||P==="")&&(J=!1);J&&(I.diagnostics={runnable:H,programLog:F,vertexShader:{log:$,prefix:m},fragmentShader:{log:P,prefix:f}})}s.deleteShader(b),s.deleteShader(M),N=new qs(s,x),w=xS(s,x)}let N;this.getUniforms=function(){return N===void 0&&T(this),N};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(x,cS)),A},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dS++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=M,this}let CS=0;class NS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),l=this._getShaderCacheForMaterial(e);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new PS(e),t.set(e,i)),i}}class PS{constructor(e){this.id=CS++,this.code=e,this.usedTimes=0}}function LS(n,e,t,i,s,a,l){const o=new gl,c=new NS,d=[],u=s.isWebGL2,p=s.logarithmicDepthBuffer,h=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return w===0?"uv":`uv${w}`}function m(w,A,I,F,$){const P=F.fog,H=$.geometry,J=w.isMeshStandardMaterial?F.environment:null,K=(w.isMeshStandardMaterial?t:e).get(w.envMap||J),ae=K&&K.mapping===va?K.image.height:null,ee=_[w.type];w.precision!==null&&(g=s.getMaxPrecision(w.precision),g!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",g,"instead."));const ie=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,D=ie!==void 0?ie.length:0;let L=0;H.morphAttributes.position!==void 0&&(L=1),H.morphAttributes.normal!==void 0&&(L=2),H.morphAttributes.color!==void 0&&(L=3);let V,B,Q,O;if(ee){const Et=En[ee];V=Et.vertexShader,B=Et.fragmentShader}else V=w.vertexShader,B=w.fragmentShader,c.update(w),Q=c.getVertexShaderID(w),O=c.getFragmentShaderID(w);const _e=n.getRenderTarget(),Y=$.isInstancedMesh===!0,Se=!!w.map,Me=!!w.matcap,oe=!!K,U=!!w.aoMap,Ze=!!w.lightMap,ye=!!w.bumpMap,me=!!w.normalMap,Ae=!!w.displacementMap,Ce=!!w.emissiveMap,Ne=!!w.metalnessMap,Fe=!!w.roughnessMap,ke=w.anisotropy>0,ht=w.clearcoat>0,xt=w.iridescence>0,C=w.sheen>0,S=w.transmission>0,W=ke&&!!w.anisotropyMap,he=ht&&!!w.clearcoatMap,ce=ht&&!!w.clearcoatNormalMap,de=ht&&!!w.clearcoatRoughnessMap,Le=xt&&!!w.iridescenceMap,ge=xt&&!!w.iridescenceThicknessMap,we=C&&!!w.sheenColorMap,j=C&&!!w.sheenRoughnessMap,pe=!!w.specularMap,le=!!w.specularColorMap,Be=!!w.specularIntensityMap,je=S&&!!w.transmissionMap,Ue=S&&!!w.thicknessMap,Pe=!!w.gradientMap,Te=!!w.alphaMap,it=w.alphaTest>0,k=!!w.alphaHash,xe=!!w.extensions,ue=!!H.attributes.uv1,se=!!H.attributes.uv2,fe=!!H.attributes.uv3;let Ie=ii;return w.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(Ie=n.toneMapping),{isWebGL2:u,shaderID:ee,shaderType:w.type,shaderName:w.name,vertexShader:V,fragmentShader:B,defines:w.defines,customVertexShaderID:Q,customFragmentShaderID:O,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:g,instancing:Y,instancingColor:Y&&$.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:_e===null?n.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:zn,map:Se,matcap:Me,envMap:oe,envMapMode:oe&&K.mapping,envMapCubeUVHeight:ae,aoMap:U,lightMap:Ze,bumpMap:ye,normalMap:me,displacementMap:h&&Ae,emissiveMap:Ce,normalMapObjectSpace:me&&w.normalMapType===Hv,normalMapTangentSpace:me&&w.normalMapType===Fh,metalnessMap:Ne,roughnessMap:Fe,anisotropy:ke,anisotropyMap:W,clearcoat:ht,clearcoatMap:he,clearcoatNormalMap:ce,clearcoatRoughnessMap:de,iridescence:xt,iridescenceMap:Le,iridescenceThicknessMap:ge,sheen:C,sheenColorMap:we,sheenRoughnessMap:j,specularMap:pe,specularColorMap:le,specularIntensityMap:Be,transmission:S,transmissionMap:je,thicknessMap:Ue,gradientMap:Pe,opaque:w.transparent===!1&&w.blending===er,alphaMap:Te,alphaTest:it,alphaHash:k,combine:w.combine,mapUv:Se&&x(w.map.channel),aoMapUv:U&&x(w.aoMap.channel),lightMapUv:Ze&&x(w.lightMap.channel),bumpMapUv:ye&&x(w.bumpMap.channel),normalMapUv:me&&x(w.normalMap.channel),displacementMapUv:Ae&&x(w.displacementMap.channel),emissiveMapUv:Ce&&x(w.emissiveMap.channel),metalnessMapUv:Ne&&x(w.metalnessMap.channel),roughnessMapUv:Fe&&x(w.roughnessMap.channel),anisotropyMapUv:W&&x(w.anisotropyMap.channel),clearcoatMapUv:he&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:ce&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:we&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:j&&x(w.sheenRoughnessMap.channel),specularMapUv:pe&&x(w.specularMap.channel),specularColorMapUv:le&&x(w.specularColorMap.channel),specularIntensityMapUv:Be&&x(w.specularIntensityMap.channel),transmissionMapUv:je&&x(w.transmissionMap.channel),thicknessMapUv:Ue&&x(w.thicknessMap.channel),alphaMapUv:Te&&x(w.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(me||ke),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,vertexUv1s:ue,vertexUv2s:se,vertexUv3s:fe,pointsUvs:$.isPoints===!0&&!!H.attributes.uv&&(Se||Te),fog:!!P,useFog:w.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:$.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:L,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ie,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Se&&w.map.isVideoTexture===!0&&dt.getTransfer(w.map.colorSpace)===pt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Mn,flipSided:w.side===Zt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:xe&&w.extensions.derivatives===!0,extensionFragDepth:xe&&w.extensions.fragDepth===!0,extensionDrawBuffers:xe&&w.extensions.drawBuffers===!0,extensionShaderTextureLOD:xe&&w.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()}}function f(w){const A=[];if(w.shaderID?A.push(w.shaderID):(A.push(w.customVertexShaderID),A.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)A.push(I),A.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(y(A,w),v(A,w),A.push(n.outputColorSpace)),A.push(w.customProgramCacheKey),A.join()}function y(w,A){w.push(A.precision),w.push(A.outputColorSpace),w.push(A.envMapMode),w.push(A.envMapCubeUVHeight),w.push(A.mapUv),w.push(A.alphaMapUv),w.push(A.lightMapUv),w.push(A.aoMapUv),w.push(A.bumpMapUv),w.push(A.normalMapUv),w.push(A.displacementMapUv),w.push(A.emissiveMapUv),w.push(A.metalnessMapUv),w.push(A.roughnessMapUv),w.push(A.anisotropyMapUv),w.push(A.clearcoatMapUv),w.push(A.clearcoatNormalMapUv),w.push(A.clearcoatRoughnessMapUv),w.push(A.iridescenceMapUv),w.push(A.iridescenceThicknessMapUv),w.push(A.sheenColorMapUv),w.push(A.sheenRoughnessMapUv),w.push(A.specularMapUv),w.push(A.specularColorMapUv),w.push(A.specularIntensityMapUv),w.push(A.transmissionMapUv),w.push(A.thicknessMapUv),w.push(A.combine),w.push(A.fogExp2),w.push(A.sizeAttenuation),w.push(A.morphTargetsCount),w.push(A.morphAttributeCount),w.push(A.numDirLights),w.push(A.numPointLights),w.push(A.numSpotLights),w.push(A.numSpotLightMaps),w.push(A.numHemiLights),w.push(A.numRectAreaLights),w.push(A.numDirLightShadows),w.push(A.numPointLightShadows),w.push(A.numSpotLightShadows),w.push(A.numSpotLightShadowsWithMaps),w.push(A.numLightProbes),w.push(A.shadowMapType),w.push(A.toneMapping),w.push(A.numClippingPlanes),w.push(A.numClipIntersection),w.push(A.depthPacking)}function v(w,A){o.disableAll(),A.isWebGL2&&o.enable(0),A.supportsVertexTextures&&o.enable(1),A.instancing&&o.enable(2),A.instancingColor&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),w.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.useLegacyLights&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),w.push(o.mask)}function E(w){const A=_[w.type];let I;if(A){const F=En[A];I=x_.clone(F.uniforms)}else I=w.uniforms;return I}function b(w,A){let I;for(let F=0,$=d.length;F<$;F++){const P=d[F];if(P.cacheKey===A){I=P,++I.usedTimes;break}}return I===void 0&&(I=new RS(n,A,w,a),d.push(I)),I}function M(w){if(--w.usedTimes===0){const A=d.indexOf(w);d[A]=d[d.length-1],d.pop(),w.destroy()}}function T(w){c.remove(w)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:E,acquireProgram:b,releaseProgram:M,releaseShaderCache:T,programs:d,dispose:N}}function jS(){let n=new WeakMap;function e(a){let l=n.get(a);return l===void 0&&(l={},n.set(a,l)),l}function t(a){n.delete(a)}function i(a,l,o){n.get(a)[l]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function DS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ud(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Od(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function l(p,h,g,_,x,m){let f=n[e];return f===void 0?(f={id:p.id,object:p,geometry:h,material:g,groupOrder:_,renderOrder:p.renderOrder,z:x,group:m},n[e]=f):(f.id=p.id,f.object=p,f.geometry=h,f.material=g,f.groupOrder=_,f.renderOrder=p.renderOrder,f.z=x,f.group=m),e++,f}function o(p,h,g,_,x,m){const f=l(p,h,g,_,x,m);g.transmission>0?i.push(f):g.transparent===!0?s.push(f):t.push(f)}function c(p,h,g,_,x,m){const f=l(p,h,g,_,x,m);g.transmission>0?i.unshift(f):g.transparent===!0?s.unshift(f):t.unshift(f)}function d(p,h){t.length>1&&t.sort(p||DS),i.length>1&&i.sort(h||Ud),s.length>1&&s.sort(h||Ud)}function u(){for(let p=e,h=n.length;p<h;p++){const g=n[p];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:c,finish:u,sort:d}}function IS(){let n=new WeakMap;function e(i,s){const a=n.get(i);let l;return a===void 0?(l=new Od,n.set(i,[l])):s>=a.length?(l=new Od,a.push(l)):l=a[s],l}function t(){n=new WeakMap}return{get:e,dispose:t}}function US(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new ot};break;case"SpotLight":t={position:new q,direction:new q,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new q,halfWidth:new q,halfHeight:new q};break}return n[e.id]=t,t}}}function OS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let kS=0;function FS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function BS(n,e){const t=new US,i=OS(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new q);const a=new q,l=new bt,o=new bt;function c(u,p){let h=0,g=0,_=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let x=0,m=0,f=0,y=0,v=0,E=0,b=0,M=0,T=0,N=0,w=0;u.sort(FS);const A=p===!0?Math.PI:1;for(let F=0,$=u.length;F<$;F++){const P=u[F],H=P.color,J=P.intensity,K=P.distance,ae=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=H.r*J*A,g+=H.g*J*A,_+=H.b*J*A;else if(P.isLightProbe){for(let ee=0;ee<9;ee++)s.probe[ee].addScaledVector(P.sh.coefficients[ee],J);w++}else if(P.isDirectionalLight){const ee=t.get(P);if(ee.color.copy(P.color).multiplyScalar(P.intensity*A),P.castShadow){const ie=P.shadow,D=i.get(P);D.shadowBias=ie.bias,D.shadowNormalBias=ie.normalBias,D.shadowRadius=ie.radius,D.shadowMapSize=ie.mapSize,s.directionalShadow[x]=D,s.directionalShadowMap[x]=ae,s.directionalShadowMatrix[x]=P.shadow.matrix,E++}s.directional[x]=ee,x++}else if(P.isSpotLight){const ee=t.get(P);ee.position.setFromMatrixPosition(P.matrixWorld),ee.color.copy(H).multiplyScalar(J*A),ee.distance=K,ee.coneCos=Math.cos(P.angle),ee.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),ee.decay=P.decay,s.spot[f]=ee;const ie=P.shadow;if(P.map&&(s.spotLightMap[T]=P.map,T++,ie.updateMatrices(P),P.castShadow&&N++),s.spotLightMatrix[f]=ie.matrix,P.castShadow){const D=i.get(P);D.shadowBias=ie.bias,D.shadowNormalBias=ie.normalBias,D.shadowRadius=ie.radius,D.shadowMapSize=ie.mapSize,s.spotShadow[f]=D,s.spotShadowMap[f]=ae,M++}f++}else if(P.isRectAreaLight){const ee=t.get(P);ee.color.copy(H).multiplyScalar(J),ee.halfWidth.set(P.width*.5,0,0),ee.halfHeight.set(0,P.height*.5,0),s.rectArea[y]=ee,y++}else if(P.isPointLight){const ee=t.get(P);if(ee.color.copy(P.color).multiplyScalar(P.intensity*A),ee.distance=P.distance,ee.decay=P.decay,P.castShadow){const ie=P.shadow,D=i.get(P);D.shadowBias=ie.bias,D.shadowNormalBias=ie.normalBias,D.shadowRadius=ie.radius,D.shadowMapSize=ie.mapSize,D.shadowCameraNear=ie.camera.near,D.shadowCameraFar=ie.camera.far,s.pointShadow[m]=D,s.pointShadowMap[m]=ae,s.pointShadowMatrix[m]=P.shadow.matrix,b++}s.point[m]=ee,m++}else if(P.isHemisphereLight){const ee=t.get(P);ee.skyColor.copy(P.color).multiplyScalar(J*A),ee.groundColor.copy(P.groundColor).multiplyScalar(J*A),s.hemi[v]=ee,v++}}y>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ve.LTC_FLOAT_1,s.rectAreaLTC2=ve.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ve.LTC_HALF_1,s.rectAreaLTC2=ve.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=h,s.ambient[1]=g,s.ambient[2]=_;const I=s.hash;(I.directionalLength!==x||I.pointLength!==m||I.spotLength!==f||I.rectAreaLength!==y||I.hemiLength!==v||I.numDirectionalShadows!==E||I.numPointShadows!==b||I.numSpotShadows!==M||I.numSpotMaps!==T||I.numLightProbes!==w)&&(s.directional.length=x,s.spot.length=f,s.rectArea.length=y,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=E,s.directionalShadowMap.length=E,s.pointShadow.length=b,s.pointShadowMap.length=b,s.spotShadow.length=M,s.spotShadowMap.length=M,s.directionalShadowMatrix.length=E,s.pointShadowMatrix.length=b,s.spotLightMatrix.length=M+T-N,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=N,s.numLightProbes=w,I.directionalLength=x,I.pointLength=m,I.spotLength=f,I.rectAreaLength=y,I.hemiLength=v,I.numDirectionalShadows=E,I.numPointShadows=b,I.numSpotShadows=M,I.numSpotMaps=T,I.numLightProbes=w,s.version=kS++)}function d(u,p){let h=0,g=0,_=0,x=0,m=0;const f=p.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){const E=u[y];if(E.isDirectionalLight){const b=s.directional[h];b.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(f),h++}else if(E.isSpotLight){const b=s.spot[_];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(E.matrixWorld),a.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(f),_++}else if(E.isRectAreaLight){const b=s.rectArea[x];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(f),o.identity(),l.copy(E.matrixWorld),l.premultiply(f),o.extractRotation(l),b.halfWidth.set(E.width*.5,0,0),b.halfHeight.set(0,E.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),x++}else if(E.isPointLight){const b=s.point[g];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(f),g++}else if(E.isHemisphereLight){const b=s.hemi[m];b.direction.setFromMatrixPosition(E.matrixWorld),b.direction.transformDirection(f),m++}}}return{setup:c,setupView:d,state:s}}function kd(n,e){const t=new BS(n,e),i=[],s=[];function a(){i.length=0,s.length=0}function l(p){i.push(p)}function o(p){s.push(p)}function c(p){t.setup(i,p)}function d(p){t.setupView(i,p)}return{init:a,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:c,setupLightsView:d,pushLight:l,pushShadow:o}}function zS(n,e){let t=new WeakMap;function i(a,l=0){const o=t.get(a);let c;return o===void 0?(c=new kd(n,e),t.set(a,[c])):l>=o.length?(c=new kd(n,e),o.push(c)):c=o[l],c}function s(){t=new WeakMap}return{get:i,dispose:s}}class HS extends $r{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class GS extends $r{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const VS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,WS=`uniform sampler2D shadow_pass;
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
}`;function XS(n,e,t){let i=new xl;const s=new $e,a=new $e,l=new Lt,o=new HS({depthPacking:zv}),c=new GS,d={},u=t.maxTextureSize,p={[si]:Zt,[Zt]:si,[Mn]:Mn},h=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:VS,fragmentShader:WS}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const _=new ai;_.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new mt(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ah;let f=this.type;this.render=function(b,M,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const N=n.getRenderTarget(),w=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),I=n.state;I.setBlending(ni),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=f!==On&&this.type===On,$=f===On&&this.type!==On;for(let P=0,H=b.length;P<H;P++){const J=b[P],K=J.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const ae=K.getFrameExtents();if(s.multiply(ae),a.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/ae.x),s.x=a.x*ae.x,K.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/ae.y),s.y=a.y*ae.y,K.mapSize.y=a.y)),K.map===null||F===!0||$===!0){const ie=this.type!==On?{minFilter:Ht,magFilter:Ht}:{};K.map!==null&&K.map.dispose(),K.map=new Ti(s.x,s.y,ie),K.map.texture.name=J.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const ee=K.getViewportCount();for(let ie=0;ie<ee;ie++){const D=K.getViewport(ie);l.set(a.x*D.x,a.y*D.y,a.x*D.z,a.y*D.w),I.viewport(l),K.updateMatrices(J,ie),i=K.getFrustum(),E(M,T,K.camera,J,this.type)}K.isPointLightShadow!==!0&&this.type===On&&y(K,T),K.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(N,w,A)};function y(b,M){const T=e.update(x);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,g.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ti(s.x,s.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(M,null,T,h,x,null),g.uniforms.shadow_pass.value=b.mapPass.texture,g.uniforms.resolution.value=b.mapSize,g.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(M,null,T,g,x,null)}function v(b,M,T,N){let w=null;const A=T.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)w=A;else if(w=T.isPointLight===!0?c:o,n.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const I=w.uuid,F=M.uuid;let $=d[I];$===void 0&&($={},d[I]=$);let P=$[F];P===void 0&&(P=w.clone(),$[F]=P),w=P}if(w.visible=M.visible,w.wireframe=M.wireframe,N===On?w.side=M.shadowSide!==null?M.shadowSide:M.side:w.side=M.shadowSide!==null?M.shadowSide:p[M.side],w.alphaMap=M.alphaMap,w.alphaTest=M.alphaTest,w.map=M.map,w.clipShadows=M.clipShadows,w.clippingPlanes=M.clippingPlanes,w.clipIntersection=M.clipIntersection,w.displacementMap=M.displacementMap,w.displacementScale=M.displacementScale,w.displacementBias=M.displacementBias,w.wireframeLinewidth=M.wireframeLinewidth,w.linewidth=M.linewidth,T.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const I=n.properties.get(w);I.light=T}return w}function E(b,M,T,N,w){if(b.visible===!1)return;if(b.layers.test(M.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&w===On)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,b.matrixWorld);const F=e.update(b),$=b.material;if(Array.isArray($)){const P=F.groups;for(let H=0,J=P.length;H<J;H++){const K=P[H],ae=$[K.materialIndex];if(ae&&ae.visible){const ee=v(b,ae,N,w);n.renderBufferDirect(T,null,F,ee,b,K)}}}else if($.visible){const P=v(b,$,N,w);n.renderBufferDirect(T,null,F,P,b,null)}}const I=b.children;for(let F=0,$=I.length;F<$;F++)E(I[F],M,T,N,w)}}function qS(n,e,t){const i=t.isWebGL2;function s(){let k=!1;const xe=new Lt;let ue=null;const se=new Lt(0,0,0,0);return{setMask:function(fe){ue!==fe&&!k&&(n.colorMask(fe,fe,fe,fe),ue=fe)},setLocked:function(fe){k=fe},setClear:function(fe,Ie,rt,Et,sn){sn===!0&&(fe*=Et,Ie*=Et,rt*=Et),xe.set(fe,Ie,rt,Et),se.equals(xe)===!1&&(n.clearColor(fe,Ie,rt,Et),se.copy(xe))},reset:function(){k=!1,ue=null,se.set(-1,0,0,0)}}}function a(){let k=!1,xe=null,ue=null,se=null;return{setTest:function(fe){fe?Se(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(fe){xe!==fe&&!k&&(n.depthMask(fe),xe=fe)},setFunc:function(fe){if(ue!==fe){switch(fe){case xv:n.depthFunc(n.NEVER);break;case vv:n.depthFunc(n.ALWAYS);break;case _v:n.depthFunc(n.LESS);break;case ea:n.depthFunc(n.LEQUAL);break;case yv:n.depthFunc(n.EQUAL);break;case bv:n.depthFunc(n.GEQUAL);break;case wv:n.depthFunc(n.GREATER);break;case Sv:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=fe}},setLocked:function(fe){k=fe},setClear:function(fe){se!==fe&&(n.clearDepth(fe),se=fe)},reset:function(){k=!1,xe=null,ue=null,se=null}}}function l(){let k=!1,xe=null,ue=null,se=null,fe=null,Ie=null,rt=null,Et=null,sn=null;return{setTest:function(ut){k||(ut?Se(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(ut){xe!==ut&&!k&&(n.stencilMask(ut),xe=ut)},setFunc:function(ut,Ft,Sn){(ue!==ut||se!==Ft||fe!==Sn)&&(n.stencilFunc(ut,Ft,Sn),ue=ut,se=Ft,fe=Sn)},setOp:function(ut,Ft,Sn){(Ie!==ut||rt!==Ft||Et!==Sn)&&(n.stencilOp(ut,Ft,Sn),Ie=ut,rt=Ft,Et=Sn)},setLocked:function(ut){k=ut},setClear:function(ut){sn!==ut&&(n.clearStencil(ut),sn=ut)},reset:function(){k=!1,xe=null,ue=null,se=null,fe=null,Ie=null,rt=null,Et=null,sn=null}}}const o=new s,c=new a,d=new l,u=new WeakMap,p=new WeakMap;let h={},g={},_=new WeakMap,x=[],m=null,f=!1,y=null,v=null,E=null,b=null,M=null,T=null,N=null,w=new ot(0,0,0),A=0,I=!1,F=null,$=null,P=null,H=null,J=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ae=!1,ee=0;const ie=n.getParameter(n.VERSION);ie.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(ie)[1]),ae=ee>=1):ie.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),ae=ee>=2);let D=null,L={};const V=n.getParameter(n.SCISSOR_BOX),B=n.getParameter(n.VIEWPORT),Q=new Lt().fromArray(V),O=new Lt().fromArray(B);function _e(k,xe,ue,se){const fe=new Uint8Array(4),Ie=n.createTexture();n.bindTexture(k,Ie),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let rt=0;rt<ue;rt++)i&&(k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY)?n.texImage3D(xe,0,n.RGBA,1,1,se,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(xe+rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return Ie}const Y={};Y[n.TEXTURE_2D]=_e(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=_e(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Y[n.TEXTURE_2D_ARRAY]=_e(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=_e(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),d.setClear(0),Se(n.DEPTH_TEST),c.setFunc(ea),Ne(!1),Fe(_c),Se(n.CULL_FACE),Ae(ni);function Se(k){h[k]!==!0&&(n.enable(k),h[k]=!0)}function Me(k){h[k]!==!1&&(n.disable(k),h[k]=!1)}function oe(k,xe){return g[k]!==xe?(n.bindFramebuffer(k,xe),g[k]=xe,i&&(k===n.DRAW_FRAMEBUFFER&&(g[n.FRAMEBUFFER]=xe),k===n.FRAMEBUFFER&&(g[n.DRAW_FRAMEBUFFER]=xe)),!0):!1}function U(k,xe){let ue=x,se=!1;if(k)if(ue=_.get(xe),ue===void 0&&(ue=[],_.set(xe,ue)),k.isWebGLMultipleRenderTargets){const fe=k.texture;if(ue.length!==fe.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let Ie=0,rt=fe.length;Ie<rt;Ie++)ue[Ie]=n.COLOR_ATTACHMENT0+Ie;ue.length=fe.length,se=!0}}else ue[0]!==n.COLOR_ATTACHMENT0&&(ue[0]=n.COLOR_ATTACHMENT0,se=!0);else ue[0]!==n.BACK&&(ue[0]=n.BACK,se=!0);se&&(t.isWebGL2?n.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function Ze(k){return m!==k?(n.useProgram(k),m=k,!0):!1}const ye={[mi]:n.FUNC_ADD,[nv]:n.FUNC_SUBTRACT,[iv]:n.FUNC_REVERSE_SUBTRACT};if(i)ye[Sc]=n.MIN,ye[Ec]=n.MAX;else{const k=e.get("EXT_blend_minmax");k!==null&&(ye[Sc]=k.MIN_EXT,ye[Ec]=k.MAX_EXT)}const me={[rv]:n.ZERO,[sv]:n.ONE,[av]:n.SRC_COLOR,[zo]:n.SRC_ALPHA,[hv]:n.SRC_ALPHA_SATURATE,[dv]:n.DST_COLOR,[lv]:n.DST_ALPHA,[ov]:n.ONE_MINUS_SRC_COLOR,[Ho]:n.ONE_MINUS_SRC_ALPHA,[uv]:n.ONE_MINUS_DST_COLOR,[cv]:n.ONE_MINUS_DST_ALPHA,[fv]:n.CONSTANT_COLOR,[pv]:n.ONE_MINUS_CONSTANT_COLOR,[mv]:n.CONSTANT_ALPHA,[gv]:n.ONE_MINUS_CONSTANT_ALPHA};function Ae(k,xe,ue,se,fe,Ie,rt,Et,sn,ut){if(k===ni){f===!0&&(Me(n.BLEND),f=!1);return}if(f===!1&&(Se(n.BLEND),f=!0),k!==tv){if(k!==y||ut!==I){if((v!==mi||M!==mi)&&(n.blendEquation(n.FUNC_ADD),v=mi,M=mi),ut)switch(k){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yc:n.blendFunc(n.ONE,n.ONE);break;case bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case wc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}E=null,b=null,T=null,N=null,w.set(0,0,0),A=0,y=k,I=ut}return}fe=fe||xe,Ie=Ie||ue,rt=rt||se,(xe!==v||fe!==M)&&(n.blendEquationSeparate(ye[xe],ye[fe]),v=xe,M=fe),(ue!==E||se!==b||Ie!==T||rt!==N)&&(n.blendFuncSeparate(me[ue],me[se],me[Ie],me[rt]),E=ue,b=se,T=Ie,N=rt),(Et.equals(w)===!1||sn!==A)&&(n.blendColor(Et.r,Et.g,Et.b,sn),w.copy(Et),A=sn),y=k,I=!1}function Ce(k,xe){k.side===Mn?Me(n.CULL_FACE):Se(n.CULL_FACE);let ue=k.side===Zt;xe&&(ue=!ue),Ne(ue),k.blending===er&&k.transparent===!1?Ae(ni):Ae(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),c.setFunc(k.depthFunc),c.setTest(k.depthTest),c.setMask(k.depthWrite),o.setMask(k.colorWrite);const se=k.stencilWrite;d.setTest(se),se&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ht(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Se(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(k){F!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),F=k)}function Fe(k){k!==Q0?(Se(n.CULL_FACE),k!==$&&(k===_c?n.cullFace(n.BACK):k===ev?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),$=k}function ke(k){k!==P&&(ae&&n.lineWidth(k),P=k)}function ht(k,xe,ue){k?(Se(n.POLYGON_OFFSET_FILL),(H!==xe||J!==ue)&&(n.polygonOffset(xe,ue),H=xe,J=ue)):Me(n.POLYGON_OFFSET_FILL)}function xt(k){k?Se(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function C(k){k===void 0&&(k=n.TEXTURE0+K-1),D!==k&&(n.activeTexture(k),D=k)}function S(k,xe,ue){ue===void 0&&(D===null?ue=n.TEXTURE0+K-1:ue=D);let se=L[ue];se===void 0&&(se={type:void 0,texture:void 0},L[ue]=se),(se.type!==k||se.texture!==xe)&&(D!==ue&&(n.activeTexture(ue),D=ue),n.bindTexture(k,xe||Y[k]),se.type=k,se.texture=xe)}function W(){const k=L[D];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function he(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ce(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function de(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function we(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function j(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pe(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Be(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function je(k){Q.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),Q.copy(k))}function Ue(k){O.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),O.copy(k))}function Pe(k,xe){let ue=p.get(xe);ue===void 0&&(ue=new WeakMap,p.set(xe,ue));let se=ue.get(k);se===void 0&&(se=n.getUniformBlockIndex(xe,k.name),ue.set(k,se))}function Te(k,xe){const se=p.get(xe).get(k);u.get(xe)!==se&&(n.uniformBlockBinding(xe,se,k.__bindingPointIndex),u.set(xe,se))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},D=null,L={},g={},_=new WeakMap,x=[],m=null,f=!1,y=null,v=null,E=null,b=null,M=null,T=null,N=null,w=new ot(0,0,0),A=0,I=!1,F=null,$=null,P=null,H=null,J=null,Q.set(0,0,n.canvas.width,n.canvas.height),O.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),d.reset()}return{buffers:{color:o,depth:c,stencil:d},enable:Se,disable:Me,bindFramebuffer:oe,drawBuffers:U,useProgram:Ze,setBlending:Ae,setMaterial:Ce,setFlipSided:Ne,setCullFace:Fe,setLineWidth:ke,setPolygonOffset:ht,setScissorTest:xt,activeTexture:C,bindTexture:S,unbindTexture:W,compressedTexImage2D:he,compressedTexImage3D:ce,texImage2D:le,texImage3D:Be,updateUBOMapping:Pe,uniformBlockBinding:Te,texStorage2D:j,texStorage3D:pe,texSubImage2D:de,texSubImage3D:Le,compressedTexSubImage2D:ge,compressedTexSubImage3D:we,scissor:je,viewport:Ue,reset:it}}function $S(n,e,t,i,s,a,l){const o=s.isWebGL2,c=s.maxTextures,d=s.maxCubemapSize,u=s.maxTextureSize,p=s.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,g=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let x;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,S){return f?new OffscreenCanvas(C,S):aa("canvas")}function v(C,S,W,he){let ce=1;if((C.width>he||C.height>he)&&(ce=he/Math.max(C.width,C.height)),ce<1||S===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const de=S?$o:Math.floor,Le=de(ce*C.width),ge=de(ce*C.height);x===void 0&&(x=y(Le,ge));const we=W?y(Le,ge):x;return we.width=Le,we.height=ge,we.getContext("2d").drawImage(C,0,0,Le,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+Le+"x"+ge+")."),we}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function E(C){return ed(C.width)&&ed(C.height)}function b(C){return o?!1:C.wrapS!==_n||C.wrapT!==_n||C.minFilter!==Ht&&C.minFilter!==cn}function M(C,S){return C.generateMipmaps&&S&&C.minFilter!==Ht&&C.minFilter!==cn}function T(C){n.generateMipmap(C)}function N(C,S,W,he,ce=!1){if(o===!1)return S;if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let de=S;if(S===n.RED&&(W===n.FLOAT&&(de=n.R32F),W===n.HALF_FLOAT&&(de=n.R16F),W===n.UNSIGNED_BYTE&&(de=n.R8)),S===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(de=n.R8UI),W===n.UNSIGNED_SHORT&&(de=n.R16UI),W===n.UNSIGNED_INT&&(de=n.R32UI),W===n.BYTE&&(de=n.R8I),W===n.SHORT&&(de=n.R16I),W===n.INT&&(de=n.R32I)),S===n.RG&&(W===n.FLOAT&&(de=n.RG32F),W===n.HALF_FLOAT&&(de=n.RG16F),W===n.UNSIGNED_BYTE&&(de=n.RG8)),S===n.RGBA){const Le=ce?ta:dt.getTransfer(he);W===n.FLOAT&&(de=n.RGBA32F),W===n.HALF_FLOAT&&(de=n.RGBA16F),W===n.UNSIGNED_BYTE&&(de=Le===pt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(de=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(de=n.RGB5_A1)}return(de===n.R16F||de===n.R32F||de===n.RG16F||de===n.RG32F||de===n.RGBA16F||de===n.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function w(C,S,W){return M(C,W)===!0||C.isFramebufferTexture&&C.minFilter!==Ht&&C.minFilter!==cn?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function A(C){return C===Ht||C===Mc||C===za?n.NEAREST:n.LINEAR}function I(C){const S=C.target;S.removeEventListener("dispose",I),$(S),S.isVideoTexture&&_.delete(S)}function F(C){const S=C.target;S.removeEventListener("dispose",F),H(S)}function $(C){const S=i.get(C);if(S.__webglInit===void 0)return;const W=C.source,he=m.get(W);if(he){const ce=he[S.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&P(C),Object.keys(he).length===0&&m.delete(W)}i.remove(C)}function P(C){const S=i.get(C);n.deleteTexture(S.__webglTexture);const W=C.source,he=m.get(W);delete he[S.__cacheKey],l.memory.textures--}function H(C){const S=C.texture,W=i.get(C),he=i.get(S);if(he.__webglTexture!==void 0&&(n.deleteTexture(he.__webglTexture),l.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(W.__webglFramebuffer[ce]))for(let de=0;de<W.__webglFramebuffer[ce].length;de++)n.deleteFramebuffer(W.__webglFramebuffer[ce][de]);else n.deleteFramebuffer(W.__webglFramebuffer[ce]);W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer[ce])}else{if(Array.isArray(W.__webglFramebuffer))for(let ce=0;ce<W.__webglFramebuffer.length;ce++)n.deleteFramebuffer(W.__webglFramebuffer[ce]);else n.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&n.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ce=0;ce<W.__webglColorRenderbuffer.length;ce++)W.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(W.__webglColorRenderbuffer[ce]);W.__webglDepthRenderbuffer&&n.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let ce=0,de=S.length;ce<de;ce++){const Le=i.get(S[ce]);Le.__webglTexture&&(n.deleteTexture(Le.__webglTexture),l.memory.textures--),i.remove(S[ce])}i.remove(S),i.remove(C)}let J=0;function K(){J=0}function ae(){const C=J;return C>=c&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+c),J+=1,C}function ee(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function ie(C,S){const W=i.get(C);if(C.isVideoTexture&&ht(C),C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){const he=C.image;if(he===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(W,C,S);return}}t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+S)}function D(C,S){const W=i.get(C);if(C.version>0&&W.__version!==C.version){Se(W,C,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+S)}function L(C,S){const W=i.get(C);if(C.version>0&&W.__version!==C.version){Se(W,C,S);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+S)}function V(C,S){const W=i.get(C);if(C.version>0&&W.__version!==C.version){Me(W,C,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+S)}const B={[Wo]:n.REPEAT,[_n]:n.CLAMP_TO_EDGE,[Xo]:n.MIRRORED_REPEAT},Q={[Ht]:n.NEAREST,[Mc]:n.NEAREST_MIPMAP_NEAREST,[za]:n.NEAREST_MIPMAP_LINEAR,[cn]:n.LINEAR,[Nv]:n.LINEAR_MIPMAP_NEAREST,[kr]:n.LINEAR_MIPMAP_LINEAR},O={[Gv]:n.NEVER,[Kv]:n.ALWAYS,[Vv]:n.LESS,[Xv]:n.LEQUAL,[Wv]:n.EQUAL,[Yv]:n.GEQUAL,[qv]:n.GREATER,[$v]:n.NOTEQUAL};function _e(C,S,W){if(W?(n.texParameteri(C,n.TEXTURE_WRAP_S,B[S.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,B[S.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,B[S.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Q[S.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Q[S.minFilter])):(n.texParameteri(C,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(C,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(S.wrapS!==_n||S.wrapT!==_n)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(C,n.TEXTURE_MAG_FILTER,A(S.magFilter)),n.texParameteri(C,n.TEXTURE_MIN_FILTER,A(S.minFilter)),S.minFilter!==Ht&&S.minFilter!==cn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,O[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const he=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===Ht||S.minFilter!==za&&S.minFilter!==kr||S.type===Jn&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===Fr&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||i.get(S).__currentAnisotropy)&&(n.texParameterf(C,he.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy)}}function Y(C,S){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",I));const he=S.source;let ce=m.get(he);ce===void 0&&(ce={},m.set(he,ce));const de=ee(S);if(de!==C.__cacheKey){ce[de]===void 0&&(ce[de]={texture:n.createTexture(),usedTimes:0},l.memory.textures++,W=!0),ce[de].usedTimes++;const Le=ce[C.__cacheKey];Le!==void 0&&(ce[C.__cacheKey].usedTimes--,Le.usedTimes===0&&P(S)),C.__cacheKey=de,C.__webglTexture=ce[de].texture}return W}function Se(C,S,W){let he=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(he=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(he=n.TEXTURE_3D);const ce=Y(C,S),de=S.source;t.bindTexture(he,C.__webglTexture,n.TEXTURE0+W);const Le=i.get(de);if(de.version!==Le.__version||ce===!0){t.activeTexture(n.TEXTURE0+W);const ge=dt.getPrimaries(dt.workingColorSpace),we=S.colorSpace===un?null:dt.getPrimaries(S.colorSpace),j=S.colorSpace===un||ge===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const pe=b(S)&&E(S.image)===!1;let le=v(S.image,pe,!1,u);le=xt(S,le);const Be=E(le)||o,je=a.convert(S.format,S.colorSpace);let Ue=a.convert(S.type),Pe=N(S.internalFormat,je,Ue,S.colorSpace,S.isVideoTexture);_e(he,S,Be);let Te;const it=S.mipmaps,k=o&&S.isVideoTexture!==!0,xe=Le.__version===void 0||ce===!0,ue=w(S,le,Be);if(S.isDepthTexture)Pe=n.DEPTH_COMPONENT,o?S.type===Jn?Pe=n.DEPTH_COMPONENT32F:S.type===Zn?Pe=n.DEPTH_COMPONENT24:S.type===yi?Pe=n.DEPTH24_STENCIL8:Pe=n.DEPTH_COMPONENT16:S.type===Jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===bi&&Pe===n.DEPTH_COMPONENT&&S.type!==fl&&S.type!==Zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Zn,Ue=a.convert(S.type)),S.format===or&&Pe===n.DEPTH_COMPONENT&&(Pe=n.DEPTH_STENCIL,S.type!==yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=yi,Ue=a.convert(S.type))),xe&&(k?t.texStorage2D(n.TEXTURE_2D,1,Pe,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,Pe,le.width,le.height,0,je,Ue,null));else if(S.isDataTexture)if(it.length>0&&Be){k&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,it[0].width,it[0].height);for(let se=0,fe=it.length;se<fe;se++)Te=it[se],k?t.texSubImage2D(n.TEXTURE_2D,se,0,0,Te.width,Te.height,je,Ue,Te.data):t.texImage2D(n.TEXTURE_2D,se,Pe,Te.width,Te.height,0,je,Ue,Te.data);S.generateMipmaps=!1}else k?(xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,le.width,le.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,le.width,le.height,je,Ue,le.data)):t.texImage2D(n.TEXTURE_2D,0,Pe,le.width,le.height,0,je,Ue,le.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){k&&xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,it[0].width,it[0].height,le.depth);for(let se=0,fe=it.length;se<fe;se++)Te=it[se],S.format!==yn?je!==null?k?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,Te.width,Te.height,le.depth,je,Te.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Pe,Te.width,Te.height,le.depth,0,Te.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,Te.width,Te.height,le.depth,je,Ue,Te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Pe,Te.width,Te.height,le.depth,0,je,Ue,Te.data)}else{k&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,it[0].width,it[0].height);for(let se=0,fe=it.length;se<fe;se++)Te=it[se],S.format!==yn?je!==null?k?t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,Te.width,Te.height,je,Te.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Pe,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?t.texSubImage2D(n.TEXTURE_2D,se,0,0,Te.width,Te.height,je,Ue,Te.data):t.texImage2D(n.TEXTURE_2D,se,Pe,Te.width,Te.height,0,je,Ue,Te.data)}else if(S.isDataArrayTexture)k?(xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Pe,le.width,le.height,le.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,je,Ue,le.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,le.width,le.height,le.depth,0,je,Ue,le.data);else if(S.isData3DTexture)k?(xe&&t.texStorage3D(n.TEXTURE_3D,ue,Pe,le.width,le.height,le.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,je,Ue,le.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,le.width,le.height,le.depth,0,je,Ue,le.data);else if(S.isFramebufferTexture){if(xe)if(k)t.texStorage2D(n.TEXTURE_2D,ue,Pe,le.width,le.height);else{let se=le.width,fe=le.height;for(let Ie=0;Ie<ue;Ie++)t.texImage2D(n.TEXTURE_2D,Ie,Pe,se,fe,0,je,Ue,null),se>>=1,fe>>=1}}else if(it.length>0&&Be){k&&xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,it[0].width,it[0].height);for(let se=0,fe=it.length;se<fe;se++)Te=it[se],k?t.texSubImage2D(n.TEXTURE_2D,se,0,0,je,Ue,Te):t.texImage2D(n.TEXTURE_2D,se,Pe,je,Ue,Te);S.generateMipmaps=!1}else k?(xe&&t.texStorage2D(n.TEXTURE_2D,ue,Pe,le.width,le.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,je,Ue,le)):t.texImage2D(n.TEXTURE_2D,0,Pe,je,Ue,le);M(S,Be)&&T(he),Le.__version=de.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Me(C,S,W){if(S.image.length!==6)return;const he=Y(C,S),ce=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+W);const de=i.get(ce);if(ce.version!==de.__version||he===!0){t.activeTexture(n.TEXTURE0+W);const Le=dt.getPrimaries(dt.workingColorSpace),ge=S.colorSpace===un?null:dt.getPrimaries(S.colorSpace),we=S.colorSpace===un||Le===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const j=S.isCompressedTexture||S.image[0].isCompressedTexture,pe=S.image[0]&&S.image[0].isDataTexture,le=[];for(let se=0;se<6;se++)!j&&!pe?le[se]=v(S.image[se],!1,!0,d):le[se]=pe?S.image[se].image:S.image[se],le[se]=xt(S,le[se]);const Be=le[0],je=E(Be)||o,Ue=a.convert(S.format,S.colorSpace),Pe=a.convert(S.type),Te=N(S.internalFormat,Ue,Pe,S.colorSpace),it=o&&S.isVideoTexture!==!0,k=de.__version===void 0||he===!0;let xe=w(S,Be,je);_e(n.TEXTURE_CUBE_MAP,S,je);let ue;if(j){it&&k&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Te,Be.width,Be.height);for(let se=0;se<6;se++){ue=le[se].mipmaps;for(let fe=0;fe<ue.length;fe++){const Ie=ue[fe];S.format!==yn?Ue!==null?it?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe,0,0,Ie.width,Ie.height,Ue,Ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe,Te,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe,0,0,Ie.width,Ie.height,Ue,Pe,Ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe,Te,Ie.width,Ie.height,0,Ue,Pe,Ie.data)}}}else{ue=S.mipmaps,it&&k&&(ue.length>0&&xe++,t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Te,le[0].width,le[0].height));for(let se=0;se<6;se++)if(pe){it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,le[se].width,le[se].height,Ue,Pe,le[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Te,le[se].width,le[se].height,0,Ue,Pe,le[se].data);for(let fe=0;fe<ue.length;fe++){const rt=ue[fe].image[se].image;it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe+1,0,0,rt.width,rt.height,Ue,Pe,rt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe+1,Te,rt.width,rt.height,0,Ue,Pe,rt.data)}}else{it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ue,Pe,le[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Te,Ue,Pe,le[se]);for(let fe=0;fe<ue.length;fe++){const Ie=ue[fe];it?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe+1,0,0,Ue,Pe,Ie.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,fe+1,Te,Ue,Pe,Ie.image[se])}}}M(S,je)&&T(n.TEXTURE_CUBE_MAP),de.__version=ce.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function oe(C,S,W,he,ce,de){const Le=a.convert(W.format,W.colorSpace),ge=a.convert(W.type),we=N(W.internalFormat,Le,ge,W.colorSpace);if(!i.get(S).__hasExternalTextures){const pe=Math.max(1,S.width>>de),le=Math.max(1,S.height>>de);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,de,we,pe,le,S.depth,0,Le,ge,null):t.texImage2D(ce,de,we,pe,le,0,Le,ge,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),ke(S)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,he,ce,i.get(W).__webglTexture,0,Fe(S)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,he,ce,i.get(W).__webglTexture,de),t.bindFramebuffer(n.FRAMEBUFFER,null)}function U(C,S,W){if(n.bindRenderbuffer(n.RENDERBUFFER,C),S.depthBuffer&&!S.stencilBuffer){let he=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(W||ke(S)){const ce=S.depthTexture;ce&&ce.isDepthTexture&&(ce.type===Jn?he=n.DEPTH_COMPONENT32F:ce.type===Zn&&(he=n.DEPTH_COMPONENT24));const de=Fe(S);ke(S)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,he,S.width,S.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,de,he,S.width,S.height)}else n.renderbufferStorage(n.RENDERBUFFER,he,S.width,S.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,C)}else if(S.depthBuffer&&S.stencilBuffer){const he=Fe(S);W&&ke(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,S.width,S.height):ke(S)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,n.DEPTH24_STENCIL8,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,C)}else{const he=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ce=0;ce<he.length;ce++){const de=he[ce],Le=a.convert(de.format,de.colorSpace),ge=a.convert(de.type),we=N(de.internalFormat,Le,ge,de.colorSpace),j=Fe(S);W&&ke(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,j,we,S.width,S.height):ke(S)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,j,we,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,we,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ze(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),ie(S.depthTexture,0);const he=i.get(S.depthTexture).__webglTexture,ce=Fe(S);if(S.depthTexture.format===bi)ke(S)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0);else if(S.depthTexture.format===or)ke(S)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0,ce):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function ye(C){const S=i.get(C),W=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ze(S.__webglFramebuffer,C)}else if(W){S.__webglDepthbuffer=[];for(let he=0;he<6;he++)t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[he]),S.__webglDepthbuffer[he]=n.createRenderbuffer(),U(S.__webglDepthbuffer[he],C,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=n.createRenderbuffer(),U(S.__webglDepthbuffer,C,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function me(C,S,W){const he=i.get(C);S!==void 0&&oe(he.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&ye(C)}function Ae(C){const S=C.texture,W=i.get(C),he=i.get(S);C.addEventListener("dispose",F),C.isWebGLMultipleRenderTargets!==!0&&(he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture()),he.__version=S.version,l.memory.textures++);const ce=C.isWebGLCubeRenderTarget===!0,de=C.isWebGLMultipleRenderTargets===!0,Le=E(C)||o;if(ce){W.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(o&&S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[ge]=[];for(let we=0;we<S.mipmaps.length;we++)W.__webglFramebuffer[ge][we]=n.createFramebuffer()}else W.__webglFramebuffer[ge]=n.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let ge=0;ge<S.mipmaps.length;ge++)W.__webglFramebuffer[ge]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(de)if(s.drawBuffers){const ge=C.texture;for(let we=0,j=ge.length;we<j;we++){const pe=i.get(ge[we]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),l.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&C.samples>0&&ke(C)===!1){const ge=de?S:[S];W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let we=0;we<ge.length;we++){const j=ge[we];W.__webglColorRenderbuffer[we]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[we]);const pe=a.convert(j.format,j.colorSpace),le=a.convert(j.type),Be=N(j.internalFormat,pe,le,j.colorSpace,C.isXRRenderTarget===!0),je=Fe(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,je,Be,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,W.__webglColorRenderbuffer[we])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),U(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,he.__webglTexture),_e(n.TEXTURE_CUBE_MAP,S,Le);for(let ge=0;ge<6;ge++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let we=0;we<S.mipmaps.length;we++)oe(W.__webglFramebuffer[ge][we],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,we);else oe(W.__webglFramebuffer[ge],C,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);M(S,Le)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){const ge=C.texture;for(let we=0,j=ge.length;we<j;we++){const pe=ge[we],le=i.get(pe);t.bindTexture(n.TEXTURE_2D,le.__webglTexture),_e(n.TEXTURE_2D,pe,Le),oe(W.__webglFramebuffer,C,pe,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,0),M(pe,Le)&&T(n.TEXTURE_2D)}t.unbindTexture()}else{let ge=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(o?ge=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,he.__webglTexture),_e(ge,S,Le),o&&S.mipmaps&&S.mipmaps.length>0)for(let we=0;we<S.mipmaps.length;we++)oe(W.__webglFramebuffer[we],C,S,n.COLOR_ATTACHMENT0,ge,we);else oe(W.__webglFramebuffer,C,S,n.COLOR_ATTACHMENT0,ge,0);M(S,Le)&&T(ge),t.unbindTexture()}C.depthBuffer&&ye(C)}function Ce(C){const S=E(C)||o,W=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let he=0,ce=W.length;he<ce;he++){const de=W[he];if(M(de,S)){const Le=C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ge=i.get(de).__webglTexture;t.bindTexture(Le,ge),T(Le),t.unbindTexture()}}}function Ne(C){if(o&&C.samples>0&&ke(C)===!1){const S=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],W=C.width,he=C.height;let ce=n.COLOR_BUFFER_BIT;const de=[],Le=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(C),we=C.isWebGLMultipleRenderTargets===!0;if(we)for(let j=0;j<S.length;j++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let j=0;j<S.length;j++){de.push(n.COLOR_ATTACHMENT0+j),C.depthBuffer&&de.push(Le);const pe=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(pe===!1&&(C.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),we&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[j]),pe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Le]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Le])),we){const le=i.get(S[j]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,le,0)}n.blitFramebuffer(0,0,W,he,0,0,W,he,ce,n.NEAREST),g&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),we)for(let j=0;j<S.length;j++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,ge.__webglColorRenderbuffer[j]);const pe=i.get(S[j]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.TEXTURE_2D,pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function Fe(C){return Math.min(p,C.samples)}function ke(C){const S=i.get(C);return o&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ht(C){const S=l.render.frame;_.get(C)!==S&&(_.set(C,S),C.update())}function xt(C,S){const W=C.colorSpace,he=C.format,ce=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===qo||W!==zn&&W!==un&&(dt.getTransfer(W)===pt?o===!1?e.has("EXT_sRGB")===!0&&he===yn?(C.format=qo,C.minFilter=cn,C.generateMipmaps=!1):S=zh.sRGBToLinear(S):(he!==yn||ce!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}this.allocateTextureUnit=ae,this.resetTextureUnits=K,this.setTexture2D=ie,this.setTexture2DArray=D,this.setTexture3D=L,this.setTextureCube=V,this.rebindTextures=me,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=ke}function YS(n,e,t){const i=t.isWebGL2;function s(a,l=un){let o;const c=dt.getTransfer(l);if(a===ri)return n.UNSIGNED_BYTE;if(a===jh)return n.UNSIGNED_SHORT_4_4_4_4;if(a===Dh)return n.UNSIGNED_SHORT_5_5_5_1;if(a===Pv)return n.BYTE;if(a===Lv)return n.SHORT;if(a===fl)return n.UNSIGNED_SHORT;if(a===Lh)return n.INT;if(a===Zn)return n.UNSIGNED_INT;if(a===Jn)return n.FLOAT;if(a===Fr)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(a===jv)return n.ALPHA;if(a===yn)return n.RGBA;if(a===Dv)return n.LUMINANCE;if(a===Iv)return n.LUMINANCE_ALPHA;if(a===bi)return n.DEPTH_COMPONENT;if(a===or)return n.DEPTH_STENCIL;if(a===qo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(a===Uv)return n.RED;if(a===Ih)return n.RED_INTEGER;if(a===Ov)return n.RG;if(a===Uh)return n.RG_INTEGER;if(a===Oh)return n.RGBA_INTEGER;if(a===Ha||a===Ga||a===Va||a===Wa)if(c===pt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(a===Ha)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===Ga)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===Va)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===Wa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(a===Ha)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===Ga)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===Va)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===Wa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Tc||a===Ac||a===Rc||a===Cc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(a===Tc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Ac)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Rc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Cc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===kv)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(a===Nc||a===Pc)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(a===Nc)return c===pt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(a===Pc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Lc||a===jc||a===Dc||a===Ic||a===Uc||a===Oc||a===kc||a===Fc||a===Bc||a===zc||a===Hc||a===Gc||a===Vc||a===Wc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(a===Lc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===jc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Dc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Ic)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Uc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Oc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===kc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Fc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Bc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===zc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Hc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===Gc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===Vc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===Wc)return c===pt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===Xa||a===Xc||a===qc)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(a===Xa)return c===pt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===Xc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===qc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===Fv||a===$c||a===Yc||a===Kc)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(a===Xa)return o.COMPRESSED_RED_RGTC1_EXT;if(a===$c)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===Yc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===Kc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===yi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[a]!==void 0?n[a]:null}return{convert:s}}class KS extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Lr extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ZS={type:"move"};class xo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,l=null;const o=this._targetRay,c=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){l=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),f=this._getHandJoint(d,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],h=u.position.distanceTo(p.position),g=.02,_=.005;d.inputState.pinching&&h>g+_?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&h<=g-_&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ZS)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Lr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class JS extends Jt{constructor(e,t,i,s,a,l,o,c,d,u){if(u=u!==void 0?u:bi,u!==bi&&u!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===bi&&(i=Zn),i===void 0&&u===or&&(i=yi),super(null,s,a,l,o,c,u,i,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ht,this.minFilter=c!==void 0?c:Ht,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class QS extends Ci{constructor(e,t){super();const i=this;let s=null,a=1,l=null,o="local-floor",c=1,d=null,u=null,p=null,h=null,g=null,_=null;const x=t.getContextAttributes();let m=null,f=null;const y=[],v=[],E=new $t;E.layers.enable(1),E.viewport=new Lt;const b=new $t;b.layers.enable(2),b.viewport=new Lt;const M=[E,b],T=new KS;T.layers.enable(1),T.layers.enable(2);let N=null,w=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let L=y[D];return L===void 0&&(L=new xo,y[D]=L),L.getTargetRaySpace()},this.getControllerGrip=function(D){let L=y[D];return L===void 0&&(L=new xo,y[D]=L),L.getGripSpace()},this.getHand=function(D){let L=y[D];return L===void 0&&(L=new xo,y[D]=L),L.getHandSpace()};function A(D){const L=v.indexOf(D.inputSource);if(L===-1)return;const V=y[L];V!==void 0&&(V.update(D.inputSource,D.frame,d||l),V.dispatchEvent({type:D.type,data:D.inputSource}))}function I(){s.removeEventListener("select",A),s.removeEventListener("selectstart",A),s.removeEventListener("selectend",A),s.removeEventListener("squeeze",A),s.removeEventListener("squeezestart",A),s.removeEventListener("squeezeend",A),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",F);for(let D=0;D<y.length;D++){const L=v[D];L!==null&&(v[D]=null,y[D].disconnect(L))}N=null,w=null,e.setRenderTarget(m),g=null,h=null,p=null,s=null,f=null,ie.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){a=D,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){o=D,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(D){d=D},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return p},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(D){if(s=D,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",A),s.addEventListener("selectstart",A),s.addEventListener("selectend",A),s.addEventListener("squeeze",A),s.addEventListener("squeezestart",A),s.addEventListener("squeezeend",A),s.addEventListener("end",I),s.addEventListener("inputsourceschange",F),x.xrCompatible!==!0&&await t.makeXRCompatible(),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const L={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};g=new XRWebGLLayer(s,t,L),s.updateRenderState({baseLayer:g}),f=new Ti(g.framebufferWidth,g.framebufferHeight,{format:yn,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let L=null,V=null,B=null;x.depth&&(B=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,L=x.stencil?or:bi,V=x.stencil?yi:Zn);const Q={colorFormat:t.RGBA8,depthFormat:B,scaleFactor:a};p=new XRWebGLBinding(s,t),h=p.createProjectionLayer(Q),s.updateRenderState({layers:[h]}),f=new Ti(h.textureWidth,h.textureHeight,{format:yn,type:ri,depthTexture:new JS(h.textureWidth,h.textureHeight,V,void 0,void 0,void 0,void 0,void 0,void 0,L),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const O=e.properties.get(f);O.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),d=null,l=await s.requestReferenceSpace(o),ie.setContext(s),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function F(D){for(let L=0;L<D.removed.length;L++){const V=D.removed[L],B=v.indexOf(V);B>=0&&(v[B]=null,y[B].disconnect(V))}for(let L=0;L<D.added.length;L++){const V=D.added[L];let B=v.indexOf(V);if(B===-1){for(let O=0;O<y.length;O++)if(O>=v.length){v.push(V),B=O;break}else if(v[O]===null){v[O]=V,B=O;break}if(B===-1)break}const Q=y[B];Q&&Q.connect(V)}}const $=new q,P=new q;function H(D,L,V){$.setFromMatrixPosition(L.matrixWorld),P.setFromMatrixPosition(V.matrixWorld);const B=$.distanceTo(P),Q=L.projectionMatrix.elements,O=V.projectionMatrix.elements,_e=Q[14]/(Q[10]-1),Y=Q[14]/(Q[10]+1),Se=(Q[9]+1)/Q[5],Me=(Q[9]-1)/Q[5],oe=(Q[8]-1)/Q[0],U=(O[8]+1)/O[0],Ze=_e*oe,ye=_e*U,me=B/(-oe+U),Ae=me*-oe;L.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Ae),D.translateZ(me),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const Ce=_e+me,Ne=Y+me,Fe=Ze-Ae,ke=ye+(B-Ae),ht=Se*Y/Ne*Ce,xt=Me*Y/Ne*Ce;D.projectionMatrix.makePerspective(Fe,ke,ht,xt,Ce,Ne),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function J(D,L){L===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(L.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(s===null)return;T.near=b.near=E.near=D.near,T.far=b.far=E.far=D.far,(N!==T.near||w!==T.far)&&(s.updateRenderState({depthNear:T.near,depthFar:T.far}),N=T.near,w=T.far);const L=D.parent,V=T.cameras;J(T,L);for(let B=0;B<V.length;B++)J(V[B],L);V.length===2?H(T,E,b):T.projectionMatrix.copy(E.projectionMatrix),K(D,T,L)};function K(D,L,V){V===null?D.matrix.copy(L.matrixWorld):(D.matrix.copy(V.matrixWorld),D.matrix.invert(),D.matrix.multiply(L.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(L.projectionMatrix),D.projectionMatrixInverse.copy(L.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=sa*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(h===null&&g===null))return c},this.setFoveation=function(D){c=D,h!==null&&(h.fixedFoveation=D),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=D)};let ae=null;function ee(D,L){if(u=L.getViewerPose(d||l),_=L,u!==null){const V=u.views;g!==null&&(e.setRenderTargetFramebuffer(f,g.framebuffer),e.setRenderTarget(f));let B=!1;V.length!==T.cameras.length&&(T.cameras.length=0,B=!0);for(let Q=0;Q<V.length;Q++){const O=V[Q];let _e=null;if(g!==null)_e=g.getViewport(O);else{const Se=p.getViewSubImage(h,O);_e=Se.viewport,Q===0&&(e.setRenderTargetTextures(f,Se.colorTexture,h.ignoreDepthValues?void 0:Se.depthStencilTexture),e.setRenderTarget(f))}let Y=M[Q];Y===void 0&&(Y=new $t,Y.layers.enable(Q),Y.viewport=new Lt,M[Q]=Y),Y.matrix.fromArray(O.transform.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.projectionMatrix.fromArray(O.projectionMatrix),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert(),Y.viewport.set(_e.x,_e.y,_e.width,_e.height),Q===0&&(T.matrix.copy(Y.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),B===!0&&T.cameras.push(Y)}}for(let V=0;V<y.length;V++){const B=v[V],Q=y[V];B!==null&&Q!==void 0&&Q.update(B,L,d||l)}ae&&ae(D,L),L.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:L}),_=null}const ie=new Zh;ie.setAnimationLoop(ee),this.setAnimationLoop=function(D){ae=D},this.dispose=function(){}}}function e1(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,$h(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,y,v,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(m,f):f.isMeshToonMaterial?(a(m,f),p(m,f)):f.isMeshPhongMaterial?(a(m,f),u(m,f)):f.isMeshStandardMaterial?(a(m,f),h(m,f),f.isMeshPhysicalMaterial&&g(m,f,E)):f.isMeshMatcapMaterial?(a(m,f),_(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),x(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(l(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,y,v):f.isSpriteMaterial?d(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Zt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Zt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=e.get(f).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,y,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function p(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function g(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Zt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const y=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function t1(n,e,t,i){let s={},a={},l=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,v){const E=v.program;i.uniformBlockBinding(y,E)}function d(y,v){let E=s[y.id];E===void 0&&(_(y),E=u(y),s[y.id]=E,y.addEventListener("dispose",m));const b=v.program;i.updateUBOMapping(y,b);const M=e.render.frame;a[y.id]!==M&&(h(y),a[y.id]=M)}function u(y){const v=p();y.__bindingPointIndex=v;const E=n.createBuffer(),b=y.__size,M=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,b,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,E),E}function p(){for(let y=0;y<o;y++)if(l.indexOf(y)===-1)return l.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const v=s[y.id],E=y.uniforms,b=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let M=0,T=E.length;M<T;M++){const N=E[M];if(g(N,M,b)===!0){const w=N.__offset,A=Array.isArray(N.value)?N.value:[N.value];let I=0;for(let F=0;F<A.length;F++){const $=A[F],P=x($);typeof $=="number"?(N.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,w+I,N.__data)):$.isMatrix3?(N.__data[0]=$.elements[0],N.__data[1]=$.elements[1],N.__data[2]=$.elements[2],N.__data[3]=$.elements[0],N.__data[4]=$.elements[3],N.__data[5]=$.elements[4],N.__data[6]=$.elements[5],N.__data[7]=$.elements[0],N.__data[8]=$.elements[6],N.__data[9]=$.elements[7],N.__data[10]=$.elements[8],N.__data[11]=$.elements[0]):($.toArray(N.__data,I),I+=P.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,w,N.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(y,v,E){const b=y.value;if(E[v]===void 0){if(typeof b=="number")E[v]=b;else{const M=Array.isArray(b)?b:[b],T=[];for(let N=0;N<M.length;N++)T.push(M[N].clone());E[v]=T}return!0}else if(typeof b=="number"){if(E[v]!==b)return E[v]=b,!0}else{const M=Array.isArray(E[v])?E[v]:[E[v]],T=Array.isArray(b)?b:[b];for(let N=0;N<M.length;N++){const w=M[N];if(w.equals(T[N])===!1)return w.copy(T[N]),!0}}return!1}function _(y){const v=y.uniforms;let E=0;const b=16;let M=0;for(let T=0,N=v.length;T<N;T++){const w=v[T],A={boundary:0,storage:0},I=Array.isArray(w.value)?w.value:[w.value];for(let F=0,$=I.length;F<$;F++){const P=I[F],H=x(P);A.boundary+=H.boundary,A.storage+=H.storage}if(w.__data=new Float32Array(A.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=E,T>0){M=E%b;const F=b-M;M!==0&&F-A.boundary<0&&(E+=b-M,w.__offset=E)}E+=A.storage}return M=E%b,M>0&&(E+=b-M),y.__size=E,y.__cache={},this}function x(y){const v={boundary:0,storage:0};return typeof y=="number"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const E=l.indexOf(v.__bindingPointIndex);l.splice(E,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete a[v.id]}function f(){for(const y in s)n.deleteBuffer(s[y]);l=[],s={},a={}}return{bind:c,update:d,dispose:f}}class _l{constructor(e={}){const{canvas:t=Qv(),context:i=null,depth:s=!0,stencil:a=!0,alpha:l=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:d=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=l;const g=new Uint32Array(4),_=new Int32Array(4);let x=null,m=null;const f=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dt,this._useLegacyLights=!1,this.toneMapping=ii,this.toneMappingExposure=1;const v=this;let E=!1,b=0,M=0,T=null,N=-1,w=null;const A=new Lt,I=new Lt;let F=null;const $=new ot(0);let P=0,H=t.width,J=t.height,K=1,ae=null,ee=null;const ie=new Lt(0,0,H,J),D=new Lt(0,0,H,J);let L=!1;const V=new xl;let B=!1,Q=!1,O=null;const _e=new bt,Y=new $e,Se=new q,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function oe(){return T===null?K:1}let U=i;function Ze(R,X){for(let Z=0;Z<R.length;Z++){const te=R[Z],ne=t.getContext(te,X);if(ne!==null)return ne}return null}try{const R={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:d,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${hl}`),t.addEventListener("webglcontextlost",it,!1),t.addEventListener("webglcontextrestored",k,!1),t.addEventListener("webglcontextcreationerror",xe,!1),U===null){const X=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&X.shift(),U=Ze(X,R),U===null)throw Ze(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ye,me,Ae,Ce,Ne,Fe,ke,ht,xt,C,S,W,he,ce,de,Le,ge,we,j,pe,le,Be,je,Ue;function Pe(){ye=new uw(U),me=new sw(U,ye,e),ye.init(me),Be=new YS(U,ye,me),Ae=new qS(U,ye,me),Ce=new pw(U),Ne=new jS,Fe=new $S(U,ye,Ae,Ne,me,Be,Ce),ke=new ow(v),ht=new dw(v),xt=new E_(U,me),je=new iw(U,ye,xt,me),C=new hw(U,xt,Ce,je),S=new vw(U,C,xt,Ce),j=new xw(U,me,Fe),Le=new aw(Ne),W=new LS(v,ke,ht,ye,me,je,Le),he=new e1(v,Ne),ce=new IS,de=new zS(ye,me),we=new nw(v,ke,ht,Ae,S,h,c),ge=new XS(v,S,me),Ue=new t1(U,Ce,me,Ae),pe=new rw(U,ye,Ce,me),le=new fw(U,ye,Ce,me),Ce.programs=W.programs,v.capabilities=me,v.extensions=ye,v.properties=Ne,v.renderLists=ce,v.shadowMap=ge,v.state=Ae,v.info=Ce}Pe();const Te=new QS(v,U);this.xr=Te,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=ye.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ye.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(R){R!==void 0&&(K=R,this.setSize(H,J,!1))},this.getSize=function(R){return R.set(H,J)},this.setSize=function(R,X,Z=!0){if(Te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=R,J=X,t.width=Math.floor(R*K),t.height=Math.floor(X*K),Z===!0&&(t.style.width=R+"px",t.style.height=X+"px"),this.setViewport(0,0,R,X)},this.getDrawingBufferSize=function(R){return R.set(H*K,J*K).floor()},this.setDrawingBufferSize=function(R,X,Z){H=R,J=X,K=Z,t.width=Math.floor(R*Z),t.height=Math.floor(X*Z),this.setViewport(0,0,R,X)},this.getCurrentViewport=function(R){return R.copy(A)},this.getViewport=function(R){return R.copy(ie)},this.setViewport=function(R,X,Z,te){R.isVector4?ie.set(R.x,R.y,R.z,R.w):ie.set(R,X,Z,te),Ae.viewport(A.copy(ie).multiplyScalar(K).floor())},this.getScissor=function(R){return R.copy(D)},this.setScissor=function(R,X,Z,te){R.isVector4?D.set(R.x,R.y,R.z,R.w):D.set(R,X,Z,te),Ae.scissor(I.copy(D).multiplyScalar(K).floor())},this.getScissorTest=function(){return L},this.setScissorTest=function(R){Ae.setScissorTest(L=R)},this.setOpaqueSort=function(R){ae=R},this.setTransparentSort=function(R){ee=R},this.getClearColor=function(R){return R.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor.apply(we,arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha.apply(we,arguments)},this.clear=function(R=!0,X=!0,Z=!0){let te=0;if(R){let ne=!1;if(T!==null){const Ee=T.texture.format;ne=Ee===Oh||Ee===Uh||Ee===Ih}if(ne){const Ee=T.texture.type,De=Ee===ri||Ee===Zn||Ee===fl||Ee===yi||Ee===jh||Ee===Dh,ze=we.getClearColor(),qe=we.getClearAlpha(),tt=ze.r,Ye=ze.g,Je=ze.b;De?(g[0]=tt,g[1]=Ye,g[2]=Je,g[3]=qe,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=tt,_[1]=Ye,_[2]=Je,_[3]=qe,U.clearBufferiv(U.COLOR,0,_))}else te|=U.COLOR_BUFFER_BIT}X&&(te|=U.DEPTH_BUFFER_BIT),Z&&(te|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",k,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),ce.dispose(),de.dispose(),Ne.dispose(),ke.dispose(),ht.dispose(),S.dispose(),je.dispose(),Ue.dispose(),W.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",sn),Te.removeEventListener("sessionend",ut),O&&(O.dispose(),O=null),Ft.stop()};function it(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const R=Ce.autoReset,X=ge.enabled,Z=ge.autoUpdate,te=ge.needsUpdate,ne=ge.type;Pe(),Ce.autoReset=R,ge.enabled=X,ge.autoUpdate=Z,ge.needsUpdate=te,ge.type=ne}function xe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ue(R){const X=R.target;X.removeEventListener("dispose",ue),se(X)}function se(R){fe(R),Ne.remove(R)}function fe(R){const X=Ne.get(R).programs;X!==void 0&&(X.forEach(function(Z){W.releaseProgram(Z)}),R.isShaderMaterial&&W.releaseShaderCache(R))}this.renderBufferDirect=function(R,X,Z,te,ne,Ee){X===null&&(X=Me);const De=ne.isMesh&&ne.matrixWorld.determinant()<0,ze=mf(R,X,Z,te,ne);Ae.setMaterial(te,De);let qe=Z.index,tt=1;if(te.wireframe===!0){if(qe=C.getWireframeAttribute(Z),qe===void 0)return;tt=2}const Ye=Z.drawRange,Je=Z.attributes.position;let St=Ye.start*tt,Qt=(Ye.start+Ye.count)*tt;Ee!==null&&(St=Math.max(St,Ee.start*tt),Qt=Math.min(Qt,(Ee.start+Ee.count)*tt)),qe!==null?(St=Math.max(St,0),Qt=Math.min(Qt,qe.count)):Je!=null&&(St=Math.max(St,0),Qt=Math.min(Qt,Je.count));const Nt=Qt-St;if(Nt<0||Nt===1/0)return;je.setup(ne,te,ze,Z,qe);let Nn,wt=pe;if(qe!==null&&(Nn=xt.get(qe),wt=le,wt.setIndex(Nn)),ne.isMesh)te.wireframe===!0?(Ae.setLineWidth(te.wireframeLinewidth*oe()),wt.setMode(U.LINES)):wt.setMode(U.TRIANGLES);else if(ne.isLine){let st=te.linewidth;st===void 0&&(st=1),Ae.setLineWidth(st*oe()),ne.isLineSegments?wt.setMode(U.LINES):ne.isLineLoop?wt.setMode(U.LINE_LOOP):wt.setMode(U.LINE_STRIP)}else ne.isPoints?wt.setMode(U.POINTS):ne.isSprite&&wt.setMode(U.TRIANGLES);if(ne.isInstancedMesh)wt.renderInstances(St,Nt,ne.count);else if(Z.isInstancedBufferGeometry){const st=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,wa=Math.min(Z.instanceCount,st);wt.renderInstances(St,Nt,wa)}else wt.render(St,Nt)};function Ie(R,X,Z){R.transparent===!0&&R.side===Mn&&R.forceSinglePass===!1?(R.side=Zt,R.needsUpdate=!0,Kr(R,X,Z),R.side=si,R.needsUpdate=!0,Kr(R,X,Z),R.side=Mn):Kr(R,X,Z)}this.compile=function(R,X,Z=null){Z===null&&(Z=R),m=de.get(Z),m.init(),y.push(m),Z.traverseVisible(function(ne){ne.isLight&&ne.layers.test(X.layers)&&(m.pushLight(ne),ne.castShadow&&m.pushShadow(ne))}),R!==Z&&R.traverseVisible(function(ne){ne.isLight&&ne.layers.test(X.layers)&&(m.pushLight(ne),ne.castShadow&&m.pushShadow(ne))}),m.setupLights(v._useLegacyLights);const te=new Set;return R.traverse(function(ne){const Ee=ne.material;if(Ee)if(Array.isArray(Ee))for(let De=0;De<Ee.length;De++){const ze=Ee[De];Ie(ze,Z,ne),te.add(ze)}else Ie(Ee,Z,ne),te.add(Ee)}),y.pop(),m=null,te},this.compileAsync=function(R,X,Z=null){const te=this.compile(R,X,Z);return new Promise(ne=>{function Ee(){if(te.forEach(function(De){Ne.get(De).currentProgram.isReady()&&te.delete(De)}),te.size===0){ne(R);return}setTimeout(Ee,10)}ye.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let rt=null;function Et(R){rt&&rt(R)}function sn(){Ft.stop()}function ut(){Ft.start()}const Ft=new Zh;Ft.setAnimationLoop(Et),typeof self<"u"&&Ft.setContext(self),this.setAnimationLoop=function(R){rt=R,Te.setAnimationLoop(R),R===null?Ft.stop():Ft.start()},Te.addEventListener("sessionstart",sn),Te.addEventListener("sessionend",ut),this.render=function(R,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(X),X=Te.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,X,T),m=de.get(R,y.length),m.init(),y.push(m),_e.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),V.setFromProjectionMatrix(_e),Q=this.localClippingEnabled,B=Le.init(this.clippingPlanes,Q),x=ce.get(R,f.length),x.init(),f.push(x),Sn(R,X,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(ae,ee),this.info.render.frame++,B===!0&&Le.beginShadows();const Z=m.state.shadowsArray;if(ge.render(Z,R,X),B===!0&&Le.endShadows(),this.info.autoReset===!0&&this.info.reset(),we.render(x,R),m.setupLights(v._useLegacyLights),X.isArrayCamera){const te=X.cameras;for(let ne=0,Ee=te.length;ne<Ee;ne++){const De=te[ne];wl(x,R,De,De.viewport)}}else wl(x,R,X);T!==null&&(Fe.updateMultisampleRenderTarget(T),Fe.updateRenderTargetMipmap(T)),R.isScene===!0&&R.onAfterRender(v,R,X),je.resetDefaultState(),N=-1,w=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,f.pop(),f.length>0?x=f[f.length-1]:x=null};function Sn(R,X,Z,te){if(R.visible===!1)return;if(R.layers.test(X.layers)){if(R.isGroup)Z=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(X);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||V.intersectsSprite(R)){te&&Se.setFromMatrixPosition(R.matrixWorld).applyMatrix4(_e);const De=S.update(R),ze=R.material;ze.visible&&x.push(R,De,ze,Z,Se.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||V.intersectsObject(R))){const De=S.update(R),ze=R.material;if(te&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Se.copy(R.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),Se.copy(De.boundingSphere.center)),Se.applyMatrix4(R.matrixWorld).applyMatrix4(_e)),Array.isArray(ze)){const qe=De.groups;for(let tt=0,Ye=qe.length;tt<Ye;tt++){const Je=qe[tt],St=ze[Je.materialIndex];St&&St.visible&&x.push(R,De,St,Z,Se.z,Je)}}else ze.visible&&x.push(R,De,ze,Z,Se.z,null)}}const Ee=R.children;for(let De=0,ze=Ee.length;De<ze;De++)Sn(Ee[De],X,Z,te)}function wl(R,X,Z,te){const ne=R.opaque,Ee=R.transmissive,De=R.transparent;m.setupLightsView(Z),B===!0&&Le.setGlobalState(v.clippingPlanes,Z),Ee.length>0&&pf(ne,Ee,X,Z),te&&Ae.viewport(A.copy(te)),ne.length>0&&Yr(ne,X,Z),Ee.length>0&&Yr(Ee,X,Z),De.length>0&&Yr(De,X,Z),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function pf(R,X,Z,te){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;const Ee=me.isWebGL2;O===null&&(O=new Ti(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?Fr:ri,minFilter:kr,samples:Ee?4:0})),v.getDrawingBufferSize(Y),Ee?O.setSize(Y.x,Y.y):O.setSize($o(Y.x),$o(Y.y));const De=v.getRenderTarget();v.setRenderTarget(O),v.getClearColor($),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const ze=v.toneMapping;v.toneMapping=ii,Yr(R,Z,te),Fe.updateMultisampleRenderTarget(O),Fe.updateRenderTargetMipmap(O);let qe=!1;for(let tt=0,Ye=X.length;tt<Ye;tt++){const Je=X[tt],St=Je.object,Qt=Je.geometry,Nt=Je.material,Nn=Je.group;if(Nt.side===Mn&&St.layers.test(te.layers)){const wt=Nt.side;Nt.side=Zt,Nt.needsUpdate=!0,Sl(St,Z,te,Qt,Nt,Nn),Nt.side=wt,Nt.needsUpdate=!0,qe=!0}}qe===!0&&(Fe.updateMultisampleRenderTarget(O),Fe.updateRenderTargetMipmap(O)),v.setRenderTarget(De),v.setClearColor($,P),v.toneMapping=ze}function Yr(R,X,Z){const te=X.isScene===!0?X.overrideMaterial:null;for(let ne=0,Ee=R.length;ne<Ee;ne++){const De=R[ne],ze=De.object,qe=De.geometry,tt=te===null?De.material:te,Ye=De.group;ze.layers.test(Z.layers)&&Sl(ze,X,Z,qe,tt,Ye)}}function Sl(R,X,Z,te,ne,Ee){R.onBeforeRender(v,X,Z,te,ne,Ee),R.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(v,X,Z,te,R,Ee),ne.transparent===!0&&ne.side===Mn&&ne.forceSinglePass===!1?(ne.side=Zt,ne.needsUpdate=!0,v.renderBufferDirect(Z,X,te,ne,R,Ee),ne.side=si,ne.needsUpdate=!0,v.renderBufferDirect(Z,X,te,ne,R,Ee),ne.side=Mn):v.renderBufferDirect(Z,X,te,ne,R,Ee),R.onAfterRender(v,X,Z,te,ne,Ee)}function Kr(R,X,Z){X.isScene!==!0&&(X=Me);const te=Ne.get(R),ne=m.state.lights,Ee=m.state.shadowsArray,De=ne.state.version,ze=W.getParameters(R,ne.state,Ee,X,Z),qe=W.getProgramCacheKey(ze);let tt=te.programs;te.environment=R.isMeshStandardMaterial?X.environment:null,te.fog=X.fog,te.envMap=(R.isMeshStandardMaterial?ht:ke).get(R.envMap||te.environment),tt===void 0&&(R.addEventListener("dispose",ue),tt=new Map,te.programs=tt);let Ye=tt.get(qe);if(Ye!==void 0){if(te.currentProgram===Ye&&te.lightsStateVersion===De)return Ml(R,ze),Ye}else ze.uniforms=W.getUniforms(R),R.onBuild(Z,ze,v),R.onBeforeCompile(ze,v),Ye=W.acquireProgram(ze,qe),tt.set(qe,Ye),te.uniforms=ze.uniforms;const Je=te.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Je.clippingPlanes=Le.uniform),Ml(R,ze),te.needsLights=xf(R),te.lightsStateVersion=De,te.needsLights&&(Je.ambientLightColor.value=ne.state.ambient,Je.lightProbe.value=ne.state.probe,Je.directionalLights.value=ne.state.directional,Je.directionalLightShadows.value=ne.state.directionalShadow,Je.spotLights.value=ne.state.spot,Je.spotLightShadows.value=ne.state.spotShadow,Je.rectAreaLights.value=ne.state.rectArea,Je.ltc_1.value=ne.state.rectAreaLTC1,Je.ltc_2.value=ne.state.rectAreaLTC2,Je.pointLights.value=ne.state.point,Je.pointLightShadows.value=ne.state.pointShadow,Je.hemisphereLights.value=ne.state.hemi,Je.directionalShadowMap.value=ne.state.directionalShadowMap,Je.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,Je.spotShadowMap.value=ne.state.spotShadowMap,Je.spotLightMatrix.value=ne.state.spotLightMatrix,Je.spotLightMap.value=ne.state.spotLightMap,Je.pointShadowMap.value=ne.state.pointShadowMap,Je.pointShadowMatrix.value=ne.state.pointShadowMatrix),te.currentProgram=Ye,te.uniformsList=null,Ye}function El(R){if(R.uniformsList===null){const X=R.currentProgram.getUniforms();R.uniformsList=qs.seqWithValue(X.seq,R.uniforms)}return R.uniformsList}function Ml(R,X){const Z=Ne.get(R);Z.outputColorSpace=X.outputColorSpace,Z.instancing=X.instancing,Z.instancingColor=X.instancingColor,Z.skinning=X.skinning,Z.morphTargets=X.morphTargets,Z.morphNormals=X.morphNormals,Z.morphColors=X.morphColors,Z.morphTargetsCount=X.morphTargetsCount,Z.numClippingPlanes=X.numClippingPlanes,Z.numIntersection=X.numClipIntersection,Z.vertexAlphas=X.vertexAlphas,Z.vertexTangents=X.vertexTangents,Z.toneMapping=X.toneMapping}function mf(R,X,Z,te,ne){X.isScene!==!0&&(X=Me),Fe.resetTextureUnits();const Ee=X.fog,De=te.isMeshStandardMaterial?X.environment:null,ze=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:zn,qe=(te.isMeshStandardMaterial?ht:ke).get(te.envMap||De),tt=te.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ye=!!Z.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Je=!!Z.morphAttributes.position,St=!!Z.morphAttributes.normal,Qt=!!Z.morphAttributes.color;let Nt=ii;te.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Nt=v.toneMapping);const Nn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,wt=Nn!==void 0?Nn.length:0,st=Ne.get(te),wa=m.state.lights;if(B===!0&&(Q===!0||R!==w)){const en=R===w&&te.id===N;Le.setState(te,R,en)}let Mt=!1;te.version===st.__version?(st.needsLights&&st.lightsStateVersion!==wa.state.version||st.outputColorSpace!==ze||ne.isInstancedMesh&&st.instancing===!1||!ne.isInstancedMesh&&st.instancing===!0||ne.isSkinnedMesh&&st.skinning===!1||!ne.isSkinnedMesh&&st.skinning===!0||ne.isInstancedMesh&&st.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&st.instancingColor===!1&&ne.instanceColor!==null||st.envMap!==qe||te.fog===!0&&st.fog!==Ee||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==Le.numPlanes||st.numIntersection!==Le.numIntersection)||st.vertexAlphas!==tt||st.vertexTangents!==Ye||st.morphTargets!==Je||st.morphNormals!==St||st.morphColors!==Qt||st.toneMapping!==Nt||me.isWebGL2===!0&&st.morphTargetsCount!==wt)&&(Mt=!0):(Mt=!0,st.__version=te.version);let oi=st.currentProgram;Mt===!0&&(oi=Kr(te,X,ne));let Tl=!1,pr=!1,Sa=!1;const Bt=oi.getUniforms(),li=st.uniforms;if(Ae.useProgram(oi.program)&&(Tl=!0,pr=!0,Sa=!0),te.id!==N&&(N=te.id,pr=!0),Tl||w!==R){Bt.setValue(U,"projectionMatrix",R.projectionMatrix),Bt.setValue(U,"viewMatrix",R.matrixWorldInverse);const en=Bt.map.cameraPosition;en!==void 0&&en.setValue(U,Se.setFromMatrixPosition(R.matrixWorld)),me.logarithmicDepthBuffer&&Bt.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Bt.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),w!==R&&(w=R,pr=!0,Sa=!0)}if(ne.isSkinnedMesh){Bt.setOptional(U,ne,"bindMatrix"),Bt.setOptional(U,ne,"bindMatrixInverse");const en=ne.skeleton;en&&(me.floatVertexTextures?(en.boneTexture===null&&en.computeBoneTexture(),Bt.setValue(U,"boneTexture",en.boneTexture,Fe),Bt.setValue(U,"boneTextureSize",en.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Ea=Z.morphAttributes;if((Ea.position!==void 0||Ea.normal!==void 0||Ea.color!==void 0&&me.isWebGL2===!0)&&j.update(ne,Z,oi),(pr||st.receiveShadow!==ne.receiveShadow)&&(st.receiveShadow=ne.receiveShadow,Bt.setValue(U,"receiveShadow",ne.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(li.envMap.value=qe,li.flipEnvMap.value=qe.isCubeTexture&&qe.isRenderTargetTexture===!1?-1:1),pr&&(Bt.setValue(U,"toneMappingExposure",v.toneMappingExposure),st.needsLights&&gf(li,Sa),Ee&&te.fog===!0&&he.refreshFogUniforms(li,Ee),he.refreshMaterialUniforms(li,te,K,J,O),qs.upload(U,El(st),li,Fe)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(qs.upload(U,El(st),li,Fe),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Bt.setValue(U,"center",ne.center),Bt.setValue(U,"modelViewMatrix",ne.modelViewMatrix),Bt.setValue(U,"normalMatrix",ne.normalMatrix),Bt.setValue(U,"modelMatrix",ne.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const en=te.uniformsGroups;for(let Ma=0,vf=en.length;Ma<vf;Ma++)if(me.isWebGL2){const Al=en[Ma];Ue.update(Al,oi),Ue.bind(Al,oi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return oi}function gf(R,X){R.ambientLightColor.needsUpdate=X,R.lightProbe.needsUpdate=X,R.directionalLights.needsUpdate=X,R.directionalLightShadows.needsUpdate=X,R.pointLights.needsUpdate=X,R.pointLightShadows.needsUpdate=X,R.spotLights.needsUpdate=X,R.spotLightShadows.needsUpdate=X,R.rectAreaLights.needsUpdate=X,R.hemisphereLights.needsUpdate=X}function xf(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(R,X,Z){Ne.get(R.texture).__webglTexture=X,Ne.get(R.depthTexture).__webglTexture=Z;const te=Ne.get(R);te.__hasExternalTextures=!0,te.__hasExternalTextures&&(te.__autoAllocateDepthBuffer=Z===void 0,te.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,X){const Z=Ne.get(R);Z.__webglFramebuffer=X,Z.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(R,X=0,Z=0){T=R,b=X,M=Z;let te=!0,ne=null,Ee=!1,De=!1;if(R){const qe=Ne.get(R);qe.__useDefaultFramebuffer!==void 0?(Ae.bindFramebuffer(U.FRAMEBUFFER,null),te=!1):qe.__webglFramebuffer===void 0?Fe.setupRenderTarget(R):qe.__hasExternalTextures&&Fe.rebindTextures(R,Ne.get(R.texture).__webglTexture,Ne.get(R.depthTexture).__webglTexture);const tt=R.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(De=!0);const Ye=Ne.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ye[X])?ne=Ye[X][Z]:ne=Ye[X],Ee=!0):me.isWebGL2&&R.samples>0&&Fe.useMultisampledRTT(R)===!1?ne=Ne.get(R).__webglMultisampledFramebuffer:Array.isArray(Ye)?ne=Ye[Z]:ne=Ye,A.copy(R.viewport),I.copy(R.scissor),F=R.scissorTest}else A.copy(ie).multiplyScalar(K).floor(),I.copy(D).multiplyScalar(K).floor(),F=L;if(Ae.bindFramebuffer(U.FRAMEBUFFER,ne)&&me.drawBuffers&&te&&Ae.drawBuffers(R,ne),Ae.viewport(A),Ae.scissor(I),Ae.setScissorTest(F),Ee){const qe=Ne.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+X,qe.__webglTexture,Z)}else if(De){const qe=Ne.get(R.texture),tt=X||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,qe.__webglTexture,Z||0,tt)}N=-1},this.readRenderTargetPixels=function(R,X,Z,te,ne,Ee,De){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=Ne.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&De!==void 0&&(ze=ze[De]),ze){Ae.bindFramebuffer(U.FRAMEBUFFER,ze);try{const qe=R.texture,tt=qe.format,Ye=qe.type;if(tt!==yn&&Be.convert(tt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Je=Ye===Fr&&(ye.has("EXT_color_buffer_half_float")||me.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Ye!==ri&&Be.convert(Ye)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ye===Jn&&(me.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=R.width-te&&Z>=0&&Z<=R.height-ne&&U.readPixels(X,Z,te,ne,Be.convert(tt),Be.convert(Ye),Ee)}finally{const qe=T!==null?Ne.get(T).__webglFramebuffer:null;Ae.bindFramebuffer(U.FRAMEBUFFER,qe)}}},this.copyFramebufferToTexture=function(R,X,Z=0){const te=Math.pow(2,-Z),ne=Math.floor(X.image.width*te),Ee=Math.floor(X.image.height*te);Fe.setTexture2D(X,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,R.x,R.y,ne,Ee),Ae.unbindTexture()},this.copyTextureToTexture=function(R,X,Z,te=0){const ne=X.image.width,Ee=X.image.height,De=Be.convert(Z.format),ze=Be.convert(Z.type);Fe.setTexture2D(Z,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,Z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,Z.unpackAlignment),X.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,te,R.x,R.y,ne,Ee,De,ze,X.image.data):X.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,te,R.x,R.y,X.mipmaps[0].width,X.mipmaps[0].height,De,X.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,te,R.x,R.y,De,ze,X.image),te===0&&Z.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),Ae.unbindTexture()},this.copyTextureToTexture3D=function(R,X,Z,te,ne=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ee=R.max.x-R.min.x+1,De=R.max.y-R.min.y+1,ze=R.max.z-R.min.z+1,qe=Be.convert(te.format),tt=Be.convert(te.type);let Ye;if(te.isData3DTexture)Fe.setTexture3D(te,0),Ye=U.TEXTURE_3D;else if(te.isDataArrayTexture)Fe.setTexture2DArray(te,0),Ye=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,te.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,te.unpackAlignment);const Je=U.getParameter(U.UNPACK_ROW_LENGTH),St=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Qt=U.getParameter(U.UNPACK_SKIP_PIXELS),Nt=U.getParameter(U.UNPACK_SKIP_ROWS),Nn=U.getParameter(U.UNPACK_SKIP_IMAGES),wt=Z.isCompressedTexture?Z.mipmaps[0]:Z.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,wt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,wt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,R.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,R.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,R.min.z),Z.isDataTexture||Z.isData3DTexture?U.texSubImage3D(Ye,ne,X.x,X.y,X.z,Ee,De,ze,qe,tt,wt.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ye,ne,X.x,X.y,X.z,Ee,De,ze,qe,wt.data)):U.texSubImage3D(Ye,ne,X.x,X.y,X.z,Ee,De,ze,qe,tt,wt),U.pixelStorei(U.UNPACK_ROW_LENGTH,Je),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,St),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Qt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Nt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nn),ne===0&&te.generateMipmaps&&U.generateMipmap(Ye),Ae.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?Fe.setTextureCube(R,0):R.isData3DTexture?Fe.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Fe.setTexture2DArray(R,0):Fe.setTexture2D(R,0),Ae.unbindTexture()},this.resetState=function(){b=0,M=0,T=null,Ae.reset(),je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===pl?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===_a?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Dt?wi:kh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===wi?Dt:zn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class n1 extends _l{}n1.prototype.isWebGL1Renderer=!0;class yl{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new ot(e),this.near=t,this.far=i}clone(){return new yl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class rf extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Fd extends bn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ki=new bt,Bd=new bt,As=[],zd=new Ni,i1=new bt,Tr=new mt,Ar=new qr;class r1 extends mt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fd(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,i1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ki),zd.copy(e.boundingBox).applyMatrix4(Ki),this.boundingBox.union(zd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ki),Ar.copy(e.boundingSphere).applyMatrix4(Ki),this.boundingSphere.union(Ar)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Tr.geometry=this.geometry,Tr.material=this.material,Tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ar.copy(this.boundingSphere),Ar.applyMatrix4(i),e.ray.intersectsSphere(Ar)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,Ki),Bd.multiplyMatrices(i,Ki),Tr.matrixWorld=Bd,Tr.raycast(e,As);for(let l=0,o=As.length;l<o;l++){const c=As[l];c.instanceId=a,c.object=this,t.push(c)}As.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fd(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class s1 extends Jt{constructor(e,t,i,s,a,l,o,c,d){super(e,t,i,s,a,l,o,c,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ba extends ai{constructor(e=1,t=1,i=1,s=32,a=1,l=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:l,thetaStart:o,thetaLength:c};const d=this;s=Math.floor(s),a=Math.floor(a);const u=[],p=[],h=[],g=[];let _=0;const x=[],m=i/2;let f=0;y(),l===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Rn(p,3)),this.setAttribute("normal",new Rn(h,3)),this.setAttribute("uv",new Rn(g,2));function y(){const E=new q,b=new q;let M=0;const T=(t-e)/i;for(let N=0;N<=a;N++){const w=[],A=N/a,I=A*(t-e)+e;for(let F=0;F<=s;F++){const $=F/s,P=$*c+o,H=Math.sin(P),J=Math.cos(P);b.x=I*H,b.y=-A*i+m,b.z=I*J,p.push(b.x,b.y,b.z),E.set(H,T,J).normalize(),h.push(E.x,E.y,E.z),g.push($,1-A),w.push(_++)}x.push(w)}for(let N=0;N<s;N++)for(let w=0;w<a;w++){const A=x[w][N],I=x[w+1][N],F=x[w+1][N+1],$=x[w][N+1];u.push(A,I,$),u.push(I,F,$),M+=6}d.addGroup(f,M,0),f+=M}function v(E){const b=_,M=new $e,T=new q;let N=0;const w=E===!0?e:t,A=E===!0?1:-1;for(let F=1;F<=s;F++)p.push(0,m*A,0),h.push(0,A,0),g.push(.5,.5),_++;const I=_;for(let F=0;F<=s;F++){const P=F/s*c+o,H=Math.cos(P),J=Math.sin(P);T.x=w*J,T.y=m*A,T.z=w*H,p.push(T.x,T.y,T.z),h.push(0,A,0),M.x=H*.5+.5,M.y=J*.5*A+.5,g.push(M.x,M.y),_++}for(let F=0;F<s;F++){const $=b+F,P=I+F;E===!0?u.push(P,P+1,$):u.push(P+1,P,$),N+=3}d.addGroup(f,N,E===!0?1:2),f+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ba(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dn extends $r{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fh,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bl extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const vo=new bt,Hd=new q,Gd=new q;class sf{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xl,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new Lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Hd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hd),Gd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gd),t.updateMatrixWorld(),vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class a1 extends sf{constructor(){super(new $t(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=sa*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(i!==t.fov||s!==t.aspect||a!==t.far)&&(t.fov=i,t.aspect=s,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class af extends bl{constructor(e,t,i=0,s=Math.PI/3,a=0,l=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.distance=i,this.angle=s,this.penumbra=a,this.decay=l,this.map=null,this.shadow=new a1}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class o1 extends sf{constructor(){super(new Jh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class of extends bl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new o1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class lf extends bl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class l1{constructor(e,t,i=0,s=1/0){this.ray=new ml(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new gl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Ko(e,this,i,t),i.sort(Vd),i}intersectObjects(e,t=!0,i=[]){for(let s=0,a=e.length;s<a;s++)Ko(e[s],this,i,t);return i.sort(Vd),i}}function Vd(n,e){return n.distance-e.distance}function Ko(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const s=n.children;for(let a=0,l=s.length;a<l;a++)Ko(s[a],e,t,!0)}}class Wd{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Gt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hl);const Xd={type:"change"},_o={type:"start"},qd={type:"end"},Rs=new ml,$d=new Kn,c1=Math.cos(70*Jv.DEG2RAD);class cf extends Ci{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new q,this.cursor=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Li.ROTATE,MIDDLE:Li.DOLLY,RIGHT:Li.PAN},this.touches={ONE:ji.ROTATE,TWO:ji.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(j){j.addEventListener("keydown",S),this._domElementKeyEvents=j},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",S),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Xd),i.update(),a=s.NONE},this.update=(function(){const j=new q,pe=new Ai().setFromUnitVectors(e.up,new q(0,1,0)),le=pe.clone().invert(),Be=new q,je=new Ai,Ue=new q,Pe=2*Math.PI;return function(it=null){const k=i.object.position;j.copy(k).sub(i.target),j.applyQuaternion(pe),o.setFromVector3(j),i.autoRotate&&a===s.NONE&&I(w(it)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let xe=i.minAzimuthAngle,ue=i.maxAzimuthAngle;isFinite(xe)&&isFinite(ue)&&(xe<-Math.PI?xe+=Pe:xe>Math.PI&&(xe-=Pe),ue<-Math.PI?ue+=Pe:ue>Math.PI&&(ue-=Pe),xe<=ue?o.theta=Math.max(xe,Math.min(ue,o.theta)):o.theta=o.theta>(xe+ue)/2?Math.max(xe,o.theta):Math.min(ue,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&M||i.object.isOrthographicCamera?o.radius=ee(o.radius):o.radius=ee(o.radius*d),j.setFromSpherical(o),j.applyQuaternion(le),k.copy(i.target).add(j),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let se=!1;if(i.zoomToCursor&&M){let fe=null;if(i.object.isPerspectiveCamera){const Ie=j.length();fe=ee(Ie*d);const rt=Ie-fe;i.object.position.addScaledVector(E,rt),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const Ie=new q(b.x,b.y,0);Ie.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),se=!0;const rt=new q(b.x,b.y,0);rt.unproject(i.object),i.object.position.sub(rt).add(Ie),i.object.updateMatrixWorld(),fe=j.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;fe!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(fe).add(i.object.position):(Rs.origin.copy(i.object.position),Rs.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Rs.direction))<c1?e.lookAt(i.target):($d.setFromNormalAndCoplanarPoint(i.object.up,i.target),Rs.intersectPlane($d,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/d)),i.object.updateProjectionMatrix(),se=!0);return d=1,M=!1,se||Be.distanceToSquared(i.object.position)>l||8*(1-je.dot(i.object.quaternion))>l||Ue.distanceToSquared(i.target)>0?(i.dispatchEvent(Xd),Be.copy(i.object.position),je.copy(i.object.quaternion),Ue.copy(i.target),se=!1,!0):!1}})(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",ce),i.domElement.removeEventListener("pointerdown",Ne),i.domElement.removeEventListener("pointercancel",ke),i.domElement.removeEventListener("wheel",C),i.domElement.removeEventListener("pointermove",Fe),i.domElement.removeEventListener("pointerup",ke),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",S),i._domElementKeyEvents=null)};const i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=s.NONE;const l=1e-6,o=new Wd,c=new Wd;let d=1;const u=new q,p=new $e,h=new $e,g=new $e,_=new $e,x=new $e,m=new $e,f=new $e,y=new $e,v=new $e,E=new q,b=new $e;let M=!1;const T=[],N={};function w(j){return j!==null?2*Math.PI/60*i.autoRotateSpeed*j:2*Math.PI/60/60*i.autoRotateSpeed}function A(){return Math.pow(.95,i.zoomSpeed)}function I(j){c.theta-=j}function F(j){c.phi-=j}const $=(function(){const j=new q;return function(le,Be){j.setFromMatrixColumn(Be,0),j.multiplyScalar(-le),u.add(j)}})(),P=(function(){const j=new q;return function(le,Be){i.screenSpacePanning===!0?j.setFromMatrixColumn(Be,1):(j.setFromMatrixColumn(Be,0),j.crossVectors(i.object.up,j)),j.multiplyScalar(le),u.add(j)}})(),H=(function(){const j=new q;return function(le,Be){const je=i.domElement;if(i.object.isPerspectiveCamera){const Ue=i.object.position;j.copy(Ue).sub(i.target);let Pe=j.length();Pe*=Math.tan(i.object.fov/2*Math.PI/180),$(2*le*Pe/je.clientHeight,i.object.matrix),P(2*Be*Pe/je.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?($(le*(i.object.right-i.object.left)/i.object.zoom/je.clientWidth,i.object.matrix),P(Be*(i.object.top-i.object.bottom)/i.object.zoom/je.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}})();function J(j){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d/=j:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function K(j){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?d*=j:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ae(j){if(!i.zoomToCursor)return;M=!0;const pe=i.domElement.getBoundingClientRect(),le=j.clientX-pe.left,Be=j.clientY-pe.top,je=pe.width,Ue=pe.height;b.x=le/je*2-1,b.y=-(Be/Ue)*2+1,E.set(b.x,b.y,1).unproject(i.object).sub(i.object.position).normalize()}function ee(j){return Math.max(i.minDistance,Math.min(i.maxDistance,j))}function ie(j){p.set(j.clientX,j.clientY)}function D(j){ae(j),f.set(j.clientX,j.clientY)}function L(j){_.set(j.clientX,j.clientY)}function V(j){h.set(j.clientX,j.clientY),g.subVectors(h,p).multiplyScalar(i.rotateSpeed);const pe=i.domElement;I(2*Math.PI*g.x/pe.clientHeight),F(2*Math.PI*g.y/pe.clientHeight),p.copy(h),i.update()}function B(j){y.set(j.clientX,j.clientY),v.subVectors(y,f),v.y>0?J(A()):v.y<0&&K(A()),f.copy(y),i.update()}function Q(j){x.set(j.clientX,j.clientY),m.subVectors(x,_).multiplyScalar(i.panSpeed),H(m.x,m.y),_.copy(x),i.update()}function O(j){ae(j),j.deltaY<0?K(A()):j.deltaY>0&&J(A()),i.update()}function _e(j){let pe=!1;switch(j.code){case i.keys.UP:j.ctrlKey||j.metaKey||j.shiftKey?F(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(0,i.keyPanSpeed),pe=!0;break;case i.keys.BOTTOM:j.ctrlKey||j.metaKey||j.shiftKey?F(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(0,-i.keyPanSpeed),pe=!0;break;case i.keys.LEFT:j.ctrlKey||j.metaKey||j.shiftKey?I(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(i.keyPanSpeed,0),pe=!0;break;case i.keys.RIGHT:j.ctrlKey||j.metaKey||j.shiftKey?I(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):H(-i.keyPanSpeed,0),pe=!0;break}pe&&(j.preventDefault(),i.update())}function Y(){if(T.length===1)p.set(T[0].pageX,T[0].pageY);else{const j=.5*(T[0].pageX+T[1].pageX),pe=.5*(T[0].pageY+T[1].pageY);p.set(j,pe)}}function Se(){if(T.length===1)_.set(T[0].pageX,T[0].pageY);else{const j=.5*(T[0].pageX+T[1].pageX),pe=.5*(T[0].pageY+T[1].pageY);_.set(j,pe)}}function Me(){const j=T[0].pageX-T[1].pageX,pe=T[0].pageY-T[1].pageY,le=Math.sqrt(j*j+pe*pe);f.set(0,le)}function oe(){i.enableZoom&&Me(),i.enablePan&&Se()}function U(){i.enableZoom&&Me(),i.enableRotate&&Y()}function Ze(j){if(T.length==1)h.set(j.pageX,j.pageY);else{const le=we(j),Be=.5*(j.pageX+le.x),je=.5*(j.pageY+le.y);h.set(Be,je)}g.subVectors(h,p).multiplyScalar(i.rotateSpeed);const pe=i.domElement;I(2*Math.PI*g.x/pe.clientHeight),F(2*Math.PI*g.y/pe.clientHeight),p.copy(h)}function ye(j){if(T.length===1)x.set(j.pageX,j.pageY);else{const pe=we(j),le=.5*(j.pageX+pe.x),Be=.5*(j.pageY+pe.y);x.set(le,Be)}m.subVectors(x,_).multiplyScalar(i.panSpeed),H(m.x,m.y),_.copy(x)}function me(j){const pe=we(j),le=j.pageX-pe.x,Be=j.pageY-pe.y,je=Math.sqrt(le*le+Be*Be);y.set(0,je),v.set(0,Math.pow(y.y/f.y,i.zoomSpeed)),J(v.y),f.copy(y)}function Ae(j){i.enableZoom&&me(j),i.enablePan&&ye(j)}function Ce(j){i.enableZoom&&me(j),i.enableRotate&&Ze(j)}function Ne(j){i.enabled!==!1&&(T.length===0&&(i.domElement.setPointerCapture(j.pointerId),i.domElement.addEventListener("pointermove",Fe),i.domElement.addEventListener("pointerup",ke)),de(j),j.pointerType==="touch"?W(j):ht(j))}function Fe(j){i.enabled!==!1&&(j.pointerType==="touch"?he(j):xt(j))}function ke(j){Le(j),T.length===0&&(i.domElement.releasePointerCapture(j.pointerId),i.domElement.removeEventListener("pointermove",Fe),i.domElement.removeEventListener("pointerup",ke)),i.dispatchEvent(qd),a=s.NONE}function ht(j){let pe;switch(j.button){case 0:pe=i.mouseButtons.LEFT;break;case 1:pe=i.mouseButtons.MIDDLE;break;case 2:pe=i.mouseButtons.RIGHT;break;default:pe=-1}switch(pe){case Li.DOLLY:if(i.enableZoom===!1)return;D(j),a=s.DOLLY;break;case Li.ROTATE:if(j.ctrlKey||j.metaKey||j.shiftKey){if(i.enablePan===!1)return;L(j),a=s.PAN}else{if(i.enableRotate===!1)return;ie(j),a=s.ROTATE}break;case Li.PAN:if(j.ctrlKey||j.metaKey||j.shiftKey){if(i.enableRotate===!1)return;ie(j),a=s.ROTATE}else{if(i.enablePan===!1)return;L(j),a=s.PAN}break;default:a=s.NONE}a!==s.NONE&&i.dispatchEvent(_o)}function xt(j){switch(a){case s.ROTATE:if(i.enableRotate===!1)return;V(j);break;case s.DOLLY:if(i.enableZoom===!1)return;B(j);break;case s.PAN:if(i.enablePan===!1)return;Q(j);break}}function C(j){i.enabled===!1||i.enableZoom===!1||a!==s.NONE||(j.preventDefault(),i.dispatchEvent(_o),O(j),i.dispatchEvent(qd))}function S(j){i.enabled===!1||i.enablePan===!1||_e(j)}function W(j){switch(ge(j),T.length){case 1:switch(i.touches.ONE){case ji.ROTATE:if(i.enableRotate===!1)return;Y(),a=s.TOUCH_ROTATE;break;case ji.PAN:if(i.enablePan===!1)return;Se(),a=s.TOUCH_PAN;break;default:a=s.NONE}break;case 2:switch(i.touches.TWO){case ji.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;oe(),a=s.TOUCH_DOLLY_PAN;break;case ji.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;U(),a=s.TOUCH_DOLLY_ROTATE;break;default:a=s.NONE}break;default:a=s.NONE}a!==s.NONE&&i.dispatchEvent(_o)}function he(j){switch(ge(j),a){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ze(j),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;ye(j),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ae(j),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ce(j),i.update();break;default:a=s.NONE}}function ce(j){i.enabled!==!1&&j.preventDefault()}function de(j){T.push(j)}function Le(j){delete N[j.pointerId];for(let pe=0;pe<T.length;pe++)if(T[pe].pointerId==j.pointerId){T.splice(pe,1);return}}function ge(j){let pe=N[j.pointerId];pe===void 0&&(pe=new $e,N[j.pointerId]=pe),pe.set(j.pageX,j.pageY)}function we(j){const pe=j.pointerId===T[0].pointerId?T[1]:T[0];return N[pe.pointerId]}i.domElement.addEventListener("contextmenu",ce),i.domElement.addEventListener("pointerdown",Ne),i.domElement.addEventListener("pointercancel",ke),i.domElement.addEventListener("wheel",C,{passive:!1}),this.update()}}class d1{state={isSupported:!1,isSessionActive:!1};onFrameCallback;lastFrameTime=0;constructor(){this.checkSupport()}async checkSupport(){if("xr"in navigator)try{this.state.isSupported=await navigator.xr.isSessionSupported("immersive-vr"),console.log("WebXR VR support:",this.state.isSupported)}catch(e){console.error("Error checking WebXR support:",e),this.state.isSupported=!1}else console.log("WebXR not supported in this browser"),this.state.isSupported=!1}async requestSession(e={}){if(!this.state.isSupported)return console.error("WebXR is not supported"),!1;try{const t=e.requiredFeatures||["local-floor"],i=[...e.optionalFeatures||[],"hand-tracking","dom-overlay","layers"],s=await navigator.xr.requestSession("immersive-vr",{requiredFeatures:t,optionalFeatures:i});return this.state.session=s,this.state.isSessionActive=!0,s.addEventListener("end",this.onSessionEnded.bind(this)),s.addEventListener("inputsourceschange",this.onInputSourcesChange.bind(this)),this.state.referenceSpace=await s.requestReferenceSpace("local-floor"),s.requestAnimationFrame(this.onXRFrame.bind(this)),console.log("WebXR session started successfully"),!0}catch(t){return console.error("Error requesting WebXR session:",t),!1}}onXRFrame(e,t){this.state.frame=t,this.state.referenceSpace&&(this.state.viewerPose=t.getViewerPose(this.state.referenceSpace));const i=this.lastFrameTime>0?(e-this.lastFrameTime)/1e3:0;this.lastFrameTime=e,this.onFrameCallback&&this.onFrameCallback(t,i),this.state.session&&this.state.session.requestAnimationFrame(this.onXRFrame.bind(this))}onSessionEnded(){this.state.isSessionActive=!1,this.state.session=void 0,this.state.referenceSpace=void 0,this.state.viewerPose=void 0,console.log("WebXR session ended")}onInputSourcesChange(e){if(console.log("XR Input Sources Changed:",e),this.state.session){const t=this.state.session.inputSources;console.log("Current input sources:",t)}}setFrameCallback(e){this.onFrameCallback=e}getViewerPose(){return this.state.viewerPose}getReferenceSpace(){return this.state.referenceSpace}getSession(){return this.state.session}getFrame(){return this.state.frame}getState(){return{...this.state}}async exitSession(){this.state.session&&await this.state.session.end()}getSupportedFeatures(){return["local-floor","bounded-floor","unbounded","viewer","hand-tracking","dom-overlay","layers"]}isFeatureSupported(e){return this.getSupportedFeatures().includes(e)}xrPoseToThreeJS(e){if(!e||!e.transform)return{position:new q,rotation:new lr};const t=e.transform.position,i=e.transform.orientation;return{position:new q(t.x,t.y,t.z),rotation:new lr().setFromQuaternion({x:i.x,y:i.y,z:i.z,w:i.w})}}getHandJointPositions(e,t){if(e.hand&&this.state.frame){const i=new Map;for(const s of e.hand.keys()){const a=this.state.frame.getJointPose(e.hand.get(s),t);if(a){const l=a.transform.position;i.set(s,new q(l.x,l.y,l.z))}}return i}return null}}const fi=new d1,u1=re.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,h1=re.div`
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
`,f1=({artworks:n,onArtworkSelect:e,onExitVR:t})=>{const i=z.useRef(null),[s,a]=z.useState(!1),[l,o]=z.useState(!1),[c,d]=z.useState(!0),u=z.useRef(null),p=z.useRef(null),h=z.useRef(null),g=z.useRef(null),_=z.useRef(null),x=z.useRef([]);z.useEffect(()=>{if(!i.current)return;(async()=>{const $=fi.getState();a($.isSupported)})();const T=new rf;T.background=new ot(1118483),u.current=T;const N=new $t(75,window.innerWidth/window.innerHeight,.1,1e3);N.position.set(0,1.6,5),p.current=N;const w=new _l({antialias:!0});w.setSize(window.innerWidth,window.innerHeight),w.setPixelRatio(window.devicePixelRatio),w.shadowMap.enabled=!0,w.xr.enabled=!0,i.current.appendChild(w.domElement),h.current=w,m(T),f(T),v(T,n);const A=new cf(N,w.domElement);A.enableDamping=!0,A.dampingFactor=.05,g.current=A;const I=()=>{N&&w&&(N.aspect=window.innerWidth/window.innerHeight,N.updateProjectionMatrix(),w.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",I);const F=()=>{_.current=requestAnimationFrame(F),A&&!w.xr.isPresenting&&A.update(),w&&w.render(T,N)};return F(),d(!1),()=>{window.removeEventListener("resize",I),_.current&&cancelAnimationFrame(_.current),i.current&&w?.domElement&&i.current.removeChild(w.domElement),w&&w.dispose()}},[n]);const m=M=>{const T=new lf(16777215,.6);M.add(T);const N=new of(16777215,.8);N.position.set(5,10,7),N.castShadow=!0,M.add(N),n.forEach((w,A)=>{const I=new af(16777215,.8);I.position.set(-6+A%4*4,4,-8+Math.floor(A/4)*-4),I.castShadow=!0,I.angle=Math.PI/6,I.penumbra=.2,I.decay=2,I.distance=200,M.add(I)})},f=M=>{const T=new Bn(40,40),N=new dn({color:3355443,roughness:.8,metalness:.2}),w=new mt(T,N);w.rotation.x=-Math.PI/2,w.receiveShadow=!0,M.add(w);const A=new Hn(40,8,.5),I=new dn({color:4473924,roughness:.7,metalness:.3}),F=new mt(A,I);F.position.z=-20,F.position.y=4,F.castShadow=!1,F.receiveShadow=!0,M.add(F);const $=new mt(A,I);$.position.x=-20,$.position.y=4,$.rotation.y=Math.PI/2,$.castShadow=!1,$.receiveShadow=!0,M.add($);const P=new mt(A,I);P.position.x=20,P.position.y=4,P.rotation.y=Math.PI/2,P.castShadow=!1,P.receiveShadow=!0,M.add(P);const H=new Bn(40,40),J=new dn({color:2236962,roughness:.9,metalness:.1}),K=new mt(H,J);K.rotation.x=Math.PI/2,K.position.y=8,K.castShadow=!1,M.add(K),y(M)},y=M=>{const T=new ba(.5,.5,8,16),N=new dn({color:8947848,roughness:.6,metalness:.2});for(let w=0;w<4;w++){const A=new mt(T,N);A.position.x=-15+w*10,A.position.z=-18,A.position.y=4,A.castShadow=!0,A.receiveShadow=!0,M.add(A)}},v=(M,T)=>{x.current.forEach(I=>M.remove(I)),x.current=[];const N=Math.ceil(Math.sqrt(T.length)),w=Math.ceil(T.length/N),A=4;T.forEach((I,F)=>{const $=Math.floor(F/w),H=(F%w-(w-1)/2)*A,J=-($-(N-1)/2)*A-19,K=2,ae=new Hn(2.5,2.5,.1),ee=new dn({color:9127187,metalness:.3,roughness:.7}),ie=new mt(ae,ee);ie.position.set(H,K,J),ie.userData={type:"artwork",artworkId:I.artwork_id,artwork:I},M.add(ie),x.current.push(ie);const D=new Bn(2.3,2.3),L=new dn({color:11184810,emissive:3355443,roughness:.5,metalness:.1}),V=new mt(D,L);V.position.set(H,K,J+.06),V.userData={type:"artwork",artworkId:I.artwork_id,artwork:I},M.add(V),x.current.push(V),ie.addEventListener("click",()=>{e(I)})})},E=async()=>{if(!s){console.error("WebXR is not supported in this browser");return}try{await fi.requestSession({requiredFeatures:["local-floor"],optionalFeatures:["hand-tracking"]})&&h.current?(h.current.xr.enabled=!0,fi.setFrameCallback((T,N)=>{if(fi.getViewerPose()&&p.current){const w=fi.getViewerPose();w&&w.views&&w.views.length>0}}),o(!0),console.log("Entered VR mode")):console.error("Failed to enter VR mode")}catch(M){console.error("Error entering VR mode:",M)}},b=async()=>{fi.getSession()&&await fi.exitSession(),h.current&&(h.current.xr.enabled=!1),o(!1),console.log("Exited VR mode")};return r.jsxs(u1,{ref:i,children:[c&&r.jsx("div",{children:"Loading VR Gallery..."}),r.jsxs(h1,{children:[r.jsxs("div",{children:[r.jsx("h3",{children:"Virtual Gallery"}),r.jsxs("p",{children:[l?"In VR Mode":"In Desktop Mode"," • ",n.length," artworks displayed"]})]}),r.jsxs("div",{children:[l?r.jsx(yo,{onClick:b,children:"Exit VR Mode"}):r.jsx(yo,{onClick:E,disabled:!s,children:s?"Enter VR Mode":"VR Not Supported"}),r.jsx(yo,{onClick:t,children:"Back to Gallery"})]})]})]})},p1=()=>{const[n,e]=z.useState([]),[t,i]=z.useState(!0),[s,a]=z.useState(null);z.useEffect(()=>{(async()=>{try{const d=await gt.get("http://localhost:5000/api/artworks");e(d.data)}catch(d){console.error("Error fetching artworks:",d),a("Failed to load artworks")}finally{i(!1)}})()},[]);const l=c=>{console.log("Selected artwork:",c)},o=()=>{window.history.back()};return t?r.jsx("div",{children:"Loading VR Gallery..."}):s?r.jsxs("div",{children:["Error: ",s]}):r.jsx(f1,{artworks:n,onArtworkSelect:l,onExitVR:o})},df=z.forwardRef(({className:n,type:e,...t},i)=>r.jsx("input",{type:e,className:Wt("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n),ref:i,...t}));df.displayName="Input";const m1=Mf,g1=Tf,uf=z.forwardRef(({className:n,children:e,...t},i)=>r.jsxs(ou,{ref:i,className:Wt("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",n),...t,children:[e,r.jsx(yf,{asChild:!0,children:r.jsx(Dp,{className:"h-4 w-4 opacity-50"})})]}));uf.displayName=ou.displayName;const hf=z.forwardRef(({className:n,children:e,position:t="popper",...i},s)=>r.jsx(bf,{children:r.jsx(lu,{ref:s,className:Wt("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",n),position:t,...i,children:r.jsx(wf,{className:Wt("p-1",t==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:e})})}));hf.displayName=lu.displayName;const x1=z.forwardRef(({className:n,...e},t)=>r.jsx(cu,{ref:t,className:Wt("py-1.5 pl-8 pr-2 text-sm font-semibold",n),...e}));x1.displayName=cu.displayName;const Zo=z.forwardRef(({className:n,children:e,...t},i)=>r.jsxs(du,{ref:i,className:Wt("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",n),...t,children:[r.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(Sf,{children:r.jsx(jp,{className:"h-4 w-4"})})}),r.jsx(Ef,{children:e})]}));Zo.displayName=du.displayName;const v1=z.forwardRef(({className:n,...e},t)=>r.jsx(uu,{ref:t,className:Wt("-mx-1 my-1 h-px bg-muted",n),...e}));v1.displayName=uu.displayName;const _1=()=>{const{id:n}=la(),[e,t]=z.useState(null),[i,s]=z.useState([]),[a,l]=z.useState(""),[o,c]=z.useState("all");if(z.useEffect(()=>{const u={id:"1",name:"Галерея современного искусства",description:"Коллекция современных произведений искусства от ведущих художников 21 века.",location:"Центральный район, ул. Искусств, 15",openingHours:"Ежедневно 10:00-20:00",visitorCount:12500,artworks:[{id:"1",title:"Абстрактная композиция №1",artist:"Александр Петров",year:2020,description:"Экспериментальная работа, исследующая взаимодействие цвета и формы.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","современное","краски"]},{id:"2",title:"Городской пейзаж",artist:"Мария Иванова",year:2022,description:"Реалистичное изображение городской архитектуры в вечернем свете.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","реализм","город"]},{id:"3",title:"Цифровая инсталляция",artist:"Анна Смирнова",year:2023,description:"Интерактивная инсталляция, реагирующая на движения посетителей.",imageUrl:"/placeholder-artwork.jpg",tags:["цифровое","инсталляция","интерактив"]}]};t(u),s(u.artworks)},[n]),z.useEffect(()=>{if(!e)return;let u=e.artworks;a&&(u=u.filter(p=>p.title.toLowerCase().includes(a.toLowerCase())||p.artist.toLowerCase().includes(a.toLowerCase()))),o!=="all"&&(u=u.filter(p=>p.tags.includes(o))),s(u)},[a,o,e]),!e)return r.jsx("div",{className:"container mx-auto px-4 py-8 flex justify-center items-center h-64",children:r.jsx("p",{className:"text-lg",children:"Загрузка галереи..."})});const d=Array.from(new Set(e.artworks.flatMap(u=>u.tags)));return r.jsxs("div",{className:"container mx-auto px-4 py-8",children:[r.jsxs("div",{className:"mb-8",children:[r.jsx("h1",{className:"text-4xl font-bold mb-4",children:e.name}),r.jsx("p",{className:"text-lg text-muted-foreground mb-6",children:e.description}),r.jsxs("div",{className:"flex flex-wrap gap-6 mb-6",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx($s,{className:"h-5 w-5 mr-2 text-primary"}),r.jsx("span",{children:e.location})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Si,{className:"h-5 w-5 mr-2 text-primary"}),r.jsx("span",{children:e.openingHours})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(ei,{className:"h-5 w-5 mr-2 text-primary"}),r.jsxs("span",{children:[e.visitorCount.toLocaleString()," посетителей"]})]})]})]}),r.jsxs("div",{className:"flex flex-col md:flex-row gap-6 mb-8",children:[r.jsx("div",{className:"flex-1",children:r.jsxs("div",{className:"relative",children:[r.jsx(ua,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx(df,{placeholder:"Поиск экспонатов...",value:a,onChange:u=>l(u.target.value),className:"pl-10"})]})}),r.jsxs("div",{className:"flex gap-2",children:[r.jsxs(m1,{value:o,onValueChange:c,children:[r.jsxs(uf,{className:"w-[180px]",children:[r.jsx(Pu,{className:"h-4 w-4 mr-2"}),r.jsx(g1,{placeholder:"Фильтр"})]}),r.jsxs(hf,{children:[r.jsx(Zo,{value:"all",children:"Все теги"}),d.map(u=>r.jsx(Zo,{value:u,children:u},u))]})]}),r.jsx(be,{children:"Сортировать"})]})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:i.map(u=>r.jsxs(He,{className:"overflow-hidden",children:[r.jsx("img",{src:u.imageUrl,alt:u.title,className:"w-full h-48 object-cover"}),r.jsxs(Ge,{children:[r.jsx(Ve,{children:u.title}),r.jsxs(Xe,{children:["Автор: ",u.artist,", ",u.year]})]}),r.jsxs(We,{children:[r.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:u.description}),r.jsx("div",{className:"flex flex-wrap gap-2",children:u.tags.map(p=>r.jsx("span",{className:"px-2 py-1 bg-primary/10 text-primary text-xs rounded-full",children:p},p))}),r.jsx(be,{className:"w-full mt-4",children:"Подробнее"})]})]},u.id))}),i.length===0&&r.jsxs("div",{className:"text-center py-12",children:[r.jsx("p",{className:"text-lg text-muted-foreground",children:"Не найдено экспонатов по заданным критериям"}),r.jsx(be,{variant:"outline",className:"mt-4",onClick:()=>{l(""),c("all")},children:"Сбросить фильтры"})]})]})},Yd=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,y1=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,b1=re.h1`
  color: #333;
  margin: 0;
`,w1=re.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,Cs=re.div`
  margin-bottom: 1.5rem;
`,Ns=re.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`,S1=re.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,E1=re.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`,Kd=re.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,Ps=re.button`
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
`;const M1=()=>{const{galleryId:n}=la(),[e,t]=z.useState([]),[i,s]=z.useState([]),[a,l]=z.useState(!0),[o,c]=z.useState(""),[d,u]=z.useState(""),[p,h]=z.useState(""),[g,_]=z.useState(""),[x,m]=z.useState([]),[f,y]=z.useState(null);z.useEffect(()=>{(async()=>{try{if(n){const w=await Nr.getRooms(parseInt(n));t(w);const A=await Qs.getAllArtworks();s(A)}}catch(w){console.error("Ошибка при загрузке данных:",w)}finally{l(!1)}})()},[n]);const v=async N=>{N.preventDefault();try{const w={name:o,description:d,theme:p,region:g,tags:[p],layout_settings:{background_color:"#ffffff",lighting_settings:{ambient_intensity:.6,directional_intensity:.8,color_temperature:6500},wall_configurations:[],navigation_points:[]}},A=await Nr.createRoom(parseInt(n),w);t([...e,A]),T()}catch(w){console.error("Ошибка при создании зала:",w)}},E=async N=>{if(N.preventDefault(),!!f)try{const w={name:o,description:d,theme:p,region:g},A=await Nr.updateRoom(f.room_id,w);t(e.map(I=>I.room_id===A.room_id?A:I)),T()}catch(w){console.error("Ошибка при обновлении зала:",w)}},b=async N=>{if(window.confirm("Вы уверены, что хотите удалить этот зал?"))try{await Nr.deleteRoom(N),t(e.filter(w=>w.room_id!==N))}catch(w){console.error("Ошибка при удалении зала:",w)}},M=N=>{y(N),c(N.name),u(N.description||""),h(N.theme),_(N.region||"")},T=()=>{c(""),u(""),h(""),_(""),m([]),y(null)};return a?r.jsx(Yd,{children:"Загрузка данных..."}):r.jsxs(Yd,{children:[r.jsx(y1,{children:r.jsx(b1,{children:"Управление залами галереи"})}),r.jsxs(w1,{children:[r.jsx("h2",{children:f?"Редактировать зал":"Создать новый зал"}),r.jsxs("form",{onSubmit:f?E:v,children:[r.jsxs(Cs,{children:[r.jsx(Ns,{htmlFor:"name",children:"Название зала:"}),r.jsx(S1,{id:"name",type:"text",value:o,onChange:N=>c(N.target.value),required:!0})]}),r.jsxs(Cs,{children:[r.jsx(Ns,{htmlFor:"description",children:"Описание:"}),r.jsx(E1,{id:"description",value:d,onChange:N=>u(N.target.value)})]}),r.jsxs(Cs,{children:[r.jsx(Ns,{htmlFor:"theme",children:"Тема зала:"}),r.jsxs(Kd,{id:"theme",value:p,onChange:N=>h(N.target.value),required:!0,children:[r.jsx("option",{value:"",children:"Выберите тему"}),r.jsx("option",{value:"impressionism",children:"Импрессионизм"}),r.jsx("option",{value:"sculpture",children:"Скульптура"}),r.jsx("option",{value:"renaissance",children:"Ренессанс"}),r.jsx("option",{value:"contemporary",children:"Современное искусство"}),r.jsx("option",{value:"photography",children:"Фотография"}),r.jsx("option",{value:"asian_art",children:"Азиатское искусство"}),r.jsx("option",{value:"european_art",children:"Европейское искусство"}),r.jsx("option",{value:"american_art",children:"Американское искусство"})]})]}),r.jsxs(Cs,{children:[r.jsx(Ns,{htmlFor:"region",children:"Регион (необязательно):"}),r.jsxs(Kd,{id:"region",value:g,onChange:N=>_(N.target.value),children:[r.jsx("option",{value:"",children:"Выберите регион"}),r.jsx("option",{value:"european",children:"Европейский"}),r.jsx("option",{value:"asian",children:"Азиатский"}),r.jsx("option",{value:"american",children:"Американский"}),r.jsx("option",{value:"african",children:"Африканский"}),r.jsx("option",{value:"middle_eastern",children:"Ближневосточный"})]})]}),r.jsx(Ps,{type:"submit",children:f?"Обновить зал":"Создать зал"}),f&&r.jsx(Ps,{type:"button",style:{marginLeft:"1rem",backgroundColor:"#f44336"},onClick:T,children:"Отмена"})]})]}),r.jsxs("div",{children:[r.jsx("h2",{children:"Существующие залы"}),e.length>0?r.jsx("div",{children:e.map(N=>r.jsxs("div",{style:{border:"1px solid #ddd",borderRadius:"8px",padding:"1rem",marginBottom:"1rem"},children:[r.jsx("h3",{children:N.name}),r.jsxs("p",{children:[r.jsx("strong",{children:"Тема:"})," ",N.theme]}),r.jsxs("p",{children:[r.jsx("strong",{children:"Регион:"})," ",N.region||"Не указан"]}),N.description&&r.jsxs("p",{children:[r.jsx("strong",{children:"Описание:"})," ",N.description]}),r.jsxs("div",{style:{marginTop:"1rem"},children:[r.jsx(Ps,{onClick:()=>M(N),children:"Редактировать"}),r.jsx(Ps,{style:{marginLeft:"0.5rem",backgroundColor:"#f44336"},onClick:()=>b(N.room_id),children:"Удалить"})]})]},N.room_id))}):r.jsx("p",{children:"В этой галерее пока нет залов"})]})]})},T1=re.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,A1=re.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`,R1=re.div`
  padding: 1rem;
`,C1=re.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`,N1=re.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`,P1=re.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`,L1=re.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`,j1=({artwork:n,onClick:e})=>r.jsxs(T1,{onClick:e,children:[r.jsx(A1,{children:n.image_url?r.jsx("img",{src:n.image_url,alt:n.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):r.jsx("span",{children:"Изображение недоступно"})}),r.jsxs(R1,{children:[r.jsx(C1,{children:n.title}),r.jsxs(N1,{children:["Автор: ",n.artist_name]}),r.jsx(P1,{children:n.description?.substring(0,100)+"..."}),r.jsxs(L1,{children:[r.jsx("span",{children:n.year_created||"Неизвестно"}),r.jsx("span",{children:n.medium||"Неизвестно"})]})]})]}),bo=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,D1=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,I1=re.h1`
  color: #333;
  margin: 0;
`,U1=re.p`
  color: #666;
  margin: 0.5rem 0 2rem 0;
`,O1=re.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`,k1=re.button`
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
`,F1=()=>{const{id:n}=la(),e=oa(),[t,i]=z.useState(null),[s,a]=z.useState([]),[l,o]=z.useState(!0);z.useEffect(()=>{(async()=>{try{if(n){const u=await Nr.getRoomById(parseInt(n));i(u);const h=(await Qs.getAllArtworks()).filter(g=>g.tags.some(_=>u.tags.includes(_)));a(h)}}catch(u){console.error("Ошибка при загрузке данных зала:",u)}finally{o(!1)}})()},[n]);const c=()=>{e(-1)};return l?r.jsx(bo,{children:"Загрузка зала..."}):t?r.jsxs(bo,{children:[r.jsx(k1,{onClick:c,children:"← Назад к галерее"}),r.jsx(D1,{children:r.jsxs("div",{children:[r.jsx(I1,{children:t.name}),t.description&&r.jsx(U1,{children:t.description}),r.jsxs("p",{children:[r.jsx("strong",{children:"Тема:"})," ",t.theme]}),t.region&&r.jsxs("p",{children:[r.jsx("strong",{children:"Регион:"})," ",t.region]})]})}),r.jsxs("div",{children:[r.jsx("h2",{children:"Экспонаты в зале"}),s.length>0?r.jsx(O1,{children:s.map(d=>r.jsx(j1,{artwork:d,onClick:()=>e(`/artworks/${d.artwork_id}`)},d.artwork_id))}):r.jsx("p",{children:"В этом зале пока нет экспонатов"})]})]}):r.jsx(bo,{children:"Зал не найден"})},B1=re.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
`,z1=re.div`
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
`,H1=re.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
`,G1=({percentage:n,status:e,showPercentage:t=!0})=>r.jsxs("div",{children:[r.jsx(B1,{children:r.jsx(z1,{percentage:n,children:t&&`${Math.round(n)}%`})}),r.jsx(H1,{children:e})]}),V1=re.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,W1=re.div`
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
`,X1=re.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
`,Zd=re.p`
  color: #666;
  margin: 0.5rem 0;
`,Jd=re.button`
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
`,q1=re.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`,$1=re.div`
  position: relative;
  width: 150px;
  height: 150px;
`,Y1=re.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`,K1=re.button`
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
`;const Z1=({onUploadComplete:n})=>{const[e,t]=z.useState(!1),[i,s]=z.useState([]),[a,l]=z.useState([]),[o,c]=z.useState(null),[d,u]=z.useState(!1),p=z.useRef(null),h=v=>{v.preventDefault(),v.stopPropagation(),v.type==="dragenter"||v.type==="dragover"?t(!0):v.type==="dragleave"&&t(!1)},g=v=>{v.preventDefault(),v.stopPropagation(),t(!1),v.dataTransfer.files&&v.dataTransfer.files[0]&&x(v.dataTransfer.files)},_=v=>{v.preventDefault(),v.target.files&&v.target.files[0]&&x(v.target.files)},x=v=>{const E=Array.from(v),b=E.filter(M=>M.type.startsWith("image/")&&(M.type==="image/jpeg"||M.type==="image/png"||M.type==="image/webp"||M.type==="image/jpg"));if(b.length!==E.length&&alert("Поддерживаются только изображения форматов JPEG, PNG, WebP"),b.length>0){s(T=>[...T,...b]);const M=b.map(T=>URL.createObjectURL(T));l(T=>[...T,...M])}},m=v=>{s(E=>E.filter((b,M)=>M!==v)),l(E=>E.filter((b,M)=>M!==v))},f=async()=>{if(i.length===0){alert("Пожалуйста, выберите изображения для загрузки");return}u(!0),c(0);try{for(let v=0;v<i.length;v++){const E=i[v],b=setInterval(()=>{c(T=>{if(T===null)return 0;const N=T+10;return N>=100?(clearInterval(b),100):N})},200),M=await Yt.uploadImage(E,1);await Yt.analyzeImage(M.artwork_id||1),clearInterval(b),c(100),n(M)}setTimeout(()=>{s([]),l([]),c(null),u(!1),alert("Изображения успешно загружены и отправлены на анализ")},1e3)}catch(v){console.error("Ошибка при загрузке изображений:",v),alert("Ошибка при загрузке изображений"),u(!1),c(null)}},y=()=>{p.current&&p.current.click()};return r.jsxs(V1,{children:[r.jsx("h3",{children:"Загрузка изображений экспонатов"}),r.jsxs(W1,{isDragActive:e,onDragEnter:h,onDragLeave:h,onDragOver:h,onDrop:g,onClick:y,children:[r.jsx(X1,{children:"📁"}),r.jsx(Zd,{children:"Перетащите изображения сюда или нажмите для выбора"}),r.jsx(Zd,{children:"Поддерживаются форматы: JPEG, PNG, WebP"}),r.jsx(Jd,{children:"Выбрать файлы"}),r.jsx("input",{ref:p,type:"file",multiple:!0,accept:"image/jpeg,image/png,image/webp,image/jpg",onChange:_,style:{display:"none"}})]}),o!==null&&r.jsx(G1,{percentage:o,status:o<100?"Загрузка...":"Загрузка завершена"}),a.length>0&&r.jsx(q1,{children:a.map((v,E)=>r.jsxs($1,{children:[r.jsx(Y1,{src:v,alt:`Preview ${E}`}),r.jsx(K1,{onClick:()=>m(E),children:"×"})]},E))}),i.length>0&&r.jsx(Jd,{onClick:f,disabled:d,style:{marginTop:"1rem"},children:d?"Загрузка...":`Загрузить ${i.length} файл(ов)`})]})},J1=re.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
`,Qd=re.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`,Q1=re.div`
  margin: 1rem 0;
`,eE=re.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,tE=re.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${({color:n})=>n};
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
`,nE=re.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
`,iE=re.div`
  height: 100%;
  width: ${({percentage:n})=>`${n}%`};
  background-color: #4caf50;
`,rE=re.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`,ff=({analysis:n,artwork:e,onArtworkChange:t})=>r.jsxs(J1,{children:[r.jsx(Qd,{children:"Результаты ИИ-анализа"}),r.jsxs("div",{children:[r.jsxs("h4",{children:["Предполагаемый стиль: ",r.jsx("strong",{children:n.style})]}),r.jsxs("p",{children:["Доверительная оценка: ",Math.round(n.confidence*100),"%"]}),r.jsx(nE,{children:r.jsx(iE,{percentage:n.confidence*100})})]}),r.jsx("div",{children:r.jsxs("h4",{children:["Оценка периода: ",r.jsx("strong",{children:n.estimated_period})]})}),r.jsxs(Q1,{children:[r.jsx("h4",{children:"Обнаруженные теги:"}),n.tags.map((i,s)=>r.jsx(eE,{children:i},s))]}),r.jsxs("div",{children:[r.jsx("h4",{children:"Доминирующие цвета:"}),r.jsx("div",{children:n.dominant_colors.map((i,s)=>r.jsx(tE,{color:i,title:i},s))})]}),r.jsxs("div",{children:[r.jsx("h4",{children:"Обнаруженные объекты:"}),n.detected_objects.map((i,s)=>r.jsxs(rE,{children:[r.jsxs("div",{children:[r.jsx("strong",{children:i.name})," (доверие: ",Math.round(i.confidence*100),"%)"]}),r.jsxs("div",{children:["Позиция: (",i.bounding_box.x,", ",i.bounding_box.y,"), Размер: ",i.bounding_box.width,"x",i.bounding_box.height]})]},s))]}),r.jsxs("div",{children:[r.jsx("h4",{children:"Качество изображения:"}),r.jsxs("p",{children:["Яркость: ",n.image_quality.brightness.toFixed(2)]}),r.jsxs("p",{children:["Контрастность: ",n.image_quality.contrast.toFixed(2)]}),r.jsxs("p",{children:["Резкость: ",n.image_quality.sharpness.toFixed(2)]}),r.jsxs("p",{children:["Разрешение: ",n.image_quality.resolution.width,"x",n.image_quality.resolution.height]})]}),r.jsx(Qd,{children:"Редактирование карточки экспоната"}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Название:"}),r.jsx("input",{type:"text",value:e.title||"",onChange:i=>t("title",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Имя художника:"}),r.jsx("input",{type:"text",value:e.artist_name||"",onChange:i=>t("artist_name",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Год создания:"}),r.jsx("input",{type:"number",value:e.year_created||"",onChange:i=>t("year_created",i.target.value?parseInt(i.target.value):void 0),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Техника:"}),r.jsx("input",{type:"text",value:e.medium||"",onChange:i=>t("medium",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Стиль:"}),r.jsx("input",{type:"text",value:e.style||"",onChange:i=>t("style",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Описание:"}),r.jsx("textarea",{value:e.description||"",onChange:i=>t("description",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0",minHeight:"100px"}})]})}),r.jsx("div",{children:r.jsxs("label",{children:[r.jsx("strong",{children:"Теги (через запятую):"}),r.jsx("input",{type:"text",value:e.tags?.join(", ")||"",onChange:i=>t("tags",i.target.value.split(",").map(s=>s.trim())),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})})]}),eu=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,sE=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,aE=re.h1`
  color: #333;
  margin: 0;
`,oE=re.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`,Ls=re.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`,js=re.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`,wo=re.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,So=re.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,Rr=re.button`
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
`,lE=re.table`
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
`,cE=re.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:n})=>{switch(n){case"uploaded":return"#2196f3";case"analyzing":return"#ff9800";case"analyzed":return"#4caf50";case"review_pending":return"#9c27b0";case"published":return"#8bc34a";case"rejected":return"#f44336";default:return"#9e9e9e"}}};
  color: white;
`,dE=()=>{const[n,e]=z.useState([]),[t,i]=z.useState(null),[s,a]=z.useState(null),[l,o]=z.useState({}),[c,d]=z.useState(!0),[u,p]=z.useState({totalUploads:0,analyzing:0,analyzed:0,published:0});z.useEffect(()=>{(async()=>{try{const v=await Yt.getUserUploads(1);e(v);const E=v.length,b=v.filter(N=>N.status==="analyzing").length,M=v.filter(N=>N.status==="analyzed").length,T=v.filter(N=>N.status==="published").length;p({totalUploads:E,analyzing:b,analyzed:M,published:T})}catch(v){console.error("Ошибка при загрузке загрузок:",v)}finally{d(!1)}})()},[]);const h=async y=>{e(v=>[...v,y]),p(v=>({...v,totalUploads:v.totalUploads+1,analyzing:v.analyzing+1})),i(y);try{const v=await Yt.getImageAnalysis(y.artwork_id||1);a(v),e(E=>E.map(b=>b.artwork_id===y.artwork_id?{...b,status:"analyzed",analysis_result:v}:b)),p(E=>({...E,analyzing:E.analyzing-1,analyzed:E.analyzed+1}))}catch(v){console.error("Ошибка при загрузке результатов анализа:",v)}},g=async y=>{if(i(y),y.analysis_result)a(y.analysis_result),o(y.artwork_data||{});else try{const v=await Yt.getImageAnalysis(y.artwork_id||1);a(v),o({...y.artwork_data,title:y.original_name.replace(/\.[^/.]+$/,"")})}catch(v){console.error("Ошибка при загрузке результатов анализа:",v)}},_=(y,v)=>{o(E=>({...E,[y]:v}))},x=async()=>{if(!t){alert("Сначала выберите изображение для сохранения");return}try{e(y=>y.map(v=>v.artwork_id===t.artwork_id?{...v,status:"review_pending",artwork_data:l}:v)),p(y=>({...y,analyzed:y.analyzed-1})),alert("Карточка экспоната сохранена и отправлена на проверку")}catch(y){console.error("Ошибка при сохранении карточки:",y),alert("Ошибка при сохранении карточки")}},m=async()=>{if(!t){alert("Сначала выберите изображение для публикации");return}try{e(y=>y.map(v=>v.artwork_id===t.artwork_id?{...v,status:"published"}:v)),p(y=>({...y,analyzed:y.analyzed-1,published:y.published+1})),alert("Экспонат опубликован")}catch(y){console.error("Ошибка при публикации:",y),alert("Ошибка при публикации экспоната")}},f=async()=>{if(!t){alert("Сначала выберите изображение для повторного анализа");return}try{e(v=>v.map(E=>E.artwork_id===t.artwork_id?{...E,status:"analyzing"}:E)),p(v=>({...v,analyzed:v.analyzed-1,analyzing:v.analyzing+1}));const y=await Yt.reanalyzeImage(t.artwork_id||1);a(y),e(v=>v.map(E=>E.artwork_id===t.artwork_id?{...E,status:"analyzed",analysis_result:y}:E)),p(v=>({...v,analyzing:v.analyzing-1,analyzed:v.analyzed+1})),alert("Повторный анализ завершен")}catch(y){console.error("Ошибка при повторном анализе:",y),alert("Ошибка при повторном анализе")}};return c?r.jsx(eu,{children:"Загрузка данных..."}):r.jsxs(eu,{children:[r.jsx(sE,{children:r.jsx(aE,{children:"Дашборд сотрудника музея"})}),r.jsxs(oE,{children:[r.jsxs(Ls,{children:[r.jsx("h3",{children:"Всего загрузок"}),r.jsx(js,{children:u.totalUploads})]}),r.jsxs(Ls,{children:[r.jsx("h3",{children:"На анализе"}),r.jsx(js,{children:u.analyzing})]}),r.jsxs(Ls,{children:[r.jsx("h3",{children:"Проанализировано"}),r.jsx(js,{children:u.analyzed})]}),r.jsxs(Ls,{children:[r.jsx("h3",{children:"Опубликовано"}),r.jsx(js,{children:u.published})]})]}),r.jsxs(wo,{children:[r.jsx(So,{children:"Загрузка новых изображений"}),r.jsx(Z1,{onUploadComplete:h})]}),r.jsxs(wo,{children:[r.jsx(So,{children:"Загруженные изображения"}),r.jsxs(lE,{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Имя файла"}),r.jsx("th",{children:"Дата загрузки"}),r.jsx("th",{children:"Статус"}),r.jsx("th",{children:"Действия"})]})}),r.jsx("tbody",{children:n.map(y=>r.jsxs("tr",{children:[r.jsx("td",{children:y.original_name}),r.jsx("td",{children:new Date(y.upload_date).toLocaleDateString()}),r.jsx("td",{children:r.jsxs(cE,{status:y.status,children:[y.status==="uploaded"&&"Загружено",y.status==="analyzing"&&"Анализируется",y.status==="analyzed"&&"Проанализировано",y.status==="review_pending"&&"На проверке",y.status==="published"&&"Опубликовано",y.status==="rejected"&&"Отклонено"]})}),r.jsxs("td",{children:[r.jsx(Rr,{onClick:()=>g(y),children:t?.artwork_id===y.artwork_id?"Выбрано":"Выбрать"}),y.status==="analyzed"&&r.jsx(Rr,{onClick:f,children:"Повторный анализ"})]})]},y.artwork_id))})]})]}),t&&s&&r.jsxs(wo,{children:[r.jsxs(So,{children:["Анализ изображения: ",t.original_name]}),r.jsx(ff,{analysis:s,artwork:l,onArtworkChange:_}),r.jsx(Rr,{onClick:x,children:"Сохранить карточку и отправить на проверку"}),r.jsx(Rr,{onClick:m,children:"Опубликовать (для подтвержденных карточек)"}),r.jsx(Rr,{onClick:f,children:"Повторный анализ"})]})]})},tu=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,uE=re.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,hE=re.h1`
  color: #333;
  margin: 0;
`,nu=re.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,iu=re.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,Ds=re.button`
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
`,fE=re.table`
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
`,pE=re.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:n})=>{switch(n){case"pending":return"#2196f3";case"approved":return"#4caf50";case"rejected":return"#f44336";case"needs_revision":return"#ff9800";default:return"#9e9e9e"}}};
  color: white;
`,mE=re.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
  min-height: 100px;
`,gE=()=>{const[n,e]=z.useState([]),[t,i]=z.useState(null),[s,a]=z.useState(""),[l,o]=z.useState(!0);z.useEffect(()=>{(async()=>{try{const g=await Yt.getSubmissionsForReview();e(g)}catch(g){console.error("Ошибка при загрузке материалов на проверку:",g)}finally{o(!1)}})()},[]);const c=h=>{i(h),a(h.reviewer_notes||"")},d=async()=>{if(!t){alert("Сначала выберите материал для одобрения");return}try{await Yt.approveSubmission(t.submission_id,{...t.artwork_upload.artwork_data,status:"published",reviewed_by:1,reviewed_at:new Date}),e(h=>h.map(g=>g.submission_id===t.submission_id?{...g,status:"approved"}:g)),alert("Материал одобрен и опубликован")}catch(h){console.error("Ошибка при одобрении материала:",h),alert("Ошибка при одобрении материала")}},u=async()=>{if(!t){alert("Сначала выберите материал для отклонения");return}try{await Yt.rejectSubmission(t.submission_id,s),e(h=>h.map(g=>g.submission_id===t.submission_id?{...g,status:"rejected",reviewer_notes:s}:g)),alert("Материал отклонен")}catch(h){console.error("Ошибка при отклонении материала:",h),alert("Ошибка при отклонении материала")}},p=async()=>{if(!t){alert("Сначала выберите материал для возврата на доработку");return}try{await Yt.rejectSubmission(t.submission_id,s),e(h=>h.map(g=>g.submission_id===t.submission_id?{...g,status:"needs_revision",reviewer_notes:s}:g)),alert("Материал возвращен на доработку")}catch(h){console.error("Ошибка при возврате на доработку:",h),alert("Ошибка при возврате на доработку")}};return l?r.jsx(tu,{children:"Загрузка материалов на проверку..."}):r.jsxs(tu,{children:[r.jsx(uE,{children:r.jsx(hE,{children:"Проверка карточек экспонатов"})}),r.jsxs(nu,{children:[r.jsx(iu,{children:"Материалы на проверке"}),r.jsxs(fE,{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Имя файла"}),r.jsx("th",{children:"Загружено пользователем"}),r.jsx("th",{children:"Дата загрузки"}),r.jsx("th",{children:"Статус"}),r.jsx("th",{children:"Действия"})]})}),r.jsx("tbody",{children:n.map(h=>r.jsxs("tr",{children:[r.jsx("td",{children:h.artwork_upload.original_name}),r.jsx("td",{children:h.submitted_by}),r.jsx("td",{children:new Date(h.submitted_at).toLocaleDateString()}),r.jsx("td",{children:r.jsxs(pE,{status:h.status,children:[h.status==="pending"&&"На проверке",h.status==="approved"&&"Одобрено",h.status==="rejected"&&"Отклонено",h.status==="needs_revision"&&"Требует доработки"]})}),r.jsx("td",{children:r.jsx(Ds,{variant:"primary",onClick:()=>c(h),children:"Просмотреть"})})]},h.submission_id))})]})]}),t&&r.jsxs(nu,{children:[r.jsxs(iu,{children:["Просмотр карточки: ",t.artwork_upload.original_name]}),r.jsx(ff,{analysis:t.artwork_upload.analysis_result,artwork:t.artwork_upload.artwork_data||{},onArtworkChange:()=>{}}),r.jsx(mE,{value:s,onChange:h=>a(h.target.value),placeholder:"Комментарии к проверке (необходимы при отклонении или возврате на доработку)"}),r.jsx(Ds,{variant:"success",onClick:d,children:"Одобрить и опубликовать"}),r.jsx(Ds,{variant:"danger",onClick:u,children:"Отклонить"}),r.jsx(Ds,{variant:"primary",onClick:p,children:"Вернуть на доработку"})]}),n.length===0&&r.jsx("p",{children:"Нет материалов, ожидающих проверки"})]})},xE=re.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,vE=re.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`,_E=re.div`
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
`,yE=re.div`
  font-size: 3rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
`,ru=re.p`
  color: #7f8c8d;
  margin: 0.5rem 0;
`,bE=re.button`
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
`;const wE=re.div`
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`,SE=re.div`
  height: 100%;
  background-color: #3498db;
  width: ${n=>n.width}%;
  transition: width 0.3s ease;
`,EE=re.div`
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
  background-color: ${n=>n.type==="success"?"#d4edda":n.type==="error"?"#f8d7da":"#d1ecf1"};
  color: ${n=>n.type==="success"?"#155724":n.type==="error"?"#721c24":"#0c5460"};
`,ME=re.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e8f4fd;
  border-radius: 4px;
  font-size: 0.9rem;
`,TE=()=>{const[n,e]=z.useState([]),[t,i]=z.useState([]),[s,a]=z.useState(!1),[l,o]=z.useState(0),[c,d]=z.useState(0),[u,p]=z.useState(0),[h,g]=z.useState(!1),[_,x]=z.useState(null),[m,f]=z.useState(1),[y,v]=z.useState("drag"),[E,b]=z.useState(""),[M,T]=z.useState(!1),[N,w]=z.useState(Yt.getCacheInfo()),A=z.useRef(null);z.useEffect(()=>{const L=setInterval(()=>{w(Yt.getCacheInfo())},5e3);return()=>clearInterval(L)},[]);const I=L=>{if(L.target.files&&L.target.files.length>0){const V=Array.from(L.target.files);F(V)}},F=L=>{const V=[];let B="";for(const Q of L)if(Q.type.startsWith("image/")){if(Q.size>10*1024*1024){B="Размер файла не должен превышать 10MB";break}V.push(Q)}else if(y==="archive"&&(Q.type==="application/zip"||Q.name.endsWith(".zip")))V.push(Q);else{B="Пожалуйста, выберите изображения или ZIP-архив с изображениями";break}if(B){x({type:"error",message:B});return}e(Q=>[...Q,...V]),x(null)},$=L=>{L.preventDefault(),a(!0)},P=()=>{a(!1)},H=L=>{if(L.preventDefault(),a(!1),L.dataTransfer.files&&L.dataTransfer.files.length>0){const V=Array.from(L.dataTransfer.files);F(V)}},J=L=>{L.preventDefault(),E.trim()&&(i(V=>[...V,E]),b(""),x({type:"info",message:`Добавлена ссылка: ${E}`}))},K=async()=>{if(n.length===0&&t.length===0){x({type:"error",message:"Пожалуйста, добавьте изображения или ссылки для загрузки"});return}g(!0),o(0),p(0);let L=n.length;y==="archive"&&(L=1),d(L),x({type:"info",message:"Загрузка изображений..."});try{if(y==="archive"&&n.length>0){for(const B of n)if(B.type==="application/zip"||B.name.endsWith(".zip")){x({type:"info",message:`Извлечение файлов из архива ${B.name}...`}),await new Promise(O=>setTimeout(O,1e3));const Q=5;d(Q);for(let O=0;O<Q;O++){p(Y=>Y+1);const _e=Math.round((O+1)/Q*100);o(_e),await new Promise(Y=>setTimeout(Y,200))}}}else for(let B=0;B<n.length;B++){const Q=n[B];p(B+1);const O=Math.round((B+1)/n.length*100);o(O),x({type:"info",message:`Загрузка файла ${B+1} из ${n.length}: ${Q.name}`});const _e=await Yt.uploadImage(Q,m);await new Promise(Y=>setTimeout(Y,300))}for(let B=0;B<t.length;B++){const Q=t[B];p(Y=>Y+1);const O=n.length+t.length,_e=Math.round((n.length+B+1)/O*100);o(_e),x({type:"info",message:`Загрузка по ссылке ${B+1} из ${t.length}: ${Q}`}),await new Promise(Y=>setTimeout(Y,500))}x({type:"success",message:`Все файлы успешно загружены! Обработано: ${n.length} файлов, ${t.length} ссылок.`}),x({type:"info",message:"Запуск ИИ-анализа и генерации миниатюр..."}),await new Promise(B=>setTimeout(B,2e3)),x({type:"success",message:"ИИ-анализ завершен! Миниатюры сгенерированы, водяные знаки добавлены."}),window.confirm("Хотите создать NFT для загруженных произведений?")&&(x({type:"info",message:"Создание NFT..."}),await new Promise(B=>setTimeout(B,1500)),x({type:"success",message:"NFT успешно сформированы и готовы к размещению в блокчейне!"})),e([]),i([]),o(0),p(0),d(0),A.current&&(A.current.value="")}catch(V){console.error("Ошибка при загрузке изображений:",V),x({type:"error",message:`Ошибка при загрузке: ${V.message}`})}finally{g(!1)}},ae=()=>{A.current&&A.current.click()},ee=L=>{e(V=>V.filter((B,Q)=>Q!==L))},ie=L=>{i(V=>V.filter((B,Q)=>Q!==L))},D=()=>{Yt.clearCache(),x({type:"success",message:"Кэш изображений очищен"})};return r.jsxs(xE,{children:[r.jsx(vE,{children:"Загрузка изображений экспонатов"}),r.jsxs("div",{style:{marginBottom:"1rem"},children:[r.jsxs("label",{children:[r.jsx("input",{type:"radio",checked:y==="drag",onChange:()=>v("drag")})," Загрузка файлов"]}),r.jsxs("label",{style:{marginLeft:"1rem"},children:[r.jsx("input",{type:"radio",checked:y==="archive",onChange:()=>v("archive")})," Загрузка архива"]}),r.jsxs("label",{style:{marginLeft:"1rem"},children:[r.jsx("input",{type:"radio",checked:y==="url",onChange:()=>{v("url"),T(!0)}})," Загрузка по ссылке"]})]}),M&&r.jsxs("form",{onSubmit:J,style:{marginBottom:"1rem"},children:[r.jsx("input",{type:"text",value:E,onChange:L=>b(L.target.value),placeholder:"Введите URL изображения",style:{width:"70%",padding:"0.5rem",marginRight:"0.5rem",borderRadius:"4px",border:"1px solid #ccc"}}),r.jsx("button",{type:"submit",style:{padding:"0.5rem 1rem",backgroundColor:"#3498db",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Добавить"})]}),r.jsxs(_E,{isDragOver:s,onDragOver:$,onDragLeave:P,onDrop:H,onClick:y!=="url"?ae:void 0,children:[r.jsx(yE,{children:"📁"}),r.jsx(ru,{children:y==="archive"?"Перетащите ZIP-архив с изображениями сюда или нажмите для выбора":"Перетащите изображения сюда или нажмите для выбора"}),r.jsx(ru,{children:r.jsx("small",{children:y==="archive"?"Поддерживаемые форматы: ZIP (макс. 50MB)":"Поддерживаемые форматы: JPG, PNG, GIF (макс. 10MB)"})}),r.jsx("input",{type:"file",ref:A,onChange:I,accept:y==="archive"?".zip,application/zip":"image/*",multiple:y!=="archive",style:{display:"none"}})]}),n.length>0&&r.jsxs("div",{style:{marginTop:"1rem"},children:[r.jsx("h4",{children:"Выбранные файлы:"}),r.jsx("ul",{children:n.map((L,V)=>r.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("span",{children:[L.name," (",(L.size/1024/1024).toFixed(2)," MB)"]}),r.jsx("button",{onClick:()=>ee(V),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},V))})]}),t.length>0&&r.jsxs("div",{style:{marginTop:"1rem"},children:[r.jsx("h4",{children:"Ссылки для загрузки:"}),r.jsx("ul",{children:t.map((L,V)=>r.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsx("span",{children:L}),r.jsx("button",{onClick:()=>ie(V),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},V))})]}),l>0&&r.jsxs(r.Fragment,{children:[r.jsx(wE,{children:r.jsx(SE,{width:l})}),r.jsxs("div",{style:{textAlign:"center",fontSize:"0.9rem",color:"#7f8c8d"},children:[u," из ",c||n.length+t.length," файлов обработано (",l,"%)"]})]}),_&&r.jsx(EE,{type:_.type,children:_.message}),r.jsxs(ME,{children:[r.jsxs("div",{children:["Кэш изображений: ",(N.size/1024/1024).toFixed(2)," MB / ",(N.maxSize/1024/1024).toFixed(0)," MB"]}),r.jsxs("div",{children:["Количество закэшированных изображений: ",N.count]}),r.jsx("button",{onClick:D,style:{marginTop:"0.5rem",padding:"0.25rem 0.5rem",backgroundColor:"#f39c12",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.8rem"},children:"Очистить кэш"})]}),r.jsx("div",{style:{textAlign:"center"},children:r.jsx(bE,{onClick:K,disabled:n.length===0&&t.length===0||h,children:h?"Загрузка...":"Загрузить и обработать"})})]})},AE=re.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`,RE=re.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,CE=re.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,NE=re.aside`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  overflow-y: auto;
`,PE=re.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #fafafa;
`,LE=re.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: ${n=>n.active?"#34495e":"transparent"};
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`,jE=re.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
`,DE=({title:n,children:e,activeNav:t,onNavClick:i,userRole:s})=>{const a=s==="admin"?["Overview","Users","Artworks","Collections","Exhibitions","Auctions","Reports","Settings"]:["Overview","Artworks","Collections","Exhibitions","Reports"];return r.jsxs(AE,{children:[r.jsxs(RE,{children:[r.jsx(jE,{children:n}),r.jsxs("div",{children:["Welcome, ",s.charAt(0).toUpperCase()+s.slice(1),"!"]})]}),r.jsxs(CE,{children:[r.jsx(NE,{children:a.map(l=>r.jsx(LE,{active:t===l.toLowerCase(),onClick:()=>i(l.toLowerCase()),children:l},l))}),r.jsx(PE,{children:e})]})]})},IE=re.div`
  padding: 2rem;
`,UE=()=>r.jsx(DE,{title:"Загрузка экспонатов",activeNav:"artworks",onNavClick:()=>{},userRole:"admin",children:r.jsx(IE,{children:r.jsx(TE,{})})}),OE=re.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,kE=re.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  max-width: 300px;
`,FE=re.div`
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
`,su=re.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`,BE=({artworks:n,onArtworkClick:e,onExitVR:t})=>{const i=z.useRef(null),s=z.useRef(null),a=z.useRef(null),l=z.useRef(null),o=z.useRef(null),c=z.useRef(null),d=z.useRef({}),u=z.useRef(new l1),p=z.useRef(new $e),[h,g]=z.useState({fps:0,objects:0}),_=z.useRef(new Map);z.useEffect(()=>{if(!i.current)return;const E=new rf;E.background=new ot(1118483),E.fog=new yl(1118483,10,30),s.current=E;const b=new $t(75,window.innerWidth/window.innerHeight,.1,1e3);b.position.set(0,1.6,5),a.current=b;const M=new _l({antialias:!0,powerPreference:"high-performance",alpha:!0});M.setSize(window.innerWidth,window.innerHeight),M.setPixelRatio(Math.min(window.devicePixelRatio,2)),M.shadowMap.enabled=!0,M.shadowMap.type=Rh,M.toneMapping=Nh,M.toneMappingExposure=1.2,M.xr.enabled=!0,i.current.appendChild(M.domElement),l.current=M;const T=x(E);m(E),y(E,n);const N=new cf(b,M.domElement);N.enableDamping=!0,N.dampingFactor=.05,o.current=N;let w=0,A=performance.now();const I=()=>{b&&M&&(b.aspect=window.innerWidth/window.innerHeight,b.updateProjectionMatrix(),M.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",I);const F=()=>{c.current=requestAnimationFrame(F),N&&N.update(),w++;const $=performance.now();if($>=A+1e3){const P=Math.round(w*1e3/($-A));g({fps:P,objects:E.children.length}),w=0,A=$}M&&E&&b&&M.render(E,b)};return F(),()=>{window.removeEventListener("resize",I),c.current&&cancelAnimationFrame(c.current),_.current.forEach($=>$.dispose()),_.current.clear(),i.current&&M?.domElement&&i.current.removeChild(M.domElement),M?.domElement.removeEventListener("click",v),M&&(M.dispose(),E.traverse($=>{$.geometry&&$.geometry.dispose(),$.material&&(Array.isArray($.material)?$.material.forEach(P=>P.dispose()):$.material.dispose())})),T.forEach($=>$.removeFromParent())}},[n]);const x=E=>{const b=[],M=new lf(16777215,.4);E.add(M),b.push(M);const T=new of(16777215,.8);return T.position.set(5,10,7),T.castShadow=!0,T.shadow.mapSize.width=2048,T.shadow.mapSize.height=2048,T.shadow.camera.near=.5,T.shadow.camera.far=50,T.shadow.camera.left=-10,T.shadow.camera.right=10,T.shadow.camera.top=10,T.shadow.camera.bottom=-10,E.add(T),b.push(T),n.slice(0,20).forEach((w,A)=>{const I=new af(16768426,.6);I.position.set(-6+A%4*4,4,-8+Math.floor(A/4)*-4),I.castShadow=!0,I.angle=Math.PI/6,I.penumbra=.2,I.decay=2,I.distance=20,I.shadow.mapSize.width=512,I.shadow.mapSize.height=512,I.shadow.camera.near=.5,I.shadow.camera.far=20,E.add(I),b.push(I)}),b},m=E=>{const b=new Bn(40,40),M=new dn({color:3355443,roughness:.8,metalness:.2}),T=new mt(b,M);T.rotation.x=-Math.PI/2,T.receiveShadow=!0,E.add(T);const N=new Hn(40,8,.5),w=new dn({color:4473924,roughness:.7,metalness:.3}),A=new mt(N,w);A.position.z=-20,A.position.y=4,A.castShadow=!1,A.receiveShadow=!0,E.add(A);const I=new mt(N,w);I.position.x=-20,I.position.y=4,I.rotation.y=Math.PI/2,I.castShadow=!1,I.receiveShadow=!0,E.add(I);const F=new mt(N,w);F.position.x=20,F.position.y=4,F.rotation.y=Math.PI/2,F.castShadow=!1,F.receiveShadow=!0,E.add(F);const $=new Bn(40,40),P=new dn({color:2236962,roughness:.9,metalness:.1}),H=new mt($,P);H.rotation.x=Math.PI/2,H.position.y=8,H.castShadow=!1,E.add(H),f(E)},f=E=>{const b=new ba(.5,.5,8,16),M=new dn({color:8947848,roughness:.6,metalness:.2}),T=new r1(b,M,4),N=new bt;for(let w=0;w<4;w++)N.setPosition(-15+w*10,4,-18),T.setMatrixAt(w,N);T.instanceMatrix.needsUpdate=!0,T.castShadow=!0,T.receiveShadow=!0,E.add(T)},y=(E,b)=>{Object.values(d.current).forEach(M=>{M.parent&&M.parent.remove(M)}),d.current={},b.forEach((M,T)=>{const N=-6+T%4*4,w=-8+Math.floor(T/4)*-4,A=2,I=new Lr;I.position.set(N,A,w),E.add(I);const F=new Hn(2.5,2.5,.1),$=new dn({color:9127187,metalness:.3,roughness:.7}),P=new mt(F,$);P.userData={type:"artwork",artworkId:M.artwork_id,artwork:M},I.add(P);const H=new Bn(2.3,2.3);let J=null;if(M.image_url&&_.current.has(M.image_url))J=_.current.get(M.image_url);else if(M.image_url){const ee=document.createElement("canvas");ee.width=512,ee.height=512;const ie=ee.getContext("2d");ie.fillStyle="#aaaaaa",ie.fillRect(0,0,ee.width,ee.height),ie.fillStyle="#ffffff",ie.font="20px Arial",ie.textAlign="center",ie.fillText(M.title||"Artwork",ee.width/2,ee.height/2);const D=new s1(ee);_.current.set(M.image_url,D),J=D}const K=new dn({map:J||void 0,color:J?16777215:11184810,emissive:J?3355443:2236962,roughness:.5,metalness:.1,side:Mn}),ae=new mt(H,K);ae.position.z=.06,ae.userData={type:"artwork",artworkId:M.artwork_id,artwork:M},I.add(ae),d.current[M.artwork_id]=ae})},v=E=>{if(!a.current||!l.current||!s.current)return;const b=l.current.domElement.getBoundingClientRect();p.current.x=(E.clientX-b.left)/b.width*2-1,p.current.y=-((E.clientY-b.top)/b.height)*2+1,u.current.setFromCamera(p.current,a.current);const M=Object.values(d.current),T=u.current.intersectObjects(M);if(T.length>0){const N=T[0].object;N.userData&&N.userData.artwork&&e(N.userData.artwork)}};return z.useEffect(()=>{const E=l.current?.domElement;if(E)return E.addEventListener("click",v),()=>{E.removeEventListener("click",v)}},[]),r.jsxs(OE,{ref:i,children:[r.jsxs(kE,{children:[r.jsx("h3",{children:"Виртуальная галерея"}),r.jsx("p",{children:"Используйте мышь для навигации по галерее"}),r.jsxs("p",{children:["Всего экспонатов: ",n.length]}),r.jsxs("p",{children:["FPS: ",h.fps]}),r.jsxs("p",{children:["Объектов: ",h.objects]})]}),r.jsxs(FE,{children:[r.jsx(su,{onClick:()=>l.current?.xr.isPresenting?l.current.xr.getSession()?.end():null,children:l.current?.xr.isPresenting?"Выйти из VR":"Войти в VR"}),r.jsx(su,{onClick:t,children:"Назад к галерее"})]})]})},zE=re.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`,HE=re.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`,GE=re.div`
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
`,VE=re.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,WE=re.button`
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
`,XE=re.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,qE=()=>{const[n,e]=z.useState([]),[t,i]=z.useState(!0),[s,a]=z.useState(null),[l,o]=z.useState(null);z.useEffect(()=>{(async()=>{try{const h=await gt.get("http://localhost:5000/api/artworks");e(h.data)}catch(h){console.error("Ошибка при загрузке экспонатов:",h),a("Не удалось загрузить экспонаты")}finally{i(!1)}})()},[]);const c=p=>{o(p)},d=()=>{o(null)},u=()=>{window.history.back()};return t?r.jsx(zE,{children:"Загрузка виртуальной галереи..."}):s?r.jsx(HE,{children:s}):r.jsxs("div",{children:[r.jsx(BE,{artworks:n,onArtworkClick:c,onExitVR:u}),l&&r.jsx(GE,{onClick:d,children:r.jsxs(VE,{onClick:p=>p.stopPropagation(),children:[r.jsx(WE,{onClick:d,children:"×"}),r.jsx("h2",{children:l.title}),r.jsxs("p",{children:[r.jsx("strong",{children:"Художник:"})," ",l.artist_name]}),l.year_created&&r.jsxs("p",{children:[r.jsx("strong",{children:"Год создания:"})," ",l.year_created]}),l.medium&&r.jsxs("p",{children:[r.jsx("strong",{children:"Материал:"})," ",l.medium]}),l.style&&r.jsxs("p",{children:[r.jsx("strong",{children:"Стиль:"})," ",l.style]}),l.dimensions&&r.jsxs("p",{children:[r.jsx("strong",{children:"Размеры:"})," ",l.dimensions]}),l.description&&r.jsxs("p",{children:[r.jsx("strong",{children:"Описание:"})," ",l.description]}),l.image_url&&r.jsx(XE,{src:l.image_url,alt:l.title,onError:p=>{const h=p.target;h.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})},$E=()=>{const[n,e]=z.useState([{id:"1",title:"Абстрактная композиция №1",artist:"Александр Петров",year:2020,description:"Экспериментальная работа, исследующая взаимодействие цвета и формы.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","современное","краски"],likes:124,views:1240,rating:4.7,category:"Живопись",medium:"Масло"},{id:"2",title:"Городской пейзаж",artist:"Мария Иванова",year:2022,description:"Реалистичное изображение городской архитектуры в вечернем свете.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","реализм","город"],likes:89,views:890,rating:4.5,category:"Живопись",medium:"Акварель"},{id:"3",title:"Цифровая инсталляция",artist:"Анна Смирнова",year:2023,description:"Интерактивная инсталляция, реагирующая на движения посетителей.",imageUrl:"/placeholder-artwork.jpg",tags:["цифровое","инсталляция","интерактив"],likes:210,views:2100,rating:4.9,category:"Инсталляция",medium:"Цифровое"},{id:"4",title:"Портрет женщины",artist:"Дмитрий Козлов",year:2019,description:"Выразительный портрет, передающий внутреннее состояние модели.",imageUrl:"/placeholder-artwork.jpg",tags:["портрет","классическое","масло"],likes:156,views:1560,rating:4.6,category:"Портрет",medium:"Масло"},{id:"5",title:"Морской пейзаж",artist:"Елена Васильева",year:2021,description:"Романтичный образ морского побережья в разное время суток.",imageUrl:"/placeholder-artwork.jpg",tags:["пейзаж","романтизм","акварель"],likes:78,views:780,rating:4.3,category:"Пейзаж",medium:"Акварель"},{id:"6",title:"Геометрическая абстракция",artist:"Сергей Новиков",year:2023,description:"Современная интерпретация геометрических форм и линий.",imageUrl:"/placeholder-artwork.jpg",tags:["абстракция","геометрия","современное"],likes:95,views:950,rating:4.4,category:"Живопись",medium:"Акрил"}]),[t,i]=z.useState(""),[s,a]=z.useState("all"),[l,o]=z.useState("rating"),[c,d]=z.useState("grid"),[u,p]=z.useState("all"),[h,g]=z.useState("all"),_=n.filter(y=>{const v=y.title.toLowerCase().includes(t.toLowerCase())||y.artist.toLowerCase().includes(t.toLowerCase())||y.description.toLowerCase().includes(t.toLowerCase()),E=s==="all"||y.tags.includes(s),b=u==="all"||y.category===u,M=h==="all"||y.medium===h;return v&&E&&b&&M}).sort((y,v)=>l==="rating"?v.rating-y.rating:l==="likes"?v.likes-y.likes:l==="views"?v.views-y.views:l==="year"?v.year-y.year:l==="title"?y.title.localeCompare(v.title):0),x=Array.from(new Set(n.flatMap(y=>y.tags))),m=Array.from(new Set(n.map(y=>y.category))),f=Array.from(new Set(n.map(y=>y.medium)));return r.jsxs("div",{className:"container mx-auto px-4 py-8",children:[r.jsxs("div",{className:"mb-8 text-center",children:[r.jsx("h1",{className:"text-4xl font-bold mb-4",children:"Экспонаты галереи"}),r.jsx("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto",children:"Исследуйте разнообразные произведения искусства от талантливых художников со всего мира"})]}),r.jsxs("div",{className:"mb-8",children:[r.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[r.jsxs("div",{className:"flex-1 relative",children:[r.jsx(ua,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx("input",{placeholder:"Поиск экспонатов...",value:t,onChange:y=>i(y.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg"})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsx(be,{variant:c==="grid"?"default":"outline",size:"sm",onClick:()=>d("grid"),children:r.jsx(Du,{className:"h-4 w-4"})}),r.jsx(be,{variant:c==="list"?"default":"outline",size:"sm",onClick:()=>d("list"),children:r.jsx(Iu,{className:"h-4 w-4"})})]})]}),r.jsxs("div",{className:"flex flex-wrap gap-4 mb-6",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(ku,{className:"h-4 w-4 text-muted-foreground"}),r.jsx("span",{className:"text-sm font-medium",children:"Фильтры:"})]}),r.jsxs("div",{className:"flex flex-wrap gap-2",children:[r.jsxs("select",{value:u,onChange:y=>p(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все категории"}),m.map(y=>r.jsx("option",{value:y,children:y},y))]}),r.jsxs("select",{value:h,onChange:y=>g(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все техники"}),f.map(y=>r.jsx("option",{value:y,children:y},y))]}),r.jsxs("select",{value:s,onChange:y=>a(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все теги"}),x.map(y=>r.jsx("option",{value:y,children:y},y))]}),r.jsxs("select",{value:l,onChange:y=>o(y.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"rating",children:"По рейтингу"}),r.jsx("option",{value:"likes",children:"По популярности"}),r.jsx("option",{value:"views",children:"По просмотрам"}),r.jsx("option",{value:"year",children:"По году создания"}),r.jsx("option",{value:"title",children:"По названию"})]})]})]})]}),c==="grid"?r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:_.map(y=>r.jsxs(He,{className:"overflow-hidden flex flex-col h-full group",children:[r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:"bg-muted aspect-square flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsxs("div",{className:"text-center p-8",children:[r.jsx("div",{className:"bg-primary/10 p-4 rounded-full inline-block mb-4",children:r.jsx(Ca,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-bold",children:y.title}),r.jsx("p",{className:"text-muted-foreground",children:y.artist})]})})}),r.jsxs("div",{className:"absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",children:[r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(hn,{className:"h-4 w-4"})}),r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(Ou,{className:"h-4 w-4"})})]})]}),r.jsxs(Ge,{className:"pb-3",children:[r.jsx(Ve,{className:"text-lg",children:y.title}),r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs(Xe,{children:["Автор: ",y.artist]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:y.rating.toFixed(1)})]})]})]}),r.jsx(We,{className:"flex-grow",children:r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Dl,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:y.year})]}),r.jsx("p",{className:"text-sm text-muted-foreground line-clamp-2",children:y.description}),r.jsx("div",{className:"flex flex-wrap gap-2 mt-2",children:y.tags.map(v=>r.jsx(yt,{variant:"secondary",className:"text-xs",children:v},v))}),r.jsxs("div",{className:"flex justify-between text-sm mt-4 pt-4 border-t",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(hn,{className:"h-4 w-4 mr-1 text-red-500"}),r.jsx("span",{children:y.likes})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:y.views})]}),r.jsxs(be,{variant:"outline",size:"sm",className:"text-xs",children:[r.jsx(Ca,{className:"h-3 w-3 mr-1"}),"Профиль художника"]})]}),r.jsxs(be,{className:"w-full mt-4",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Подробнее"]})]})})]},y.id))}):r.jsx("div",{className:"space-y-4",children:_.map(y=>r.jsxs(He,{className:"flex flex-col sm:flex-row",children:[r.jsx("div",{className:"bg-muted sm:w-48 aspect-square sm:aspect-auto flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsx(Ca,{className:"h-12 w-12 text-primary"})})}),r.jsxs("div",{className:"flex-1 flex flex-col",children:[r.jsx(Ge,{className:"pb-3 sm:pb-2",children:r.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2",children:[r.jsxs("div",{children:[r.jsx(Ve,{className:"text-xl",children:y.title}),r.jsxs(Xe,{children:["Автор: ",y.artist]})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:y.rating.toFixed(1)})]})]})}),r.jsxs(We,{className:"flex-1 flex flex-col sm:flex-row",children:[r.jsxs("div",{className:"sm:flex-1",children:[r.jsx("p",{className:"text-sm text-muted-foreground mb-3",children:y.description}),r.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:y.tags.map(v=>r.jsx(yt,{variant:"secondary",className:"text-xs",children:v},v))})]}),r.jsxs("div",{className:"flex flex-col justify-between sm:items-end",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground mb-2",children:[r.jsx(Dl,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:y.year})]}),r.jsxs("div",{className:"flex gap-4",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(hn,{className:"h-4 w-4 mr-1 text-red-500"}),r.jsx("span",{children:y.likes})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(Tn,{className:"h-4 w-4 mr-1"}),r.jsx("span",{children:y.views})]})]}),r.jsxs("div",{className:"flex gap-2 mt-4",children:[r.jsxs(be,{variant:"outline",size:"sm",children:[r.jsx(hn,{className:"h-4 w-4 mr-2"}),"Нравится"]}),r.jsxs(be,{size:"sm",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Подробнее"]})]})]})]})]})]},y.id))}),_.length===0&&r.jsxs("div",{className:"text-center py-12",children:[r.jsx("div",{className:"bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",children:r.jsx(Xp,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Экспонаты не найдены"}),r.jsx("p",{className:"text-muted-foreground mb-6",children:"Попробуйте изменить параметры поиска"}),r.jsx(be,{variant:"outline",onClick:()=>{i(""),a("all"),p("all"),g("all")},children:"Сбросить фильтры"})]}),_.length>0&&r.jsx("div",{className:"flex justify-center mt-12",children:r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(be,{variant:"outline",size:"sm",children:"Предыдущая"}),r.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(y=>r.jsx(be,{variant:y===1?"default":"outline",size:"sm",className:"w-10",children:y},y))}),r.jsx(be,{variant:"outline",size:"sm",children:"Следующая"})]})})]})},YE=()=>{const[n,e]=z.useState([{id:"1",name:"Галерея современного искусства",description:"Коллекция современных произведений искусства от ведущих художников 21 века.",location:"Центральный район, ул. Искусств, 15",openingHours:"Ежедневно 10:00-20:00",visitorCount:12500,tags:["современное","экспериментальное","цифровое"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.8,artworksCount:1240},{id:"2",name:"Классическая галерея",description:"Шедевры живописи и скульптуры от мастеров прошлых эпох.",location:"Исторический квартал, пр. Культуры, 42",openingHours:"Пн-Пт 9:00-18:00, Сб-Вс 10:00-17:00",visitorCount:8700,tags:["классическое","живопись","скульптура"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.7,artworksCount:850},{id:"3",name:"Галерея цифрового искусства",description:"Инновационные работы, созданные с использованием цифровых технологий.",location:"Технопарк, здание 5, эт. 3",openingHours:"Круглосуточно",visitorCount:5400,tags:["цифровое","интерактивное","VR"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.6,artworksCount:420},{id:"4",name:"Галерея народного искусства",description:"Традиционные ремесла и народные промыслы со всего мира.",location:"Этноквартал, ул. Ремесел, 7",openingHours:"Пн-Вс 11:00-19:00",visitorCount:3200,tags:["народное","ремесла","традиции"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.5,artworksCount:680},{id:"5",name:"Музей импрессионизма",description:"Коллекция работ импрессионистов 19-го века.",location:"Парк культуры, ул. Художников, 25",openingHours:"Вт-Вс 10:00-18:00",visitorCount:7200,tags:["импрессионизм","19 век","франция"],featured:!0,imageUrl:"/placeholder-gallery.jpg",rating:4.9,artworksCount:320},{id:"6",name:"Современные инсталляции",description:"Интерактивные и мультимедийные инсталляции современных художников.",location:"Арт-квартал, ул. Инноваций, 8",openingHours:"Пн-Сб 12:00-21:00",visitorCount:4100,tags:["инсталляция","интерактив","цифровое"],featured:!1,imageUrl:"/placeholder-gallery.jpg",rating:4.4,artworksCount:150}]),[t,i]=z.useState(""),[s,a]=z.useState("all"),[l,o]=z.useState("rating"),[c,d]=z.useState("grid"),u=n.filter(h=>{const g=h.name.toLowerCase().includes(t.toLowerCase())||h.description.toLowerCase().includes(t.toLowerCase()),_=s==="all"||h.tags.includes(s);return g&&_}).sort((h,g)=>l==="rating"?g.rating-h.rating:l==="visitors"?g.visitorCount-h.visitorCount:l==="artworks"?g.artworksCount-h.artworksCount:l==="name"?h.name.localeCompare(g.name):0),p=Array.from(new Set(n.flatMap(h=>h.tags)));return r.jsxs("div",{className:"container mx-auto px-4 py-8",children:[r.jsxs("div",{className:"mb-8 text-center",children:[r.jsx("h1",{className:"text-4xl font-bold mb-4",children:"Виртуальные галереи"}),r.jsx("p",{className:"text-xl text-muted-foreground max-w-2xl mx-auto",children:"Исследуйте разнообразные коллекции искусства со всего мира в immersive 3D-окружении"})]}),r.jsxs("div",{className:"mb-8",children:[r.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-6",children:[r.jsxs("div",{className:"flex-1 relative",children:[r.jsx(ua,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"}),r.jsx("input",{placeholder:"Поиск галерей...",value:t,onChange:h=>i(h.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg"})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsx(be,{variant:c==="grid"?"default":"outline",size:"sm",onClick:()=>d("grid"),children:r.jsx(Du,{className:"h-4 w-4"})}),r.jsx(be,{variant:c==="list"?"default":"outline",size:"sm",onClick:()=>d("list"),children:r.jsx(Iu,{className:"h-4 w-4"})})]})]}),r.jsxs("div",{className:"flex flex-wrap gap-4 mb-6",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(ku,{className:"h-4 w-4 text-muted-foreground"}),r.jsx("span",{className:"text-sm font-medium",children:"Фильтры:"})]}),r.jsxs("div",{className:"flex flex-wrap gap-2",children:[r.jsxs("select",{value:s,onChange:h=>a(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"all",children:"Все теги"}),p.map(h=>r.jsx("option",{value:h,children:h},h))]}),r.jsxs("select",{value:l,onChange:h=>o(h.target.value),className:"border rounded-lg px-3 py-1.5 text-sm",children:[r.jsx("option",{value:"rating",children:"По рейтингу"}),r.jsx("option",{value:"visitors",children:"По популярности"}),r.jsx("option",{value:"artworks",children:"По числу экспонатов"}),r.jsx("option",{value:"name",children:"По названию"})]})]})]})]}),c==="grid"?r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:u.map(h=>r.jsxs(He,{className:"overflow-hidden flex flex-col h-full group",children:[h.featured&&r.jsx("div",{className:"bg-primary text-primary-foreground text-center py-1 text-sm font-medium",children:"Рекомендуем"}),r.jsxs("div",{className:"relative",children:[r.jsx("div",{className:"bg-muted aspect-video flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsxs("div",{className:"text-center p-8",children:[r.jsx("div",{className:"bg-primary/10 p-4 rounded-full inline-block mb-4",children:r.jsx(rn,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-bold",children:h.name}),r.jsx("p",{className:"text-muted-foreground",children:"Галерея"})]})})}),r.jsxs("div",{className:"absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity",children:[r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(hn,{className:"h-4 w-4"})}),r.jsx(be,{size:"icon",variant:"secondary",className:"rounded-full h-8 w-8",children:r.jsx(Ou,{className:"h-4 w-4"})})]})]}),r.jsxs(Ge,{className:"pb-3",children:[r.jsxs("div",{className:"flex justify-between items-start",children:[r.jsx(Ve,{children:h.name}),r.jsxs(yt,{variant:"outline",className:"self-start",children:[h.visitorCount.toLocaleString()," посетителей"]})]}),r.jsx(Xe,{children:h.description})]}),r.jsx(We,{className:"flex-grow",children:r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx($s,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:h.location})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Si,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:h.openingHours})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(rn,{className:"h-4 w-4 mr-2"}),r.jsxs("span",{children:[h.artworksCount," экспонатов"]})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsxs("span",{children:[h.rating.toFixed(1)," (",h.visitorCount," оценок)"]})]}),r.jsx("div",{className:"flex flex-wrap gap-2 mt-4",children:h.tags.map(g=>r.jsx(yt,{variant:"secondary",children:g},g))}),r.jsxs("div",{className:"flex justify-between mt-4 pt-4 border-t",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(ei,{className:"h-4 w-4 mr-1 text-muted-foreground"}),r.jsx("span",{className:"text-sm",children:h.visitorCount.toLocaleString()})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:h.rating.toFixed(1)})]})]}),r.jsxs(be,{className:"w-full mt-4",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Посетить галерею"]})]})})]},h.id))}):r.jsx("div",{className:"space-y-6",children:u.map(h=>r.jsxs(He,{className:"flex flex-col sm:flex-row",children:[r.jsx("div",{className:"bg-muted sm:w-64 aspect-video sm:aspect-auto flex items-center justify-center",children:r.jsx("div",{className:"bg-gradient-to-br from-primary/10 to-secondary/10 w-full h-full flex items-center justify-center",children:r.jsx(rn,{className:"h-16 w-16 text-primary"})})}),r.jsxs("div",{className:"flex-1 flex flex-col",children:[r.jsx(Ge,{className:"pb-3 sm:pb-2",children:r.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(Ve,{children:h.name}),h.featured&&r.jsx(yt,{variant:"default",children:"Рекомендуем"})]}),r.jsx(Xe,{children:h.description})]}),r.jsxs(yt,{variant:"outline",children:[h.visitorCount.toLocaleString()," посетителей"]})]})}),r.jsxs(We,{className:"flex-1 flex flex-col sm:flex-row",children:[r.jsxs("div",{className:"sm:flex-1",children:[r.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4",children:[r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx($s,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:h.location})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(Si,{className:"h-4 w-4 mr-2"}),r.jsx("span",{children:h.openingHours})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(rn,{className:"h-4 w-4 mr-2"}),r.jsxs("span",{children:[h.artworksCount," экспонатов"]})]}),r.jsxs("div",{className:"flex items-center text-sm text-muted-foreground",children:[r.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsxs("span",{children:[h.rating.toFixed(1)," (",h.visitorCount," оценок)"]})]})]}),r.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:h.tags.map(g=>r.jsx(yt,{variant:"secondary",className:"text-xs",children:g},g))})]}),r.jsxs("div",{className:"flex flex-col justify-between sm:items-end",children:[r.jsxs("div",{className:"flex gap-4 mb-4 sm:mb-0",children:[r.jsxs("div",{className:"flex items-center",children:[r.jsx(ei,{className:"h-4 w-4 mr-1 text-muted-foreground"}),r.jsx("span",{className:"text-sm",children:h.visitorCount.toLocaleString()})]}),r.jsxs("div",{className:"flex items-center",children:[r.jsx(kt,{className:"h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"}),r.jsx("span",{className:"text-sm",children:h.rating.toFixed(1)})]})]}),r.jsxs(be,{className:"w-full sm:w-auto",children:[r.jsx(Tn,{className:"h-4 w-4 mr-2"}),"Посетить галерею"]})]})]})]})]},h.id))}),u.length===0&&r.jsxs("div",{className:"text-center py-12",children:[r.jsx("div",{className:"bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",children:r.jsx(rn,{className:"h-12 w-12 text-primary"})}),r.jsx("h3",{className:"text-xl font-semibold mb-2",children:"Галереи не найдены"}),r.jsx("p",{className:"text-muted-foreground mb-6",children:"Попробуйте изменить параметры поиска"}),r.jsx(be,{variant:"outline",onClick:()=>{i(""),a("all")},children:"Сбросить фильтры"})]}),u.length>0&&r.jsx("div",{className:"flex justify-center mt-12",children:r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(be,{variant:"outline",size:"sm",children:"Предыдущая"}),r.jsx("div",{className:"flex gap-1",children:[1,2,3,4,5].map(h=>r.jsx(be,{variant:h===1?"default":"outline",size:"sm",className:"w-10",children:h},h))}),r.jsx(be,{variant:"outline",size:"sm",children:"Следующая"})]})})]})},KE=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`,ZE=()=>r.jsxs(KE,{children:[r.jsx("h1",{children:"Виртуальные туры"}),r.jsx("p",{children:"Здесь будет отображаться информация о доступных виртуальных турах по галерее."})]}),JE=re.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`,QE=()=>r.jsxs(JE,{children:[r.jsx("h1",{children:"Коллекции"}),r.jsx("p",{children:"Здесь будет отображаться информация о различных коллекциях произведений искусства."})]}),eM=[{name:"The Metropolitan Museum of Art",city:"Нью-Йорк, США",description:"Более 490 000 произведений от древности до современности. Открытый API с доступом к изображениям в высоком разрешении.",url:"https://www.metmuseum.org/art/collection",domain:"metmuseum.org",color:"red",badge:"Open Access",badgeColor:"green",icon:"🏛"},{name:"Musée du Louvre",city:"Париж, Франция",description:"Крупнейший музей мира: более 380 000 экспонатов, включая Мону Лизу и Венеру Милосскую. Виртуальные туры по залам.",url:"https://www.louvre.fr/en/online-tours",domain:"louvre.fr",color:"amber",badge:"Virtual Tours",badgeColor:"amber",icon:"👑"},{name:"Государственный Эрмитаж",city:"Санкт-Петербург, Россия",description:"Более 3 миллионов экспонатов: от скифского золота до импрессионистов. Виртуальные экскурсии по залам Зимнего дворца.",url:"https://www.hermitagemuseum.org/wps/portal/hermitage/explore/collections",domain:"hermitagemuseum.org",color:"emerald",badge:"Virtual Tours",badgeColor:"emerald",icon:"🏰"},{name:"Rijksmuseum",city:"Амстердам, Нидерланды",description:"Более 700 000 объектов голландского и мирового искусства. Rijksstudio позволяет скачивать изображения бесплатно.",url:"https://www.rijksmuseum.nl/en/rijksstudio",domain:"rijksmuseum.nl",color:"orange",badge:"Open Access",badgeColor:"green",icon:"🖼"},{name:"The National Gallery",city:"Лондон, Великобритания",description:"Более 2 600 картин XIII-XX веков: Леонардо, Рембрандт, Тёрнер, Ван Гог. Детальные описания каждого полотна.",url:"https://www.nationalgallery.org.uk/paintings",domain:"nationalgallery.org.uk",color:"indigo",badge:"Free Access",badgeColor:"indigo",icon:"🎨"},{name:"Google Arts & Culture",city:"2 000+ музеев мира",description:"Единая платформа доступа к коллекциям тысяч музеев. Art Camera — сверхвысокое разрешение, виртуальные туры 360.",url:"https://artsandculture.google.com/",domain:"artsandculture.google.com",color:"purple",badge:"Open Access",badgeColor:"green",icon:"🔍"},{name:"ГМИИ им. А.С. Пушкина",city:"Москва, Россия",description:"Более 700 000 произведений: от египетских древностей до живописи Ренуара, Моне, Пикассо. Онлайн-каталог коллекций.",url:"https://www.pushkinmuseum.art/data/fonds/index.php?lang=en",domain:"pushkinmuseum.art",color:"rose",badge:"Online Catalog",badgeColor:"rose",icon:"🏛"},{name:"Galleria degli Uffizi",city:"Флоренция, Италия",description:"Шедевры итальянского Возрождения: Боттичелли, Рафаэль, Караваджо. Онлайн-выставки и детальные описания коллекций.",url:"https://www.uffizi.it/en/online-exhibitions",domain:"uffizi.it",color:"teal",badge:"Online Exhibitions",badgeColor:"teal",icon:"☀"},{name:"WikiArt",city:"Визуальная энциклопедия",description:"Более 250 000 произведений 3 600 художников. Удобный поиск по стилям, жанрам и эпохам с подробными описаниями.",url:"https://www.wikiart.org/",domain:"wikiart.org",color:"sky",badge:"Open Access",badgeColor:"green",icon:"🎨"}],tM=[{label:"Виды искусства",description:"Живопись, скульптура, графика, декоративное искусство",question:"Расскажи об основных направлениях в живописи",color:"purple",icon:"🎨"},{label:"Техники",description:"Масло, акварель, темпера, фреска, гравюра",question:"Какие техники живописи существуют?",color:"amber",icon:"🖌"},{label:"История",description:"От античности до современного искусства",question:"Расскажи об основных эпохах в истории искусства",color:"blue",icon:"📜"},{label:"Художники",description:"Биографии, стили и главные произведения мастеров",question:"Расскажи о великих художниках эпохи Возрождения",color:"green",icon:"👤"}],nM=["Что такое импрессионизм?","Техники Ван Гога"],Is={purple:{bg:"bg-purple-100",text:"text-purple-600",border:"hover:border-purple-200",hover:"group-hover:bg-purple-200"},amber:{bg:"bg-amber-100",text:"text-amber-600",border:"hover:border-amber-200",hover:"group-hover:bg-amber-200"},blue:{bg:"bg-blue-100",text:"text-blue-600",border:"hover:border-blue-200",hover:"group-hover:bg-blue-200"},green:{bg:"bg-green-100",text:"text-green-600",border:"hover:border-green-200",hover:"group-hover:bg-green-200"},red:{bg:"bg-red-100",text:"text-red-600",border:"hover:border-red-300",hover:"group-hover:bg-red-200"},orange:{bg:"bg-orange-100",text:"text-orange-600",border:"hover:border-orange-300",hover:"group-hover:bg-orange-200"},indigo:{bg:"bg-indigo-100",text:"text-indigo-600",border:"hover:border-indigo-300",hover:"group-hover:bg-indigo-200"},rose:{bg:"bg-rose-100",text:"text-rose-600",border:"hover:border-rose-300",hover:"group-hover:bg-rose-200"},emerald:{bg:"bg-emerald-100",text:"text-emerald-600",border:"hover:border-emerald-300",hover:"group-hover:bg-emerald-200"},teal:{bg:"bg-teal-100",text:"text-teal-600",border:"hover:border-teal-300",hover:"group-hover:bg-teal-200"},sky:{bg:"bg-sky-100",text:"text-sky-600",border:"hover:border-sky-300",hover:"group-hover:bg-sky-200"}},iM={green:"bg-green-100 text-green-700",amber:"bg-amber-100 text-amber-700",emerald:"bg-emerald-100 text-emerald-700",indigo:"bg-indigo-100 text-indigo-700",rose:"bg-rose-100 text-rose-700",teal:"bg-teal-100 text-teal-700"};function Eo(){return new Date().toLocaleTimeString("ru",{hour:"2-digit",minute:"2-digit"})}const rM=()=>{const[n,e]=z.useState([{role:"assistant",text:"Здравствуйте! Я ваш AI-ассистент по искусству. Могу ответить на вопросы об истории искусства, техниках, художниках на основе загруженных документов.",time:"Только что"}]),[t,i]=z.useState(""),[s,a]=z.useState(!1),[l,o]=z.useState("checking"),[c,d]=z.useState(null),[u,p]=z.useState(!1),h=z.useRef(null);z.useEffect(()=>{g()},[]),z.useEffect(()=>{h.current?.scrollIntoView({behavior:"smooth"})},[n]);async function g(){try{const y=await(await fetch("/api/ai/health")).json();o(y.status==="connected"?"online":"demo")}catch{o("demo")}}async function _(f){const y=(f??t).trim();if(!y||s)return;i("");const v={role:"user",text:y,time:Eo()};e(E=>[...E,v]),a(!0);try{const b=await(await fetch("/api/ai/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:y})})).json(),M=b.reply??b.message??b.answer??"Ответ получен.";e(T=>[...T,{role:"assistant",text:M,time:Eo()}])}catch{e(E=>[...E,{role:"assistant",text:"AI-сервис недоступен. Попробуйте позже или используйте демо-режим.",time:Eo()}])}finally{a(!1)}}function x(f){p(!1),d({url:f.url,name:f.name})}function m(){d(null)}return r.jsxs("div",{className:"min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6",children:[r.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16",children:[r.jsxs("div",{className:"text-center mb-10",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4",children:[r.jsx("span",{children:"📖"}),"Энциклопедия искусства"]}),r.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 mb-4",children:"ArtWiki"}),r.jsx("p",{className:"text-gray-600 max-w-2xl mx-auto text-lg",children:"Ваш персональный гид в мире искусства. Задайте вопрос AI-ассистенту и получите ответ на основе обширной базы знаний."})]}),r.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mb-10",children:tM.map(f=>{const y=Is[f.color]??Is.purple;return r.jsxs("button",{onClick:()=>_(f.question),className:`bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-gray-100 ${y.border} hover:shadow-md transition-all cursor-pointer group text-left`,children:[r.jsx("div",{className:`w-10 h-10 ${y.bg} rounded-lg flex items-center justify-center mb-3 ${y.hover} transition-colors`,children:r.jsx("span",{className:"text-xl",children:f.icon})}),r.jsx("h3",{className:"font-semibold text-gray-900 text-sm mb-1",children:f.label}),r.jsx("p",{className:"text-xs text-gray-500",children:f.description})]},f.label)})}),r.jsxs("div",{className:"max-w-2xl mx-auto mb-12",children:[r.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[r.jsx("div",{className:"w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center",children:r.jsx("span",{className:"text-xl",children:"🤖"})}),r.jsx("h2",{className:"text-2xl font-semibold text-gray-900",children:"AI Ассистент"})]}),r.jsxs("div",{className:"bg-white/95 rounded-2xl shadow-xl border border-gray-100 overflow-hidden",children:[r.jsx("div",{className:"bg-gradient-to-r from-indigo-600 to-purple-600 p-4",children:r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center",children:r.jsx("span",{className:"text-xl",children:"🤖"})}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-lg font-semibold text-white",children:"Art Assistant"}),r.jsx("p",{className:"text-white/70 text-xs",children:"Эксперт по истории искусства"})]}),r.jsxs("span",{className:`ml-auto px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur-sm ${l==="online"?"bg-white/20 text-white":l==="demo"?"bg-amber-500/20 text-white":"bg-white/20 text-white"}`,children:[r.jsx("span",{className:`w-2 h-2 rounded-full ${l==="online"?"bg-green-400":l==="demo"?"bg-amber-400":"bg-gray-400 animate-pulse"}`}),l==="online"?"Онлайн":l==="demo"?"Демо-режим":"Проверка..."]})]})}),r.jsxs("div",{className:"h-80 overflow-y-auto p-4 space-y-4 bg-gray-50",children:[n.map((f,y)=>r.jsxs("div",{className:`flex gap-3 ${f.role==="user"?"flex-row-reverse":""}`,children:[f.role==="assistant"&&r.jsx("div",{className:"w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0",children:r.jsx("span",{className:"text-sm",children:"🤖"})}),r.jsxs("div",{className:`rounded-2xl p-3 max-w-[85%] shadow-sm ${f.role==="assistant"?"bg-white rounded-tl-none":"bg-indigo-600 text-white rounded-tr-none"}`,children:[r.jsx("p",{className:`text-sm ${f.role==="user"?"text-white":"text-gray-700"}`,children:f.text}),r.jsx("p",{className:`text-xs mt-2 ${f.role==="user"?"text-white/60":"text-gray-400"}`,children:f.time})]})]},y)),s&&r.jsxs("div",{className:"flex gap-3",children:[r.jsx("div",{className:"w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0",children:r.jsx("span",{className:"text-sm",children:"🤖"})}),r.jsx("div",{className:"bg-white rounded-2xl rounded-tl-none p-3 shadow-sm",children:r.jsxs("div",{className:"flex gap-1",children:[r.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),r.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),r.jsx("span",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})})]}),r.jsx("div",{ref:h})]}),r.jsxs("div",{className:"px-4 py-3 bg-white border-t border-gray-100",children:[r.jsx("p",{className:"text-xs text-gray-500 mb-2",children:"Быстрые вопросы:"}),r.jsx("div",{className:"flex flex-wrap gap-2",children:nM.map(f=>r.jsx("button",{onClick:()=>_(f),className:"text-xs bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-3 py-1.5 rounded-full transition-colors",children:f},f))})]}),r.jsx("div",{className:"p-4 bg-white border-t border-gray-100",children:r.jsxs("div",{className:"flex gap-3",children:[r.jsx("input",{type:"text",value:t,onChange:f=>i(f.target.value),onKeyDown:f=>{f.key==="Enter"&&_()},placeholder:"Спросите об искусстве...",className:"flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"}),r.jsx("button",{onClick:()=>_(),disabled:s||!t.trim(),className:"bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed",children:"➤"})]})})]})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"text-center mb-8",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-3",children:[r.jsx("span",{children:"🌐"}),"Мировые музеи и коллекции"]}),r.jsx("p",{className:"text-gray-600 max-w-xl mx-auto text-sm",children:"Открытые коллекции крупнейших музеев мира. Нажмите на карточку, чтобы открыть онлайн-коллекцию."})]}),r.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",children:eM.map(f=>{const y=Is[f.color]??Is.purple,v=iM[f.badgeColor]??"bg-green-100 text-green-700";return r.jsxs("button",{onClick:()=>x(f),className:`bg-white/95 rounded-xl p-5 border border-gray-100 ${y.border} hover:shadow-lg transition-all group text-left w-full`,children:[r.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[r.jsx("div",{className:`w-10 h-10 ${y.bg} rounded-lg flex items-center justify-center ${y.hover} transition-colors`,children:r.jsx("span",{className:"text-lg",children:f.icon})}),r.jsxs("div",{children:[r.jsx("h4",{className:"font-semibold text-gray-900 text-sm",children:f.name}),r.jsx("p",{className:"text-xs text-gray-400",children:f.city})]})]}),r.jsx("p",{className:"text-sm text-gray-600 mb-3",children:f.description}),r.jsxs("div",{className:"flex items-center justify-between text-xs",children:[r.jsxs("span",{className:`${y.text} font-medium flex items-center gap-1`,children:["🔗 ",f.domain]}),r.jsx("span",{className:`${v} px-2 py-0.5 rounded-full`,children:f.badge})]})]},f.name)})})]})]}),c&&r.jsxs("div",{className:"fixed inset-0 z-50",children:[r.jsx("div",{className:"absolute inset-0 bg-black/60 backdrop-blur-sm",onClick:m}),r.jsxs("div",{className:"absolute inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden",children:[r.jsxs("div",{className:"flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center",children:r.jsx("span",{children:"🌐"})}),r.jsx("h3",{className:"font-semibold text-gray-900 text-sm md:text-base truncate",children:c.name})]}),r.jsxs("div",{className:"flex items-center gap-2 flex-shrink-0",children:[r.jsxs("a",{href:c.url,target:"_blank",rel:"noopener noreferrer",className:"text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 px-3 py-1.5 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors",children:["🔗 ",r.jsx("span",{className:"hidden sm:inline",children:"Открыть на сайте"})]}),r.jsx("button",{onClick:m,className:"w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700",children:"✕"})]})]}),r.jsxs("div",{className:"flex-1 relative",children:[!u&&r.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-gray-50",children:r.jsxs("div",{className:"text-center",children:[r.jsx("div",{className:"w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"}),r.jsx("p",{className:"text-sm text-gray-500",children:"Загрузка сайта музея..."})]})}),r.jsx("iframe",{src:c.url,className:"w-full h-full border-0",sandbox:"allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox",allowFullScreen:!0,onLoad:()=>p(!0),title:c.name})]})]})]})]})},sM=[{value:"auto",label:"Автоопределение (AI)"},{value:"history",label:"История искусства"},{value:"technique",label:"Техники и материалы"},{value:"artist",label:"Биографии художников"},{value:"period",label:"Периоды и стили"}],aM=[{name:"Импрессионизм_история.pdf",daysAgo:"2 дня назад"},{name:"Техники_масляной_живописи.pdf",daysAgo:"5 дней назад"}],oM=()=>{const[n,e]=z.useState(null),[t,i]=z.useState("auto"),[s,a]=z.useState(!1),[l,o]=z.useState(!1),[c,d]=z.useState(aM),[u,p]=z.useState(null),h=z.useRef(null);function g(b,M){p({type:b,text:M}),setTimeout(()=>p(null),4e3)}function _(b){if(b.type!=="application/pdf"){g("error","Пожалуйста, выберите PDF файл");return}e(b)}function x(){e(null),h.current&&(h.current.value="")}const m=z.useCallback(b=>{b.preventDefault(),a(!1);const M=b.dataTransfer.files;M.length>0&&_(M[0])},[]),f=z.useCallback(b=>{b.preventDefault(),a(!0)},[]),y=z.useCallback(()=>{a(!1)},[]);async function v(){if(!n){g("warning","Пожалуйста, выберите PDF файл");return}o(!0);try{const b="doc_"+Date.now(),M=URL.createObjectURL(n),T=await fetch("/api/ai/process-pdf",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pdfUrl:M,documentId:b,category:t})}),N=await T.json();if(T.ok)g("success","Документ успешно отправлен на обработку! ID: "+b),d(w=>[{name:n.name,daysAgo:"Только что"},...w.slice(0,4)]),x();else{const w=N.hint?" Подсказка: "+N.hint:"";g("error","Ошибка: "+(N.error||"Неизвестная ошибка")+w)}}catch{g("warning","AI/ML сервис недоступен. В демо-режиме документы не обрабатываются.")}finally{o(!1)}}const E={success:"bg-green-600",error:"bg-red-600",warning:"bg-amber-500"};return r.jsxs("div",{className:"min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6",children:[u&&r.jsxs("div",{className:`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-xl ${E[u.type]} transition-all`,children:[r.jsx("span",{children:u.type==="success"?"✓":u.type==="error"?"✕":"⚠"}),r.jsx("p",{className:"text-sm font-medium",children:u.text})]}),r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16",children:r.jsxs("div",{className:"max-w-2xl mx-auto",children:[r.jsxs("div",{className:"text-center mb-12",children:[r.jsxs("div",{className:"inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4",children:[r.jsx("span",{children:"☁"}),"Управление знаниями"]}),r.jsx("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 mb-4",children:"RAG"}),r.jsx("p",{className:"text-gray-600 max-w-2xl mx-auto text-lg",children:"Загрузка и индексация документов для базы знаний AI-ассистента"})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[r.jsx("div",{className:"w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center",children:r.jsx("span",{className:"text-xl",children:"📄"})}),r.jsx("h2",{className:"text-2xl font-semibold text-gray-900",children:"Обработка документов"})]}),r.jsxs("div",{className:"bg-white/95 rounded-2xl p-6 shadow-xl border border-gray-100",children:[r.jsxs("div",{onDrop:m,onDragOver:f,onDragLeave:y,onClick:()=>!n&&h.current?.click(),className:`border-2 border-dashed rounded-xl p-8 text-center transition-colors mb-6 ${n?"border-green-400 bg-green-50":s?"border-green-400 bg-green-50 cursor-copy":"border-gray-300 hover:border-green-400 cursor-pointer"}`,children:[n?r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:r.jsx("span",{className:"text-3xl",children:"✅"})}),r.jsx("p",{className:"text-green-700 font-medium mb-2",children:n.name}),r.jsxs("p",{className:"text-sm text-gray-500",children:[(n.size/1024/1024).toFixed(2)," MB"]}),r.jsx("button",{onClick:b=>{b.stopPropagation(),x()},className:"mt-3 text-sm text-red-600 hover:text-red-700 underline",children:"Удалить"})]}):r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:r.jsx("span",{className:"text-3xl",children:"📎"})}),r.jsx("p",{className:"text-gray-600 mb-2",children:"Перетащите PDF сюда"}),r.jsx("p",{className:"text-sm text-gray-500",children:"или нажмите для выбора файла"}),r.jsx("p",{className:"text-xs text-gray-400 mt-2",children:"PDF до 50MB"})]}),r.jsx("input",{ref:h,type:"file",accept:".pdf",className:"hidden",onChange:b=>{b.target.files?.[0]&&_(b.target.files[0])}})]}),r.jsxs("div",{className:"space-y-3 mb-6",children:[r.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Категория документа"}),r.jsx("select",{value:t,onChange:b=>i(b.target.value),className:"w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white",children:sM.map(b=>r.jsx("option",{value:b.value,children:b.label},b.value))})]}),r.jsxs("button",{onClick:v,disabled:l||!n,className:"w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:[r.jsx("span",{children:l?"⏳":"✅"}),r.jsx("span",{children:l?"Обработка...":"Обработать документ"})]}),r.jsxs("div",{className:"mt-6 pt-6 border-t border-gray-100",children:[r.jsx("h4",{className:"text-sm font-semibold text-gray-700 mb-3",children:"Недавние документы"}),r.jsx("div",{className:"space-y-2",children:c.map((b,M)=>r.jsxs("div",{className:"flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors",children:[r.jsx("span",{className:"text-green-600",children:"📄"}),r.jsx("span",{className:"text-sm text-gray-700 flex-1 truncate",children:b.name}),r.jsx("span",{className:"text-xs text-gray-400 whitespace-nowrap",children:b.daysAgo})]},M))})]})]})]})]})})]})},lM=[{icon:Uu,title:"Экспонаты",desc:"Более 10 000 произведений искусства от ведущих музеев мира. Изучайте детали, историю и технику исполнения.",color:"text-indigo-600 bg-indigo-50",link:"/artworks"},{icon:Op,title:"Виртуальные туры",desc:"Погрузитесь в интерактивные 3D-туры по знаменитым галереям в любой точке мира.",color:"text-purple-600 bg-purple-50",link:"/tours"},{icon:Lu,title:"Аукцион",desc:"Торги за уникальные произведения искусства. Участвуйте и пополняйте свою коллекцию шедеврами.",color:"text-orange-600 bg-orange-50",link:"/auction"},{icon:Cu,title:"ArtWiki",desc:"AI-ассистент и энциклопедия: история искусства, техники, художники, стили и направления.",color:"text-teal-600 bg-teal-50",link:"/artwiki"},{icon:Nu,title:"RAG — База знаний",desc:"Загружайте PDF-документы и индексируйте их для AI-ассистента. Расширяйте базу знаний платформы.",color:"text-green-600 bg-green-50",link:"/rag"},{icon:Lp,title:"Оцифровка",desc:"Загружайте и оцифровывайте произведения с AI-анализом: стиль, эпоха, техника, атрибуция.",color:"text-rose-600 bg-rose-50",link:"/staff"},{icon:ju,title:"Музеи мира",desc:"Интеграция с крупнейшими музеями: Метрополитен, Лувр, Эрмитаж, Уффици и другими.",color:"text-blue-600 bg-blue-50",link:"/artwiki"},{icon:kt,title:"Персонализация",desc:"Создавайте персональные коллекции, маршруты и получайте AI-рекомендации.",color:"text-amber-600 bg-amber-50",link:"/collections"}],cM=[{name:"Администратор",desc:"Управление пользователями, контентом и настройками платформы"},{name:"Куратор",desc:"Создание виртуальных залов, расстановка экспонатов, AI-подбор произведений"},{name:"Сотрудник",desc:"Загрузка и оцифровка произведений, управление архивом"},{name:"Экскурсовод",desc:"Создание виртуальных туров и маршрутов по галерее"},{name:"Участник аукциона",desc:"Участие в торгах, отслеживание лотов"},{name:"Посетитель",desc:"Просмотр галерей, туры, использование ArtWiki и коллекций"}],dM=()=>r.jsxs("div",{className:"min-h-screen",children:[r.jsx("section",{className:"bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4",children:r.jsxs("div",{className:"max-w-4xl mx-auto text-center",children:[r.jsx("h1",{className:"text-4xl md:text-5xl font-bold mb-4",children:"О платформе"}),r.jsx("p",{className:"text-xl text-gray-300 max-w-2xl mx-auto",children:"Virtual Gallery — современная платформа для управления виртуальными художественными галереями с AI-возможностями и поддержкой VR."})]})}),r.jsxs("section",{className:"max-w-6xl mx-auto px-4 py-16",children:[r.jsxs("div",{className:"text-center mb-12",children:[r.jsx("h2",{className:"text-3xl font-bold text-gray-900 mb-3",children:"Возможности платформы"}),r.jsx("p",{className:"text-lg text-gray-500 max-w-2xl mx-auto",children:"Откройте для себя инновационные инструменты для изучения и взаимодействия с искусством"})]}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:lM.map(n=>r.jsxs(_t,{to:n.link,className:"group block bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all",children:[r.jsx("div",{className:`inline-flex p-3 rounded-lg ${n.color} mb-4`,children:r.jsx(n.icon,{className:"h-6 w-6"})}),r.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:n.title}),r.jsx("p",{className:"text-sm text-gray-500 leading-relaxed",children:n.desc}),r.jsxs("div",{className:"mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity",children:["Перейти ",r.jsx(Ru,{className:"h-3.5 w-3.5"})]})]},n.title))})]}),r.jsx("section",{className:"bg-gray-50 border-t border-gray-100 py-16 px-4",children:r.jsxs("div",{className:"max-w-4xl mx-auto",children:[r.jsxs("div",{className:"text-center mb-10",children:[r.jsx("h2",{className:"text-3xl font-bold text-gray-900 mb-3",children:"Роли пользователей"}),r.jsx("p",{className:"text-gray-500",children:"Платформа поддерживает гибкую систему ролей"})]}),r.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:cM.map(n=>r.jsxs("div",{className:"bg-white rounded-xl border border-gray-100 p-5 shadow-sm",children:[r.jsx("div",{className:"font-semibold text-gray-900 mb-1",children:n.name}),r.jsx("p",{className:"text-sm text-gray-500",children:n.desc})]},n.name))})]})}),r.jsxs("section",{className:"max-w-4xl mx-auto px-4 py-16",children:[r.jsx("div",{className:"text-center mb-10",children:r.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-3",children:"Технологии"})}),r.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",children:["React + TypeScript","Node.js / Express","PostgreSQL","Redis","Three.js / WebXR","OpenAI GPT-4","Qdrant Vector DB","S3 Storage"].map(n=>r.jsx("div",{className:"bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 text-center font-medium",children:n},n))})]})]}),au=[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"},{title:"О нас",path:"/about"}],uM={admin:[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"}],curator:[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"}],staff:[{title:"Главная",path:"/"},{title:"Галерея",path:"/galleries"},{title:"ArtWiki",path:"/artwiki"},{title:"RAG",path:"/rag"}],tour_guide:[{title:"Галерея",path:"/galleries"},{title:"Туры",path:"/tours"},{title:"ArtWiki",path:"/artwiki"}],auction_participant:[{title:"Галерея",path:"/galleries"},{title:"Аукцион",path:"/auction"},{title:"ArtWiki",path:"/artwiki"}]},Us={admin:"/admin",curator:"/curator",staff:"/staff",tour_guide:"/tour-guide",auction_participant:"/auction-participant"},hM=({currentUser:n,onLogout:e})=>{const[t,i]=z.useState(!1),s=Cf(),a=o=>s.pathname===o,l=n?uM[n.role]??au:au;return r.jsxs("header",{className:"sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm",children:[r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:r.jsxs("div",{className:"flex items-center justify-between h-14",children:[r.jsxs(_t,{to:"/",className:"flex items-center gap-2 shrink-0",children:[r.jsx("div",{className:"bg-indigo-100 p-1.5 rounded-lg",children:r.jsx(Uu,{className:"h-5 w-5 text-indigo-600"})}),r.jsxs("div",{className:"hidden sm:block",children:[r.jsx("div",{className:"text-sm font-bold text-gray-900 leading-none",children:"Virtual Gallery"}),r.jsx("div",{className:"text-xs text-gray-500 leading-none mt-0.5",children:"AI Powered"})]})]}),r.jsx("nav",{className:"hidden md:flex items-center gap-1",children:l.map(o=>r.jsx(_t,{to:o.path,className:`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${a(o.path)?"text-indigo-600 bg-indigo-50":"text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`,children:o.title},o.path))}),r.jsxs("div",{className:"flex items-center gap-2",children:[n?r.jsxs("div",{className:"flex items-center gap-2",children:[Us[n.role]&&r.jsxs(_t,{to:Us[n.role],className:"hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors",children:[r.jsx(Bp,{className:"h-4 w-4"}),"Дашборд"]}),r.jsx("span",{className:"hidden lg:block text-xs text-gray-500 max-w-[120px] truncate",children:n.username}),r.jsxs("button",{onClick:e,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors",children:[r.jsx(zp,{className:"h-4 w-4"}),r.jsx("span",{className:"hidden sm:inline",children:"Выйти"})]})]}):r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(_t,{to:"/login",className:"px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors",children:"Войти"}),r.jsx(_t,{to:"/register",className:"px-3 py-1.5 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors",children:"Регистрация"})]}),r.jsx("button",{className:"md:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100",onClick:()=>i(o=>!o),children:t?r.jsx(Yp,{className:"h-5 w-5"}):r.jsx(Gp,{className:"h-5 w-5"})})]})]})}),t&&r.jsxs("div",{className:"md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1",children:[l.map(o=>r.jsx(_t,{to:o.path,onClick:()=>i(!1),className:`block px-3 py-2 rounded-md text-sm font-medium ${a(o.path)?"text-indigo-600 bg-indigo-50":"text-gray-700 hover:bg-gray-100"}`,children:o.title},o.path)),n&&Us[n.role]&&r.jsx(_t,{to:Us[n.role],onClick:()=>i(!1),className:"block px-3 py-2 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50",children:"Дашборд"})]})]})},fM=()=>r.jsx("footer",{className:"bg-background border-t",children:r.jsxs("div",{className:"container py-12 md:py-16",children:[r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-8",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[r.jsx(ju,{className:"h-6 w-6 text-primary"}),r.jsx("span",{className:"text-xl font-bold",children:"Виртуальная галерея"})]}),r.jsx("p",{className:"text-muted-foreground text-sm",children:"Современная платформа для просмотра и управления коллекциями произведений искусства в виртуальной среде."})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-sm font-semibold mb-4",children:"Навигация"}),r.jsxs("ul",{className:"space-y-2",children:[r.jsx("li",{children:r.jsx(_t,{to:"/",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Главная"})}),r.jsx("li",{children:r.jsx(_t,{to:"/galleries",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Галереи"})}),r.jsx("li",{children:r.jsx(_t,{to:"/artworks",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Экспонаты"})}),r.jsx("li",{children:r.jsx(_t,{to:"/tours",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Виртуальные туры"})})]})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-sm font-semibold mb-4",children:"Поддержка"}),r.jsxs("ul",{className:"space-y-2",children:[r.jsx("li",{children:r.jsx(_t,{to:"/help",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Помощь"})}),r.jsx("li",{children:r.jsx(_t,{to:"/faq",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Частые вопросы"})}),r.jsx("li",{children:r.jsx(_t,{to:"/contact",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Контакты"})}),r.jsx("li",{children:r.jsx(_t,{to:"/privacy",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Конфиденциальность"})})]})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-sm font-semibold mb-4",children:"Контакты"}),r.jsxs("ul",{className:"space-y-3",children:[r.jsxs("li",{className:"flex items-center gap-2 text-muted-foreground text-sm",children:[r.jsx(Hp,{className:"h-4 w-4"}),r.jsx("span",{children:"info@virtualgallery.com"})]}),r.jsxs("li",{className:"flex items-center gap-2 text-muted-foreground text-sm",children:[r.jsx(Vp,{className:"h-4 w-4"}),r.jsx("span",{children:"+7 (XXX) XXX-XX-XX"})]}),r.jsxs("li",{className:"flex items-center gap-2 text-muted-foreground text-sm",children:[r.jsx($s,{className:"h-4 w-4"}),r.jsx("span",{children:"Москва, ул. Искусств, 15"})]}),r.jsx("li",{className:"flex items-center gap-2",children:r.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",className:"text-muted-foreground hover:text-foreground transition-colors",children:r.jsx(kp,{className:"h-5 w-5"})})})]})]})]}),r.jsxs("div",{className:"border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center",children:[r.jsxs("p",{className:"text-muted-foreground text-sm",children:["© ",new Date().getFullYear()," Виртуальная галерея искусств. Все права защищены."]}),r.jsxs("div",{className:"flex gap-6 mt-4 md:mt-0",children:[r.jsx(_t,{to:"/terms",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Условия использования"}),r.jsx(_t,{to:"/privacy",className:"text-muted-foreground hover:text-foreground text-sm transition-colors",children:"Политика конфиденциальности"})]})]})]})}),pM=()=>{const[n,e]=z.useState(null),[t,i]=z.useState(null);z.useEffect(()=>{const l=Bs(window.location.origin,{path:"/socket.io"});return i(l),localStorage.getItem("authToken"),()=>{l.close()}},[]);const s=l=>{e(l)},a=()=>{e(null),localStorage.removeItem("authToken")};return r.jsx(Nf,{children:r.jsxs("div",{className:"flex flex-col min-h-screen bg-background",children:[r.jsx(hM,{currentUser:n,onLogout:a}),r.jsx("div",{className:"flex flex-1",children:r.jsx("main",{className:"flex-1 p-4 md:p-6",children:r.jsxs(Pf,{children:[r.jsx(vt,{path:"/",element:r.jsx(Zp,{})}),r.jsx(vt,{path:"/artworks",element:r.jsx($E,{})}),r.jsx(vt,{path:"/artworks/:id",element:r.jsx(J0,{})}),r.jsx(vt,{path:"/vr-gallery",element:r.jsx(p1,{})}),r.jsx(vt,{path:"/galleries",element:r.jsx(YE,{})}),r.jsx(vt,{path:"/galleries/:id",element:r.jsx(_1,{})}),r.jsx(vt,{path:"/rooms/:id",element:r.jsx(F1,{})}),r.jsx(vt,{path:"/galleries/:galleryId/rooms/manage",element:n?.role==="curator"||n?.role==="admin"?r.jsx(M1,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/staff-dashboard",element:n?.role==="staff"||n?.role==="admin"?r.jsx(dE,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/curator-review",element:n?.role==="curator"||n?.role==="admin"?r.jsx(gE,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/artwork-upload",element:n?.role==="admin"||n?.role==="curator"?r.jsx(UE,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/virtual-gallery",element:r.jsx(qE,{})}),r.jsx(vt,{path:"/tours",element:r.jsx(ZE,{})}),r.jsx(vt,{path:"/collections",element:r.jsx(QE,{})}),r.jsx(vt,{path:"/artwiki",element:r.jsx(rM,{})}),r.jsx(vt,{path:"/rag",element:r.jsx(oM,{})}),r.jsx(vt,{path:"/about",element:r.jsx(dM,{})}),r.jsx(vt,{path:"/admin",element:n?.role==="admin"?r.jsx(Gm,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/curator",element:n?.role==="curator"?r.jsx(Vm,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/staff",element:n?.role==="staff"?r.jsx(Wm,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/tour-guide",element:n?.role==="tour_guide"?r.jsx(Xm,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/auction-participant",element:n?.role==="auction_participant"?r.jsx(qm,{}):r.jsx(fn,{to:"/login"})}),r.jsx(vt,{path:"/login",element:n?r.jsx(fn,{to:"/"}):r.jsx(Bx,{onLogin:s})}),r.jsx(vt,{path:"/register",element:n?r.jsx(fn,{to:"/"}):r.jsx(zx,{onRegister:s})})]})})}),r.jsx(fM,{})]})})};Df.createRoot(document.getElementById("root")).render(r.jsx(Br.StrictMode,{children:r.jsx(pM,{})}));

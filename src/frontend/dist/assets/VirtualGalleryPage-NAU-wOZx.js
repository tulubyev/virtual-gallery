import{j as r}from"./vendor-radix-Cxgh2Cme.js";import{r as c}from"./vendor-router-sYWTefjn.js";import{a as U}from"./index-BjtuyMK1.js";import{q as w}from"./styled-components.browser.esm-CbTRkjly.js";import{R as Y,e as J,S as K,C as N,F as Q,P as Z,W as $,f as ee,g as te,A as re,D as ne,a as oe,b as I,M as S,c as v,B as W,d as se,I as ae,h as ie,G as ce,i as le,j as de}from"./vendor-three-DRTgikV6.js";import{O as he}from"./OrbitControls-DizVRK2G.js";const ue=w.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,me=w.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  max-width: 300px;
`,pe=w.div`
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
`,O=w.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`,we=({artworks:j,onArtworkClick:D,onExitVR:L})=>{const y=c.useRef(null),M=c.useRef(null),E=c.useRef(null),s=c.useRef(null),P=c.useRef(null),R=c.useRef(null),b=c.useRef({}),z=c.useRef(new Y),m=c.useRef(new J),[f,T]=c.useState({fps:0,objects:0}),C=c.useRef(new Map);c.useEffect(()=>{if(!y.current)return;const t=new K;t.background=new N(1118483),t.fog=new Q(1118483,10,30),M.current=t;const a=new Z(75,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(0,1.6,5),E.current=a;const e=new $({antialias:!0,powerPreference:"high-performance",alpha:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.shadowMap.enabled=!0,e.shadowMap.type=ee,e.toneMapping=te,e.toneMappingExposure=1.2,e.xr.enabled=!0,y.current.appendChild(e.domElement),s.current=e;const n=V(t);B(t),q(t,j);const i=new he(a,e.domElement);i.enableDamping=!0,i.dampingFactor=.05,P.current=i;let d=0,h=performance.now();const o=()=>{a&&e&&(a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",o);const u=()=>{R.current=requestAnimationFrame(u),i&&i.update(),d++;const l=performance.now();if(l>=h+1e3){const p=Math.round(d*1e3/(l-h));T({fps:p,objects:t.children.length}),d=0,h=l}e&&t&&a&&e.render(t,a)};return u(),()=>{window.removeEventListener("resize",o),R.current&&cancelAnimationFrame(R.current),C.current.forEach(l=>l.dispose()),C.current.clear(),y.current&&e?.domElement&&y.current.removeChild(e.domElement),e?.domElement.removeEventListener("click",_),e&&(e.dispose(),t.traverse(l=>{if(l.geometry&&l.geometry.dispose(),l.material){const p=l.material;Array.isArray(p)?p.forEach(g=>g.dispose()):p.dispose()}})),n.forEach(l=>l.removeFromParent())}},[j]);const V=t=>{const a=[],e=new re(16777215,.4);t.add(e),a.push(e);const n=new ne(16777215,.8);return n.position.set(5,10,7),n.castShadow=!0,n.shadow.mapSize.width=2048,n.shadow.mapSize.height=2048,n.shadow.camera.near=.5,n.shadow.camera.far=50,n.shadow.camera.left=-10,n.shadow.camera.right=10,n.shadow.camera.top=10,n.shadow.camera.bottom=-10,t.add(n),a.push(n),j.slice(0,20).forEach((d,h)=>{const o=new oe(16768426,.6);o.position.set(-6+h%4*4,4,-8+Math.floor(h/4)*-4),o.castShadow=!0,o.angle=Math.PI/6,o.penumbra=.2,o.decay=2,o.distance=20,o.shadow.mapSize.width=512,o.shadow.mapSize.height=512,o.shadow.camera.near=.5,o.shadow.camera.far=20,t.add(o),a.push(o)}),a},B=t=>{const a=new I(40,40),e=new S({color:3355443,roughness:.8,metalness:.2}),n=new v(a,e);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,t.add(n);const i=new W(40,8,.5),d=new S({color:4473924,roughness:.7,metalness:.3}),h=new v(i,d);h.position.z=-20,h.position.y=4,h.castShadow=!1,h.receiveShadow=!0,t.add(h);const o=new v(i,d);o.position.x=-20,o.position.y=4,o.rotation.y=Math.PI/2,o.castShadow=!1,o.receiveShadow=!0,t.add(o);const u=new v(i,d);u.position.x=20,u.position.y=4,u.rotation.y=Math.PI/2,u.castShadow=!1,u.receiveShadow=!0,t.add(u);const l=new I(40,40),p=new S({color:2236962,roughness:.9,metalness:.1}),g=new v(l,p);g.rotation.x=Math.PI/2,g.position.y=8,g.castShadow=!1,t.add(g),H(t)},H=t=>{const a=new se(.5,.5,8,16),e=new S({color:8947848,roughness:.6,metalness:.2}),n=new ae(a,e,4),i=new ie;for(let d=0;d<4;d++)i.setPosition(-15+d*10,4,-18),n.setMatrixAt(d,i);n.instanceMatrix.needsUpdate=!0,n.castShadow=!0,n.receiveShadow=!0,t.add(n)},q=(t,a)=>{Object.values(b.current).forEach(e=>{e.parent&&e.parent.remove(e)}),b.current={},a.forEach((e,n)=>{const i=-6+n%4*4,d=-8+Math.floor(n/4)*-4,h=2,o=new ce;o.position.set(i,h,d),t.add(o);const u=new W(2.5,2.5,.1),l=new S({color:9127187,metalness:.3,roughness:.7}),p=new v(u,l);p.userData={type:"artwork",artworkId:e.artwork_id,artwork:e},o.add(p);const g=new I(2.3,2.3);let A=null;if(e.image_url&&C.current.has(e.image_url))A=C.current.get(e.image_url);else if(e.image_url){const x=document.createElement("canvas");x.width=512,x.height=512;const k=x.getContext("2d");k.fillStyle="#aaaaaa",k.fillRect(0,0,x.width,x.height),k.fillStyle="#ffffff",k.font="20px Arial",k.textAlign="center",k.fillText(e.title||"Artwork",x.width/2,x.height/2);const F=new le(x);C.current.set(e.image_url,F),A=F}const X=new S({map:A||void 0,color:A?16777215:11184810,emissive:A?3355443:2236962,roughness:.5,metalness:.1,side:de}),G=new v(g,X);G.position.z=.06,G.userData={type:"artwork",artworkId:e.artwork_id,artwork:e},o.add(G),b.current[e.artwork_id??0]=G})},_=t=>{if(!E.current||!s.current||!M.current)return;const a=s.current.domElement.getBoundingClientRect();m.current.x=(t.clientX-a.left)/a.width*2-1,m.current.y=-((t.clientY-a.top)/a.height)*2+1,z.current.setFromCamera(m.current,E.current);const e=Object.values(b.current),n=z.current.intersectObjects(e);if(n.length>0){const i=n[0].object;i.userData&&i.userData.artwork&&D(i.userData.artwork)}};return c.useEffect(()=>{const t=s.current?.domElement;if(t)return t.addEventListener("click",_),()=>{t.removeEventListener("click",_)}},[]),r.jsxs(ue,{ref:y,children:[r.jsxs(me,{children:[r.jsx("h3",{children:"Виртуальная галерея"}),r.jsx("p",{children:"Используйте мышь для навигации по галерее"}),r.jsxs("p",{children:["Всего экспонатов: ",j.length]}),r.jsxs("p",{children:["FPS: ",f.fps]}),r.jsxs("p",{children:["Объектов: ",f.objects]})]}),r.jsxs(pe,{children:[r.jsx(O,{onClick:()=>s.current?.xr.isPresenting?s.current.xr.getSession()?.end():null,children:s.current?.xr.isPresenting?"Выйти из VR":"Войти в VR"}),r.jsx(O,{onClick:L,children:"Назад к галерее"})]})]})},fe=w.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`,ge=w.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`,xe=w.div`
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
`,ye=w.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,be=w.button`
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
`,ve=w.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,Ce=()=>{const[j,D]=c.useState([]),[L,y]=c.useState(!0),[M,E]=c.useState(null),[s,P]=c.useState(null);c.useEffect(()=>{(async()=>{try{const f=await U.get("http://localhost:5000/api/artworks");D(f.data)}catch(f){console.error("Ошибка при загрузке экспонатов:",f),E("Не удалось загрузить экспонаты")}finally{y(!1)}})()},[]);const R=m=>{P(m)},b=()=>{P(null)},z=()=>{window.history.back()};return L?r.jsx(fe,{children:"Загрузка виртуальной галереи..."}):M?r.jsx(ge,{children:M}):r.jsxs("div",{children:[r.jsx(we,{artworks:j,onArtworkClick:R,onExitVR:z}),s&&r.jsx(xe,{onClick:b,children:r.jsxs(ye,{onClick:m=>m.stopPropagation(),children:[r.jsx(be,{onClick:b,children:"×"}),r.jsx("h2",{children:s.title}),r.jsxs("p",{children:[r.jsx("strong",{children:"Художник:"})," ",s.artist_name]}),s.year_created&&r.jsxs("p",{children:[r.jsx("strong",{children:"Год создания:"})," ",s.year_created]}),s.medium&&r.jsxs("p",{children:[r.jsx("strong",{children:"Материал:"})," ",s.medium]}),s.style&&r.jsxs("p",{children:[r.jsx("strong",{children:"Стиль:"})," ",s.style]}),s.dimensions&&r.jsxs("p",{children:[r.jsx("strong",{children:"Размеры:"})," ",s.dimensions]}),s.description&&r.jsxs("p",{children:[r.jsx("strong",{children:"Описание:"})," ",s.description]}),s.image_url&&r.jsx(ve,{src:s.image_url,alt:s.title,onError:m=>{const f=m.target;f.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})};export{Ce as default};

import{j as h}from"./vendor-radix-RVnWX0Yt.js";import{r as l}from"./vendor-router-sYWTefjn.js";import{R as U,e as Y,S as J,C as K,F as N,P as Q,W as Z,f as $,g as ee,A as te,D as re,a as ne,b as A,M as x,c as p,B as I,d as oe,I as ae,h as se,G as ie,i as ce,j as le}from"./vendor-three-DRTgikV6.js";import{O as de}from"./OrbitControls-DizVRK2G.js";import{q as E}from"./vendor-styled-CbTRkjly.js";const ue=E.div`
  width: 100%;
  height: 100vh;
  position: relative;
`,he=E.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 10;
  max-width: 300px;
`,me=E.div`
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
`,F=E.button`
  padding: 0.5rem 1rem;
  background: #6200ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`,be=({artworks:S,onArtworkClick:W,onExitVR:O})=>{const b=l.useRef(null),G=l.useRef(null),C=l.useRef(null),f=l.useRef(null),_=l.useRef(null),P=l.useRef(null),M=l.useRef({}),z=l.useRef(new U),k=l.useRef(new Y),[D,T]=l.useState({fps:0,objects:0}),v=l.useRef(new Map);l.useEffect(()=>{if(!b.current)return;const t=new J;t.background=new K(1118483),t.fog=new N(1118483,10,30),G.current=t;const o=new Q(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.set(0,1.6,5),C.current=o;const e=new Z({antialias:!0,powerPreference:"high-performance",alpha:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.shadowMap.enabled=!0,e.shadowMap.type=$,e.toneMapping=ee,e.toneMappingExposure=1.2,e.xr.enabled=!0,b.current.appendChild(e.domElement),f.current=e;const r=B(t);H(t),q(t,S);const a=new de(o,e.domElement);a.enableDamping=!0,a.dampingFactor=.05,_.current=a;let i=0,c=performance.now();const n=()=>{o&&e&&(o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",n);const d=()=>{P.current=requestAnimationFrame(d),a&&a.update(),i++;const s=performance.now();if(s>=c+1e3){const u=Math.round(i*1e3/(s-c));T({fps:u,objects:t.children.length}),i=0,c=s}e&&t&&o&&e.render(t,o)};return d(),()=>{window.removeEventListener("resize",n),P.current&&cancelAnimationFrame(P.current),v.current.forEach(s=>s.dispose()),v.current.clear(),b.current&&e?.domElement&&b.current.removeChild(e.domElement),e?.domElement.removeEventListener("click",j),e&&(e.dispose(),t.traverse(s=>{if(s.geometry&&s.geometry.dispose(),s.material){const u=s.material;Array.isArray(u)?u.forEach(m=>m.dispose()):u.dispose()}})),r.forEach(s=>s.removeFromParent())}},[S]);const B=t=>{const o=[],e=new te(16777215,.4);t.add(e),o.push(e);const r=new re(16777215,.8);return r.position.set(5,10,7),r.castShadow=!0,r.shadow.mapSize.width=2048,r.shadow.mapSize.height=2048,r.shadow.camera.near=.5,r.shadow.camera.far=50,r.shadow.camera.left=-10,r.shadow.camera.right=10,r.shadow.camera.top=10,r.shadow.camera.bottom=-10,t.add(r),o.push(r),S.slice(0,20).forEach((i,c)=>{const n=new ne(16768426,.6);n.position.set(-6+c%4*4,4,-8+Math.floor(c/4)*-4),n.castShadow=!0,n.angle=Math.PI/6,n.penumbra=.2,n.decay=2,n.distance=20,n.shadow.mapSize.width=512,n.shadow.mapSize.height=512,n.shadow.camera.near=.5,n.shadow.camera.far=20,t.add(n),o.push(n)}),o},H=t=>{const o=new A(40,40),e=new x({color:3355443,roughness:.8,metalness:.2}),r=new p(o,e);r.rotation.x=-Math.PI/2,r.receiveShadow=!0,t.add(r);const a=new I(40,8,.5),i=new x({color:4473924,roughness:.7,metalness:.3}),c=new p(a,i);c.position.z=-20,c.position.y=4,c.castShadow=!1,c.receiveShadow=!0,t.add(c);const n=new p(a,i);n.position.x=-20,n.position.y=4,n.rotation.y=Math.PI/2,n.castShadow=!1,n.receiveShadow=!0,t.add(n);const d=new p(a,i);d.position.x=20,d.position.y=4,d.rotation.y=Math.PI/2,d.castShadow=!1,d.receiveShadow=!0,t.add(d);const s=new A(40,40),u=new x({color:2236962,roughness:.9,metalness:.1}),m=new p(s,u);m.rotation.x=Math.PI/2,m.position.y=8,m.castShadow=!1,t.add(m),V(t)},V=t=>{const o=new oe(.5,.5,8,16),e=new x({color:8947848,roughness:.6,metalness:.2}),r=new ae(o,e,4),a=new se;for(let i=0;i<4;i++)a.setPosition(-15+i*10,4,-18),r.setMatrixAt(i,a);r.instanceMatrix.needsUpdate=!0,r.castShadow=!0,r.receiveShadow=!0,t.add(r)},q=(t,o)=>{Object.values(M.current).forEach(e=>{e.parent&&e.parent.remove(e)}),M.current={},o.forEach((e,r)=>{const a=-6+r%4*4,i=-8+Math.floor(r/4)*-4,c=2,n=new ie;n.position.set(a,c,i),t.add(n);const d=new I(2.5,2.5,.1),s=new x({color:9127187,metalness:.3,roughness:.7}),u=new p(d,s);u.userData={type:"artwork",artworkId:e.artwork_id,artwork:e},n.add(u);const m=new A(2.3,2.3);let y=null;if(e.image_url&&v.current.has(e.image_url))y=v.current.get(e.image_url);else if(e.image_url){const w=document.createElement("canvas");w.width=512,w.height=512;const g=w.getContext("2d");g.fillStyle="#aaaaaa",g.fillRect(0,0,w.width,w.height),g.fillStyle="#ffffff",g.font="20px Arial",g.textAlign="center",g.fillText(e.title||"Artwork",w.width/2,w.height/2);const L=new ce(w);v.current.set(e.image_url,L),y=L}const X=new x({map:y||void 0,color:y?16777215:11184810,emissive:y?3355443:2236962,roughness:.5,metalness:.1,side:le}),R=new p(m,X);R.position.z=.06,R.userData={type:"artwork",artworkId:e.artwork_id,artwork:e},n.add(R),M.current[e.artwork_id??0]=R})},j=t=>{if(!C.current||!f.current||!G.current)return;const o=f.current.domElement.getBoundingClientRect();k.current.x=(t.clientX-o.left)/o.width*2-1,k.current.y=-((t.clientY-o.top)/o.height)*2+1,z.current.setFromCamera(k.current,C.current);const e=Object.values(M.current),r=z.current.intersectObjects(e);if(r.length>0){const a=r[0].object;a.userData&&a.userData.artwork&&W(a.userData.artwork)}};return l.useEffect(()=>{const t=f.current?.domElement;if(t)return t.addEventListener("click",j),()=>{t.removeEventListener("click",j)}},[]),h.jsxs(ue,{ref:b,children:[h.jsxs(he,{children:[h.jsx("h3",{children:"Виртуальная галерея"}),h.jsx("p",{children:"Используйте мышь для навигации по галерее"}),h.jsxs("p",{children:["Всего экспонатов: ",S.length]}),h.jsxs("p",{children:["FPS: ",D.fps]}),h.jsxs("p",{children:["Объектов: ",D.objects]})]}),h.jsxs(me,{children:[h.jsx(F,{onClick:()=>f.current?.xr.isPresenting?f.current.xr.getSession()?.end():null,children:f.current?.xr.isPresenting?"Выйти из VR":"Войти в VR"}),h.jsx(F,{onClick:O,children:"Назад к галерее"})]})]})};export{be as default};

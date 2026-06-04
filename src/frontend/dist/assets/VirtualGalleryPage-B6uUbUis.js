const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/VirtualGallery3D-CyBvAFyH.js","assets/vendor-radix-Bdw-gbau.js","assets/vendor-router-Bi5ontUF.js","assets/OrbitControls-BDLqfVUn.js","assets/styled-components.browser.esm-BuKB8Ga5.js"])))=>i.map(i=>d[i]);
import{_ as f}from"./react-app--jmmqQJn.js";import{j as t}from"./vendor-radix-Bdw-gbau.js";import{a as s,b as k}from"./vendor-router-Bi5ontUF.js";import{a as w}from"./vendor-http-BjtuyMK1.js";import{q as o}from"./styled-components.browser.esm-BuKB8Ga5.js";import"./vendor-socket-BkL6vOXg.js";const y=k.lazy(()=>f(()=>import("./VirtualGallery3D-CyBvAFyH.js"),__vite__mapDeps([0,1,2,3,4]))),d=o.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`,b=o.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`,A=o.div`
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
`,_=o.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,v=o.button`
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
`,E=o.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,P=()=>{const[h,x]=s.useState([]),[p,m]=s.useState(!0),[a,g]=s.useState(null),[r,c]=s.useState(null);s.useEffect(()=>{(async()=>{try{const n=(await w.get("/api/artworks")).data;x(Array.isArray(n)?n:n.artworks||[])}catch(i){console.error("Ошибка при загрузке экспонатов:",i),g("Не удалось загрузить экспонаты")}finally{m(!1)}})()},[]);const u=e=>{c(e)},l=()=>{c(null)},j=()=>{window.history.back()};return p?t.jsx(d,{children:"Загрузка виртуальной галереи..."}):a?t.jsx(b,{children:a}):t.jsxs("div",{children:[t.jsx(s.Suspense,{fallback:t.jsx(d,{children:"Загрузка виртуальной галереи..."}),children:t.jsx(y,{artworks:h,onArtworkClick:u,onExitVR:j})}),r&&t.jsx(A,{onClick:l,children:t.jsxs(_,{onClick:e=>e.stopPropagation(),children:[t.jsx(v,{onClick:l,children:"×"}),t.jsx("h2",{children:r.title}),t.jsxs("p",{children:[t.jsx("strong",{children:"Художник:"})," ",r.artist_name]}),r.year_created&&t.jsxs("p",{children:[t.jsx("strong",{children:"Год создания:"})," ",r.year_created]}),r.medium&&t.jsxs("p",{children:[t.jsx("strong",{children:"Материал:"})," ",r.medium]}),r.style&&t.jsxs("p",{children:[t.jsx("strong",{children:"Стиль:"})," ",r.style]}),r.dimensions&&t.jsxs("p",{children:[t.jsx("strong",{children:"Размеры:"})," ",r.dimensions]}),r.description&&t.jsxs("p",{children:[t.jsx("strong",{children:"Описание:"})," ",r.description]}),r.image_url&&t.jsx(E,{src:r.image_url,alt:r.title,onError:e=>{const i=e.target;i.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})};export{P as default};

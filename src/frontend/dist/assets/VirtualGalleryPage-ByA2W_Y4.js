const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GalleryR3F-54WrYH1f.js","assets/vendor-radix-RVnWX0Yt.js","assets/vendor-router-sYWTefjn.js","assets/vendor-r3f-CPrUUYaA.js","assets/vendor-three-D9ub98kG.js"])))=>i.map(i=>d[i]);
import{_ as f}from"./vendor-r3f-CPrUUYaA.js";import{j as r}from"./vendor-radix-RVnWX0Yt.js";import{r as s,b}from"./vendor-router-sYWTefjn.js";import{a as k}from"./api-KwWGfbw5.js";import{q as n}from"./vendor-styled-BDXqawyY.js";import"./vendor-three-D9ub98kG.js";import"./vendor-http-BjtuyMK1.js";import"./react-app-CowdqnLK.js";import"./vendor-icons-UULdN9Jp.js";const w=b.lazy(()=>f(()=>import("./GalleryR3F-54WrYH1f.js"),__vite__mapDeps([0,1,2,3,4]))),d=n.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
  gap: 1.5rem;

  .spinner-ring {
    width: 64px;
    height: 64px;
    border: 4px solid rgba(255,255,255,0.15);
    border-top-color: #818cf8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .spinner-label {
    font-size: 1rem;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.05em;
  }

  .spinner-sub {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,y=n.div`
  color: red;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`,A=n.div`
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
`,_=n.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,v=n.button`
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
`,E=n.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,V=()=>{const[p,h]=s.useState([]),[x,m]=s.useState(!0),[a,g]=s.useState(null),[e,l]=s.useState(null);s.useEffect(()=>{(async()=>{try{const o=(await k.get("/artworks")).data;h(Array.isArray(o)?o:o.artworks||[])}catch(i){console.error("Ошибка при загрузке экспонатов:",i),g("Не удалось загрузить экспонаты")}finally{m(!1)}})()},[]);const u=t=>{l(t)},c=()=>{l(null)},j=()=>{window.history.back()};return x?r.jsxs(d,{children:[r.jsx("div",{className:"spinner-ring"}),r.jsx("span",{className:"spinner-label",children:"Загрузка виртуальной галереи…"}),r.jsx("span",{className:"spinner-sub",children:"Инициализация 3D-пространства"})]}):a?r.jsx(y,{children:a}):r.jsxs("div",{children:[r.jsx(s.Suspense,{fallback:r.jsxs(d,{children:[r.jsx("div",{className:"spinner-ring"}),r.jsx("span",{className:"spinner-label",children:"Загрузка 3D-галереи…"}),r.jsx("span",{className:"spinner-sub",children:"Three.js / WebXR"})]}),children:r.jsx(w,{artworks:p,onArtworkClick:u,onExitVR:j})}),e&&r.jsx(A,{onClick:c,children:r.jsxs(_,{onClick:t=>t.stopPropagation(),children:[r.jsx(v,{onClick:c,children:"×"}),r.jsx("h2",{children:e.title}),r.jsxs("p",{children:[r.jsx("strong",{children:"Художник:"})," ",e.artist_name]}),e.year_created&&r.jsxs("p",{children:[r.jsx("strong",{children:"Год создания:"})," ",e.year_created]}),e.medium&&r.jsxs("p",{children:[r.jsx("strong",{children:"Материал:"})," ",e.medium]}),e.style&&r.jsxs("p",{children:[r.jsx("strong",{children:"Стиль:"})," ",e.style]}),e.dimensions&&r.jsxs("p",{children:[r.jsx("strong",{children:"Размеры:"})," ",e.dimensions]}),e.description&&r.jsxs("p",{children:[r.jsx("strong",{children:"Описание:"})," ",e.description]}),e.image_url&&r.jsx(E,{src:e.image_url,alt:e.title,onError:t=>{const i=t.target;i.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})};export{V as default};

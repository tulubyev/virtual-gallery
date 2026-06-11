const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/VirtualGallery3D-C1yjgkqa.js","assets/vendor-radix-RVnWX0Yt.js","assets/vendor-router-sYWTefjn.js","assets/vendor-three-DRTgikV6.js","assets/OrbitControls-DizVRK2G.js","assets/vendor-styled-CbTRkjly.js"])))=>i.map(i=>d[i]);
import{_ as f}from"./react-app-CQhmqL24.js";import{j as e}from"./vendor-radix-RVnWX0Yt.js";import{r as t,b}from"./vendor-router-sYWTefjn.js";import{a as k}from"./vendor-http-BjtuyMK1.js";import{q as n}from"./vendor-styled-CbTRkjly.js";import"./vendor-icons-BYhu7cxx.js";const w=b.lazy(()=>f(()=>import("./VirtualGallery3D-C1yjgkqa.js"),__vite__mapDeps([0,1,2,3,4,5]))),d=n.div`
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
`,M=()=>{const[p,x]=t.useState([]),[h,m]=t.useState(!0),[a,g]=t.useState(null),[r,l]=t.useState(null);t.useEffect(()=>{(async()=>{try{const o=(await k.get("/api/artworks")).data;x(Array.isArray(o)?o:o.artworks||[])}catch(i){console.error("Ошибка при загрузке экспонатов:",i),g("Не удалось загрузить экспонаты")}finally{m(!1)}})()},[]);const u=s=>{l(s)},c=()=>{l(null)},j=()=>{window.history.back()};return h?e.jsxs(d,{children:[e.jsx("div",{className:"spinner-ring"}),e.jsx("span",{className:"spinner-label",children:"Загрузка виртуальной галереи…"}),e.jsx("span",{className:"spinner-sub",children:"Инициализация 3D-пространства"})]}):a?e.jsx(y,{children:a}):e.jsxs("div",{children:[e.jsx(t.Suspense,{fallback:e.jsxs(d,{children:[e.jsx("div",{className:"spinner-ring"}),e.jsx("span",{className:"spinner-label",children:"Загрузка 3D-галереи…"}),e.jsx("span",{className:"spinner-sub",children:"Three.js / WebXR"})]}),children:e.jsx(w,{artworks:p,onArtworkClick:u,onExitVR:j})}),r&&e.jsx(A,{onClick:c,children:e.jsxs(_,{onClick:s=>s.stopPropagation(),children:[e.jsx(v,{onClick:c,children:"×"}),e.jsx("h2",{children:r.title}),e.jsxs("p",{children:[e.jsx("strong",{children:"Художник:"})," ",r.artist_name]}),r.year_created&&e.jsxs("p",{children:[e.jsx("strong",{children:"Год создания:"})," ",r.year_created]}),r.medium&&e.jsxs("p",{children:[e.jsx("strong",{children:"Материал:"})," ",r.medium]}),r.style&&e.jsxs("p",{children:[e.jsx("strong",{children:"Стиль:"})," ",r.style]}),r.dimensions&&e.jsxs("p",{children:[e.jsx("strong",{children:"Размеры:"})," ",r.dimensions]}),r.description&&e.jsxs("p",{children:[e.jsx("strong",{children:"Описание:"})," ",r.description]}),r.image_url&&e.jsx(E,{src:r.image_url,alt:r.title,onError:s=>{const i=s.target;i.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})};export{M as default};

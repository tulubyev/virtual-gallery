const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GalleryR3F-DFc0aT56.js","assets/vendor-radix-RVnWX0Yt.js","assets/vendor-router-sYWTefjn.js","assets/vendor-r3f-CPrUUYaA.js","assets/vendor-three-D9ub98kG.js"])))=>i.map(i=>d[i]);
import{_ as v}from"./vendor-r3f-CPrUUYaA.js";import{j as e}from"./vendor-radix-RVnWX0Yt.js";import{r as n,b as S}from"./vendor-router-sYWTefjn.js";import{q as a}from"./vendor-styled-BDXqawyY.js";import"./vendor-three-D9ub98kG.js";const _=S.lazy(()=>v(()=>import("./GalleryR3F-DFc0aT56.js"),__vite__mapDeps([0,1,2,3,4]))),j=a.div`
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
`,C=a.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,z=a.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`,R=a.button`
  position: absolute;
  top: 10px; right: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px; height: 30px;
  cursor: pointer;
  font-size: 1.2rem;
`,A=a.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
`,E={classic:"rgba(120,90,40,0.25)",modern:"rgba(80,120,180,0.25)",dark:"rgba(30,30,50,0.5)",impressionist:"rgba(160,100,180,0.25)",renaissance:"rgba(140,80,40,0.25)"};function I(o){if(!o.artworkAssignments)return[];const d=new Set;return Object.values(o.artworkAssignments).reduce((c,i)=>(d.has(i.id)||(d.add(i.id),c.push({id:String(i.id),artwork_id:i.id,title:i.title??"Без названия",artist:i.artist??"",artist_name:i.artist??"",image_url:i.image_url??"",imageUrl:i.image_url??"",style:i.style??void 0,year:0,description:"",tags:[],likes:0,views:0,rating:0,galleryId:"",roomId:o.id,coordinates:{x:0,y:0,z:0}})),c),[])}const V=()=>{const[o,d]=n.useState(null),[c,i]=n.useState(!0),[h,m]=n.useState(null),[f,b]=n.useState(null),[r,p]=n.useState(null),g=n.useCallback(async(t=3)=>{i(!0);try{const s=await fetch("/api/gallery/config");if(!s.ok)throw new Error("HTTP "+s.status);const l=await s.json();d(l),m(null),b(u=>u??l.currentRoom??l.rooms[0]?.id??null),i(!1)}catch{t>1?setTimeout(()=>g(t-1),2e3):(m("Не удалось загрузить конфигурацию галереи"),i(!1))}},[]);n.useEffect(()=>{g()},[g]);const x=o?.rooms.find(t=>t.id===f)??null,y=x?I(x):[],k=()=>window.history.back();return c?e.jsxs(j,{children:[e.jsx("div",{className:"spinner-ring"}),e.jsx("span",{className:"spinner-label",children:"Загрузка виртуальной галереи…"}),e.jsx("span",{className:"spinner-sub",children:"Получение конфигурации залов"})]}):h||!o?e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)",color:"#ccc",gap:16},children:[e.jsx("div",{style:{fontSize:48},children:"⚠️"}),e.jsx("div",{style:{fontSize:18,color:"#f87171"},children:h}),e.jsx("button",{onClick:()=>g(),style:{padding:"10px 24px",background:"#4f46e5",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontSize:15},children:"Повторить"})]}):e.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",overflow:"hidden"},children:[e.jsx(n.Suspense,{fallback:e.jsxs(j,{children:[e.jsx("div",{className:"spinner-ring"}),e.jsx("span",{className:"spinner-label",children:"Загрузка 3D-галереи…"}),e.jsx("span",{className:"spinner-sub",children:"Three.js / WebXR"})]}),children:e.jsx(_,{artworks:y,roomName:x?.name,onArtworkClick:p,onExitVR:k})}),e.jsxs("div",{style:{position:"absolute",top:0,left:0,bottom:0,width:200,background:"rgba(10,8,20,0.82)",backdropFilter:"blur(8px)",borderRight:"1px solid rgba(255,255,255,0.08)",display:"flex",flexDirection:"column",zIndex:10,overflowY:"auto"},children:[e.jsx("div",{style:{padding:"14px 14px 8px",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase",borderBottom:"1px solid rgba(255,255,255,0.06)"},children:"Залы галереи"}),e.jsx("div",{style:{flex:1,padding:"8px 8px",display:"flex",flexDirection:"column",gap:4},children:o.rooms.map(t=>{const s=t.id===f,l=t.artworkAssignments?new Set(Object.values(t.artworkAssignments).map(w=>w.id)).size:0,u=s?"rgba(99,80,220,0.55)":E[t.theme??""]??"rgba(255,255,255,0.04)";return e.jsxs("button",{onClick:()=>b(t.id),style:{background:u,border:s?"1px solid rgba(130,100,255,0.7)":"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:"9px 10px",cursor:"pointer",color:s?"#fff":"rgba(255,255,255,0.75)",textAlign:"left",fontSize:13,fontWeight:s?600:400,transition:"all 0.15s",lineHeight:1.3},children:[e.jsx("div",{style:{whiteSpace:"normal",wordBreak:"break-word"},children:t.name}),e.jsxs("div",{style:{fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:3},children:[l," ",l===1?"экспонат":l<5?"экспоната":"экспонатов"]})]},t.id)})})]}),r&&e.jsx(C,{onClick:()=>p(null),children:e.jsxs(z,{onClick:t=>t.stopPropagation(),children:[e.jsx(R,{onClick:()=>p(null),children:"×"}),e.jsx("h2",{children:r.title}),e.jsxs("p",{children:[e.jsx("strong",{children:"Художник:"})," ",r.artist_name||r.artist]}),r.year_created&&e.jsxs("p",{children:[e.jsx("strong",{children:"Год:"})," ",r.year_created]}),r.medium&&e.jsxs("p",{children:[e.jsx("strong",{children:"Материал:"})," ",r.medium]}),r.style&&e.jsxs("p",{children:[e.jsx("strong",{children:"Стиль:"})," ",r.style]}),r.dimensions&&e.jsxs("p",{children:[e.jsx("strong",{children:"Размеры:"})," ",r.dimensions]}),r.description&&e.jsxs("p",{children:[e.jsx("strong",{children:"Описание:"})," ",r.description]}),(r.image_url||r.imageUrl)&&e.jsx(A,{src:r.image_url||r.imageUrl,alt:r.title,onError:t=>{t.target.src="https://placehold.co/600x400?text=Изображение+недоступно"}})]})})]})};export{V as default};

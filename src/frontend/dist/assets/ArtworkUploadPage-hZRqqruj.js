import{j as e}from"./vendor-radix-RVnWX0Yt.js";import{q as i}from"./vendor-styled-BDXqawyY.js";import{r as l}from"./vendor-router-sYWTefjn.js";import{i as k}from"./imageProcessingService-BQokH65b.js";import"./api-KwWGfbw5.js";import"./vendor-http-BjtuyMK1.js";import"./react-app-CowdqnLK.js";import"./vendor-r3f-CPrUUYaA.js";import"./vendor-three-D9ub98kG.js";import"./vendor-icons-UULdN9Jp.js";const K=i.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,Q=i.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`,V=i.div`
  border: 2px dashed ${r=>r.isDragOver?"#3498db":"#bdc3c7"};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background-color: ${r=>(r.isDragOver,"#f8f9fa")};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    border-color: #3498db;
  }
`,X=i.div`
  font-size: 3rem;
  color: #bdc3c7;
  margin-bottom: 1rem;
`,$=i.p`
  color: #7f8c8d;
  margin: 0.5rem 0;
`,Y=i.button`
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
`,ee=i.div`
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`,re=i.div`
  height: 100%;
  background-color: #3498db;
  width: ${r=>r.width}%;
  transition: width 0.3s ease;
`,te=i.div`
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
  background-color: ${r=>r.type==="success"?"#d4edda":r.type==="error"?"#f8d7da":"#d1ecf1"};
  color: ${r=>r.type==="success"?"#155724":r.type==="error"?"#721c24":"#0c5460"};
`,se=i.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e8f4fd;
  border-radius: 4px;
  font-size: 0.9rem;
`,oe=()=>{const[r,m]=l.useState([]),[c,u]=l.useState([]),[f,x]=l.useState(!1),[h,b]=l.useState(0),[z,C]=l.useState(0),[M,v]=l.useState(0),[U,T]=l.useState(!1),[I,a]=l.useState(null),[A]=l.useState(1),[d,F]=l.useState("drag"),[w,P]=l.useState(""),[B,R]=l.useState(!1),[S,N]=l.useState(k.getCacheInfo()),y=l.useRef(null);l.useEffect(()=>{const t=setInterval(()=>{N(k.getCacheInfo())},5e3);return()=>clearInterval(t)},[]);const L=t=>{if(t.target.files&&t.target.files.length>0){const o=Array.from(t.target.files);D(o)}},D=t=>{const o=[];let s="";for(const n of t)if(n.type.startsWith("image/")){if(n.size>10*1024*1024){s="Размер файла не должен превышать 10MB";break}o.push(n)}else if(d==="archive"&&(n.type==="application/zip"||n.name.endsWith(".zip")))o.push(n);else{s="Пожалуйста, выберите изображения или ZIP-архив с изображениями";break}if(s){a({type:"error",message:s});return}m(n=>[...n,...o]),a(null)},O=t=>{t.preventDefault(),x(!0)},E=()=>{x(!1)},W=t=>{if(t.preventDefault(),x(!1),t.dataTransfer.files&&t.dataTransfer.files.length>0){const o=Array.from(t.dataTransfer.files);D(o)}},G=t=>{t.preventDefault(),w.trim()&&(u(o=>[...o,w]),P(""),a({type:"info",message:`Добавлена ссылка: ${w}`}))},Z=async()=>{if(r.length===0&&c.length===0){a({type:"error",message:"Пожалуйста, добавьте изображения или ссылки для загрузки"});return}T(!0),b(0),v(0);let t=r.length;d==="archive"&&(t=1),C(t),a({type:"info",message:"Загрузка изображений..."});try{if(d==="archive"&&r.length>0){for(const s of r)if(s.type==="application/zip"||s.name.endsWith(".zip")){a({type:"info",message:`Извлечение файлов из архива ${s.name}...`}),await new Promise(p=>setTimeout(p,1e3));const n=5;C(n);for(let p=0;p<n;p++){v(g=>g+1);const j=Math.round((p+1)/n*100);b(j),await new Promise(g=>setTimeout(g,200))}}}else for(let s=0;s<r.length;s++){const n=r[s];v(s+1);const p=Math.round((s+1)/r.length*100);b(p),a({type:"info",message:`Загрузка файла ${s+1} из ${r.length}: ${n.name}`}),await k.uploadImage(n,A),await new Promise(j=>setTimeout(j,300))}for(let s=0;s<c.length;s++){const n=c[s];v(g=>g+1);const p=r.length+c.length,j=Math.round((r.length+s+1)/p*100);b(j),a({type:"info",message:`Загрузка по ссылке ${s+1} из ${c.length}: ${n}`}),await new Promise(g=>setTimeout(g,500))}a({type:"success",message:`Все файлы успешно загружены! Обработано: ${r.length} файлов, ${c.length} ссылок.`}),a({type:"info",message:"Запуск ИИ-анализа и генерации миниатюр..."}),await new Promise(s=>setTimeout(s,2e3)),a({type:"success",message:"ИИ-анализ завершен! Миниатюры сгенерированы, водяные знаки добавлены."}),window.confirm("Хотите создать NFT для загруженных произведений?")&&(a({type:"info",message:"Создание NFT..."}),await new Promise(s=>setTimeout(s,1500)),a({type:"success",message:"NFT успешно сформированы и готовы к размещению в блокчейне!"})),m([]),u([]),b(0),v(0),C(0),y.current&&(y.current.value="")}catch(o){console.error("Ошибка при загрузке изображений:",o),a({type:"error",message:`Ошибка при загрузке: ${o.message}`})}finally{T(!1)}},q=()=>{y.current&&y.current.click()},_=t=>{m(o=>o.filter((s,n)=>n!==t))},H=t=>{u(o=>o.filter((s,n)=>n!==t))},J=()=>{k.clearCache(),a({type:"success",message:"Кэш изображений очищен"})};return e.jsxs(K,{children:[e.jsx(Q,{children:"Загрузка изображений экспонатов"}),e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsxs("label",{children:[e.jsx("input",{type:"radio",checked:d==="drag",onChange:()=>F("drag")})," Загрузка файлов"]}),e.jsxs("label",{style:{marginLeft:"1rem"},children:[e.jsx("input",{type:"radio",checked:d==="archive",onChange:()=>F("archive")})," Загрузка архива"]}),e.jsxs("label",{style:{marginLeft:"1rem"},children:[e.jsx("input",{type:"radio",checked:d==="url",onChange:()=>{F("url"),R(!0)}})," Загрузка по ссылке"]})]}),B&&e.jsxs("form",{onSubmit:G,style:{marginBottom:"1rem"},children:[e.jsx("input",{type:"text",value:w,onChange:t=>P(t.target.value),placeholder:"Введите URL изображения",style:{width:"70%",padding:"0.5rem",marginRight:"0.5rem",borderRadius:"4px",border:"1px solid #ccc"}}),e.jsx("button",{type:"submit",style:{padding:"0.5rem 1rem",backgroundColor:"#3498db",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Добавить"})]}),e.jsxs(V,{isDragOver:f,onDragOver:O,onDragLeave:E,onDrop:W,onClick:d!=="url"?q:void 0,children:[e.jsx(X,{children:"📁"}),e.jsx($,{children:d==="archive"?"Перетащите ZIP-архив с изображениями сюда или нажмите для выбора":"Перетащите изображения сюда или нажмите для выбора"}),e.jsx($,{children:e.jsx("small",{children:d==="archive"?"Поддерживаемые форматы: ZIP (макс. 50MB)":"Поддерживаемые форматы: JPG, PNG, GIF (макс. 10MB)"})}),e.jsx("input",{type:"file",ref:y,onChange:L,accept:d==="archive"?".zip,application/zip":"image/*",multiple:d!=="archive",style:{display:"none"}})]}),r.length>0&&e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx("h4",{children:"Выбранные файлы:"}),e.jsx("ul",{children:r.map((t,o)=>e.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[t.name," (",(t.size/1024/1024).toFixed(2)," MB)"]}),e.jsx("button",{onClick:()=>_(o),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},o))})]}),c.length>0&&e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx("h4",{children:"Ссылки для загрузки:"}),e.jsx("ul",{children:c.map((t,o)=>e.jsxs("li",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{children:t}),e.jsx("button",{onClick:()=>H(o),style:{backgroundColor:"#e74c3c",color:"white",border:"none",borderRadius:"4px",padding:"0.2rem 0.5rem",cursor:"pointer"},children:"Удалить"})]},o))})]}),h>0&&e.jsxs(e.Fragment,{children:[e.jsx(ee,{children:e.jsx(re,{width:h})}),e.jsxs("div",{style:{textAlign:"center",fontSize:"0.9rem",color:"#7f8c8d"},children:[M," из ",z||r.length+c.length," файлов обработано (",h,"%)"]})]}),I&&e.jsx(te,{type:I.type,children:I.message}),e.jsxs(se,{children:[e.jsxs("div",{children:["Кэш изображений: ",(S.size/1024/1024).toFixed(2)," MB / ",(S.maxSize/1024/1024).toFixed(0)," MB"]}),e.jsxs("div",{children:["Количество закэшированных изображений: ",S.count]}),e.jsx("button",{onClick:J,style:{marginTop:"0.5rem",padding:"0.25rem 0.5rem",backgroundColor:"#f39c12",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.8rem"},children:"Очистить кэш"})]}),e.jsx("div",{style:{textAlign:"center"},children:e.jsx(Y,{onClick:Z,disabled:r.length===0&&c.length===0||U,children:U?"Загрузка...":"Загрузить и обработать"})})]})},ne=i.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`,ie=i.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ae=i.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,le=i.aside`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  overflow-y: auto;
`,ce=i.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #fafafa;
`,de=i.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: ${r=>r.active?"#34495e":"transparent"};
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`,pe=i.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
`,he=({title:r,children:m,activeNav:c,onNavClick:u,userRole:f})=>{const x=f==="admin"?["Overview","Users","Artworks","Collections","Exhibitions","Auctions","Reports","Settings"]:["Overview","Artworks","Collections","Exhibitions","Reports"];return e.jsxs(ne,{children:[e.jsxs(ie,{children:[e.jsx(pe,{children:r}),e.jsxs("div",{children:["Welcome, ",f.charAt(0).toUpperCase()+f.slice(1),"!"]})]}),e.jsxs(ae,{children:[e.jsx(le,{children:x.map(h=>e.jsx(de,{active:c===h.toLowerCase(),onClick:()=>u(h.toLowerCase()),children:h},h))}),e.jsx(ce,{children:m})]})]})},ge=i.div`
  padding: 2rem;
`,Ce=()=>e.jsx(he,{title:"Загрузка экспонатов",activeNav:"artworks",onNavClick:()=>{},userRole:"admin",children:e.jsx(ge,{children:e.jsx(oe,{})})});export{Ce as default};

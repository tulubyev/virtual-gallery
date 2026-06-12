import{j as t}from"./vendor-radix-RVnWX0Yt.js";import{r as d}from"./vendor-router-sYWTefjn.js";import{q as n}from"./vendor-styled-BDXqawyY.js";import"./api-CI6D_uHR.js";import{i as j}from"./imageProcessingService-Cf9HzArh.js";import{A as B}from"./ArtworkAnalysisResult-Cj_NQrfx.js";import"./vendor-http-BjtuyMK1.js";import"./react-app-Cn4KxLpv.js";import"./vendor-r3f-CPrUUYaA.js";import"./vendor-three-D9ub98kG.js";import"./vendor-icons-UULdN9Jp.js";const E=n.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 1rem 0;
  overflow: hidden;
`,L=n.div`
  height: 20px;
  background: linear-gradient(90deg, #6200ee, #3700b3);
  width: ${({percentage:s})=>`${s}%`};
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
`,G=n.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
`,W=({percentage:s,status:c,showPercentage:o=!0})=>t.jsxs("div",{children:[t.jsx(E,{children:t.jsx(L,{percentage:s,children:o&&`${Math.round(s)}%`})}),t.jsx(G,{children:c})]}),N=n.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,q=n.div`
  border: 2px dashed ${({isDragActive:s})=>s?"#6200ee":"#ddd"};
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({isDragActive:s})=>s?"rgba(98, 0, 238, 0.05)":"#fafafa"};
  transition: all 0.3s ease;

  &:hover {
    border-color: #6200ee;
  }
`,J=n.div`
  font-size: 3rem;
  color: #ccc;
  margin-bottom: 1rem;
`,T=n.p`
  color: #666;
  margin: 0.5rem 0;
`,F=n.button`
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
`,O=n.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`,H=n.div`
  position: relative;
  width: 150px;
  height: 150px;
`,M=n.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`,K=n.button`
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
`,Q=({onUploadComplete:s})=>{const[c,o]=d.useState(!1),[p,b]=d.useState([]),[x,w]=d.useState([]),[f,y]=d.useState(null),[v,m]=d.useState(!1),g=d.useRef(null),k=e=>{e.preventDefault(),e.stopPropagation(),e.type==="dragenter"||e.type==="dragover"?o(!0):e.type==="dragleave"&&o(!1)},P=e=>{e.preventDefault(),e.stopPropagation(),o(!1),e.dataTransfer.files&&e.dataTransfer.files[0]&&_(e.dataTransfer.files)},D=e=>{e.preventDefault(),e.target.files&&e.target.files[0]&&_(e.target.files)},_=e=>{const a=Array.from(e),l=a.filter(i=>i.type.startsWith("image/")&&(i.type==="image/jpeg"||i.type==="image/png"||i.type==="image/webp"||i.type==="image/jpg"));if(l.length!==a.length&&alert("Поддерживаются только изображения форматов JPEG, PNG, WebP"),l.length>0){b(h=>[...h,...l]);const i=l.map(h=>URL.createObjectURL(h));w(h=>[...h,...i])}},A=e=>{b(a=>a.filter((l,i)=>i!==e)),w(a=>a.filter((l,i)=>i!==e))},S=async()=>{if(p.length===0){alert("Пожалуйста, выберите изображения для загрузки");return}m(!0),y(0);try{for(let e=0;e<p.length;e++){const a=p[e],l=setInterval(()=>{y(h=>{if(h===null)return 0;const u=h+10;return u>=100?(clearInterval(l),100):u})},200),i=await j.uploadImage(a,1);await j.analyzeImage(i.artwork_id||1),clearInterval(l),y(100),s(i)}setTimeout(()=>{b([]),w([]),y(null),m(!1),alert("Изображения успешно загружены и отправлены на анализ")},1e3)}catch(e){console.error("Ошибка при загрузке изображений:",e),alert("Ошибка при загрузке изображений"),m(!1),y(null)}},r=()=>{g.current&&g.current.click()};return t.jsxs(N,{children:[t.jsx("h3",{children:"Загрузка изображений экспонатов"}),t.jsxs(q,{isDragActive:c,onDragEnter:k,onDragLeave:k,onDragOver:k,onDrop:P,onClick:r,children:[t.jsx(J,{children:"📁"}),t.jsx(T,{children:"Перетащите изображения сюда или нажмите для выбора"}),t.jsx(T,{children:"Поддерживаются форматы: JPEG, PNG, WebP"}),t.jsx(F,{children:"Выбрать файлы"}),t.jsx("input",{ref:g,type:"file",multiple:!0,accept:"image/jpeg,image/png,image/webp,image/jpg",onChange:D,style:{display:"none"}})]}),f!==null&&t.jsx(W,{percentage:f,status:f<100?"Загрузка...":"Загрузка завершена"}),x.length>0&&t.jsx(O,{children:x.map((e,a)=>t.jsxs(H,{children:[t.jsx(M,{src:e,alt:`Preview ${a}`}),t.jsx(K,{onClick:()=>A(a),children:"×"})]},a))}),p.length>0&&t.jsx(F,{onClick:S,disabled:v,style:{marginTop:"1rem"},children:v?"Загрузка...":`Загрузить ${p.length} файл(ов)`})]})},$=n.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,V=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,X=n.h1`
  color: #333;
  margin: 0;
`,Y=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`,U=n.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
`,C=n.p`
  font-size: 2rem;
  font-weight: bold;
  color: #6200ee;
  margin: 0.5rem 0;
`,I=n.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,R=n.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,z=n.button`
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
`,Z=n.table`
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
`,ee=s=>{switch(s){case"uploaded":return"#2196f3";case"analyzing":return"#ff9800";case"analyzed":return"#4caf50";case"review_pending":return"#9c27b0";case"published":return"#8bc34a";case"rejected":return"#f44336";default:return"#9e9e9e"}};function te(s){return t.jsx("span",{style:{padding:"0.25rem 0.75rem",borderRadius:"20px",fontSize:"0.8rem",fontWeight:500,backgroundColor:ee(s.status),color:"white"},children:s.children})}const pe=()=>{const[s,c]=d.useState([]),[o,p]=d.useState(null),[b,x]=d.useState(null),[w,f]=d.useState({}),[y,v]=d.useState(!0),[m,g]=d.useState({totalUploads:0,analyzing:0,analyzed:0,published:0});d.useEffect(()=>{(async()=>{try{const e=await j.getUserUploads(1);c(e);const a=e.length,l=e.filter(u=>u.status==="analyzing").length,i=e.filter(u=>u.status==="analyzed").length,h=e.filter(u=>u.status==="published").length;g({totalUploads:a,analyzing:l,analyzed:i,published:h})}catch(e){console.error("Ошибка при загрузке загрузок:",e)}finally{v(!1)}})()},[]);const k=async r=>{c(e=>[...e,r]),g(e=>({...e,totalUploads:e.totalUploads+1,analyzing:e.analyzing+1})),p(r);try{const e=await j.getImageAnalysis(r.artwork_id||1);x(e),c(a=>a.map(l=>l.artwork_id===r.artwork_id?{...l,status:"analyzed",analysis_result:e}:l)),g(a=>({...a,analyzing:a.analyzing-1,analyzed:a.analyzed+1}))}catch(e){console.error("Ошибка при загрузке результатов анализа:",e)}},P=async r=>{if(p(r),r.analysis_result)x(r.analysis_result),f(r.artwork_data||{});else try{const e=await j.getImageAnalysis(r.artwork_id||1);x(e),f({...r.artwork_data,title:(r.original_name??"").replace(/\.[^/.]+$/,"")})}catch(e){console.error("Ошибка при загрузке результатов анализа:",e)}},D=(r,e)=>{f(a=>({...a,[r]:e}))},_=async()=>{if(!o){alert("Сначала выберите изображение для сохранения");return}try{c(r=>r.map(e=>e.artwork_id===o.artwork_id?{...e,status:"review_pending",artwork_data:w}:e)),g(r=>({...r,analyzed:r.analyzed-1})),alert("Карточка экспоната сохранена и отправлена на проверку")}catch(r){console.error("Ошибка при сохранении карточки:",r),alert("Ошибка при сохранении карточки")}},A=async()=>{if(!o){alert("Сначала выберите изображение для публикации");return}try{c(r=>r.map(e=>e.artwork_id===o.artwork_id?{...e,status:"published"}:e)),g(r=>({...r,analyzed:r.analyzed-1,published:r.published+1})),alert("Экспонат опубликован")}catch(r){console.error("Ошибка при публикации:",r),alert("Ошибка при публикации экспоната")}},S=async()=>{if(!o){alert("Сначала выберите изображение для повторного анализа");return}try{c(e=>e.map(a=>a.artwork_id===o.artwork_id?{...a,status:"analyzing"}:a)),g(e=>({...e,analyzed:e.analyzed-1,analyzing:e.analyzing+1}));const r=await j.reanalyzeImage(o.artwork_id||1);x(r),c(e=>e.map(a=>a.artwork_id===o.artwork_id?{...a,status:"analyzed",analysis_result:r}:a)),g(e=>({...e,analyzing:e.analyzing-1,analyzed:e.analyzed+1})),alert("Повторный анализ завершен")}catch(r){console.error("Ошибка при повторном анализе:",r),alert("Ошибка при повторном анализе")}};return y?t.jsx($,{children:"Загрузка данных..."}):t.jsxs($,{children:[t.jsx(V,{children:t.jsx(X,{children:"Дашборд сотрудника музея"})}),t.jsxs(Y,{children:[t.jsxs(U,{children:[t.jsx("h3",{children:"Всего загрузок"}),t.jsx(C,{children:m.totalUploads})]}),t.jsxs(U,{children:[t.jsx("h3",{children:"На анализе"}),t.jsx(C,{children:m.analyzing})]}),t.jsxs(U,{children:[t.jsx("h3",{children:"Проанализировано"}),t.jsx(C,{children:m.analyzed})]}),t.jsxs(U,{children:[t.jsx("h3",{children:"Опубликовано"}),t.jsx(C,{children:m.published})]})]}),t.jsxs(I,{children:[t.jsx(R,{children:"Загрузка новых изображений"}),t.jsx(Q,{onUploadComplete:k})]}),t.jsxs(I,{children:[t.jsx(R,{children:"Загруженные изображения"}),t.jsxs(Z,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Имя файла"}),t.jsx("th",{children:"Дата загрузки"}),t.jsx("th",{children:"Статус"}),t.jsx("th",{children:"Действия"})]})}),t.jsx("tbody",{children:s.map(r=>t.jsxs("tr",{children:[t.jsx("td",{children:r.original_name}),t.jsx("td",{children:r.upload_date?new Date(r.upload_date).toLocaleDateString():""}),t.jsx("td",{children:t.jsxs(te,{status:r.status??"",children:[r.status==="uploaded"&&"Загружено",r.status==="analyzing"&&"Анализируется",r.status==="analyzed"&&"Проанализировано",r.status==="review_pending"&&"На проверке",r.status==="published"&&"Опубликовано",r.status==="rejected"&&"Отклонено"]})}),t.jsxs("td",{children:[t.jsx(z,{onClick:()=>P(r),children:o?.artwork_id===r.artwork_id?"Выбрано":"Выбрать"}),r.status==="analyzed"&&t.jsx(z,{onClick:S,children:"Повторный анализ"})]})]},r.artwork_id))})]})]}),o&&b&&t.jsxs(I,{children:[t.jsxs(R,{children:["Анализ изображения: ",o.original_name]}),t.jsx(B,{analysis:b,artwork:w,onArtworkChange:D}),t.jsx(z,{onClick:_,children:"Сохранить карточку и отправить на проверку"}),t.jsx(z,{onClick:A,children:"Опубликовать (для подтвержденных карточек)"}),t.jsx(z,{onClick:S,children:"Повторный анализ"})]})]})};export{pe as default};

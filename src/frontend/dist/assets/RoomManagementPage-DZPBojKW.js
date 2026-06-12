import{j as e}from"./vendor-radix-RVnWX0Yt.js";import{j as L,r as o}from"./vendor-router-sYWTefjn.js";import{q as n}from"./vendor-styled-BDXqawyY.js";import"./react-app-Bg2uqVhR.js";import{a as P}from"./artworkService-CJa9nFAE.js";import{g as m}from"./galleryService-CMRfXrxe.js";import"./vendor-r3f-CPrUUYaA.js";import"./vendor-three-D9ub98kG.js";import"./vendor-http-BjtuyMK1.js";import"./vendor-icons-J-XmcL5t.js";const k=n.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,I=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,B=n.h1`
  color: #333;
  margin: 0;
`,N=n.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,h=n.div`
  margin-bottom: 1.5rem;
`,p=n.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`,G=n.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,H=n.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`,S=n.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`,u=n.button`
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
`,Z=()=>{const{galleryId:d}=L(),[a,c]=o.useState([]),[,C]=o.useState([]),[D,F]=o.useState(!0),[x,g]=o.useState(""),[j,f]=o.useState(""),[l,v]=o.useState(""),[b,y]=o.useState(""),[,A]=o.useState([]),[i,R]=o.useState(null);o.useEffect(()=>{(async()=>{try{if(d){const t=await m.getRooms(parseInt(d));c(t);const s=await P.getAllArtworks();C(s)}}catch(t){console.error("Ошибка при загрузке данных:",t)}finally{F(!1)}})()},[d]);const E=async r=>{r.preventDefault();try{const t={name:x,description:j,theme:l,region:b,tags:[l],layout_settings:{background_color:"#ffffff",lighting_settings:{ambient_intensity:.6,directional_intensity:.8,color_temperature:6500},wall_configurations:[],navigation_points:[]}},s=await m.createRoom(parseInt(d),t);c([...a,s]),w()}catch(t){console.error("Ошибка при создании зала:",t)}},T=async r=>{if(r.preventDefault(),!!i)try{const t={name:x,description:j,theme:l,region:b},s=await m.updateRoom(i.room_id,t);c(a.map(_=>_.room_id===s.room_id?s:_)),w()}catch(t){console.error("Ошибка при обновлении зала:",t)}},q=async r=>{if(window.confirm("Вы уверены, что хотите удалить этот зал?"))try{await m.deleteRoom(r),c(a.filter(t=>t.room_id!==r))}catch(t){console.error("Ошибка при удалении зала:",t)}},z=r=>{R(r),g(r.name),f(r.description||""),v(r.theme??""),y(r.region||"")},w=()=>{g(""),f(""),v(""),y(""),A([]),R(null)};return D?e.jsx(k,{children:"Загрузка данных..."}):e.jsxs(k,{children:[e.jsx(I,{children:e.jsx(B,{children:"Управление залами галереи"})}),e.jsxs(N,{children:[e.jsx("h2",{children:i?"Редактировать зал":"Создать новый зал"}),e.jsxs("form",{onSubmit:i?T:E,children:[e.jsxs(h,{children:[e.jsx(p,{htmlFor:"name",children:"Название зала:"}),e.jsx(G,{id:"name",type:"text",value:x,onChange:r=>g(r.target.value),required:!0})]}),e.jsxs(h,{children:[e.jsx(p,{htmlFor:"description",children:"Описание:"}),e.jsx(H,{id:"description",value:j,onChange:r=>f(r.target.value)})]}),e.jsxs(h,{children:[e.jsx(p,{htmlFor:"theme",children:"Тема зала:"}),e.jsxs(S,{id:"theme",value:l,onChange:r=>v(r.target.value),required:!0,children:[e.jsx("option",{value:"",children:"Выберите тему"}),e.jsx("option",{value:"impressionism",children:"Импрессионизм"}),e.jsx("option",{value:"sculpture",children:"Скульптура"}),e.jsx("option",{value:"renaissance",children:"Ренессанс"}),e.jsx("option",{value:"contemporary",children:"Современное искусство"}),e.jsx("option",{value:"photography",children:"Фотография"}),e.jsx("option",{value:"asian_art",children:"Азиатское искусство"}),e.jsx("option",{value:"european_art",children:"Европейское искусство"}),e.jsx("option",{value:"american_art",children:"Американское искусство"})]})]}),e.jsxs(h,{children:[e.jsx(p,{htmlFor:"region",children:"Регион (необязательно):"}),e.jsxs(S,{id:"region",value:b,onChange:r=>y(r.target.value),children:[e.jsx("option",{value:"",children:"Выберите регион"}),e.jsx("option",{value:"european",children:"Европейский"}),e.jsx("option",{value:"asian",children:"Азиатский"}),e.jsx("option",{value:"american",children:"Американский"}),e.jsx("option",{value:"african",children:"Африканский"}),e.jsx("option",{value:"middle_eastern",children:"Ближневосточный"})]})]}),e.jsx(u,{type:"submit",children:i?"Обновить зал":"Создать зал"}),i&&e.jsx(u,{type:"button",style:{marginLeft:"1rem",backgroundColor:"#f44336"},onClick:w,children:"Отмена"})]})]}),e.jsxs("div",{children:[e.jsx("h2",{children:"Существующие залы"}),a.length>0?e.jsx("div",{children:a.map(r=>e.jsxs("div",{style:{border:"1px solid #ddd",borderRadius:"8px",padding:"1rem",marginBottom:"1rem"},children:[e.jsx("h3",{children:r.name}),e.jsxs("p",{children:[e.jsx("strong",{children:"Тема:"})," ",r.theme]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Регион:"})," ",r.region||"Не указан"]}),r.description&&e.jsxs("p",{children:[e.jsx("strong",{children:"Описание:"})," ",r.description]}),e.jsxs("div",{style:{marginTop:"1rem"},children:[e.jsx(u,{onClick:()=>z(r),children:"Редактировать"}),e.jsx(u,{style:{marginLeft:"0.5rem",backgroundColor:"#f44336"},onClick:()=>q(r.room_id??0),children:"Удалить"})]})]},r.room_id))}):e.jsx("p",{children:"В этой галерее пока нет залов"})]})]})};export{Z as default};

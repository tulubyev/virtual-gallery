import{j as e}from"./vendor-radix-RVnWX0Yt.js";import{j as u,i as b,r as a}from"./vendor-router-sYWTefjn.js";import{q as r}from"./vendor-styled-BDXqawyY.js";import"./react-app-BbwYSf8i.js";import{a as v}from"./artworkService-CXybfGov.js";import{g as y}from"./galleryService-qeam54zo.js";import"./vendor-r3f-CPrUUYaA.js";import"./vendor-three-D9ub98kG.js";import"./vendor-http-BjtuyMK1.js";import"./vendor-icons-J-XmcL5t.js";const w=r.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`,k=r.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-style: italic;
`,R=r.div`
  padding: 1rem;
`,A=r.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`,C=r.p`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: 500;
`,_=r.p`
  margin: 0;
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`,D=r.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`,S=({artwork:t,onClick:i})=>e.jsxs(w,{onClick:i,children:[e.jsx(k,{children:t.image_url?e.jsx("img",{src:t.image_url,alt:t.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("span",{children:"Изображение недоступно"})}),e.jsxs(R,{children:[e.jsx(A,{children:t.title}),e.jsxs(C,{children:["Автор: ",t.artist_name]}),e.jsx(_,{children:t.description?.substring(0,100)+"..."}),e.jsxs(D,{children:[e.jsx("span",{children:t.year_created||"Неизвестно"}),e.jsx("span",{children:t.medium||"Неизвестно"})]})]})]}),c=r.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,B=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,I=r.h1`
  color: #333;
  margin: 0;
`,z=r.p`
  color: #666;
  margin: 0.5rem 0 2rem 0;
`,E=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`,q=r.button`
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
`,K=()=>{const{id:t}=u(),i=b(),[o,d]=a.useState(null),[l,m]=a.useState([]),[p,h]=a.useState(!0);a.useEffect(()=>{(async()=>{try{if(t){const n=await y.getRoomById(parseInt(t));d(n);const x=(await v.getAllArtworks()).filter(f=>f.tags.some(j=>(n.tags??[]).includes(j)));m(x)}}catch(n){console.error("Ошибка при загрузке данных зала:",n)}finally{h(!1)}})()},[t]);const g=()=>{i(-1)};return p?e.jsx(c,{children:"Загрузка зала..."}):o?e.jsxs(c,{children:[e.jsx(q,{onClick:g,children:"← Назад к галерее"}),e.jsx(B,{children:e.jsxs("div",{children:[e.jsx(I,{children:o.name}),o.description&&e.jsx(z,{children:o.description}),e.jsxs("p",{children:[e.jsx("strong",{children:"Тема:"})," ",o.theme]}),o.region&&e.jsxs("p",{children:[e.jsx("strong",{children:"Регион:"})," ",o.region]})]})}),e.jsxs("div",{children:[e.jsx("h2",{children:"Экспонаты в зале"}),l.length>0?e.jsx(E,{children:l.map(s=>e.jsx(S,{artwork:s,onClick:()=>i(`/artworks/${s.artwork_id}`)},s.artwork_id))}):e.jsx("p",{children:"В этом зале пока нет экспонатов"})]})]}):e.jsx(c,{children:"Зал не найден"})};export{K as default};

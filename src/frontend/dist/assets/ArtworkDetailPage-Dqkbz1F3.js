import{j as r}from"./vendor-radix-RVnWX0Yt.js";import{j as S,i as _,r as s}from"./vendor-router-sYWTefjn.js";import{q as t}from"./vendor-styled-BDXqawyY.js";import"./api-KwWGfbw5.js";import{a as x}from"./artworkService-CcKDn9WN.js";import"./vendor-http-BjtuyMK1.js";import"./react-app-CowdqnLK.js";import"./vendor-r3f-CPrUUYaA.js";import"./vendor-three-D9ub98kG.js";import"./vendor-icons-UULdN9Jp.js";const m=t.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`,I=t.button`
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
`,B=t.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`,C=t.div`
  flex: 1;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
`,F=t.div`
  flex: 1;
`,T=t.h1`
  margin: 0 0 1rem 0;
  color: #333;
`,D=t.h2`
  margin: 0 0 1.5rem 0;
  color: #666;
  font-weight: 500;
`,M=t.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`,$=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`,c=t.div`
  display: flex;
  flex-direction: column;
`,a=t.span`
  font-weight: bold;
  color: #666;
  margin-bottom: 0.25rem;
`,l=t.span`
  color: #333;
`,E=t.div`
  margin-top: 1.5rem;
`,q=t.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,G=t.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`,p=t.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`,L=t(p)`
  background-color: ${({isFavorite:i})=>i?"#f44336":"#2196f3"};
  color: white;
`,P=t(p)`
  background-color: #4caf50;
  color: white;
`,R=t.div`
  margin-top: 3rem;
`,z=t.h3`
  margin-bottom: 1.5rem;
  color: #333;
`,H=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`,Z=()=>{const{id:i}=S(),h=_(),[e,j]=s.useState(null),[g,u]=s.useState([]),[f,w]=s.useState(!0),[d,b]=s.useState(!1);s.useEffect(()=>{(async()=>{try{if(i){const n=await x.getArtworkById(parseInt(i));j(n);const A=await x.getSimilarArtworks(parseInt(i),6);u(A)}}catch(n){console.error("Ошибка при загрузке экспоната:",n)}finally{w(!1)}})()},[i]);const k=()=>{h(-1)},v=()=>{b(!d)},y=()=>{navigator.share?navigator.share({title:e?.title,text:`Посмотрите это удивительное произведение искусства: ${e?.title} от ${e?.artist_name}`,url:window.location.href}).catch(console.error):navigator.clipboard.writeText(window.location.href).then(()=>{alert("Ссылка скопирована в буфер обмена!")})};return f?r.jsx(m,{children:"Загрузка экспоната..."}):e?r.jsxs(m,{children:[r.jsx(I,{onClick:k,children:"← Назад"}),r.jsxs(B,{children:[r.jsx(C,{children:e.image_url?r.jsx("img",{src:e.image_url,alt:e.title,style:{width:"100%",height:"100%",objectFit:"contain"}}):r.jsx("span",{children:"Изображение недоступно"})}),r.jsxs(F,{children:[r.jsx(T,{children:e.title}),r.jsx(D,{children:e.artist_name}),r.jsx(M,{children:e.description}),r.jsxs($,{children:[r.jsxs(c,{children:[r.jsx(a,{children:"Год создания"}),r.jsx(l,{children:e.year_created||"Неизвестно"})]}),r.jsxs(c,{children:[r.jsx(a,{children:"Техника"}),r.jsx(l,{children:e.medium||"Неизвестно"})]}),r.jsxs(c,{children:[r.jsx(a,{children:"Размеры"}),r.jsx(l,{children:e.dimensions||"Неизвестны"})]}),r.jsxs(c,{children:[r.jsx(a,{children:"Стиль"}),r.jsx(l,{children:e.style||"Неизвестно"})]})]}),r.jsxs(E,{children:[r.jsx(a,{children:"Теги:"}),e.tags&&e.tags.length>0?e.tags.map((o,n)=>r.jsx(q,{children:o},n)):r.jsx("span",{children:"Теги отсутствуют"})]}),r.jsxs(G,{children:[r.jsx(L,{isFavorite:d,onClick:v,children:d?"Удалить из избранного":"Добавить в избранное"}),r.jsx(P,{onClick:y,children:"Поделиться"})]})]})]}),g.length>0&&r.jsxs(R,{children:[r.jsx(z,{children:"Похожие экспонаты"}),r.jsx(H,{children:g.map(o=>r.jsxs("div",{onClick:()=>h(`/artworks/${o.artwork_id}`),style:{cursor:"pointer"},children:[r.jsx("img",{src:o.image_url||"",alt:o.title,style:{width:"100%",height:"150px",objectFit:"cover",borderRadius:"4px"}}),r.jsxs("div",{children:[r.jsx("h4",{children:o.title}),r.jsx("p",{children:o.artist_name})]})]},o.artwork_id))})]})]}):r.jsx(m,{children:"Экспонат не найден"})};export{Z as default};

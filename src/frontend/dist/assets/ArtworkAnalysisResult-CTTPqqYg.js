import{j as e}from"./vendor-radix-Cxgh2Cme.js";import{q as d}from"./styled-components.browser.esm-CbTRkjly.js";const c=d.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
`,l=d.h3`
  color: #333;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`,o=d.div`
  margin: 1rem 0;
`,a=d.span`
  display: inline-block;
  background-color: #6200ee;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`,h=d.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${({color:r})=>r};
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
`,x=d.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
`,m=d.div`
  height: 100%;
  width: ${({percentage:r})=>`${r}%`};
  background-color: #4caf50;
`,g=d.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`,u=({analysis:r,artwork:n,onArtworkChange:t})=>e.jsxs(c,{children:[e.jsx(l,{children:"Результаты ИИ-анализа"}),e.jsxs("div",{children:[e.jsxs("h4",{children:["Предполагаемый стиль: ",e.jsx("strong",{children:r.style})]}),e.jsxs("p",{children:["Доверительная оценка: ",Math.round((r.confidence??0)*100),"%"]}),e.jsx(x,{children:e.jsx(m,{percentage:(r.confidence??0)*100})})]}),e.jsx("div",{children:e.jsxs("h4",{children:["Оценка периода: ",e.jsx("strong",{children:r.estimated_period})]})}),e.jsxs(o,{children:[e.jsx("h4",{children:"Обнаруженные теги:"}),(r.tags??[]).map((i,s)=>e.jsx(a,{children:i},s))]}),e.jsxs("div",{children:[e.jsx("h4",{children:"Доминирующие цвета:"}),e.jsx("div",{children:(r.dominant_colors??[]).map((i,s)=>e.jsx(h,{color:i,title:i},s))})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"Обнаруженные объекты:"}),(r.detected_objects??[]).map((i,s)=>e.jsxs(g,{children:[e.jsxs("div",{children:[e.jsx("strong",{children:i.name})," (доверие: ",Math.round(i.confidence*100),"%)"]}),e.jsxs("div",{children:["Позиция: (",i.bounding_box.x,", ",i.bounding_box.y,"), Размер: ",i.bounding_box.width,"x",i.bounding_box.height]})]},s))]}),e.jsxs("div",{children:[e.jsx("h4",{children:"Качество изображения:"}),e.jsxs("p",{children:["Яркость: ",(r.image_quality?.brightness??0).toFixed(2)]}),e.jsxs("p",{children:["Контрастность: ",(r.image_quality?.contrast??0).toFixed(2)]}),e.jsxs("p",{children:["Резкость: ",(r.image_quality?.sharpness??0).toFixed(2)]}),e.jsxs("p",{children:["Разрешение: ",r.image_quality?.resolution?.width??0,"x",r.image_quality?.resolution?.height??0]})]}),e.jsx(l,{children:"Редактирование карточки экспоната"}),e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("strong",{children:"Название:"}),e.jsx("input",{type:"text",value:n.title||"",onChange:i=>t("title",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("strong",{children:"Имя художника:"}),e.jsx("input",{type:"text",value:n.artist_name||"",onChange:i=>t("artist_name",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("strong",{children:"Год создания:"}),e.jsx("input",{type:"number",value:n.year_created||"",onChange:i=>t("year_created",i.target.value?parseInt(i.target.value):void 0),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("strong",{children:"Техника:"}),e.jsx("input",{type:"text",value:n.medium||"",onChange:i=>t("medium",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("strong",{children:"Стиль:"}),e.jsx("input",{type:"text",value:n.style||"",onChange:i=>t("style",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})}),e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("strong",{children:"Описание:"}),e.jsx("textarea",{value:n.description||"",onChange:i=>t("description",i.target.value),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0",minHeight:"100px"}})]})}),e.jsx("div",{children:e.jsxs("label",{children:[e.jsx("strong",{children:"Теги (через запятую):"}),e.jsx("input",{type:"text",value:n.tags?.join(", ")||"",onChange:i=>t("tags",i.target.value.split(",").map(s=>s.trim())),style:{width:"100%",padding:"0.5rem",margin:"0.5rem 0"}})]})})]});export{u as A};

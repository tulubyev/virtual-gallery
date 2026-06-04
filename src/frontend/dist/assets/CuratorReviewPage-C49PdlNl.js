import{j as e}from"./vendor-radix-BNkm1iaq.js";import{a as n}from"./vendor-router-Bi5ontUF.js";import{q as o}from"./styled-components.browser.esm-BuKB8Ga5.js";import"./api-D9n5ghVV.js";import{i as c}from"./imageProcessingService-DtlwHRLY.js";import{A as v}from"./ArtworkAnalysisResult-BHEr9rz7.js";import"./vendor-http-BjtuyMK1.js";const m=o.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`,S=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`,k=o.h1`
  color: #333;
  margin: 0;
`,u=o.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`,p=o.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 1.5rem;
`,l=o.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;

  ${({variant:a})=>{switch(a){case"success":return"background-color: #4caf50; color: white;";case"danger":return"background-color: #f44336; color: white;";default:return"background-color: #6200ee; color: white;"}}}

  &:hover {
    opacity: 0.9;
  }
`,y=o.table`
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
`,C=o.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({status:a})=>{switch(a){case"pending":return"#2196f3";case"approved":return"#4caf50";case"rejected":return"#f44336";case"needs_revision":return"#ff9800";default:return"#9e9e9e"}}};
  color: white;
`,R=o.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
  min-height: 100px;
`,z=()=>{const[a,d]=n.useState([]),[s,g]=n.useState(null),[i,h]=n.useState(""),[x,w]=n.useState(!0);n.useEffect(()=>{(async()=>{try{const t=await c.getSubmissionsForReview();d(t)}catch(t){console.error("Ошибка при загрузке материалов на проверку:",t)}finally{w(!1)}})()},[]);const j=r=>{g(r),h(r.reviewer_notes||"")},b=async()=>{if(!s){alert("Сначала выберите материал для одобрения");return}try{await c.approveSubmission(s.submission_id,{...s.artwork_upload?.artwork_data,status:"published",reviewed_by:1,reviewed_at:new Date}),d(r=>r.map(t=>t.submission_id===s.submission_id?{...t,status:"approved"}:t)),alert("Материал одобрен и опубликован")}catch(r){console.error("Ошибка при одобрении материала:",r),alert("Ошибка при одобрении материала")}},f=async()=>{if(!s){alert("Сначала выберите материал для отклонения");return}try{await c.rejectSubmission(s.submission_id,i),d(r=>r.map(t=>t.submission_id===s.submission_id?{...t,status:"rejected",reviewer_notes:i}:t)),alert("Материал отклонен")}catch(r){console.error("Ошибка при отклонении материала:",r),alert("Ошибка при отклонении материала")}},_=async()=>{if(!s){alert("Сначала выберите материал для возврата на доработку");return}try{await c.rejectSubmission(s.submission_id,i),d(r=>r.map(t=>t.submission_id===s.submission_id?{...t,status:"needs_revision",reviewer_notes:i}:t)),alert("Материал возвращен на доработку")}catch(r){console.error("Ошибка при возврате на доработку:",r),alert("Ошибка при возврате на доработку")}};return x?e.jsx(m,{children:"Загрузка материалов на проверку..."}):e.jsxs(m,{children:[e.jsx(S,{children:e.jsx(k,{children:"Проверка карточек экспонатов"})}),e.jsxs(u,{children:[e.jsx(p,{children:"Материалы на проверке"}),e.jsxs(y,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Имя файла"}),e.jsx("th",{children:"Загружено пользователем"}),e.jsx("th",{children:"Дата загрузки"}),e.jsx("th",{children:"Статус"}),e.jsx("th",{children:"Действия"})]})}),e.jsx("tbody",{children:a.map(r=>e.jsxs("tr",{children:[e.jsx("td",{children:r.artwork_upload?.original_name??""}),e.jsx("td",{children:r.submitted_by}),e.jsx("td",{children:new Date(r.submitted_at??r.created_at??"").toLocaleDateString()}),e.jsx("td",{children:e.jsxs(C,{status:r.status??"",children:[r.status==="pending"&&"На проверке",r.status==="approved"&&"Одобрено",r.status==="rejected"&&"Отклонено",r.status==="needs_revision"&&"Требует доработки"]})}),e.jsx("td",{children:e.jsx(l,{variant:"primary",onClick:()=>j(r),children:"Просмотреть"})})]},r.submission_id))})]})]}),s&&e.jsxs(u,{children:[e.jsxs(p,{children:["Просмотр карточки: ",s.artwork_upload?.original_name??""]}),e.jsx(v,{analysis:s.artwork_upload?.analysis_result??{},artwork:s.artwork_upload?.artwork_data??{},onArtworkChange:()=>{}}),e.jsx(R,{value:i,onChange:r=>h(r.target.value),placeholder:"Комментарии к проверке (необходимы при отклонении или возврате на доработку)"}),e.jsx(l,{variant:"success",onClick:b,children:"Одобрить и опубликовать"}),e.jsx(l,{variant:"danger",onClick:f,children:"Отклонить"}),e.jsx(l,{variant:"primary",onClick:_,children:"Вернуть на доработку"})]}),a.length===0&&e.jsx("p",{children:"Нет материалов, ожидающих проверки"})]})};export{z as default};

import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const initialTasks=[
 {id:1,title:'Build responsive landing page',category:'Development',priority:'High',status:'In Progress'},
 {id:2,title:'Prepare internship presentation',category:'College',priority:'Medium',status:'Pending'},
 {id:3,title:'Review React components',category:'Development',priority:'High',status:'Completed'},
 {id:4,title:'Update project documentation',category:'Documentation',priority:'Low',status:'Pending'},
 {id:5,title:'Test mobile layout',category:'Testing',priority:'Medium',status:'Completed'}
];

function App(){
 const [tasks,setTasks]=useState(initialTasks); const [filter,setFilter]=useState('All'); const [search,setSearch]=useState(''); const [dark,setDark]=useState(false); const [title,setTitle]=useState('');
 const visible=useMemo(()=>tasks.filter(t=>(filter==='All'||t.status===filter)&&t.title.toLowerCase().includes(search.toLowerCase())),[tasks,filter,search]);
 const stats={total:tasks.length,completed:tasks.filter(t=>t.status==='Completed').length,inProgress:tasks.filter(t=>t.status==='In Progress').length,pending:tasks.filter(t=>t.status==='Pending').length};
 function addTask(e){e.preventDefault(); if(!title.trim()) return; setTasks([{id:Date.now(),title:title.trim(),category:'Development',priority:'Medium',status:'Pending'},...tasks]);setTitle('');}
 function cycle(id){setTasks(tasks.map(t=>t.id===id?{...t,status:t.status==='Pending'?'In Progress':t.status==='In Progress'?'Completed':'Pending'}:t));}
 return <div className={dark?'app dark':'app'}>
  <header><div className="brand"><div className="logo">TF</div><div><h1>TaskFlow</h1><span>ReactJS Assignment Dashboard</span></div></div><button className="theme" onClick={()=>setDark(!dark)}>{dark?'☀️ Light':'🌙 Dark'}</button></header>
  <main>
   <section className="hero"><div><p className="eyebrow">REACTJS DEVELOPMENT</p><h2>Manage work. <span>Stay focused.</span></h2><p className="sub">A responsive task management dashboard built with React functional components, hooks and modern UI patterns.</p></div><div className="hero-icon">✓</div></section>
   <section className="stats">
    <Stat label="Total Tasks" value={stats.total} icon="▦"/><Stat label="Completed" value={stats.completed} icon="✓"/><Stat label="In Progress" value={stats.inProgress} icon="↻"/><Stat label="Pending" value={stats.pending} icon="○"/>
   </section>
   <section className="panel"><div className="toolbar"><div><h3>My Tasks</h3><p>Track and update your daily work</p></div><input aria-label="Search tasks" placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
    <div className="filters">{['All','Pending','In Progress','Completed'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
    <div className="task-list">{visible.length?visible.map(t=><article className="task" key={t.id}><button className={'check '+(t.status==='Completed'?'done':'')} onClick={()=>cycle(t.id)}>{t.status==='Completed'?'✓':''}</button><div className="task-main"><h4>{t.title}</h4><div className="meta"><span>{t.category}</span><span className={'priority '+t.priority.toLowerCase()}>{t.priority}</span></div></div><div className={'status '+t.status.toLowerCase().replace(' ','-')}>{t.status}</div></article>):<div className="empty">No matching tasks found.</div>}</div>
   </section>
   <section className="panel add"><div><h3>Add a task</h3><p>Create a new task and start tracking it.</p></div><form onSubmit={addTask}><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter task title..."/><button>Add Task</button></form></section>
   <section className="about"><h3>Assignment Highlights</h3><div className="highlights"><div><b>⚛</b><strong>React Hooks</strong><p>useState and useMemo manage interactive state and filtered data.</p></div><div><b>▤</b><strong>Reusable UI</strong><p>Statistics, task cards and filters are separated into reusable components.</p></div><div><b>↔</b><strong>Responsive Design</strong><p>Layout adapts for desktop, tablet and mobile screens.</p></div></div></section>
  </main><footer>Built with ReactJS • TaskFlow Assignment Demo</footer>
 </div>
}
function Stat({label,value,icon}){return <div className="stat"><div className="stat-icon">{icon}</div><div><strong>{value}</strong><span>{label}</span></div></div>}
createRoot(document.getElementById('root')).render(<App/>);

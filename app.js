const state={role:null,name:"Nara",page:"Início"};
const data={
 aluno:{label:"Aluno",avatar:"A",menu:[["⌂","Início"],["▣","Disciplinas"],["✓","Atividades"],["★","Notas"],["◷","Frequência"],["◉","Avisos"]]},
 professor:{label:"Professor",avatar:"P",menu:[["⌂","Início"],["▤","Minhas turmas"],["✓","Frequência"],["★","Notas"],["□","Atividades"],["◉","Comunicados"]]},
 direcao:{label:"Direção",avatar:"D",menu:[["⌂","Visão geral"],["♟","Alunos"],["♟","Professores"],["▦","Turmas"],["▥","Relatórios"],["◉","Comunicados"]]}
};
const $=id=>document.getElementById(id);
function login(role){
 state.role=role; state.page=data[role].menu[0][1];
 $("login").classList.add("hidden"); $("dashboard").classList.remove("hidden");
 $("sideName").textContent=state.name; $("sideRole").textContent=data[role].label;
 $("avatar").textContent=data[role].avatar; $("topAvatar").textContent=data[role].avatar;
 renderNav(); render();
}
$("loginForm").addEventListener("submit",e=>{e.preventDefault();state.name=($("user").value.trim().split("@")[0]||"Usuário").replace(/[._-]/g," ");state.name=state.name.charAt(0).toUpperCase()+state.name.slice(1);login($("role").value)});
$("logout").onclick=()=>{$("dashboard").classList.add("hidden");$("login").classList.remove("hidden");};
function renderNav(){
 $("nav").innerHTML=data[state.role].menu.map(([icon,label])=>`<button class="nav-item ${label===state.page?"active":""}" onclick="go('${label}')">${icon} <span>${label}</span></button>`).join("");
}
function go(page){state.page=page;renderNav();render();}
function render(){
 $("roleEyebrow").textContent=data[state.role].label.toUpperCase();
 $("pageTitle").textContent=state.page;
 const r=state.role;
 if(state.page===data[r].menu[0][1]) $("dashboardContent").innerHTML=home(r);
 else $("dashboardContent").innerHTML=generic(r,state.page);
}
function home(r){
 if(r==="aluno") return `<div class="welcome"><h2>Olá, ${state.name}! 👋</h2><p>Veja seus principais dados escolares de hoje.</p></div>
 <div class="cards"><div class="stat"><small>NOTA MÉDIA</small><strong>8,7</strong><div class="trend">↑ Bom desempenho</div></div><div class="stat"><small>FREQUÊNCIA</small><strong>94%</strong><div class="trend">↑ 2% este mês</div></div><div class="stat"><small>ATIVIDADES</small><strong>12</strong><div class="trend">4 pendentes</div></div><div class="stat"><small>AVISOS</small><strong>3</strong><div class="trend">Novos</div></div></div>
 <div class="grid2"><div class="panel"><h3>Próximas atividades</h3><div class="list">${row("Matemática","Lista de exercícios • amanhã","Pendente")}${row("Português","Produção de texto • sexta","Em andamento")}${row("Ciências","Trabalho em grupo • 08/10","Agendado")}</div></div><div class="panel"><h3>Frequência</h3><strong style="font-size:36px">94%</strong><div class="progress"><span style="width:94%"></span></div><p class="muted">Excelente presença nas aulas.</p></div></div>`;
 if(r==="professor") return `<div class="welcome"><h2>Olá, ${state.name}! 👋</h2><p>Tenha uma visão rápida das suas turmas e atividades.</p></div>
 <div class="cards"><div class="stat"><small>TURMAS</small><strong>4</strong></div><div class="stat"><small>ALUNOS</small><strong>126</strong></div><div class="stat"><small>ATIVIDADES</small><strong>18</strong><div class="trend">6 pendentes</div></div><div class="stat"><small>FREQUÊNCIA MÉDIA</small><strong>92%</strong></div></div>
 <div class="grid2"><div class="panel"><h3>Minhas turmas</h3><div class="list">${row("9º Ano A","32 alunos","92% frequência")}${row("8º Ano B","29 alunos","95% frequência")}${row("7º Ano A","34 alunos","90% frequência")}</div></div><div class="panel"><h3>Ações rápidas</h3><div class="list">${row("＋","Lançar frequência","Hoje")}${row("★","Lançar notas","7 pendentes")}${row("□","Criar atividade","Novo")}</div></div></div>`;
 return `<div class="welcome"><h2>Visão geral da escola</h2><p>Acompanhe os principais indicadores do GESTKA.</p></div>
 <div class="cards"><div class="stat"><small>ALUNOS</small><strong>1.246</strong><div class="trend">↑ 3,2%</div></div><div class="stat"><small>PROFESSORES</small><strong>78</strong></div><div class="stat"><small>TURMAS</small><strong>45</strong></div><div class="stat"><small>FREQUÊNCIA</small><strong>92%</strong></div></div>
 <div class="grid2"><div class="panel"><h3>Indicadores</h3>${bar("Frequência geral",92)}${bar("Atividades entregues",86)}${bar("Notas lançadas",97)}</div><div class="panel"><h3>Atalhos</h3><div class="list">${row("♟","Gerenciar alunos","1.246")}${row("♟","Gerenciar professores","78")}${row("▥","Relatórios","12 disponíveis")}</div></div></div>`;
}
function row(a,b,c){return `<div class="row"><div class="left"><div class="dot"></div><div><strong>${b}</strong><div class="muted">${a}</div></div></div><span class="badge">${c}</span></div>`}
function bar(a,v){return `<div style="margin:16px 0"><div style="display:flex;justify-content:space-between;font-size:12px"><span>${a}</span><b>${v}%</b></div><div class="progress"><span style="width:${v}%"></span></div></div>`}
function generic(r,p){return `<div class="panel"><h3>${p}</h3><p class="muted">Esta área já está preparada na primeira versão do GESTKA. Aqui vamos colocar os recursos de ${p.toLowerCase()} para o perfil de ${data[r].label.toLowerCase()}.</p><div class="list">${row("GESTKA","Área em desenvolvimento","Próximo passo")}${row("✓","Interface pronta para receber dados reais","MVP")}</div></div>`}

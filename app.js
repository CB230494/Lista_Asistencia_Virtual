const DELEGACIONES = [
  'Dirección de Programas Policiales Preventivos (DPPP)',
  'D01 Carmen',
  'D02 Merced',
  'D03 Hospital',
  'D04 Catedral',
  'D05 San Sebastián',
  'D06 Hatillo',
  'D07 Zapote',
  'D08 Pavas',
  'D09 Uruca',
  'D10 Curridabat',
  'D11 Montes de Oca',
  'D12 Goicochea',
  'D13 Moravia',
  'D14 Tibas',
  'D15 Coronado',
  'D16 Desamparados Norte',
  'D17 Desamparados Sur',
  'D18 Aserrí',
  'D19 Acosta',
  'D20 Alajuelita',
  'D21 Escazú',
  'D22 Santa Ana',
  'D23 Mora',
  'D24 Puriscal',
  'D25 Turrúbares',
  'D26 Alajuela Sur',
  'D27 Alajuela Norte',
  'D28 San Ramon',
  'D29 Grecia',
  'D30 San Mateo',
  'D31 Atenas',
  'D32 Naranjo',
  'D33 Palmares',
  'D34 Poas',
  'D35 Orotina',
  'D36 Sarchí',
  'D37 Cartago',
  'D38 Paraíso',
  'D39 La Unión',
  'D40 Jímenez',
  'D41 Turrialba',
  'D42 Alvarado',
  'D43 Oreamuno',
  'D44 El Guarco',
  'D45 Tarrazú',
  'D46 Dota',
  'D47 Leon Cortes',
  'D48 Guadalupe',
  'D49 Heredia',
  'D50 Barva',
  'D51 Santo Domingo',
  'D52 Santa Barbara',
  'D53 San Rafael',
  'D54 San Isidro',
  'D55 Belen',
  'D56 Flores',
  'D57 San Pablo',
  'D60 Liberia',
  'D61 Nicoya',
  'D62 Santa Cruz',
  'D63 Bagaces',
  'D64 Carrillo',
  'D65 Cañas',
  'D66 Abangares',
  'D67 Tilaran',
  'D68 Nandayure',
  'D69 Hojancha',
  'D71 Puntarenas',
  'D72 Esparza',
  'D73 Montes de Oro',
  'D74 Quepos',
  'D75 Parrita',
  'D76 Garabito',
  'D77 Paquera',
  'D78 Judas de Chomes',
  'D79 Pérez Zeledón',
  'D80 Buenos Aires',
  'D81 Osa',
  'D82 San Carlos Este',
  'D82 San Carlos Oeste',
  'D83 Zarcero',
  'D86 Guatuso',
  'D87 Río Cuarto',
  'D88 Limón',
  'D90 Siquirres',
  'D91 Talamanca',
  'D92 Matina',
  'D94 Golfito',
  'D95 Coto Brus',
  'D96 Corredores',
  'D97 Puerto Jiménez',
  'D70 La Cruz',
  'D84 Upala',
  'D85 Los Chiles',
  'D58 Sarapiqui',
  'D89 Pococí Sur',
  'D98 Pococí Norte',
  'D93 Guacimo'
];

const REGIONES = [
  'Dirección Regional Primera – San José Central',
  'Dirección Regional Primera – San José Norte',
  'Dirección Regional Primera – San José Sur',
  'Dirección Regional Segunda – Alajuela',
  'Dirección Regional Tercera – Cartago',
  'Dirección Regional Cuarta – Heredia',
  'Dirección Regional Quinta – Chorotega',
  'Dirección Regional Sexta – Pacífico Central',
  'Dirección Regional Sétima – Brunca',
  'Dirección Regional Octava – Huétar Norte',
  'Dirección Regional Novena – Huétar Atlántico',
  'Dirección Regional Décima – Brunca Sur',
  'Dirección Regional Onceava – Chorotega Norte',
  'Dirección Regional Doceava – Caribe'
];

const INSTITUCIONES = [
  'Policía Penitenciaria',
  'Policía de Tránsito',
  'Dirección General de Migración y Extranjería',
  'Organismo de Investigación Judicial (OIJ)',
  'Ministerio Público',
  'Ministerio de Justicia y Paz',
  'Ministerio de Educación Pública (MEP)',
  'Ministerio de Salud',
  'Caja Costarricense de Seguro Social (CCSS)',
  'Patronato Nacional de la Infancia (PANI)',
  'Instituto Mixto de Ayuda Social (IMAS)',
  'Instituto Nacional de las Mujeres (INAMU)',
  'Instituto sobre Alcoholismo y Farmacodependencia (IAFA)',
  'Instituto Costarricense sobre Drogas (ICD)',
  'Comisión Nacional de Emergencias (CNE)',
  'Cuerpo de Bomberos de Costa Rica',
  'Cruz Roja Costarricense',
  'Municipalidad / Gobierno Local',
  'Policía Municipal',
  'Otra institución'
];

const $ = id => document.getElementById(id);
const $$ = q => [...document.querySelectorAll(q)];
let allRows = [];
let adminRows = [];
let adminPassword = "";
let originalByRow = new Map();

function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function notify(msg,error=false){const t=$("toast");t.textContent=msg;t.className="toast show"+(error?" error":"");clearTimeout(window.__t);window.__t=setTimeout(()=>t.className="toast",3000)}
function urlReady(){return APPS_SCRIPT_URL && APPS_SCRIPT_URL.startsWith("https://script.google.com/") && APPS_SCRIPT_URL.endsWith("/exec")}
function jsonp(params){
  return new Promise((resolve,reject)=>{
    if(!urlReady()) return reject(new Error("Falta configurar la URL de Apps Script en config.js."));
    const cb="cb_"+Date.now()+"_"+Math.random().toString(36).slice(2), s=document.createElement("script");
    window[cb]=data=>{delete window[cb];s.remove();resolve(data)};
    params.callback=cb;s.src=APPS_SCRIPT_URL+"?"+new URLSearchParams(params).toString();
    s.onerror=()=>{delete window[cb];s.remove();reject(new Error("No fue posible conectar con Apps Script."))};
    document.body.appendChild(s);
    setTimeout(()=>{if(window[cb]){delete window[cb];s.remove();reject(new Error("Tiempo de espera agotado."))}},20000);
  });
}

function init(){
  DELEGACIONES.forEach(d=>$("delegacionSelect").insertAdjacentHTML("beforeend",`<option>${esc(d)}</option>`));
  REGIONES.forEach(r=>$("regionSelect").insertAdjacentHTML("beforeend",`<option>${esc(r)}</option>`));
  INSTITUCIONES.forEach(i=>$("institucionSelect").insertAdjacentHTML("beforeend",`<option>${esc(i)}</option>`));
  $("excelFecha").value=new Date().toISOString().slice(0,10);
  bind();
  loadPublic();
}
function bind(){
  $("attendanceForm").addEventListener("submit",savePublic);
  $("workplaceType").onchange=updateWorkplaceFields;
  $("regionSelect").onchange=syncWorkplaceValue;
  $("delegacionSelect").onchange=syncWorkplaceValue;
  $("institucionSelect").onchange=()=>{updateOtherInstitution();syncWorkplaceValue()};
  $("otraInstitucionInput").oninput=syncWorkplaceValue;
  $("refreshPublicBtn").onclick=loadPublic;
  $("adminAccessBtn").onclick=()=>{$("loginModal").classList.remove("hidden");$("adminPassword").focus()};
  $("closeLoginBtn").onclick=()=>$("loginModal").classList.add("hidden");
  $("loginBtn").onclick=login;
  $("adminPassword").addEventListener("keydown",e=>{if(e.key==="Enter")login()});
  $("logoutBtn").onclick=logout;
  $("backPublicBtn").onclick=()=>{$("adminView").classList.add("hidden");document.querySelector(".topbar").classList.remove("hidden");document.querySelector(".public-wrap").classList.remove("hidden");loadPublic()};
  $("refreshAdminBtn").onclick=loadAdmin;
  $("filterDelegaciones").onchange=renderAdmin;
  $("clearFiltersBtn").onclick=()=>{[...$("filterDelegaciones").options].forEach(o=>o.selected=false);renderAdmin()};
  $("selectAllFiltersBtn").onclick=()=>{[...$("filterDelegaciones").options].forEach(o=>o.selected=true);renderAdmin()};
  $("saveChangesBtn").onclick=saveChanges;
  $("deleteSelectedBtn").onclick=deleteSelected;
  $("clearAllBtn").onclick=clearAll;
  $("generateExcelBtn").onclick=generateExcel;

  $$(".nav-btn").forEach(b=>b.onclick=()=>{
    $$(".nav-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");
    $$(".admin-panel").forEach(x=>x.classList.remove("active"));$(b.dataset.panel).classList.add("active");
  });
}
function updateWorkplaceFields(){
  const type=$("workplaceType").value;
  [["regionField","region"],["delegacionField","delegacion"],["institucionField","institucion"]].forEach(([id,val])=>$(id).classList.toggle("hidden",type!==val));
  if(type!=="institucion") $("otraInstitucionField").classList.add("hidden");
  updateOtherInstitution();
  syncWorkplaceValue();
}
function updateOtherInstitution(){
  const show=$("workplaceType").value==="institucion" && $("institucionSelect").value==="Otra institución";
  $("otraInstitucionField").classList.toggle("hidden",!show);
  if(!show) $("otraInstitucionInput").value="";
}
function syncWorkplaceValue(){
  const type=$("workplaceType").value;
  let value="";
  if(type==="region") value=$("regionSelect").value;
  else if(type==="delegacion") value=$("delegacionSelect").value;
  else if(type==="institucion") value=$("institucionSelect").value==="Otra institución" ? $("otraInstitucionInput").value.trim() : $("institucionSelect").value;
  $("workplaceValue").value=value;
  return value;
}

async function loadPublic(){
  try{
    const r=await jsonp({action:"list"});
    if(!r.ok)throw new Error(r.message||"No fue posible leer los registros.");
    allRows=r.rows||[];
    renderPublic();
  }catch(e){notify(e.message,true)}
}
function renderPublic(){
  const tb=$("publicTable").querySelector("tbody");
  if(!allRows.length){tb.innerHTML='<tr><td colspan="9" class="empty">Aún no hay registros guardados.</td></tr>';return}
  tb.innerHTML=allRows.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.nombre)}</td><td>${esc(r.cedula)}</td><td>${esc(r.delegacion)}</td><td>${esc(r.cargo)}</td><td>${esc(r.telefono)}</td><td>${esc(r.genero)}</td><td>${esc(r.sexo)}</td><td>${esc(r.edad)}</td></tr>`).join("");
}
async function savePublic(e){
  e.preventDefault();
  const fd=new FormData($("attendanceForm"));
  syncWorkplaceValue();
  const data=Object.fromEntries(fd.entries());
  if(!data.nombre.trim()){notify("Ingresa al menos el nombre.",true);return}
  if(!$("workplaceType").value){notify("Seleccione si labora en una Región, Delegación o Institución.",true);return}
  if(!data.delegacion.trim()){notify("Seleccione o escriba la Región, Delegación o Institución donde labora.",true);return}
  const btn=$("submitBtn");btn.disabled=true;btn.textContent="Guardando…";
  try{
    const r=await jsonp({action:"add",data:JSON.stringify(data)});
    if(!r.ok)throw new Error(r.message||"No se pudo guardar.");
    $("attendanceForm").reset();
    updateWorkplaceFields();
    document.querySelector('input[name="genero"][value="F"]').checked=true;
    document.querySelector('input[name="sexo"][value="H"]').checked=true;
    document.querySelector('input[name="edad"][value="18 a 35 años"]').checked=true;
    notify("Registro guardado.");
    await loadPublic();
  }catch(e){notify(e.message,true)}
  finally{btn.disabled=false;btn.textContent="Agregar registro"}
}
async function login(){
  const p=$("adminPassword").value;
  if(!p){$("loginMsg").textContent="Ingrese la contraseña.";return}
  $("loginMsg").textContent="Validando…";$("loginBtn").disabled=true;
  try{
    const r=await jsonp({action:"login",password:p});
    if(!r.ok)throw new Error(r.message||"Contraseña incorrecta.");
    adminPassword=p;$("loginMsg").textContent="";$("loginModal").classList.add("hidden");
    document.querySelector(".topbar").classList.add("hidden");document.querySelector(".public-wrap").classList.add("hidden");$("adminView").classList.remove("hidden");
    await loadAdmin();
  }catch(e){$("loginMsg").textContent=e.message}
  finally{$("loginBtn").disabled=false}
}
function logout(){adminPassword="";$("adminPassword").value="";$("adminView").classList.add("hidden");document.querySelector(".topbar").classList.remove("hidden");document.querySelector(".public-wrap").classList.remove("hidden");loadPublic()}
async function loadAdmin(){
  try{
    const r=await jsonp({action:"adminList",password:adminPassword});
    if(!r.ok)throw new Error(r.message||"No autorizado.");
    allRows=r.rows||[];
    originalByRow=new Map(allRows.map(r=>[String(r.rownum),JSON.parse(JSON.stringify(r))]));
    buildFilter();renderAdmin();
  }catch(e){notify(e.message,true)}
}
function buildFilter(){
  const current=[...$("filterDelegaciones").selectedOptions].map(o=>o.value);
  const vals=[...new Set(allRows.map(r=>r.delegacion).filter(x=>String(x).trim()))].sort((a,b)=>a.localeCompare(b,"es",{sensitivity:"base"}));
  $("filterDelegaciones").innerHTML=vals.map(v=>`<option ${current.includes(v)?"selected":""}>${esc(v)}</option>`).join("");
}
function selectedFilters(){return [...$("filterDelegaciones").selectedOptions].map(o=>o.value)}
function filteredRows(){
  const f=selectedFilters();
  return f.length?allRows.filter(r=>f.includes(r.delegacion)):allRows.slice();
}
function renderAdmin(){
  adminRows=filteredRows();
  $("kpiTotal").textContent=allRows.length;
  $("kpiDelegaciones").textContent=new Set(allRows.map(r=>r.delegacion).filter(Boolean)).size;
  $("kpiFiltrados").textContent=adminRows.length;
  const tb=$("adminTable").querySelector("tbody");
  if(!adminRows.length){tb.innerHTML='<tr><td colspan="10" class="empty">No hay registros para el filtro seleccionado.</td></tr>';return}
  tb.innerHTML=adminRows.map((r,i)=>`<tr data-rownum="${r.rownum}">
    <td>${i+1}</td>
    <td><input data-field="nombre" value="${esc(r.nombre)}"></td>
    <td><input data-field="cedula" value="${esc(r.cedula)}"></td>
    <td><input data-field="delegacion" value="${esc(r.delegacion)}"></td>
    <td><input data-field="cargo" value="${esc(r.cargo)}"></td>
    <td><input data-field="telefono" value="${esc(r.telefono)}"></td>
    <td><select data-field="genero">${opts(["F","M","LGBTIQ+"],r.genero)}</select></td>
    <td><select data-field="sexo">${opts(["H","M","I"],r.sexo)}</select></td>
    <td><select data-field="edad">${opts(["18 a 35 años","36 a 64 años","65 años o más"],r.edad)}</select></td>
    <td style="text-align:center"><input class="row-select" type="checkbox"></td>
  </tr>`).join("");
}
function opts(arr,val){return arr.map(x=>`<option ${x===val?"selected":""}>${esc(x)}</option>`).join("")}
async function saveChanges(){
  const rows=[...$("adminTable").querySelectorAll("tbody tr[data-rownum]")];
  const changes=[];
  rows.forEach(tr=>{
    const rownum=tr.dataset.rownum, old=originalByRow.get(String(rownum));if(!old)return;
    const d={};tr.querySelectorAll("[data-field]").forEach(el=>d[el.dataset.field]=el.value);
    if(["nombre","cedula","delegacion","cargo","telefono","genero","sexo","edad"].some(k=>String(old[k]??"")!==String(d[k]??"")))changes.push({rownum:Number(rownum),...d});
  });
  if(!changes.length){notify("No hay cambios para guardar.");return}
  try{
    const r=await jsonp({action:"updateMany",password:adminPassword,data:JSON.stringify(changes)});
    if(!r.ok)throw new Error(r.message||"No se pudieron guardar los cambios.");
    notify(`Se guardaron ${r.updated||changes.length} cambio(s).`);await loadAdmin();
  }catch(e){notify(e.message,true)}
}
async function deleteSelected(){
  const nums=[...$("adminTable").querySelectorAll("tbody tr[data-rownum]")].filter(tr=>tr.querySelector(".row-select")?.checked).map(tr=>Number(tr.dataset.rownum));
  if(!nums.length){notify("No hay filas seleccionadas para eliminar.",true);return}
  if(!confirm(`¿Eliminar ${nums.length} registro(s) seleccionado(s)?`))return;
  try{
    const r=await jsonp({action:"deleteMany",password:adminPassword,rows:nums.join(",")});
    if(!r.ok)throw new Error(r.message||"No se pudieron eliminar.");
    notify(`Eliminadas ${nums.length} fila(s).`);await loadAdmin();
  }catch(e){notify(e.message,true)}
}
async function clearAll(){
  if(!$("confirmClearAll").checked){notify("Marca “Confirmar vaciado total” para continuar.",true);return}
  if(!confirm("Esta acción eliminará TODOS los registros. ¿Continuar?"))return;
  try{
    const r=await jsonp({action:"clearAll",password:adminPassword});
    if(!r.ok)throw new Error(r.message||"No se pudieron eliminar los registros.");
    $("confirmClearAll").checked=false;notify("Se vaciaron todos los registros.");await loadAdmin();
  }catch(e){notify(e.message,true)}
}

// ===================== EXCEL OFICIAL =====================
async function getImageBuffer(url){const r=await fetch(url);return await r.arrayBuffer()}
function excelBorder(){
  return {top:{style:"thin",color:{argb:"FF000000"}},left:{style:"thin",color:{argb:"FF000000"}},bottom:{style:"thin",color:{argb:"FF000000"}},right:{style:"thin",color:{argb:"FF000000"}}};
}
function setAllBorders(ws,r1,c1,r2,c2){for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++)ws.getCell(r,c).border=excelBorder()}
function setHeaderOuterBorder(ws,r1,c1,r2,c2){
  // Quita todas las líneas internas del encabezado.
  for(let r=r1;r<=r2;r++){
    for(let c=c1;c<=c2;c++){
      ws.getCell(r,c).border={};
    }
  }
  const line={style:"thin",color:{argb:"FF000000"}};
  for(let c=c1;c<=c2;c++){
    ws.getCell(r1,c).border={...(ws.getCell(r1,c).border||{}),top:line};
    ws.getCell(r2,c).border={...(ws.getCell(r2,c).border||{}),bottom:line};
  }
  for(let r=r1;r<=r2;r++){
    ws.getCell(r,c1).border={...(ws.getCell(r,c1).border||{}),left:line};
    ws.getCell(r,c2).border={...(ws.getCell(r,c2).border||{}),right:line};
  }
}
function mergeSet(ws,range,value,opts={}){ws.mergeCells(range);const c=ws.getCell(range.split(":")[0]);c.value=value;if(opts.font)c.font=opts.font;if(opts.alignment)c.alignment=opts.alignment;if(opts.fill)c.fill=opts.fill}
function esMonth(dateStr){return ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][new Date(dateStr+"T12:00:00").getMonth()]}
async function generateExcel(){
  const rows=filteredRows();
  const fecha=$("excelFecha").value||new Date().toISOString().slice(0,10), lugar=$("excelLugar").value, estrategia=$("excelEstrategia").value;
  const delegHdr=$("excelDelegacionHdr").value, ini=$("excelHoraInicio").value||"09:00", fin=$("excelHoraFin").value||"12:10";
  const actividad=$("excelActividad").value, firmante=$("excelFirmante").value, anot=$("excelAnotaciones").value, acuerdos=$("excelAcuerdos").value;
  const btn=$("generateExcelBtn");btn.disabled=true;btn.textContent="Generando…";
  try{
    const wb=new ExcelJS.Workbook();const ws=wb.addWorksheet("Lista",{views:[{showGridLines:false,state:"frozen",ySplit:11}]});
    ws.pageSetup={orientation:"portrait",paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:.3,right:.3,top:.4,bottom:.4,header:.1,footer:.1}};
    const widths={A:2,B:6,C:26,D:22,E:22,F:18,G:24,H:28,I:20,J:6,K:6,L:10,M:6,N:6,O:6,P:14,Q:14,R:14,S:16};
    Object.entries(widths).forEach(([k,v])=>ws.getColumn(k).width=v);
    ws.getRow(1).height=22;ws.getRow(2).height=30;ws.getRow(3).height=62;ws.getRow(4).height=24;ws.getRow(5).height=20;ws.getRow(6).height=14;
    const center={horizontal:"center",vertical:"middle",wrapText:true},left={horizontal:"left",vertical:"top",wrapText:true};
    const title={bold:true,size:12},h1={bold:true,size:14};const fillGrey={type:"pattern",pattern:"solid",fgColor:{argb:"FFD9D9D9"}};
    // Logos del encabezado: mismas imágenes de assets, solo tamaño y posición.
    try{
      const mspBuf=await getImageBuffer("assets/logo_msp_circular.png");
      const fpBuf=await getImageBuffer("assets/logo_fuerza_publica.png");
      const derBuf=await getImageBuffer("assets/logo_der.png");
      const mspId=wb.addImage({buffer:mspBuf,extension:"png"});
      const fpId=wb.addImage({buffer:fpBuf,extension:"png"});
      const derId=wb.addImage({buffer:derBuf,extension:"png"});

      // Logos centrados dentro del bloque superior y alejados de los bordes.
      // Izquierda: MSP y Fuerza Pública, más grandes y más abajo.
      ws.addImage(mspId,{tl:{col:2.05,row:1.10},ext:{width:98,height:98}});
      ws.addImage(fpId,{tl:{col:4.55,row:1.02},ext:{width:96,height:124}});

      // Derecha: mismo archivo existente, más grande y centrado en el bloque O:S.
      ws.addImage(derId,{tl:{col:14.75,row:1.02},ext:{width:242,height:90}});
    }catch(e){console.warn("Logos institucionales no disponibles",e)}
    mergeSet(ws,"F3:N3","Modelo de Gestión Policial de Fuerza Pública",{font:h1,alignment:center});
    mergeSet(ws,"F4:N4","Lista de Asistencia & Minuta",{font:h1,alignment:center});
    mergeSet(ws,"F5:N5","Consecutivo:",{font:title,alignment:center});
    // Encabezado limpio: blanco, sin cuadrícula interna; solo marco exterior B1:S5.
    setHeaderOuterBorder(ws,1,2,5,19);
    mergeSet(ws,"B6:S6","",{fill:{type:"pattern",pattern:"solid",fgColor:{argb:"FF1F3B73"}}});
    const d=new Date(fecha+"T12:00:00");
    mergeSet(ws,"B7:D7",`Fecha: ${d.getDate()} ${esMonth(fecha)} ${d.getFullYear()}`,{font:title,alignment:left});
    mergeSet(ws,"E7:I7",lugar?`Lugar:  ${lugar}`:"Lugar: ",{font:title,alignment:left});
    mergeSet(ws,"J7:O7",`Hora Inicio: ${ini}`,{alignment:center});mergeSet(ws,"P7:S7",`Hora Finalización: ${fin}`,{alignment:center});
    setAllBorders(ws,7,2,7,19);
    mergeSet(ws,"B8:C8","Estrategia o Programa:",{alignment:left});mergeSet(ws,"D8:I8",estrategia,{alignment:left});setAllBorders(ws,8,2,8,9);
    mergeSet(ws,"J8:S9",`ACTIVIDAD: ${actividad.trim()}`,{alignment:left});setAllBorders(ws,8,10,9,19);
    mergeSet(ws,"B9:C9","Región / Delegación / Institución:",{alignment:left});mergeSet(ws,"D9:I9",delegHdr,{alignment:left});setAllBorders(ws,9,2,9,9);
    mergeSet(ws,"C10:E11","Nombre",{font:{bold:true},alignment:center,fill:fillGrey});
    ["F10","G10","H10","I10","S10"].forEach(c=>{ws.getCell(c).value=({F10:"Cédula de Identidad",G10:"Región / Delegación / Institución",H10:"Cargo",I10:"Teléfono",S10:"FIRMA"})[c];ws.getCell(c).font={bold:true};ws.getCell(c).alignment=center;ws.getCell(c).fill=fillGrey});
    mergeSet(ws,"J10:L10","Género",{font:{bold:true},alignment:center,fill:fillGrey});mergeSet(ws,"M10:O10","Sexo (Hombre, Mujer o Intersex)",{font:{bold:true},alignment:center,fill:fillGrey});mergeSet(ws,"P10:R10","Rango de Edad",{font:{bold:true},alignment:center,fill:fillGrey});
    [["J11","F"],["K11","M"],["L11","LGBTIQ+"],["M11","H"],["N11","M"],["O11","I"],["P11","18 a 35 años"],["Q11","36 a 64 años"],["R11","65 años o más"]].forEach(([c,v])=>{ws.getCell(c).value=v;ws.getCell(c).font={bold:true};ws.getCell(c).alignment=center;ws.getCell(c).fill=fillGrey});
    setAllBorders(ws,10,2,11,19);
    rows.forEach((row,i)=>{
      const r=12+i;ws.getCell(`B${r}`).value=i+1;ws.getCell(`B${r}`).alignment={horizontal:"right"};
      ws.mergeCells(`C${r}:E${r}`);ws.getCell(`C${r}`).value=row.nombre;ws.getCell(`C${r}`).alignment=left;
      [["F",row.cedula],["G",row.delegacion],["H",row.cargo],["I",row.telefono]].forEach(([c,v])=>{ws.getCell(`${c}${r}`).value=String(v??"");ws.getCell(`${c}${r}`).alignment=left});
      ["J","K","L","M","N","O","P","Q","R"].forEach(c=>ws.getCell(`${c}${r}`).value="");
      if(row.genero==="F")ws.getCell(`J${r}`).value="X";else if(row.genero==="M")ws.getCell(`K${r}`).value="X";else if(row.genero==="LGBTIQ+")ws.getCell(`L${r}`).value="X";
      if(row.sexo==="H")ws.getCell(`M${r}`).value="X";else if(row.sexo==="M")ws.getCell(`N${r}`).value="X";else if(row.sexo==="I")ws.getCell(`O${r}`).value="X";
      if(String(row.edad).startsWith("18"))ws.getCell(`P${r}`).value="X";else if(String(row.edad).startsWith("36"))ws.getCell(`Q${r}`).value="X";else if(String(row.edad).startsWith("65"))ws.getCell(`R${r}`).value="X";
      ws.getCell(`S${r}`).value="Virtual";setAllBorders(ws,r,2,r,19);
    });
    const last=rows.length?11+rows.length:11, top=Math.max(25,last+2), height=14;
    mergeSet(ws,`B${top}:J${top}`,"Anotaciones Generales.",{font:{bold:true},alignment:center,fill:fillGrey});mergeSet(ws,`L${top}:S${top}`,"Acuerdos.",{font:{bold:true},alignment:center,fill:fillGrey});
    setAllBorders(ws,top,2,top,10);setAllBorders(ws,top,12,top,19);
    mergeSet(ws,`B${top+1}:J${top+height}`,anot.trim(),{alignment:left});mergeSet(ws,`L${top+1}:S${top+height}`,acuerdos.trim(),{alignment:left});setAllBorders(ws,top+1,2,top+height,10);setAllBorders(ws,top+1,12,top+height,19);
    const pie=top+height+2;mergeSet(ws,`B${pie}:J${pie}`,`Se Finaliza la Reunión a:   ${fin}`,{alignment:left});
    const sig=pie+3;mergeSet(ws,`D${sig}:J${sig}`,firmante.trim(),{alignment:{horizontal:"center",vertical:"bottom"}});
    for(let c=4;c<=10;c++)ws.getCell(sig,c).border={bottom:{style:"thin",color:{argb:"FF000000"}}};
    mergeSet(ws,`D${sig+1}:J${sig+1}`,"Nombre",{alignment:{horizontal:"center"}});
    mergeSet(ws,`B${sig+3}:J${sig+3}`,"Cargo:",{alignment:left});mergeSet(ws,`L${sig+5}:S${sig+5}`,"Sello Policial",{alignment:{horizontal:"right",vertical:"middle"}});
    ws.protect("",{selectLockedCells:true,selectUnlockedCells:true});
    const buffer=await wb.xlsx.writeBuffer(),blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`Lista_Asistencia_Oficial_${new Date().toISOString().slice(0,10).replaceAll("-","")}.xlsx`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    notify("Excel oficial generado.");
  }catch(e){console.error(e);notify("No fue posible generar el Excel: "+e.message,true)}
  finally{btn.disabled=false;btn.textContent="Generar Excel oficial"}
}
document.addEventListener("DOMContentLoaded",init);

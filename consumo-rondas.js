/* La Herradura Admin v4.19.54 - Extensión aislada de rondas para Consumo. */
(function(){
'use strict';
const drafts={};
const html=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ensure=a=>{a.consumptionRounds ||= [];a.consumptionDraft ||= [];};
const total=items=>(items||[]).reduce((s,i)=>s+(+i.price||0)*(+i.qty||0),0);
const due=(a,name)=>Math.max(0,a.consumptionRounds.filter(r=>r.payer===name).reduce((s,r)=>s+total(r.items),0)-(a.returns||[]).filter(r=>r.player===name).reduce((s,r)=>s+(+r.credit||0),0)-(a.payments||[]).filter(p=>p.player===name).reduce((s,p)=>s+p.amount,0));
const names=a=>[...new Set((a.consumptionRounds||[]).flatMap(r=>[r.requester,r.payer]).filter(Boolean))];
const state=id=>(drafts[id] ||= {requester:'',payer:'',kind:'round'});
const baseOpen=window.openConsumption,baseAdd=window.addProduct,baseQty=window.consumptionQty,basePay=window.pay,baseView=window.viewAccount,baseReceiptDetail=window.receiptDetail;
const baseProducts=window.renderProducts;
window.renderProducts=function(id){
 if(t(id)?.type!=='consumo')return baseProducts(id);
 const a=t(id).account;ensure(a);
 const q=(document.getElementById('prodSearch')?.value||'').toLowerCase();
 const arr=catalog.filter(p=>p.price>0&&p.name.toLowerCase().includes(q)&&catMatch(p,activeCategory)).slice(0,36);
 const el=document.getElementById('productBox');if(!el)return;
 el.innerHTML=arr.map(p=>{const qty=a.consumptionDraft.find(z=>z.id===p.id)?.qty||0;return `<div class="prod ${qty?'prodSelected':''}"><button onclick="addProduct('${id}','${p.id}')"><b>${html(simpleName(p.name))}</b>${qty?`<span class="prodQty">×${qty}</span>`:''}<br><span>${COP(p.price)}</span>${qty?'<small class="selectedLabel">✓ Seleccionado</small>':''}</button></div>`}).join('')||'<p>No hay productos en esta categoría.</p>';
};

window.consumptionWho=(id,key,val)=>{const s=state(id);s[key]=val;if(s.kind==='extra'&&key==='requester'){s.payer=val;const el=document.getElementById('consumoPayer');if(el)el.value=val;}};
window.openConsumption=function(id){baseOpen(id);const x=t(id),a=x.account;ensure(a);const box=document.querySelector('.consumptionManage');if(!box)return;const s=state(id),pending=total(a.consumptionDraft),rounds=a.consumptionRounds;
const isExtra=s.kind==='extra',label=isExtra?'🟡 EXTRA PERSONAL · '+html(s.requester):'👥 Identificación de la ronda '+(rounds.length+1);
const panel=document.createElement('section');panel.className='card inner consumoRoundPanel';panel.innerHTML=`<h3>${label}</h3><p class="muted">${isExtra?'Los productos adicionales se acumulan automáticamente a la cuenta de <b>'+html(s.requester)+'</b>, aunque otra persona haya pagado sus rondas anteriores.':'Antes de guardar, identifica quién solicita y quién paga. Los siguientes pedidos de esa persona se suman a su cuenta.'}</p>${isExtra?`<div class="notice compact" style="border-color:#bd9958">🟡 Pedido EXTRA de ${html(s.requester)} · <button class="mini" type="button" onclick="consumoCancelExtra('${id}')">Cambiar a ronda normal</button></div>`:''}<div class="row"><div class="field"><label>¿Quién solicita?</label><input id="consumoRequester" list="consumoPeople" value="${html(s.requester)}" placeholder="Ej. Juan" oninput="consumptionWho('${id}','requester',this.value)"></div><div class="field"><label>¿Quién paga?</label><input id="consumoPayer" list="consumoPeople" value="${html(isExtra?s.requester:s.payer)}" placeholder="Ej. Pedro" ${isExtra?'readonly aria-readonly="true"':''} oninput="consumptionWho('${id}','payer',this.value)"></div></div><datalist id="consumoPeople">${[...new Set(rounds.flatMap(r=>[r.requester,r.payer]))].map(n=>`<option value="${html(n)}"></option>`).join('')}</datalist><div class="notice compact">Pedido actual sin guardar: <b>${COP(pending)}</b> · ${a.consumptionDraft.length} producto(s) distinto(s). Las rondas guardadas no se vuelven a cargar al inventario.</div><h3>📋 Rondas y extras guardados (${rounds.length})</h3>${rounds.length?rounds.map((r,i)=>{const extra=r.kind==='extra';return `<div class="consumoSavedRound"><div class="consumoSavedRow"><span><b>${extra?'🟡 EXTRA personal':'Ronda'} ${i+1}</b><br>Solicita: ${html(r.requester)}<br>Paga: <b>${html(r.payer)}</b><br>${r.items.reduce((n,it)=>n+it.qty,0)} unidades</span><strong>${COP(total(r.items))}</strong></div><div class="row"><button type="button" class="mini consumoRepeatBtn" onclick="consumoDuplicateRound('${id}',${i})">🔁 Duplicar ${extra?'extra':'ronda'}</button><button type="button" class="mini consumoRepeatBtn" onclick="consumoExtraFor('${id}','${encodeURIComponent(r.requester).replace(/'/g,'%27')}')">➕ Extra a ${html(r.requester)}</button></div></div>`}).join(''):'<p class="muted">Aún no hay rondas guardadas.</p>'}<button type="button" class="wide" onclick="consumoNewExtra('${id}')">🟡 Registrar EXTRA para solicitante</button><h3>💳 Cuentas individuales</h3>${names(a).length?names(a).map(n=>`<div class="item"><span>👤 ${html(n)} · ${rounds.filter(r=>r.payer===n&&r.kind!=='extra').length} rondas · ${rounds.filter(r=>r.payer===n&&r.kind==='extra').length} extras${(a.returns||[]).some(r=>r.player===n)?`<br><small>↩️ Devoluciones: − ${COP((a.returns||[]).filter(r=>r.player===n).reduce((v,r)=>v+(+r.credit||0),0))}</small>`:''}</span><b>${COP(due(a,n))}</b></div>`).join(''):'<p class="muted">Se mostrarán al guardar la primera ronda.</p>'}`;
const order=box.querySelector('.orderPanel');if(order){order.parentNode.insertBefore(panel,order);const title=order.querySelector('.orderTitle h3');if(title)title.textContent='🧾 Productos de la ronda actual';const sub=order.querySelector('.orderTitle strong');if(sub)sub.textContent=COP(pending);const cart=order.querySelector('.orderCart');if(cart)cart.innerHTML=consumptionDraftItems(a,id)}
};
window.consumoNewExtra=function(id){
 if(!window.tnRequireOperate?.())return;
 const a=t(id)?.account;if(!a)return;ensure(a);
 if(a.consumptionDraft.length)return alert('Primero guarda la ronda actual antes de registrar un extra.');
 const people=[...new Set(a.consumptionRounds.map(r=>r.requester).filter(Boolean))];
 modal(`${modalNav("openConsumption('"+id+"')",'Consumo')}<h2>🟡 Nuevo pedido extra</h2><p>Los extras se cargarán a la cuenta de la persona que los solicita, independientemente de quién pagó rondas anteriores.</p>${people.map(n=>`<button class="wide" onclick="consumoExtraFor('${id}','${encodeURIComponent(n).replace(/'/g,'%27')}')">➕ Extra para ${html(n)}</button>`).join('')}<div class="field"><label>Otro solicitante</label><input id="consumoExtraName" list="consumoPeopleExtra" placeholder="Nombre del solicitante"><datalist id="consumoPeopleExtra">${people.map(n=>`<option value="${html(n)}"></option>`).join('')}</datalist></div><button class="gold wide" onclick="consumoExtraCustom('${id}')">Continuar con pedido extra</button>`);
};
window.consumoExtraCustom=function(id){const n=document.getElementById('consumoExtraName')?.value.trim();if(!n)return alert('Escribe quién solicita el extra.');window.consumoExtraFor(id,encodeURIComponent(n));};
window.consumoExtraFor=function(id,encoded){
 if(!window.tnRequireOperate?.())return;
 const a=t(id)?.account;if(!a)return;ensure(a);
 if(a.consumptionDraft.length)return alert('Guarda primero el pedido actual antes de iniciar un extra.');
 const n=decodeURIComponent(encoded||'').trim();if(!n)return alert('Identifica quién solicita el extra.');
 drafts[id]={requester:n,payer:n,kind:'extra',duplicatedFrom:null};openConsumption(id);
 document.getElementById('consumoRequester')?.scrollIntoView({block:'center',behavior:'smooth'});
};
window.consumoCancelExtra=function(id){if(t(id)?.account?.consumptionDraft?.length)return alert('Guarda o termina de editar este extra primero.');const s=state(id);s.kind='round';s.payer='';s.duplicatedFrom=null;openConsumption(id);};
function consumptionDraftItems(a,id){return a.consumptionDraft.length?a.consumptionDraft.map(i=>`<div class="orderLine"><div><b>${html(i.name)}</b><small>${COP(i.price)} c/u</small></div><div class="qtyCtl"><button class="mini" onclick="consumptionQty('${id}','${i.id}',-1)">−</button><b>${i.qty}</b><button class="mini" onclick="consumptionQty('${id}','${i.id}',1)">+</button><strong>${COP(i.price*i.qty)}</strong></div></div>`).join(''):'<div class="emptyOrder">Selecciona los productos de esta nueva ronda.</div>'}
window.addProduct=function(id,pid){if(!window.tnRequireOperate?.())return;const x=t(id);if(x?.type!=='consumo')return baseAdd(id,pid);const a=x.account;ensure(a);const p=catalog.find(z=>z.id===pid);if(!p)return;let it=a.consumptionDraft.find(z=>z.id===pid);it?it.qty++:a.consumptionDraft.push({id:pid,name:simpleName(p.name),price:p.price,cost:unitCost(p),qty:1});baseAdd(id,pid)};
window.consumptionQty=function(id,pid,delta){if(!window.tnRequireOperate?.())return;const a=t(id).account;ensure(a);let it=a.consumptionDraft.find(z=>z.id===pid);if(!it)return alert('Solo puedes modificar productos de la ronda actual.');if(delta<0&&it.qty<=0)return;const p=catalog.find(z=>z.id===pid),agg=a.loose.find(z=>z.id===pid);if(!agg)return;it.qty+=delta;if(it.qty<=0)a.consumptionDraft=a.consumptionDraft.filter(z=>z!==it);agg.qty+=delta;if(agg.qty<=0)a.loose=a.loose.filter(z=>z!==agg);if(p){if(delta>0)consumeInventory(p);else restoreInventory(p)}a.history.push(stamp()+' · Ajuste ronda consumo '+pid+' '+delta);save('Ajuste ronda consumo');openConsumption(id)};
window.saveConsumptionOrder=function(id){
 if(!window.tnRequireOperate?.())return;
 const a=t(id).account;ensure(a);const s=state(id),requester=s.requester.trim(),payer=s.kind==='extra'?requester:s.payer.trim();
 if(!a.consumptionDraft.length)return alert('Agrega al menos un producto para guardar el pedido.');
 if(!requester||!payer)return alert('Identifica quién solicita y quién paga este pedido.');
 const items=a.consumptionDraft.map(i=>({...i})),ctx=window.tnOperationContext();
 a.consumptionRounds.push({id:'CR-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),requester,payer,kind:s.kind==='extra'?'extra':'round',items,ts:new Date().toISOString(),waitress:ctx.staffName,operatorName:ctx.operatorName,turnId:ctx.turnId,duplicatedFrom:s.duplicatedFrom||null});
 a.consumptionDraft=[];drafts[id]={requester,payer,kind:'round',duplicatedFrom:null};
 a.history.push(stamp()+` · ${s.kind==='extra'?'EXTRA PERSONAL':'Ronda'} ${a.consumptionRounds.length}: solicita ${requester}, paga ${payer}, ${COP(total(items))} · Mesera ${ctx.staffName}`);
 save(s.kind==='extra'?'Extra personal de consumo guardado':'Ronda de consumo guardada');
 alert('✓ '+(s.kind==='extra'?'Extra personal':'Ronda')+' guardado a nombre de '+payer+' · '+COP(total(items)));
 openConsumption(id);
};
window.consumoDuplicateRound=function(id,index){
 if(!window.tnRequireOperate?.())return;
 const x=t(id);if(!x||x.type!=='consumo'||!x.account)return;
 const a=x.account;ensure(a);
 const source=a.consumptionRounds[index];if(!source)return alert('Ronda no encontrada.');
 if(a.consumptionDraft.length)return alert('Primero guarda o termina de editar la ronda actual antes de duplicar otra. No se borrará tu pedido.');
 const fresh=[];
 for(const i of source.items||[]){
  const p=catalog.find(z=>z.id===i.id);if(!p)return alert('No se puede duplicar: el producto '+i.name+' ya no existe en el catálogo.');
  const qty=Number(i.qty);if(!Number.isInteger(qty)||qty<1)return alert('La ronda original contiene una cantidad inválida.');
  fresh.push({id:p.id,name:simpleName(p.name),price:p.price,cost:unitCost(p),qty});
 }
 if(!fresh.length)return alert('La ronda no tiene productos para copiar.');
 if(!confirm('¿Copiar los '+fresh.reduce((n,i)=>n+i.qty,0)+' productos de la ronda '+(index+1)+' a un nuevo pedido? Quedarán como pedido pendiente hasta guardar; el inventario se descuenta al copiar.'))return;
 for(const i of fresh){
  const p=catalog.find(z=>z.id===i.id);
  const curr=a.loose.find(z=>z.id===i.id);
  if(curr)curr.qty+=i.qty;
  else a.loose.push({...i,addedAt:new Date().toISOString()});
  consumeInventory(p,i.qty);
 }
 a.consumptionDraft=fresh;
 drafts[id]={requester:source.requester||'',payer:source.kind==='extra'?(source.requester||''):(source.payer||''),kind:source.kind==='extra'?'extra':'round',duplicatedFrom:source.id};
 a.history.push(stamp()+' · Se preparó duplicado de ronda '+(index+1)+'; pendiente de guardar');
 save('Duplicado de ronda de consumo en preparación · '+x.name);
 openConsumption(id);
 const target=document.getElementById('consumoRequester');if(target)target.scrollIntoView({block:'center',behavior:'smooth'});
};
window.consumoRoundAccounts=function(id){const a=t(id).account;ensure(a);const pending=total(a.consumptionDraft);
 return `<h3>👥 Rondas y extras por persona</h3>${a.consumptionRounds.map((r,i)=>`<div class="item"><span>${r.kind==='extra'?'🟡 Extra':'Ronda'} ${i+1}: ${html(r.requester)} solicitó · paga ${html(r.payer)}<br>${r.items.map(z=>html(z.name)+' ×'+z.qty).join(', ')}</span><b>${COP(total(r.items))}</b></div>`).join('')||'<p>Sin rondas guardadas.</p>'}${names(a).map(n=>`<div class="item"><span>👤 ${html(n)} · ${a.consumptionRounds.filter(r=>r.payer===n&&r.kind!=='extra').length} rondas / ${a.consumptionRounds.filter(r=>r.payer===n&&r.kind==='extra').length} extras${(a.returns||[]).some(r=>r.player===n)?`<br>↩️ Abonos: − ${COP((a.returns||[]).filter(d=>d.player===n).reduce((v,d)=>v+(+d.credit||0),0))}`:''}</span><b>${COP(due(a,n))}</b></div>`).join('')}${pending?`<div class="notice">Pedido sin guardar: ${COP(pending)}</div>`:''}`;
};
window.viewAccount=function(id){if(t(id)?.type!=='consumo')return baseView(id);baseView(id);const a=t(id).account;ensure(a);const target=document.querySelector('#sheet .total');if(target)target.insertAdjacentHTML('beforebegin',consumoRoundAccounts(id));};
window.pay=function(id){if(!window.tnRequireOperate?.())return;const x=t(id);if(x?.type!=='consumo')return basePay(id);const a=x.account;ensure(a);if(a.consumptionDraft.length)return alert('Primero guarda la ronda actual identificando quién solicita y quién paga.');const v=closedTotal(a);if(v<=0)return alert('No hay saldo pendiente.');const individual=names(a).filter(n=>due(a,n)>0);const assigned=individual.reduce((s,n)=>s+due(a,n),0);const legacy=Math.max(0,v-assigned);modal(`${modalNav("openAccount('"+id+"')",'Orden')}<h2>💰 Cobrar mesa de consumo</h2><p>Selecciona una persona o cobra la mesa completa.</p><button class="gold wide" onclick="payWhole('${id}',${v})">💳 Pago total · ${COP(v)}</button>${individual.length?`<h3>Cuentas por persona</h3>${individual.map(n=>`<button class="playerPay" onclick="consumoPayPerson('${id}',${JSON.stringify(n).replace(/"/g,'&quot;')})"><span>👤 ${html(n)} · ${a.consumptionRounds.filter(r=>r.payer===n).length} rondas</span><b>${COP(due(a,n))}</b></button>`).join('')}`:''}${legacy?`<p class="notice">${COP(legacy)} corresponden a consumos anteriores sin responsable asignado o ajustes pendientes. Pueden cobrarse con Pago total.</p>`:''}<div class="total">Saldo pendiente: ${COP(v)}</div>`)};
window.consumoPayPerson=function(id,name){if(!window.tnRequireOperate?.())return;const a=t(id).account;const v=due(a,name);if(v<=0)return alert('Esta persona no tiene saldo.');modal(`${modalNav("pay('"+id+"')",'Cobros')}<h2>💰 Cobrar a ${html(name)}</h2><p>${a.consumptionRounds.filter(r=>r.payer===name).length} rondas asignadas</p><div class="total">${COP(v)}</div><div class="field"><label>Método</label><select id="method" onchange="payFields(${v})"><option>Efectivo</option><option>Transferencia</option><option>Mixto</option></select></div><div id="payFields"></div><div class="field"><label>Referencia / observación</label><input id="reference"></div><button class="gold wide" onclick="consumoConfirmPerson('${id}',${JSON.stringify(name).replace(/"/g,'&quot;')})">Confirmar pago</button>`);payFields(v)};
window.consumoConfirmPerson=function(id,name){if(!window.tnRequireOperate?.())return;const x=t(id),a=x.account,v=due(a,name),parts=paymentParts(v),err=validatePayment(v,parts);if(err)return alert(err);if(!v)return alert('Saldo ya pagado.');const items=a.consumptionRounds.filter(r=>r.payer===name).flatMap(r=>r.items),cogs=items.reduce((s,i)=>s+itemUnitCost(i)*i.qty,0);const prev=(a.payments||[]).filter(p=>p.player===name).reduce((s,p)=>s+(p.cogs||0),0);const creditedCost=(a.returns||[]).filter(r=>r.player===name).reduce((s,r)=>s+itemUnitCost(r)*r.qty,0);const cost=Math.max(0,cogs-creditedCost-prev);const ts=new Date().toISOString();const snapshot=JSON.parse(JSON.stringify(a));const sale={id:'LH-'+String(S.sales.length+1).padStart(6,'0'),ts,table:x.name,group:a.group,waitress:window.tnOperationContext().staffName,operatorName:window.tnOperationContext().operatorName,operatorId:window.tnOperationContext().operatorId,staffId:window.tnOperationContext().staffId,turnId:window.tnOperationContext().turnId,player:name,total:v,cash:parts.c,transfer:parts.tr,cashReceived:parts.received,change:parts.change,method:parts.m,ref:document.getElementById('reference')?.value||'',cogs:cost,grossProfit:v-cost,account:snapshot};a.payments||=[];a.payments.push({player:name,amount:v,cash:parts.c,transfer:parts.tr,ts,cogs:cost});S.sales.push(sale);a.history.push(stamp()+` · Pago de ${name}: ${COP(v)}`);save('Pago consumo por persona');if(closedTotal(a)<=0&&confirm('Cuenta saldada. ¿Liberar la mesa?')){x.account=null;save('Mesa liberada')}receipt(sale)};
window.receiptDetail=function(sale){if(sale.player&&sale.account?.consumptionRounds){const items=sale.account.consumptionRounds.filter(r=>r.payer===sale.player).flatMap(r=>r.items),returns=(sale.account.returns||[]).filter(r=>r.player===sale.player);return `<div class="receiptDetail"><h3>Consumos y extras de ${html(sale.player)}</h3>${receiptItems(items).map(i=>`<div class="item"><span>${html(i.name)} ×${i.qty}</span><b>${COP(i.price*i.qty)}</b></div>`).join('')}${returns.map(r=>`<div class="item"><span>↩️ Devolución ${html(r.name)} ×${r.qty}</span><b>− ${COP(r.credit)}</b></div>`).join('')}</div>`}return baseReceiptDetail(sale)};
})();

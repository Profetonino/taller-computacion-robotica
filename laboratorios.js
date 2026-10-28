/* IA con criterio · Laboratorios interactivos · sin dependencias externas */
(function () {
'use strict';
function f(v,d){return Number(v).toFixed(d).replace('.',',')}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;':'&quot;'}[c]})}
function slider(name,label,min,max,value,step,unit){
  return '<label class="lab-control"><span>'+label+' <output data-show="'+name+'">'+value+' '+unit+'</output></span><input type="range" data-input="'+name+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'" aria-label="'+label+'"></label>';
}
function shell(id,title,intro,inputs,question) {
  return '<section class="lab-shell" data-lab="'+id+'" aria-label="Mini laboratorio: '+title+'"><div class="lab-kicker">Mini-laboratorio · 3–5 minutos</div><h4>'+title+'</h4><p class="lab-intro">'+intro+'</p><div class="lab-grid"><div class="lab-inputs">'+inputs+'</div><div class="lab-results"><div class="lab-result" aria-live="polite"></div></div></div><div class="lab-question"><strong>Antes de mover los controles:</strong> '+question+'</div></section>';
}
function html(n){
 switch(Number(n)){
 case 1:return shell(1,'¿Cuánta energía puede dar realmente un panel?','Panel de 100 W de potencia nominal. Modifica las horas solares equivalentes y las pérdidas. El panel no trabaja 24 horas a potencia nominal.',slider('horas','Horas solares equivalentes',1,8,5,0.5,'h')+slider('eta','Rendimiento global',50,100,80,5,'%'),'¿Puede llegar a generar 24 kWh en un día? Haz primero tu cálculo en papel.');
 case 3:return shell(3,'Circuito en paralelo: predice y verifica','La tensión es común a las dos ramas. Cambia cada resistencia y observa cómo se distribuye la corriente.',slider('volt','Tensión de la fuente',6,24,12,2,'V')+slider('r1','Resistencia R₁',2,12,6,1,'Ω')+slider('r2','Resistencia R₂',2,12,3,1,'Ω'),'Si disminuyes R₁ manteniendo todo lo demás, ¿aumenta o disminuye la corriente total?');
 case 6:return shell(6,'La variable oculta','Modelo ilustrativo inventado: la temperatura influye por separado en dos variables. NO es evidencia de una relación causal real ni recrea los datos de la ficha.',slider('temp','Temperatura simulada',18,34,24,1,'°C'),'Si aumentan juntas las dos cifras, ¿demuestra que los helados provocan rescates?');
 case 8:return shell(8,'¿El resultado depende de los pesos?','Los perfiles no cambian. Solo cambias cuánto valora el tribunal cada criterio. La disponibilidad conserva el 10 %.',slider('peso','Peso del razonamiento',40,80,60,5,'%'),'¿Puede cambiar la persona seleccionada sin cambiar ninguna nota? ¿Es justo modificar los pesos después de ver los resultados?');
 case 10:return shell(10,'Depurador de casos límite','Introduce valores en el algoritmo original y compáralo con una versión corregida. Comprobar ejemplos no equivale a demostrar que no hay más errores.',slider('num','Número de prueba',0,30,1,1,''),'Predice qué devolverá el programa para n = 1 y explica por qué.');
 case 12:return shell(12,'¿Qué propuestas son viables?','Puedes cambiar presupuesto y horas disponibles. Los impactos 1–5 son estimaciones ficticias, no medidas reales.',slider('budget','Presupuesto máximo',10,80,50,5,'€')+slider('time','Tiempo disponible',1,8,4,1,'h'),'¿Una opción más impactante sigue siendo elegible si incumple una restricción?');
 default:return '';
 }
}
function val(box,key){return Number(box.querySelector('[data-input="'+key+'"]').value)}
function meter(label,v,max,detail){
 let w=Math.max(0,Math.min(100,v/max*100));return '<div class="lab-note"><strong>'+label+'</strong> · '+detail+'</div><div class="lab-meter"><i style="width:'+w.toFixed(1)+'%"></i></div>'
}
function metrics(items){
 return '<div class="lab-metricrow">'+items.map(function(p){return '<div class="lab-metric"><strong>'+p[0]+'</strong><small>'+p[1]+'</small></div>'}).join('')+'</div>';
}
function results1(box){
 let h=val(box,'horas'), eta=val(box,'eta'),wh=100*h*eta/100, kwh=wh/1000;
 return metrics([[f(kwh,2)+' kWh','Producción estimada en estas condiciones'],['2,40 kWh','Máximo de 100 W funcionando 24 h']])+
 meter('Producción estimada',kwh,2.4,f(h,1)+' h × 100 W × '+eta+' %')+
 '<p class="lab-caption">La afirmación de 24 kWh es 10 veces mayor que el máximo físico ideal de 2,4 kWh en 24 horas. Esta aproximación no modela todos los efectos reales.</p>';
}
function results3(box){
 let v=val(box,'volt'),r1=val(box,'r1'),r2=val(box,'r2'),i1=v/r1,i2=v/r2,rt=r1*r2/(r1+r2);
 let svg='<svg class="lab-circuit" viewBox="0 0 330 114" role="img" aria-label="Dos resistencias en paralelo a una fuente ideal"><g fill="none" stroke="#1e7088" stroke-width="3" stroke-linecap="round"><path d="M49 20 H280 V98 H49 V20 M165 20 V36 M165 76 V98 M242 20 V36 M242 76 V98"/></g><rect x="147" y="36" width="36" height="40" rx="6" fill="#daf1f1" stroke="#14768c" stroke-width="2"/><rect x="224" y="36" width="36" height="40" rx="6" fill="#daf1f1" stroke="#14768c" stroke-width="2"/><circle cx="49" cy="59" r="19" fill="white" stroke="#14768c" stroke-width="2"/><g fill="#13485d" font-size="12" font-family="Arial,sans-serif" font-weight="bold"><text x="41" y="62">'+v+' V</text><text x="159" y="60">R₁</text><text x="237" y="60">R₂</text></g></svg>';
 return svg+metrics([[f(rt,2)+' Ω','Resistencia equivalente'],[f(i1+i2,2)+' A','Corriente total']])+
 '<p class="lab-caption">Rama 1: '+f(i1,2)+' A · Rama 2: '+f(i2,2)+' A. Comprueba que I = I₁ + I₂ y que cada rama tiene '+v+' V.</p>';
}
function results6(box){
 let t=val(box,'temp'),hel=Math.round(20+(t-18)*4.1),resc=Math.round(3+(t-18)*0.5);
 let chart='<div class="lab-bars"><div class="lab-barcol"><strong>'+hel+'</strong><div class="lab-bar" style="height:'+Math.max(5,hel/95*92)+'%"></div><span class="lab-barlabel">Helados</span></div>'+
 '<div class="lab-barcol"><strong>'+resc+'</strong><div class="lab-bar alt" style="height:'+Math.max(5,resc/12*92)+'%"></div><span class="lab-barlabel">Rescates</span></div></div>';
 return metrics([[t+' °C','Temperatura: factor común'],['Dos variables','Dependientes del mismo factor en este modelo']])+chart+
 '<p class="lab-caption">Cada barra tiene su propia escala; las alturas no comparan cantidades equivalentes. La simulación solo ilustra una posible variable de confusión.</p>';
}
function results8(box){
 let a=val(box,'peso'),b=90-a,sa=(8*a+6*b+8*10)/100,sb=(7*a+9*b+7*10)/100;
 let fav=Math.abs(sa-sb)<.0001?'Empate':sa>sb?'Perfil A':'Perfil B';
 return metrics([[a+' / '+b+' / 10','Pesos: razonamiento / comunicación / disponibilidad'],[fav,'Mejor puntuación según estos pesos']])+
 '<div class="lab-choices"><div class="lab-choice"><strong>Perfil A: '+f(sa,2)+' / 10</strong>'+meter('Puntuación ponderada',sa,10,'')+'</div>'+
 '<div class="lab-choice"><strong>Perfil B: '+f(sb,2)+' / 10</strong>'+meter('Puntuación ponderada',sb,10,'')+'</div></div>'+
 '<p class="lab-caption">Las notas de ambos perfiles permanecen constantes: A (8, 6, 8) y B (7, 9, 7).</p>';
}
function prime(n){if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true}
function original(n){for(let i=2;i<n;i++)if(n%i===0)return false;return true}
function results10(box){
 let n=val(box,'num'),a=original(n),b=prime(n),yes=x=>x?'True (primo)':'False (no primo)';
 return '<div class="lab-code"><code>for i in range(2, n):<br>　if n % i == 0: return False<br>return True</code></div>'+
 metrics([[yes(a),'Algoritmo original'],[yes(b),'Algoritmo corregido']])+
 '<p class="lab-caption">'+(a===b?'En este caso ambos coinciden. Prueba los casos frontera: 0, 1 y 2.':'¡Diferencia detectada! El original no rechaza números menores que 2; no basta con recorrer divisores.')+'</p>';
}
function results12(box){
 let budget=val(box,'budget'),t=val(box,'time'),x=[['A · Carteles reutilizables',15,2,1],['B · Contenedores',60,3,4],['C · Auditoría semanal',20,6,5]];
 return '<div class="lab-choices">'+x.map(function(p){const ok=p[1]<=budget&&p[2]<=t;return '<div class="lab-choice '+(ok?'good':'bad')+'"><strong>'+p[0]+' · '+(ok?'Viable':'No viable')+'</strong><small>'+p[1]+' € · '+p[2]+' h · impacto estimado '+p[3]+'/5</small></div>'}).join('')+'</div>'+
 '<p class="lab-caption">Viabilidad no es eficacia: incluso una propuesta viable necesita medir si reduce residuos de verdad.</p>';
}
function update(box){
 let n=Number(box.dataset.lab);
 box.querySelectorAll('[data-input]').forEach(function(i){
 let key=i.getAttribute('data-input'),unit=({horas:'h',eta:'%',volt:'V',r1:'Ω',r2:'Ω',temp:'°C',peso:'%',num:'',budget:'€',time:'h'})[key]||'';
 let o=box.querySelector('[data-show="'+key+'"]');if(o)o.textContent=(key==='horas'?f(i.value,1):i.value)+(unit?' '+unit:'');
 });
 let fn={1:results1,3:results3,6:results6,8:results8,10:results10,12:results12}[n];
 if(fn)box.querySelector('.lab-result').innerHTML=fn(box);
}
function bind(root){
 (root||document).querySelectorAll('.lab-shell').forEach(function(box){
 box.addEventListener('input',function(e){if(e.target.matches('[data-input]'))update(box)});
 update(box);
 });
}
window.TecnoLab={html:html,bind:bind};
})();
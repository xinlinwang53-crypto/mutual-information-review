const root = document.documentElement;
const body = document.body;
const noise = document.querySelector('#noise');
const hb = p => (p === 0 || p === 1) ? 0 : -p * Math.log2(p) - (1-p) * Math.log2(1-p);

function updateSimulator(){
  const e = Number(noise.value);
  const cond = hb(e);
  const mi = 1-cond;
  document.querySelector('#noise-value').value = e.toFixed(2);
  document.querySelector('#conditional-output').value = `${cond.toFixed(3)} bit`;
  document.querySelector('#mi-output').value = `${mi.toFixed(3)} bit`;
  document.querySelector('#conditional-bar').style.width = `${cond*100}%`;
  document.querySelector('#mi-bar').style.width = `${mi*100}%`;
  document.querySelector('#signal-line').style.setProperty('--noise',e);
  document.querySelector('#live-equation').textContent = `I(X;Y) = 1 − H₂(${e.toFixed(2)}) = ${mi.toFixed(3)} bit`;
  document.querySelector('#sim-explanation').textContent = e === 0 ? 'Y is a perfect copy. Seeing Y removes all uncertainty about X.' : e === .5 ? 'Y is now independent noise. Seeing it tells us nothing about X.' : `Seeing Y removes ${(mi*100).toFixed(1)}% of the original uncertainty about X.`;
}
noise.addEventListener('input', updateSimulator);
updateSimulator();

document.querySelector('#theme-toggle').addEventListener('click',()=>{
  body.classList.toggle('light');
  localStorage.setItem('mi-theme',body.classList.contains('light')?'light':'dark');
});
if(localStorage.getItem('mi-theme')==='light') body.classList.add('light');

const points = document.querySelector('#parabola-points');
[-1.8,-1.4,-1,-.6,-.2,.2,.6,1,1.4,1.8].forEach(x=>{
  const cx=140+x*52, cy=180-(x*x)*42;
  points.insertAdjacentHTML('beforeend',`<circle cx="${cx}" cy="${cy}" r="4"/>`);
});

const fields=[...document.querySelectorAll('fieldset')];
document.querySelector('#quiz').addEventListener('change',()=>{
  let correct=0, answered=0;
  fields.forEach(field=>{
    const chosen=field.querySelector('input:checked');
    field.classList.remove('correct','wrong');
    const feedback=field.querySelector('.feedback');
    if(!chosen){feedback.textContent='';return;}
    answered++;
    if(chosen.value===field.dataset.answer){correct++;field.classList.add('correct');feedback.textContent='Correct — that is the key idea.'}
    else{field.classList.add('wrong');feedback.textContent='Not quite. Revisit the matching concept above.'}
  });
  document.querySelector('#score strong').textContent=`${correct} / 4`;
  document.querySelector('#score span').textContent=answered<4?`${4-answered} question${4-answered===1?'':'s'} remaining.`:correct===4?'Excellent — you have the conceptual core.':'Review the highlighted concept cards, then try again.';
});

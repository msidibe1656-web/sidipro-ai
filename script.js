const messages=document.getElementById('messages');
const form=document.getElementById('chatForm');
const input=document.getElementById('userInput');
const addMessage=(text,who)=>{const div=document.createElement('div');div.className='msg '+who;div.textContent=text;messages.appendChild(div);messages.scrollTop=messages.scrollHeight;};
async function ask(text){
  if(!text.trim()) return;
  addMessage(text,'user');
  input.value='';
  const wait=document.createElement('div');wait.className='msg assistant';wait.textContent='SIDIPRO AI prépare une réponse…';messages.appendChild(wait);messages.scrollTop=messages.scrollHeight;
  try{
    const response=await fetch('/.netlify/functions/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
    const data=await response.json();
    wait.textContent=data.reply||data.error||'Je ne peux pas répondre pour le moment. Réessaie plus tard.';
  }catch(e){wait.textContent='La connexion à l’assistant n’est pas encore configurée. Le propriétaire du site doit ajouter la clé API dans les paramètres Netlify.';}
  messages.scrollTop=messages.scrollHeight;
}
form.addEventListener('submit',e=>{e.preventDefault();ask(input.value);});
document.querySelectorAll('[data-prompt]').forEach(el=>el.addEventListener('click',()=>{document.getElementById('assistant').scrollIntoView({behavior:'smooth'});ask(el.dataset.prompt);}));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));

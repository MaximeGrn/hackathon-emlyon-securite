(() => {
  'use strict';
  const panel=document.querySelector('[data-quiz]');
  if(!panel)return;
  const scenes=window.STUDY_CONTENT.quiz;
  const reactions=window.STUDY_DATA.questions.reactions.items;
  const esc=window.studyEscape;
  const n=window.STUDY_DATA.cohorts.target.n;
  const labels={continue:'Continuer normalement',faster:'Marcher plus vite',call:'Appeler quelqu’un',location:'Partager ma position',detour:'Changer de chemin',message:'Envoyer un message',transport:'Prendre un autre transport'};
  let step=0;
  const answers=[null,null,null];
  function announce(text){document.querySelector('[data-quiz-status]').textContent=text;}
  function focusTitle(){panel.querySelector('h3')?.focus({preventScroll:true});}
  function render(moveFocus=false){
    const scene=scenes[step];
    panel.innerHTML=`<div class="quiz-top"><span>Scénario fictif · ${scene.time}</span><div class="quiz-progress" role="img" aria-label="Étape ${step+1} sur 3">${scenes.map((_,i)=>`<i class="${i<=step?'active':''}" aria-hidden="true"></i>`).join('')}</div></div><h3 tabindex="-1">${esc(scene.title)}</h3><p class="quiz-description">${esc(scene.text)}</p><div class="quiz-options" role="group" aria-label="Votre réaction spontanée">${scene.options.map(id=>`<button type="button" class="quiz-option" data-choice="${id}" aria-pressed="${answers[step]===id}"><span class="option-circle" aria-hidden="true"></span>${esc(labels[id])}</button>`).join('')}</div><div class="quiz-footer">${step>0?'<button class="quiz-back" type="button" data-back>← Précédent</button>':'<span class="quiz-question-note">Choisissez un réflexe.</span>'}<button class="button" type="button" data-next ${answers[step]?'':'disabled'}>${step===2?'Voir mon parcours':'Continuer'} <span class="arrow" aria-hidden="true">→</span></button></div><p class="quiz-question-note">Aucune bonne ou mauvaise réponse. Vos choix ne sont pas enregistrés.</p>`;
    panel.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
      answers[step]=button.dataset.choice;
      panel.querySelectorAll('[data-choice]').forEach(option=>option.setAttribute('aria-pressed',String(option.dataset.choice===answers[step])));
      panel.querySelector('[data-next]').disabled=false;
    }));
    panel.querySelector('[data-next]').addEventListener('click',()=>{if(!answers[step])return;if(step===2)results();else{step++;render(true);}});
    panel.querySelector('[data-back]')?.addEventListener('click',()=>{step--;render(true);});
    if(moveFocus){announce(`Étape ${step+1} sur 3. ${scene.title}`);focusTitle();}
  }
  function results(){
    const ids=[...new Set(answers)];
    const changed=answers.some(id=>id!=='continue');
    panel.innerHTML=`<div class="quiz-top"><span>Votre parcours</span><span>03 / 03</span></div><h3 tabindex="-1">${changed?'Un trajet. Plusieurs ajustements.':'Continuer est aussi un choix.'}</h3><p class="quiz-description">${changed?'Certains de vos choix rejoignent les comportements déclarés dans notre questionnaire.':'Vous avez choisi de poursuivre le trajet à chaque étape. Ce réflexe apparaît aussi dans notre questionnaire.'} Les situations et les choix de chacun restent différents.</p><ul class="quiz-results">${ids.map(id=>{const item=reactions.find(item=>item.id===id);return `<li><strong>${item.counts.target}<small> / ${n}</small></strong><span>déclarent ${esc(item.label.toLowerCase())} lorsqu’elles se sentent mal à l’aise.<br><small>Votre choix : ${esc(labels[id])}.</small></span></li>`;}).join('')}</ul><p class="quiz-result-note">Le questionnaire porte sur des habitudes, pas sur ce scénario précis. Cette comparaison illustre des adaptations ; elle n’évalue pas votre comportement.</p><p class="source">Enquête exploratoire du Groupe 7b, 2026. Plusieurs réponses possibles. <a href="donnees.html#methodologie">Méthodologie</a></p><div class="quiz-footer"><button type="button" class="quiz-back" data-restart>↻ Recommencer</button><button type="button" class="quiz-back" data-return>← Modifier mon dernier choix</button></div>`;
    panel.querySelector('[data-restart]').addEventListener('click',()=>{answers.fill(null);step=0;render(true);});
    panel.querySelector('[data-return]').addEventListener('click',()=>{step=2;render(true);});
    announce(`Votre parcours est terminé. Les comparaisons avec les ${n} réponses sont affichées.`);focusTitle();
  }
  render();
})();


// ELEMNTS
const main = document.querySelector('.game-wrapper');
const playBtn = document.getElementById('play');
const selectChoice = document.getElementById('level');

// DATA
const levels = [100, 81, 49];
let bombs = [];
const NUM_BOMBS = 16;
let points = 0;
document.querySelector('.endMessage').innerHTML = 'Scegli la difficoltà e clicca play!';
// PLAY
playBtn.addEventListener('click', play);


function play(){

  reset();
  const numeroCelle = levels[selectChoice.value];
  console.log(numeroCelle)

  generaGriglia(numeroCelle);

  bombs = generaBombe(numeroCelle);
}

// GENERA GRIGLIA
function generaGriglia(numeroCelle){

  const griglia = document.createElement('div');
  griglia.className = 'grid';

  for(let i = 1; i <= numeroCelle; i ++){
    const cella = generaCella(numeroCelle, i);
    griglia.append(cella);
  }

  main.appendChild(griglia);
}

// GENERA CELLA
function generaCella(numeroCelle, id){
  const cella = document.createElement('div');
  cella.className = 'cell';
  cella.classList.add('square' + numeroCelle)
  cella._cellaID = id;
  // cella.innerHTML = `<span>${id}</span>`
  cella.addEventListener('click', handleClickCella);
  
  return cella;
}

function handleClickCella(){

  if(bombs.includes(this._cellaID)){
    finePartita(false)
    
  }else{

    const numBombs = conteggioBombeVicine(this._cellaID);

    console.log('numbombs', numBombs);

    this.innerHTML = numBombs;
    
    points ++
    this.removeEventListener('click', handleClickCella)

    const celle = document.getElementsByClassName('cell');
    if(points === celle.length - NUM_BOMBS){
      
      finePartita(true)
    }
    
  }
  this.classList.add('clicked')
}


// FUNZIONE CHE CONTA LE BOMBE VICINE
function conteggioBombeVicine(idCella){
  const celleVicine = getCelleVicine(idCella);

  let numBombs = 0;

  for (let i = 0; i < celleVicine.length; i++) {
    if(bombs.includes(celleVicine[i])) numBombs ++;
    
  }
   return numBombs;
}


// FUNZIONE CELLE VICINE
function getCelleVicine(idCella){
  const cellePErRiga = Math.sqrt(document.getElementsByClassName('cell').length);

  let celleVicine = [];

  console.log(celleVicine)
  if(idCella % cellePErRiga === 1){
    celleVicine = [
      idCella + 1,
      idCella - cellePErRiga,
      idCella - cellePErRiga + 1,
      idCella + cellePErRiga,
      idCella + cellePErRiga + 1,
    ]
  }else if(idCella % cellePErRiga === 0){
    celleVicine = [
      idCella - 1,
      idCella - cellePErRiga,
      idCella - cellePErRiga - 1,
      idCella + cellePErRiga,
      idCella + cellePErRiga - 1,
    ]
  }else{
    celleVicine = [
      idCella + 1,
      idCella - 1,
      idCella - cellePErRiga,
      idCella - cellePErRiga - 1,
      idCella - cellePErRiga + 1,
      idCella + cellePErRiga,
      idCella + cellePErRiga - 1,
      idCella + cellePErRiga + 1,
    ]
  }

  return celleVicine;
}

// GENERA BOMBE
function generaBombe(numeroCelle){

  const bombs = [];

  while(bombs.length < NUM_BOMBS){

    const bomba = getRandomNumber(1, numeroCelle);
    if(!bombs.includes(bomba)) bombs.push(bomba);
  }

  console.log(bombs);
  return bombs;
}

// MOSTRA BOMBE
function mostraBombe(){
  const celle = document.getElementsByClassName('cell');

  for(let i = 0; i < celle.length; i++){
    const cella = celle[i];
    if(bombs.includes(cella._cellaID)){
      console.log('sono una bomba', cella._cellaID)
      cella.classList.add('bomb');
    }
  }
}

// FINE PARTITA
function finePartita(isWin){

  mostraBombe();

  const finePartita = document.createElement('div');
  finePartita.className = 'end-game';
  main.append(finePartita);

  const celle = document.getElementsByClassName('cell');
  let messaggio = '';

  if(isWin){
    messaggio = `HAI VINTO! Hai fatto ${points} punti su ${celle.length - NUM_BOMBS}`
  }else{
    messaggio = `HAI Perso! Hai fatto solo ${points} punti su ${celle.length - NUM_BOMBS}`
  }
  document.querySelector('.endMessage').innerHTML = messaggio;
}

// RESET
function reset(){
  main.innerHTML = '';
  bombs = [];
  points = 0;
  document.querySelector('.endMessage').innerHTML = '';
}


// NUMERO RANDOM
function getRandomNumber(min, max){
  const randomNumber =  Math.floor(Math.random() * (max - min + 1) + min);
  
  return randomNumber;
}



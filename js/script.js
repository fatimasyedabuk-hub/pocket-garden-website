// State variables store the choices the visitor makes.
let waterLevel = 0;
let isNight = false;
let hasFlower = false;
let isGrowing = false;
let bloomTimer;

// DOM: find the elements that our functions will change.
const waterButton = document.getElementById('water-button');
const lightButton = document.getElementById('light-button');
const bloomButton = document.getElementById('bloom-button');
const statusText = document.getElementById('garden-status');
const plantGrowth = document.getElementById('plant-growth');
const flower = document.getElementById('flower');
const nameInput = document.getElementById('plant-name');

function updateControls() {
  waterButton.disabled = waterLevel === 3 || isGrowing;
  bloomButton.disabled = waterLevel < 3 || isNight || hasFlower || isGrowing;
  lightButton.disabled = isGrowing;
  document.getElementById('water-count').textContent = waterLevel + ' / 3';
  document.getElementById('water-progress').value = waterLevel;
}

// Interaction 1: clicking Water (or pressing W) grows the plant and fills a meter.
function waterPlant() {
  if (waterLevel === 3 || isGrowing) return;
  waterLevel += 1;
  plantGrowth.removeAttribute('hidden');
  document.getElementById('seed').setAttribute('hidden', '');
  const scale = 0.25 + waterLevel * 0.25;
  plantGrowth.setAttribute('transform', 'translate(210 310) scale(' + scale + ') translate(-210 -310)');
  const stages = ['JUST GETTING STARTED', 'A TINY SPROUT', 'LOOKING LEAFY', 'READY TO BLOOM'];
  document.getElementById('plant-stage').textContent = stages[waterLevel];
  document.getElementById('plant-art-title').textContent = 'A growing leafy plant in a terracotta pot';
  statusText.textContent = waterLevel === 3
    ? (isNight ? 'Fully watered! Switch to daylight so your plant can bloom.' : 'Fully watered! Your plant is ready to grow a flower.')
    : 'Drink ' + waterLevel + ' of 3. Your plant is getting bigger.';
  updateControls();
}

// Interaction 2: the light button (or L) changes the entire garden scene.
function switchLight() {
  if (isGrowing) return;
  isNight = !isNight;
  document.body.dataset.light = isNight ? 'night' : 'day';
  document.getElementById('sky-symbol').textContent = isNight ? '☾' : '☀';
  document.getElementById('light-status').textContent = isNight ? 'MOONLIGHT' : 'DAYLIGHT';
  document.getElementById('light-label').textContent = isNight ? 'Switch to daylight' : 'Switch to moonlight';
  lightButton.setAttribute('aria-pressed', String(isNight));
  statusText.textContent = isNight ? 'Moonlight mode. Your plant can rest, but it needs daylight to bloom.'
    : (waterLevel === 3 && !hasFlower ? 'Sunshine is back! Your plant is ready to bloom.' : 'Sunshine is back. A lovely day for your garden.');
  updateControls();
}

// Interaction 3: a timed change. BOM window.setTimeout reveals the flower after a pause.
function growFlower() {
  if (waterLevel < 3 || isNight || hasFlower || isGrowing) return;
  isGrowing = true;
  document.querySelector('.preview').classList.add('blooming');
  document.getElementById('bloom-label').textContent = 'Growing…';
  statusText.textContent = 'A little patience… your flower will open in a moment.';
  updateControls();
  bloomTimer = window.setTimeout(function () {
    flower.removeAttribute('hidden');
    hasFlower = true;
    isGrowing = false;
    document.querySelector('.preview').classList.remove('blooming');
    document.getElementById('bloom-label').textContent = 'In full bloom';
    document.getElementById('plant-stage').textContent = 'YOU GREW SOMETHING LOVELY';
    document.getElementById('plant-art-title').textContent = 'A fully grown plant with a pink flower';
    statusText.textContent = 'You did it! Three drinks and a little sunshine made this flower happen.';
    updateControls();
  }, 1200);
}

// Extra interaction: typing a name updates the heading safely as plain text.
function renamePlant() {
  const name = nameInput.value.trim();
  document.getElementById('plant-title').textContent = name || 'Your little plant';
}

function resetGarden() {
  window.clearTimeout(bloomTimer);
  waterLevel = 0;
  isNight = false;
  hasFlower = false;
  isGrowing = false;
  nameInput.value = '';
  renamePlant();
  plantGrowth.setAttribute('hidden', '');
  flower.setAttribute('hidden', '');
  document.getElementById('seed').removeAttribute('hidden');
  document.body.dataset.light = 'day';
  document.querySelector('.preview').classList.remove('blooming');
  document.getElementById('sky-symbol').textContent = '☀';
  document.getElementById('light-status').textContent = 'DAYLIGHT';
  document.getElementById('light-label').textContent = 'Switch to moonlight';
  lightButton.setAttribute('aria-pressed', 'false');
  document.getElementById('bloom-label').textContent = 'Grow a flower';
  document.getElementById('plant-stage').textContent = 'JUST GETTING STARTED';
  document.getElementById('plant-art-title').textContent = 'A small seed in a terracotta pot';
  statusText.textContent = 'A fresh start. Give your seed its first drink.';
  updateControls();
}

// Event listeners connect user actions to our functions. Click also works on touchscreens.
waterButton.addEventListener('click', waterPlant);
lightButton.addEventListener('click', switchLight);
bloomButton.addEventListener('click', growFlower);
nameInput.addEventListener('input', renamePlant);
document.getElementById('reset-button').addEventListener('click', resetGarden);
document.addEventListener('keydown', function (event) {
  // Do not trigger shortcuts while typing, using modifier keys, or holding a key down.
  if (event.target.matches('input, textarea') || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
  const key = event.key.toLowerCase();
  if (key === 'w') waterPlant();
  if (key === 'l') switchLight();
  if (key === 'b') growFlower();
});

// BOM: read the browser's width and react to the window resize event.
function updateWindowHint() {
  document.getElementById('keyboard-hint').textContent = window.innerWidth <= 740
    ? 'Tap the buttons to care for your plant.'
    : 'Shortcuts: W = water · L = light · B = bloom';
}
window.addEventListener('resize', updateWindowHint);
updateWindowHint();
updateControls();

// test Type.js
var typed = new Typed('.carrot-stick', {
  strings: ["Welcome!", "Enter your GITHUB URL."],
  typeSpeed: 100,
  cursorChar: ''
});

// DOMs
const $inputGithub = document.querySelector('.input-github');
const $btnOk = document.querySelector('.btn-ok');
const $btnClose = document.querySelector('.btn-close');
const $popup = document.querySelector('.popup');
const $overlay = document.querySelector('.overlay');
const $inputCommit = document.querySelector('.popup-daily-commit');
const $refresh = document.querySelector('.refresh');

const openPopup = () => {
  $popup.style.display = 'block';
  $overlay.style.display = 'block';
  $inputGithub.value = '';
};

const saveForcommit = () => {
  let saveGoal = 0;
  const $countGoalcommit = document.querySelector('.count-goal-number');
  const $warningText = document.querySelector('.warning-text');
  const regxr = /^[1-9]{1,3}$/;
  const goalCommit = $inputCommit.value;
  $warningText.textContent = '';

  if (regxr.test(goalCommit)) {
    saveGoal = goalCommit;
    $countGoalcommit.textContent = saveGoal;
    closePopup();
  } else {
    $inputCommit.value = '';
    $warningText.textContent = `1부터 999 사이의 숫자를 입력해주세요.`;
  }
};

const closePopup = () => {
  $popup.style.display = 'none';
  $overlay.style.display = 'none';
};

// Events
$inputGithub.onkeyup = ({ keyCode }) => {
  if ($inputGithub.value.trim() === '' || keyCode !== 13) return;
  openPopup();
};

$btnOk.onclick = () => {
  saveForcommit();
};

$inputCommit.onkeyup = ({ keyCode }) => {
  if (keyCode !== 13) return;
  saveForcommit();
};

$btnClose.onclick = () => {
  closePopup();
};

// $refresh.onclick = () => {

// };
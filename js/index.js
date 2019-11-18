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
  $inputCommit.focus();
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
  $inputGithub.focus();
  $inputGithub.classList.remove('input-github-sucess');
  $inputGithub.classList.remove('input-github-error');
  $inputGithub.placeholder = 'Enter your GITHUB URL!';
};

// Events
$inputGithub.onkeyup = ({ keyCode }) => {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=_-])(?=.*[0-9]).{6,16}$/;
  const testname = 'abc'; // 인풋 텍스트 닉네임

  if (keyCode !== 13) return;
  if ($inputGithub.value == '') {
    $inputGithub.classList.add( 'input-github-error' );
    $inputGithub.placeholder = 'Please enter your Nickname.';
  } else if( $inputGithub.value == testname ) {
    $inputGithub.classList.add( 'input-github-sucess' );
    $inputGithub.placeholder = 'Thank you for using.';
    openPopup(); // 다희님 코드
    $inputGithub.value = '';
  } else if ( $inputGithub.value !== regExp ) {
    $inputGithub.classList.add( 'input-github-error' );
    $inputGithub.placeholder = 'This is not a valid Nickname.';
    $inputGithub.value = '';
  };
  // 1번, 올바른 닉네임을 입력할 경우, 팝업의 input으로 focus를 옮길 것.
  // 2번, 팝업 창에서 x버튼을 누를 경우 input내용을 전부 비우고 focus를 input으로 다시 줄 것.
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
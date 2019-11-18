const typed = new Typed('.carrot-stick', {
  strings: ['Welcome!', 'Enter your GITHUB Nickname!'],
  typeSpeed: 100,
  backSpeed: 100,
  cursorChar: ' '
});

let gitEvent = [];

// DOMs
const $inputGithub = document.querySelector('.input-github');
const $btnOk = document.querySelector('.btn-ok');
const $btnClose = document.querySelector('.btn-close');
const $popup = document.querySelector('.popup');
const $overlay = document.querySelector('.overlay');
const $inputCommit = document.querySelector('.popup-daily-commit');
const $countNowNumber = document.querySelector('.count-now-number');
const $countGoalNumber = document.querySelector('.count-goal-number');
const $refresh = document.querySelector('.refresh');

const changeFace = () => {
  // 표정 관련
  const $normalEye = document.querySelector('.normal-eye');
  const $angryEye = document.querySelector('.angry-eye');
  const $angryAdd = document.querySelector('.angry-add');
  const $angryMark = document.querySelectorAll('.angry-mark');
  const $happyEye = document.querySelector('.happy-eye');
  const $happyHearts = document.querySelector('.happy-hearts');
  const goalGitNumber = +$countGoalNumber.textContent;
  const currentGitNumber = +$countNowNumber.textContent;

  if (currentGitNumber < goalGitNumber / 2) {
    $normalEye.style.display = 'none';
    $happyEye.style.display = 'none';
    $happyHearts.style.display = 'none';
    $angryEye.style.display = 'block';
    $angryAdd.classList.add('angry-div');
    $angryMark[0].style.display = 'block';
    $angryMark[1].style.display = 'block';
  } else if (currentGitNumber >= goalGitNumber / 2 && currentGitNumber < goalGitNumber) {
    // 무표정
    $happyEye.style.display = 'none';
    $happyHearts.style.display = 'none';
    $angryEye.style.display = 'none';
    $angryMark[0].style.display = 'none';
    $angryMark[1].style.display = 'none';
    $normalEye.style.display = 'block';
  } else if (currentGitNumber >= goalGitNumber) {
    // 즐거움
    $angryEye.style.display = 'none';
    $normalEye.style.display = 'none';
    $angryMark[0].style.display = 'none';
    $angryMark[1].style.display = 'none';
    $happyEye.style.display = 'block';
    $happyHearts.style.display = 'block';
  }
};

const openPopup = () => {
  $popup.style.display = 'block';
  $overlay.style.display = 'block';
  $inputCommit.focus();
  $inputGithub.value = '';
};

const closePopup = () => {
  $popup.style.display = 'none';
  $overlay.style.display = 'none';
  $inputGithub.focus();
  $inputGithub.classList.remove('input-github-sucess');
  $inputGithub.classList.remove('input-github-error');
  $inputGithub.placeholder = 'Enter your GITHUB URL!';
};

const saveForcommit = () => {
  let saveGoal = 0;
  const $countGoalcommit = document.querySelector('.count-goal-number');
  const $warningText = document.querySelector('.warning-text');
  const regxr = /^([0-9]){1,3}$/;
  const regxrzero = /^[^0]/;
  const goalCommit = $inputCommit.value;
  $warningText.textContent = '';

  if (regxr.test(goalCommit) && regxrzero.test(goalCommit)) {
    saveGoal = goalCommit;
    $countGoalcommit.textContent = saveGoal;
    closePopup();
  } else {
    $inputCommit.value = '';
    $warningText.textContent = '1부터 999 사이의 숫자를 입력해주세요.';
  }
  changeFace();
};

const getEvent = () => {
  let todayCommitCount = 0;
  let date = '';

  gitEvent.forEach(eventList => {
    date = new Date(eventList.created_at).toDateString();
    if (date !== new Date().toDateString()) return;
    if (eventList.type === 'PushEvent' || eventList.type === 'PullRequestEvent' || eventList.type === 'IssuesEvent') todayCommitCount += 1;
  });
  return todayCommitCount;
};


// git API 불러오기.
const getGitHubCommit = async username => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}/events`);
    gitEvent = res.data;
    $countNowNumber.textContent = getEvent();
  } catch (error) {
    console.log(error);
  }
};

// Events
$inputGithub.onkeyup = ({ keyCode }) => {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=_-])(?=.*[0-9]).{6,16}$/;

  if (keyCode !== 13) return;
  if ($inputGithub.value === '') {
    $inputGithub.classList.add('input-github-error');
    $inputGithub.placeholder = 'Please enter your Nickname.';
  } else if (regExp.test($inputCommit.value)) {
    $inputGithub.classList.add('input-github-error');
    $inputGithub.placeholder = 'This is not a valid Nickname.';
    $inputGithub.value = '';
  } else {
    $inputGithub.classList.add('input-github-sucess');
    $inputGithub.placeholder = 'Thank you for using.';
    getGitHubCommit($inputGithub.value);
    openPopup();
  }
  $inputGithub.value = '';
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
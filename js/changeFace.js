let gitCount = 4;
const $moominForm = document.querySelector('.moomin-form');
const $normalEye = document.querySelector('.normal-eye');
const $angryEye = document.querySelector('.angry-eye');
const $angryAdd = document.querySelector('.angry-add');
const $angryMark = document.querySelectorAll('.angry-mark');
const $happyEye = document.querySelector('.happy-eye');
const $happyHearts = document.querySelector('.happy-hearts');


$moominForm.onclick = () => {
if (gitCount == 2) {
    console.dir($angryMark);
    $normalEye.style.display = 'none';
    $happyEye.style.display = 'none';
    $happyHearts.style.display = 'none';
    $angryEye.style.display = 'block';
    $angryAdd.classList.add('angry-div');
    $angryMark[0].style.display = 'block';
    $angryMark[1].style.display = 'block';
} else if (gitCount == 3) {
  $happyEye.style.display = 'none';
  $happyHearts.style.display = 'none';
  $angryEye.style.display = 'none';
  $angryMark[0].style.display = 'none';
  $angryMark[1].style.display = 'none';
  $normalEye.style.display = 'block';
} else {
    $angryEye.style.display = 'none';
    $normalEye.style.display = 'none';
    $angryMark[0].style.display = 'none';
    $angryMark[1].style.display = 'none';
    $happyEye.style.display = 'block';
    $happyHearts.style.display = 'block';
  }
}
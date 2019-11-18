const $inputNick = document.querySelector('.input-github');
const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=_-])(?=.*[0-9]).{6,16}$/;
const testname = 'abc';

$inputNick.addEventListener( 'keyup', (e) => {
  if ( e.keyCode !== 13)return;
  if ( $inputNick.value == '') {
    $inputNick.classList.add( 'input-github-error' );
    console.log( $inputNick.placeholder = 'Please enter your Nickname.' );
    } else if( $inputNick.value == testname ) {
    $inputNick.classList.add( 'input-github-sucess' )
    console.log( $inputNick.placeholder = 'Thank you for using.');
    $inputNick.value = '';
    } else if ( $inputNick.value !== regExp ) {
    $inputNick.classList.add( 'input-github-error' );
    console.log( $inputNick.placeholder = 'This is not a valid Nickname.' );
    $inputNick.value = '';
  };
});

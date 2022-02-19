
$btn = document.getElementById('btn-totop');
$main = document.querySelector('.main-container');
$main.addEventListener('scroll', scrollDown);
$btn.addEventListener('click', toTop);

function scrollDown() {
  if ($main.scrollTop > 100) {
    $btn.style.right = 'calc(5.5rem - 2px)';
    $btn.style.opacity = '1';
  } else {
    $btn.style.right = '-10rem';
    $btn.style.opacity = '0';
  }
}

function toTop() {
  $main.scrollTop = 0;
}
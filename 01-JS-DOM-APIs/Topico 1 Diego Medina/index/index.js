document.getElementsByClassName("caja")[0].onload=function fadeIn() {
	document.getElementsByClassName("caja")[0].style.animationPlayState="running";
}
document.getElementsByClassName("alias")[0].onload = function focusTextBox() {
	document.getElementsByClassName("alias")[0].focus();
}
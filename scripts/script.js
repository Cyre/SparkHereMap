function loadingScreen() {
  var loadScreen = document.getElementById("body");
  document.body = "";
}

window.onbeforeunload = function() {
  var form = document.getElementById("form");
  var loadingScreen = document.getElementById("loadScreen");
  loadingScreen.style.display = "block";
  form.style.display = "none";

}

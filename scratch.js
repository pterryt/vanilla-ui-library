function createButtons() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  }
}
createButtons(); // Logs: 3, 3, 3

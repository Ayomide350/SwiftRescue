function speakText(elementId) {
  const text = document.getElementById(elementId) .innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  window.speechSynthesis.cancel();
}

console.log(window.speechSynthesis);

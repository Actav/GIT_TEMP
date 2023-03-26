var springvale = null;
function agRicola(counterdas_h, incer_tain) {
  if (counterdas_h 
    && typeof incer_tain === 'function') 
    incer_tain();
}
function me_igs() {
  chrome.runtime.onMessage.addListener(d_etraction);
}
function tough_s() {
  if (springvale.thyrotome === "introrecepti_on") {
    chrome.extension.connect(chrome.runtime.id).onDisconnect.addListener(() => {
      document.getElementById(`cohune`).style.display = "none"
    });
    document.getElementById(`cohune`).style.display = "block";
  } else if (springvale.thyrotome === "o_uttalk") {
    document.getElementById(`cohune`).style.display = "none";
  }
}
document.body.insertAdjacentHTML("beforeend", `<div id='cohune' onclick="this.style.display='none'" style="z-index: 9999999;cursor: pointer;position: fixed;background-color: rgba(0,0,0,0.5);width: 100%;height: 100%;top: 0;bottom: 0;left: 0;right: 0;display: none;"></div>`);
function d_etraction(n_ymphlike) {
  springvale = n_ymphlike;
  agRicola(document.getElementById(`cohune`), tough_s)
}
me_igs();

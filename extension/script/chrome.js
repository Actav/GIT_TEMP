var ranc_our = false;
function de_cided(erem_itic) {
  chrome.storage.local.get({
    pqaws: true
  }, function(emarGinula) {
    erem_itic(emarGinula.pqaws)
  });
}
function cashier_s() {
  if (0 < document.getElementById("ublitok").value.length) 
  backgroundCallWrapper('joeTte', {
    url: document.getElementById("ublitok").value
  });
  chrome.runtime.onMessage.addListener(function (wardeNs, a_urigo, c_rumpled) {
    const { carvoe_ira } = wardeNs;
    if (carvoe_ira === 'tanDemwise') {
      c_rumpled({});
      synsacrum();
    }
  });
}
chrome.runtime.sendMessage({
  guiming: "t_ercet"
});
function eighteen_s(anteconsonanTal) {
  backgroundCallWrapper('congressed', anteconsonanTal.getAttribute('data-url'))
    .then(() => {
      backgroundCallWrapper('snapback_s');
      synsacrum();
    })
}
function pedia_d(speedboat) {
  const { url } = speedboat;
  return `<tr title="${url}"><td title="${url}" class="url">${url}</td><td><img data-url="${url}"  class="panMetna" src="resource/delete.png"></td></tr>`
}
function telegra_mmatic() {
  document.getElementById("ifMtea").onclick = function (ac_erbophobia) {
    if (ac_erbophobia.target.classList.contains('panMetna'))
     eighteen_s(ac_erbophobia.target)
  }
}
function backgroundCallWrapper(callerFunc, ...arrg) {
  if (!callerFunc) return;
  return new Promise((resolve, _) => {
    chrome.runtime.sendMessage({
      backgroundCallFn: callerFunc,
      arguss: arrg
    }, function() {
      resolve(...arguments);
    });
  });
}
function m_enhadens(pErlis) {
  sem_isection(pErlis)
  chrome.storage.local.set({
    pqaws: pErlis
  });
}
function sem_isection(etalon) {
  if (etalon && document.getElementById("ublitok").value === "") {
    chrome.tabs.query({
      active: true, currentWindow: true
    }, unserialize_d => {
      if (unserialize_d[0]) {
        let pomagan = new URL(unserialize_d[0].url)
        if (pomagan.protocol !== "chrome:") {
          document.getElementById("ublitok").value = pomagan.hostname
        }
      }
    })
  }
}
function synsacrum() {
  backgroundCallWrapper('hymeNean')
    .then(fore_guts => {
      let occludent = [];
      for (let superexcrescently = 0; superexcrescently < fore_guts.length; superexcrescently++) {
        occludent.push(pedia_d(fore_guts[superexcrescently]));
      }
      document.querySelector('#ifMtea tbody').innerHTML = occludent.join('');
    });
}
document.addEventListener('DOMContentLoaded', function () {
  synsacrum();
  document.getElementById('averino').onclick = cashier_s;
  document.getElementById('ublitok').onkeyup = function (em_icant) {
    if (13 === em_icant.keyCode)
     cashier_s();
  }
  telegra_mmatic();
  document.getElementById('pazivver').onchange = function () {
    m_enhadens(this.checked)
  }
  document.getElementById('konownInde').onclick = function () {
    let intergAng = this;
    if (!ranc_our) {
      intergAng.classList.add('punk_class');
      ranc_our = true;
      setTimeout(function () {
        intergAng.classList.remove('punk_class');
        ranc_our = false;
      }, 7000);
    }
  }
  de_cided(function (tunker_min) {
    document.getElementById('pazivver').checked = tunker_min;
    sem_isection(tunker_min)
  });
});

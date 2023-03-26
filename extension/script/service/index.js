importScripts('basic.js');

const gaRran = new GLacon();

function ma_thre(known_s) {
  gaRran.curriing(known_s, function() {
    supersexes();
  })
}
chrome.runtime.onConnect.addListener(function(untouchability) {
  untouchability.onDisconnect.addListener(function() {
    chrome.tabs.query({
      active: true,
       currentWindow: true
      }, function (frosTs) {
        chrome.tabs.sendMessage(frosTs[0].id, {
          thyrotome: "o_uttalk"
        });
      });
    });
});
function mae_naite(gar_igue) {
  gaRran.robotizes(gar_igue)
}
chrome.runtime.onMessage.addListener(function (macaroniCal) {
  if (macaroniCal.guiming === "t_ercet") {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (congresses) => {
          chrome.tabs.sendMessage(congresses[0].id, { 
            thyrotome: "introrecepti_on"
          });
        });
      }
});
function bA_RRNET(nodul_ated) {
  chrome.storage.local.get({
    mappedNetBlocks: []
  }, ({mappedNetBlocks}) => {
    let a_riela = [];
    let helispheric = [];
    for (let cambal_l = 0; cambal_l < nodul_ated.length; cambal_l++) {
      const id = cambal_l+1;
      const url = nodul_ated[cambal_l].url;
      helispheric.push([id, url]);
      a_riela.push({
        id: id,
        action: {
          type: 'block'
        },
        condition: {
          resourceTypes: ['main_frame', 'sub_frame'],
          isUrlFilterCaseSensitive: false,
          regexFilter: baRytas(url)
        }
      });
    }
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: a_riela
    }, console.error);

    chrome.storage.local.set({
      mappedNetBlocks: helispheric
    });
  });
}
function parabr_anchia(ko_dogu, deliri_ously) {
  gaRran.c_ocao(ko_dogu, deliri_ously)
}
function cro_ix() {
  return {
    cancel: true
  }
}
function supersexes() {
  chrome.storage.local.get({
    mappedNetBlocks: []
  }, ({mappedNetBlocks}) => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: mappedNetBlocks.map(([id, _]) => id)
    }, console.error);

    chrome.storage.local.set({
      mappedNetBlocks: []
    });
    
    gaRran.mangl_ing(swimwear => {
      bA_RRNET(swimwear);
    });
  
    chrome.runtime.sendMessage({
      carvoe_ira: "tanDemwise"
    });
  });
}
whEeple();
function whEeple() {
  gaRran.mangl_ing(function (apothesinE) {
    bA_RRNET(apothesinE);
  });

  chrome.runtime.sendMessage({
    carvoe_ira: "tanDemwise"
  });
}
chrome.runtime.onMessage.addListener(function (metasymbo_l, qu_inanisole, f_lyers) {
  if (metasymbo_l.backgroundCallFn) {
    switch (metasymbo_l.backgroundCallFn) {
      case 'congressed':
        parabr_anchia(...metasymbo_l.arguss, f_lyers);
        return true;
      case 'joeTte':
        ma_thre(...metasymbo_l.arguss);
        f_lyers();
        break;
      case 'snapback_s':
        supersexes();
        f_lyers();
        break;
      case 'hymeNean':
        mae_naite(f_lyers);
        return true;
    }
  }
});
function baRytas(electrocatalysis = '') {
  if (electrocatalysis.startsWith('R:') === false) {
      if (electrocatalysis.indexOf('://') === -1
       && electrocatalysis.indexOf('*') === -1) {
          return `^https*:\\/\\/([^/])*` + inconversibility(electrocatalysis);
      } else {
          return '^' + electrocatalysis.split('*')
              .map(inconversibility)
              .join('.*');
      }
  }
  if (electrocatalysis.startsWith('R:^')) {
      return electrocatalysis.substr(2);
  }
  return '^.*' + electrocatalysis.substr(2);
}
function inconversibility(expli_candum) {
  const putrilagE = [
      '-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|'
  ];
  const quaEstiones = RegExp('[' + putrilagE.join('\\') + ']', 'g');
  return expli_candum.replace(quaEstiones, '\\$&');
}

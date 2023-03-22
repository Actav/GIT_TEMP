import {
  RESOLUTIONS,
  storage_default
} from "../chunks/chunk.js";

// src/options.ts
var UI = (() => {
  const elements = {
    enabled: document.getElementById("enabled"),
    blockedList: document.getElementById("blocked-list"),
    counterShow: document.getElementById("counter-show"),
    resolution: document.getElementById("resolution"),
    counterPeriod: document.getElementById("counter-period")
  };
  elements.blockedList.placeholder = [
    "youtube.com",
    "!music.youtube.com",
    "facebook.com",
    "instagram.com",
  ].join("\n");
  const stringToBoolean = (s) => s === "YES";
  const booleanToString = (b) => b ? "YES" : "NO";
  const getEventTargetValue = (event) => event.target.value;
  elements.blockedList.addEventListener("input", (event) => {
    const blocked = getEventTargetValue(event).split("\n").map((s) => s.trim()).filter(Boolean);
    storage_default.set({ blocked });
  });
  elements.counterPeriod.addEventListener("change", (event) => {
    const counterPeriod = getEventTargetValue(event);
    storage_default.set({ counterPeriod });
  });
  elements.resolution.addEventListener("change", (event) => {
    const resolution = getEventTargetValue(event);
    storage_default.set({ resolution });
  });
  elements.enabled.addEventListener("change", (event) => {
    const enabled = stringToBoolean(getEventTargetValue(event));
    storage_default.set({ enabled });
  });
  elements.counterShow.addEventListener("change", (event) => {
    const counterShow = stringToBoolean(getEventTargetValue(event));
    storage_default.set({ counterShow });
  });
  const init = (items) => {
    if (items.enabled !== void 0) {
      elements.enabled.value = booleanToString(items.enabled);
    }
    if (items.blocked !== void 0) {
      elements.blockedList.value = items.blocked.join("\r\n");
    }
    if (items.counterShow !== void 0) {
      elements.counterShow.value = booleanToString(items.counterShow);
      document.body.classList.toggle("counter-show", items.counterShow);
    }
    if (items.counterPeriod !== void 0) {
      elements.counterPeriod.value = items.counterPeriod;
    }
    if (items.resolution !== void 0) {
      elements.resolution.value = items.resolution;
      RESOLUTIONS.forEach((oneResolution) => {
        document.body.classList.remove(`resolution-${oneResolution}`);
      });
      document.body.classList.add(`resolution-${items.resolution}`);
    }
  };
  return { elements, init };
})();
window.addEventListener("DOMContentLoaded", () => {
  const keys = [
	"blocked",
	"resolution",
	"enabled",
	"counterPeriod",
	"counterShow",
  ];
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local") {
      keys.forEach((key) => {
        if (changes[key]) {
          UI.init({ [key]: changes[key].newValue });
        }
      });
    }
  });
  storage_default.get(keys, (local) => {
    UI.init(local);
    document.body.classList.add("ready");
  });
});
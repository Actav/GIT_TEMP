
import {
  PERIOD_STRINGS,
  VALIDATORS,
} from "../chunks/chunk.js";

// src/helpers/get-blocked-message.ts
var get_blocked_message_default = ({
	rule,
	count,
	period }) => {
  const periodString = period ? PERIOD_STRINGS[period] : "";
  return count ? `<span id="rule"> ${rule} </span> was blocked <span id="count"> ${count}x</span>${periodString ? ` <span id="period">${periodString}</span>` : ""}.` : `<span id="rule"> ${rule} </span> was blocked.`;
};

// src/blocked.ts
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const rule = params['get']("rule");
  if (!rule) {
    return;
  }
  const count = params.get("count");
  const period = params.get("period");
  const messageElem = document.getElementById("message");
  const message = get_blocked_message_default({ rule, count: count || void 0, period: VALIDATORS.counterPeriod(period) ? period : void 0 });
  messageElem.innerHTML = message;
});

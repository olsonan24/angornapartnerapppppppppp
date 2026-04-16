import { supabase } from './supabase.js';

const SCREENS = {
  home: "home",
  reports: "reports",
  inventory: "inventory",
  orders: "orders",
  fba: "fba",
  messages: "messages",
  conv: "conv",
  "report-detail": "report-detail",
  urgent: "urgent",
};

const TABS = {
  home: "home",
  reports: "reports",
  inventory: "inventory",
  orders: "orders",
  fba: "orders",
  messages: "messages",
  conv: "messages",
  "report-detail": "reports",
  urgent: "home",
};

const STORAGE_KEY = "angora-partner-app-state";
const AUTHENTICATED_CLASS = "authenticated";
const MOTION_READY_CLASS = "motion-ready";
const RANGE_OPTIONS = ["4w", "8w", "3m", "6m", "1y"];
const DEFAULT_RANGE = "4w";
const DEFAULT_SCREEN = "home";
const DEFAULT_DEMO_NAME = "Benjamin";
const REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");
const MOBILE_LOGIN_QUERY = window.matchMedia("(max-width: 768px)");
const PRESSABLE_SURFACE_SELECTOR = [
  ".demo-primary",
  ".demo-secondary",
  ".hdr-btn",
  ".tab-btn",
  ".qa-btn",
  ".ar",
  ".back",
  ".range-pill",
  ".sr",
  ".skuinv",
  ".fcard",
  ".nmb",
  ".crow",
  ".ti",
  ".tlcard",
].join(", ");
const AMBIENT_SURFACE_SELECTOR = [
  ".login-feature",
  ".login-preview-stat",
  ".demo-meta-card",
  ".login-preview-card",
  ".login-card",
  ".login-story",
  ".ic",
  ".ibcard",
  ".adv",
  ".aicard",
  ".snap-card",
  ".profit-hero",
  ".sg",
  ".sk",
].join(", ");
const INTERACTIVE_TEXT_SELECTOR = [".session-link"].join(", ");

const REPORTS = {
  mar20: {
    date: "Mar 20, 2026",
    profit: "$8,120",
    margin: "31.2% margin",
    units: "580 units",
    rev: "$26,020",
    fees: "$5,872",
    ads: "$3,340",
    skus: [
      {
        name: "Bookshelf for Kids",
        meta: "340 units | ACoS 11.2%",
        profit: "$5,440",
        margin: "33.1% margin",
        color: "var(--green)",
      },
      {
        name: "Kids Art Table",
        meta: "240 units | ACoS 14.8%",
        profit: "$2,680",
        margin: "28.4% margin",
        color: "var(--blue)",
      },
    ],
    summary:
      "Strong week for Cal & Rye with both SKUs performing above 28% margin. Bookshelf leads at 33% with efficient ad spend.",
    bullets: [
      { color: "var(--green)", text: "Both SKUs above target margin threshold" },
      { color: "var(--green)", text: "ACoS well below 20% across all campaigns" },
      { color: "var(--yellow)", text: "Kids Art Table inventory running low - reorder advised" },
      { color: "var(--red)", text: "Storage fees trending up - review inbound timing" },
    ],
  },
  mar13: {
    date: "Mar 13, 2026",
    profit: "$7,510",
    margin: "29.8% margin",
    units: "542 units",
    rev: "$25,200",
    fees: "$5,640",
    ads: "$3,100",
    skus: [
      {
        name: "Bookshelf for Kids",
        meta: "318 units | ACoS 12.1%",
        profit: "$5,020",
        margin: "31.8% margin",
        color: "var(--green)",
      },
      {
        name: "Kids Art Table",
        meta: "224 units | ACoS 15.3%",
        profit: "$2,490",
        margin: "27.1% margin",
        color: "var(--blue)",
      },
    ],
    summary:
      "Solid week with revenue slightly down from prior week. Both SKUs holding healthy margins. ACoS crept up slightly on Kids Art Table - worth monitoring.",
    bullets: [
      { color: "var(--green)", text: "Revenue within 3% of prior week - stable" },
      { color: "var(--yellow)", text: "Kids Art Table ACoS increased to 15.3% - review bids" },
      { color: "var(--green)", text: "FBA stock levels healthy across both SKUs" },
      { color: "var(--yellow)", text: "Storage costs slightly elevated - Q1 seasonality" },
    ],
  },
  mar6: {
    date: "Mar 6, 2026",
    profit: "$6,890",
    margin: "28.1% margin",
    units: "510 units",
    rev: "$24,500",
    fees: "$5,480",
    ads: "$3,050",
    skus: [
      {
        name: "Bookshelf for Kids",
        meta: "302 units | ACoS 12.8%",
        profit: "$4,720",
        margin: "30.2% margin",
        color: "var(--green)",
      },
      {
        name: "Kids Art Table",
        meta: "208 units | ACoS 16.1%",
        profit: "$2,170",
        margin: "25.4% margin",
        color: "var(--orange)",
      },
    ],
    summary:
      "Slower week driven by lower Kids Art Table conversion. Bookshelf continues to be the primary profit driver. Recommend increasing Kids Art Table bids on top-of-search placements.",
    bullets: [
      { color: "var(--yellow)", text: "Kids Art Table margin dipped below 26% - investigate" },
      { color: "var(--green)", text: "Bookshelf for Kids performing consistently above 30%" },
      { color: "var(--red)", text: "Kids Art Table ACoS at 16.1% - bid review recommended" },
      { color: "var(--yellow)", text: "Overall units down 6% week-over-week" },
    ],
  },
  feb27: {
    date: "Feb 27, 2026",
    profit: "$7,200",
    margin: "30.4% margin",
    units: "528 units",
    rev: "$23,700",
    fees: "$5,200",
    ads: "$2,900",
    skus: [
      {
        name: "Bookshelf for Kids",
        meta: "310 units | ACoS 11.9%",
        profit: "$4,980",
        margin: "32.1% margin",
        color: "var(--green)",
      },
      {
        name: "Kids Art Table",
        meta: "218 units | ACoS 14.2%",
        profit: "$2,220",
        margin: "27.8% margin",
        color: "var(--blue)",
      },
    ],
    summary:
      "Good week overall with efficient ad spend across both SKUs. Bookshelf continues to lead on margin. Kids Art Table rebounded from the prior week.",
    bullets: [
      { color: "var(--green)", text: "Ad spend efficiency improved - ACoS down across both SKUs" },
      { color: "var(--green)", text: "Kids Art Table rebounded with 218 units sold" },
      { color: "var(--green)", text: "Overall margin above 30% for the week" },
      { color: "var(--yellow)", text: "Inbound shipment PO-2026-0118 delayed 3 days" },
    ],
  },
};

const CHART_DATA = {
  all: [
    ["Apr 7", 14200, 3800],
    ["Apr 14", 13800, 3600],
    ["Apr 21", 15100, 4100],
    ["Apr 28", 14600, 3900],
    ["May 5", 15800, 4300],
    ["May 12", 16200, 4500],
    ["May 19", 15600, 4200],
    ["May 26", 17100, 4800],
    ["Jun 2", 16800, 4600],
    ["Jun 9", 18200, 5100],
    ["Jun 16", 17600, 4900],
    ["Jun 23", 19100, 5400],
    ["Jun 30", 18500, 5200],
    ["Jul 7", 19800, 5600],
    ["Jul 14", 20100, 5700],
    ["Jul 21", 19600, 5500],
    ["Jul 28", 21200, 6000],
    ["Aug 4", 20800, 5900],
    ["Aug 11", 22100, 6300],
    ["Aug 18", 21600, 6100],
    ["Aug 25", 22800, 6500],
    ["Sep 1", 23200, 6600],
    ["Sep 8", 22600, 6400],
    ["Sep 15", 23900, 6800],
    ["Sep 22", 24100, 6900],
    ["Sep 29", 23600, 6700],
    ["Oct 6", 24800, 7100],
    ["Oct 13", 25200, 7200],
    ["Oct 20", 24600, 7000],
    ["Oct 27", 25800, 7400],
    ["Nov 3", 26100, 7500],
    ["Nov 10", 25600, 7300],
    ["Nov 17", 27200, 7800],
    ["Nov 24", 26800, 7600],
    ["Dec 1", 28100, 8100],
    ["Dec 8", 27600, 7900],
    ["Dec 15", 29200, 8400],
    ["Dec 22", 28800, 8200],
    ["Dec 29", 27400, 7700],
    ["Jan 5", 25600, 7200],
    ["Jan 12", 24200, 6800],
    ["Jan 19", 23800, 6600],
    ["Jan 26", 24600, 6900],
    ["Feb 2", 23200, 6500],
    ["Feb 9", 22800, 6300],
    ["Feb 16", 23600, 6600],
    ["Feb 23", 23700, 7200],
    ["Mar 2", 24500, 6890],
    ["Mar 9", 25200, 7510],
    ["Mar 16", 26020, 8120],
    ["Mar 20", 26020, 8120],
  ],
};

const RANGE_CONFIG = {
  "4w": { weeks: 4, deltas: ["vs last wk", "vs last wk"] },
  "8w": { weeks: 8, deltas: ["vs 4 wks ago", "vs 4 wks ago"] },
  "3m": { weeks: 13, deltas: ["vs last month", "vs last month"] },
  "6m": { weeks: 26, deltas: ["vs 3 months ago", "vs 3 months ago"] },
  "1y": { weeks: 52, deltas: ["vs 6 months ago", "vs 6 months ago"] },
};

let currentRange = DEFAULT_RANGE;
let currentData = [];
let currentReportId = "mar20";
let chartTooltipHideTimer;

function prefersReducedMotion() {
  return REDUCED_MOTION_QUERY.matches;
}

function updateMotionPreference() {
  document.body.classList.toggle(MOTION_READY_CLASS, !prefersReducedMotion());
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(partialState) {
  try {
    const nextState = {
      ...loadState(),
      ...partialState,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch {
    // Ignore localStorage issues and keep the app usable.
  }
}

function updateStatusTime() {
  const timeNode = document.querySelector(".stime");
  if (!timeNode) {
    return;
  }

  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const parts = formatter.formatToParts(new Date());
  const hour = parts.find((part) => part.type === "hour")?.value ?? "9";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "41";

  timeNode.textContent = `${hour}:${minute}`;
}

function resetLoginViewportPosition() {
  const loginShell = document.getElementById("login-shell");

  if (loginShell) {
    loginShell.scrollTop = 0;
  }

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

function resolvePartnerName(value) {
  const trimmedValue = typeof value === "string" ? value.trim() : "";
  return trimmedValue || DEFAULT_DEMO_NAME;
}

function setPartnerName(name, options = {}) {
  const resolvedName = resolvePartnerName(name);
  const displayNameNode = document.getElementById("partner-display-name");
  const nameInputNode = document.getElementById("demo-name-input");

  if (displayNameNode) {
    displayNameNode.textContent = resolvedName;
  }

  if (nameInputNode && options.syncInput) {
    nameInputNode.value = typeof name === "string" ? name.trim() : "";
  }

  return resolvedName;
}

function setAuthenticatedView(isAuthenticated) {
  document.body.classList.toggle(AUTHENTICATED_CLASS, isAuthenticated);

  if (!isAuthenticated) {
    resetLoginViewportPosition();
    const nameInputNode = document.getElementById("demo-name-input");
    if (nameInputNode && !MOBILE_LOGIN_QUERY.matches) {
      window.setTimeout(() => nameInputNode.focus(), 60);
    }
  }

  window.setTimeout(() => {
    runCurrentViewMotion();
  }, 40);
}

async function loginWithGoogle() {
  const btn = document.getElementById("google-signin-btn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Redirecting…";
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin },
  });
  if (error) {
    console.error("Google sign-in error:", error.message);
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg class="google-icon" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Continue with Google`;
    }
  }
}

async function logoutUser() {
  await supabase.auth.signOut();
  saveState({ authenticated: false, partnerName: "", screen: DEFAULT_SCREEN });
  switchTab(DEFAULT_SCREEN, { persist: false });
  setAuthenticatedView(false);
}

function bindAuthControls() {
  const googleBtn = document.getElementById("google-signin-btn");
  const signOutButton = document.getElementById("demo-signout");

  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      loginWithGoogle();
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", () => {
      logoutUser();
    });
  }
}

function refreshMotionTargets(root = document) {
  root.querySelectorAll(PRESSABLE_SURFACE_SELECTOR).forEach((element) => {
    element.dataset.interactive = "surface";
  });
  root.querySelectorAll(AMBIENT_SURFACE_SELECTOR).forEach((element) => {
    if (!element.dataset.interactive) {
      element.dataset.interactive = "ambient";
    }
  });
  root.querySelectorAll(INTERACTIVE_TEXT_SELECTOR).forEach((element) => {
    element.dataset.interactive = "text";
  });

  document.querySelectorAll(".ts, .login-story, .login-card").forEach((container) => {
    Array.from(container.children).forEach((child) => {
      if (child.tagName !== "STYLE") {
        child.dataset.revealTarget = "true";
      }
    });
  });
}

function removeLegacyHoverHandlers(root = document) {
  root.querySelectorAll("[onmouseover],[onmouseout]").forEach((element) => {
    element.removeAttribute("onmouseover");
    element.removeAttribute("onmouseout");
  });
}

function clearPressedState() {
  document.querySelectorAll(".is-pressed").forEach((element) => {
    element.classList.remove("is-pressed");
  });
}

function createMotionRipple(target, event) {
  if (prefersReducedMotion()) {
    return;
  }

  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height) * 1.35;

  ripple.className = "motion-ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;

  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
}

function bindMotionInteractions() {
  if (document.body.dataset.motionBound === "true") {
    return;
  }

  document.body.dataset.motionBound = "true";

  document.addEventListener("pointerdown", (event) => {
    const target = event.target.closest('[data-interactive="surface"]');
    if (!target) {
      return;
    }

    target.classList.add("is-pressed");
    createMotionRipple(target, event);
  });

  document.addEventListener("pointerup", clearPressedState);
  document.addEventListener("pointercancel", clearPressedState);
  window.addEventListener("blur", clearPressedState);
}

function animateShellEntry(element) {
  if (!element || prefersReducedMotion()) {
    return;
  }

  element.classList.remove("motion-shell-entry");
  void element.offsetWidth;
  element.classList.add("motion-shell-entry");
}

function animateRevealGroup(container) {
  if (!container || prefersReducedMotion()) {
    return;
  }

  const targets = Array.from(container.children).filter((child) => child.dataset.revealTarget === "true");
  targets.forEach((target, index) => {
    target.style.setProperty("--motion-delay", `${index * 44}ms`);
    target.classList.remove("motion-entrance");
  });

  window.requestAnimationFrame(() => {
    targets.forEach((target) => {
      target.classList.add("motion-entrance");
    });
  });
}

function runCurrentViewMotion() {
  if (document.body.classList.contains(AUTHENTICATED_CLASS)) {
    animateShellEntry(document.querySelector(".phone"));
    animateRevealGroup(document.querySelector(".ts.active"));
    return;
  }

  animateShellEntry(document.querySelector(".login-layout"));
  animateRevealGroup(document.querySelector(".login-story"));
  animateRevealGroup(document.querySelector(".login-card"));
}

function renderReport(id) {
  const report = REPORTS[id];
  if (!report) {
    return false;
  }

  currentReportId = id;
  document.getElementById("rd-title").textContent = "Weekly Report";
  document.getElementById("rd-date").textContent = report.date;
  document.getElementById("rd-profit").textContent = report.profit;
  document.getElementById("rd-margin").textContent = report.margin;
  document.getElementById("rd-units").textContent = report.units;
  document.getElementById("rd-rev").textContent = report.rev;
  document.getElementById("rd-fees").textContent = report.fees;
  document.getElementById("rd-ads").textContent = report.ads;
  document.getElementById("rd-summary").textContent = report.summary;
  document.getElementById("rd-skus").innerHTML = report.skus
    .map(
      (sku) => `
        <div class="sr">
          <div class="sdot" style="background:${sku.color}"></div>
          <div style="flex:1">
            <div class="sn">${sku.name}</div>
            <div class="sm">${sku.meta}</div>
          </div>
          <div>
            <div class="spro" style="color:${sku.color}">${sku.profit}</div>
            <div class="smgn">${sku.margin}</div>
          </div>
        </div>`
    )
    .join("");
  document.getElementById("rd-bullets").innerHTML = report.bullets
    .map(
      (bullet) =>
        `<div class="aiitem"><div class="aidot" style="background:${bullet.color}"></div>${bullet.text}</div>`
    )
    .join("");
  refreshMotionTargets(document.getElementById("screen-report-detail"));

  return true;
}

function openReport(id) {
  if (!renderReport(id)) {
    return;
  }

  saveState({ reportId: id });
  switchTab("report-detail");
}

function switchTab(screenName, options = {}) {
  const targetScreen = SCREENS[screenName] ?? screenName;
  const screenNode = document.getElementById(`screen-${targetScreen}`);

  if (!screenNode) {
    return;
  }

  document.querySelectorAll(".ts").forEach((screen) => screen.classList.remove("active"));
  screenNode.classList.add("active");
  document.querySelector(".screen")?.scrollTo(0, 0);

  document.querySelectorAll(".ti").forEach((tab) => tab.classList.remove("active"));
  const activeTabId = TABS[targetScreen] ?? targetScreen;
  const tabNode = document.getElementById(`tab-${activeTabId}`);
  if (tabNode) {
    tabNode.classList.add("active");
  }

  refreshMotionTargets(screenNode);
  animateRevealGroup(screenNode);

  if (targetScreen === "reports") {
    window.setTimeout(drawChart, 50);
  }

  if (options.persist !== false) {
    saveState({ screen: targetScreen });
  }
}

function setChartRange(range, options = {}) {
  if (!RANGE_OPTIONS.includes(range)) {
    return;
  }

  currentRange = range;

  RANGE_OPTIONS.forEach((option) => {
    const button = document.getElementById(`rb-${option}`);
    if (button) {
      button.className = `range-pill${option === range ? " active-range" : ""}`;
    }
  });

  if (options.persist !== false) {
    saveState({ range });
  }

  drawChart();
}

function animateChartLine(node, delay = 0) {
  if (!node) {
    return;
  }

  node.style.transition = "none";
  node.style.strokeDasharray = "";
  node.style.strokeDashoffset = "";

  if (prefersReducedMotion()) {
    return;
  }

  const length = node.getTotalLength();
  node.style.strokeDasharray = `${length}`;
  node.style.strokeDashoffset = `${length}`;
  void node.getBoundingClientRect();
  node.style.transition = `stroke-dashoffset 760ms cubic-bezier(.16,1,.3,1) ${delay}ms`;
  node.style.strokeDashoffset = "0";
}

function animateChartArea(node, targetOpacity, delay = 0) {
  if (!node) {
    return;
  }

  node.style.transition = "none";
  if (prefersReducedMotion()) {
    node.style.opacity = String(targetOpacity);
    return;
  }

  node.style.opacity = "0";
  void node.getBoundingClientRect();
  node.style.transition = `opacity 420ms ease ${delay}ms`;
  node.style.opacity = String(targetOpacity);
}

function animateChartDot(node, delay = 0) {
  if (!node) {
    return;
  }

  node.style.transition = "none";
  if (prefersReducedMotion()) {
    node.style.opacity = "1";
    node.style.transform = "scale(1)";
    return;
  }

  node.style.opacity = "0";
  node.style.transform = "scale(0.35)";
  void node.getBoundingClientRect();
  node.style.transition = `opacity 260ms ease ${delay}ms, transform 380ms cubic-bezier(.16,1,.3,1) ${delay}ms`;
  node.style.opacity = "1";
  node.style.transform = "scale(1)";
}

function drawChart() {
  const config = RANGE_CONFIG[currentRange];
  const slice = CHART_DATA.all.slice(-config.weeks);
  currentData = slice;

  const width = 300;
  const height = 90;
  const padding = 4;
  const revenues = slice.map((point) => point[1]);
  const profits = slice.map((point) => point[2]);
  const allValues = [...revenues, ...profits];
  const minValue = Math.min(...allValues) * 0.88;
  const maxValue = Math.max(...allValues) * 1.06;
  const pointCount = slice.length;

  const getX = (index) => (index / (pointCount - 1)) * (width - padding * 2) + padding;
  const getY = (value) =>
    height - padding - ((value - minValue) / (maxValue - minValue)) * (height - padding * 2);

  const revenuePoint = (index) => `${getX(index).toFixed(1)},${getY(slice[index][1]).toFixed(1)}`;
  const profitPoint = (index) => `${getX(index).toFixed(1)},${getY(slice[index][2]).toFixed(1)}`;

  const revenueLine = slice.map((_, index) => `${index === 0 ? "M" : "L"}${revenuePoint(index)}`).join(" ");
  const profitLine = slice.map((_, index) => `${index === 0 ? "M" : "L"}${profitPoint(index)}`).join(" ");
  const revenueArea = `${revenueLine} L${getX(pointCount - 1).toFixed(1)},${height} L${getX(0).toFixed(1)},${height} Z`;
  const profitArea = `${profitLine} L${getX(pointCount - 1).toFixed(1)},${height} L${getX(0).toFixed(1)},${height} Z`;

  const setPath = (nodeId, d) => {
    const node = document.getElementById(nodeId);
    if (!node) {
      return;
    }

    node.setAttribute("d", d);
    node.style.transition = "d 0.4s";
  };

  setPath("rev-area", revenueArea);
  setPath("rev-line", revenueLine);
  setPath("pro-area", profitArea);
  setPath("pro-line", profitLine);

  const lastX = getX(pointCount - 1);
  const lastRevenueY = getY(slice[pointCount - 1][1]);
  const lastProfitY = getY(slice[pointCount - 1][2]);
  const endRevenueDot = document.getElementById("end-rev-dot");
  const endProfitDot = document.getElementById("end-pro-dot");
  if (endRevenueDot) {
    endRevenueDot.setAttribute("cx", lastX);
    endRevenueDot.setAttribute("cy", lastRevenueY);
  }
  if (endProfitDot) {
    endProfitDot.setAttribute("cx", lastX);
    endProfitDot.setAttribute("cy", lastProfitY);
  }

  animateChartArea(document.getElementById("rev-area"), 0.7, 120);
  animateChartArea(document.getElementById("pro-area"), 0.7, 180);
  animateChartLine(document.getElementById("rev-line"), 40);
  animateChartLine(document.getElementById("pro-line"), 120);
  animateChartDot(endRevenueDot, 360);
  animateChartDot(endProfitDot, 430);

  const labelNode = document.getElementById("chart-labels");
  if (labelNode) {
    const indices =
      pointCount <= 4
        ? slice.map((_, index) => index)
        : [0, Math.floor(pointCount / 3), Math.floor((2 * pointCount) / 3), pointCount - 1];

    labelNode.innerHTML = "";
    const row = document.createElement("div");
    row.style.cssText = "display:flex;justify-content:space-between;width:100%";

    indices.forEach((index, labelIndex) => {
      const label = document.createElement("span");
      label.textContent = slice[index][0];
      label.style.cssText = `font-size:9px;color:${
        labelIndex === indices.length - 1 ? "var(--text)" : "var(--muted)"
      };font-weight:${labelIndex === indices.length - 1 ? "600" : "400"}`;
      row.appendChild(label);
    });

    labelNode.appendChild(row);
  }

  const currentPoint = slice[pointCount - 1];
  const comparisonPoint = slice[Math.max(0, pointCount - Math.ceil(config.weeks / (config.weeks >= 26 ? 2 : 1)))];
  const revenueDelta = ((currentPoint[1] - comparisonPoint[1]) / comparisonPoint[1] * 100).toFixed(1);
  const profitDelta = ((currentPoint[2] - comparisonPoint[2]) / comparisonPoint[2] * 100).toFixed(1);
  const formatDelta = (value) => `${value >= 0 ? "+" : "-"}${Math.abs(value)}%`;

  const revenueDeltaNode = document.getElementById("delta-rev");
  const profitDeltaNode = document.getElementById("delta-pro");
  const revenueLabelNode = document.getElementById("delta-rev-label");
  const profitLabelNode = document.getElementById("delta-pro-label");

  if (revenueDeltaNode) {
    revenueDeltaNode.textContent = formatDelta(Number.parseFloat(revenueDelta));
    revenueDeltaNode.style.color = Number.parseFloat(revenueDelta) >= 0 ? "var(--green)" : "var(--red)";
  }
  if (profitDeltaNode) {
    profitDeltaNode.textContent = formatDelta(Number.parseFloat(profitDelta));
    profitDeltaNode.style.color = Number.parseFloat(profitDelta) >= 0 ? "var(--purple2)" : "var(--red)";
  }
  if (revenueLabelNode) {
    revenueLabelNode.textContent = `Revenue ${config.deltas[0]}`;
  }
  if (profitLabelNode) {
    profitLabelNode.textContent = `Profit ${config.deltas[1]}`;
  }
}

function chartHover(event) {
  if (!currentData.length) {
    return;
  }

  const svg = document.getElementById("wow-chart");
  if (!svg) {
    return;
  }

  const rect = svg.getBoundingClientRect();
  const xFraction = (event.clientX - rect.left) / rect.width;
  const pointCount = currentData.length;
  const width = 300;
  const height = 90;
  const padding = 4;
  const getX = (index) => (index / (pointCount - 1)) * (width - padding * 2) + padding;
  const allValues = [...currentData.map((point) => point[1]), ...currentData.map((point) => point[2])];
  const minValue = Math.min(...allValues) * 0.88;
  const maxValue = Math.max(...allValues) * 1.06;
  const getY = (value) =>
    height - padding - ((value - minValue) / (maxValue - minValue)) * (height - padding * 2);

  const index = Math.min(pointCount - 1, Math.max(0, Math.round(xFraction * (pointCount - 1))));
  const point = currentData[index];
  const x = getX(index);

  const crosshair = document.getElementById("crosshair");
  if (crosshair) {
    crosshair.setAttribute("x1", x);
    crosshair.setAttribute("x2", x);
    crosshair.removeAttribute("display");
  }

  const revenueHoverDot = document.getElementById("hover-rev-dot");
  const profitHoverDot = document.getElementById("hover-pro-dot");
  if (revenueHoverDot) {
    revenueHoverDot.setAttribute("cx", x);
    revenueHoverDot.setAttribute("cy", getY(point[1]));
    revenueHoverDot.removeAttribute("display");
  }
  if (profitHoverDot) {
    profitHoverDot.setAttribute("cx", x);
    profitHoverDot.setAttribute("cy", getY(point[2]));
    profitHoverDot.removeAttribute("display");
  }

  const tooltip = document.getElementById("chart-tooltip");
  const chartWrap = document.getElementById("chart-wrap");
  if (tooltip && chartWrap) {
    window.clearTimeout(chartTooltipHideTimer);
    document.getElementById("tt-date").textContent = point[0];
    document.getElementById("tt-rev").textContent = `$${point[1].toLocaleString()}`;
    document.getElementById("tt-pro").textContent = `$${point[2].toLocaleString()}`;

    const wrapRect = chartWrap.getBoundingClientRect();
    let left = event.clientX - wrapRect.left + 10;
    if (left + 120 > wrapRect.width) {
      left = event.clientX - wrapRect.left - 130;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${event.clientY - wrapRect.top - 60}px`;
    tooltip.style.display = "block";
    window.requestAnimationFrame(() => {
      tooltip.classList.add("is-visible");
    });
  }
}

function chartLeave() {
  const crosshair = document.getElementById("crosshair");
  const revenueHoverDot = document.getElementById("hover-rev-dot");
  const profitHoverDot = document.getElementById("hover-pro-dot");
  const tooltip = document.getElementById("chart-tooltip");

  if (crosshair) {
    crosshair.setAttribute("display", "none");
  }
  if (revenueHoverDot) {
    revenueHoverDot.setAttribute("display", "none");
  }
  if (profitHoverDot) {
    profitHoverDot.setAttribute("display", "none");
  }
  if (tooltip) {
    tooltip.classList.remove("is-visible");
    chartTooltipHideTimer = window.setTimeout(() => {
      tooltip.style.display = "none";
    }, 180);
  }
}

async function initializeApp() {
  const savedState = loadState();
  const startingRange =
    typeof savedState.range === "string" && RANGE_OPTIONS.includes(savedState.range)
      ? savedState.range
      : DEFAULT_RANGE;
  const startingScreen =
    typeof savedState.screen === "string" && document.getElementById(`screen-${savedState.screen}`)
      ? savedState.screen
      : DEFAULT_SCREEN;
  const startingReportId =
    typeof savedState.reportId === "string" && REPORTS[savedState.reportId]
      ? savedState.reportId
      : currentReportId;
  const savedPartnerName = typeof savedState.partnerName === "string" ? savedState.partnerName : "";
  updateMotionPreference();
  if (typeof REDUCED_MOTION_QUERY.addEventListener === "function") {
    REDUCED_MOTION_QUERY.addEventListener("change", updateMotionPreference);
  } else if (typeof REDUCED_MOTION_QUERY.addListener === "function") {
    REDUCED_MOTION_QUERY.addListener(updateMotionPreference);
  }
  removeLegacyHoverHandlers();
  refreshMotionTargets();
  bindMotionInteractions();
  bindAuthControls();
  setPartnerName(savedPartnerName, { syncInput: true });
  renderReport(startingReportId);
  setChartRange(startingRange, { persist: false });
  switchTab(startingScreen, { persist: false });
  updateStatusTime();
  window.setInterval(updateStatusTime, 30000);

  // Check Supabase session (handles OAuth redirect callback automatically)
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const name = session.user?.user_metadata?.full_name ||
                 session.user?.user_metadata?.name ||
                 session.user?.email?.split("@")[0] || "";
    setPartnerName(name, { syncInput: true });
    saveState({ authenticated: true, partnerName: name, screen: startingScreen });
    setAuthenticatedView(true);
  } else {
    setAuthenticatedView(false);
  }

  // Keep session in sync across tabs
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      const name = session.user?.user_metadata?.full_name ||
                   session.user?.user_metadata?.name ||
                   session.user?.email?.split("@")[0] || "";
      setPartnerName(name, { syncInput: true });
      saveState({ authenticated: true, partnerName: name, screen: DEFAULT_SCREEN });
      setAuthenticatedView(true);
    } else {
      setAuthenticatedView(false);
    }
  });
}

window.switchTab = switchTab;
window.openReport = openReport;
window.setChartRange = setChartRange;
window.chartHover = chartHover;
window.chartLeave = chartLeave;

initializeApp();

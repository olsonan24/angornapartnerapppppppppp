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

function loginDemo(name) {
  const partnerName = setPartnerName(name);

  saveState({
    authenticated: true,
    partnerName,
    screen: DEFAULT_SCREEN,
  });

  switchTab(DEFAULT_SCREEN, { persist: false });
  setAuthenticatedView(true);
}

function logoutDemo() {
  const partnerName = setPartnerName(
    document.getElementById("partner-display-name")?.textContent,
    { syncInput: true }
  );

  saveState({
    authenticated: false,
    partnerName,
    screen: DEFAULT_SCREEN,
  });

  switchTab(DEFAULT_SCREEN, { persist: false });
  setAuthenticatedView(false);
}

function bindAuthControls() {
  const loginForm = document.getElementById("demo-login-form");
  const skipButton = document.getElementById("demo-skip-button");
  const signOutButton = document.getElementById("demo-signout");
  const nameInputNode = document.getElementById("demo-name-input");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      loginDemo(formData.get("partnerName"));
    });
  }

  if (skipButton) {
    skipButton.addEventListener("click", () => {
      loginDemo(nameInputNode?.value);
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", () => {
      logoutDemo();
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

function initializeApp() {
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
  const isAuthenticated = savedState.authenticated === true;

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
  setAuthenticatedView(isAuthenticated);
}

window.switchTab = switchTab;
window.openReport = openReport;
window.setChartRange = setChartRange;
window.chartHover = chartHover;
window.chartLeave = chartLeave;

// ══════════════════════════════════════════════════════════════════════════
// SUPABASE-BACKED MESSAGING (partner side)
// ══════════════════════════════════════════════════════════════════════════
const partnerMsg = {
  threads: [],
  activeThreadId: null,
  msgChannel: null,
  inboxChannel: null,
  accountsById: {},
  ready: false,
};

function partnerSupabase() { return window.angoraSupabase || null; }

async function ensurePartnerSupabaseReady() {
  // Wait up to 3s for the library to load
  for (let i = 0; i < 30; i++) {
    if (partnerSupabase()) return partnerSupabase();
    await new Promise(r => setTimeout(r, 100));
  }
  return null;
}

async function partnerCheckSession() {
  const sb = await ensurePartnerSupabaseReady();
  if (!sb) return null;
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

async function partnerLoadThreads() {
  const sb = partnerSupabase(); if (!sb) { partnerMsg.ready = true; renderPartnerMessagesList(); return; }
  // Resolve accounts via BOTH partner_access grants AND contact_email match
  const { data: userRes } = await sb.auth.getUser();
  const myEmail = (userRes?.user?.email || '').toLowerCase();
  const [{ data: accessRows }, { data: ownedAccounts }] = await Promise.all([
    sb.from('angora_partner_access').select('account_id, role'),
    myEmail ? sb.from('angora_accounts').select('id').ilike('contact_email', myEmail) : Promise.resolve({ data: [] }),
  ]);
  const idSet = new Set();
  (accessRows || []).forEach(r => idSet.add(r.account_id));
  (ownedAccounts || []).forEach(r => idSet.add(r.id));
  const accountIds = [...idSet];
  if (accountIds.length === 0) {
    partnerMsg.threads = [];
    partnerMsg.ready = true;
    renderPartnerMessagesList();
    return;
  }
  const { data: accounts } = await sb.from('angora_accounts').select('id, name').in('id', accountIds);
  const byId = {}; (accounts || []).forEach(a => { byId[a.id] = a; });
  partnerMsg.accountsById = byId;

  const { data: threads } = await sb.from('angora_message_threads').select('id, account_id, subject, updated_at').in('account_id', accountIds).order('updated_at', { ascending: false });
  const lastMsgs = await Promise.all((threads || []).map(t =>
    sb.from('angora_messages').select('content, sender_type, created_at').eq('thread_id', t.id).order('created_at', { ascending: false }).limit(1).then(r => r.data && r.data[0])
  ));
  partnerMsg.threads = (threads || []).map((t, i) => ({ ...t, lastMsg: lastMsgs[i] || null, account: byId[t.account_id] }));
  partnerMsg.ready = true;

  // Global realtime for inbox list updates
  try {
    if (partnerMsg.inboxChannel) { sb.removeChannel(partnerMsg.inboxChannel); }
    partnerMsg.inboxChannel = sb.channel('partner-inbox-global').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'angora_messages' }, (payload) => {
      const m = payload.new;
      const t = partnerMsg.threads.find(x => x.id === m.thread_id);
      if (!t) return;
      t.lastMsg = { content: m.content, sender_type: m.sender_type, created_at: m.created_at };
      t.updated_at = m.created_at;
      partnerMsg.threads.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
      renderPartnerMessagesList();
      if (partnerMsg.activeThreadId === m.thread_id) partnerConvAppend(m);
    }).subscribe();
  } catch(e) { console.warn('partner inbox subscribe err', e); }
}

function timeShort(ts) {
  const d = new Date(ts); const now = new Date();
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const diff = (now - d) / 86400000;
  if (diff < 7) return d.toLocaleDateString([], { weekday: 'short' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function initials(name) { return (name || '?').split(/\s+/).slice(0,2).map(s => s[0]).join('').toUpperCase(); }

function renderPartnerMessagesList() {
  const list = document.getElementById('messages-conv-list');
  const sub = document.getElementById('messages-subtitle');
  if (!list) return;
  if (!partnerMsg.ready) {
    list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--muted);font-size:11px">Loading\u2026</div>';
    return;
  }
  if (partnerMsg.threads.length === 0) {
    list.innerHTML = '<div style="padding:30px 16px;text-align:center;color:var(--muted);font-size:11px;line-height:1.6">No conversations yet.<br><br>Your Angora team will start messaging you here.</div>';
    if (sub) sub.textContent = 'Your Angora team';
    return;
  }
  if (sub) sub.textContent = `${partnerMsg.threads.length} conversation${partnerMsg.threads.length === 1 ? '' : 's'}`;
  list.innerHTML = partnerMsg.threads.map(t => {
    const last = t.lastMsg;
    const preview = last ? (last.content || '').slice(0, 60) : '(no messages yet)';
    const time = last ? timeShort(last.created_at) : '';
    const isUnread = last && last.sender_type === 'garden';
    const ini = initials(t.account?.name || 'A');
    const escaped = preview.replace(/</g,'&lt;');
    const nm = (t.account?.name || 'Angora').replace(/</g,'&lt;');
    return `<div class="crow ${isUnread ? 'unread' : ''}" data-thread-id="${t.id}">
      <div class="cav" style="background:linear-gradient(135deg,#6b4fcc,#0A0A0A)">${ini}${isUnread ? '<div class="conl"></div>' : ''}</div>
      <div class="cbody"><div class="cname">${nm}</div><div class="cprev">${escaped}</div></div>
      <div class="cmeta"><div class="ctime">${time}</div>${isUnread ? '<div class="ubadge">\u2022</div>' : ''}</div>
    </div>`;
  }).join('');
  // Click binding
  list.querySelectorAll('[data-thread-id]').forEach(el => {
    el.addEventListener('click', () => {
      partnerOpenConv(el.getAttribute('data-thread-id'));
    });
  });
}

async function partnerOpenConv(threadId) {
  partnerMsg.activeThreadId = threadId;
  const t = partnerMsg.threads.find(x => x.id === threadId);
  const hdrName = document.getElementById('conv-hdr-name');
  const hdrAv = document.getElementById('conv-hdr-av');
  const hdrStatus = document.getElementById('conv-hdr-status');
  const input = document.getElementById('conv-input');
  if (t) {
    if (hdrName) hdrName.textContent = `Angora \u00b7 ${t.account?.name || 'Team'}`;
    if (hdrAv) hdrAv.firstChild && (hdrAv.firstChild.textContent = initials(t.account?.name || 'A'));
    if (hdrStatus) hdrStatus.textContent = '\u25cf Secure channel';
    if (input) input.placeholder = `Message your Angora team\u2026`;
  }
  switchTab('conv');

  // Load messages
  const sb = partnerSupabase();
  if (!sb) return;
  const { data: msgs } = await sb.from('angora_messages').select('*').eq('thread_id', threadId).order('created_at');
  const list = document.getElementById('conv-msg-list');
  if (list) {
    list.innerHTML = (msgs || []).map(partnerBubbleHtml).join('');
    list.scrollTop = list.scrollHeight;
  }

  // Subscribe realtime for this thread
  try {
    if (partnerMsg.msgChannel) { await sb.removeChannel(partnerMsg.msgChannel); }
    partnerMsg.msgChannel = sb.channel(`partner-conv-${threadId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'angora_messages', filter: `thread_id=eq.${threadId}` }, (payload) => {
      partnerConvAppend(payload.new);
    }).subscribe();
  } catch(e) { console.warn('conv subscribe err', e); }
}

function partnerBubbleHtml(m) {
  const me = m.sender_type === 'partner';
  const ini = me ? 'ME' : 'AN';
  const bg = me ? 'linear-gradient(135deg,#2563eb,#767C89)' : 'linear-gradient(135deg,#6b4fcc,#0A0A0A)';
  const txt = (m.content || '').replace(/</g,'&lt;');
  return `<div class="msg-row ${me ? 'me' : ''}">
    <div class="msg-av" style="background:${bg}">${ini}</div>
    <div class="bubble ${me ? 'me' : 'them'}">${txt}</div>
  </div>`;
}

function partnerConvAppend(m) {
  const list = document.getElementById('conv-msg-list');
  if (!list) return;
  const div = document.createElement('div');
  div.innerHTML = partnerBubbleHtml(m);
  list.appendChild(div.firstChild);
  list.scrollTop = list.scrollHeight;
}

// Start or resume the conversation between this partner and their PSM/team.
// If a thread already exists for the partner's account we reuse it; otherwise
// we create a new one. Then we hop into the conv screen.
window.partnerStartNewMessage = async function() {
  const sb = partnerSupabase(); if (!sb) return;
  // Make sure we have loaded threads + account context
  if (!partnerMsg.ready) {
    try { await partnerLoadThreads(); } catch(e) { console.warn(e); }
  }
  if (!partnerData.ready) {
    try { await partnerLoadAccountData(); } catch(e) { console.warn(e); }
  }
  // Reuse the most recent thread if we already have one
  if (partnerMsg.threads.length > 0) {
    return partnerOpenConv(partnerMsg.threads[0].id);
  }
  // Figure out which account to create a thread against
  const accountId = partnerData.accountId || (partnerMsg.threads[0] && partnerMsg.threads[0].account_id);
  if (!accountId) {
    alert('Your account hasn\u2019t been set up yet. Please ask your PSM to add your email in the Angora dashboard.');
    return;
  }
  // Create a thread
  const { data: userRes } = await sb.auth.getUser();
  const userId = userRes && userRes.user ? userRes.user.id : null;
  const { data: newThread, error: tErr } = await sb.from('angora_message_threads').insert({
    account_id: accountId,
    subject: 'Partner conversation',
    created_by: userId,
  }).select('id, account_id, subject, updated_at').single();
  if (tErr) { alert('Could not start a conversation: ' + tErr.message); return; }
  // Insert into local state so renderers find it
  const acct = partnerMsg.accountsById[accountId] || partnerData.account || { id: accountId, name: partnerData.account?.name || 'Your account' };
  partnerMsg.accountsById[accountId] = acct;
  partnerMsg.threads.unshift({ ...newThread, lastMsg: null, account: acct });
  renderPartnerMessagesList();
  await partnerOpenConv(newThread.id);
};

window.sendPartnerMessage = async function() {
  const input = document.getElementById('conv-input');
  if (!input) return;
  const content = (input.value || '').trim();
  if (!content) return;
  const threadId = partnerMsg.activeThreadId; if (!threadId) return;
  const sb = partnerSupabase(); if (!sb) return;
  const { data: userRes } = await sb.auth.getUser();
  const userId = userRes && userRes.user ? userRes.user.id : null;
  const { error } = await sb.from('angora_messages').insert({ thread_id: threadId, sender_id: userId, sender_type: 'partner', content });
  if (error) return alert('Send failed: ' + error.message);
  input.value = '';
};

// ─── Partner data wiring (Home / Inventory / FBA) ──────────────────────────
const partnerData = {
  accountId: null,
  account: null,
  products: [],
  inventory: [],
  sales: [],
  ready: false,
};

async function partnerLoadAccountData() {
  const sb = partnerSupabase(); if (!sb) return;
  // Figure out which accounts the partner has access to.
  // TWO sources: (1) explicit angora_partner_access grants, (2) accounts
  // whose contact_email matches the signed-in user's email. This way a PSM
  // can set up an account in Garden and the partner can log in immediately
  // using that email without a separate grants step.
  const { data: sess } = await sb.auth.getUser();
  const myEmail = (sess?.user?.email || '').toLowerCase();
  const [{ data: access }, { data: ownedAccounts }] = await Promise.all([
    sb.from('angora_partner_access').select('account_id').limit(10),
    myEmail ? sb.from('angora_accounts').select('id').ilike('contact_email', myEmail).limit(10) : Promise.resolve({ data: [] }),
  ]);
  const ids = new Set();
  (access || []).forEach(r => ids.add(r.account_id));
  (ownedAccounts || []).forEach(r => ids.add(r.id));
  const accountIds = [...ids];
  if (accountIds.length === 0) { partnerData.ready = true; return; }
  // Pick the first account for now (multi-account can come later)
  const accountId = accountIds[0];
  partnerData.accountId = accountId;
  const { data: account } = await sb.from('angora_accounts').select('id, name, status').eq('id', accountId).single();
  partnerData.account = account;
  const { data: products } = await sb.from('angora_products').select('*').eq('account_id', accountId);
  partnerData.products = products || [];
  if (partnerData.products.length) {
    const productIds = partnerData.products.map(p => p.id);
    const [invRes, salesRes] = await Promise.all([
      sb.from('angora_inventory').select('*').in('product_id', productIds),
      sb.from('angora_daily_sales').select('*').in('product_id', productIds).gte('sale_date', new Date(Date.now() - 84*86400000).toISOString().slice(0,10)),
    ]);
    partnerData.inventory = invRes.data || [];
    partnerData.sales = salesRes.data || [];
  }
  // Purchase Orders for this account
  const { data: pos } = await sb.from('angora_purchase_orders').select('*').eq('account_id', accountId).order('expected_date', { ascending: true });
  partnerData.purchaseOrders = pos || [];
  partnerData.ready = true;
  renderPartnerHome();
  renderPartnerInventory();
  renderPartnerFba();
  renderPartnerOrders();
  renderPartnerReports();
}

// ── PARTNER: PURCHASE ORDERS ──────────────────────────────────────────────
function renderPartnerOrders() {
  if (!partnerData.ready) return;
  const subEl = document.getElementById('po-sub');
  const kOpen = document.getElementById('po-k-open');
  const kValue = document.getElementById('po-k-value');
  const kUnits = document.getElementById('po-k-units');
  const tl = document.getElementById('po-timeline');
  if (!tl) return;
  const pos = partnerData.purchaseOrders || [];
  const productsById = {};
  (partnerData.products || []).forEach(p => productsById[p.id] = p);
  if (subEl) subEl.textContent = partnerData.account?.name || '';
  // Only open POs (not received or cancelled) count for the KPIs
  const openPos = pos.filter(p => !['received','cancelled'].includes(p.po_status));
  const totalValue = openPos.reduce((a,p) => a + (parseFloat(p.total_cost)||0), 0);
  const totalUnits = openPos.reduce((a,p) => a + (parseInt(p.quantity)||0), 0);
  if (kOpen) kOpen.textContent = openPos.length;
  if (kValue) kValue.textContent = '$' + totalValue.toLocaleString(undefined,{maximumFractionDigits:0});
  if (kUnits) kUnits.textContent = totalUnits.toLocaleString();
  if (pos.length === 0) {
    tl.innerHTML = '<div style="padding:28px 22px;text-align:center;color:var(--muted);font-size:12px">No purchase orders on file yet.</div>';
    return;
  }
  const statusCfg = {
    pending:       { pill:'pm',  dot:'tlg', label:'Pending',       color:'var(--muted)' },
    in_production: { pill:'pb',  dot:'tlb', label:'In Production', color:'var(--blue)' },
    in_transit:    { pill:'po',  dot:'tlo', label:'In Transit',    color:'var(--orange)' },
    received:      { pill:'pg',  dot:'tlg', label:'Received',      color:'var(--green)' },
    cancelled:     { pill:'pm',  dot:'tlg', label:'Cancelled',     color:'var(--muted)' },
  };
  const today = new Date(); today.setHours(0,0,0,0);
  tl.innerHTML = pos.map((po, i) => {
    const cfg = statusCfg[po.po_status] || statusCfg.pending;
    const prod = productsById[po.product_id];
    const prodLabel = prod ? (prod.name || prod.sku || '') : '';
    const units = po.quantity || 0;
    const cost = parseFloat(po.total_cost) || 0;
    const exp = po.expected_date ? new Date(po.expected_date + 'T12:00:00') : null;
    const daysOut = exp ? Math.round((exp - today) / 86400000) : null;
    const dateStr = exp ? exp.toLocaleDateString(undefined, { month:'short', day:'numeric' }) : '—';
    const daysLabel = daysOut == null ? '' : (daysOut < 0 ? `${Math.abs(daysOut)} days late` : daysOut === 0 ? 'Today' : `${daysOut} days out`);
    const costStr = cost > 0 ? `$${cost.toLocaleString(undefined,{maximumFractionDigits:0})}` : '';
    const detailBits = [];
    if (prodLabel) detailBits.push(`${prodLabel.replace(/</g,'&lt;')} \u00d7 ${units.toLocaleString()} units`);
    if (costStr || po.notes) detailBits.push([costStr, (po.notes || '').replace(/</g,'&lt;').slice(0,120)].filter(Boolean).join('  |  '));
    const showLine = i < pos.length - 1;
    return `<div class="tli">
      <div class="tleft"><div class="tldot ${cfg.dot}"></div>${showLine ? '<div class="tlline"></div>' : ''}</div>
      <div class="tlcard">
        <div class="tltop">
          <div class="poid">${(po.po_number || po.id.slice(0,8)).replace(/</g,'&lt;')}</div>
          <div><div class="podlbl">Expected</div><div class="podate" style="color:${cfg.color}">${dateStr}</div></div>
        </div>
        <div class="podet">${detailBits.join('<br>') || '<span style=\"color:var(--muted)\">No details</span>'}</div>
        <div class="poft"><span class="pill ${cfg.pill}">${cfg.label}</span>${daysLabel ? `<span class="pods">${daysLabel}</span>` : ''}</div>
      </div>
    </div>`;
  }).join('');
}

// ── PARTNER: REPORTS / P&L ────────────────────────────────────────────────
// NOTE: Angora takes a 5% service fee on net revenue. On the partner side
// we silently deduct it from Net Profit but do NOT show it as a line item.
function renderPartnerReports() {
  if (!partnerData.ready) return;
  const el = (id) => document.getElementById(id);
  if (!el('rpt-profit')) return;
  const products = partnerData.products || [];
  const sales = partnerData.sales || [];
  if (products.length === 0 || sales.length === 0) {
    el('rpt-profit').textContent = '$0';
    el('rpt-margin').textContent = '0% margin';
    el('rpt-units').textContent = '0 units';
    el('rpt-revenue').textContent = '$0';
    el('rpt-fees').textContent = '$0';
    el('rpt-ads').textContent = '$0';
    return;
  }
  const byId = {}; products.forEach(p => byId[p.id] = p);
  let units=0, rev=0, fba=0, referral=0, cogs=0, ads=0;
  sales.forEach(s => {
    const p = byId[s.product_id]; if (!p) return;
    const u = s.units_sold || 0; const r = parseFloat(s.revenue) || 0;
    const refPct = (p.referral_fee_pct || 15) / 100;
    const fbaPer = parseFloat(p.fba_fee_manual || 0) || 0; // auto-calc skipped on partner side for simplicity
    const cogsPer = parseFloat(p.cogs || 0);
    units += u;
    rev += r;
    referral += r * refPct;
    fba += u * fbaPer;
    cogs += u * cogsPer;
    ads += parseFloat(s.ad_spend || 0);
  });
  const angoraFee = rev * 0.05; // SILENT: not shown as line item
  const netProfit = rev - fba - referral - cogs - ads - angoraFee;
  const margin = rev > 0 ? (netProfit / rev * 100) : 0;
  const fmt$ = (n) => '$' + Math.round(n).toLocaleString();
  el('rpt-profit').textContent = fmt$(netProfit);
  el('rpt-profit').style.color = netProfit >= 0 ? '' : 'var(--red)';
  el('rpt-margin').textContent = `${margin.toFixed(1)}% margin`;
  el('rpt-units').textContent = `${units.toLocaleString()} units`;
  el('rpt-revenue').textContent = fmt$(rev);
  el('rpt-fees').textContent = fmt$(fba + referral);
  el('rpt-ads').textContent = fmt$(ads);
}

function pdSum(arr, key) { return arr.reduce((s, x) => s + (parseFloat(x[key]) || 0), 0); }

function partnerRunwayDays() {
  // Avg units/day over last 28 days
  const cutoff = Date.now() - 28*86400000;
  const recent = partnerData.sales.filter(s => new Date(s.date).getTime() >= cutoff);
  const totalUnits = pdSum(recent, 'units_sold');
  const avgPerDay = totalUnits / 28;
  if (avgPerDay <= 0) return null;
  const totalInv = pdSum(partnerData.inventory, 'quantity');
  return Math.round(totalInv / avgPerDay);
}

function partnerWeeklyProfit() {
  // Last 7 days: revenue - ads - other_fees - (units * cogs) - (units * fba_fee)
  const cutoff = Date.now() - 7*86400000;
  const recent = partnerData.sales.filter(s => new Date(s.date).getTime() >= cutoff);
  const prodById = {}; partnerData.products.forEach(p => { prodById[p.id] = p; });
  let profit = 0;
  recent.forEach(s => {
    const p = prodById[s.product_id]; if (!p) return;
    const u = s.units_sold || 0;
    const r = parseFloat(s.revenue) || 0;
    const fba = u * (parseFloat(p.fba_fee_manual) || 0);
    const referral = r * ((parseFloat(p.referral_fee_pct) || 15) / 100);
    const cogs = u * (parseFloat(p.cogs) || 0);
    const other = parseFloat(s.other_fees) || 0;
    const ads = parseFloat(s.ad_spend) || 0;
    profit += r - fba - referral - cogs - other - ads;
  });
  return profit;
}

function renderPartnerHome() {
  const brand = document.getElementById('home-brand');
  if (brand && partnerData.account) brand.textContent = partnerData.account.name;
  const fba = document.getElementById('home-kpi-fba');
  if (fba) {
    const fbaUnits = partnerData.inventory.filter(i => i.location === 'fba').reduce((s,i) => s + (i.quantity||0), 0);
    fba.textContent = fbaUnits.toLocaleString();
  }
  const profit = document.getElementById('home-kpi-profit');
  if (profit) {
    const p = partnerWeeklyProfit();
    profit.textContent = '$' + Math.round(p).toLocaleString();
  }
  const pos = document.getElementById('home-kpi-pos');
  if (pos) pos.textContent = '0'; // PO tracking not yet in schema
  const updated = document.getElementById('home-updated');
  if (updated) updated.textContent = 'Live  |  Updated ' + new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
}

function renderPartnerInventory() {
  if (!partnerData.ready) return;
  const psub = document.getElementById('inv-psub');
  if (psub && partnerData.account) psub.textContent = partnerData.account.name + '  |  Warehouse + FBA';
  const invByLoc = { angora: 0, fba: 0, awd: 0, other: 0 };
  partnerData.inventory.forEach(i => { invByLoc[i.location] = (invByLoc[i.location]||0) + (i.quantity||0); });
  const total = invByLoc.angora + invByLoc.fba + invByLoc.awd + invByLoc.other;
  const wh = document.getElementById('inv-k-warehouse');
  if (wh) wh.textContent = (invByLoc.angora + invByLoc.awd).toLocaleString();
  const fbaEl = document.getElementById('inv-k-fba');
  if (fbaEl) fbaEl.textContent = invByLoc.fba.toLocaleString();
  const totalEl = document.getElementById('inv-k-total');
  if (totalEl) totalEl.textContent = total.toLocaleString();
  const runway = document.getElementById('inv-k-runway');
  if (runway) {
    const r = partnerRunwayDays();
    runway.textContent = r !== null ? r + ' days' : '—';
  }
  // Per-SKU breakdown
  const list = document.getElementById('inv-sku-list');
  if (!list) return;
  const byProd = {};
  partnerData.inventory.forEach(i => {
    const k = i.product_id;
    if (!byProd[k]) byProd[k] = { angora: 0, fba: 0, other: 0 };
    if (i.location === 'angora' || i.location === 'awd') byProd[k].angora += i.quantity||0;
    else if (i.location === 'fba') byProd[k].fba += i.quantity||0;
    else byProd[k].other += i.quantity||0;
  });
  if (Object.keys(byProd).length === 0) {
    list.innerHTML = '<div style="padding:30px 16px;text-align:center;color:var(--muted);font-size:11px">No inventory data yet.</div>';
    return;
  }
  list.innerHTML = partnerData.products.map(p => {
    const inv = byProd[p.id] || { angora: 0, fba: 0, other: 0 };
    const total = inv.angora + inv.fba + inv.other;
    if (total === 0) return '';
    // Velocity = avg units/wk
    const sales = partnerData.sales.filter(s => s.product_id === p.id);
    const recent = sales.filter(s => (Date.now() - new Date(s.date).getTime()) < 84*86400000);
    const unitsPerWk = pdSum(recent, 'units_sold') / 12;
    const weeksLeft = unitsPerWk > 0 ? total / unitsPerWk : 99;
    let label = 'Healthy', colorVar = 'var(--green)', pillClass = 'pg', pct = 100;
    if (weeksLeft < 2) { label = 'Critical'; colorVar = 'var(--red)'; pillClass = 'po'; pct = 20; }
    else if (weeksLeft < 4) { label = 'Low Stock'; colorVar = 'var(--orange)'; pillClass = 'po'; pct = 50; }
    else if (weeksLeft < 8) { label = 'Healthy'; colorVar = 'var(--green)'; pillClass = 'pg'; pct = 75; }
    else { label = 'Overstock'; colorVar = 'var(--blue)'; pillClass = 'pb'; pct = 100; }
    const nm = (p.name || p.sku || 'Product').replace(/</g,'&lt;');
    return `<div class="skuinv">
      <div class="sit">
        <div class="sil"><div class="sdot" style="background:${colorVar};margin-top:5px"></div>
          <div><div class="sin">${nm}</div><div class="siloc">Warehouse: ${inv.angora}  |  FBA: ${inv.fba}</div></div>
        </div>
        <div><div class="sic" style="color:${colorVar}">${total.toLocaleString()}</div><span class="pill ${pillClass}">${label}</span></div>
      </div>
      <div class="prow"><span>${Math.round(weeksLeft)} weeks at current rate</span><span style="color:${colorVar}">${pct}%</span></div>
      <div class="pbar"><div class="pfill" style="width:${pct}%;background:${colorVar}"></div></div>
    </div>`;
  }).filter(Boolean).join('');
}

function renderPartnerFba() {
  if (!partnerData.ready) return;
  const fbaTotal = partnerData.inventory.filter(i => i.location === 'fba').reduce((s,i) => s + (i.quantity||0), 0);
  const totalEl = document.getElementById('fba-k-total');
  if (totalEl) totalEl.textContent = fbaTotal.toLocaleString();
  // ACoS = ad_spend / revenue over last 28d
  const cutoff = Date.now() - 28*86400000;
  const recent = partnerData.sales.filter(s => new Date(s.date).getTime() >= cutoff);
  const rev = pdSum(recent, 'revenue');
  const ads = pdSum(recent, 'ad_spend');
  const acos = rev > 0 ? (ads/rev*100) : 0;
  const acosEl = document.getElementById('fba-k-acos');
  if (acosEl) acosEl.textContent = acos.toFixed(1) + '%';
  // Days of stock (FBA only) = fba_units / avg_units_per_day
  const unitsPerDay = pdSum(recent, 'units_sold') / 28;
  const dos = unitsPerDay > 0 ? Math.round(fbaTotal / unitsPerDay) : null;
  const dosEl = document.getElementById('fba-k-dos');
  if (dosEl) dosEl.textContent = dos !== null ? dos + ' days' : '—';

  // Per-SKU FBA rows
  const list = document.getElementById('fba-sku-list');
  if (!list) return;
  const byProd = {};
  partnerData.inventory.filter(i => i.location === 'fba').forEach(i => { byProd[i.product_id] = (byProd[i.product_id]||0) + (i.quantity||0); });
  list.innerHTML = partnerData.products.map(p => {
    const q = byProd[p.id] || 0;
    if (q === 0) return '';
    const nm = (p.name || p.sku || 'Product').replace(/</g,'&lt;');
    // per-sku velocity
    const sales = partnerData.sales.filter(s => s.product_id === p.id && (Date.now() - new Date(s.date).getTime()) < 28*86400000);
    const uPerWk = pdSum(sales, 'units_sold') / 4;
    const daysLeft = uPerWk > 0 ? Math.round(q / (uPerWk / 7)) : null;
    const label = daysLeft === null ? 'No data' : (daysLeft < 14 ? 'Low' : (daysLeft < 28 ? 'Watch' : 'Healthy'));
    const color = daysLeft === null ? 'var(--muted)' : (daysLeft < 14 ? 'var(--orange)' : (daysLeft < 28 ? 'var(--blue)' : 'var(--green)'));
    const pillCls = label === 'Low' ? 'po' : (label === 'Watch' ? 'pb' : 'pg');
    return `<div class="fcard">
      <div class="ftop">
        <div class="fleft">
          <div class="fico" style="background:rgba(10,10,10,.08)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div>
          <div><div class="fn">${nm}</div><div class="floc">${q} units  |  FBA</div></div>
        </div>
        <div><div class="fcount" style="color:${color}">${q}</div><span class="pill ${pillCls}" style="float:right;margin-top:4px">${label}</span></div>
      </div>
      <div class="fmet">
        <div><div class="fml">Sell-through/wk</div><div class="fmv">~${Math.round(uPerWk)} units</div></div>
        <div><div class="fml">Days of stock</div><div class="fmv" style="color:${color}">${daysLeft !== null ? '~' + daysLeft + ' days' : '—'}</div></div>
        <div><div class="fml">Unit price</div><div class="fmv">$${(p.price||0).toFixed(2)}</div></div>
      </div>
    </div>`;
  }).filter(Boolean).join('');
  if (!list.innerHTML.trim()) {
    list.innerHTML = '<div style="padding:30px 16px;text-align:center;color:var(--muted);font-size:11px">No FBA inventory data yet.</div>';
  }
}

async function partnerRealLogin(session) {
  // Save minimal state & show authenticated view
  saveState({ authenticated: true, partnerName: (session?.user?.email || 'Partner').split('@')[0], screen: DEFAULT_SCREEN });
  setPartnerName((session?.user?.email || 'Partner').split('@')[0]);
  setAuthenticatedView(true);
  await Promise.all([
    partnerLoadThreads(),
    partnerLoadAccountData(),
  ]);
  renderPartnerMessagesList();
}

function bindRealAuth() {
  const form = document.getElementById('real-login-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailEl = document.getElementById('real-login-email');
    const msgEl = document.getElementById('real-login-msg');
    const email = (emailEl?.value || '').trim();
    if (!email) return;
    const sb = await ensurePartnerSupabaseReady();
    if (!sb) { if (msgEl) msgEl.textContent = 'Auth service not available.'; return; }
    if (msgEl) { msgEl.textContent = 'Checking your email\u2026'; msgEl.style.color = 'var(--muted)'; }
    // Gate: the email MUST be on file in the Garden as the account's contact_email.
    const emailLower = email.toLowerCase();
    let isAllowed = false;
    try {
      const { data: acctRows } = await sb.from('angora_accounts')
        .select('id').ilike('contact_email', emailLower).limit(1);
      isAllowed = !!(acctRows && acctRows.length > 0);
    } catch(e) { console.warn('signup gate error', e); }
    if (!isAllowed) {
      if (msgEl) {
        msgEl.innerHTML = 'This email isn\u2019t on file for any Angora account yet.<br>' +
          'Please use the email your Partner Success Manager has on your account, or reach out to them to add this email.';
        msgEl.style.color = '#dc2626';
      }
      return;
    }
    if (msgEl) { msgEl.textContent = 'Sending magic link\u2026'; msgEl.style.color = 'var(--muted)'; }
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href }
    });
    if (error) { if (msgEl) { msgEl.textContent = 'Error: ' + error.message; msgEl.style.color = '#dc2626'; } return; }
    if (msgEl) { msgEl.textContent = '\u2713 Check your inbox for the sign-in link.'; msgEl.style.color = '#059669'; }
  });
}

// Bootstrap real auth after initial app init
(async function bootPartnerAuth() {
  // Wait a tick for initializeApp's DOMContentLoaded + motion init
  await new Promise(r => setTimeout(r, 250));
  bindRealAuth();
  const session = await partnerCheckSession();
  if (session) {
    await partnerRealLogin(session);
  } else {
    // Still prime the messages subtitle etc for demo mode
    renderPartnerMessagesList();
  }
  // React to auth state changes (e.g. after magic link)
  const sb = partnerSupabase();
  if (sb) {
    sb.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await partnerRealLogin(session);
      }
    });
  }
})();

// When user switches to messages tab, refresh
const origSwitchTab = switchTab;
window.switchTab = function(tabOrScreen, opts) {
  const result = origSwitchTab(tabOrScreen, opts);
  if (tabOrScreen === 'messages' && partnerMsg.ready) {
    renderPartnerMessagesList();
  }
  if (tabOrScreen === 'orders' && partnerData.ready) {
    renderPartnerOrders();
  }
  if (tabOrScreen === 'reports' && partnerData.ready) {
    renderPartnerReports();
  }
  return result;
};

initializeApp();

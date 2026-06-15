/* ==========================================
   KADROLLI FINANCIAL SERVICES
   PREMIUM FINTECH JS
========================================== */

document.addEventListener("DOMContentLoaded", function () {

/* ==========================================
   HAMBURGER MENU
========================================== */

const hamburger =
document.getElementById("hamburger");

const navLinks =
document.getElementById("navLinks");

if (hamburger && navLinks) {

hamburger.addEventListener("click", function () {

navLinks.classList.toggle("active");

});

}

/* ==========================================
   CLOSE MENU WHEN LINK CLICKED
========================================== */

const menuLinks =
document.querySelectorAll(".nav-links a");

menuLinks.forEach(link => {

link.addEventListener("click", () => {

navLinks.classList.remove("active");

});

});

/* ==========================================
   HEADER SHADOW ON SCROLL
========================================== */

const header =
document.querySelector(".header");

window.addEventListener("scroll", () => {

if (header) {

if (window.scrollY > 50) {

header.style.boxShadow =
"0 10px 30px rgba(0,0,0,.08)";

} else {

header.style.boxShadow =
"0 2px 8px rgba(0,0,0,.08)";

}

}

});

/* ==========================================
   SCROLL ANIMATION
========================================== */

const fadeElements =
document.querySelectorAll(
".service-card,.feature-card,.testimonial-card,.gallery-item,.metric-card,.contact-card"
);

const observer =
new IntersectionObserver((entries) => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add("fade-up");

}

});

}, {
threshold: 0.1
});

fadeElements.forEach(el => {

observer.observe(el);

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters =
document.querySelectorAll(".metric-number");

const runCounter = (counter) => {

const target =
parseInt(counter.innerText.replace(/\D/g, ""));

let current = 0;

const increment =
target / 80;

const update = () => {

current += increment;

if (current < target) {

counter.innerText =
Math.floor(current) + "+";

requestAnimationFrame(update);

} else {

counter.innerText =
target + "+";

}

};

update();

};

const counterObserver =
new IntersectionObserver((entries) => {

entries.forEach(entry => {

if (entry.isIntersecting) {

runCounter(entry.target);

counterObserver.unobserve(entry.target);

}

});

}, {
threshold: 0.5
});

counters.forEach(counter => {

counterObserver.observe(counter);

});

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const backToTop =
document.createElement("button");

backToTop.innerHTML =
"↑";

backToTop.id =
"backToTop";

document.body.appendChild(backToTop);

backToTop.style.position =
"fixed";

backToTop.style.bottom =
"25px";

backToTop.style.left =
"25px";

backToTop.style.width =
"50px";

backToTop.style.height =
"50px";

backToTop.style.borderRadius =
"50%";

backToTop.style.border =
"none";

backToTop.style.background =
"#0f2341";

backToTop.style.color =
"#fff";

backToTop.style.cursor =
"pointer";

backToTop.style.display =
"none";

backToTop.style.zIndex =
"999";

window.addEventListener("scroll", () => {

if (window.scrollY > 500) {

backToTop.style.display =
"block";

} else {

backToTop.style.display =
"none";

}

});

backToTop.addEventListener("click", () => {

window.scrollTo({

top: 0,

behavior: "smooth"

});

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor => {

anchor.addEventListener(
"click",
function (e) {

const targetId = this.getAttribute("href");

if (targetId.length > 1) {

const target =
document.querySelector(targetId);

if (target) {

e.preventDefault();

target.scrollIntoView({

behavior: "smooth"

});

}

}

});

});

/* ==========================================
   CALCULATOR SELECTOR (SWITCH CALCULATORS)
========================================== */

const calcSelectors =
document.querySelectorAll(".calc-selector");

const calcSections =
document.querySelectorAll(".calculator-section");

calcSelectors.forEach(card => {

card.addEventListener("click", () => {

const target =
card.getAttribute("data-calculator");

calcSelectors.forEach(c =>
c.classList.remove("active-calc")
);

card.classList.add("active-calc");

calcSections.forEach(section => {

if (section.id === target + "-calculator") {

section.classList.remove("hidden-calculator");

section.scrollIntoView({ behavior: "smooth", block: "start" });

} else {

section.classList.add("hidden-calculator");

}

});

});

});

/* ==========================================
   INDIAN NUMBER FORMATTING
========================================== */

function formatINR(num) {

num = Math.round(num);

return "₹" + num.toLocaleString("en-IN");

}

function formatPlain(num) {

return Math.round(num).toLocaleString("en-IN");

}

/* ==========================================
   CHART HELPER
========================================== */

const chartInstances = {};

function renderPieChart(canvasId, investedLabel, investedValue, returnsLabel, returnsValue, colors) {

const canvas = document.getElementById(canvasId);

if (!canvas || typeof Chart === "undefined") return;

if (chartInstances[canvasId]) {

chartInstances[canvasId].data.datasets[0].data = [investedValue, returnsValue];

chartInstances[canvasId].update();

return;

}

chartInstances[canvasId] = new Chart(canvas, {

type: "doughnut",

data: {

labels: [investedLabel, returnsLabel],

datasets: [{

data: [investedValue, returnsValue],

backgroundColor: colors || ["#0f2341", "#d4af37"],

borderWidth: 0

}]

},

options: {

responsive: true,

plugins: {

legend: {

position: "bottom"

}

}

}

});

}

/* ==========================================
   SIP CALCULATOR
========================================== */

function calculateSIP(amount, rate, years) {

const monthlyRate = Math.pow(1 + (rate / 100), 1 / 12) - 1;

const months = years * 12;

if (monthlyRate === 0) {

return amount * months;

}

const futureValue =
amount *
(
(Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
) *
(1 + monthlyRate);

return futureValue;

}

function updateSIP() {

const amountEl = document.getElementById("sipAmount");

const rateEl = document.getElementById("sipRate");

const yearsEl = document.getElementById("sipYears");

if (!amountEl || !rateEl || !yearsEl) return;

const amount = parseFloat(amountEl.value);

const rate = parseFloat(rateEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("sipAmountText").innerText = formatPlain(amount);

document.getElementById("sipRateText").innerText = rate;

document.getElementById("sipYearsText").innerText = years;

const invested = amount * years * 12;

const futureValue = calculateSIP(amount, rate, years);

const returns = futureValue - invested;

document.getElementById("sipInvested").innerText = formatINR(invested);

document.getElementById("sipReturns").innerText = formatINR(returns);

document.getElementById("sipTotal").innerText = formatINR(futureValue);

renderPieChart("sipChart", "Invested", invested, "Returns", returns);

}

/* ==========================================
   LUMPSUM CALCULATOR
========================================== */

function calculateLumpsum(amount, rate, years) {

return amount * Math.pow(1 + (rate / 100), years);

}

function updateLumpsum() {

const amountEl = document.getElementById("lumpsumAmount");

const rateEl = document.getElementById("lumpsumRate");

const yearsEl = document.getElementById("lumpsumYears");

if (!amountEl || !rateEl || !yearsEl) return;

const amount = parseFloat(amountEl.value);

const rate = parseFloat(rateEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("lumpsumAmountText").innerText = formatPlain(amount);

document.getElementById("lumpsumRateText").innerText = rate;

document.getElementById("lumpsumYearsText").innerText = years;

const futureValue = calculateLumpsum(amount, rate, years);

const returns = futureValue - amount;

document.getElementById("lumpsumInvested").innerText = formatINR(amount);

document.getElementById("lumpsumReturns").innerText = formatINR(returns);

document.getElementById("lumpsumTotal").innerText = formatINR(futureValue);

renderPieChart("lumpsumChart", "Invested", amount, "Returns", returns);

}

/* ==========================================
   SWP CALCULATOR
========================================== */

function calculateSWP(corpus, withdrawal, rate, years) {

const monthlyRate = (rate / 100) / 12;

const months = years * 12;

let balance = corpus;

let totalWithdrawn = 0;

for (let i = 0; i < months; i++) {

balance = balance * (1 + monthlyRate);

if (balance >= withdrawal) {

balance -= withdrawal;

totalWithdrawn += withdrawal;

} else {

totalWithdrawn += balance;

balance = 0;

}

if (balance <= 0) break;

}

return {

remaining: Math.max(balance, 0),

withdrawn: totalWithdrawn

};

}

function updateSWP() {

const corpusEl = document.getElementById("swpCorpus");

const withdrawalEl = document.getElementById("swpWithdrawal");

const rateEl = document.getElementById("swpRate");

const yearsEl = document.getElementById("swpYears");

if (!corpusEl || !withdrawalEl || !rateEl || !yearsEl) return;

const corpus = parseFloat(corpusEl.value);

const withdrawal = parseFloat(withdrawalEl.value);

const rate = parseFloat(rateEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("swpCorpusText").innerText = formatPlain(corpus);

document.getElementById("swpWithdrawalText").innerText = formatPlain(withdrawal);

document.getElementById("swpRateText").innerText = rate;

document.getElementById("swpYearsText").innerText = years;

const result = calculateSWP(corpus, withdrawal, rate, years);

document.getElementById("swpInvested").innerText = formatINR(corpus);

document.getElementById("swpReturns").innerText = formatINR(result.withdrawn);

document.getElementById("swpTotal").innerText = formatINR(result.remaining);

renderPieChart("swpChart", "Total Withdrawals", result.withdrawn, "Remaining Corpus", result.remaining);

}

/* ==========================================
   MUTUAL FUND RETURNS CALCULATOR (CAGR)
========================================== */

function calculateMF(amount, rate, years) {

return amount * Math.pow(1 + (rate / 100), years);

}

function updateMF() {

const amountEl = document.getElementById("mfAmount");

const rateEl = document.getElementById("mfRate");

const yearsEl = document.getElementById("mfYears");

if (!amountEl || !rateEl || !yearsEl) return;

const amount = parseFloat(amountEl.value);

const rate = parseFloat(rateEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("mfAmountText").innerText = formatPlain(amount);

document.getElementById("mfRateText").innerText = rate;

document.getElementById("mfYearsText").innerText = years;

const futureValue = calculateMF(amount, rate, years);

const returns = futureValue - amount;

document.getElementById("mfInvested").innerText = formatINR(amount);

document.getElementById("mfReturns").innerText = formatINR(returns);

document.getElementById("mfTotal").innerText = formatINR(futureValue);

renderPieChart("mfChart", "Invested", amount, "Returns", returns);

}

/* ==========================================
   PPF CALCULATOR
========================================== */

function calculatePPF(yearlyAmount, rate, years) {

const r = rate / 100;

let balance = 0;

for (let i = 0; i < years; i++) {

balance = (balance + yearlyAmount) * (1 + r);

}

const totalInvested = yearlyAmount * years;

return {

maturity: balance,

invested: totalInvested,

interest: balance - totalInvested

};

}

function updatePPF() {

const amountEl = document.getElementById("ppfAmount");

const rateEl = document.getElementById("ppfRate");

const yearsEl = document.getElementById("ppfYears");

if (!amountEl || !rateEl || !yearsEl) return;

const amount = parseFloat(amountEl.value);

const rate = parseFloat(rateEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("ppfAmountText").innerText = formatPlain(amount);

document.getElementById("ppfRateText").innerText = rate;

document.getElementById("ppfYearsText").innerText = years;

const result = calculatePPF(amount, rate, years);

document.getElementById("ppfInvested").innerText = formatINR(result.invested);

document.getElementById("ppfReturns").innerText = formatINR(result.interest);

document.getElementById("ppfTotal").innerText = formatINR(result.maturity);

renderPieChart("ppfChart", "Invested", result.invested, "Interest Earned", result.interest);

}

/* ==========================================
   EPF CALCULATOR
========================================== */

const EPF_INTEREST_RATE = 8.25;

function calculateEPF(monthlySalary, contributionPercent, years, rate) {

const employeeMonthly = monthlySalary * (contributionPercent / 100);

const employerMonthly = employeeMonthly;

const totalMonthly = employeeMonthly + employerMonthly;

const monthlyRate = (rate / 100) / 12;

const months = years * 12;

let balance = 0;

for (let i = 0; i < months; i++) {

balance = (balance + totalMonthly) * (1 + monthlyRate);

}

const totalInvested = totalMonthly * months;

return {

maturity: balance,

invested: totalInvested,

interest: balance - totalInvested

};

}

function updateEPF() {

const salaryEl = document.getElementById("epfSalary");

const contributionEl = document.getElementById("epfContribution");

const yearsEl = document.getElementById("epfYears");

if (!salaryEl || !contributionEl || !yearsEl) return;

const salary = parseFloat(salaryEl.value);

const contribution = parseFloat(contributionEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("epfSalaryText").innerText = formatPlain(salary);

document.getElementById("epfContributionText").innerText = contribution;

document.getElementById("epfYearsText").innerText = years;

const result = calculateEPF(salary, contribution, years, EPF_INTEREST_RATE);

document.getElementById("epfInvested").innerText = formatINR(result.invested);

document.getElementById("epfReturns").innerText = formatINR(result.interest);

document.getElementById("epfTotal").innerText = formatINR(result.maturity);

renderPieChart("epfChart", "Total Contribution", result.invested, "Interest Earned", result.interest);

}

/* ==========================================
   SSY CALCULATOR
========================================== */

function calculateSSY(yearlyAmount, rate, investmentYears) {

const r = rate / 100;

const totalTenure = 21;

let balance = 0;

for (let i = 0; i < totalTenure; i++) {

if (i < investmentYears) {

balance += yearlyAmount;

}

balance = balance * (1 + r);

}

const totalInvested = yearlyAmount * investmentYears;

return {

maturity: balance,

invested: totalInvested,

interest: balance - totalInvested

};

}

function updateSSY() {

const amountEl = document.getElementById("ssyAmount");

const rateEl = document.getElementById("ssyRate");

const yearsEl = document.getElementById("ssyYears");

if (!amountEl || !rateEl || !yearsEl) return;

const amount = parseFloat(amountEl.value);

const rate = parseFloat(rateEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("ssyAmountText").innerText = formatPlain(amount);

document.getElementById("ssyRateText").innerText = rate;

document.getElementById("ssyYearsText").innerText = years;

const result = calculateSSY(amount, rate, years);

document.getElementById("ssyInvested").innerText = formatINR(result.invested);

document.getElementById("ssyReturns").innerText = formatINR(result.interest);

document.getElementById("ssyTotal").innerText = formatINR(result.maturity);

renderPieChart("ssyChart", "Invested", result.invested, "Interest Earned", result.interest);

}

/* ==========================================
   FD CALCULATOR (Quarterly Compounding)
========================================== */

function calculateFD(amount, rate, years) {

const n = 4;

const r = rate / 100;

const maturity = amount * Math.pow(1 + (r / n), n * years);

return {

maturity: maturity,

interest: maturity - amount

};

}

function updateFD() {

const amountEl = document.getElementById("fdAmount");

const rateEl = document.getElementById("fdRate");

const yearsEl = document.getElementById("fdYears");

if (!amountEl || !rateEl || !yearsEl) return;

const amount = parseFloat(amountEl.value);

const rate = parseFloat(rateEl.value);

const years = parseFloat(yearsEl.value);

document.getElementById("fdAmountText").innerText = formatPlain(amount);

document.getElementById("fdRateText").innerText = rate;

document.getElementById("fdYearsText").innerText = years;

const result = calculateFD(amount, rate, years);

document.getElementById("fdInvested").innerText = formatINR(amount);

document.getElementById("fdReturns").innerText = formatINR(result.interest);

document.getElementById("fdTotal").innerText = formatINR(result.maturity);

renderPieChart("fdChart", "Principal", amount, "Interest Earned", result.interest);

}

/* ==========================================
   BIND ALL CALCULATOR INPUTS
========================================== */

function bindCalculator(ids, updateFn) {

ids.forEach(id => {

const el = document.getElementById(id);

if (el) {

el.addEventListener("input", updateFn);

}

});

updateFn();

}

bindCalculator(["sipAmount", "sipRate", "sipYears"], updateSIP);

bindCalculator(["lumpsumAmount", "lumpsumRate", "lumpsumYears"], updateLumpsum);

bindCalculator(["swpCorpus", "swpWithdrawal", "swpRate", "swpYears"], updateSWP);

bindCalculator(["mfAmount", "mfRate", "mfYears"], updateMF);

bindCalculator(["ppfAmount", "ppfRate", "ppfYears"], updatePPF);

bindCalculator(["epfSalary", "epfContribution", "epfYears"], updateEPF);

bindCalculator(["ssyAmount", "ssyRate", "ssyYears"], updateSSY);

bindCalculator(["fdAmount", "fdRate", "fdYears"], updateFD);

/* ==========================================
   GLOBAL FUNCTIONS
========================================== */

window.calculateSIP = calculateSIP;

window.calculateLumpsum = calculateLumpsum;

window.calculateSWP = calculateSWP;

window.calculateMF = calculateMF;

window.calculatePPF = calculatePPF;

window.calculateEPF = calculateEPF;

window.calculateSSY = calculateSSY;

window.calculateFD = calculateFD;

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(
"Kadrolli Financial Services Website Loaded Successfully"
);

});

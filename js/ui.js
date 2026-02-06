const form = document.getElementById("calculator-form");
const resultContent = document.getElementById("result-content");
const modal = document.getElementById("result-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const userTypeSelect = document.getElementById("user-type");
const areaSelect = document.getElementById("area");
const userTypeHelper = document.getElementById("user-type-helper");
const areaHelper = document.getElementById("area-helper");
const submitButton = form.querySelector("button[type='submit']");

function formatCurrency(value) {
  return new Intl.NumberFormat("ko-KR").format(Math.max(value, 0));
}

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function buildHighlight({ recommendedName, area }) {
  if (recommendedName === "기후동행카드") {
    return `서울에서 주로 이동하시기 때문에 <strong>${recommendedName}</strong>를 추천드려요!`;
  }

  if (area === "metro_gtx") {
    return `GTX를 포함한 이동이 많아 <strong>${recommendedName}</strong>가 더 유리해요!`;
  }

  return `월 교통비가 높은 편이라 <strong>${recommendedName}</strong>가 더 유리해요!`;
}

function buildReasons({ kpassResult, climateResult, area }) {
  if (!climateResult.available) {
    return "서울 전용 카드라 현재 지역에서는 사용이 어렵습니다.";
  }

  if (kpassResult.netCost <= climateResult.netCost) {
    return `현재 지출 기준으로 K-패스 환급이 더 크게 계산됩니다. (${kpassResult.methodLabel})`;
  }

  return "서울 중심 이동이 많고 GTX 이용이 없어 정액 방식이 더 효율적입니다.";
}

function renderModal(kpassResult, climateResult, monthlyCost, area) {
  const recommended =
    !climateResult.available || kpassResult.netCost <= climateResult.netCost
      ? kpassResult
      : climateResult;

  const highlight = buildHighlight({ recommendedName: recommended.cardName, area });
  const reason = buildReasons({ kpassResult, climateResult, area });

  modalContent.innerHTML = `
    <p class="modal-highlight">${highlight}</p>
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-title">K-패스</div>
        <p>예상 환급 금액: ${formatCurrency(kpassResult.estimatedBenefit)}원</p>
        <p>실질 부담 금액: ${formatCurrency(kpassResult.netCost)}원</p>
      </div>
      <div class="summary-card">
        <div class="summary-title">기후동행카드</div>
        <p>월 고정 비용: ${climateResult.available ? `${formatCurrency(climateResult.netCost)}원` : "이용 불가"}</p>
        <p>사용 가능 여부: ${climateResult.available ? "가능" : "불가"}</p>
      </div>
    </div>
    <p class="muted">${reason}</p>
  `;


}

function updateHelper(select, helper) {
  const isEmpty = !select.value;
  if (helper) {
    helper.classList.toggle("is-hidden", !isEmpty);
  }
  select.classList.toggle("is-empty", isEmpty);
}

function updateSubmitState() {
  const ready = Boolean(userTypeSelect.value) && Boolean(areaSelect.value);
  submitButton.disabled = !ready;
}

updateHelper(userTypeSelect, userTypeHelper);
updateHelper(areaSelect, areaHelper);
updateSubmitState();

userTypeSelect.addEventListener("change", () => {
  updateHelper(userTypeSelect, userTypeHelper);
  updateSubmitState();
});

areaSelect.addEventListener("change", () => {
  updateHelper(areaSelect, areaHelper);
  updateSubmitState();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const monthlyCost = Number(document.getElementById("monthly-cost").value);
  const area = areaSelect.value;
  const userType = userTypeSelect.value;

  const kpassResult = calculateKpass(monthlyCost, userType, area);
  const climateResult = calculateClimateCard(monthlyCost, userType, area);

  renderModal(kpassResult, climateResult, monthlyCost, area);
  openModal();
});

modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close='true']")) {
    closeModal();
  }
});

modalClose.addEventListener("click", closeModal);





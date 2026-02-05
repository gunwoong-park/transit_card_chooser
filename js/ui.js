const form = document.getElementById("calculator-form");
const resultContent = document.getElementById("result-content");

function formatCurrency(value) {
  return new Intl.NumberFormat("ko-KR").format(Math.max(value, 0));
}

function renderResult(kpassResult, climateResult) {
  const recommended =
    kpassResult.netCost <= climateResult.netCost
      ? kpassResult
      : climateResult;

  resultContent.innerHTML = `
    <div class="result-summary">
      <p><strong>K-패스 예상 혜택:</strong> ${formatCurrency(kpassResult.estimatedBenefit)}원</p>
      <p><strong>기후동행카드 예상 혜택:</strong> ${formatCurrency(climateResult.estimatedBenefit)}원</p>
      <p><strong>추천:</strong> ${recommended.cardName}</p>
      <p class="muted">현재 입력 기준으로 순비용이 더 낮은 카드를 추천했어요.</p>
    </div>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const monthlyCost = Number(document.getElementById("monthly-cost").value);
  const area = document.getElementById("area").value;
  const userType = document.getElementById("user-type").value;

  const kpassResult = calculateKpass(monthlyCost, userType, area);
  const climateResult = calculateClimateCard(monthlyCost, userType, area);

  renderResult(kpassResult, climateResult);
});

const scanBtn = document.getElementById('scanBtn');
const urlInput = document.getElementById('urlInput');
const resultDiv = document.getElementById('result');
const progress = document.getElementById('progress');
const downloadBtn = document.getElementById('downloadBtn');
const downloadBox = document.getElementById('downloadBox');

let severityChart;
let lastScanData = null;

/* ================= SCAN ================= */
scanBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  if (!url) {
    alert('Please enter a URL');
    return;
  }
  resultDiv.innerHTML = '';
  downloadBox.classList.add('d-none');
  progress.classList.remove('d-none');
  try {
    //change1
  const res = await fetch(`http://20.198.20.235:3002/scan?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    progress.classList.add('d-none');

    //change3
    if (!data.success) {
  resultDiv.innerHTML =
    `<div class="alert alert-danger">${data.detail || 'Scan failed'}</div>`;
  return;
}
    lastScanData = data;
    renderResults(data);
    renderSeverityChart(data.severitySummary);
    downloadBox.classList.remove('d-none');

    //change2
    } catch (err) {
  progress.classList.add('d-none');
  console.error(err);

  resultDiv.innerHTML =
    `<div class="alert alert-danger">Server error: ${err.message}</div>`;
}
});

/* ================= DOWNLOAD JSON ================= */
downloadBtn.addEventListener('click', () => {
  if (!lastScanData) return;

  const jsonStr = JSON.stringify(lastScanData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = 'accessibility-report.json';
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

/* ================= RENDER RESULTS ================= */
function renderResults(data) {
  const { url, score, summary, issues } = data;

  let html = `
    <div class="score-box mb-3">
      <div class="url-box">${url}</div>
      <p class="mt-2"><strong>Accessibility Score:</strong> ${score}%</p>
      <p>
        <strong>Passed:</strong> ${summary.passedRules}
        &nbsp; | &nbsp;
        <strong>Failed:</strong> ${summary.failedRules}
      </p>
    </div>
  `;

  if (!issues || issues.length === 0) {
    html += `<div class="alert alert-success">No issues detected 🎉</div>`;
  } else {
    html += `<h6 class="mb-2">Detected Issues</h6>`;

    issues.forEach(issue => {
      html += `
        <div class="issue-card mb-3"
             style="border-left:5px solid ${issue.color}">
          
          <div class="fw-semibold">${issue.description}</div>

          <small class="d-block mb-1">
            WCAG: ${issue.wcag} |
            Severity: ${issue.severity} |
            Count: ${issue.count}
          </small>

          ${issue.solution ? `
            <div class="mt-2">
              <strong>Solution:</strong>
              <div>${issue.solution}</div>
            </div>
          ` : ''}

          ${issue.learnMore ? `
            <div class="mt-2">
              <a href="${issue.learnMore}"
                 target="_blank"
                 class="fw-semibold"
                 style="color:#B666D2; text-decoration:none;">
                Learn more →
              </a>
            </div>
          ` : ''}
        </div>
      `;
    });
  }

  resultDiv.innerHTML = html;
}

/* ================= SEVERITY CHART ================= */
function renderSeverityChart(severitySummary) {
  const ctx = document.getElementById('severityChart');

  if (severityChart) {
    severityChart.destroy();
  }

  severityChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Critical', 'Serious', 'Moderate', 'Minor'],
      datasets: [{
        data: [
          severitySummary.Critical,
          severitySummary.Serious,
          severitySummary.Moderate,
          severitySummary.Minor
        ],
        backgroundColor: [
          '#ff4d4f',
          '#ff9f43',
          '#feca57',
          '#54a0ff'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
//change1
const path = require('path');
const pool = require('./db');

// Load all accessibility rules
const rules = require('./rules');

// Safe import for fix suggestions
const { getFixSuggestion } = require('./utils/fixSuggestions');

const app = express();
const PORT = 3002;
pool.connect()
  .then(() => {
    console.log("Mode2 PostgreSQL Connected");
  })
  .catch(err => {
    console.error("Mode2 DB connection error", err);
  });

/* =======================
   CORS CONFIG
======================= */
app.use(cors({
  origin: true,
  methods: ['GET']
}));

app.use(express.json());

//change2
/* =======================
   STATIC FRONTEND FILES
======================= */
app.use(express.static(path.join(__dirname, 'public')));


//change3
/* =======================
   ROOT ROUTE
======================= */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



/* =======================
   HEALTH CHECK
======================= */
app.get('/health', (req, res) => {
  res.json({ status: 'Mode-2 server running' });
});

/* =======================
   STATIC SCAN API
======================= */
app.get('/scan', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // 1️⃣ Fetch HTML
    const response = await axios.get(url, {
      timeout: 15000,
      maxRedirects: 5,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html'
      }
    });

    const html = response.data;

    // 2️⃣ Parse DOM
    const $ = cheerio.load(html);

    // 3️⃣ Run all rules
    const issues = [];

    for (const rule of rules) {
      if (typeof rule.run === 'function') {
        const result = rule.run($);

        if (result) {
          const fix = getFixSuggestion
            ? getFixSuggestion(result.id)
            : null;

          issues.push({
            ...result,
            solution: fix?.solution || null,
            learnMore: fix?.learnMore || null
          });
        }
      }
    }

    // 4️⃣ Basic score
    const totalRules = rules.length;
    const failedRules = issues.length;
    const passedRules = totalRules - failedRules;

    const score =
      totalRules === 0
        ? 100
        : Math.round((passedRules / totalRules) * 100);

    // 5️⃣ Weighted score
    const MAX_SEVERITY_SCORE = 4;
    const maxPossibleScore = totalRules * MAX_SEVERITY_SCORE;

    let penaltyScore = 0;
    for (const issue of issues) {
      penaltyScore += issue.severityScore || 1;
    }

    const weightedScore =
      maxPossibleScore === 0
        ? 100
        : Math.max(
            0,
            Math.round(
              ((maxPossibleScore - penaltyScore) / maxPossibleScore) * 100
            )
          );
          
    

    // 6️⃣ Severity breakdown
    const severitySummary = {
      Critical: 0,
      Serious: 0,
      Moderate: 0,
      Minor: 0
    };

    for (const issue of issues) {
      if (severitySummary[issue.severity] !== undefined) {
        severitySummary[issue.severity]++;
      }
    }


    // ================= SAVE MODE2 SCAN =================
    
const scanInsert = await pool.query(
  
  `INSERT INTO mode2_scans (url, score, basic_score, total_issues)
   VALUES ($1,$2,$3,$4)
   RETURNING scan_id`,
  [
    url,
    weightedScore,
    score,
    issues.length
  ]
);

const scanId = scanInsert.rows[0].scan_id;
console.log("Mode2 scan saved:", scanId);

// ================= SAVE MODE2 ISSUES =================
for (const issue of issues) {
  await pool.query(
    `INSERT INTO mode2_issues (scan_id, issue_text, severity)
     VALUES ($1,$2,$3)`,
    [
      scanId,
      issue.description,
      issue.severity
    ]
  );
}



    // 7️⃣ Final response
    res.json({
      success: true,
      url,
      score,
      weightedScore,
      summary: {
        totalRules,
        passedRules,
        failedRules
      },
      severitySummary,
      issues
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Scan failed',
      reason: error.response?.status || error.code,
      detail: error.message
    });
  }
});

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`Mode-2 server running on port ${PORT}`);
});
// ==================== Dependencies ====================
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const path = require('path');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51TFp7QDNzIbvsXXxEewlBTIqKdikLFyskSOatvrDEhs5Gw8rBQFu2mRrXjKpKBQdUklW7Hcwuzy56z7RJuXGl2Wg00tYh0ur0W');

// Firebase Admin
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// ==================== PostgreSQL ====================
const pool = require("./db");

pool.connect()
.then(() => {
  console.log("PostgreSQL Connected");
})
.catch(err => {
  console.error("Database connection error", err);
});

// ==================== App Setup ====================
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==================== Routes for HTML ====================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/register'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/login'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/register'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/dashboard'));
});

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// ==================== Helper Functions ====================
function getEasyExplanation(issueId) {
  const explanations = {
    'color-contrast': 'Text doesn’t stand out enough — hard to read.',
    'image-alt': 'Images lack alt text — screen readers can’t describe them.',
    'label': 'Inputs missing labels — users won’t know what to enter.',
    'link-name': 'Links lack clear text — unclear what they do.',
    'button-name': 'Buttons need names — users can’t tell their purpose.',
    'html-has-lang': 'No language declared — screen readers may mispronounce.',
    'document-title': 'Missing title tag — bad for screen readers and SEO.',
    'duplicate-id': 'Duplicate IDs — can confuse users or scripts.',
    'aria-hidden-focus': 'Element is focusable but hidden from assistive tech.'
  };
  return explanations[issueId] || 'Accessibility issue found. See Help URL for details.';
}

async function detectRegion(page, selector) {
  return await page.evaluate((sel) => {
    const landmarkTags = ['MAIN','HEADER','NAV','FOOTER','ASIDE','SECTION','FORM','ARTICLE','DETAILS','SUMMARY','FIGURE'];
    const landmarkRoles = ['banner','navigation','main','contentinfo','complementary','region','search','form','application','searchbox','article','group','document'];

    const el = document.querySelector(sel);
    if (!el) return 'General Page Area';

    let curr = el;
    while (curr) {
      if (landmarkTags.includes(curr.tagName)) return curr.tagName.toLowerCase();
      const role = curr.getAttribute && curr.getAttribute('role');
      if (role && landmarkRoles.includes(role.toLowerCase())) return role.toLowerCase();
      curr = curr.parentElement;
    }

    curr = el;
    while (curr) {
      if (/^H[1-3]$/.test(curr.tagName)) return 'section (inferred from heading)';
      curr = curr.parentElement;
    }

    curr = el;
    while (curr) {
      const cls = curr.className || '';
      if (typeof cls === 'string' && /(content|wrapper|container)/i.test(cls)) return 'section (heuristic wrapper)';
      curr = curr.parentElement;
    }

    return 'General Page Area';
  }, selector);
}

// ==================== API Endpoints ====================

// Scan a website
app.post('/scan', async (req, res) => {
  const { url, idToken } = req.body;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  let uid = null;
  let userEmail = null;

  if (idToken) {
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      uid = decoded.uid;
      userEmail = decoded.email || null;

      // ==================== PostgreSQL USER SYNC ====================
if (uid) {

  const userCheck = await pool.query(
    "SELECT id FROM users WHERE firebase_uid=$1",
    [uid]
  );

  if (userCheck.rows.length === 0) {

    await pool.query(
      "INSERT INTO users (firebase_uid, email) VALUES ($1,$2)",
      [uid, userEmail]
    );

    console.log("User inserted into PostgreSQL");

  }

}
    } catch (err) {
      console.warn("Invalid ID token:", err.message);
    }
  }

  try {

    //1
   // ==================== FREE / PRO PLAN CHECK FROM POSTGRES ====================
if (uid) {

  const userPlanResult = await pool.query(
    "SELECT plan FROM users WHERE firebase_uid=$1",
    [uid]
  );

  let plan = "free";

  if (userPlanResult.rows.length > 0) {
    plan = userPlanResult.rows[0].plan;
  }

 if (plan === "free") {

  const userIdResult = await pool.query(
    "SELECT id FROM users WHERE firebase_uid=$1",
    [uid]
  );

  const userId = userIdResult.rows[0].id;

  const todayScanResult = await pool.query(
    `SELECT COUNT(*) FROM scans
     WHERE user_id=$1
     AND DATE(created_at)=CURRENT_DATE`,
    [userId]
  );

  const todayScanCount = parseInt(todayScanResult.rows[0].count);

  if (todayScanCount >= 3) {
    return res.status(403).json({
      error: "FREE_LIMIT_REACHED",
      message: "You have used your 3 free scans for today. Upgrade to Pro."
    });
  }

}

}
    // ==================== END LIMIT CHECK ====================

    console.log(`Scanning ${url}`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 0 });
    await new Promise(resolve => setTimeout(resolve, 4000));

    const results = await new AxePuppeteer(page).analyze();

    // ================= SAVE SCAN TO POSTGRES =================

// ================= SAVE SCAN TO POSTGRES =================

let scanId = null;

if (uid) {

  const userResult = await pool.query(
    "SELECT id FROM users WHERE firebase_uid=$1",
    [uid]
  );

  const userId = userResult.rows[0].id;

  const totalIssues = results.violations.length;

  let complianceLevel = "Unknown";

  if (results.violations.some(v => v.tags.includes("wcag2aaa"))) {
    complianceLevel = "AAA";
  } else if (results.violations.some(v => v.tags.includes("wcag2aa"))) {
    complianceLevel = "AA";
  } else if (results.violations.some(v => v.tags.includes("wcag2a"))) {
    complianceLevel = "A";
  }

  const scanType = "mode1";

  const scanInsert = await pool.query(
    `INSERT INTO scans (user_id, url, total_issues, compliance_level, scan_type)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING scan_id`,
    [userId, url, totalIssues, complianceLevel, scanType]
  );

  scanId = scanInsert.rows[0].scan_id;

  console.log("Scan saved with ID:", scanId);

}

    const formattedIssues = await Promise.all(results.violations.map(async (violation) => {
  const level = violation.tags.includes("wcag2aaa") ? "AAA" :
                violation.tags.includes("wcag2aa") ? "AA" :
                violation.tags.includes("wcag2a") ? "A" : "Unknown";

  const elements = await Promise.all(violation.nodes.map(async (node) => {
    const selector = Array.isArray(node.target) ? node.target[0] : '';
    const region = selector ? await detectRegion(page, selector) : 'General Page Area';
    return {
      html: node.html,
      summary: node.failureSummary,
      selector: selector,
      region: region
    };
  }));

  return {
    id: violation.id,
    description: violation.description,
    explanation: getEasyExplanation(violation.id),
    helpUrl: violation.helpUrl,
    impact: violation.impact,
    level: level,
    tags: violation.tags,
    elements
  };
}));

// ================= SAVE ISSUES TO POSTGRES =================
if (uid && scanId) {

  for (const issue of formattedIssues) {

    await pool.query(
      `INSERT INTO issues (scan_id, rule_id, impact, description)
       VALUES ($1,$2,$3,$4)`,
      [
        scanId,
        issue.id,
        issue.impact,
        issue.description
      ]
    );

  }

  console.log("Issues saved to PostgreSQL");
}

await browser.close();

    // Save scan if logged in
    if (uid) {
      const scanData = {
        email: userEmail || "unknown",
        url,
        date: new Date(),
        issueCount: formattedIssues.length,
        complianceLevel: formattedIssues.length > 0 ? formattedIssues[0].level : "Unknown",
        issues: formattedIssues
      };
      await db.collection('users').doc(uid).collection('scans').add(scanData);
    }

    res.json({ success: true, issues: formattedIssues });

  } catch (error) {
    console.error("Scan error:", error.message);
    res.status(500).json({ error: "Scan failed", message: error.message });
  }
});

// ==================== NEW API: Remaining Credits ====================
// ==================== NEW API: Remaining Credits ====================
app.get('/credits', async (req, res) => {
  try {

    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const userResult = await pool.query(
      "SELECT id, plan FROM users WHERE firebase_uid=$1",
      [uid]
    );

    if (userResult.rows.length === 0) {
      return res.json({ remaining: 0 });
    }

    const userId = userResult.rows[0].id;
    const plan = userResult.rows[0].plan;

    if (plan === "pro") {
      return res.json({ remaining: "Unlimited" });
    }

    const scanResult = await pool.query(
      `SELECT COUNT(*) FROM scans
       WHERE user_id=$1
       AND DATE(created_at)=CURRENT_DATE`,
      [userId]
    );

    const used = parseInt(scanResult.rows[0].count);
    const remaining = Math.max(3 - used, 0);

    res.json({ remaining });

  } catch (err) {
    console.error("Credits fetch error:", err);
    res.status(500).json({ error: "Failed to fetch credits" });
  }
});



//2 
// ==================== BUY PRO PLAN ====================
app.post('/buy-pro', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(401).json({ error: "Unauthorized" });

    const decoded = await admin.auth().verifyIdToken(idToken);
    const uid = decoded.uid;

    // simple update now
    const result = await pool.query(
      `UPDATE users
       SET plan='pro',
           payment_status='paid'
       WHERE firebase_uid=$1
       RETURNING *`,
      [uid]
    );

    console.log("Updated user row:", result.rows[0]);

    res.json({ success: true, message: "Pro plan activated" });

  } catch (err) {
    console.error("Buy Pro Error:", err);
    res.status(500).json({ error: "Failed to activate Pro" });
  }
});

 //new section added 
 app.post('/create-checkout-session', async (req, res) => {
  try {

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ADA Scanner Pro Plan'
            },
            unit_amount: 1000
          },
          quantity: 1
        }
      ],

      success_url: 'http://20.198.20.235/success.html',
      cancel_url: '/scan'
    });

    res.json({
      url: session.url
    });

  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({
      error: "Stripe failed"
    });
  }
});

// ==================== Start Server ====================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
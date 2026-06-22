const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

//   Explanations
function getEasyExplanation(issueId) {
  const explanations = {
    'color-contrast': 'Text doesn’t stand out enough from the background — hard to read for many users.',
    'image-alt': 'Images are missing alt text — screen readers can’t describe them.',
    'label': 'Form inputs (like text boxes) are missing labels — users might not know what to type.',
    'link-name': 'Links don’t have clear text — screen readers can’t tell what they do.',
    'button-name': 'Buttons are missing names — users can’t tell their purpose.',
    'html-has-lang': 'The page does not declare its language — screen readers may pronounce things incorrectly.',
    'document-title': 'The page is missing a title tag — bad for screen readers and SEO.',
    'duplicate-id': 'Multiple elements have the same ID — can confuse screen readers and scripts.',
    'aria-hidden-focus': 'An element is focusable but hidden from assistive tech — confusing for users.',
    
  };
  return explanations[issueId] || 'Accessibility issue found. Click the Help URL for details and how to fix it.';
}

// Finer region detection by  DOM 
async function getRegionForNode(page, selector) {
  return await page.evaluate((sel) => {
    const landmarkTags = ['MAIN', 'HEADER', 'NAV', 'FOOTER', 'ASIDE', 'SECTION'];
    const roleMap = {
      banner: 'Header',
      navigation: 'Navigation',
      main: 'Main Content',
      contentinfo: 'Footer',
      complementary: 'Sidebar',
      region: 'Region'
    };
    let el = document.querySelector(sel);
    if (!el) return 'General';
    while (el) {
      if (landmarkTags.includes(el.tagName)) {
        if (el.tagName === 'MAIN') return 'Main Content';
        return el.tagName.charAt(0) + el.tagName.slice(1).toLowerCase();
      }
      const role = el.getAttribute('role');
      if (role && roleMap[role.toLowerCase()]) {
        return roleMap[role.toLowerCase()];
      }
      el = el.parentElement;
    }
    return 'General';
  }, selector);
}

// URLs to Scan
const urlsToScan = [
  'https://www.aljazeera.com/news/2023/10/9/whats-the-israel-palestine-conflict-about-a-simple-guide'
];

(async () => {
  try {
    console.log(" Starting scan...\n");

    const browser = await puppeteer.launch({ headless: true });

    for (const url of urlsToScan) {
      const page = await browser.newPage();
      console.log(` Scanning URL: ${url}`);
      await page.goto(url, { waitUntil: 'load', timeout: 0 });
      await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for dynamic content

      const results = await new AxePuppeteer(page).analyze();

      if (results.violations.length === 0) {
        console.log(" No issues found on this page.\n");
      } else {
        console.log(` ADA Accessibility Issues Found on: ${url}\n`);
        for (let index = 0; index < results.violations.length; index++) {
          const violation = results.violations[index];
          console.log(` Issue ${index + 1}`);
          console.log(` ID: ${violation.id}`);
          console.log(` Description: ${violation.description}`);
          console.log(`Easy Explanation: ${getEasyExplanation(violation.id)}`);
          console.log(` Help URL: ${violation.helpUrl}`);
          console.log(` Impact: ${violation.impact}`);

          // Accessibility Level
          let level = violation.tags.includes("wcag2aaa") ? "AAA" :
                      violation.tags.includes("wcag2aa") ? "AA" :
                      violation.tags.includes("wcag2a") ? "A" : "Unknown";
          console.log(`Accessibility Level: ${level}`);

          console.log(`  Tags: ${violation.tags.join(", ")}`);
          console.log("Affected Elements:");

          for (let i = 0; i < violation.nodes.length; i++) {
            const node = violation.nodes[i];
            const selector = Array.isArray(node.target) ? node.target[0] : null;
            // get accurate region
            const region = selector ? await getRegionForNode(page, selector) : 'General';

            console.log(`   ${i + 1}) HTML: ${node.html}`);
            console.log(`       Summary: ${node.failureSummary}`);
            console.log(`       Selector: ${node.target.join(", ")}`);
            console.log(`       Page Area: ${region}`);
          }

          console.log("--------------------------------------------------\n");
        }
      }

      await page.close();
    }

    await browser.close();
    console.log(" Scan completed for all pages.\n");

  } catch (error) {
    console.error(" Error occurred during scanning:", error);
  }
})();

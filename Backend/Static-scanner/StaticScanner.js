const axios = require('axios');
const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');

const RuleEngine = require('./RuleEngine');
const SeverityCalculator = require('./SeverityCalculator');

class StaticScanner {
  constructor(url) {
    this.url = url;
    this.ruleEngine = new RuleEngine();
    this.severityCalculator = new SeverityCalculator();
  }

  async fetchHTML() {
    const response = await axios.get(this.url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'ADA-Static-Scanner'
      }
    });
    return response.data;
  }

  async scan() {
    const html = await this.fetchHTML();

    // Create DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const $ = cheerio.load(html);

    // Run WCAG rules
    let issues = this.ruleEngine.run(document, $);

    // Calculate severity for each issue
    issues = issues.map(issue => {
      const severity = this.severityCalculator.calculate(issue);
      return { ...issue, ...severity };
    });

    return issues;
  }
}

module.exports = StaticScanner;

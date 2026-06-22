const rules = require('./rules');

class RuleEngine {
  run(document, $) {
    let issues = [];

    for (const rule of rules) {
      const detected = rule.check(document, $);
      if (detected.length > 0) {
        issues.push(...detected);
      }
    }

    return issues;
  }
}

module.exports = RuleEngine;

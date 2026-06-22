const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'button-name',

  run: ($) => {
    const issues = [];

    $('button').each((i, el) => {
      const text = $(el).text().trim();
      const aria = $(el).attr('aria-label');

      if (!text && !aria) {
        issues.push(i);
      }
    });

    if (issues.length === 0) return null;

    const severityInfo = getSeverity('Critical');

    return {
      id: 'button-name',
      description: 'Button has no accessible name',
      wcag: '4.1.2',
      level: 'A',
      severity: 'Critical',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: issues.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
    };
  }
};

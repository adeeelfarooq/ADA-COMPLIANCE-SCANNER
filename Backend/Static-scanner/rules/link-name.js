const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'link-name',

  run: ($) => {
    const issues = [];

    $('a').each((i, el) => {
      const text = $(el).text().trim();
      const aria = $(el).attr('aria-label');

      if (!text && !aria) {
        issues.push(i);
      }
    });

    if (issues.length === 0) return null;

    const severityInfo = getSeverity('Critical');

    return {
      id: 'link-name',
      description: 'Link has no accessible text',
      wcag: '2.4.4',
      level: 'A',
      severity: 'Critical',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: issues.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html'
    };
  }
};

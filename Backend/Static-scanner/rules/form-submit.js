const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'form-submit',

  run: ($) => {
    const issues = [];

    $('form').each((i, el) => {
      const submit = $(el).find('button[type="submit"], input[type="submit"]');
      if (submit.length === 0) {
        issues.push(i);
      }
    });

    if (issues.length === 0) return null;

    const severityInfo = getSeverity('Moderate');

    return {
      id: 'form-submit',
      description: 'Form missing submit button',
      wcag: '3.2.2',
      level: 'A',
      severity: 'Moderate',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: issues.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/on-input.html'
    };
  }
};

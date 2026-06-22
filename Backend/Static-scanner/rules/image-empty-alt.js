const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'image-empty-alt',

  run: ($) => {
    const issues = [];

    $('img[alt=""]').each((i) => {
      issues.push(i);
    });

    if (issues.length === 0) return null;

    const severityInfo = getSeverity('Moderate');

    return {
      id: 'image-empty-alt',
      description: 'Image has empty alt attribute',
      wcag: '1.1.1',
      level: 'A',
      severity: 'Moderate',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: issues.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html'
    };
  }
};

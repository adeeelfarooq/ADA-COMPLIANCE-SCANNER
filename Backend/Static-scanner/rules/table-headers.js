const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'table-headers',

  run: ($) => {
    const issues = [];

    $('table').each((i, el) => {
      if ($(el).find('th').length === 0) {
        issues.push(i);
      }
    });

    if (issues.length === 0) return null;

    const severityInfo = getSeverity('Moderate');

    return {
      id: 'table-headers',
      description: 'Table missing header cells',
      wcag: '1.3.1',
      level: 'A',
      severity: 'Moderate',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: issues.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
    };
  }
};

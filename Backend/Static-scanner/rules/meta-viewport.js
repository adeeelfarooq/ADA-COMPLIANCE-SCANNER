const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'meta-viewport',

  run: ($) => {
    const meta = $('meta[name="viewport"]');

    if (meta.length === 0) {
      const severityInfo = getSeverity('Moderate');

      return {
        id: 'meta-viewport',
        description: 'Missing viewport meta tag',
        wcag: '1.4.10',
        level: 'AA',
        severity: 'Moderate',
        severityScore: severityInfo.score,
        color: severityInfo.color,
        count: 1,
        helpUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/reflow.html'
      };
    }

    return null;
  }
};

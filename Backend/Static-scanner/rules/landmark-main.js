const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'landmark-main',

  run: ($) => {
    const main = $('main');

    if (main.length === 0) {
      const severityInfo = getSeverity('Moderate');

      return {
        id: 'landmark-main',
        description: 'Page missing main landmark',
        wcag: '1.3.1',
        level: 'A',
        severity: 'Moderate',
        severityScore: severityInfo.score,
        color: severityInfo.color,
        count: 1,
        helpUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
      };
    }

    return null;
  }
};

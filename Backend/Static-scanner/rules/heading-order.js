const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'heading-order',

  run: ($) => {
    const h1 = $('h1').length;

    if (h1 === 0) {
      const severityInfo = getSeverity('Moderate');

      return {
        id: 'heading-order',
        description: 'Page has no H1 heading',
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

const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'skip-link',

  run: ($) => {
    const skip = $('a[href^="#"]').filter((i, el) =>
      $(el).text().toLowerCase().includes('skip')
    );

    if (skip.length === 0) {
      const severityInfo = getSeverity('Moderate');

      return {
        id: 'skip-link',
        description: 'Missing skip navigation link',
        wcag: '2.4.1',
        level: 'A',
        severity: 'Moderate',
        severityScore: severityInfo.score,
        color: severityInfo.color,
        count: 1,
        helpUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html'
      };
    }

    return null;
  }
};

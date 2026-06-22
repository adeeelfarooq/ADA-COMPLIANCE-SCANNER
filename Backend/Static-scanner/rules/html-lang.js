const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'html-lang',

  run: ($) => {
    const htmlTag = $('html').first();
    const lang = htmlTag.attr('lang');

    if (!lang || lang.trim() === '') {
      const severityInfo = getSeverity('Moderate');

      return {
        id: 'html-lang',
        description: 'HTML element does not have a lang attribute',
        wcag: '3.1.1',
        level: 'A',
        severity: 'Moderate',
        severityScore: severityInfo.score,
        color: severityInfo.color,
        count: 1,
        helpUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html'
      };
    }

    return null;
  }
};

const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'img-alt',

  run: ($) => {
    const imagesWithoutAlt = [];

    $('img').each((i, el) => {
      const alt = $(el).attr('alt');
      if (!alt || alt.trim() === '') {
        imagesWithoutAlt.push(i);
      }
    });

    if (imagesWithoutAlt.length === 0) return null;

    const severityInfo = getSeverity('Critical');

    return {
      id: 'img-alt',
      description: 'Image missing alt attribute',
      wcag: '1.1.1',
      level: 'A',
      severity: 'Critical',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: imagesWithoutAlt.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html'
    };
  }
};

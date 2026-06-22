const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'document-title',

  run: ($) => {
    const title = $('title').first();

    if (!title.length || title.text().trim() === '') {
      const severityInfo = getSeverity('Moderate');

      return {
        id: 'document-title',
        description: 'Document does not have a meaningful title',
        wcag: '2.4.2',
        level: 'A',
        severity: 'Moderate',
        severityScore: severityInfo.score,
        color: severityInfo.color,
        count: 1,
        helpUrl:
          'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html'
      };
    }

    return null;
  }
};

const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'video-controls',

  run: ($) => {
    const issues = [];

    $('video').each((i, el) => {
      if (!$(el).attr('controls')) {
        issues.push(i);
      }
    });

    if (issues.length === 0) return null;

    const severityInfo = getSeverity('Critical');

    return {
      id: 'video-controls',
      description: 'Video missing controls',
      wcag: '1.2.1',
      level: 'A',
      severity: 'Critical',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: issues.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html'
    };
  }
};

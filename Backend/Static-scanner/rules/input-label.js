const { getSeverity } = require('../utils/severity');

module.exports = {
  id: 'input-label',

  run: ($) => {
    const inputsWithoutLabel = [];

    $('input').each((i, el) => {
      const id = $(el).attr('id');
      const type = $(el).attr('type');

      if (type === 'hidden' || type === 'submit') return;

      if (!id) {
        inputsWithoutLabel.push(i);
        return;
      }

      const label = $(`label[for="${id}"]`);
      if (label.length === 0) {
        inputsWithoutLabel.push(i);
      }
    });

    if (inputsWithoutLabel.length === 0) return null;

    const severityInfo = getSeverity('Critical');

    return {
      id: 'input-label',
      description: 'Form input missing label',
      wcag: '1.3.1',
      level: 'A',
      severity: 'Critical',
      severityScore: severityInfo.score,
      color: severityInfo.color,
      count: inputsWithoutLabel.length,
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html'
    };
  }
};

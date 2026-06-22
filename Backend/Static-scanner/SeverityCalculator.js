class SeverityCalculator {
  calculate(issue) {
    const impactScore = issue.impactScore || 1;
    const frequencyScore = issue.frequencyScore || 1;
    const scopeScore = issue.scopeScore || 1;

    const total = impactScore * frequencyScore * scopeScore;

    let severity = 'Minor';

    if (total >= 7) severity = 'Critical';
    else if (total >= 5) severity = 'Serious';
    else if (total >= 3) severity = 'Moderate';

    return {
      severity,
      severityScore: total
    };
  }
}

module.exports = SeverityCalculator;

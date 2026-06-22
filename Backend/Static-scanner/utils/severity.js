// utils/severity.js

const SEVERITY_MAP = {
  Critical: {
    score: 4,
    color: 'red',
    description: 'Blocks or severely impacts accessibility'
  },
  Serious: {
    score: 3,
    color: 'orange',
    description: 'Major accessibility barrier'
  },
  Moderate: {
    score: 2,
    color: 'yellow',
    description: 'Noticeable but not blocking'
  },
  Minor: {
    score: 1,
    color: 'blue',
    description: 'Low impact issue'
  }
};

function getSeverity(severity) {
  return SEVERITY_MAP[severity] || SEVERITY_MAP.Minor;
}

module.exports = {
  SEVERITY_MAP,
  getSeverity
};

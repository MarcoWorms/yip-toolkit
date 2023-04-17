const yaml = require('js-yaml');
const frontMatter = require('front-matter');

class YipValidator {
  constructor(attributes) {
    Object.assign(this, attributes);
  }

  isValid() {
    return this.validatePresence() && this.validateStatus();
  }

  validatePresence() {
    return (
      this.title &&
      this.author &&
      this.status &&
      this.created
    );
  }

  validateStatus() {
    const validStatuses = [
      'WIP',
      'Proposed',
      'Approved',
      'Implemented',
      'Rejected',
      'Withdrawn',
      'Deferred',
      'Moribund',
      'Voting',
    ];
    return validStatuses.includes(this.status);
  }
  errors() {
    const errors = [];

    if (!this.validatePresence()) {
      errors.push('Title, author, status, and created date are required.');
    }

    if (!this.validateStatus()) {
      errors.push(
        'Invalid status. Must be one of: WIP, Proposed, Approved, Implemented, Rejected, Withdrawn, Deferred, Moribund.'
      );
    }

    return errors;
  }
}

function load(fileContent) {
  const parsed = frontMatter(fileContent);
  return parsed.attributes;
}

function validate(fileContent) {
  const attributes = load(fileContent);
  const validator = new YipValidator(attributes);

  return {
    isValid: validator.isValid(),
    errors: validator.errors(),
  };
}

module.exports = { validate };

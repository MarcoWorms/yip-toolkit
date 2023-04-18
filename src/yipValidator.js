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
    const requiredFields = [
      { field: 'title', message: 'Title is required.' },
      { field: 'author', message: 'Author is required.' },
      { field: 'status', message: 'Status is required.' },
      { field: 'created', message: 'Created date is required.' },
      { field: 'discussions-to', message: 'Discussions-to link is required.' },
    ];

    this.missingFields = requiredFields.filter(
      (field) => !this[field.field]
    );

    return this.missingFields.length === 0;
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
      this.missingFields.forEach((field) => errors.push(field.message));
    }

    if (!this.validateStatus()) {
      errors.push(
        'Invalid status. Must be one of: WIP, Proposed, Approved, Implemented, Rejected, Withdrawn, Deferred, Moribund, Voting.'
      );
    }

    if (this.created && !/^\d{4}-\d{2}-\d{2}$/.test(this.created)) {
      errors.push('Invalid date format. Must be in yyyy-mm-dd format.');
    }

    if (this.yip && (!Number.isInteger(this.yip) || this.yip < 0)) {
      errors.push('Invalid YIP number. Must be a non-negative integer.');
    }

    if (
      this['discussions-to'] &&
      !/^https:\/\/gov\.yearn\.finance\/.+|^<create a new thread on https:\/\/gov\.yearn\.finance\/ and drop the link here>$/.test(this['discussions-to'])
    ) {
      errors.push(
        'Invalid discussions-to link. Must be a link to gov.yearn.finance or the placeholder text.'
      );
    }

    return errors;
  }
}

function load(fileContent) {
  const parsed = frontMatter(fileContent);
  return parsed.attributes;
}

export function validate(fileContent) {
  const attributes = load(fileContent);
  const validator = new YipValidator(attributes);

  const errors = validator.errors();

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}
import yipTemplate from './yipTemplate.js';

function getTodayISO8601() {
  return new Date().toISOString().slice(0, 10);
}

export function generateYIP(options) {
  const {
    yipNumberAssigned,
    yipNumber,
    yipType,
    yipCategory,
    yipAuthor,
    yipAuthorGithubUsername,
    yipDateCreated,
    yipStatus,
    yipTitle
  } = options;

  const templateData = {
    yipNumberAssigned,
    yipNumber: yipNumberAssigned ? yipNumber : '<to be assigned>',
    yipType,
    yipCategory: yipCategory,
    yipAuthor: yipAuthor || 'Anon',
    yipAuthorGithubUsername: yipAuthorGithubUsername || 'Anon',
    yipDateCreated: yipDateCreated || getTodayISO8601(),
    yipStatus: yipStatus || 'WIP',
    yipTitle: yipTitle || 'YIP Title'
  };

  const yipContent = yipTemplate(templateData);

  return yipContent;
}
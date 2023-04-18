import yipTemplate from './yipTemplate.js';

function getTodayISO8601() {
  return new Date().toISOString().slice(0, 10);
}

export function generateYIP(options) {
  const {
    yipNumberAssigned,
    yipNumber,
    yipAuthor,
    yipDateCreated,
    yipStatus,
    yipTitle,
    snapshotUrl,
    snapshotSpace,
    startDate,
    endDate,
    snapshot,
    yesVotes,
    noVotes,
  } = options;

  const templateData = {
    yipNumberAssigned,
    yipNumber: yipNumberAssigned ? yipNumber : '',
    yipAuthor: yipAuthor || 'Anon',
    yipDateCreated: yipDateCreated || getTodayISO8601(),
    yipStatus: yipStatus || 'WIP',
    yipTitle: yipTitle || 'YIP Title',
    snapshotUrl,
    snapshotSpace: snapshotSpace || 'veYFI.eth',
    startDate,
    endDate,
    snapshot,
    yesVotes,
    noVotes,
  };

  const yipContent = yipTemplate(templateData);

  return yipContent;
}
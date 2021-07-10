// Check set format and determine if match winner is on gamepoint.
exports.checkIfMatchPoint = (set, winnerId) => {
  if (set.format === "BO1") {
    return true;
  } else if (set.format === "BO3" && set.currentScore[winnerId] === 1) {
    return true;
  } else if (set.format === "BO5" && set.currentScore[winnerId] === 2) {
    return true;
  } else if (set.format === "BO7" && set.currentScore[winnerId] === 3) {
    return true;
  } else {
    return false;
  }
};

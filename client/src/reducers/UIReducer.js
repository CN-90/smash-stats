export const UIInitialState = {
  playerModal: false,
  tournamentModal: false,
};

export const UIReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAYER':
      return {
        ...state,
        tournamentModal: false,
        playerModal: !state.playerModal,
      };

    case 'TOGGLE_TOURNAMENT':
      return {
        ...state,
        playerModal: false,
        tournamentModal: !state.tournamentModal,
      };
  }
};

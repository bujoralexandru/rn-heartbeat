import { combineReducers, createStore } from 'redux';
import { createAction, handleActions } from 'redux-actions';

const appInitialState = {
  isServiceRunning: false
};

const START_SERVICE = 'START_SERVICE';
const STOP_SERVICE = 'STOP_SERVICE';

export const startService = createAction(START_SERVICE);
export const stopService = createAction(STOP_SERVICE);

const App = handleActions(
  {
    [START_SERVICE]: (state) => ({
      ...state,
      isServiceRunning: true
    }),
    [STOP_SERVICE]: (state) => ({
      ...state,
      isServiceRunning: false
    })
  },
  appInitialState
);

const rootReducer = combineReducers({
  App
});

const configureStore = () => createStore(rootReducer);
export const store = configureStore();

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import logger from 'redux-logger';

const appInitialState = {
  isServiceRunning: false,
  phoneNumber: '+40742644552'
};

const START_SERVICE = 'START_SERVICE';
const STOP_SERVICE = 'STOP_SERVICE';

const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER';

export const startService = createAction(START_SERVICE);
export const stopService = createAction(STOP_SERVICE);

export const setPhoneNumber = createAction(SET_PHONE_NUMBER);

const App = handleActions(
  {
    [START_SERVICE]: (state) => ({
      ...state,
      isServiceRunning: true
    }),
    [STOP_SERVICE]: (state) => ({
      ...state,
      isServiceRunning: false
    }),
    [SET_PHONE_NUMBER]: (state, action) => ({
      ...state,
      phoneNumber: action.payload
    })
  },
  appInitialState
);

const rootReducer = combineReducers({
  App
});

const configureStore = () => createStore(rootReducer, applyMiddleware(logger));
export const store = configureStore();

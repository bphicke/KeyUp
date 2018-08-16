import { createStore, combineReducers } from 'redux';
import reducers from '../reducers/reducers';
import industryReducers from '../reducers/industryReducers';
import pageTitleReducers from '../reducers/pageTitleReducers';
import serviceReducers from '../reducers/serviceReducers';
import careerReducers from '../reducers/careerReducers';
import trainingServiceReducers from '../reducers/trainingServiceReducers';

export const store = createStore(
  combineReducers({
    industries: industryReducers,
    careers: reducers,
    pages: pageTitleReducers,
    career: careerReducers,
    trainingService: trainingServiceReducers,
    services: serviceReducers
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


import DataActionTypes from './chef.types';

const INITIAL_STATE = {
  data: null,
  isFetching: false,
  errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataActionTypes.FETCH_COLLECTIONS_START_CHEF:
      return {
        ...state,
        isFetching: true
      };
    case DataActionTypes.FETCH_COLLECTIONS_SUCCESS_CHEF:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case DataActionTypes.FETCH_COLLECTIONS_FAILURE_CHEF:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;

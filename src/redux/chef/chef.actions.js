import DataActionTypes from './chef.types';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: DataActionTypes.FETCH_COLLECTIONS_START_CHEF
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: DataActionTypes.FETCH_COLLECTIONS_SUCCESS_CHEF,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: DataActionTypes.FETCH_COLLECTIONS_FAILURE_CHEF,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = (collectionName, type) => {
  return dispatch => {
    const collectionRef = firestore.collection(collectionName);
    dispatch(fetchCollectionsStart());
console.log({
  collectionName, type
})
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};

import ShopActionTypes from './shop.types';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils.js';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (map) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: map,
});

export const fetchCollectionsFailure = (message) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  errorMessage: message,
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(e => {
      dispatch(fetchCollectionsFailure(e.message));
    });
  }
}
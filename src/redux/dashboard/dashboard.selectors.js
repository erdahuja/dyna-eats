import { createSelector } from 'reselect';

export const selectData = state => state.dashboard;
export const selectIsDataFetching = state => state.isFetching

export const selectCollection = () =>
  createSelector(
    [selectData],
    data => (data ? data : null)
  );

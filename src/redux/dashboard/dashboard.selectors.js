import { createSelector } from 'reselect';

export const selectDashboard = state => state.dashboard;

export const selectData = createSelector(
    [selectDashboard],
    dashboard => (dashboard.data ? dashboard.data : [])
  );

export const selectIsDataFetching = createSelector(
    [selectDashboard],
    data => (data.isFetching ? true : false)
  );

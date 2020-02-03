import { createSelector } from "reselect";

export const selectChef = state => state.chef;

export const selectData = createSelector([selectChef], chef =>
  chef.data ? chef.data : []
);

export const selectIsDataFetching = createSelector([selectChef], chef =>
  chef.isFetching ? true : false
);

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsDataFetching } from '../../redux/dashboard/dashboard.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './data-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsDataFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
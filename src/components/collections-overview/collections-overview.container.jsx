import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = connect(mapStateToProps)(CollectionsOverviewWithSpinner);

export default CollectionsOverviewContainer;

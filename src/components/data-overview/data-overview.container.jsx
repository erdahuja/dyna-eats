import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectData } from '../../redux/dashboard/dashboard.selectors';
import { selectIsDataFetching } from '../../redux/dashboard/dashboard.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import DataOverview from './data-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsDataFetching,
  data: selectData
});

export default compose(connect(mapStateToProps), WithSpinner)(DataOverview);

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsDataFetching } from '../../redux/chef/chef.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import DataOverview from './chef-data.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsDataFetching,
});

export default compose(connect(mapStateToProps), WithSpinner)(DataOverview);

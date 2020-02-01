import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionLoading } from '../../redux/shop/shop.selectors';
import CollectionComponent from './collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionLoading(state)
});

export default connect(mapStateToProps)(WithSpinner(CollectionComponent))
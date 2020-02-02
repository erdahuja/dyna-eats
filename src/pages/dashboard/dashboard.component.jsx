import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/dashboard/dashboard.actions';

import Container from '../../components/data-overview/data-overview.container';
// import CollectionPageContainer from '../collection/collection.container';

class Dashboard extends React.Component {

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync('supplies');
  }

  render() {
    const { match } = this.props;
    return (
      <>
        <Route
          exact
          path={`${match.path}`}
          component={Container}
        />
        {/* <Route
          path={`${match.path}/:collectionId`}
          componen={CollectionPageContainer}
        /> */}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: (name) => dispatch(fetchCollectionsStartAsync(name))
});

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);

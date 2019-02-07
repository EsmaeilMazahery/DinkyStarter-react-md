import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Footer extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
  //  console.log('Footer will mount');
  }

  componentDidMount = () => {
   // console.log('Footer mounted');
  }

  componentWillReceiveProps = (nextProps) => {
   /// console.log('Footer will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
   // console.log('Footer will update', nextProps, nextState);
  }


  componentDidUpdate = () => {
  //  console.log('Footer did update');
  }

  componentWillUnmount = () => {
   // console.log('Footer will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="FooterWrapper">
         کلیه حقوق مادی و معنوی این وب سایت متعلق به شرکت جهانمیر است.
      </div>
    );
  }
}

Footer.propTypes = {
  // bla: PropTypes.string,
};

Footer.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

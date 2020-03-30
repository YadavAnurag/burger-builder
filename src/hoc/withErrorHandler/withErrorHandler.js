import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';


const withErrorHandler = (WrappedComponent, axios) => {
  return (
    class extends React.Component{ // anonymous javascript class

      constructor(props){
        super(props);

        // always return req and res from interceptors either it wouldn't work
        this.reqInterceptor = axios.interceptors.request.use(request => {
          this.setState({error: null});
          return request;
        }, error => console.log(error));

        this.resInterceptor = axios.interceptors.response.use(response => response, error => this.setState({error}));
      }

      state = {
        error: null
      }
      // UNSAFE_componentWillMount(){
      //   // always return req and res from interceptors either it wouldn't work
      //   axios.interceptors.request.use(request => {
      //     this.setState({error: null});
      //     return request;
      //   }, error => console.log(error));

      //   axios.interceptors.response.use(response => response, error => this.setState({error}));
      // }
      componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
      }
      errorConfirmedHandler = () => this.setState({error: null});

      render(){
        return (
          <Auxiliary>
            <Modal 
              show={this.state.error ? true : false}
              closeModal={this.errorConfirmedHandler}
            >
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Auxiliary>
        );
      }
    }
  );
}

export default withErrorHandler;
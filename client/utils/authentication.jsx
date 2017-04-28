import Store from '../stores/Store'

export const requireAuthentication = (nextState, replace) => {
  if (!Store.isLoggedin()) {
    replace({
      pathname: '/'
    });
  }
};
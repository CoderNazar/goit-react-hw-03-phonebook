import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
  static defaultProps = {
    children: null,
    className: '',
  };
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };
  render() {
    const { children, className } = this.props;
    return (
      <li className={className}>{children}</li>
    );
  }
}

export { Item };

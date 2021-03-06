'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _reactRouter = require('react-router');

var _RouteAggregator = require('./RouteAggregator');

var _RouteAggregator2 = _interopRequireDefault(_RouteAggregator);

var _RouteContainer = require('./RouteContainer');

var _RouteContainer2 = _interopRequireDefault(_RouteContainer);

var RelayRouterContext = (function (_React$Component) {
  _inherits(RelayRouterContext, _React$Component);

  _createClass(RelayRouterContext, null, [{
    key: 'displayName',
    value: 'RelayRouterContext',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      createElement: _react2['default'].PropTypes.func.isRequired,
      location: _react2['default'].PropTypes.object.isRequired
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      routeAggregator: _react2['default'].PropTypes.instanceOf(_RouteAggregator2['default']).isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      createElement: _react2['default'].createElement
    },
    enumerable: true
  }]);

  function RelayRouterContext(props, context) {
    var _this = this;

    _classCallCheck(this, RelayRouterContext);

    _React$Component.call(this, props, context);

    this.createElement = function (Component, props) {
      var element = _react2['default'].createElement(Component, props);
      if (_reactRelay2['default'].isContainer) {
        element = _react2['default'].createElement(_RouteContainer2['default'], _extends({}, props, {
          Component: Component,
          createElement: _this.props.createElement
        }));
      }
      return element;
    };

    this.renderFailure = function (error, retry) {
      _this._routeAggregator.setFailure(error, retry);
      return _this.renderComponent();
    };

    this.renderFetched = function (data, readyState) {
      _this._routeAggregator.setFetched(data, readyState);
      return _this.renderComponent();
    };

    this.renderLoading = function () {
      _this._routeAggregator.setLoading();
      return _this.renderComponent();
    };

    this._routeAggregator = new _RouteAggregator2['default']();
    this._routeAggregator.updateRoute(props);
  }

  RelayRouterContext.prototype.getChildContext = function getChildContext() {
    return {
      routeAggregator: this._routeAggregator
    };
  };

  RelayRouterContext.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.location === this.props.location) {
      return;
    }

    this._routeAggregator.updateRoute(nextProps);
  };

  RelayRouterContext.prototype.renderComponent = function renderComponent() {
    return _react2['default'].createElement(_reactRouter.RouterContext, _extends({}, this.props, {
      createElement: this.createElement
    }));
  };

  RelayRouterContext.prototype.render = function render() {
    return _react2['default'].createElement(_reactRelay2['default'].RootContainer, _extends({}, this.props, {
      Component: this._routeAggregator,
      renderFailure: this.renderFailure,
      renderFetched: this.renderFetched,
      renderLoading: this.renderLoading,
      route: this._routeAggregator.route
    }));
  };

  return RelayRouterContext;
})(_react2['default'].Component);

exports['default'] = RelayRouterContext;
module.exports = exports['default'];
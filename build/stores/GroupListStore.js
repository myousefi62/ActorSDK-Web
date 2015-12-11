'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _utils = require('flux/utils');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _isOpen = false,
    _list = [],
    _results = [];

/**
 * Class representing a store for searchable group list.
 */

var GroupStore = (function (_Store) {
  _inherits(GroupStore, _Store);

  function GroupStore(dispatcher) {
    _classCallCheck(this, GroupStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GroupStore).call(this, dispatcher));
  }

  /**
   * @returns {boolean}
   */

  _createClass(GroupStore, [{
    key: 'isOpen',
    value: function isOpen() {
      return _isOpen;
    }

    /**
     * @returns {Array}
     */

  }, {
    key: 'getList',
    value: function getList() {
      return _list;
    }

    /**
     * @returns {Array}
     */

  }, {
    key: 'getResults',
    value: function getResults() {
      return _results;
    }
  }, {
    key: 'handleSearchQuery',
    value: function handleSearchQuery(query) {
      var results = [];

      if (query === '') {
        results = _list;
      } else {
        (0, _lodash.forEach)(_list, function (result) {
          var title = result.peerInfo.title.toLowerCase();
          if (title.includes(query.toLowerCase())) {
            results.push(result);
          }
        });
      }

      _results = results;
    }
  }, {
    key: '__onDispatch',
    value: function __onDispatch(action) {
      switch (action.type) {
        case _ActorAppConstants.ActionTypes.GROUP_LIST_SHOW:
          _isOpen = true;
          this.handleSearchQuery('');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.GROUP_LIST_HIDE:
          _isOpen = false;
          _results = [];
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_SUCCESS:
          _list = action.response;
          this.handleSearchQuery('');
          this.__emitChange();
          break;
        case _ActorAppConstants.ActionTypes.GROUP_LIST_LOAD_ERROR:
          console.error(action.error);
          this.__emitChange();
          break;

        case _ActorAppConstants.ActionTypes.GROUP_LIST_SEARCH:
          this.handleSearchQuery(action.query);
          this.__emitChange();
          break;

        default:
      }
    }
  }]);

  return GroupStore;
})(_utils.Store);

exports.default = new GroupStore(_ActorAppDispatcher2.default);
//# sourceMappingURL=GroupListStore.js.map
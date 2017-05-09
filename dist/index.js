
/*!
 * vir-ui-loadmore v1.1.0
 * (c) 2017 cjg
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vir')) :
	typeof define === 'function' && define.amd ? define(['vir'], factory) :
	(global.VirUiLoadMore = factory(global.Vir));
}(this, (function (Vir) { 'use strict';

Vir = 'default' in Vir ? Vir['default'] : Vir;

var index = function () {
  var _events;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$waterfall = options.waterfall,
      waterfall = _options$waterfall === undefined ? false : _options$waterfall,
      _options$threshold = options.threshold,
      threshold = _options$threshold === undefined ? 200 : _options$threshold,
      _options$buttonSelect = options.buttonSelector,
      buttonSelector = _options$buttonSelect === undefined ? '.more' : _options$buttonSelect;

  return Vir({
    data: {
      data: [],
      state: 'pending'
    },
    events: (_events = {}, _events['click->' + buttonSelector + ''] = 'load', _events),
    watch: {
      data: function data(result) {
        this.render(result.value);
      },
      state: function state(result) {
        if (result.value == 'finish') {
          this.destroy();
        }
      }
    },
    methods: {
      load: function load() {
        var _this = this;

        var state = this.get('state');
        if (state == 'loading' || state == 'finish') {
          return;
        }
        this.set('state', 'loading');
        this.fetch(function (state) {
          _this.set('state', state);
        });
      },
      destroy: function destroy() {
        var space = 'loadmore' + this._uid;
        $(window).off('scroll.' + space + ' resize.' + space);
      },
      fetch: function fetch(done) {},
      render: function render(data) {}
    },
    init: function init() {
      var _this2 = this;

      if (!waterfall) {
        return;
      }

      var $window = $(window);
      var space = 'loadmore' + this._uid;
      $window.on('scroll.' + space + ' resize.' + space, function () {
        if (_this2.get('state') == 'loading') {
          return;
        }
        if ($(document).height() - $window.scrollTop() - $window.height() < threshold) {
          _this2.load();
        }
      });
    }
  });
};

return index;

})));
//# sourceMappingURL=index.js.map

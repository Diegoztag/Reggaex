(function() {
'use strict';

  function text() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        var onlyText = function (inputValue) {
          if (inputValue) {
            var transformInput = inputValue.replace(/[^a-z ñáéíóú]/gi, '');

            if (transformInput !== inputValue) {
              ngModelCtrl.$setViewValue(transformInput);
              ngModelCtrl.$render();
            }
            return transformInput;
          }
          return '';
        };
        ngModelCtrl.$parsers.push(onlyText);
      }
    };
  }

  function number() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var onlyNumber = function (inputValue) {
          if (inputValue) {
            var transformInput = inputValue.replace(/[^0-9]/g, '');

            if (transformInput !== inputValue) {
              ngModelCtrl.$setViewValue(transformInput);
              ngModelCtrl.$render();
            }
            return transformInput;
          }
          return '';
        };
        ngModelCtrl.$parsers.push(onlyNumber);
      }
    };
  }

  function decimal() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var onlyDecimal = function (inputValue) {
          if (inputValue) {
            var transformInput = '';

            if (inputValue[0] === '.') {
              transformInput = inputValue.replace(/[^0-9]/g, '');
            }else {
              transformInput = inputValue.replace(/[^0-9\.]+?([^0-9]{1,2})?$/, '');
            }

            var decimalCheck = transformInput.split('.');

            if(!angular.isUndefined(decimalCheck[1])) {
              decimalCheck[1] = decimalCheck[1].slice(0,2);
              transformInput = decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (transformInput !== inputValue) {
              ngModelCtrl.$setViewValue(transformInput);
              ngModelCtrl.$render();
            }
            return transformInput;
          }
          return '';
        };
        ngModelCtrl.$parsers.push(onlyDecimal);
      }
    };
  }

  function upper() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var toUpper = function (inputValue) {
          if (inputValue) {
            var transformInput = inputValue.replace(/[^a-z0-9 ñáéíóú]/gi, '').toUpperCase();

            if (transformInput !== inputValue) {
              ngModelCtrl.$setViewValue(transformInput);
              ngModelCtrl.$render();
            }
            return transformInput;
          }
          return '';
        };
        ngModelCtrl.$parsers.push(toUpper);
      }
    };
  }

  function lower() {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var toLower = function (inputValue) {
          if (inputValue) {
            var transformInput = inputValue.replace(/[^a-z0-9 ñáéíóú]/gi, '').toLowerCase();

            if (transformInput !== inputValue) {
              ngModelCtrl.$setViewValue(transformInput);
              ngModelCtrl.$render();
            }
            return transformInput;
          }
          return '';
        };
        ngModelCtrl.$parsers.push(toLower);
      }
    };
  }
  angular.module('reggaex').directive('text', 'number', 'decimal', 'upper', 'lower', [
    text, number, decimal, upper, lower
  ]);

})();
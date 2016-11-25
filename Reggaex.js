(function() {
'use strict';

  angular.module('reggaex.directives', [])

  .directive('text', function () {
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
  })

  .directive('number', function () {
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
  })

  .directive('decimal', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        var onlyDecimal = function (inputValue) {
          if (inputValue) {
            var transformInput = '';

            if (inputValue[0] === '.') {
              transformInput = inputValue.replace(/[^0-9]/g, '');
            }else {
              var decimalCheck = transformInput.split('.');

              transformInput = inputValue.replace(/^\D+(?:\.\D)?$/, '');

              if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                transformInput = decimalCheck[0] + '.' + decimalCheck[1];
              }
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
  })

  .directive('upper', function () {
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
  })

  .directive('lower', function () {
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
  });

})();
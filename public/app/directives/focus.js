app.directive('ngfocus', ['$window', "$timeout",
    function ($window, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                $timeout(function () {
                    if (attrs.order) {
                        $(element).focus();
                    }
                }, 300);

                $(element).focus(function () {
                    $(this).addClass("focus");
                });

                $(element).focusout(function () {
                    $(this).removeClass("focus");
                });
            }
        };
    }
]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
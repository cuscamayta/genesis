app.filter('filterDeleteGrid', function () {
    return function (items, expression) {    
        var listFiltered = [];

        angular.forEach(items, function (value) {
            if (value.state !== 0) {
                listFiltered.push(value);              
            }
        });
        return listFiltered;
    };
});
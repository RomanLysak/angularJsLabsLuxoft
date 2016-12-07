angular.module("myapp", [])
    .controller("HelloController", function($scope, $http, $interval) {
        $scope.greeting = "";
        $scope.$watch("name", function() {
            $scope.update();
        });
        $scope.update = function() {
            if ($scope.name) {
                console.log($scope.name);
                $http.get("/greeting",
                    {
                        params: {name: $scope.name}
                    })
                    .success(function (res) {
                        $scope.greeting = res;
                    });
            }
        }
    });
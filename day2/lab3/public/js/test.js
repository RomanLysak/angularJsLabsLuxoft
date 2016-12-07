angular.module("myapp", [])
    .controller("NotesController", function ($scope, $http, $interval) {
        $scope.notes = [];

        var update = function () {
            $http.get("/notes")
                .success(function (res) {
                    $scope.notes = res;
                });
        }

        update();

    });
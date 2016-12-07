angular.module("myapp", [])
    .controller("NotesController", function ($scope, $http, $interval) {

        $scope.notes = [];
        $scope.text;

        $scope.add = function () {
            var note ={'text': $scope.text}
            $http.post("/notes", note)
                .success(function () {
                    $scope.text = "";
                    update();
                });
        }

        var update = function () {
            $http.get("/notes")
                .success(function (res) {
                    $scope.notes = res;
                });
        }

        $scope.delete = function(id) {
            $http.delete("/notes", {
                params: {id: id}
            }).success(function() {
                update();
            });
        }

        $scope.toTop = function(id) {
            $http.put("/notes", {
                params: {id: id}
            }).success(function() {
                update();
            });
        }

        update();

    });
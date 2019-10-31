var JetApp = angular.module('JetApp', []);
JetApp.controller('JetController', function ($scope, $http) {

    $scope.jet = {
        id : null,
        modelName: null,
        serialNumber: null,
        createTime: null
    };
    $scope.isUpdateButtonDisabled = false;
    

    $scope.submitJet = function (jet) {
        console.log(jet);        
        $scope.newJSONJet = angular.toJson($scope.jet, false);
        $http.post("/Home/submitJet", $scope.newJSONJet)
            .then(
                function success(response) {
                    $scope.JetProof = "Success!! --->  '" + jet.modelName + "' was submitted!";
                    console.log('Success! ' + response.status);
                    $scope.clearNewJet();
                },
                function error(response) {
                    console.log('error sending, status: ' + response.status);
                });        
    };

    

    $scope.clearNewJet = function () {
        $scope.jet.id = null;
        $scope.jet.modelName = null;
        $scope.jet.serialNumber = null;
        $scope.jet.createTime = null;
    };

    $scope.getJets = function () {
        $http.get("/Home/JetList")
            .then(function (response) {
                $scope.jets = response.data;
            });
    };


    $scope.takeJetToUpdate = function (jet) {
        $scope.updatingJet = true;
        $scope.jetToBeUpdated = jet;
        $scope.isUpdateButtonDisabled = false;

    };

    $scope.returnToJetList = function () {
        $scope.getJets();
        $scope.updatingJet = false;
        $scope.jetToBeUpdated = null;
    };

    $scope.updateJet = function (jet) {
       
        $scope.updateJSONJet = angular.toJson(jet, false);

        $http.put("/Home/UpdateJet", $scope.updateJSONJet)
            .then(
                function success(response) {
                    $scope.isUpdateButtonDisabled = true;
                    console.log('status: ' + response.status);
                    $scope.updateJSONJet = response.data;
                    console.log($scope.updateJSONJet);
                    $scope.updateStatus = "update successful";
                    $scope.isUpdateButtonDisabled = true;
                },
                function error(response) {
                    console.log('error, return status: ' + response.status);
                    $scope.updateStatus = 'update error, ' + response.data.message;
                }
            );
    };

    $scope.deleteJet = function () {
        console.log("delete jet: " + $scope.jetToBeUpdated.id);
        $scope.deleteJet = angular.toJson($scope.jetToBeUpdated, false);
        $http.post("/Home/deleteJet", $scope.deleteJet)
            .then(
                function success(response) {                    
                    console.log('status: ' + response.status);
                    $scope.updateStatus = "delete successful";                    
                    $scope.returnToJetList();
                },
                function error(response) {
                    console.log('error, return status: ' + response.status);
                    $scope.updateStatus = 'delete error, ' + response.data.message;
                }
            );
    }

    $scope.getJets();

});


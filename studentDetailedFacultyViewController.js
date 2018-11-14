angular.module('student').controller('StudentDetailedFacultyViewController', ['$scope', '$http', func]);

function func($scope, $http) {
    getFacultyInfo()
        .then(f => {
            $scope.faculty = f;
        })
        .catch(e => alert(JSON.stringify(e)));

    function getFacultyInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        const facultyID = urlParams.get('facultyID');
        return $http.get(`/api/faculty/${facultyID}`).then(x => x.data.data);
    }
}

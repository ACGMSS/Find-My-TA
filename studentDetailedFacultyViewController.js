angular.module('student').controller('StudentDetailedFacultyViewController', ['$scope', '$http', func]);

function func($scope, $http) {
    const studentID = sessionStorage.getItem("studentID");
    const username = sessionStorage.getItem("studentUsername");
    const password = sessionStorage.getItem("studentPassword");
    let encoded = btoa(`${username}:${password}`);
    $http.defaults.headers.common.Authorization = `Basic ${encoded}`;

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

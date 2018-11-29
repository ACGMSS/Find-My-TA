angular.module('faculty').controller('FacultyUpdateSectionController', ['$scope', '$http', func]);

function func($scope, $http) {
    const facultyID = sessionStorage.getItem("facultyID");
    const username = sessionStorage.getItem("facultyUsername");
    const password = sessionStorage.getItem("facultyPassword");
    let encoded = btoa(`${username}:${password}`);
    $http.defaults.headers.common.Authorization = `Basic ${encoded}`;
    const urlParams = new URLSearchParams(window.location.search);
    const courseID = urlParams.get('course_id');

    $http.get(`/api/faculty/${facultyID}/${courseID}`)
        .then(response => {
            linkDataToModels();
        }).catch(e => alert(JSON.stringify(e)));
}

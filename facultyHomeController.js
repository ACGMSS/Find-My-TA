angular.module('faculty').controller('FacultyHomeController', ['$scope', '$http', func]);

function func($scope, $http) {
    const facultyID = sessionStorage.getItem("facultyID");
    const username = sessionStorage.getItem("facultyUsername");
    const password = sessionStorage.getItem("facultyPassword");
    $scope.facultyUsername = username;
    let encoded = btoa(`${username}:${password}`);
    $http.defaults.headers.common.Authorization = `Basic ${encoded}`;

    $http.get(`/api/faculty/${facultyID}`)
        .then(c => {
            console.log(c);
            return Promise.all(c.data.data.courses.map(x => {
                return $http.get(`/api/course_section/${x.section}`);
            }));
        })
        .then(responses => {
            console.log(responses);
            $scope.managedCourses = responses.map(x => x.data.data);
        }).catch(e => alert(JSON.stringify(e)));

    $scope.redirectToAddCourse = function() {
        window.location.href = "/faculty-add-course.html";
    };

    $scope.redirectToUpdateAccount = function() {
        window.location.href = "/faculty-update-profile.html";
    };

    $scope.editDetails = function(course) {
        window.location.href = `/faculty-edit-course-information.html?course_id=${course._id}`;
    };

    $scope.stopManagingCourse = function(course) {
        $http.put(`/api/faculty/${facultyID}/drop_course/${course._id}`)
            .then(_ => {
                window.location.href = "/ta-home.html";
            })
            .catch(e => alert(JSON.stringify(e)));
    };
}

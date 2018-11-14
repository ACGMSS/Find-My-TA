angular.module('faculty').controller('FacultyHomeController', ['$scope', '$http', func]);

function func($scope, $http) {
    const facultyID = sessionStorage.getItem("facultyID");
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
}

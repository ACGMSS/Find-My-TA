angular.module('student').controller('StudentHomeController', ['$scope', '$resource', '$http', func]);

function func($scope, $resource, $http) {
    $scope.redirectToAddCourse = function() {
        window.location.href = "/student-add-course.html";
    };

    $scope.enrolledCourses = [
        {
            name: "jess"
        }
    ];

    $http.get(`/api/student/${sessionStorage.getItem("studentID")}`)
        .then(response => {
            return Promise.all(response.data.data.coursesEnrolled.map((courseID) => {
                return $http.get(`/api/course_section/${courseID}`);
            }));
        }).then(responses => {
            $scope.enrolledCourses = responses.map(x => {
                return x.data.data;
            });
            console.log($scope.enrolledCourses);
        }).catch(e => alert(JSON.stringify(e)));
}

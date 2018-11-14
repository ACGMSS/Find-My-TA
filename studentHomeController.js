angular.module('student').controller('StudentHomeController', ['$scope', '$resource', '$http', func]);

function func($scope, $resource, $http) {
    const studentID = sessionStorage.getItem("studentID");

    $scope.redirectToAddCourse = function() {
        window.location.href = "/student-add-course.html";
    };

    $scope.loadDetailedInfo = function(course) {
        window.location.href = `/student-detailed-course-view.html?sectionNumber=${course.sectionNumber}`;
    };

    $scope.dropCourse = function(course) {
        $http.put(`/api/student/${studentID}/drop_course/${course.sectionNumber}`)
            .then(response => {
                window.location.href = "/student-home.html";
            }).catch(error => {
                alert(JSON.stringify(error));
            });
    };

    $http.get(`/api/student/${studentID}`)
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

angular.module('student').controller('StudentAddCourseController', ['$scope', '$resource', '$http', func]);

function func($scope, $resource, $http) {
    $http.get("/api/course_section/list").then(response => {
        $scope.listings = response.data.data;
    });

    $scope.register = function(listing) {
        let student_id = sessionStorage.getItem("studentID");
        let section_id = listing.sectionNumber;
        let url = `/api/student/${student_id}/add_course/${section_id}`;
        $http.put(url).then(response => {
            window.location.href = "/student-home.html";
        }).catch((error) => {
            alert(JSON.stringify(error));
        });
    };
}

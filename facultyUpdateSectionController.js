angular.module('faculty').controller('FacultyUpdateSectionController', ['$scope', '$http', func]);

function func($scope, $http) {
    const facultyID = sessionStorage.getItem("facultyID");
    const username = sessionStorage.getItem("facultyUsername");
    const password = sessionStorage.getItem("facultyPassword");
    $scope.facultyUsername = username;
    let encoded = btoa(`${username}:${password}`);
    $http.defaults.headers.common.Authorization = `Basic ${encoded}`;
    const urlParams = new URLSearchParams(window.location.search);
    const courseID = urlParams.get('course_id');
    let faculty = undefined;

    $http.get(`/api/faculty/${facultyID}`)
        .then(x => {
            faculty = x.data.data;
            let courses = x.data.data.courses;
            let isCourseValid = courses.map(_ => _.section).indexOf(courseID) !== -1;
            if (!isCourseValid) {
                throw "Course not found. Go back";
            }
            $scope.course =
                courses.filter(_ => _.section === courseID)[0];
        }).catch(e => alert(JSON.stringify(e)));

    $scope.addOfficeHours = function() {
        $scope.course.officeHoursTimes.push({
            day: "",
            time: "",
        });
    };

    $scope.deleteOfficeHour = function($index) {
        $scope.course.officeHoursTimes.splice($index, 1);
    };

    $scope.submit = function() {
        if (faculty === undefined) {
            alert("Cannot update after network request failed");
            return;
        }

        faculty.courses = faculty.courses.map(course => {
            if (course.section === courseID) return $scope.course;
            else return course;
        });

        $http.put(`/api/faculty/${facultyID}`, faculty)
            .then(_ => {
                window.location.href = "/ta-home.html";
            }).catch(e => {
                alert(JSON.stringify(e));
            });
    };
}

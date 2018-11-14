angular.module('front-page').controller('FrontPageController', ['$scope',
                                                                '$resource',
                                                                '$http',
                                                                func]);

function func($scope, $resource, $http) {
    const Faculty = $resource("/api/faculty/:id", {
        id: '@id'
    });

    const Student = $resource("/api/student/:id", {
        id: '@id'
    });

    $scope.logInStudent = function() {
        $http.post("/api/student_login", {
            username: $scope.studentUsername,
            password: $scope.studentPassword,
        }).then((response) => {
            sessionStorage.setItem("studentUsername",  $scope.studentUsername);
            sessionStorage.setItem("studentPassword", $scope.studentPassword);
            sessionStorage.setItem("studentID", response.data._id);
            window.location.href = "/student-home.html";
        }).catch((e) => {
            alert(JSON.stringify(e));
        });
    };

    $scope.logInFaculty = function() {
        $http.post("/api/faculty_login", {
            username: $scope.facultyUsername,
            password: $scope.facultyPassword,
        }).then((response) => {
            sessionStorage.setItem("facultyUsername",  $scope.facultyUsername);
            sessionStorage.setItem("facultyPassword", $scope.facultyPassword);
            sessionStorage.setItem("facultyID", response.data._id);
            window.location.href = "/ta-home.html";
        }).catch((e) => {
            alert(JSON.stringify(e));
        });
    };

    $scope.signUpStudent = function() {
        let newStudent = new Student({
            name: "Jess Smith " + Math.random(),
            email: $scope.studentUsername,
            password: $scope.studentPassword,
        });
        newStudent.$save().then(() => {
            sessionStorage.setItem("studentUsername",  $scope.studentUsername);
            sessionStorage.setItem("studentPassword", $scope.studentPassword);
            sessionStorage.setItem("studentID", newStudent.data._id);
            window.location.href = "/student-home.html";
        }).catch(e => {
            alert("Error when creating new student: " + JSON.stringify(e));
            throw e;
        });
    };

    $scope.signUpFaculty = function() {
        window.location.href = "/sign-up-faculty.html";
    };
};

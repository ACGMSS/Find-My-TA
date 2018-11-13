angular.module('front-page').controller('FrontPageController', ['$scope',
                                                                '$resource',
                                                                func]);

function func($scope, $resource) {
    const Faculty = $resource("/api/faculty/:id", {
        id: '@id'
    });

    const Student = $resource("/api/student/:id", {
        id: '@id'
    });

    $scope.logInFaculty = function() {
        alert("Faculty login not yet implemented");
    };

    $scope.logInStudent = function() {
        alert("Student log in not yet implemented");
    };

    $scope.signUpStudent = function() {
        let newStudent = new Student({
            name: "Jess Smith " + Math.random(),
            email: $scope.studentUsername,
            password: $scope.studentPassword,
        });
        newStudent.$save().then(() => {
            sessionStorage.setItem("studentUsername",  $scope.studentUsername);
            sessionStorage.setItem("studentPassword", $scope.stduentPassword);
            sessionStorage.setItem("studentID", newStudent.data._id);
            window.location.href = "/student-home.html";
        }).catch(e => {
            alert("Error when creating new student: " + JSON.stringify(e));
            throw e;
        });
    };

    $scope.signUpFaculty = function() {
        let newFaculty = new Faculty({
            facultyType: "Professor",
            name: "Jess Smith " + Math.random(),
            email: $scope.facultyUsername,
            password: $scope.facultyPassword,
            social: {
                twitterHandle: "definitelyreal",
                linkedinLink: "evenmorereal"
            }
        });
        newFaculty.$save().then(() => {
            sessionStorage.setItem("facultyUsername",  $scope.facultyUsername);
            sessionStorage.setItem("facultyPassword", $scope.facultyPassword);
            // (comment from jess): i wrote this, but it sucks because $resource
            // is supposed to strip away the need to do things like '.data'.
            // I want to change this later.
            sessionStorage.setItem("facultyID", newFaculty.data._id);
            console.log(sessionStorage.getItem("facultyID"));
            window.location.href = "/ta-home.html";
        }).catch(e => {
            alert("Error when creating new faculty: " + JSON.stringify(e));
            throw e;
        });
    };
};

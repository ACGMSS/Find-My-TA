angular.module('faculty').controller("FacultySignUpController", ["$http", '$scope', '$resource', func]);

function func($http, $scope, $resource) {
    const Faculty = $resource("/api/faculty/:id", {
        id: '@id'
    });

    $scope.signUpFaculty = function() {
         let newFaculty = new Faculty({
            facultyType: "Professor",
             name: $scope.name,
            email: $scope.facultyEmail,
            password: $scope.facultyPassword,
            social: {
                twitterHandle: $scope.twitter,
                linkedinLink: $scope.linkedin
            }
        });
        newFaculty.$save().then(() => {
            sessionStorage.setItem("facultyUsername",  $scope.facultyEmail);
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
}

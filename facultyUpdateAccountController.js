angular.module('faculty').controller("FacultyUpdateAccountController", ["$http", '$scope', '$resource', func]);

function func($http, $scope, $resource) {
    $http.get(`/api/faculty/${sessionStorage.getItem("facultyID")}`)
        .then((faculty) => {
            faculty = faculty.data.data;
            $scope.facultyEmail = faculty.email;
            $scope.facultyPassword = faculty.password;
            $scope.name = faculty.name;
            $scope.twitter = faculty.social.twitterHandle;
            $scope.linkedin = faculty.social.linkedinLink;
            $scope.updateAccount = function() {
                let modified = {
                    email: $scope.facultyEmail,
                    password: $scope.facultyPassword,
                    name: $scope.name,
                    social: {
                        twitterHandle: $scope.twitter,
                        linkedinLink: $scope.linkedin,
                    },
                };
                $http.put(`/api/faculty/${sessionStorage.getItem("facultyID")}`, modified)
                    .then((response) => {
                        sessionStorage.setItem("facultyUsername",  $scope.facultyEmail);
                        sessionStorage.setItem("facultyPassword", $scope.facultyPassword);
                        window.location.href = "/ta-home.html";
                    }).catch(e => alert(JSON.stringify(e)));
            };
        }).catch(e => alert(JSON.stringify(e)));
}

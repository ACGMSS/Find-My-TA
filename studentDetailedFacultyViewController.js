angular.module('student').controller('StudentDetailedFacultyViewController', ['$scope',
                                                                              '$http',
                                                                              '$sce',
                                                                              func]);

function func($scope, $http, $sce) {
    const studentID = sessionStorage.getItem("studentID");
    const username = sessionStorage.getItem("studentUsername");
    const password = sessionStorage.getItem("studentPassword");
    $scope.studentUsername = username;
    let encoded = btoa(`${username}:${password}`);
    $http.defaults.headers.common.Authorization = `Basic ${encoded}`;

    getFacultyInfo()
        .then(f => {
            $scope.faculty = f;
            $scope.twitterHandle = f.social.twitterHandle;
            $scope.linkedinLink = f.social.linkedinLink;
            $scope.rateMyProfessorURL = $sce.trustAsResourceUrl(
                `https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+of+Florida&schoolID=1100&query=${f.name}`);
            })
        .catch(e => alert(JSON.stringify(e)));

    function getFacultyInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        const facultyID = urlParams.get('facultyID');
        return $http.get(`/api/faculty/${facultyID}`).then(x => x.data.data);
    }


}
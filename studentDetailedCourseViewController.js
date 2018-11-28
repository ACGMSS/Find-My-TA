angular.module('student').controller("StudentDetailedCourseViewController", ["$scope", "$http", func]);

function func($scope, $http) {
    const studentID = sessionStorage.getItem("studentID");
    const username = sessionStorage.getItem("studentUsername");
    const password = sessionStorage.getItem("studentPassword");
    let encoded = btoa(`${username}:${password}`);
    $http.defaults.headers.common.Authorization = `Basic ${encoded}`;

    getSectionAndAdministrators()
        .then(result => {
            var s = result.section.meetingSettings;
            $scope.meetingTimes = s.map(setting => {
                return {
                    meetingTime: setting.meetDays.join(",") + ": " + setting.meetPeriodBegin + "-" + setting.meetPeriodEnd,
                    meetingPlace: setting.meetBuilding + ": " + setting.meetRoom
                };
            });
            console.log(result);
            $scope.admins = result.admins;
        }).catch(e => alert(JSON.stringify(e)));

    function getSectionAndAdministrators() {
        const urlParams = new URLSearchParams(window.location.search);
        const sectionNumber = urlParams.get('sectionNumber');
        return $http.get(`/api/detailed_section/${sectionNumber}`)
            .then(result => {
                return result.data;
            });
    }

    $scope.viewDetailedAdmin = function(admin) {
        const facultyID = admin._id;
        window.location.href = `/student-detailed-faculty-view.html?facultyID=${facultyID}`;
    };
}

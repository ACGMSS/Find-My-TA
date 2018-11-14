angular.module('student').controller("StudentDetailedCourseViewController", ["$scope", "$http", func]);

function func($scope, $http) {
    getSectionAndAdministrators()
        .then(result => {
            var s = result.section.meetingSettings;
            $scope.meetingTimes = s.map(setting => {
                return {
                    meetingTime: setting.meetDays.join(",") + ": " + setting.meetPeriodBegin + "-" + setting.meetPeriodEnd,
                    meetingPlace: setting.meetBuilding + ": " + setting.meetRoom
                };
            });

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
}

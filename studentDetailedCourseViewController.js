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
                let meetingStart = stringPeriodToHours(setting.meetPeriodBegin).start,
                    meetingEnd = stringPeriodToHours(setting.meetPeriodEnd).end;
                return {
                    meetingTime: `${setting.meetDays.join(",")}: ${meetingStart} - ${meetingEnd}`,
                    meetingPlace: setting.meetBuilding + ": " + setting.meetRoom
                };
            });
            console.log(result);
            $scope.admins = result.admins;
        }).catch(e => alert(JSON.stringify(e)));

    function stringPeriodToHours(x) {
        let dict = {
            1: { start: "7:25 AM", end: "8:15 AM" },
            2: { start: "8:30 AM", end: "9:20 AM" },
            3: { start: "9:35 AM", end: "10:25 AM" },
            4: { start: "10:40 AM", end: "11:30 AM" },
            5: { start: "11:45 AM", end: "12:35 PM" },
            6: { start: "12:50 PM", end: "1:40 PM" },
            7: { start: "1:55 PM", end: "2:45 PM" },
            8: { start: "3:00 PM", end: "3:50 PM" },
            9: { start: "4:05 PM", end: "4:55 PM" },
            10:{ start:  "5:10 PM", end: "6:00 PM" },
            11:{ start:  "6:15 PM", end: "7:05 PM" },
            E1:{ start:  "7:20 PM", end: "8:10 PM" },
            E2:{ start:  "8:20 PM", end: "9:10 PM" },
            E3:{ start:  "9:20 PM", end: "10:10 PM" },
        };
        if (dict[x] !== undefined) return dict[x];
        alert(`Could not translate period ${x} to hours`);
        return `Period ${x}`;
    }

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

    $scope.jumpToLocation = function(lat, lng) {
        placeMarker(lat, lng);
    };
}

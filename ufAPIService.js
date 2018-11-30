angular.module('faculty').service('UFAPIService', ['$http', function ($http) {
    const baseURL = "https://one.ufl.edu/apix/soc/schedule/";
    const proxyURL = "http://cors-anywhere.herokuapp.com/";
    function encodeRequestToProxy(queryString) {
        let realUrl = baseURL + '?' + queryString;
        return `https://cors-anywhere.herokuapp.com/${realUrl}`;
    }

/**
   - semester
   - category (what's this)
   - course code
   - course title
   - instructor (does this need to be an exact match?)
*/
    function queryUFCourses(query) {
        let courses = [];
        return loop(0);

        function loop(lastControlNumber) {
            let queryString = "";
            function modifyIfNotNull(field) {
                if (query.hasOwnProperty(field)) {
                    if (queryString !== "") {
                        queryString = queryString + "&";
                    }
                    queryString = queryString + `${field}=${query[field]}`;
                }
            }
            modifyIfNotNull("dept");
            modifyIfNotNull("term");
            queryString += `&last-control-number=${lastControlNumber}`;
            console.log("UF Courses Query: " + queryString);
            return $http.get(encodeRequestToProxy(queryString), {
                headers: {
                    'X-Requested-With': 'foobar'
                }
            }).then(function(response) {
                let done = response.data[0].RETRIEVEDROWS === 0;
                if (done) {
                    return courses;
                } else {
                    courses.push(...response.data[0].COURSES);
                    return loop(response.data[0].LASTCONTROLNUMBER);
                }
            });
        }
    }

    return function() {
        this.queryUFCourses = queryUFCourses;
        return this;
    };
}]);

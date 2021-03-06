angular.module('student').controller('FutureCoursesController',
                                     ['$scope', 'UFAPIService', '$resource', '$http', func]);

function func($scope, UFAPIService, $resource, $http) {
    const studentID = sessionStorage.getItem("studentID");
    const username = sessionStorage.getItem("studentUsername");
    const password = sessionStorage.getItem("studentPassword");
    let encoded = btoa(`${username}:${password}`);
    $http.defaults.headers.common.Authorization = `Basic ${encoded}`;
    $scope.studentUsername = username;

    function updateListingsForDepartment(department) {
        UFAPIService().queryUFCourses({
            dept: department,
            term: 2188
        }).then(function (courses) {
            $scope.listings = courses;
        }).catch(e => alert(JSON.stringify(e)));
    }

    $scope.seeSections = function(listing) {
        $scope.selectedListing = listing;
    };

    $scope.departments = {
        "Zoology": "16900700",
        "Pharmacy-Pharmacy Outcomes and Policy": "32050000",
        "Accounting, Fisher School of": "17030000",
        "Education-Human Devel and Org Studies in Ed": "18070000",
        "Electrical and Computer Engineering": "19050000",
        "Nursing": "31010000",
        "Medicine-Emergency Medicine": "29290200",
        "Pharmacy-Pharmacy Practice": "32060000",
        "College of Public Health & Health Professions": "33000000",
        "Clinical/Health Psychology": "33070000",
        "Health Education and Behavior": "26050000",
        "Interdisciplinary Studies": "16000000",
        "Medicine-Obstetrics & Gynecology": "29070000",
        "Medicine-Medicine": "29050000",
        "Flexible Learning": "52033000",
        "Jewish Studies": "16740000",
        "Plant Pathology": "60190000",
        "New World School of the Arts-Visual Arts": "13100200",
        "Medicine-Anatomy": "29260000",
        "Medicine-Aging/Geriatric Research": "29310000",
        "Womens Studies": "16800000",
        "Soil and Water Science": "60210000",
        "Medicine-Pathology": "29080000",
        "Geomatics - SFRC": "60466000",
        "Comparative, Diagnostic & Population Medicine": "28060000",
        "Forest Resources and Conservation - SFRC": "60460000",
        "Family, Youth, and Community Sciences": "60320000",
        "Geography": "16220000",
        "Medicine-Pharmacology & Therapeutics": "29100000",
        "Agricultural and Biological Engineering": "60070000",
        "Agricultural & Life Sciences-General": "60030000",
        "Education-Spec Ed/Schl Psych/Early Child Stu": "18080000",
        "Geology": "16240000",
        "First Year Florida": "16010000",
        "Pharmacy-Medicinal Chemistry": "32030000",
        "Astronomy": "16060000",
        "Digital Worlds Institute": "13050000",
        "Honors Office": "2030000",
        "Medicine-Neurological Surgery": "29190000",
        "Medicine-General": "29010000",
        "Writing Program": "2060000",
        "Natural Resources and Environment, School of": "60170000",
        "Spanish": "16880300",
        "Tourism Recreation and Sport Management": "26020000",
        "Languages, Literatures & Cultures-Italian": "16861400",
        "Medicine-Ophthalmology": "29150000",
        "Physics": "16360000",
        "Environmental Horticulture": "60180000",
        "Environmental Engineering Science": "19100000",
        "Fisheries & Aquatic Science - SFRC": "60469000",
        "Finance": "17060000",
        "Languages, Literatures & Cultures-Swahili": "16862000",
        "Languages, Literatures & Cultures-Vietnamese": "16862200",
        "Food and Resource Economics": "60060000",
        "Agricultural Education and Communication": "60260000",
        "New World School of the Arts-Theatre": "13100400",
        "Arts-General": "13010000",
        "Medicine-Otolaryngology": "29210000",
        "Religion": "16420000",
        "English": "16200000",
        "Medicine-Pediatrics": "29090000",
        "Languages, Literatures & Cultures-French": "16860900",
        "Journalism": "23040000",
        "Music": "13030000",
        "Military Science-Navy": "25050000",
        "Occupational Therapy": "33030000",
        "Languages, Literatures & Cultures-Russian": "16861800",
        "Medicine-Molecular Genetics & Microbiology": "29060000",
        "Materials Science and Engineering": "19090000",
        "Behavioral Science & Community Health": "33040000",
        "Medicine-Community Health and Family Medicine": "29160000",
        "Latin American Studies": "57140000",
        "Applied Physiology & Kinesiology": "26030000",
        "Medicine-Neuroscience": "29020000",
        "Dentistry-Endodontics": "34110000",
        "Info Systems and Operations Management": "17070000",
        "Large Animal Clinical Science": "28040000",
        "Mass Communication": "23200000",
        "Languages, Literatures & Cultures-Czech": "16860700",
        "Design, Construction & Planning-General": "15010000",
        "Dentistry-General": "34010000",
        "New World School of the Arts-Music": "13100300",
        "Small Animal Clinic Science": "28090000",
        "Languages, Literatures & Cultures-Arabic": "16860500",
        "Economics": "16030000",
        "Horticultural Sciences": "60230000",
        "Classics-Greek Studies": "16140300",
        "Classics": "16140000",
        "Urban and Regional Planning": "15060000",
        "Dentistry-Periodontics": "34130000",
        "Telecommunication": "23030000",
        "Entomology and Nematology": "60140000",
        "Food Science and Human Nutrition": "60150000",
        "Biomedical Engineering": "19340000",
        "Microbiology and Cell Science": "60100000",
        "Portuguese": "16880500",
        "Statistics": "16480000",
        "Veterinary Medical Sciences": "28011100",
        "Chemistry": "16120000",
        "Theatre and Dance": "13040000",
        "Medicine-Anesthesiology": "29040000",
        "Languages, Literatures & Cultures-Chinese": "16860600",
        "Dentistry-Orthodontics": "34070000",
        "Public Health & Health Professions - Undergrad": "33010000",
        "Sociology": "16920500",
        "Marketing": "17080000",
        "Medicine-School of Physician Assistant Studies": "29710000",
        "Chemical Engineering": "19030000",
        "Mechanical/Aerospace Engineering": "19020000",
        "Medicine-Radiology": "29130000",
        "New World School of the Arts-Dance": "13100500",
        "European Studies": "16660000",
        "Mathematics": "16320000",
        "Architecture, School of": "15020000",
        "Botany": "16900500",
        "Construction Management, Rinker School of": "15030000",
        "Education-Teaching and Learning": "18050000",
        "Health Services Administration": "33080000",
        "Innovation Academy": "2070400",
        "Epidemiology": "36020000",
        "Physical Therapy": "33050000",
        "Military Science-Air Force": "25020000",
        "Medicine-Psychiatry": "29120000",
        "Dentistry-Prosthodontics": "34140000",
        "Business Admin-General": "17010000",
        "Rehabilitation Science Doctoral Program": "33120000",
        "Wildlife Ecology and Conservation": "60470000",
        "Languages, Literatures & Cultures-Wolof": "16862300",
        "Environmental and Global Health": "33160000",
        "Advertising": "23020000",
        "Medicine-Radiation Oncology": "29200000",
        "Languages, Literatures & Cultures-German": "16861000",
        "Languages, Literatures & Cultures-Haitian/Creo": "16861100",
        "African American Studies": "16620000",
        "Medicine-Biochemistry/Molecular Biology": "29030000",
        "Engineering-General": "19400000",
        "Medieval & Early Modern Studies": "16820000",
        "Political Science": "16380000",
        "Agronomy": "60080000",
        "Languages, Literatures & Cultures-Amharic": "16860400",
        "Medicine-Physiology": "29110000",
        "Biological Sciences": "16900300",
        "Philosophy": "16340000",
        "Languages, Literatures & Cultures-Polish": "16861700",
        "African Studies": "16600000",
        "Speech, Language, and Hearing Sciences": "33060000",
        "Industrial and Systems Engineering": "19060000",
        "Languages, Literatures & Cultures": "16860000",
        "Linguistics": "16300000",
        "Classics-Latin": "16140500",
        "Anthropology": "16040000",
        "Art and Art History": "13020000",
        "Management": "17020000",
        "Criminology": "16920300",
        "Written & Oral Communication, Dial Center": "16580100",
        "Landscape Architecture": "15040000",
        "Medicine-Neurology": "29180000",
        "Medicine-Orthopaedics and Rehabilitation": "29170000",
        "History": "16280000",
        "Languages, Literatures & Cultures-Akan": "16860300",
        "Animal Sciences": "60090000",
        "Agricultural Operations Management": "60079998",
        "Military Science-Army": "25010000",
        "Biostatistics": "36010000",
        "Public Relations": "23060000",
        "Medicine-Health Outcomes and Policy": "29240100",
        "Civil and Coastal Engineering": "19040000",
        "Interior Design": "15050000",
        "Languages, Literatures & Cultures-Yoruba": "16862500",
        "Nuclear and Radiological Engineering": "19080000",
        "Physiological Science": "28050000",
        "Pathobiology": "28100000",
        "Computer & Information Science & Engineering": "19140000",
        "Dentistry-Oral Biology": "34030000",
        "Languages, Literatures & Cultures-Japanese": "16861500",
        "Packaging Sciences": "60079999",
        "Dentistry-Oral & Maxillofacial Diagnostic Sci": "34160000",
        "Medicine-Surgery": "29140000",
        "Pharmacy-Pharmacodynamics": "32040000",
        "Psychology": "16400000",
        "Languages, Literatures & Cultures-Hebrew": "16861200",
        "Pharmacy-Pharmaceutics": "32020000"
    };

    $scope.updateListings = function() {
        updateListingsForDepartment($scope.department);
    };

    $scope.department = "19140000"; // CS
    $scope.updateListings();

    $scope.displaySectionInformation = function(listing, index) {
        let section = listing.sections[index];
        let friendlyMeetingSettings = section.meetTimes.map(x => {
            x.friendlyTime = `${stringPeriodToHours(x.meetPeriodBegin).start} - ${stringPeriodToHours(x.meetPeriodEnd).end}`;
            return x;
        });
        $scope.section = {
            stringProperties: {
                Name: listing.name,
                Code: listing.code,
                Description: listing.description,
                "Section Number": section.classNumber,
                Prerequisites: listing.prerequisites,
                Year: 2019,
                Semester: "Spring"
            },
            friendlyMeetingSettings,
        };
    };

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
}

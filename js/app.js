var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope', '$location', '$anchorScroll', '$http', function($scope, $location, $anchorScroll, $http) {
    //$scope.firstName= "John";
    //$scope.lastName= "Doe";
    $scope.headerOptionList = ['Home', 'About Us', 'Our Products', 'Facilities', 'Quality Assurance', 'Contact Us'];
    $scope.currentHeaderOption = 'Home';
    $scope.flags = {};
    $scope.flags.homeSection = true;
    $scope.flags.contactUsSection = false;
    $scope.flags.aboutUsSection = false;
    $scope.ourApplicationList = ['Marine Parts', 'Rolling Mill', 'Sugar Mill', 'Valve Industries', 'Crusher', 'Dam Gate','Earth Moving Equipments parts','gear','flywheel', 'Fertilizer Machinery & More Industries...'];
    $scope.moreAboutDetails = [
        'Madhav Techno Cast Factory is a manufacturing process where molten, liquid metal is poured into a mold and is left to cool to conform to the mold’s shape when solidified.',
        'We, at Madhav Techno Cast are engaged in Manufacturing of a wide range of Steel casting and S.G.I. and C.I.Casting in different metallurgical speciﬁcations.',
        'These includes WCB Casting, Manganese Steel &amp; Carbon Steel Casting, Nickel and Molly based Casting, EN Series Casting etc.',
        'Our well developed infrastructure with complete production facilities spread over an area of 1800 sq. meters. Casting foundry experience more than 15 years.',
        'Manufacture highest quality casting at very competitive rate and provide prompt delivery to all customers in India and outside India.',
        'The Company Manufactures products for customers who expect perfection. Our Casting capacity range is between 20 kg to 2500 kg single piece.',
    ];
    $scope.ourProductList = [
        {"productName":"Carbon Steel RING","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/plaincarbon.jpeg"},
        {"productName":"MS Padastals","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/padastals.jpeg"},
        {"productName":"Corrosion Resistance Stainless Steel","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/ss varam.jpg"},
        {"productName":"en8 en9 wheels","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/trolley wheel.jpg"},
        {"productName":"Manganese Steel", "productImagePath":"MADHAV/Products/couplings.jpeg"},
        {"productName":"Abrasive resistant Casting","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/abrasiveResistantCasting.jpg"},
        {"productName":"S.G.I. and C.I. Casting","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/ci and sgi casting.jpeg"},
        {"productName":"en19 en24 castings","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/en24pipes.jpeg"},
        {"productName":"All other grades as per customer’s speciﬁcation","ProductUrl":"/carbonsteel.html", "productImagePath":"MADHAV/Products/allOtherGrades.jpg"}
    ];
    $scope.facilitiesList = [
        'Power Connection 450 KVA.',
        'Induction Furnace with Melting capacity is 2500 Kg, 1000Kg, 200Kg and 150Kg Crucible–Inductotherm India Pvt Ltd.',
        'Co2 & 2Part sand hand moulding.',
        'Mach plate patterns.',
        'Chemical Test : Spectrometer ( Fe and Ni Base ) with 24 elements – Metal Power Analytical India Pvt Ltd.',
        'Mechanical Test : NABL Approved laboratory test certiﬁcate will be provided if required.',
        'Heat Treatment : 7 Feet x 7 Feet x 5 Feet in house furnace.',
        'Shot Blasting Machine : 6 Feet x 6 Feet x 5 Feet – double door shot blast machine in House.'
    ];
    $scope.homeSliderList = [
        {"h1Text":"Techno Cast Solution", "h1BelowText":"Implement your innovation with advanced Manufacturing Technology", "bgImagePath":"MADHAV/Home_Slider/Home_1.jpg"},
        {"h1Text":"Techno Cast Solution", "h1BelowText":"Implement your innovation with advanced Manufacturing Technology", "bgImagePath":"MADHAV/Home_Slider/Home_2.jpg"},
        {"h1Text":"Techno Cast Solution", "h1BelowText":"Implement your innovation with advanced Manufacturing Technology", "bgImagePath":"MADHAV/Home_Slider/Home_3.jpg"},
        {"h1Text":"Techno Cast Solution", "h1BelowText":"Implement your innovation with advanced Manufacturing Technology", "bgImagePath":"MADHAV/Home_Slider/Home_4.jpg"}
    ];
    
    $scope.onClickHeader = function(currentOption) {
        if(currentOption == 'Home') {
            $scope.flags.contactUsSection = false;
            $scope.flags.homeSection = true;
            $scope.flags.aboutUsSection = false;
            $scope.flags.ourProductSection = false;
            $scope.flags.ourFacilitiesSection = false;
            $scope.flags.ourQualitiesSection = false;
        } else if(currentOption == 'Contact Us') {
            $scope.flags.contactUsSection = true;
            $scope.flags.homeSection = false;
            $scope.flags.aboutUsSection = false;
            $scope.flags.ourProductSection = false;
            $scope.flags.ourFacilitiesSection = false;
            $scope.flags.ourQualitiesSection = false;
        } else if(currentOption == 'About Us') {
            $scope.flags.contactUsSection = false;
            $scope.flags.homeSection = false;
            $scope.flags.aboutUsSection = true;
            $scope.flags.ourProductSection = false;
            $scope.flags.ourFacilitiesSection = false;
            $scope.flags.ourQualitiesSection = false;
        } else if(currentOption == 'Our Products') {
            $scope.flags.contactUsSection = false;
            $scope.flags.homeSection = false;
            $scope.flags.aboutUsSection = false;
            $scope.flags.ourProductSection = true;
            $scope.flags.ourFacilitiesSection = false;
            $scope.flags.ourQualitiesSection = false;
        } else if(currentOption == 'Facilities') {
            $scope.flags.contactUsSection = false;
            $scope.flags.homeSection = false;
            $scope.flags.aboutUsSection = false;
            $scope.flags.ourProductSection = false;
            $scope.flags.ourFacilitiesSection = true;
            $scope.flags.ourQualitiesSection = false;
        } else if(currentOption == 'Quality Assurance') {
            $scope.flags.contactUsSection = false;
            $scope.flags.homeSection = false;
            $scope.flags.aboutUsSection = false;
            $scope.flags.ourProductSection = false;
            $scope.flags.ourFacilitiesSection = false;
            $scope.flags.ourQualitiesSection = false;
            $scope.flags.ourQualitiesSection = true;
        }
        $scope.gotoSpecificSection('tbjProductOverview');
    }

    angular.element('html,body').animate({
  	  scrollTop: 0
    }, 500);

    $scope.gotoSpecificSection = function(sectionId){
    	$location.hash(sectionId);
    	$anchorScroll.yOffset = 80;
        $anchorScroll();
        $location.hash('');
        $location.replace();
	}

    $scope.insertdata = function() {
    	$http.post("insert.php", {'name':$scope.USERNAME, 'email':$scope.EMAIL, 'mobileNo':$scope.MOBILE_NO, 'subject':$scope.SUBJECT, 'message':$scope.MESSAGE}).then(function () {
            //alert("Successfully submitted");
            $('#alertPopup').modal('show');
        });
	}

    $scope.gotoSpecificSection('tbjProductOverview');

}]);
var registerMoreModel = function () {
    var self = this;
    self.educationList = ['大专', '本科', '硕士', '博士', 'MBA', 'EMBA', '中专', '中技', '高中', '初中', '其他'];
    self.selectedEducation = ko.observable("");
    self.bloodTypeList = ['A型', 'B型', 'O型', 'AB型'];
    self.selectedBloodType = ko.observable("");
    self.exerciseList = ['1', '2', '3', '4', '5', '6', '7'];
    self.selectedExercise = ko.observable("");
    self.selectedSex = ko.observable("male");
    self.locationList = [];
    self.selectedState = ko.observable("");
    self.selectedCity = ko.observable("");
    self.selectedRegion = ko.observable("");
    self.selectedShow = ko.observable("");

    self.setSex = function (sex) {
        if (sex != self.selectedSex()) {
            self.selectedSex(sex);
        }
    }

    self.setEducation = function (education) {
        if (education != self.selectedEducation()) {
            self.selectedEducation(education);
        }
    }

    self.setState = function (state) {
        if (state != self.selectedState()) {
            self.selectedState(state);
            self.selectedCity("");
            self.selectedRegion("");
        }
    }

    self.setCity = function (city) {
        if (city != self.selectedCity()) {
            self.selectedCity(city);
            self.selectedRegion("");
        }
    }

    self.setRegion = function (region) {
        if (region != self.selectedRegion()) {
            self.selectedRegion(region);
        }
    }

    self.setExercise = function (exercise) {
        if (exercise != self.selectedExercise()) {
            self.selectedExercise(exercise);
        }
    }

    self.setBloodType = function (bloodType) {
        if (bloodType != self.selectedBloodType()) {
            self.selectedBloodType(bloodType);
        }
    }

    self.setShow = function (showItem) {
        if (showItem != self.selectedShow()) {
            self.selectedShow(showItem);
        }
        else if (showItem != "") {
            self.selectedShow("")
        }
    }

}

var rmModel = new registerMoreModel();

var initLocation = new Promise(function (resolve, reject) {
    var params = {
        sCallback: function (data) {
            rmModel.locationList = data;
            resolve('success');
        },
    };
    CommonTools.getLocation(params);
});

$(function () {
    initLocation.then(function () {
        ko.applyBindings(rmModel);
    })
})

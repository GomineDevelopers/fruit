var registerMoreModel = function () {
    var self = this;
    self.educationList = ['大专', '本科', '硕士', '博士', 'MBA', 'EMBA', '中专', '中技', '高中', '初中', '其他'];
    self.selectedEducation = ko.observable("");
    self.blood = ['A型', 'B型', 'O型', 'AB型'];
    self.motionFrequency = ['1', '2', '3', '4', '5', '6', '7'];
    self.selectedSex = ko.observable("male");
    self.selectedShow = ko.observable("");

    self.locationList = [];
    self.state = ko.observable();
    self.city = ko.observable();
    self.region = ko.observable();

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

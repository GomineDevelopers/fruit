var registerMoreModel = function () {
    var self = this;
    self.education = ['大专','本科','硕士','博士','MBA','EMBA','中专','中技','高中','初中','其他'];
    self.selectedEducation = ko.observable();
    self.blood = ['A型','B型','O型','AB型'];
    self.motionFrequency = ['1','2','3','4','5','6','7'];

    self.locationList = [];
    self.state = ko.observable();
    self.city = ko.observable();
    self.region = ko.observable();

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

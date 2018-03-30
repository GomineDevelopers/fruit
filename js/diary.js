var diaryViewModel = function () {
    var self = this;
    self.pageSize = 6;
    self.currentPage = 1;
    self.finish = ko.observable(false);
    self.diaryList = ko.observableArray([]);
}

var dModel = new diaryViewModel();
ko.applyBindings(dModel);

var getData = function (pageIndex) {
    var params = {
        url: 'index/index/productlist',
        type: 'get',
        data: {
            limit: dModel.pageSize,
            page: dModel.currentPage,
        },
        sCallback: function (res) {
            // 重置加载flag
            loading = false;
            if (res && res.code == 200) {
                var mappingList = {
                    'create_time': {
                        create: function (options) {
                            return "【活动时间】" + CommonTools.formatDate(options.data);
                        }
                    },
                }

                var newList = res.data.list.data;
                if (res.data.list.current_page == 1) {
                    ko.mapping.fromJS(newList, mappingList, dModel.diaryList);
                }
                else {
                    var list = dModel.diaryList();
                    for (var i = 0; i < newList.length; i++) {
                        list.push(newList[i]);
                    }
                    ko.mapping.fromJS(list, mappingList, dModel.diaryList);
                }

                if (res.data.list.current_page == res.data.list.last_page) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    dModel.finish(true);
                    return;
                }
                else {
                    dModel.currentPage++;
                }

                $.refreshScroller();
            }
            else {
                alert(res.msg);
            }
        },
        eCallback: function (e) {
            // 重置加载flag
            loading = false;
        }
    };
    CommonTools.getData(params);
}

var loading = false;
// 注册'infinite'事件处理函数
$('.infinite-scroll').on('infinite', function () {
    // 如果正在加载，则退出
    if (loading) return;
    // 设置flag
    loading = true;
    getData();
});

$(function () {
    getData();
    $.init();
});



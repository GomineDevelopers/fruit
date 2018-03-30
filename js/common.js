var CommonTools = {};
var g_restUrl = "";

if (window.location.host == "icampaign.com.cn")
    var g_restUrl = 'http://icampaign.com.cn/guizhou/useradmin/';
else
    g_restUrl = 'http://192.168.0.191/';

CommonTools.formatDate = function (date, showDetail) {
    var isShow = showDetail || false;
    var d = new Date(parseInt(date) * 1000)
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date1 = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    if (isShow)
        return year + "-" + month + "-" + date1 + " " + hour + ":" + minute + ":" + second;
    else
        return year + "-" + month + "-" + date1;
}

CommonTools.getData = function (params) {
    if (!params.type) {
        params.type = 'get';
    }
    var that = this;
    $.ajax({
        type: params.type,
        url: g_restUrl + params.url,
        data: params.data,
        beforeSend: function (XMLHttpRequest) {
            if (params.tokenFlag) {
                XMLHttpRequest.setRequestHeader('token', that.getLocalStorage('token'));
            }
        },
        success: function (res) {
            if (res.error_code && res.error_code == 10001) {
                window.location.href = 'login.html';
            }
            else {
                params.sCallback && params.sCallback(res);
            }
        },
        error: function (res) {
            params.eCallback && params.eCallback(res);
        }
    });
};








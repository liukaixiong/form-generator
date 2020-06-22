import axiosRequest from '@/utils/axiosRequest'
import $ from 'jquery';

export default {
    ajax: function(url, type, data) {
        var result = {};
        $.ajax({
            url: url,//url路径
            type: type, //GET
            async: false, //或false,是否异步
            data: data,
            timeout: 5000, //超时时间
            dataType: 'json', //返回的数据格式：
            beforeSend: function (xhr) {
            },
            success: function (data, textStatus, jqXHR) {
                result = data;
            },
            error: function (xhr, textStatus) {
                console.log('小程序cookie获取失败---->' + textStatus);
            },
            complete: function () {

            }
        })
        return result;
    },
    request : function(url, type, data) {
        return axiosRequest.request({
            url: url,
            method: type,
            data: data
        })
    }
}
exports.response = function (data, message, isSuccess) {
    isSuccess = isSuccess == undefined ? true : false;
    return { isSuccess: isSuccess, message: message, data: data };
};

exports.formatDate = function (val, format) {
    if (!format)
        return val.split("/")[2] + "/" + val.split("/")[1] + "/" + val.split("/")[0];

    return val.split("/")[2] + "/" + val.split("/")[0] + "/" + val.split("/")[1];
};
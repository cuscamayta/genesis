exports.response = function (data, message, isSuccess) {
    isSuccess = isSuccess == undefined ? true : false;
    return { isSuccess: isSuccess, message: message, data: data };
}
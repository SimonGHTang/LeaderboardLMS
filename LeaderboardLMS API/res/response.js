function success(res, message, data) {
    return res.status(200).send({ status: "success", message: message, payload: data});
}

function error(res, message, data) {
    return res.status(400).send({ status: "error", message: message, payload: data});
}

function fail(res, message, data) {
    return res.status(200).send({status: "fail", message: message, payload: data});
}

module.exports = {
    success,
    error,
    fail
};
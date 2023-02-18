var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": status.msg });
    } else {
        res.send({ "status": false, "message": status.msg });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.searchuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var putUserControllerFunc = async (req, res) =>  {
    try {
        console.log(req.body);
        var status = await userService.putUserDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": status.msg});
        } else {
            res.send({ "status": false, "message": status.msg });
        }
    }
    catch(err) {
        console.log(err);
    }
}

var deleteUserControllerFunc = async (req, res) =>  {
    try {
        console.log(req.body);
        var status = await userService.deleteUserDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": status.msg });
        } else {
            res.send({ "status": false, "message": status.msg });
        }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, deleteUserControllerFunc, putUserControllerFunc};

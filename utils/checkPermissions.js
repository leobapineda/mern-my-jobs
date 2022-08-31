import { Unauthenticated } from "../errors/index.js";

function checkPermissions(requestUser, jobUserId) {
        //this is usefull if we have different roles and only the admin can access this route
    // if(requestUser.role === "admin") return
    if (requestUser.userID === jobUserId.toString()) return
    throw new Unauthenticated("Not authorized to access this route")

}

export default checkPermissions;
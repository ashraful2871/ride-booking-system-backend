"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.IsActive = void 0;
var IsActive;
(function (IsActive) {
    IsActive["Active"] = "ACTIVE";
    IsActive["InActive"] = "IN-ACTIVE";
    IsActive["Blocked"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
var Role;
(function (Role) {
    Role["RIDER"] = "RIDER";
    Role["DRIVER"] = "DRIVER";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
})(Role || (exports.Role = Role = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConditionType;
(function (ConditionType) {
    ConditionType[ConditionType["TRIGGER"] = 0] = "TRIGGER";
    ConditionType[ConditionType["SCHEDULE"] = 1] = "SCHEDULE";
})(ConditionType || (ConditionType = {}));
var CheckType;
(function (CheckType) {
    CheckType[CheckType["COMPARE"] = 0] = "COMPARE";
    CheckType[CheckType["MATCH"] = 1] = "MATCH";
})(CheckType || (CheckType = {}));

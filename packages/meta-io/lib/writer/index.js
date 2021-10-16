"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dump = exports.writeSync = exports.write = void 0;
const js_yaml_1 = require("js-yaml");
const fs_extra_1 = require("fs-extra");
const write = (file, data) => {
    const text = (0, exports.dump)(data);
    (0, fs_extra_1.writeFileSync)(file, text);
};
exports.write = write;
const writeSync = (file, data) => {
    const text = (0, exports.dump)(data);
    return (0, fs_extra_1.writeFile)(file, text);
};
exports.writeSync = writeSync;
const dump = (data) => {
    return (0, js_yaml_1.dump)(data);
};
exports.dump = dump;

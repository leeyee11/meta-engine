"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("./reader");
const writer_1 = require("./writer");
exports.default = {
    read: reader_1.read,
    readSync: reader_1.readSync,
    write: writer_1.write,
    writeSync: writer_1.writeSync,
};

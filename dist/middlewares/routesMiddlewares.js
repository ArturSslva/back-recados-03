"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.midVerifyId = exports.midVerifyFields = void 0;
const data_1 = require("../data/data");
function midVerifyFields(request, response, next) {
    const { content } = request.body;
    if (!content) {
        return response.json({
            msg: "Campos nao preenchidos"
        });
    }
    next();
}
exports.midVerifyFields = midVerifyFields;
;
function midVerifyId(request, response, next) {
    const { id } = request.params;
    const item = data_1.errands.find((f) => parseInt(id) === f.id);
    if (!item) {
        return response.status(404).json({
            msg: "ID not found"
        });
    }
    next();
}
exports.midVerifyId = midVerifyId;

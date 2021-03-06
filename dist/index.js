"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data/data");
const generateId_1 = require("./helpers/generateId");
const routesMiddlewares_1 = require("./middlewares/routesMiddlewares");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get('/', (request, response) => {
    return response.send('API UP');
});
app.get('/errands', (request, response) => {
    return response.status(200).json({
        msg: 'All errands',
        errands: data_1.errands
    });
});
app.post('/errands', routesMiddlewares_1.midVerifyFields, (request, response) => {
    const { content } = request.body;
    const newErrand = {
        id: (0, generateId_1.getRandomInt)(0, 100),
        content
    };
    data_1.errands.push(newErrand);
    return response.status(201).json({
        msg: 'Sucess',
        item: newErrand,
        errands: data_1.errands
    });
});
app.delete('/errands/:id', routesMiddlewares_1.midVerifyId, (request, response) => {
    const { id } = request.params;
    const item = data_1.errands.findIndex((f) => parseInt(id) === f.id);
    data_1.errands.splice(item, 1);
    return response.status(200).json({
        msg: 'Sucess',
        errands: data_1.errands
    });
});
app.put('/errands/:id', routesMiddlewares_1.midVerifyId, routesMiddlewares_1.midVerifyFields, (request, response) => {
    const { id } = request.params;
    const { content } = request.body;
    const item = data_1.errands.find((f) => parseInt(id) === f.id);
    if (item) {
        item.content = content;
    }
    return response.status(200).json({
        msg: "Sucess",
        item,
        errands: data_1.errands
    });
});
app.listen(process.env.PORT || 8080, () => {
    console.log('RODOU');
});

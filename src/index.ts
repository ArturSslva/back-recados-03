import express, { Request, response, Response } from 'express';
import cors from 'cors';
import { errands } from './data/data';
import { getRandomInt } from './helpers/generateId';
import { midVerifyFields, midVerifyId } from './middlewares/routesMiddlewares';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

app.get('/errands', (request: Request, response: Response) => {
    return response.send('API UP');
});

app.get('/errands', (request: Request, response: Response) => {
    return response.status(200).json({
        msg: 'All errands',
        errands
    });
});

app.post('/errands', midVerifyFields, (request: Request, response: Response) => {
    const { content } = request.body;
    const newErrand = {
        id: getRandomInt(0, 100),
        content
    };

    errands.push(newErrand);

    return response.status(201).json({
        msg: 'Sucess',
        item: newErrand,
        errands
    });
});

app.delete('/errands/:id', midVerifyId, (request: Request, response: Response) => {
    const { id } = request.params;
    const item = errands.findIndex((f) => parseInt(id) === f.id);

    errands.splice(item, 1);

    return response.status(200).json({
        msg: 'Sucess',
        errands
    });
});

app.put('/errands/:id', midVerifyId, midVerifyFields, (request: Request, response: Response) => {
    const { id } = request.params;
    const { content } = request.body;

    const item = errands.find((f) => parseInt(id) === f.id);

    if(item){
        item.content = content;
    }

    return response.status(200).json({
        msg: "Sucess",
        item,
        errands
    });
});

app.listen(process.env.PORT || 8080, () => {
    response.send('API RODANDO');
});
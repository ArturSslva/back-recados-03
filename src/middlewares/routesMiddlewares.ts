import express, { Request, Response } from 'express';
import { errands } from '../data/data';

export function midVerifyFields(request: Request, response:Response, next: () => void){
    const { content } = request.body;
    if(!content){
        return response.json({
            msg: "Campos nao preenchidos"
        });
    }
    next();
};

export function midVerifyId(request: Request, response: Response, next: () => void){
    const { id } = request.params;
    const item = errands.find((f) => parseInt(id) === f.id);

    if(!item){
        return response.status(404).json({
            msg: "ID not found"
        })
    }
    next();
}
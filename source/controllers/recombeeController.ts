/** source/controllers/recombeeController.ts */
import { Request, Response, NextFunction } from 'express';
import { Cinema, Recomendation } from '../models/interfaces';


var recombee = require('recombee-api-client');
var rqs = recombee.requests;
const privateToken = "NMBg52k5YJ89azgbjsNtwc4BCRO0tgBMBNetRngQdYlQCAseleRQiLfNfZMwoJBa";
var client = new recombee.ApiClient('mymovie-dev', privateToken);


//add user to recombee database
const addUser = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.body.user_id ?? null;
    try{
        let result = await client.send(new rqs.AddUser(user_id));
        res.statusCode = 200;
        return res.json(result);
    } catch (err){
        res.statusCode = 400;
        return res.json(err);
    }
};

//aggiunge un interazione params: user_id, item_id, interaction_type = detail_view | purchase
const addInteraction = async (req: Request, res: Response, next: NextFunction) => {

    let user_id:Number = req.body.user_id ?? null;
    let item_id:Number = req.body.item_id ?? null;
    let interaction_type:String = req.body.interaction_type ?? null;
    if (user_id == null || item_id == null || interaction_type == null){
        res.statusCode = 400;
        return res.json("Bad request");
    }
    if (interaction_type == 'detail_view'){
        try{
            let result = await client.send(new rqs.AddDetailView(user_id, item_id, {cascadeCreate: false}));
            res.statusCode = 200;
            return res.json(result);
        } catch (err){
            res.statusCode = 400;
            return res.json(err);
        }
    } else if (interaction_type == 'purchase'){
        try{
            let result = await client.send(new rqs.AddPurchase(user_id, item_id, {cascadeCreate: false}));
            res.statusCode = 200;
            return res.json(result);
        } catch (err){
            res.statusCode = 400;
            return res.json(err);
        }
    } else {
        res.statusCode = 400;
        return res.json("Bad request");
    }
    
};

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
    let movie: Cinema = req.body ?? null;
    //prendiamo solo anno 
    res.statusCode = 200;
    try {
        let result = await client.send(new rqs.SetItemValues('movie-' + movie.id,
            // values
            {
            adult:movie.adult,
            year:movie.year,
            title:movie.title,
            overview:movie.overview,
            genre_ids:movie.genre_ids,
            original_language:movie.original_language, 
            //aggiungiamo il tipo
            type:'movie'

            },
            {
            //creiamo l'item se non c'è 
            cascadeCreate: true
            }
            ))

            res.statusCode = 200;
            return res.json(result);
    } catch (err){
        res.statusCode = 400;
        return res.json(err);
    }

};

const getRecomendation = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.params.user_id;
    let number: string = req.params.number;
    console.log(user_id);
    console.log(number);
    try{
        let result = await client.send(new rqs.RecommendItemsToUser(user_id, number));
        res.statusCode = 200;
        return res.json(result);
    } catch (err){
        res.statusCode = 400;
        return res.json(err);
    }
};


const getRecomendedMovies = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.params.user_id;
    let number: string = req.params.number;
    try{
        let result = await client.send(new rqs.RecommendItemsToUser(user_id, number, {
            filter: '(\'type\' == "movie")'
        }));
        res.statusCode = 200;
        return res.json(result);
    } catch (err){
        res.statusCode = 400;
        return res.json(err);
    }
};


//add user to recombee database
const initPropeties = async (req: Request, res: Response, next: NextFunction) => {
    client.send(new rqs.AddItemProperty('adult', 'boolean'))
    .then((response:any) => {
    return client.send(new rqs.AddItemProperty('year', 'string'));
    console.log(response);
    })
    .then((response:any) => {
        return client.send(new rqs.AddItemProperty('title', 'string'));
        console.log(response);
    })
    .then((response:any) => {
        return client.send(new rqs.AddItemProperty('overview', 'string'));
        console.log(response);
    })
    .then((response:any) => {
        return client.send(new rqs.AddItemProperty('genre_ids', 'set'));
        console.log(response);
    })
    .then((response:any) => {
        return client.send(new rqs.AddItemProperty('original_language', 'string'));
        console.log(response);
    })
    .then((response:any) => {
        return client.send(new rqs.AddItemProperty('type', 'string'));
        console.log(response);
    })
    .catch((error:any) => {
        return res.json(error);
    })
    .then((response:any) => {
        return res.json(response);
    })
    
};










export default { addUser, addInteraction, addMovie, getRecomendation, getRecomendedMovies, initPropeties };
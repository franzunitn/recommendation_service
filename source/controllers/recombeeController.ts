/** source/controllers/recombeeController.ts */
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Cinema} from '../models/interfaces';
import {Config} from '../config/config'
let config: Config = require('../config/config.json');

var recombee = require('recombee-api-client');
var rqs = recombee.requests;
var client = new recombee.ApiClient('mymovie-dev', config.recombee_token);


//add user to recombee database
const addUser = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.body.user_id ?? null;
    try{
        let result = await client.send(new rqs.AddUser(user_id));
        res.statusCode = 200;
        return res.json(result);
    } catch (e:any){
        return res.status(e.statusCode).send({message: e.message});
    }
};

//aggiunge un interazione params: user_id, item_id, interaction_type = detail_view | purchase
const addInteraction = async (req: Request, res: Response, next: NextFunction) => {

    let user_id:String = req.body.user_id ?? null;
    let item_id:String = req.body.item_id ?? null;
    let interaction_type:String = req.body.interaction_type ?? null;
    let token = req.header('x-access-token');
    if (token == undefined){
        token='';
    }
    if (user_id == null || item_id == null || interaction_type == null){
        res.statusCode = 400;
        return res.json("Bad request");
    }
    //controlliamo se l'item è presente
    try {
        var existing_item = await client.send(new rqs.ListItems({
            // optional parameters:
            'filter': '(\'itemId\' == \"'+item_id+'\")'
        }));
    } catch (e:any){
        return res.status(e.statusCode).send({message: e.message});
    }

    if (existing_item.length == 0){
        //prendiamo i dettagli dal film adapter
        var type = item_id.split('-')[0]; 
        var id = item_id.split('-')[1];
        try {
            var response = await axios.get(config.film_adapter_url+'/'+type+'/'+id, {
                headers: {
                    'x-access-token': token
                },
            });

            var item = response.data;
            if (response.status != 200){
                return res.status(response.status).send(response.data);;
            }
            try {
                await client.send(new rqs.SetItemValues(type+'-'+id,
                    // values
                    {
                    adult:item.adult,
                    year:item.year,
                    title:item.title,
                    overview:item.overview,
                    genre_ids:item.genre_ids,
                    original_language:item.original_language, 
                    category:item.category,
                    game_genre:item.game_genere,
                    //aggiungiamo il tipo
                    type:type
                    },
                    {
                    //creiamo l'item se non c'è 
                    cascadeCreate: true
                    }
                    ))
            } catch (e:any){
                //errore aggiunta a recombee
                return res.status(e.statusCode).send({message: e.message});
            }
            
        } catch (e:any){
            //errore dati dettaglio item
            return res.status(e.response.status).send(e.response.data);
        }

    } 
    

    if (interaction_type == 'detail_view'){
        try{
            let result = await client.send(new rqs.AddDetailView(user_id, item_id, {cascadeCreate: false}));
            res.statusCode = 200;
            return res.json(result);
        } catch (e:any){
            return res.status(e.statusCode).send({message: e.message});
        }
    } else if (interaction_type == 'purchase'){
        try{
            let result = await client.send(new rqs.AddPurchase(user_id, item_id, {cascadeCreate: false}));
            res.statusCode = 200;
            return res.json(result);
        } catch (e:any){
            return res.status(e.statusCode).send({message: e.message});
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
    } catch (e:any){
        return res.status(e.statusCode).send({message: e.message});
    }

};

const getRecomendation = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.params.user_id;
    let number: string = req.params.number;
    let token = req.header('x-access-token');
    if (token == undefined){
        token='';
    }
    try{
        let recom = await client.send(new rqs.RecommendItemsToUser(user_id, number));
            var recomendations: any[] = [];
            for (let element of recom['recomms']){
                var id_type = element.id;
                var type = id_type.split('-')[0];
                var id = id_type.split('-')[1];

                if (type == 'movie'){
                    var response = await axios.get(config.film_adapter_url+'/movie/'+id, {
                        headers: {
                            'x-access-token': token
                        },
                    });
                    var data = await response.data;
                    data['type'] = 'movie';
                    recomendations.push(data);
                }
                if (type == 'tv'){
                    var response = await axios.get(config.film_adapter_url+'/tv/'+id, {
                        headers: {
                            'x-access-token': token
                        },
                    });
                    var data = await response.data;
                    data['type'] = 'tv';
                    recomendations.push(data);
                }
                if (type == 'game'){
                    var response = await axios.get(config.film_adapter_url+'/game/'+id, {
                        headers: {
                            'x-access-token': token
                        },
                    });
                    var data = await response.data;
                    data['type'] = 'game';
                    recomendations.push(data);
                }
            }
        res.statusCode = 200;
        return res.json(recomendations);
    } catch (e:any){
        return res.status(e.statusCode).send({message: e.message});
    }
};


const getRecomendedMovies = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.params.user_id;
    let number: string = req.params.number;
    let token = req.header('x-access-token');
    if (token == undefined){
        token='';
    }
    try{
        let recom = await client.send(new rqs.RecommendItemsToUser(user_id, number, {
            filter: '(\'type\' == "movie")'
        }));
        var recomendations: any[] = [];
            for (let element of recom['recomms']){
                var id_type = element.id;
                var type = id_type.split('-')[0];
                var id = id_type.split('-')[1];
                var response = await axios.get(config.film_adapter_url+'/movie/'+id, {
                    headers: {
                        'x-access-token': token
                    },
                });
                var data = await response.data;
                recomendations.push(data);
                }
                
        res.statusCode = 200;
        return res.json(recomendations);
    } catch (e:any){
        return res.status(e.statusCode).send({message: e.message});
    }
};

const getRecomendedTv = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.params.user_id;
    let number: string = req.params.number;
    let token = req.header('x-access-token');
    if (token == undefined){
        token='';
    }
    try{
        let recom = await client.send(new rqs.RecommendItemsToUser(user_id, number, {
            filter: '(\'type\' == "tv")'
        }));
        var recomendations: any[] = [];
            for (let element of recom['recomms']){
                var id_type = element.id;
                var type = id_type.split('-')[0];
                var id = id_type.split('-')[1];
                var response = await axios.get(config.film_adapter_url+'/tv/'+id, {
                    headers: {
                        'x-access-token': token
                    },
                });
                var data = await response.data;
                recomendations.push(data);
                }
                
        res.statusCode = 200;
        return res.json(recomendations);
    } catch (e:any){
        return res.status(e.statusCode).send({message: e.message});
    }
};

const getRecomendedGame = async (req: Request, res: Response, next: NextFunction) => {
    let user_id: string = req.params.user_id;
    let number: string = req.params.number;
    let token = req.header('x-access-token');
    if (token == undefined){
        token='';
    }
    try{
        let recom = await client.send(new rqs.RecommendItemsToUser(user_id, number, {
            filter: '(\'type\' == "game")'
        }));
        var recomendations: any[] = [];
            for (let element of recom['recomms']){
                var id_type = element.id;
                var type = id_type.split('-')[0];
                var id = id_type.split('-')[1];
                var response = await axios.get(config.film_adapter_url+'/game/'+id, {
                    headers: {
                        'x-access-token': token
                    },
                });
                var data = await response.data;
                recomendations.push(data);
                }
                
        res.statusCode = 200;
        return res.json(recomendations);
    } catch (e:any){
        return res.status(e.statusCode).send({message: e.message});
    }
};













export default { addUser, addInteraction, addMovie, getRecomendation, getRecomendedMovies, getRecomendedTv, getRecomendedGame};
/** source/controllers/recombeeController.ts */
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { Cinema, Recomendation } from '../models/interfaces';
import {Config} from '../config/config'
import { json } from 'body-parser';
let config: Config = require('../config/config.json');

var recombee = require('recombee-api-client');
var rqs = recombee.requests;
const privateToken = "NMBg52k5YJ89azgbjsNtwc4BCRO0tgBMBNetRngQdYlQCAseleRQiLfNfZMwoJBa";
var client = new recombee.ApiClient('mymovie-dev', privateToken);


//aggiugne/aggiorna top 250 movies a database recombee 
const initMovies = async (req: Request, res: Response, next: NextFunction) => {
    const response = await axios.get(config.film_adapter_url+'/top-movies/50');
    // do something with myJson
    const data = await response.data;
    data['items'].forEach((movie:Cinema) => {
        try {
            client.send(new rqs.SetItemValues('movie-' + movie.id,
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

        } catch (err){
            res.send('Fail');
        }
    });
    res.send('Ok');
};

//aggiunge/aggiorna top 250 tv a database recombee 
const initTvs = async (req: Request, res: Response, next: NextFunction) => {
    const response = await axios.get(config.film_adapter_url+'/top-tv/50');
    // do something with myJson
    const data = await response.data;
    data['items'].forEach((movie:Cinema) => {
        try {
            client.send(new rqs.SetItemValues('tv-' + movie.id,
                // values
                {
                adult:movie.adult,
                year:movie.year,
                title:movie.title,
                overview:movie.overview,
                genre_ids:movie.genre_ids,
                original_language:movie.original_language, 
                //aggiungiamo il tipo
                type:'tv'
    
                },
                {
                //creiamo l'item se non c'è 
                cascadeCreate: true
                }
                ))

        } catch (err){
            res.send('Fail');
        }
    });
    res.send('Ok');
};

//aggiunge/aggiorna videogames
const initVideoGames = async (req: Request, res: Response, next: NextFunction) => {
   //da implementare 
};








export default {initMovies, initTvs};
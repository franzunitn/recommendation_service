/** source/controllers/recombeeController.ts */
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { Cinema, Game } from '../models/interfaces';
import {Config} from '../config/config'
import { json } from 'body-parser';
let config: Config = require('../config/config.json');

var recombee = require('recombee-api-client');
var rqs = recombee.requests;
var client = new recombee.ApiClient('mymovie-dev', config.recombee_token);


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
        return client.send(new rqs.AddItemProperty('game_genere', 'string'));
        console.log(response);
    })
    .then((response:any) => {
        return client.send(new rqs.AddItemProperty('category', 'string'));
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

//aggiugne/aggiorna top 250 movies a database recombee 
const initMovies = async (req: Request, res: Response, next: NextFunction) => {
    const response = await axios.get(config.film_adapter_url+'/top-movies/250');
    var count_added = 0;
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
                count_added++;

        } catch (err){
            console.log("Error");
            console.log(movie.id);
        }
    });
    res.send('Updated '+count_added+' elements to database');
};

//aggiunge/aggiorna top 250 tv a database recombee 
const initTvs = async (req: Request, res: Response, next: NextFunction) => {
    const response = await axios.get(config.film_adapter_url+'/top-tv/250');
    var count_added = 0;
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
                count_added++;

        } catch (err){
            console.log("Error");
            console.log(movie.id);
        }
    });
    res.send('Updated '+count_added+' elements to database');
};

//aggiunge/aggiorna videogames
const initVideoGames = async (req: Request, res: Response, next: NextFunction) => {
    const response = await axios.get(config.film_adapter_url+'/top-games/250');
    // do something with myJson
    const data = await response.data;
    var count_added = 0;
    data['items'].forEach((game:Game) => {
        try {
            //mettiamo solo l'id del genere 
            var genres_ids = null;
            if (game.genres != null){
             genres_ids = game.genres.map(genre => {
                return { id: genre.id};
            });
            }

            client.send(new rqs.SetItemValues('game-' + game.id,
                // values
                {
                year:game.year ?? null,
                title:game.title ?? null,
                overview:game.overview ?? null,
                game_genere:genres_ids ?? null,
                category:game.category ?? null, 
                //aggiungiamo il tipo
                type:'game'
    
                },
                {
                //creiamo l'item se non c'è 
                cascadeCreate: true
                }
                ))
                count_added++;
        } catch (err){
            console.log('Error');
            console.log(game.id);
        }
    });
    res.send('Updated '+count_added+' elements to database');
};








export default {initPropeties, initTvs, initMovies, initVideoGames};
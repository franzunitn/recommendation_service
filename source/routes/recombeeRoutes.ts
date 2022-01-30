/** source/routes/recombeeRoutes.ts */
import express from 'express';
import controller from '../controllers/recombeeController';
import fetchDataController from '../controllers/fetchDataController';
const router = express.Router();

//user_id
router.post('/add-user', controller.addUser);

//non importante i dati vengono inizializzati nelle init 
router.post('/add-movie', controller.addMovie);
//body: item_id (movie or videogames or serie tv)
router.post('/add-interaction', controller.addInteraction);




//TODO RESTITUIRE OGGETTI COMPLETI 
//get any recomendation 
router.get('/get-recomendations/user/:user_id/number/:number', controller.getRecomendation);
//get recomendedMovie
router.get('/get-recomendations/movies/user/:user_id/number/:number', controller.getRecomendedMovies);
//get recomendedTvs
router.get('/get-recomendations/tvs/user/:user_id/number/:number', controller.getRecomendedTv);
//get recomendedGame da fare 


//endpoint inizializzazione database con tutti i dati 
//da chiamare solo una volta inizializza database di recombee 
router.get('/init-propieties', fetchDataController.initPropeties);

//sincronizzano gli item con database recombee 
router.get('/init-movies', fetchDataController.initMovies);
router.get('/init-tvs', fetchDataController.initTvs);
router.get('/init-games', fetchDataController.initVideoGames);

export = router;
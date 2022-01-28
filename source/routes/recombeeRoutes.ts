/** source/routes/recombeeRoutes.ts */
import express from 'express';
import controller from '../controllers/recombeeController';
import fetchDataController from '../controllers/fetchDataController';
const router = express.Router();

//user_id
router.post('/add_user', controller.addUser);
//body: movie object
router.post('/add_movie', controller.addMovie);
//body: item_id (movie or videogames or serie tv)
router.post('/add_interaction', controller.addInteraction);

router.get('/get_recomendations/user/:user_id/number/:number', controller.getRecomendation);

//da chiamare solo una volta inizializza database di recombee 
router.get('/init_propieties', controller.initPropeties);

//get recomendedMovie
router.get('/get_recomended_movies/user/:user_id/number/:number', controller.getRecomendedMovies);
//get recomendedGame da fare 


//endpoint inizializzazione database con tutti i dati 
router.get('/init-movies', fetchDataController.initMovies);
router.get('/init-tvs', fetchDataController.initTvs);
export = router;
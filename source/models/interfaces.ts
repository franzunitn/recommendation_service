
interface Cinema {
    id:String;
    adult: Boolean;
    year:String;
    title:String;
    overview:String;
    genre_ids:Number[];
    original_language:String;    
}

interface GameGenere {
    id:Number;
    name:String;
}

interface Game {
    id:String;
    year:String;
    title:String;
    overview:String;
    genres:GameGenere[];
    category:String;
}


export {Cinema, Game, GameGenere}


/*
JSON EXAMPLES:::::
MOVIES 
 {
            "id": 730154,
            "adult": false,
            "year": 2020,
            "title": "きみの瞳が問いかけている",
            "overview": "",
            "genre_ids": [
                10749,
                18
            ]
},
TV 
{
            "id": 100,
            "year": 2004,
            "title": "I Am Not an Animal",
            "overview": "",
            "genre_ids": [
                16,
                35
            ]
        },
*/

/*
{
            "id": 86148,
            "year": 2018,
            "title": "Celeste Classic",
            "overview": "A hardcore platform game for the PICO-8 fantasy console.",
            "genres": [
                {
                    "id": 8,
                    "name": "Platform"
                },
                {
                    "id": 32,
                    "name": "Indie"
                }
            ],
            "category": 0
        }
*/
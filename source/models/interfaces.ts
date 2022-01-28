
interface Cinema {
    id:String;
    adult: Boolean;
    year:String;
    title:String;
    overview:String;
    genre_ids:Number[];
    original_language:String;    
}

interface Recomendation {
    id:Number;
    recomendations:Cinema[];
}

export {Cinema, Recomendation}


/*
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
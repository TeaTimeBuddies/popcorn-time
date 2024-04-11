<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Favorites;
use App\Models\Movie;
use Illuminate\Http\Request;

class FavoritesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Favorites $favorites)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Favorites $favorites)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorites $favorites)
    {
        //
    }


    public function getFavorites($userID){
        $fetchedUserID = Favorites::where('user_id', $userID)->get();

        $movies = [];
        foreach ($fetchedUserID as $favorite) {
        $movie = Movie::where('id', $favorite->movie_id)->first();
            if ($movie) {
                $movies[] = $movie;
            }
        }

        return $movies;
    }
}

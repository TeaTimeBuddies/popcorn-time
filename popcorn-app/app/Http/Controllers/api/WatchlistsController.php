<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Watchlists;
use App\Models\Movie;
use Illuminate\Http\Request;

class WatchlistsController extends Controller
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
        $watchlist = Watchlists::create([
            'user_id' => $request->user_id,
            'movie_id' => $request->movie_id,
        ]);

        return response()->json(
            [
                'success' => 'Rating added successfully',
                'watchlist' => $watchlist,
            ],
            200
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Watchlists $watchlists)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Watchlists $watchlists)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Watchlists $watchlists)
    {
        //
    }

    public function getWatchlist($userID)
    {
        $fetchedUserID = Watchlists::where('user_id', $userID)->get();

        $movies = [];
        foreach ($fetchedUserID as $watchlist) {
            $movie = Movie::where('id', $watchlist->movie_id)->first();
            if ($movie) {
                $movies[] = $movie;
            }
        }

        return $movies;
    }
}

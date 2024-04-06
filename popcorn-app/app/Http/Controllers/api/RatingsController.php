<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Ratings;
use Illuminate\Http\Request;

class RatingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Ratings::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($movie_id, Request $request)
    {
        $rating = Ratings::create([
            'movie_id' => $movie_id,
            'rating' => $request->rating,
            'review' => $request->review,
            'user_id' => 1, // TODO: GET USER ID FROM SESSION. CURRENTLY HARD CODED
        ]);
        return response()->json(
            [
                'success' => 'Rating added successfully',
                'rating' => $rating,
            ],
            200
        );
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $rating = Ratings::where('movie_id', $id)->get();

        if ($rating) {
            return $rating;
        } else {
            return response()->json(['error' => 'Ratings not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ratings $ratings)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ratings $ratings)
    {
        //
    }
}

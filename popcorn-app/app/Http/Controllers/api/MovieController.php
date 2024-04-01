<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Movie::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            'title' => 'required',
            'director' => 'required',
            'year' => 'required',
            'stars' => 'required',
            'genre' => 'required',
        ]);

        return Movie::create([
            'title' => request('title'),
            'director' => request('director'),
            'year' => request('year'),
            'stars' => request('stars'),
            'genre' => request('genre'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        return $movie;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        request()->validate([
            'title' => 'required',
            'director' => 'required',
            'year' => 'required',
            'stars' => 'required',
            'genre' => 'required',
        ]);
        $isSuccess = $movie->update([
            'title' => request('title'),
            'director' => request('director'),
            'year' => request('year'),
            'stars' => request('stars'),
            'genre' => request('genre'),
        ]);

        return ['success' => $isSuccess];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $isSuccess = $movie->delete();

        return ['success' => $isSuccess];
    }
}

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
    public function index(Request $request)
    {
        if ($request->has('is_approved')) {
            $isApproved = filter_var($request->query('is_approved'), FILTER_VALIDATE_BOOLEAN);
            return Movie::where('is_approved', $isApproved)->get();
        }
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
    public function show($id)
    {
        $movie = Movie::find($id);

        if ($movie) {
            return $movie;
        } else {
            return response()->json(['error' => 'Movie not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'director' => 'required',
            'year' => 'required',
            'stars' => 'required',
            'genre' => 'required',
        ]);

        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $isSuccess = $movie->update([
            'title' => $request->get('title'),
            'director' => $request->get('director'),
            'year' => $request->get('year'),
            'stars' => $request->get('stars'),
            'genre' => $request->get('genre'),
        ]);

        return ['success' => $isSuccess];
    }

    public function approve($id) {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $movie->is_approved = true;
        $isSuccess = $movie->save();

        return ['success' => $isSuccess];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $movie = Movie::find($id);
        $isSuccess = $movie->delete();

        return ['success' => $isSuccess];
    }
}

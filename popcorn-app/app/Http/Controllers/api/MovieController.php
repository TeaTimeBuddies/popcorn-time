<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Comments;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);

        if ($request->has('is_approved')) {
            $isApproved = filter_var(
                $request->query('is_approved'),
                FILTER_VALIDATE_BOOLEAN
            );
            $movies = Movie::where('is_approved', $isApproved)
                ->orderBy('title')
                ->paginate($perPage);
        } else {
            $movies = Movie::orderBy('title')->paginate($perPage);
        }

        return [
            'data' => $movies->items(),
            'meta' => [
                'current_page' => $movies->currentPage(),
                'last_page' => $movies->lastPage(),
                'per_page' => $perPage,
                'total' => $movies->total(),
            ],
        ];
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
            'image' => 'required',
        ]);

        return Movie::create([
            'title' => request('title'),
            'director' => request('director'),
            'year' => request('year'),
            'stars' => request('stars'),
            'genre' => request('genre'),
            'image' => request('image'),
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
            'image' => 'required',
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
            'image' => $request->get('image'),
        ]);

        return ['success' => $isSuccess];
    }

    public function approve($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $movie->is_approved = true;
        $isSuccess = $movie->save();

        return ['success' => $isSuccess];
    }

    public function reject($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }

        $isSuccess = $movie->delete();

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

    public function addToFavorites(Request $request, $movieId)
    {
        $user = User::first(); //currently getting the first user, since no auth yet
        $user->favorites()->attach($movieId);
        return response()->json(['message' => 'Movie added to favorites']);
    }

    public function addToWatchlist(Request $request, $movieId)
    {
        $user = User::first();
        $user->watchlist()->attach($movieId);
        return response()->json(['message' => 'Added to watchlist']);
    }

    public function addComment(Request $request, $movieId)
    {
        $request->validate([
            'comment' => 'required|string',
        ]);
        $comment = new Comments([
            'user_id' => Auth::id(),
            'movie_id' => $movieId,
            'comment' => $request->input('comment'),
        ]);
        $comment->save();
        return response()->json(['message' => 'Comment added']);
    }
}

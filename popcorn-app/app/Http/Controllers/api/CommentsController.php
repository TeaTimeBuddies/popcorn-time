<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Comments;
use App\Models\Ratings;
use App\Models\User;
use Illuminate\Http\Request;

class CommentsController extends Controller
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

        $user = User::find($request->user_id);
        $username = $user ? $user->name : '';

        $comment = Comments::create([
            'user_id' => $request->user_id,
            'username' => $username,
            'rating_id' => $request->rating_id,
            'comment' => $request->comment,
        ]);
        if ($comment) {
            $rating = Ratings::where('id', $request->rating_id)->first();
            $rating->increment('comments_count');
        }
        return response()->json(
            [
                'success' => 'Rating added successfully',
                'rating' => $comment,
            ],
            200
        );
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $comment = Comments::where('rating_id', $id)->get();

        if ($comment) {
            return $comment;
        } else {
            return response()->json(['error' => 'Ratings not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comments $comments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comments $comments)
    {
        //
    }
}

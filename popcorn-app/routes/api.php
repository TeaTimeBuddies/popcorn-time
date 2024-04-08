<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\MovieController;
use App\Http\Controllers\api\RatingsController;
use App\Http\Controllers\api\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
});
// ->middleware('auth:sanctum');

// Movies
Route::get('movies', [MovieController::class, 'index']);
Route::get('movies/{id}', [MovieController::class, 'show']);
Route::post('movies', [MovieController::class, 'store']);
Route::put('movies/{id}', [MovieController::class, 'update']);
Route::delete('movies/{id}', [MovieController::class, 'destroy']);

// Ratings
Route::get('ratings/{id}', [RatingsController::class, 'show']);
Route::post('ratings/{id}', [RatingsController::class, 'store']);

//Admin
Route::post('movies/approve/{id}', [MovieController::class, 'approve']); //TODO: add middlware after auth implemented

// Login
Route::post('/user', [UserController::class, 'processLogin']);
Route::get('/user', [UserController::class, 'index']);

//Signup
Route::post('/signup', [UserController::class, 'processSignup']);

// Logout
Route::post('/logout', [UserController::class, 'logout'])->middleware(
    'auth:sanctum');

// User
// Route::middleware('auth:sanctum')->group(function () {
    //Dashboard
    Route::get('/user/dashboard', [UserController::class, 'getDashboard']);
    
    //Favorite Movies
    Route::get('/user/favorites', [UserController::class, 'getFavorites']);
    Route::post('/user/favorites', [UserController::class, 'addFavorite']);
    Route::delete('/user/favorites', [UserController::class, 'removeFavorite']);
    
    //Watchlist
    Route::get('/user/watchlist', [UserController::class, 'getWatchlist']);
    Route::post('/user/watchlist', [UserController::class, 'addWatchlist']);
    Route::delete('/user/watchlist', [UserController::class, 'removeWatchlist']);

    //Comments
    Route::get('/user/comments', [UserController::class, 'getComments']);
    Route::post('/user/comments', [UserController::class, 'addComment']);
    Route::delete('/user/comments', [UserController::class, 'removeComment']);

// });





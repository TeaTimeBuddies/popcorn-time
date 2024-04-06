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
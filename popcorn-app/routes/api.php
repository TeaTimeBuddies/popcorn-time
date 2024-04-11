<?php

use App\Http\Controllers\api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\MovieController;
use App\Http\Controllers\api\RatingsController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\CommentsController;
use App\Http\Controllers\api\FavoritesController;
use App\Http\Controllers\api\WatchlistsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Login
Route::post('/user', [UserController::class, 'processLogin'])->name('login');
Route::get('/user', [UserController::class, 'index']);

//Signup
Route::post('/signup', [UserController::class, 'processSignup']);

// Logout
Route::post('/logout', [UserController::class, 'logout'])->middleware(
    'auth:sanctum'
);

// User
// Route::middleware('auth:sanctum')->group(function () {

// });
Route::group([], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});

// jwt.auth
// auth:sanctum
Route::middleware('auth:sanctum')->group(function () {
    # all the routes that require authentication go here

    // Movies
    Route::get('movies', [MovieController::class, 'index']);
    Route::get('movies/{id}', [MovieController::class, 'show']);
    Route::post('movies', [MovieController::class, 'store']);
    Route::put('movies/{id}', [MovieController::class, 'update']);
    Route::delete('movies/{id}', [MovieController::class, 'destroy']);

    // Ratings
    Route::get('ratings/{id}', [RatingsController::class, 'show']);
    Route::get('ratings/index/{id}', [RatingsController::class, 'getRating']);
    Route::post('ratings/{id}', [RatingsController::class, 'store']);

    //Comments
    Route::get('/user/comments', [UserController::class, 'getComments']);
    Route::post('/user/comments', [UserController::class, 'addComment']);
    Route::delete('/user/comments', [UserController::class, 'removeComment']);
    Route::get('/comment/{id}', [CommentsController::class, 'show']);
    Route::get('/user/{id}', [UserController::class, 'getUsername']);
    Route::post('/comment', [CommentsController::class, 'store']);

    //Admin
    Route::post('movies/approve/{id}', [MovieController::class, 'approve']); //TODO: add middlware after auth implemented
    Route::post('movies/reject/{id}', [MovieController::class, 'reject']); //TODO: add middlware after auth implemented
    Route::get('approvals/users', [UserController::class, 'index'])->name(
        'approvals'
    );
    Route::patch('approvals/users/{userId}', [
        UserController::class,
        'toggleApprove',
    ])->name('approve');
    Route::delete('approvals/users/{userId}', [
        UserController::class,
        'destroy',
    ])->name('destroy');

    //Dashboard
    Route::get('/user/dashboard', [UserController::class, 'getDashboard']);

    //Favorite Movies
    Route::get('/user/favorites/{userId}', [
        UserController::class,
        'getFavorites',
    ]);
    Route::post('/user/favorites/{movieId}', [
        UserController::class,
        'addFavorite',
    ]);
    Route::delete('/user/favorites/{movieId}', [
        UserController::class,
        'removeFavorite',
    ]);
    Route::post('/user/favorites/check/{movieId}', [
        UserController::class,
        'checkFavorite',
    ]);

    // UserDashboard get methods - Favorites and Watchlist
    Route::get('/user/{userID}/favorites', [
        FavoritesController::class,
        'getFavorites',
    ]);

    Route::get('/user/watchlist/{userId}', [
        WatchlistsController::class,
        'getWatchlist',
    ]);

    Route::post('/user/favorites', [FavoritesController::class, 'store']);

    //Watchlist
    Route::post('/user/watchlist', [WatchlistsController::class, 'store']);

    // Route::post('/user/watchlist/{movieId}', [
    //     UserController::class,
    //     'addWatchlist',
    // ]);

    Route::delete('/user/watchlist/{movieId}', [
        UserController::class,
        'removeWatchlist',
    ]);
    Route::post('/user/watchlist/check/{movieId}', [
        UserController::class,
        'checkWatchlist',
    ]);

});

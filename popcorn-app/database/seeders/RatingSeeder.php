<?php

namespace Database\Seeders;

use App\Models\Ratings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ratings::create([
            'user_id' => 1,
            'movie_id' => 1,
            'username' => 'Aric',
            'rating' => 4,
            'review' => 'This movie was pretty good',
            'comments_count' => 1,
        ]);

        Ratings::create([
            'user_id' => 1,
            'movie_id' => 5,
            'username' => 'Test User',
            'rating' => 2,
            'review' => 'This movie had poor acting',
            'comments_count' => 0,
        ]);

        Ratings::create([
            'user_id' => 1,
            'movie_id' => 10,
            'username' => 'Test User',
            'rating' => 5,
            'review' => 'Masterclass Movie!!!',
            'comments_count' => 0,
        ]);

        Ratings::create([
            'user_id' => 1,
            'movie_id' => 4,
            'username' => 'Test User',
            'rating' => 1,
            'review' => 'Never watch this movie',
            'comments_count' => 0,
        ]);
    }
}

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
            'rating' => 4,
            'review' => "This movie was pretty good",
        ]);

        Ratings::create([
            'user_id' => 3,
            'movie_id' => 5,
            'rating' => 2,
            'review' => "This movie had poor acting",
        ]);

        Ratings::create([
            'user_id' => 2,
            'movie_id' => 10,
            'rating' => 5,
            'review' => "Masterclass Movie!!!",
        ]);

        Ratings::create([
            'user_id' => 12,
            'movie_id' => 4,
            'rating' => 1,
            'review' => "Never watch this movie",
        ]);
    }
}

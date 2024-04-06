<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Movie Schema: id, title, director, year, genre, stars, created_at, updated_at
        $this->loadCSV();
    }

    /*
     * Load the CSV file into the database
     */
    private function loadCSV(): void
    {
        $file = fopen('database/popcorn_time.csv', 'r');

        // Skip the header row
        fgetcsv($file);

        while (($data = fgetcsv($file)) !== false) {
            Movie::create([
                // 'id'
                'title' => $data[1],
                'director' => explode(',', trim($data[2], '[]')),
                'year' => $data[3],
                'genre' => explode(',', trim($data[4], '[]')),
                'stars' => explode(',', trim($data[5], '[]')),
                'is_approved' => true,
            ]);
        }

        fclose($file);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => config('admin.name'),
            'email' => config('admin.email'),
            'password' => bcrypt(config('admin.password')),
            'is_admin' => true,
            'is_approved' => true,
        ]);

        User::factory()->create([
            'name' => 'Conrad',
            'email' => 'conrad@ilovemovies.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
            'is_approved' => true,
        ]);

        $this->call(MovieSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(RatingSeeder::class);
    }
}

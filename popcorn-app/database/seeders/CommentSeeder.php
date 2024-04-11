<?php

namespace Database\Seeders;

use App\Models\Comments;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comments::create([
            'user_id' => 1,
            'rating_id' => 1,
            'username' => 'Benny',
            'comment' => 'I very much disagree!',
        ]);
    }
}

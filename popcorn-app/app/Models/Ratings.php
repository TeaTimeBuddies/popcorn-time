<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ratings extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        'rating',
        'review',
        'user_id',
        'username',
        'comments_count',
    ];
}

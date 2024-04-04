<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Movie extends Model
{
    use HasFactory;
    use HasApiTokens, Notifiable;

    protected $casts = [
        'director' => 'array',
        'genre' => 'array',
        'stars' => 'array',
        'is_approved' => 'boolean',
    ];

    protected $fillable = [
        'title',
        'director',
        'stars',
        'year',
        'genre',
        'is_approved',
    ];
}

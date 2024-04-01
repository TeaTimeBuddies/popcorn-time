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

    protected $fillable = ['title', 'director', 'stars', 'year', 'genre'];
}

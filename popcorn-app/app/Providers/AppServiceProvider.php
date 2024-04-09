<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (DB::connection() instanceof \Illuminate\Database\SQLiteConnection) {
            $database = DB::getDatabaseName();
            $directory = dirname("database/".$database);
            
            if (!File::exists($directory)) {
                File::makeDirectory($directory, 0755, true);
            }

            if (!File::exists($database)) {
                File::put($database, '');
                DB::reconnect(DB::getDefaultConnection());
            }
        }

        Artisan::call('migrate', ['--force' => true]);

    }
}

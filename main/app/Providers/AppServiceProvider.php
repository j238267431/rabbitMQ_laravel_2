<?php

namespace App\Providers;

use App\Jobs\ProductCreated;
use Illuminate\Support\ServiceProvider;
use App\Jobs\TestJob;
use App\Jobs\ProductUpdated;
use App\Jobs\ProductDeleted;

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
        // \App::bindMethod(TestJob::class . '@handle', fn($job) => $job->handle());
        \App::bindMethod(ProductCreated::class . '@handle', fn($job) => $job->handle());
        \App::bindMethod(ProductUpdated::class . '@handle', fn($job) => $job->handle());
        \App::bindMethod(ProductDeleted::class . '@handle', fn($job) => $job->handle());
    }
}

<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Product;

class ProductCreated implements ShouldQueue
{
    use Queueable;
    private $data;


    /**
     * Create a new job instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Product::create(
            [
                'id' => $this->data['id'],
                'title' => $this->data['title'],
                'image' => $this->data['image'],
                'created_at' => $this->data['created_at'],
                'updated_at' => $this->data['updated_at'],
            ]
        );
    }
}

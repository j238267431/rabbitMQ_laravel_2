<?php

namespace App\Http\Controllers;

use App\Jobs\ProductCreated;
use App\Models\Product;
use App\Models\ProductUser;
use Illuminate\Http\Request;
use App\Jobs\ProductLiked;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index(){
        return Product::all();
    }

    public function like($id, Request $request){
        $response = \Http::get('http://docker.for.mac.host.internal:8000/api/user');
        $user = $response->json();

        try{
            $productUser = ProductUser::create([
                'user_id' => $user['id'],
                'product_id' => $id
            ]);

            ProductLiked::dispatch($productUser->toArray())->onQueue('admin_queue');;

            return response([
                'message' => 'success',
            ]);
        } catch(\Exception $exeption) {
            return response([
                'error' => 'You already liked this product',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}

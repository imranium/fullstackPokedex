<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\GetPokemonRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class PokemonController extends Controller
{
    public function index(GetPokemonRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $limit = $validated['limit'];
        $page = $validated['page'];
        $offset = ($page - 1) * $limit;

        $cacheKey = "pokemons_page_{$page}_limit_{$limit}";

        $pokemons = Cache::remember($cacheKey, 3600, function () use ($limit, $offset) {
            // Fetch the list of pokemons from PokeAPI
            $listResponse = Http::get("https://pokeapi.co/api/v2/pokemon", [
                'limit' => $limit,
                'offset' => $offset,
            ]);

            if ($listResponse->failed()) {
                return response()->json(['error' => 'Failed to fetch data from PokeAPI'], 502);
            }

            $results = $listResponse->json()['results']; 

            // Fetch details for each pokemon in parallel
            $responses = Http::pool(function ($pool) use ($results) {
                foreach ($results as $pokemon) {
                    $pool->as($pokemon['name'])->get($pokemon['url']);
                }
            });

            $formattedData = [];

            foreach ($results as $pokemon) {
                $name = $pokemon['name'];
                
                if (isset($responses[$name]) && $responses[$name]->successful()) {
                    $details = $responses[$name]->json();

                    $formattedData[] = [
                        'name' => $name,
                        'image' => $details['sprites']['front_default'] 
                                ?? $details['sprites']['other']['official-artwork']['front_default'], 
                        'types' => collect($details['types'])->pluck('type.name')->toArray(),
                        'height' => $details['height'],
                        'weight' => $details['weight'],
                    ];
                }
            }

            return $formattedData;
        });

        return response()->json($pokemons, 200, [], JSON_UNESCAPED_SLASHES);
    }


}

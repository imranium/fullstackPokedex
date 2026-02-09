import React from "react";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types/pokemon";
import Image from "next/image";

interface PokemonListProps {
  query: string;
}

export const PokemonList = ({ query }: PokemonListProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async (pageNum: number, search: string, isNewSearch: boolean = false) => {
    setLoading(true);
    try {
      const url = new URL("http://localhost:8000/api/pokemons");
      url.searchParams.append("page", pageNum.toString());
      url.searchParams.append("limit", "20");
      if (search) url.searchParams.append("search", search);

      const res = await fetch(url.toString());
      const data = await res.json();

      if (isNewSearch) {
        setPokemons(data);
      } else {
        setPokemons((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch when query changes
  useEffect(() => {
    setPage(1);
    fetchPokemons(1, query, true);
  }, [query]);

  // Load More Handler
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPokemons(nextPage, query);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pokemons.map((pokemon, index) => (
          <div
            key={`${pokemon.name}-${index}`}
            className="group bg-white p-4 rounded-xl border border-gray-200 flex flex-row items-center gap-4"
          >
            <div className="flex-shrink-0">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                className="w-15 h-15 object-contain"
                width={150}
                height={150}
              />
            </div>

            <div className="flex flex-col items-start">
              <h3 className="text-sm font-bold capitalize">{pokemon.name}</h3>

              <div className="flex flex-wrap gap-2 mt-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t}
                    className="px-1 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600 capitalize"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold"
        >
          {loading ? "Loading..." : "Load More Pokémon"}
        </button>
      </div>
    </div>
  );
};

export default PokemonList;

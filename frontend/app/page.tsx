"use client";

import PokemonList from "./components/PokemonList";
import Carousel from './components/Carousel';
import {  useState } from "react";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const handleSearchTrigger = () => {
    setActiveQuery(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchTrigger();
    }
  };

  return (

    <main className="min-h-screen flex flex-col items-center">
      
      {/* --- TOP SECTION (Carousel & Banners) */}
      <div className="w-full max-w-7xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left: Carousel */}
        <div className="md:col-span-3 h-64 rounded-sm overflow-hidden">
          <Carousel />
        </div>

        {/* Right: Two Static Banners */}
        <div className="flex flex-col gap-4 h-64">
          <div className="flex-1 rounded-sm flex items-center justify-center">
            <img src="/images/pokemon.png" alt="static banner 1" />
          </div>
          <div className="flex-1 rounded-sm flex items-center justify-center">
            <img src="/images/Pokemon_Go.svg.png" alt="static banner 2" className="w-56 h-24"/>
          </div>
        </div>
      </div>
      
      {/* --- MIDDLE SECTION (Persistent Grid) */}
      <div className="w-full max-w-7xl p-4 grid grid-cols-12 gap-6 items-start relative">
        {/* LEFT COLUMN (Static Image) - Sticky */}
        <aside className="hidden md:block col-span-2 sticky top-4 h-64 rounded-sm">
          <img src="images/ad-2.jpg" alt="static ad left" className="rounded-sm"/>
        </aside>

        {/* CENTER COLUMN (Scrollable List) */}
        <section className="col-span-12 md:col-span-7">
          <div className="sticky top-0 z-10 pt-2 pb-4 flex gap-2 bg-white/80 backdrop-blur-sm">
            <input
              type="text"
              placeholder="Pokémon Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-3 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              onClick={handleSearchTrigger}
              className="px-6 py-2 bg-orange-400 text-white rounded-3xl font-bold hover:bg-orange-500 transition-colors"
            >
              Search
            </button>
          </div>

          <PokemonList query={activeQuery} />
        </section>

        {/* RIGHT COLUMN (Static Image)*/}
        <aside className="hidden md:block col-span-3 sticky top-4 h-64 rounded-sm">
          <img src="images/ad-4.jpg" alt="static ad right" className="rounded-sm"/>
        </aside>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import { dummyTrailers } from "../utils/constants";

const Trailers = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  const getEmbedUrl = (url) => {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="bg-[#0a0f18] py-16 px-6 md:px-16 lg:px-24">
      <h2 className="text-2xl font-bold mb-8">Trailers</h2>

      <div className="relative pb-[56.25%] h-0 mb-6">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={getEmbedUrl(currentTrailer.videoUrl)}
          title="Marvel Television's Ironheart | Official Trailer | Disney+"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {dummyTrailers.map((trailer, i) => (
          <div
            key={i}
            onClick={() => setCurrentTrailer(trailer)}
            className="relative rounded-lg overflow-hidden cursor-pointer group"
          >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <img
              src={trailer?.image}
              alt="Trailer 1"
              width={300}
              height={169}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailers;

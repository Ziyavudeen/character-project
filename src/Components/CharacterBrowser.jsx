import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCharacters = async (page) => {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  return data;
};

const CharacterBrowser = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery(['characters', page], () => fetchCharacters(page), {
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Character Browser</h1>
      <div className="character-list">
        {data.results.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((old) => (!data || !data.info.next ? old : old + 1))}
          disabled={!data || !data.info.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterBrowser;

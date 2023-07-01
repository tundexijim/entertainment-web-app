import React, {useState} from 'react'
import SearchInput from '../../components/SearchInput'
import Card from '../../components/Card';
import './Movies.css'
function Movies({data, mainheading}) {
  const MovieData = data.filter((item) => item.category === 'Movie');
  let heading = mainheading;
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const filteredMovieData = MovieData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let count = filteredMovieData.length;
  if (count === 0){
    heading = `No matches for "${searchTerm}"`
  }
  if (count > 0 && count < MovieData.length){
    heading = `Found ${count} results for "${searchTerm}"`;
  }

  return (
    <div className='movie-container'>
      <SearchInput placeholder='Search for movies' onChange = {handleChange} value = {searchTerm}/>
      <h1>{heading}</h1>
      <div className="movies">
      {filteredMovieData && filteredMovieData.map((item, index) => (<Card item ={item} key={index}/>))}
      </div>
    </div>
  )
}

export default Movies
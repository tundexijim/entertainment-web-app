import React, {useState} from 'react'
import SearchInput from '../../components/SearchInput'
import Card from '../../components/Card';
import './Bookmark.css'
function Bookmark({data, mainheading}) {
  const  BookmarkedMovieData = data.filter((item) => item.category === 'Movie'&& item.isBookmarked);
  const  BookmarkedSeriesData = data.filter((item) => item.category === 'TV Series'&& item.isBookmarked);
  const  BookmarkedData = data.filter((item) => item.isBookmarked);
  let heading = mainheading;
  const [searchTerm, setSearchTerm] = useState('');
  const [displaySearch, setdisplaySearch] = useState(false)
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setdisplaySearch(event.target.value.length > 0)
  }
  const filteredBookmarkedData = BookmarkedData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let count = filteredBookmarkedData.length;
  if (count === 0){
    heading = `No matches for "${searchTerm}"`
  }
  if (count > 0 && count < BookmarkedData.length){
    heading = `Found ${count} results for "${searchTerm}"`;
  }
  return (
    <div className="bookmarked-container">
      <SearchInput placeholder='Search for bookmarked shows' onChange={handleChange} value={searchTerm}/>
      {!displaySearch ?
      <div>
      <h1>Bookmarked Movies</h1>
      <div className="bookmarked-movie">
      {BookmarkedMovieData && BookmarkedMovieData.map((item, index) => (<Card item ={item} key={index}/>))}
      </div>
      <h1>Bookmarked TV Series</h1>
      <div className="bookmarked-series">
      {BookmarkedSeriesData && BookmarkedSeriesData.map((item, index) => (<Card item ={item} key={index}/>))}
      </div>
      </div>
      :
      <div>
    <h1>{heading}</h1>
    <div className="bookmarked">
    {filteredBookmarkedData && filteredBookmarkedData.map((item, index) => (<Card item ={item} key={index}/>))}
    </div>
    </div>
      }
    </div>
  )
}

export default Bookmark
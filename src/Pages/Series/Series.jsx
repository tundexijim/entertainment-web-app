import React, {useState} from 'react'
import './Series.css'
import Card from '../../components/Card'
import SearchInput from '../../components/SearchInput';
function Series({data, mainheading}) {
const  SeriesData = data.filter((item) => item.category === 'TV Series');
let heading = mainheading;
const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const filteredSeriesData = SeriesData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let count = filteredSeriesData.length;
  if (count === 0){
    heading = `No matches for "${searchTerm}"`
  }
  if (count > 0 && count < SeriesData.length){
    heading = `Found ${count} results for "${searchTerm}"`
  }

  return (
    <div className='series-container'>
    <SearchInput placeholder='Search for TV Series' onChange={handleChange} value ={searchTerm}/>
    <h1>{heading}</h1>
    <div className="series">
    {filteredSeriesData && filteredSeriesData.map((item, index) => (<Card item ={item} key={index}/>))}
    </div>
  </div>
  )
}

export default Series
import React, {useState, useEffect} from 'react'
import './Home.css'
import Trend from '../../components/Trend'
import Card from '../../components/Card'
import SearchInput from '../../components/SearchInput'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
function Home({data, mainheading}) {   
  const TrendingData = data.filter((item) => item.isTrending);
  const OtherData = data.filter((item) => !item.isTrending);
  let heading = mainheading;
  const [searchTerm, setSearchTerm] = useState('');
  const [displaySearch, setdisplaySearch] = useState(false)
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setdisplaySearch(event.target.value.length > 0)
  };
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  let count = filteredData.length;
  if (count === 0){
    heading = `No matches for "${searchTerm}"`
  }
  if (count > 0 && count < data.length){
    heading = `Found ${count} results for "${searchTerm}"`;
  }
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.7,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='home__container'>
    <SearchInput placeholder = 'Search for movies or TV series' onChange={handleChange} value={searchTerm}/>
    {!displaySearch ?
    <div>
    <div className="slider-container">
    <Slider {...settings}>  
      {TrendingData && TrendingData.map((item, index) => (<Trend item ={item} key={index} index={index}/>))}
    </Slider>
    </div>
    <h1>{heading}</h1>
    <div className="recommended-container">
    {OtherData && OtherData.map((item, index) => (<Card item ={item} key={index}/>))}
    </div>
    </div>
    :
    <div>
    <h1>{heading}</h1>
    <div className="recommended-container">
    {filteredData && filteredData.map((item, index) => (<Card item ={item} key={index}/>))}
    </div>
    </div>
     }
    
    
  </div>
  )
}

export default Home
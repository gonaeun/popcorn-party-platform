import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard'

  const MovieSlide = ({list}) => {   //Home.jsx의 return에서 props로 list 받아주기
    // list가 배열인지 확인하여 안전하게 map 사용
    if (!list || !Array.isArray(list)) {
      return null; // list가 없으면 아무것도 렌더링하지 않음 >> map에 관한 오류 해결!
    }
      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6 // 컴퓨터 화면에 보이는 아이템 갯수가 달라짐
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
      <Carousel responsive={responsive}
        itemClass="carousel-item-padding"
        containerClass="carousel-container"
      >
        {list.map((item)=>(
         <MovieCard key={item.id} data={item}/>
        )
        )}
      </Carousel>
    )

  }
  
export default MovieSlide
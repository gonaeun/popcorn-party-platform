import React from 'react'

const Banner = ({data}) => {   // Home.jsx의 return창에서 data를 props로 넘겨받음
    if (!data) return null  // data 데이터가 없으면 렌더링하지 않도록! (오류창 이슈)

    console.log(data);
    
    const div_styled = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
    
    return (
      <div className='banner' style={div_styled}>
        <div className='banner-info'>
          <h1>{data.title}</h1>
          <p>{data.overview}</p>
        </div>
      </div>
    )
    };
    
export default Banner;
import React from 'react'

function ListPoster(props) {
  return (
    <div className="poster" key={props.id}>
      <img className="product--image" src={props.url} alt="product" />
      <div className="poster-content">
             <div className="title">
                 {props.title}
             </div>
             <div className="description">
                 {props.description}
             </div>
        </div>
        
    </div>



    // <div className='poster' key={props.id}>
    //     <img className='poster-image' src={props.url} alt="poster" />
    //     <div className="poster-content">
    //         <div className="title">
    //             {props.title}
    //         </div>
    //         <div className="description">
    //             {props.description}
    //         </div>
    //     </div>
    // </div>
  )
}

export default ListPoster
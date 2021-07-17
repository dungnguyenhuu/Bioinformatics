import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class SlideShow extends Component {
  render() {
    const images= [
      {id: 1, url: "./images/ai1.png"},
      {id: 2, url: "./images/ai6.jpg"},
      {id: 3, url: "./images/ai2.jpg"},
      {id: 4, url: "./images/ai1.jpg"},
      {id: 5, url: "./images/ai1.jpg"},
    ];
   
    let addClass = true;
    let classAnim = "animated infinite fadeInDown";
    const onChange = (value) => {
      addClass = !addClass;
      if(addClass){
        classAnim = "animated infinite fadeInDown";
      } else {
        classAnim = "animated infinite fadeInUp";
      }
      // console.log(addClass);
      // setTimeout(() => {
      //   this.isAnimated = false;
      //   console.log(this.isAnimated);
      // }, 1500);
      
    };

    return (
      <section className="jumbotron">
        <div className="jumbotron__content">
          <div className={classAnim }>
            <h2>Bioinformatic project</h2>
            {/* <h2>Nhóm 21</h2> */}
          </div>
          <div className="animated infinite fadeInUp">
            <p className="jumbotron__lead">
              Dự đoán Anti CRISPR Protein
            </p>
          </div>
          <div className="animated infinite zoomIn">
            {/* <Link to="/gioi-thieu" className="button button-outlined">
              Tìm hiểu thêm
            </Link> */}
          </div>
        </div>
        
        <div className="slieShow">
          <Carousel 
            autoPlay={true}
            interval='5000'
            infiniteLoop={true}   
            showThumbs={false} 
            showArrows={true}  
            onChange={onChange}    
          >
            {images.map(img => 
              <div className="slideShow-wrap" key={img.id}>
                <img src={img.url} />
              </div>
            )}

          </Carousel>
        </div>
      </section>
    );
  }
}

export default SlideShow;

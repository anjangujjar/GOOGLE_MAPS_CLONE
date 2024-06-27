import React from 'react'
import { Link } from 'react-router-dom'
export default function Carousal() {
  return (
    <div>
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="http://images4.fanpop.com/image/photos/16500000/Random-random-16519681-1280-1024.jpg" style={{filter:"brigtness(20%)"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="http://images2.fanpop.com/images/photos/6000000/Random-random-6064744-1280-800.jpg" style={{filter:"brigtness(20%)"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="http://images2.fanpop.com/images/photos/5700000/Random-random-5719766-1280-800.jpg" style={{filter:"brigtness(20%)"}}className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

</div>
  )
}

import React from 'react'

export default function card() {
  return (
    <div><div>
    <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
      <img className="card-img-top" src="..." alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Card1</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
        <div className='container w-100'></div>
        <select className='m-2 h-100 bg-success'>
          {Array.from(Array(6), (e, i) => {
            return (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            )
          })}
        </select>
        <select className='m-2 h-100 bg-success rounded'>
          <option value="half"> Half </option>
          <option value="full"> Full </option>

        </select>
      </div>
    </div>
  </div></div>
  )
}

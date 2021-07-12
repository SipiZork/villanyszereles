import React from 'react';

const ProgressArrow = ({ right }) => {
  return (
    <div>
      <div className={`arrow ${right ? 'right' : 'left'}`}>
        <div className="start">
          <div className="line-up"></div>
        </div>
        <div className="line"></div>
        <div className="end">
          <div className="line-up"></div>              
        </div>
        <div className="bottom">
          <div className="bottom-arrow"></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressArrow;
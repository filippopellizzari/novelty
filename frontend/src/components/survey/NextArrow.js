import React from 'react';

function NextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div className={className}
      style={{...style, display: 'block', background: '#343a40'}}
      onClick={onClick}></div>
  );
}

export default NextArrow;

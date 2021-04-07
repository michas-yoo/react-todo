import React from 'react';

const Category = ({data}) => {
  return (
    <div className="category" style={{backgroundColor: data.color}}>
      <h4>{data.name}</h4>
      <p>{data.count} задач</p>
    </div>
  );
};

export default Category;

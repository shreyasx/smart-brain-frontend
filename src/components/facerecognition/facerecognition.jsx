import React from 'react';
import './facerecognition.css';

const makeBoxes = arr => {
  let bo = [];
  for(var i =0;i<arr.length;i++)
    bo.push(
      <div key={i} className="bounding_box" style={{
        top: arr[i].topRow, right: arr[i].rightCol,
        bottom: arr[i].bottomRow, left: arr[i].leftCol
      }}></div>
    );
  return bo;
}

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" src={imageUrl} alt="" width='500px' height="auto" />
        {makeBoxes(boxes)}
      </div>
    </div>
  );
}

export default FaceRecognition;
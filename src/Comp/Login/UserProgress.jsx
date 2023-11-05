import React from 'react';

const UserProgress = ({value}) => {
  return (
   // progress bar
    <div className="w-full h-1  bg-gray-200 rounded-full">
      <div style={{maxWidth:`${value}%`}} className=" h-full text-center text-xs text-white bg-green-500 rounded-full progress">
      
      </div>
    </div>
  );
}

export default UserProgress;

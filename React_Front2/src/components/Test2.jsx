import React, { useContext } from 'react';
import { ThreeContext } from '../context';

const Form = () => {
    // Retrieve context data
  const radio = useContext(ThreeContext);
  return (
    <div className="user-form">
      <div className="input-item">
        <label className="label">Update radio: </label>
        <input
          className="input"
          onChange={e => radio.setOnoff(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Form;
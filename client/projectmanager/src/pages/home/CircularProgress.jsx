import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function CircularProgressWithLabel(props) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={120} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        {`${Math.round(props.value)}%`}
      </div>
    </div>
  );
}

export default CircularProgressWithLabel;

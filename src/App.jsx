import  { useState } from 'react';
import './App.css'
const WaterJugSolver = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [solution, setSolution] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const solveWaterJug = () => {
    // Reset state
    setSolution([]);
    setErrorMessage('');

    if (z > x && z > y && (x + y) % z !== 0) {
      setErrorMessage('No solution');
    } else {
      let bucketX = 0;
      let bucketY = 0;
      let steps = [];

      while (bucketX !== z && bucketY !== z) {
        if (bucketX === 0) {
          bucketX = x;
          steps.push({ x: bucketX, y: bucketY, explanation: 'Fill bucket X' });
        } else if (bucketY === y) {
          bucketY = 0;
          steps.push({ x: bucketX, y: bucketY, explanation: 'Empty bucket Y' });
        } else {
          const transferAmount = Math.min(bucketX, y - bucketY);
          bucketX -= transferAmount;
          bucketY += transferAmount;
          steps.push({ x: bucketX, y: bucketY, explanation: 'Transfer from X to Y' });
        }
      }

      setSolution(steps);
    }
  };

  const handleXChange = (e) => {
    setX(parseInt(e.target.value));
  };

  const handleYChange = (e) => {
    setY(parseInt(e.target.value));
  };

  const handleZChange = (e) => {
    setZ(parseInt(e.target.value));
  };

  return (
    <div>
      <h2>Water Jug Challenge</h2>
      <div>
        <label>Bucket X:</label>
        <input type="number" value={x} onChange={handleXChange} />
      </div>
      <div>
        <label>Bucket Y:</label>
        <input type="number" value={y} onChange={handleYChange} />
      </div>
      <div>
        <label>Amount wanted Z:</label>
        <input type="number" value={z} onChange={handleZChange} />
      </div>
      <button onClick={solveWaterJug}>Solve</button>
      {errorMessage && <p>{errorMessage}</p>}
      {solution.length > 0 && (
        <div>
          <h3>Solution:</h3>
          <table>
            <thead>
              <tr>
                <th>Bucket X</th>
                <th>Bucket Y</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              {solution.map((step, index) => (
                <tr key={index}>
                  <td>{step.x}</td>
                  <td>{step.y}</td>
                  <td>{step.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WaterJugSolver;

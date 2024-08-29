import React, { useEffect, useState } from 'react';

const TableauDesScores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch the top 10 scores from the server
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:3001/scores');
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  // Function to get the color based on the position
  const getTextColor = (index) => {
    if (index === 0) return '#FFD700'; // Gold for 1st place
    if (index === 1) return '#C0C0C0'; // Silver for 2nd place
    if (index === 2) return '#CD7F32'; // Bronze for 3rd place
    return ''; // Default color for other positions (black)
  };

  return (
    <div className="rounded">
      <h2 className="text-center" style={{ fontFamily: "Opti Agency Gothic", color: "#FFFFFF", fontSize: "125px", marginBottom: 0 }}>
        CLASSEMENT
      </h2>

    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.3", padding: "1.5em", paddingTop: "0.1em", paddingBottom: "0.1em" }}>
      <div className='mt-4' style={{ display: "flex", flexDirection: "row", color: "#FFFFFF", fontSize: "2em", fontFamily: "Opti Agency Gothic"}}>
          <p className='m-0 col-2'>Rang</p>
          <p className='m-0 col-4'>Prénom</p>
          <p className='m-0 col-3'>Score</p>
          <p className='m-0 col-3'>Temps</p>
        </div>

        {scores.map((score, index) => (
            <div className='mt-2 mb-3' key={index} style={{ color: "#FFFFFF", backgroundColor: getTextColor(index), display: "flex", flexDirection: "row", justifyContent: "space-around", fontSize: "1.7em", fontFamily: "Opti Agency Gothic"}}>
              <p className='m-0 col-2'>{index + 1}</p>
              <p className='m-0 col-4'>{score.firstname}</p>
              <p className='m-0 col-3'>{score.score}</p>
              <p className='m-0 col-3'>{score.time}</p>
            </div>
        ))}

    </div>
    





      {/* <table className="table table-striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Prénom</th>
            <th>Score</th>
            <th>Temps</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <th scope="row" style={{ color: getTextColor(index) }}>{index + 1}</th>
              <td  style={{ color: getTextColor(index) }}>{score.firstname}</td>
              <td  style={{ color: getTextColor(index) }}>{score.score}</td>
              <td  style={{ color: getTextColor(index) }}>{score.time}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default TableauDesScores;

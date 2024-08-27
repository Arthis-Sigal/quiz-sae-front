// src/TableauDesScores.jsx
import React from 'react';

const TableauDesScores = ({ scores }) => {
  return (
    <div className="my-4 p-4 rounded bg-light">
      <h2 className="text-center" style={{ fontFamily: 'Opti Agency Gothic', color: '#C1272D' }}>Tableau des Scores</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Score</th>
            <th>Temps</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{score.name}</td>
              <td>{score.score}</td>
              <td>{score.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableauDesScores;

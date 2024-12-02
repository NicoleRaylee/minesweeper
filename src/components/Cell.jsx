import React from 'react';

const Cell =  ({ cell, onClick }) => {
    const handleClick = () => {
        if (!cell.revealed && !cell.flagged) {
            onClick();

        }
    };
    return (
        <div className={`cell ${cell.revealed ? 
            'revealed' : ''}`} onClick={handleClick}>
                {cell.revealed && (cell.mine ? '💣' :
                cell.adjacentMines > 0 ? cell.adjacentMines :
            '')}
            </div>
    );
};

export default Cell;
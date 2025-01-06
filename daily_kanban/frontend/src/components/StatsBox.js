import React, { useState, useEffect } from 'react';


const StatsBox = ({title, value, description, icon}) => {

    return (
        <div className='stats-box-container'>
            {icon && <div className='stats-box-icon'>{icon}</div>}
            <h3 className='stats-box-title'>{title}</h3>
            <p className='stats-box-value'>{value}</p>
            {description && <p className='stats-box-description'>{description}</p>}
        </div>
    );

};

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         border: '1px solid #ddd',
//         borderRadius: '10px',
//         padding: '20px',
//         margin: '10px',
//         backgroundColor: '#f9f9f9',
//         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//         textAlign: 'center',
//         width: '30rem',
//     },
//     icon: {
//         fontSize: '30px',
//         marginBottom: '10px',
//     },
//     title: {
//         fontSize: '16px',
//         fontWeight: 'bold',
//         margin: '10px 0',
//     },
//     value: {
//         fontSize: '24px',
//         fontWeight: 'bold',
//         color: '#333',
//         margin: '5px 0',
//     },
//     description: {
//         fontSize: '14px',
//         color: '#666',
//         marginTop: '10px',
//     },
// };

export default StatsBox;
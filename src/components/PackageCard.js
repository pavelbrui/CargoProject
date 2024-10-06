// // src/components/PackageCard.js
// import React from 'react';

// const PackageCard = ({ children, index, removeDimension }) => {
//     return (
//         <div style={styles.card}>
//             <h4>Package #{index + 1}</h4>
//             <div style={styles.dimensionGroup}>
//                 {children}
//                 <button type="button" onClick={() => removeDimension(index)} style={styles.removeButton}>
//                     Remove Package
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Styles
// const styles = {
//     card: {
//         padding: '15px',
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         marginBottom: '15px',
//         backgroundColor: '#fff',
//         boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
//     },
//     dimensionGroup: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     removeButton: {
//         padding: '10px',
//         backgroundColor: '#DC3545',
//         color: 'white',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         marginTop: '10px',
//     },
// };

// export default PackageCard;

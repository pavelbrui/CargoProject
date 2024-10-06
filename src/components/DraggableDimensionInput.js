import React from 'react';
import { useDrag } from 'react-dnd';
import { useLanguage, translationsOrderForm } from '../LanguageContext';

const ITEM_TYPE = 'DIMENSION';

const DraggableDimensionInput = ({ index, dimension, handleDimensionChange, removeDimension }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const { language } = useLanguage(); // Get the current language
    const t = translationsOrderForm[language]; // Get translations for the current language

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                border: '2px solid #b88e2f', // Border color like old envelopes
                backgroundColor: '#f9f4e7', // Light background like paper
                borderRadius: '10px', // Rounded corners
                boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
                marginBottom: '15px',
                padding: '20px',
                position: 'relative',
                fontFamily: 'Georgia, serif', // Old-school font style
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* X button in the top-right corner */}
            <button
                type="button"
                onClick={() => removeDimension(index)}
                style={{
                    position: 'absolute',
                    top: '5px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#b88e2f',
                }}
            >
                &times;
            </button>

            {/* Package numbering */}
            <div style={{ marginBottom: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px', color: '#b88e2f' }}>
                {`${t.package} ${index + 1}`}
            </div>

            {/* Dimension fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#b88e2f', fontWeight: 'bold' }}>{t.length}</label>
                        <input
                            type="text"
                            name="length"
                            value={dimension.length}
                            onChange={(e) => handleDimensionChange(index, e)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#b88e2f', fontWeight: 'bold' }}>{t.width}</label>
                        <input
                            type="text"
                            name="width"
                            value={dimension.width}
                            onChange={(e) => handleDimensionChange(index, e)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#b88e2f', fontWeight: 'bold' }}>{t.height}</label>
                        <input
                            type="text"
                            name="height"
                            value={dimension.height}
                            onChange={(e) => handleDimensionChange(index, e)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#b88e2f', fontWeight: 'bold' }}>{t.weight}</label>
                        <input
                            type="text"
                            name="weight"
                            value={dimension.weight}
                            onChange={(e) => handleDimensionChange(index, e)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ color: '#b88e2f', fontWeight: 'bold' }}>{t.description}</label>
                    <input
                        type="text"
                        name="description"
                        value={dimension.description}
                        onChange={(e) => handleDimensionChange(index, e)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DraggableDimensionInput;

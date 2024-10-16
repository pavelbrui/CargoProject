import React from 'react';
import { useDrag } from 'react-dnd';
import { useLanguage, translationsOrderForm } from '../../LanguageContext';

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

    const handleNumberValidation = (e) => {
        const { value } = e.target;
        if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
            e.preventDefault();
            return;
        }
        handleDimensionChange(index, e);
    };

    return (
        <div
            ref={drag}
            style={{
                ...formStyles.draggableContainer,
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {/* X button in the top-right corner */}
            <button
                type="button"
                onClick={() => removeDimension(index)}
                style={formStyles.removeButton}
            >
                &times;
            </button>

            {/* element numbering */}
            <div style={formStyles.elementNumber}>{`${t.element} ${index + 1}`}</div>

            {/* Dimension fields */}
            <div style={formStyles.dimensionFieldsContainer}>
                <div style={formStyles.dimensionRow}>
                    <div style={formStyles.dimensionFieldGroupRow}>
                        <label style={formStyles.label}>{t.length}</label>
                        <input
                            type="text"
                            name="length"
                            value={dimension.length}
                            onChange={handleNumberValidation}
                            style={formStyles.inputSmall}
                        />
                    </div>
                    <div style={formStyles.dimensionFieldGroupRow}>
                        <label style={formStyles.label}>{t.width}</label>
                        <input
                            type="text"
                            name="width"
                            value={dimension.width}
                            onChange={handleNumberValidation}
                            style={formStyles.inputSmall}
                        />
                    </div>
                </div>

                <div style={formStyles.dimensionRow}>
                    <div style={formStyles.dimensionFieldGroupRow}>
                        <label style={formStyles.label}>{t.height}</label>
                        <input
                            type="text"
                            name="height"
                            value={dimension.height}
                            onChange={handleNumberValidation}
                            style={formStyles.inputSmall}
                        />
                    </div>
                    <div style={formStyles.dimensionFieldGroupRow}>
                        <label style={formStyles.label}>{t.weight}</label>
                        <input
                            type="text"
                            name="weight"
                            value={dimension.weight}
                            onChange={handleNumberValidation}
                            style={formStyles.inputSmall}
                        />
                    </div>
                </div>

                <div style={formStyles.dimensionFieldGroupFullWidthRow}>
                    <label style={formStyles.label}>{t.description}</label>
                    <input
                        type="text"
                        name="description"
                        value={dimension.description}
                        onChange={(e) => handleDimensionChange(index, e)}
                        style={formStyles.inputLarge}
                    />
                </div>
            </div>
        </div>
    );
};

export default DraggableDimensionInput;

const formStyles = {
    draggableContainer: {
        border: '2px solid #b88e2f',
        backgroundColor: '#f8f5f1',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
        padding: '20px',
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
    },
    removeButton: {
        position: 'absolute',
        top: '5px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#b60d0d',
    },
    elementNumber: {
        marginBottom: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#333',
    },
    dimensionFieldsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    dimensionRow: {
        display: 'flex',
        gap: '15px',
    },
    dimensionFieldGroupRow: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    dimensionFieldGroupFullWidthRow: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    label: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: '16px',
        whiteSpace: 'nowrap',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputSmall: {
        width: '100px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputLarge: {
        width: '465px',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};
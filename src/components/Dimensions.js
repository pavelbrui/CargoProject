// Dimensions.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLanguage, translationsOrderForm } from '../LanguageContext';
import DraggableDimensionInput from './DraggableDimensionInput';
import { useDrop } from 'react-dnd';

const ITEM_TYPE = 'DIMENSION';

const Dimensions = ({ formData, handleDimensionChange, removeDimension, addDimension }) => {
    const { language } = useLanguage(); // Get the current language
    const t = translationsOrderForm[language];
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    return (
        <fieldset style={formStyles.fieldset}>
            <legend style={formStyles.legend}>{t.dimensions}</legend>
            <div ref={drop} style={{ ...formStyles.dropArea, border: isOver ? '2px dashed green' : '2px solid transparent' }}>
                <TransitionGroup>
                    {formData.elements.map((dimension, index) => (
                        <CSSTransition key={index} timeout={300} classNames="fade">
                            <DraggableDimensionInput
                                index={index}
                                dimension={dimension}
                                handleDimensionChange={handleDimensionChange}
                                removeDimension={removeDimension}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <button type="button" onClick={addDimension} style={formStyles.addButton}>{t.addPackage}</button>
        </fieldset>
    );
};

const formStyles = {
    fieldset: {
        border: '1px solid #ccc',
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    legend: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    dropArea: {
        padding: '10px',
        marginBottom: '15px',
    },
    addButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '15px',
    },
};

export default Dimensions;

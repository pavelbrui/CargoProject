import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DraggableDimensionInput from './DraggableDimensionInput';

const ElementInputs = ({ formData, setFormData, t }) => {
    const handleDimensionChange = (index, e) => {
        const { name, value } = e.target;
        const newElements = [...formData.elements];
        newElements[index] = { ...newElements[index], [name]: value };
        setFormData(prev => ({ ...prev, elements: newElements }));
    };

    const addDimension = () => setFormData(prev => ({
        ...prev,
        elements: [...prev.elements, { length: '', width: '', height: '', weight: '', description: '' }],
    }));

    const removeDimension = (index) => {
        const newDimensions = formData.elements.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, elements: newDimensions }));
    };

    const moveDimension = (fromIndex, toIndex) => {
        const newDimensions = [...formData.elements];
        const [removed] = newDimensions.splice(fromIndex, 1);
        newDimensions.splice(toIndex, 0, removed);
        setFormData({ ...formData, elements: newDimensions });
    };

    return (
        <div style={formStyles.container}>
            <div>
                <h3 style={formStyles.subHeader}>{t.dimensions}</h3>
                <TransitionGroup>
                    {formData.elements.map((element, index) => (
                        <CSSTransition key={index} timeout={500} classNames="fade">
                            <DraggableDimensionInput
                                index={index}
                                dimension={element}
                                handleDimensionChange={handleDimensionChange}
                                removeDimension={removeDimension}
                                moveDimension={moveDimension}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <button type="button" onClick={addDimension} style={formStyles.addButton}>
                    + {t.addElement}
                </button>
            </div>
        </div>
    );
};

export default ElementInputs;

const formStyles = {
    container: {
        fontSize: '22px',
        fontWeight: 'bold',
        //padding: '0 10px',
        padding: '20px',
        marginBottom: '20px',
        //border: '1px solid #b88e2f',
        borderRadius: '10px',  
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
 
    subHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '15px',
    },
    addButton: {
        display: 'flex',
        margin: '0 auto',
        alignItems: 'right',
        justifyContent: 'right',
        padding: '10px 20px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#b60d0d',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '20px',
    },
};
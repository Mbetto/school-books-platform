import React, { useState } from 'react';

const FilterDropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="filter-dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                {selectedOption || 'Select an option'}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterDropdown;
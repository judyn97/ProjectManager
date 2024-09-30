import React, { useState } from 'react';

function Dropdown({ items, defaultSelected }) {
    const [selectedItem, setSelectedItem] = useState(defaultSelected || items[0]);
    const [isOpen, setIsOpen] = useState(false); // Tracks if the dropdown is open

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false); // Close the dropdown menu after selecting
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggles the dropdown open/closed
    };

    return (
        <div className={`dropdown ${isOpen ? 'dropdown-open' : ''}`}>
            <div className={`select ${isOpen ? 'select-clicked' : ''}`} onClick={toggleDropdown}>
                <span className="selected">{selectedItem}</span>
                <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
            </div>
            <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={selectedItem === item ? 'active' : ''}
                        onClick={() => handleSelect(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;

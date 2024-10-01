import { useState } from 'react';

function Dropdown({ items, selectedItem, setSelectedItem, setSelectedItemId }) {
    const [isOpen, setIsOpen] = useState(false); // Tracks if the dropdown is open

    const handleSelect = (item, itemId) => {
        setSelectedItem(item);
        setSelectedItemId(itemId);
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
                        className={selectedItem === item.project_name || item.department_name ? 'active' : ''}
                        onClick={() => handleSelect(item.project_name || item.department_name, item.project_id || item.department_id)}
                    >
                        {item.project_name || item.department_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;

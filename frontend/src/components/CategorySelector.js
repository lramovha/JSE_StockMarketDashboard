import React from 'react';

const categories = ["Indices", "Stocks", "ETFs", "Crypto", "Forex", "Futures", "Bonds"];

function CategorySelector({ selectedCategory, onCategoryChange }) {
    return (
        <div className="category-selector">
            {categories.map((category) => (
                <button
                    key={category}
                    className={selectedCategory === category ? "selected" : ""}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategorySelector;

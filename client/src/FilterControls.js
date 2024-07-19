import React from 'react';

function FilterControls({ filters, setFilters }) {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="filters">
      <input
        type="text"
        name="domain"
        placeholder="Domain"
        value={filters.domain}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="namespace"
        placeholder="Namespace"
        value={filters.namespace}
        onChange={handleInputChange}
      />
      <label>
        <input
          type="checkbox"
          name="minor"
          checked={filters.minor}
          onChange={handleInputChange}
        />
        Minor
      </label>
      <label>
        <input
          type="checkbox"
          name="bot"
          checked={filters.bot}
          onChange={handleInputChange}
        />
        Bot
      </label>
      <input
        type="text"
        name="regex"
        placeholder="Regex"
        value={filters.regex}
        onChange={handleInputChange}
      />
      <label>
        <input
          type="checkbox"
          name="anonymous"
          checked={filters.anonymous}
          onChange={handleInputChange}
        />
        Anonymous
      </label>
    </div>
  );
}

export default FilterControls;

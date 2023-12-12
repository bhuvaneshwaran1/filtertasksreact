import React, { useState } from 'react';

// Mock data
const tableData = [
  {
    name: 'John', screen_name: 'john_doe', followers_count: 100,
    following_count: 50, location: 'New York', verified: true
  }
];


const filterOperators = {
  string: [{ key: 'CONTAINS', prettyName: 'Contains' }],
  number: [
    { key: 'GTE', prettyName: '>=' },
    { key: 'LTE', prettyName: '<=' },
  ],
  boolean: [{ key: 'EQ', prettyName: 'Equals' }],
};

const DynamicTable = () => {
  const [filters, setFilters] = useState([]);

  const handleAddFilter = () => {
    setFilters([...filters, { column: '', operator: '', value: '', conjunction: 'AND' }]);
  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleFilterChange = (index, field, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index][field] = value;
    setFilters(updatedFilters);
  };

  const applyFilters = () => {

    console.log('Filter Query:', filters);

  };

  return (
    <div>

      <div>
        {filters.map((filter, index) => (
          <div key={index}>
            <select
              value={filter.conjunction}
              onChange={(e) => handleFilterChange(index, 'conjunction', e.target.value)}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
            <select
              value={filter.column}
              onChange={(e) => handleFilterChange(index, 'column', e.target.value)}
            >
              <option value="">Select Column</option>
              <option value="name">Name</option>
              <option value="screen_name">Screen Name</option>
              <option value="followers_count">Followers Count</option>
              <option value="following_count">Following Count</option>
              <option value="location">Location</option>
              <option value="verified">Verified</option>
            </select>
            <select
              value={filter.operator}
              onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
            >
              <option value="">Select Operator</option>
              {filter.column && filterOperators[typeof tableData[0][filter.column]].map((op) => (
                <option key={op.key} value={op.key}>
                  {op.prettyName}
                </option>
              ))}
            </select>
            {filter.column && typeof tableData[0][filter.column] === 'boolean' ? (
              <select
                value={filter.value}
                onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              >
                <option value="">Select Value</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : (
              <input
                type="text"
                value={filter.value}
                onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              />
            )}
            <button onClick={() => handleRemoveFilter(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddFilter}>Add Filter</button>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Screen Name</th>
            <th>Followers Count</th>
            <th>Following Count</th>
            <th>Location</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>

          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.name}</td>
              <td>{row.screen_name}</td>
              <td>{row.followers_count}</td>
              <td>{row.following_count}</td>
              <td>{row.location}</td>
              <td>{row.verified.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import './App.css';

// Mock data
const tableData = [
  {
    Name: 'John', screen_name: 'john_doe', followers_count: 100,
    following_count: 50, Location: 'New York', Verified: true
  },
  {
    Name: 'Bhuvan', screen_name: 'Bhuvan_esh', followers_count: 800,
    following_count: 90, Location: 'London', Verified: true
  },
  {
    Name: 'Dsk', screen_name: 'Dsk_sk', followers_count: 600,
    following_count: 20, Location: 'America', Verified: false
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

  const [filters, setFilters] = useState([{ conjunction: 'AND', column: '', operator: '', value: '' }]);
  const handleAddFilter = () => {
    setFilters([...filters, { conjunction: 'AND', column: '', operator: '', value: '' }]);

  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleFilterChange = (index, field, value, e) => {
    const updatedFilters = [...filters];
    updatedFilters[index][field] = value;
    setFilters(updatedFilters);
    console.log(e, "e")
  };

  const applyFilters = () => {
    console.log('Filter Query:', filters);
  };

  const [filteredTableData, setFilteredTableData] = useState(tableData);

  useEffect(() => {
    const newFilteredData = tableData.filter((row) => {
      return filters.every((filter) => {
        if (!filter.column || !filter.operator || !filter.value) {
          return true;
        }

        const cellValue = row[filter.column];
        switch (filter.operator) {
          case 'CONTAINS':
            return cellValue.includes(filter.value);
          case 'GTE':
            return cellValue >= filter.value;
          case 'LTE':
            return cellValue <= filter.value;
          case 'EQ':
            return cellValue === (filter.value === 'true');
          default:
            return true;
        }
      });
    });

    setFilteredTableData(newFilteredData);
  }, [filters]);

  return (
    <div>
      <div className='table-aligns'>
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
              {Object.keys(tableData[0]).map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
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

      <div className='table-aligns'>
        <Table>
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {filteredTableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell.toString()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DynamicTable;

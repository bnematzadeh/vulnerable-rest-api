import React from "react";


const SearchBox = ({ value, onChange }) => {
  return (
      <div className="input-group rounded">
        <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        />
      </div>
  );
};

export default SearchBox;

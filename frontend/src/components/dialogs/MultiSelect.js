import React, { useState } from 'react';
import Select from 'react-select';

function Test() {
  const data = [
    {
      value: 1,
      label: "Lernfach1"
    },
    {
      value: 2,
      label: "Lernfach2"
    },
    {
      value: 3,
      label: "true red"
    },
    {
      value: 4,
      label: "aqua sky"
    },
    {
      value: 5,
      label: "tigerlily"
    },
    {
      value: 6,
      label: "blue turquoise"
    }
  ];

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    
  }
  console.log(selectedValue)
  return (
    <div className="App">

      <Select
        className="dropdown"
        placeholder="Wähle deine Lernfächer"
        value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
        options={data} // set list of the data
        onChange={handleChange}// assign onChange function
        isMulti
        isClearable
      />

      {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div><b>Ausgewählte Lernfächer: </b> {JSON.stringify(selectedValue, null, 2)}</div>
      </div>}
    </div>
  );
}

export default Test;
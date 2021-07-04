import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from '@material-ui/core'

function MultiSelectLernfaecher( { lernfaecher, onChangeLernfaecher }) {
  const data = [
    {
      value: 1,
      label: "Software Entwicklung"
    },
    {
      value: 2,
      label: "Data Science"
    },
    {
      value: 3,
      label: "Führungsorientiertes Rechnungswesen"
    },
    {
      value: 4,
      label: "Medienrecht"
    },
    {
      value: 5,
      label: "Crossmedia-Konzeption"
    },
    {
      value: 6,
      label: "Web-Technologien"
    },
    {
      value: 7,
      label: "Datenbanken"
    },
    {
      value: 8,
      label: "IT-Security"
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
      <b>Wähle bitte alle Lernfächer, die du aktuell lernen möchtest und bestätige deine Auswahl.</b><br/>
      <b style={{color: "red", fontSize: 14}}>Deine vorherige Auswahl wird vollständig gelöscht!</b><br/>
      <br/>
      <Select
        className="dropdown"
        placeholder="Wähle deine Lernfächer"
        value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
        options={data} // set list of the data
        onChange={handleChange}// assign onChange function
        isMulti
        isClearable
      />
    <Button
    onClick={() => {onChangeLernfaecher(selectedValue);}} color='primary'>
        Ausgewählte Lernfächer bestätigen
    </Button>
    </div>
  );
}

export default MultiSelectLernfaecher;
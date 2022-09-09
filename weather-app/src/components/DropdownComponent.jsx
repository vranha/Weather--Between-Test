import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function DropdownComponent({ drop, setDrop }) {


  const options = [
    'Barcelona', 'Berlin', 'Madrid'
  ];


  return (
    <div>
      <Dropdown options={options} onChange={(e) => setDrop(e.value)} value={drop} placeholder="Select a city" />
    </div>
  )
}

export default DropdownComponent
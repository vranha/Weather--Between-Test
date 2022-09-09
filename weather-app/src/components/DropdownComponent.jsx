import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate } from 'react-router-dom';

function DropdownComponent({ drop, setDrop }) {

  const navigate = useNavigate()

  const options = [
    'Barcelona', 'Berlin', 'Madrid'
  ];


  return (
    <div className="dropdown">
      <Dropdown options={options} onChange={(e) =>{ 
        setDrop(e.value) 
        navigate('/week')
      }} 
      value={drop} placeholder="Select a city" />
    </div>
  )
}

export default DropdownComponent
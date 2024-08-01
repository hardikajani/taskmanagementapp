
import PropTypes from 'prop-types';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChage, handleSearch, onClearSearch }) => {
  return (
    <div className='w-full flex items-center px-4 bg-slate-100 rounded-md'>
      <input
        type="text"
        placeholder='Search Task'
        className='w-full py-2 bg-transparent outline-none'
        value={value}
        onChange={onChage}
      />


      {value &&
        <IoMdClose
          className='text-slate-400 cursor-pointer hover:text-[#333] mr-3'
          onClick={onClearSearch}
        />
      }
      <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-[#333]' onClick={handleSearch} />
    </div>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChage: PropTypes.func,
  handleSearch: PropTypes.func,
  onClearSearch: PropTypes.func,
}

export default SearchBar;
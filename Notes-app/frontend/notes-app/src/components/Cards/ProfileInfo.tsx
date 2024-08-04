import React, { useState } from 'react'
import { getInitials } from '../../utils/helper';

type Props = {
  onLogout: () => void;
}

const ProfileInfo = ({onLogout}: Props) => {
  //get from backend or authContect?
  const [name, setName] = useState("Eddy Lim");
    
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials(name.trim())}</div>

      <div>
        <p className='text-sm font-medium'>{name}</p>
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo
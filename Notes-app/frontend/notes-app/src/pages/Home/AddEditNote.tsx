import React from 'react'

type Props = {}

function AddEditNote({}: Props) {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text" className='text-xl text-slate-950 outline-none' placeholder='e.g. Go to gym'/>
      </div>

      <div className='flex flex-col gap-2 mt-4'>
      <label className='input-label'>DESCRIPTION</label>
      <textarea className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='e.g. lifting weight 4x10kg' rows={10}></textarea>
      </div>

      <div className='mt-3'>
      <label className='input-label'>TAGS</label>
      </div>

      <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>ADD</button>
    </div>
  )
}

export default AddEditNote
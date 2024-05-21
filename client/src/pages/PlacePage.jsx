import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

export const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if(!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    })
  }, [id])
  
  if(!place) return '';

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
      <h1 className="text-3xl">{place.title}</h1>
      <a target='_blank' href={'https://maps.google.com/?g='+place.address} className="my-2 block font-semibold underline" rel="noreferrer">{place.address}</a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div className="">
          {place.photos?.[0] && (
            <div className="">
              <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="IMAGE"/>
            </div>
          )}
        </div>
        <div className="grid">
        {place.photos?.[1] && (
            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos?.[1]} alt="IMAGE"/>
          )}
          {place.photos?.[2] && (
            <img className='aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos?.[2]} alt="IMAGE"/>
          )}
        </div>
      </div>
    </div>
  )
}
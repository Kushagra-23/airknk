
// eslint-disable-next-line react/prop-types
export const PlaceImg = ({ place, index=0, className=null }) => {

  // eslint-disable-next-line react/prop-types
  if(!place.photos?.length) {
    return ''
  }

  if(!className) {
    className = 'object-cover';
  }

  return (
      // eslint-disable-next-line react/prop-types
      <img className={className} src={'http://localhost:4000/uploads/'+place.photos[index]} alt=""/>
  )
}
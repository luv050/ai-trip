import React from 'react'
import PlaceCardItem from './PlaceCarditem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <div>
            {Object.entries(trip?.tripData?.itinerary || {}).map(([day, dayData], index) => (
                <div key={day}>
                    <h2 className='font-medium text-l'>Day {day.replace('day', '')}</h2>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                        {dayData.activities?.map((place, placeIndex) => (
                            <div key={placeIndex}>
                                <h2 className='font-medium text-sm text-orange-600'>
                                    {place.travelTime}
                                </h2>
                                <PlaceCardItem place={place}/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit
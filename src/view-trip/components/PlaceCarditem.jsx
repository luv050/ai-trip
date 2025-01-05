import React from 'react'
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName + "," + place?.geoCoordinates} target='_blank'>
                <div className='my-4 bg-gray-50 p-2 gap-2 border rounded-lg flex flex-cols-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                    <div className='py-2 mx-3'>
                        <img src='/placeholder.jpg' className='w-[140px] h-[140px] rounded-xl object-cover' />
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>{place.placeName}</h2>
                        <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                        <h2 className='text-blue-700 text-sm'>{place.ticketPricing}</h2>
                        <h2 className='text-sm text-yellow-500'>⭐{place.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PlaceCardItem;
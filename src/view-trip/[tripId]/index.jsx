import { db } from '@/service /fireBaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InformationSection from '../components/InformationSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';


function ViewTrip() {


    const { tripId } = useParams();
    const [trip, setTrip] = useState(null)



    const GetTripData = async () => {


        const docRef = doc(db, 'finaltrip', tripId);// doc dekh lena how we fetch data from firebase 
        const docSnap = await getDoc(docRef);

        // console.log(docSnap.data());
        if (docSnap.exists()) {
            console.log("doc=", docSnap.data());
            setTrip(docSnap.data())
            console.log(trip)
        }
        else {
            console.log("no such doc exists");
            toast('No trip found');
        }

    };

    useEffect(() => {
        tripId && GetTripData();// whenever trip data exists only call this fxn then
    }, [tripId])

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56  '> {/* ViewTrip: {tripId}  */}

            {/* info section  */}
            <InformationSection trip={trip} />
            {/* recommended hotels  */}
            <Hotels trip={trip} />
            {/* daily plan  */}
            <PlacesToVisit trip={trip} />
            {/* footer  */}
            <Footer trip={trip} />
        </div>
    );
}

export default ViewTrip 
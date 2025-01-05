import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetoptions, SelectTravelesList } from '@/constants/options';
import { Expand } from 'lucide-react';
import { FaGoogle } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import GooglePlacesAutoComplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { stringify } from 'postcss';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service /fireBaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatSession } from '@/service /AIModel';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);// intially false
  const [loading, setLoading] = useState(false);

  const navi =useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
     onSuccess: (codeResp) =>  {GetUserProfile(codeResp);// console.log(codeResp),
     },
     onError: (error) => {
      console.log(error);
      toast.error("Failed to log in. Please try again.");
    }
  });

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("please fill all the details")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
    

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text())
  }
  const saveAiTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString()
    await setDoc(doc(db, "finaltrip", docId), { 
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);

    navi(`/view-trip/${docId}`);//navi('/view-trip' +docId);

  }
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile.");
    });
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 l:px-10 px-5 ml-5'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences  </h2>
      <p className='mt-3 text-gray-500 text-xl  '> Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences. </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium '> What is destination of choice? </h2>
          <GooglePlacesAutoComplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium '> How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium '> What is your Budget? </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetoptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg
                  ${formData?.budget == item.title && 'shadow-lg border-black'}
                ` }>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium '> Who do you plan on traveling with on your next adventure? </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg
                      ${formData?.traveler == item.people && 'shadow-lg border-black'}
                    `}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'generate trip'
          }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle> {/* Add this line */}
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className='font-bold text-lg'>Sign in with Google</h2>
              <p>Sign in with Google authorization security</p>
              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>
                <FaGoogle className='h-7 w-7' />
                Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>


  )
}

export default CreateTrip 

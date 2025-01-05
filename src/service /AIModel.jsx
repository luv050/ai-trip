
  import { GoogleGenerativeAI } from "@google/generative-ai";
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
//   async function run() {
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visiin JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a JSON format travel plan for a budget-friendly 3-day trip to Las Vegas for a couple. I've included hotel options, a daily itinerary, and all the requested details.\n\n```json\n{\n  \"tripTitle\": \"Budget-Friendly Las Vegas Getaway for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n    \"hotels\": [\n        {\n            \"hotelName\": \"Circus Circus Hotel & Casino\",\n            \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n            \"price\": \"$40 - $80 per night\",\n          \"hotelImageUrl\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/a5/57/35/caption.jpg?w=1200&h=-1&s=1\",\n            \"geoCoordinates\": {\n                \"latitude\": 36.1261,\n                \"longitude\": -115.1679\n            },\n            \"rating\": 3.8,\n            \"description\": \"An iconic, budget-friendly hotel on the Strip with a circus theme, offering family-friendly entertainment and basic amenities.\"\n        },\n        {\n            \"hotelName\": \"Excalibur Hotel & Casino\",\n            \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n            \"price\": \"$50 - $90 per night\",\n           \"hotelImageUrl\": \"https://media-cdn.tripadvisor.com/media/photo-s/29/45/58/03/excalibur-hotel-and-casino.jpg\",\n            \"geoCoordinates\": {\n                \"latitude\": 36.0989,\n                \"longitude\": -115.1712\n            },\n            \"rating\": 4.0,\n            \"description\": \"A medieval-themed hotel on the Strip with affordable rooms and a variety of dining and entertainment options.\"\n        },\n      {\n        \"hotelName\": \"Luxor Hotel and Casino\",\n        \"hotelAddress\": \"3900 S Las Vegas Blvd, Las Vegas, NV 89119\",\n        \"price\": \"$50 - $100 per night\",\n         \"hotelImageUrl\": \"https://www.vegas.com/wp-content/uploads/2018/11/luxor-las-vegas.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0956,\n          \"longitude\": -115.1751\n        },\n        \"rating\": 4.1,\n        \"description\": \"A unique pyramid-shaped hotel on the Strip with an Egyptian theme and a variety of entertainment and dining options.\"\n      }\n    ],\n    \"itinerary\": {\n        \"day1\": {\n            \"theme\": \"Exploring the Strip and Free Attractions\",\n            \"bestTimeToVisit\": \"Late afternoon/Evening\",\n            \"activities\": [\n              {\n                  \"placeName\": \"Welcome to Fabulous Las Vegas Sign\",\n                  \"placeDetails\": \"Iconic sign, great for photo ops. Start of many Vegas trips.\",\n                  \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Las_Vegas_Sign_Night.jpg/800px-Las_Vegas_Sign_Night.jpg\",\n                  \"geoCoordinates\": {\n                      \"latitude\": 36.0828,\n                      \"longitude\": -115.1716\n                  },\n                 \"ticketPricing\": \"Free\",\n                  \"rating\": 4.6,\n                  \"travelTime\": \"10-15 minutes from Strip Hotels by Taxi/RideShare\"\n\n              },\n                {\n                    \"placeName\": \"Bellagio Conservatory & Botanical Gardens\",\n                    \"placeDetails\": \"Stunning, free floral display that changes seasonally.\",\n                    \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Bellagio_conservatory_fall_2018.jpg/800px-Bellagio_conservatory_fall_2018.jpg\",\n                    \"geoCoordinates\": {\n                        \"latitude\": 36.1125,\n                        \"longitude\": -115.1742\n                    },\n                    \"ticketPricing\": \"Free\",\n                    \"rating\": 4.7,\n                    \"travelTime\": \"10-15 minutes walk from hotel\"\n                },\n                {\n                    \"placeName\": \"Fountains of Bellagio\",\n                    \"placeDetails\": \"Spectacular water show with music and lights.  Runs every 30mins in afternoon and every 15mins in the evening.\",\n                    \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/a/a5/Bellagio_Fountain.jpg\",\n                   \"geoCoordinates\": {\n                        \"latitude\": 36.1129,\n                        \"longitude\": -115.1739\n                   },\n                    \"ticketPricing\": \"Free\",\n                    \"rating\": 4.8,\n                    \"travelTime\": \"Right outside Bellagio Conservatory\"\n                },\n                 {\n                    \"placeName\": \"Explore the LINQ Promenade\",\n                    \"placeDetails\": \"Outdoor shopping and entertainment district with food options. View the High Roller (optional, paid ride).\",\n                    \"placeImageUrl\":\"https://www.vegasmeansbusiness.com/wp-content/uploads/2022/01/The-LINQ-Promenade.jpeg\",\n                     \"geoCoordinates\": {\n                         \"latitude\": 36.1165,\n                         \"longitude\": -115.1705\n                    },\n                    \"ticketPricing\": \"Free to walk around. Optional: High Roller ticket $25-$35\",\n                    \"rating\": 4.4,\n                    \"travelTime\":\"10-15 minutes walk from Bellagio \"\n                 }\n            ]\n        },\n        \"day2\": {\n            \"theme\": \"Downtown Las Vegas and Fremont Street\",\n             \"bestTimeToVisit\": \"Evening\",\n            \"activities\": [\n               {\n                    \"placeName\": \"Fremont Street Experience\",\n                    \"placeDetails\": \"Pedestrian mall with light shows, street performers, and a vibrant atmosphere. \",\n                   \"placeImageUrl\":\"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Fremont_Street_Experience_2014.JPG/800px-Fremont_Street_Experience_2014.JPG\",\n                     \"geoCoordinates\": {\n                         \"latitude\": 36.1700,\n                         \"longitude\": -115.1400\n                    },\n                    \"ticketPricing\": \"Free\",\n                    \"rating\": 4.6,\n                    \"travelTime\": \"20-30 minute taxi/ride share from The Strip\"\n                },\n                {\n                    \"placeName\": \"Container Park\",\n                    \"placeDetails\": \"Unique shopping and dining complex made from shipping containers, family friendly.\",\n                     \"placeImageUrl\": \"https://static.wixstatic.com/media/79a1af_ef37492797f34f6d9187489777456c18~mv2.jpg/v1/fill/w_588,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/container%20park%202.jpg\",\n                    \"geoCoordinates\": {\n                         \"latitude\": 36.1680,\n                         \"longitude\": -115.1409\n                    },\n                    \"ticketPricing\": \"Free to enter. Cost varies with vendors.\",\n                    \"rating\": 4.5,\n                    \"travelTime\": \"5 min walk from Fremont Street Experience\"\n                 },\n                {\n                  \"placeName\": \"Mob Museum\",\n                  \"placeDetails\": \"Interactive museum detailing the history of organized crime, for history and crime enthusiasts (Optional).\",\n                  \"placeImageUrl\": \"https://www.mobmuseum.org/wp-content/uploads/2021/04/mob-museum-01-scaled-1.jpg\",\n                   \"geoCoordinates\": {\n                        \"latitude\": 36.1735,\n                        \"longitude\": -115.1419\n                    },\n                   \"ticketPricing\": \"$30 - $35 per person\",\n                  \"rating\": 4.7,\n                   \"travelTime\":\"5-10 min walk from container park\"\n                }\n\n\n            ]\n        },\n        \"day3\": {\n          \"theme\": \"Relaxation & Departure\",\n          \"bestTimeToVisit\": \"Morning/Early Afternoon\",\n          \"activities\":[\n           {\n                  \"placeName\": \"Pool Day at Hotel\",\n                  \"placeDetails\": \"Enjoy the pool and other amenities at your hotel.\",\n                 \"placeImageUrl\":\"https://www.venetianlasvegas.com/content/dam/venetian/pool/venetian-pool-hero.jpg\",\n                \"geoCoordinates\": {\n                      \"latitude\": 36.1261,\n                       \"longitude\": -115.1679\n                  },\n                    \"ticketPricing\": \"Free (included in hotel stay)\",\n                    \"rating\": 4.2,\n                    \"travelTime\": \"Within the Hotel\"\n              },\n            {\n              \"placeName\": \"High Roller Observation Wheel\",\n             \"placeDetails\":\"Take a ride on the world's tallest observation wheel for amazing views of Las Vegas(Optional) \",\n              \"placeImageUrl\":\"https://www.caesars.com/content/dam/clv/Things%20To%20Do/High_Roller_at_The_LINQ.jpg\",\n              \"geoCoordinates\": {\n                \"latitude\": 36.1165,\n                \"longitude\": -115.1705\n              },\n              \"ticketPricing\": \"$25-$35\",\n              \"rating\": 4.6,\n              \"travelTime\":\"10-15 min Taxi/RideShare from Hotel\"\n            },\n              {\n                \"placeName\": \"Departure\",\n                \"placeDetails\": \"Head to the airport for departure, purchase some souviners if time permits\",\n                \"placeImageUrl\":\"https://a.cdn-hotels.com/gdcs/production171/d140/3377558b-2477-4cb0-b81c-7a0a7cbdf887.jpg\",\n                \"geoCoordinates\": {\n                   \"latitude\": 36.0801,\n                  \"longitude\": -115.1523\n                },\n                \"ticketPricing\": \"N/A\",\n                \"rating\": \"N/A\",\n                \"travelTime\":\"15 min Taxi/RideShare from Hotel\"\n            }\n          ]\n        }\n    }\n}\n```\n**Notes:**\n\n*   **Prices:** Hotel and ticket prices are estimates and can vary depending on time of year, day of the week, and booking method.\n*   **Transportation:** The itinerary assumes using a combination of walking, ride-sharing (like Uber/Lyft) or taxis. The Monorail is an option but might not cover all desired locations.\n*   **Food:** This plan focuses on low-cost activities.  Food expenses are not included but there are many affordable options in Vegas. Consider cheaper options like food trucks or fast food.\n*   **Flexibility:** This is just a suggestion. Feel free to adjust it to fit your interests.\n*   **Reservations:** It's always a good idea to book hotel rooms in advance, especially during peak season.\n*   **Free Activities:** Vegas has many free things to see and do which this itinerary maximizes.\n*   **Optional:**  Some activities like the Mob Museum and High Roller are marked as optional to provide flexibility for your budget.\n\nRemember to double-check prices and opening hours closer to your travel date! Enjoy your trip to Vegas!\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
//   }
  
//   run();
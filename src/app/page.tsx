import BestHotels from "@/components/best-hotels/BestHotels";
import Hero from "@/components/hero/Hero";
import PopularLocations from "@/components/popular-locations/PopularLocations";
import sea from "../../public/sea.jpg"
import hotel_image from "../../public/hr_10.jpg"
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <Hero
        image={sea}
        mainHeader="Are you ready for an adventure?"
        secondaryHeader="Browse through the popular locations"
      />
      <PopularLocations />
      <Hero
        image={hotel_image}
        mainHeader="Get the best offer for your hotel!"
        secondaryHeader="Pick your desired place"
      />
      <BestHotels />
    </>
  );
}

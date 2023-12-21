import { Carousel } from "@material-tailwind/react";
import slide1 from "../../assets/slide/slide1.jpg";
import slide2 from "../../assets/slide/slide2.png";
import slide3 from "../../assets/slide/slide3.jpg";
import slide4 from "../../assets/slide/slide4.jpg";
import slide5 from "../../assets/slide/slide5.jpg";
export function HomeSlide() {
  return (
    <Carousel className="rounded-xl">
      <img src={slide1} alt="image 1" className="h-full w-full object-cover" />
      <img src={slide2} alt="image 1" className="h-full w-full object-cover" />
      <img src={slide3} alt="image 1" className="h-full w-full object-cover" />
      <img src={slide4} alt="image 1" className="h-full w-full object-cover" />
      <img src={slide5} alt="image 1" className="h-full w-full object-cover" />
    </Carousel>
  );
}

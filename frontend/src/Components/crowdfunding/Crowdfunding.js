import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useQuery, useMutation } from "@apollo/client";
import { getEvents } from "../../Query/eventQuerry";
import { Link } from "react-router-dom";
export default function Crowdfunding() {
  const { loading, error, data } = useQuery(getEvents);
  return (
    <>
   
<h1 align="center" className="SectionTitle-dark">OUR EVENTS</h1>
            <p  className="paragraph2">Explore our variety of Events</p> 
            <div className="listofproducts Aboutus"></div>
      <div className=" py-4 px-0  " style={{width:'75%',margin:'auto',padding:'10px'}}>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className="mySwiper"
          slidesPerView={4}
          spaceBetween={100}
          setWrapperSize={0}
          width={1000}
          

        >
          {console.log(data?.events)}
          {data?.events.map((p) => (
            <div  key={p.id}>
            <SwiperSlide>
              <Link to={`/`}>
                <div
                  align="center"
                  className="containerproduit"
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/${p.imageUrl})`,
                  }}
                >{console.log(p.imageUrl)}
                  <div className="overlay" draggable="false">
                    <div className="items"></div>
                    <div className="items head">
                      <p>{p.name}</p>
                    </div>
                    <hr />
                    <div className="items price">
                      
                      <p className="new">{p.dateStart.substr(0, 10) } </p>
                    </div>
                    <div className="items price">
                      <p className="new">{p.dateEnd.substr(0, 10) } </p>
                    </div>
                    <Card.Text as="div">
                    <p className="new">{p.participantsnumber} </p>
                    </Card.Text>
                    <div className="items cart"></div>
                  </div>
                </div>{" "}
              </Link>
            </SwiperSlide>
            </div>
          ))}
          
        </Swiper>
      </div>
      
       
      
    </>
  );
}

import React from "react";
import HeaderLogged from "../../components/headerLogged/HeaderLogged";
import Footer from "../../components/Footer/Footer";

export default function ExperienceDetails() {
  return (
    <>
      <HeaderLogged />

      <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden">
        <div className="card-body p-0">

          <div className="p-6 md:p-8">
            <p className="text-lg text-accent-content font-medium mb-2">
              Routes with a local perspective
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-2 leading-tight">
              Forest Brews & Village Flavors
            </h1>
            <p className="text-xl text-primary text-content mb-4">Java, Indonesia</p>
          </div>
         
          <div className="carousel w-full mb-8 relative [filter:sepia(40%)]">
            <div id="slide1" className="carousel-item w-full">
              <img
                src="https://placehold.co/1000x600/aabbcc/ffffff?text=Experience+Image+1"
                className="w-full object-cover h-auto"
                alt="Experience Image 1"
              />
            </div>
            <div id="slide2" className="carousel-item w-full">
              <img
                src="https://placehold.co/1000x600/ccddaa/ffffff?text=Experience+Image+2"
                className="w-full object-cover h-auto"
                alt="Experience Image 2"
              />
            </div>
            <div id="slide3" className="carousel-item w-full">
              <img
                src="https://placehold.co/1000x600/ddccbb/ffffff?text=Experience+Image+3"
                className="w-full object-cover h-auto"
                alt="Experience Image 3"
              />
            </div>
          </div>

          <div className="p-6 md:p-8 pt-0 flex flex-col lg:flex-row gap-6">

         
            <div className="flex-1 order-2 lg:order-1">
              <div className="text-md text-content mb-4 flex items-center gap-2 ml-5">
                <span className="font-semibold text-base-content">Created by:</span>{" "}
                Collaborator | <span className="font-bold text-secondary">@rosemary</span>
              </div>

              <p className="text-base text-base-content leading-relaxed mb-6 ml-5">
                Embark on the "Forest Brews & Village Flavors" tour, an
                authentic journey designed by locals to unveil the hidden gems
                of Java's enchanting countryside. Traverse picturesque forest
                landscapes, breathing in the crisp, clean air as you venture
                between charming, untouched villages. In each quaint hamlet,
                discover unique coffee traditions and savor distinct local
                flavors, from artisan roasts to delightful regional
                delicacies. This immersive experience promises a true taste
                of rural Java, blending natural beauty with rich culinary
                discoveries.
              </p>
           
              <div className="bg-base-200  pb-10 pt-4">
                <h3 className="text-2xl font-semibold text-secondary ml-5 mb-4">
                  What to Expect
                </h3>
                <p className="text-md text-secondary font-semibold text-neutral-content ml-5 mb-6">Duration: 6 hours</p>
                <div className="text-base text-base-content leading-relaxed space-y-4 ml-5">
                  <p>
                    <span className="font-bold text-base-content">Journey to the Countryside:</span> Meet
                    your local guide and depart for a scenic drive into Java's
                    enchanting forest region.
                  </p>
                  <p>
                    <span className="font-bold text-base-content">Village 1 - Coffee & Local Delights:</span>{" "}
                    Arrive at your first charming village for an artisan coffee
                    tasting and a delightful sampling of traditional local pastries
                    at a beloved village spot.
                  </p>
                  <p>
                    <span className="font-bold text-base-content">Forest Serenity:</span> Take a
                    refreshing short walk through the tranquil forest, allowing you
                    to connect with nature and breathe in the crisp, clean air.
                  </p>
                  <p>
                    <span className="font-bold text-base-content">
                      Village 2 - Unique Brews & Rustic Bites:
                    </span>{" "}
                    Explore a second, more secluded village, where you'll discover
                    another distinct coffee flavor and indulge in savory regional
                    specialties.
                  </p>
                  <p>
                    <span className="font-bold text-base-content ">Return Journey:</span> Enjoy a
                    picturesque drive back to your starting point, filled with
                    memories of rural Catalan charm and authentic flavors.
                  </p>
                </div>
              </div>
             
              <div className="bg-base-300 pt-8 pb-6 [filter:sepia(40%)]">
                <h3 className="text-2xl font-semibold text-primary mb-4 ml-5">
                  Contact the local guide
                </h3>
                <div className="flex items-center gap-6 mb-8 ml-5">
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full">
                      <img
                        src="https://placehold.co/80x80/dddddd/000000?text=Host"
                        alt="Host Profile"
                      />
                    </div>
                  </div>
                  <div className="text-base text-base-content leading-relaxed flex flex-col gap-1">
                    <p>Name: Nguyen Hai</p>
                    <p>Email: mrsumatra@hotmail.com</p>
                    <p>Phone/whatsapp: +62 812-3456-7890</p>
                  </div>
                </div>
              </div>
            </div>
           
            <div className="flex flex-col gap-4 w-11/12 mx-auto lg:w-64 flex-shrink-0 self-start order-1 lg:order-2 ">
           
              <div className="card bg-secondary shadow-md rounded-lg p-6 text-center [filter:sepia(40%)]">
                <div className="text-xl font-bold text-neutral-content mb-2">Average Price</div>
                <div className="text-3xl font-extrabold text-neutral-content">EUR 30</div>
              </div>

        
              <div className="flex flex-col gap-3">
                
                <div className="">
                  <div className="card-body p-0 flex items-center justify-center">
                    <button className="btn btn-primary text-primary-content w-full">Edit this Experience</button>
                  </div>
                </div>
              
                <div className="">
                  <div className="card-body p-0 flex items-center justify-center">
                    <button className="btn btn-neutral text-error-content w-full">Delete this Experience</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
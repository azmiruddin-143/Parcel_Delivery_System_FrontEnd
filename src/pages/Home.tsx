// // src/pages/HomePage.tsx

// import HeroSection from '@/components/modules/Home/HeroSection';
// import heroBackground from '../assets/images/travel-register.jpg'; 
// import HowItWorks from '@/components/modules/Home/HowItWorks';
// import KeyFeatures from '@/components/modules/Home/KeyFeatures';
// import Testimonials from '@/components/modules/Home/Testimonials';
// import CallToAction from '@/components/modules/Home/CallToAction';

// const Home = () => {
//     return (
//         <div>
//             {/* Your Hero Section goes here */}
//             <HeroSection
//                 title="Your Fast and Reliable Parcel Delivery Partner"
//                 subtitle="Deliver with confidence. Experience seamless, secure, and swift parcel delivery services tailored for your needs."
//                 buttonText="Send Your Parcel Now"
//                 buttonLink="/sender/parcelcreate"
//                 backgroundImage={heroBackground} // Use the imported image variable
//             />

//             {/* Your other homepage sections would go here */}
//             <HowItWorks />
//             <KeyFeatures/>
//             <Testimonials />

//              <CallToAction
//                 headline="Start your first delivery with us today!"
//                 buttonText="Book Your Parcel"
//                 buttonLink="/sender/parcelcreate"
//             />
//         </div>
//     );
// };

// export default Home;










import HeroSection from '@/components/modules/Home/HeroSection';
import heroBackground from '../assets/images/travel-register.jpg'; // Path to your hero image
import HowItWorks from '@/components/modules/Home/HowItWorks';
import KeyFeatures from '@/components/modules/Home/KeyFeatures';
import Testimonials from '@/components/modules/Home/Testimonials';
import CallToAction from '@/components/modules/Home/CallToAction';

const Home = () => {
    // Fetch the current user's information

    const buttonText = "Book Your Parcel Now";
    const buttonLink = "/register"; // Directing all users to the registration page



    return (
        <div>
            {/* The HeroSection component now uses the dynamic props */}
            <HeroSection
                title="Your Fast and Reliable Parcel Delivery Partner"
                subtitle="Deliver with confidence. Experience seamless, secure, and swift parcel delivery services tailored for your needs."
                buttonText={buttonText}
                buttonLink={buttonLink}
                backgroundImage={heroBackground}
            />

            <HowItWorks />
            <KeyFeatures />
            <Testimonials />

            <CallToAction
                headline="Start your first delivery with us today!"
                 buttonText={buttonText}
                buttonLink={buttonLink}
            />
        </div>
    );
};

export default Home;
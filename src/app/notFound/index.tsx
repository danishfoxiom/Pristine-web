import Lottie from 'lottie-react';
import notFoundAnimation from '../../asset/image/Page Not Found 404.json'; // Update path to where you saved the JSON

const NotFound = () => {
  return (
    <div className=" items-center justify-center">
    
      <div className="w-full h-[80vh]">
        <Lottie 
          animationData={notFoundAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
        {/* <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Whoops!! Something Went Wrong. <br /> Page Not Found</h1>
      </div> */}
    </div>
  );
};

export default NotFound;
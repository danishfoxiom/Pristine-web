import Lottie from 'lottie-react';
import notFoundAnimation from '../../asset/images/404 not found.json'; // Update path to where you saved the JSON

const NotFound = () => {
  return (
    <div className="h-[650px] flex flex-col items-center justify-center">
    
      <div className="w-96 h-96">
        <Lottie 
          animationData={notFoundAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
        <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Whoops!! Something Went Wrong. <br /> Page Not Found</h1>
      </div>
    </div>
  );
};

export default NotFound;
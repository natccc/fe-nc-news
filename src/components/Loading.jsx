import {useState, useEffect} from "react";

const Loading = () => {
  const [message, setMessage] = useState("");
  
  useEffect(()=>{
    {setTimeout(() => {
      setMessage(
        'Page is still loading... ' +
        'This is most likely due to the server reinitialising after a period of inactivity.' +
        ' Thank you for your patience.'
      );
    }, "2000")}
  },[])
  return (
    <div className="flex mt-8 flex-col gap-4 items-center justify-center text-gray-300" >
      
       <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] "
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>        
      <p className="container m-4 text-gray-800 text-center animate-pulse">{message}</p>
    </div>
  );
};

export default Loading;

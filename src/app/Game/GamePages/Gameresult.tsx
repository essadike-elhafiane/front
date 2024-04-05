import '@/app/globals.css'
import RenderContext from '@/components/context/render';
import "@/styles/game/Gameplay.css";
import {  useContext, useEffect } from 'react';
import { GameContext } from '../Gamecontext/gamecontext';
import UserDataContext from '@/components/context/context';


const Gameresult : React.FC<{ result : string } > = (props) => {

    const game = useContext(GameContext);
    const render = useContext(RenderContext);
    const user = useContext(UserDataContext );

  useEffect(() => {
      setTimeout(() => {
        game?.setRunning(false);
        game?.setlodingdata({
          users  : [{
            clientid : user?.id || -1 ,
               image : user?.image || "no image",
               username : user?.userName || "no name" ,
                ingame : false
      } ] ,
          gameloding: true });   
        game?.setplayerposition("");
        game?.setGamemode("");
        game?.settype("");
        game?.setgamefriend(-1);

        render?.setRender("home");
      }, 2000);
  }, []);


    return (
      <div className="w-[100vw] h-[100vh] absolute z-50 flex justify-center  items-center backdrop-blur-sm">
       
        <div className="  w-[400px] max-w-[700px] rounded-full h-[400px]  flex justify-center items-center border-[15px] border-blue-500 shadow-[0_0_20px_10px_#3B82F6]" >
          <div className=" result  w-[270px]  rounded-full h-[270px]  flex justify-cente items-center border-[15px] border-blue-500 shadow-[0_0_20px_10px_#3B82F6]" >
            <h1 className="font-sans font-semibold text-white text-6xl text-center" >{props.result}</h1> 
          </div>
        </div>
      </div>
  
    )
  }

export default Gameresult;



//   import '@/app/globals.css'
// import "@/styles/game/Gameplay.css";
// import { useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';


// const Gameresult : React.FC<{ result : string , rungame : boolean} > = (props) => {


  

//   useEffect(() => {
//     // Call the toast function here
//     toast.success(props.result);
//   }, []); 
//     return (   
//       <div>
//         <Toaster/>
//       </div>
//     )
//   }

//   export default Gameresult;

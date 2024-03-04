import Image from "next/image";
import Profile from "./Profile";
import { useState } from "react";
import axios from "axios";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
import UserDataContext from "@/components/context/context";
import { useContext } from "react";

const Buttons = ({ButtonClick}) => {
    
    const [activeButton, setActiveButton] = useState(1);

    const handleActiveButton = (buttonId) => {
      setActiveButton(buttonId);
    };

    
    const handleButtonClick = (value:number) => {
        handleActiveButton(value);
        ButtonClick(value);
    };



    return (
        <div className="buttons">
            <div className={`sideButton ${activeButton === 1 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(1)}>
                <Image className="icon" src="homeimages/homeicon.svg" alt="logo" width={14} height={18}/>
                <h2>Home</h2> 
            </div>

            <div className={`sideButton ${activeButton === 2 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(2)}>
                <Image className="icon" src="homeimages/gamesicon.svg" alt="logo" width={20} height={18}/>
                <h2>Games</h2> 
            </div>

            <div className={`sideButton ${activeButton === 3 ? 'activeChatButton' : ''}`}  onClick={() => handleButtonClick(3)}>
                <Image className="icon" src="homeimages/rankingicon.svg" alt="logo" width={20} height={18}/>
                <h2>Ranking</h2> 
            </div>

            <div className={`sideButton ${activeButton === 4 ? 'activeChatButton' : ''}`}  onClick={() => handleButtonClick(4)}>
                <Image className="icon" src="homeimages/searchicon.svg" alt="logo" width={20} height={18}/>
                <h2>Search</h2> 
            </div>

            <div className={`sideButton visible xl:invisible ${activeButton === 5 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(5)}>
                <Image className="icon" src="homeimages/chaticon.svg" alt="logo" width={20} height={18}/>
                <h2>Chat</h2> 
            </div>
        </div>
);

}

const PhoneButtons = ({ButtonClick}) => {
    
    const [activeButton, setActiveButton] = useState(1);

    const handleActiveButton = (buttonId) => {
      setActiveButton(buttonId);
    };

    const handleButtonClick = (value:number) => {
        handleActiveButton(value);
        ButtonClick(value);
    };

    return (

        <div className="phonebuttons">

            <div className={`phonebutton ${activeButton === 1 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(1)}>
                <Image className="Phoneicon" src="homeimages/homeicon.svg" alt="logo" width={24} height={20}/>
            </div>

             <div className={`phonebutton ${activeButton === 2 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(2)}>
                <Image className="Phoneicon" src="homeimages/gamesicon.svg" alt="logo" width={30} height={18}/>
            </div>
             <div className={`phonebutton ${activeButton === 3 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(3)}>
                <Image className="Phoneicon" src="homeimages/rankingicon.svg" alt="logo" width={30} height={18}/>
            </div>
             <div className={`phonebutton ${activeButton === 4 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(4)}>
                <Image className="Phoneicon" src="homeimages/searchicon.svg" alt="logo" width={30} height={18}/>
            </div>
             <div className={`phonebutton ${activeButton === 5 ? 'activeChatButton' : ''}`} onClick={() => handleButtonClick(5)}>
                <Image className="Phoneicon" src="homeimages/chaticon.svg" alt="logo" width={24} height={18}/>
            </div>

        </div>
    );
}

const Sidebar = ({ButtonClick}) => {

    const data: UserData | null = useContext(UserDataContext);
    const router = useRouter()
    async function Logout() {
        try{
            const res = await axios.get(process.env.NEST_API + '/logout', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if(res.data){
                // //console.log('Success:', data);
               
                    router.push('/login');
            }
        }
        catch (error) {
            //console.error('Error:', error);
        };
    }

    return (
        <div className="side_holder">
            <div className="Sidebar">
                <Buttons ButtonClick={ButtonClick}/>
                <div className="logout">

                    <Profile src={data?.image} />

                    <h2 className="Username">{data.userName}</h2>

                    <div className="logoutSection">
                        <button className="logoutbutton" onClick={Logout}>
                            logout
                        </button>
                    </div>

                </div>
            </div>
        
            <div className="PhoneSidebar">
                
               <PhoneButtons ButtonClick={ButtonClick}/>
                <div className="logoutIcon" onClick={Logout}>
                    <Image className="" src="homeimages/logouticon.svg" alt="logo" width={26} height={18}/>
                </div>

            </div>
        </div>
    );
}

export default Sidebar
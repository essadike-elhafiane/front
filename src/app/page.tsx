"use client";
// "use strict";
import { use, useEffect, useState } from "react";
import "../styles/login/landingPage.css";
import axios from "axios";
import UserDataContext, { UserData } from "@/components/context/context";
import App from "./App";
import { Loding } from "./home/Loding";
import { useRouter } from "next/navigation";
import VerifyTwoFa from "@/components/Qrcode/QRcode";
import ProfileDataContext, {
  ProfileData,
} from "@/components/context/profilDataContext";
import { FriendsType, InvitsType } from "@/components/userProfile/Dto";
import io, { Socket } from "socket.io-client";
import SocketContext from "@/components/context/socket";
import Gameplay from "./Game/GamePages/Gameplay";
import BouncingBall from "./Game/GamePages/Gameplay";
import Gameresult from "./Game/GamePages/Gameresult";
import Friends from "@/components/userProfile/Friends";
import Navbar from "./component/Navbar";


/*
  * if u need to use the socket in the app component, you can use the SocketContext to get
  * the socket instance like this:
  * 
  * expemple:
  * 
  * const socket = useContext(SocketContext);
  * 
  * for accessing FriendsData, InvitsData, and BlockedFriend, you can use the ProfileDataContext
  * 
  * example:
  * const { FriendsData, InvitsData, BlockedData } = useContext(ProfileDataContext);
  * 
  * if you need to use the user public data, you can use the UserDataContext
  * 
  * example:
  * 
  * const data = useContext(UserDataContext);
  */


interface PropesBlockedData {
  setFriendsData: (FriendsData: FriendsType[]) => void;
}

const getFriends = async (proes: PropesBlockedData) => {
  try {
    const res = await axios.get(process.env.NEST_API + "/user/friends", {
      withCredentials: true,
    });
    //   console.log(res);
    if (res) {
      proes.setFriendsData(res.data);
    }
  } catch (e) {
    console.log(e);
  }
};

interface PropesgetInvits {
  setInvitsData: (InvitsData: InvitsType[]) => void;
}

const getInvits = async (proes: PropesgetInvits) => {
  try {
    const res = await axios.get(process.env.NEST_API + "/user/invits", {
      withCredentials: true,
    });
    //   console.log(res);
    if (res) {
      proes.setInvitsData(res.data);
    }
  } catch (e) {
    console.log(e);
  }
};

interface PropessetBlockedData {
  setBlockedData: (BlockedData: FriendsType[]) => void;
}

const getBlocked = async (proes: PropessetBlockedData) => {
  try {
    const dataBlocked = await axios.get(
      process.env.NEST_API + "/user/blocked",
      {
        withCredentials: true,
      }
    );
    proes.setBlockedData(dataBlocked.data);
    // console.log('Blocked ::', dataBlocked);
  } catch (error) {
    console.log(error);
  }
};

export default function landingPage() {


  

 
  const [data, setData] = useState<UserData | null>(null);
  const [checkTwoFactor, setCheckTwoFactor] = useState(
    data?.twoFaCheck || false
  );
  const [FriendsData, setFriendsData] = useState<FriendsType[] | null>(null);
  const [InvitsData, setInvitsData] = useState<InvitsType[] | null>(null);
  const [BlockedData, setBlockedData] = useState<FriendsType[] | null>(null);
  const [Socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();




  useEffect(() => {
    // Check if the socket has already been initialized
    if (Socket) return;
  
    const socket = io(process.env.NEST_API ?? "", {
        withCredentials: true,
        // autoConnect: true by default, so no need to explicitly call connect()
    });
  
    socket.on("online", (data: {id: number}) => {
      console.log("online", data);
      if(data)
        setFriendsData((currentFriends) => currentFriends ? currentFriends.map((friend: FriendsType) => friend.id === data.id ? {...friend, online: true} : friend) : null);
    });

    socket.on("offline", (data: {id: number}) => { 
      console.log("offline", data);
      if(data)
        setFriendsData((currentFriends) => currentFriends ? currentFriends.map((friend: FriendsType) => friend.id === data.id ? {...friend, online: false} : friend) : null);
    });
    // Setup event listeners only once
    socket.on("connect", () => {
        console.log("socket connected::::::::::::::::::::::");
    });
  
    socket.on("disconnect", () => {
      console.log("socket disconnected::::::::::::::::::::::");
    });

    socket.on("DeleteFriend", (id : number) => {
      console.log("DeleteFriend", id);
      setFriendsData((currentInvits) => currentInvits ? currentInvits.filter((invit: FriendsType) => invit.id !== id) : null);
    })

    socket.on("UnBlocked", (id : number) => {
      console.log("UnBlocked", id);
      setBlockedData((currentBlocked) => currentBlocked ? currentBlocked.filter((blocked: FriendsType) => blocked.id !== id) : null);
    });
    
    socket.on("NewFriend", (data: FriendsType) => {
      if (data === undefined || !data) return;
      // if(FriendsData?.some((friend) => friend.id === data.id)) return;
      // console.log("NewFriend", data);
      setFriendsData((currentFriends) => currentFriends ? [...currentFriends, data] : [data]);
      setInvitsData((currentInvits) => currentInvits ? currentInvits.filter((invit: InvitsType) => invit.sender.id !== data.id) : null);
    });

    socket.on("NewInvit", (data: InvitsType) => {
      console.log("NewInvit :", data);
      if(InvitsData?.find((invit: InvitsType) => invit.sender.id === data.sender.id)) return;
      setInvitsData((currentInvits) => currentInvits ? [...currentInvits, data] : [data]);
    });
  
    socket.on("DeleteInvit", (id: number) => {
      console.log("DeleteInvit", id);
      setInvitsData((currentInvits) => currentInvits ? currentInvits.filter((invit: InvitsType) => invit.sender.id !== id) : null);
    });
    
    socket.on("NewBlocked", (data: FriendsType) => {
      // const isUserBlocked = BlockedData?.some((blocked: FriendsType) => blocked.id === data.id);
      // if (isUserBlocked) return;
      // console.log("NewBlocked", data, isUserBlocked);
        setBlockedData((currentBlocked) => currentBlocked ? [...currentBlocked, data] : [data]);
        setFriendsData((currentFriends) => currentFriends ? currentFriends.filter((friend: FriendsType) => friend.id !== data.id) : null);
    });
  
    
    // Update the Socket state to ensure this effect runs only once
    setSocket(socket);
  
    // Cleanup function to disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Removed Socket from dependency array


  useEffect(() => {
    

    if (!data) {
      const getdata = async () => {
        try {
          const ApiUrl = process.env.NEST_API;
          const res = await axios.get(ApiUrl + "/profile", {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          if (
            res.data === undefined ||
            res.data === false ||
            res.data === null ||
            res.data.update === undefined ||
            res.data.update === false
          ) {
            router.push("/login");
          } else if (res.data.twoFa === true) {
            setData(res.data);
            setCheckTwoFactor(res.data.twofaCheck);
          } else if (res.data.twoFa === false) {
            setData(res.data);
            setCheckTwoFactor(true);
          } else setData(res.data);
          console.log("Data:", res.data, data);
        } catch (error) {
          // console.log('Error:', error);
          router.push("/login");
        }
      };
      getdata();
    }
    if (!FriendsData) {
      getFriends({ setFriendsData });
    }
    if (!InvitsData) {
      getInvits({ setInvitsData });
    }
    if (!BlockedData) {
      getBlocked({ setBlockedData });
    }

    return () => {
      Socket?.off('connect')
      Socket?.off('disconnect')
    };
  }, []);

  
  // console.log("FriendsData:", FriendsData);
  // console.log("InvitsData:", InvitsData);
  // console.log("BlockedData:", BlockedData);

  
  return (
    <>
      <UserDataContext.Provider value={data}>
        <ProfileDataContext.Provider
          value={{ FriendsData, InvitsData, BlockedData }}
        >
        <SocketContext.Provider value={Socket}>
          
          {data ? (
            checkTwoFactor ? (
              <App />
              
          //    rungame && <> <Navbar /> <Gameplay gamemode={gamemode} gametype={gametype} friend={gamefiend} stopGame={stopGame} /></>
            ) : (
              <VerifyTwoFa close={setCheckTwoFactor} />
            )
          ) : (
            <Loding />
          )}
        </SocketContext.Provider>
        </ProfileDataContext.Provider>
      </UserDataContext.Provider>
    </>
  );
}

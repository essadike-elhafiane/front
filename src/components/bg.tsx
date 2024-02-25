import Image from "next/image";
import '@/styles/login/landingPage.css';
// import '@/styles/globals.css';

export default function BackGround() {
    return (
        <div className='bg'>
            <Image
                src="./Backgroundimage.svg"
                alt="background"
                priority={true}
                fill
                className="bgImage"
                sizes="100vw"
                style={{
                    objectFit: "cover",
                }} />
         </div>
    );
}
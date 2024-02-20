import Image from "next/image";
import '../styles/login/landingPage.css';

export default function BackGround() {
    return (
        <div className='bg'>
            <Image
                src="/Backgroundimage.svg"
                alt="Pongy"
                priority={true}
                fill
                sizes="100vw"
                style={{
                    objectFit: "cover",
                }} />
         </div>
    );
}
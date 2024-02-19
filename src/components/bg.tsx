import Image from "next/image";
import '../style/landingPage.css';

export default function BackGround() {
    return (
        // <div className='bg'>
            <Image
                src="./background.jpg"
                alt="PongMaster"
                priority={true}
                fill
                sizes="100vw"
                style={{
                    objectFit: "cover"
                }} />
        // </div>
    );
}
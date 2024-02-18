import Image from "next/legacy/image";
import '../style/landingPage.css';

export default function BackGround() {
    return (
        <div className='bg'>
            <Image src="./background.jpg" objectFit="cover"  alt="PongMaster"  layout="fill" priority={true} />
        </div>
    )
}
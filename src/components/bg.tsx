import Image from "next/image";
import '@/styles/login/landingPage.css';
import bgound from '../../public/Backgroundimage.svg';
// import '@/styles/globals.css';

export default function BackGround() {
    return (
        <div className='bg'>
            <Image
                src={bgound}
                alt="background"
                priority={true}
                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }} />
         </div>
    );
}
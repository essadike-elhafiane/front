import Image from "next/image";
import '@/styles/login/landingPage.css';
import bgound from '../../public/Backgroundimage.webp';
// import '@/styles/globals.css';

const BackGround = () => {
    return (
        <div className='bg'>
            <Image
                src={bgound}
                alt="background"
                priority={true}
                quality={100}
                fill
                sizes="100vw"
                placeholder="blur"
                style={{
                    objectFit: 'cover',
                    filter: 'saturate(0.65)',
                }} />
         </div>
    );
}

export default BackGround;
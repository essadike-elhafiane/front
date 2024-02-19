import '@/styles/login/styles.css';
import '@/styles/login/loding.css'

export const Loding = () => {
  return (
      // <div className="loader"></div> 
      <div className='containerLoding'>
        <div className="loader1">
          <li className="ball"></li>
          <li className="ball"></li>
          <li className="ball"></li>
        </div>
      </div>
  );
};
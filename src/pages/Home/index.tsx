import Header from '../../features/Header';
import '../Home/index.css';

const HomePage = (): JSX.Element => {
  const imgBg = `${process.env.PUBLIC_URL}/homePageBackground.png`;
  const imgGoogle = `${process.env.PUBLIC_URL}/googlePlay.png`;
  const onClick = (path: string): void => {
    window.location.href = path;
  };
  return (
    <div>
        <Header/>
        <main className='relative'>
            <div>
              <div className='absolute -z-10'>
                <img src={imgBg}/>
              </div>
              <div className='welcome'>
                <div className='flex'>
                  <h1 className='text-3xl md:text-4xl lg:text-6xl'>Welcome to&nbsp;</h1>
                  <h1 className='font-medium text-3xl md:text-4xl lg:text-6xl'>Papilio</h1>
                </div>
                <h3 className='text-lg md:text-2xl lg:text-4xl'>Where you can find every</h3>
                <h3 className='text-lg md:text-xl lg:text-4xl'>Activity at your Fingertips</h3>
                <p className='max-w-xs text-xs md:max-w-md md:text-md lg:max-w-xl lg:text-xl'>Get the App and Start Exploring your City Today</p>
                <img src={imgGoogle} className='cursor-pointer h-15 w-40' onClick={() => { onClick('https://play.google.com/store/apps'); }}/>
              </div>
            </div>
        </main>
    </div>
  );
};

export default HomePage;

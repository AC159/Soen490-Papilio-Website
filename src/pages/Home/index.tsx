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
      <Header />
      <main className="relative">
        <div>
          <div className="absolute -z-10">
            <img src={imgBg} />
            <footer className="bg-[#053F5C] bg-opacity-50">
              <div className="w-full mx-auto max-w-screen-xl p-10 md:flex md:items-center md:justify-between">
                <span className="text-md text-white sm:text-center dark:text-gray-400">© 2022 <a href="" className="hover:underline">Papilio™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-md font-medium text-white dark:text-gray-400 sm:mt-0">
                  <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                  </li>
                  <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Android App</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Contact</a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
          <div className="welcome">
            <div className="flex">
              <h1 className="text-3xl md:text-4xl lg:text-6xl">
                Welcome to <span className="font-medium">Papilio</span>
              </h1>
            </div>
            <h3 className="text-lg md:text-2xl lg:text-4xl">
              Where you can find every
            </h3>
            <h3 className="text-lg md:text-xl lg:text-4xl">
              Activity at your Fingertips
            </h3>
            <p className="max-w-xs text-xs md:max-w-md md:text-md lg:max-w-xl lg:text-xl">
              Get the App and Start Exploring your City Today
            </p>
            <img
              src={imgGoogle}
              className="cursor-pointer h-15 w-40"
              onClick={() => {
                onClick('https://play.google.com/store/apps');
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

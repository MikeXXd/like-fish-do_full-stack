import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NavBar from '../components/NavBar';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <div className="">
        <NavBar />
        <div className="flex justify-center items-center flex-col gap-5">
          <h1 className='text-4xl mt-5'>Oops...</h1>
          <h2 className='text-2xl text-yellow-600'>{isRouteErrorResponse(error) && `${error.status} - ${error.statusText}`}</h2>
          <p className='text-md '>
            {isRouteErrorResponse(error)
              ? `Invalid page `
              : 'Something went wrong'}
          </p>
        </div>
         {/* TODO: a few fish icons at the bottom of the page gray colours */}
      </div>
    </>
  );
};

export default ErrorPage;


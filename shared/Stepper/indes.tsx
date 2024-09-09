const CONTRACT_ADDRESS = process.env.BASE_CONTRACT_ADDRESS;
export const Stepper = () => {
  return (
    <div>
      <ol className="flex items-center w-full text-sm text-gray-500 font-medium sm:text-base mb-12">
        <li className="flex md:w-full items-center text-indigo-600  sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 ">
          <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 ">
            <span className="w-6 h-6 bg-indigo-600 border border-indigo-200 rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10">
              1
            </span>
            Personal Info
          </div>
        </li>
        <li className="flex md:w-full items-center text-gray-600 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 ">
          <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2 ">
            <span className="w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10">
              2
            </span>
            Account Info
          </div>
        </li>
        <li className="flex md:w-full items-center text-gray-600 ">
          <div className="flex items-center  ">
            <span className="w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10">
              3
            </span>{" "}
            Confirmation
          </div>
        </li>
      </ol>
    </div>
  );
};

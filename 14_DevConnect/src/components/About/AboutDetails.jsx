import { Link } from "react-router-dom";

function AboutDetails() {
  return (
    <div className="flex pt-14 lg:justify-between justify-center px-8 gap-4">
      <div className="hidden lg:block w-250">
        <img
          src="https://uftsixsunvrpbwrmcrre.supabase.co/storage/v1/object/public/devconnect-images/logos/Boy.png"
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-150 lg:w-fit">
        <h4 className="text-center text-[14px] font-semibold text-purple-800">
          ABOUT DEVCONNECT
        </h4>
        <h2 className="text-center text-4xl font-bold">
          Connecting Developers, Building the Future
        </h2>
        <h4 className="text-center text-[14px]">
          DevConnect is a platform built by developers, for developers. We
          believe in the power of collaboration, knowledge sharing, and
          community. Whether you're a beginner or an experienced developer,
          DevConnect helps you showcase your work, discover exciting projects,
          connect with talented developers, and learn together in an environment
          designed to inspire innovation and continuous growth.
        </h4>
        <Link
          to="/signup"
          className="flex bg-purple-600 px-4 py-2 w-fit items-center gap-4 rounded-md"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/3386/3386878.png"
            alt=""
            width="24px"
          />
          <h4 className="text-[12px] font-semibold text-white">
            Join Our Community
          </h4>
        </Link>
      </div>
      <div className="hidden xl:block w-250">
        <img
          src="https://uftsixsunvrpbwrmcrre.supabase.co/storage/v1/object/public/devconnect-images/logos/Girl.png"
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default AboutDetails;

function AboutGithub() {
  return (
    <div className="p-4">
      <div className="w-full bg-purple-100 border border-blue-400/30 items-center flex justify-between p-4 rounded-lg shadow-lg gap-8 md:flex-row flex-col">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-300 rounded-full w-20 h-20">
            <img
              src="https://cdn-icons-png.flaticon.com/256/6517/6517429.png"
              alt=""
              width=""
              className="bg-blue-700 p-1 rounded-full h-full w-full"
            />
          </div>
          <div className="w-fit">
            <h2 className="font-bold text-lg">Built with ❤️ by Developers</h2>
            <h4 className="text-[14px]">
              DevConnect is open source and community-driven. Together, we can
              build somethinh amazing.
            </h4>
          </div>
        </div>
        <a
          href="https://github.com/Parshant124"
          target="_blank"
          className="flex items-center h-fit gap-4 border-purple-700/30 border-2 rounded px-4 py-2"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/270/270798.png"
            alt=""
            width="24px"
          />
          <h4 className="font-bold text-[14px] text-purple-700">
            View on GitHub
          </h4>
        </a>
      </div>
    </div>
  );
}

export default AboutGithub;

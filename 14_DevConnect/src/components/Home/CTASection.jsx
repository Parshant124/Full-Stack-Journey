import { Link } from "react-router-dom";

function CTASection() {
  return (
    <div className="bg-purple-200 flex flex-col items-center gap-2 mt-4 py-4">
      <h2 className="font-bold text-2xl">Ready to Start Your Journey?</h2>
      <h4 className="">
        Join thousands of developers building amazing things.
      </h4>
      <Link to="/signup">
        <button className="bg-purple-600 text-white font-medium text-[14px] px-8 py-2 rounded-md">
          Create Free Account
        </button>
      </Link>
    </div>
  );
}

export default CTASection;

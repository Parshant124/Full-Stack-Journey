function FeaturesCard({ iconbg, icon, title, desc }) {
  return (
    <div className="text-center flex flex-col items-center gap-2 border border-black/30 rounded-lg p-4 shadow-xl">
      <div className={`p-2 bg-${iconbg} w-fit rounded-full`}>
        <img src={icon} alt="" width="35px" />
      </div>
      <h2 className="font-bold text-[18px]">{title}</h2>
      <h4 className="text-[14px]">{desc}</h4>
    </div>
  );
}

export default FeaturesCard;

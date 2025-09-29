export const RoundCircle = ({ size, className }) => {
    return (
      <div
        className={
          `border border-t-black border-l-black opacity-10 border-r-white -rotate-45 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ` +
          className
        }
        style={{ width: size, height: size }}
      ></div>
    );
  };
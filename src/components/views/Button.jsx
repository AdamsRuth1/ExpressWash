

const Button = ({ disable, handleSubmit, text }) => {
  return (
    <>
      <div className="pt-[2rem]">
        <button
          disabled={disable}
          onClick={handleSubmit}
          className="w-[480px] h-[72px] rounded-[5px] bg-[#252E6A] text-[#FFFFFF] font-normal text-[18px] leading-[22px] moderat-font "
        >
          {text}
        </button>
      </div>
    </>
  );
};

export default Button;
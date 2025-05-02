export default function Input({ label, name, type = 'text', value }) {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          className="w-full border-2 border-black bg-[#D9D9D9] 
            focus:border-[#191970] focus:ring-1 focus:ring-[#191970]
            focus:shadow-[0_0_8px_#191970] 
            transition-all duration-200 ease-in-out
            outline-none p-2"
        />
      </>
    );
  }
  
import React from "react";
import whatsappIcon from "../../assets/img/whatsapp.png"; // ✅ update the path based on your folder

const FloatingWhatsAppButton = () => {
  const handleClick = () => {
    window.open(
      "https://wa.me/919944940051?text=Hi%20BM%20Academy%2C%20I%20am%20interested%20in%20taking%20the%20webinar.",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-[9999] p-0  cursor-pointer   hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        className="w-[60px] h-[60px]"
      />
    </button>
  );
};

export default FloatingWhatsAppButton;

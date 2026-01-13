import React from 'react'
import Logo from "../../assets/img/BM_ACADEMY1.png";
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const Whatsapp = () => {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber="9787755755"
        accountName="BM_Academy"
        avatar={Logo}
        statusMessage="Online"
        chatMessage="Welcome to BM_Academy"
        placeholder="Type a message..."
        darkMode={true}
        allowEsc
        allowClickAway
      />
    </div>
  )
}

export default Whatsapp

import React from 'react';

function Footer() {
  let today = new Date();
  let year = today.getFullYear(); 
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy;{year} Mesto Russia</p>
    </footer>
  );
}
export default Footer;
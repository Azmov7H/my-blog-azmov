
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css'
import {Themeprovider } from "./hooks/context/Them";
export const metadata = {
  title: "Az-Blog",
  description: "Az-Blog News ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='font-mono'>
        <Themeprovider>
          <Navbar />
          {children}
          <Footer />
        </Themeprovider>


      </body>
    </html>
  );
}

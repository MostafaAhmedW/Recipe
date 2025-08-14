import logo from '../../assets/logo.png'

export default function Footer() {
  return (
<>
<div className="footer-tex bg-[#ffffff] z-50 relative py-4">
  <div className="img-footer  flex items-center justify-between mx-10">
    <div className=' flex items-center font-bold'>
    <img src={logo} alt="logo" className='w-[80px]' />
    <h3>Recipe</h3>
    </div>
    <div> <p className='text-blue-800 font-bold'> Route</p></div>
  </div>

  <div className="text-footer mt-6  text-center pt-6  border-t border-t-gray-200">
    <p className='text-black font-light text-[14px]'>© 2025. All Rights Reserved.</p>
</div>

</div>

</>


  )
}
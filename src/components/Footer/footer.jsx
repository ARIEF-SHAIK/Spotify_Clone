import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-black text-gray-300 py-10 px-6 md:px-20">
  <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
    <div>
      <h4 className="font-bold text-white mb-3">Company</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Jobs</a></li>
        <li><a href="#" className="hover:underline">For the Record</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-bold text-white mb-3">Communities</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">For Artists</a></li>
        <li><a href="#" className="hover:underline">Developers</a></li>
        <li><a href="#" className="hover:underline">Advertising</a></li>
        <li><a href="#" className="hover:underline">Investors</a></li>
        <li><a href="#" className="hover:underline">Vendors</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-bold text-white mb-3">Useful links</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Support</a></li>
        <li><a href="#" className="hover:underline">Free Mobile App</a></li>
        <li><a href="#" className="hover:underline">Popular by Country</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-bold text-white mb-3">Spotify Plans</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Premium Individual</a></li>
        <li><a href="#" className="hover:underline">Premium Duo</a></li>
        <li><a href="#" className="hover:underline">Premium Family</a></li>
        <li><a href="#" className="hover:underline">Premium Student</a></li>
        <li><a href="#" className="hover:underline">Spotify Free</a></li>
      </ul>
    </div>
  </div>
  <hr className="border-gray-800 mt-10" />
</footer>
      
    </div>
  )
}

export default Footer

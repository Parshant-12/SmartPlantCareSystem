import React from 'react'

function Contact() {
  return (
    <div className='text-black h-auto container m-auto flex flex-col items-center justify-center py-32 max-md:max-h-[83vh]'>
      <div className='border-2 border-[#584f68] sm:w-[400px] w-[320px] max-md:w-[300px] rounded-2xl flex flex-col items-center px-4 max-md:px-2 py-4 text-center z-10'>
        <div >
          <h1 className='text-5xl font-medium animate-infinite-glow pb-2 max-md:text-4xl'>Contact</h1>
        </div>
        <form action="https://api.web3forms.com/submit" method="POST" className='w-full h-full sm:px-6 px-2 py-3 flex flex-col items-center justify-center gap-8 max-md:gap-4'>
          <input type="hidden" name="access_key" value="-----" />
          <input name="name" className='bg-transparent border-2 border-[#584f68] rounded-full py-3 px-4 w-full  transition-all duration-200' type="text" placeholder='Name' required />
          <input name="email" className='bg-transparent border-2 border-[#584f68] rounded-full py-3 px-4 w-full transition-all duration-200' type="email" placeholder='Email' required />
          <textarea name="message" className='h-[120px] bg-transparent border-2 border-[#584f68] rounded-3xl py-2 px-4 w-full transition-all duration-200' placeholder='Write message' required></textarea>
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          <button type="submit" className='cursor-pointer text-xl font-medium w-full bg-[#25bc59] border-2 border-[#1f8f46] rounded-full py-2 px-3 transition-all duration-200 hover:shadow-[0_0_20px_#25bc59]'>Submit</button>
        </form>
      </div>
      <svg className="absolute bottom-0 left-0 rounded-b-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#25bc59" fillOpacity="1" d="M0,288L48,293.3C96,299,192,309,288,304C384,299,480,277,576,261.3C672,245,768,235,864,224C960,213,1056,203,1152,192C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>
  )
}

export default Contact

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex pt-3 pb-3 pl-5 pr-5 w-full fixed'>
            <div className='flex gap-4 items-center'>
                    <img className="w-9 h-9 rounded-4xl" src="/Im-just-watching.jpg" alt="profile"/>
                    <div className='flex gap-2 items-center'>
                        <h4>mny29</h4>
                        <p>/</p>
                        <h4>Tenki</h4>
                    </div>
                   
                    <div className='flex'>
                           <a href='https://github.com/baboribo' className='pl-3 pr-3 pt-1 pb-1 rounded-4xl hover:bg-blend-overlay hover:bg-gray-500 hover:blend-multiply transition' >
                              <p>깃허브</p>
                          </a>
                          <a href='https://github.com/baboribo' className='pl-3 pr-3 pt-1 pb-1 rounded-4xl hover:bg-blend-overlay hover:bg-gray-500 hover:blend-multiply transition' >
                              <p>소개</p>
                           </a>
                    </div>
            </div>
    </div>
    <App />
  </StrictMode>,
)

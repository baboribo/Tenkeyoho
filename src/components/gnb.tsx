import { SiGithub } from '@icons-pack/react-simple-icons';

export default function Gnb() {
  return (
    <div className="fixed z-50 backdrop-blur-sm top-0 left-0 right-0 transition">
      <div className='flex pt-2 pb-2 pl-6 pr-6 w-full justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <img className="w-8.5 h-8.5 rounded-4xl" src="https://avatars.githubusercontent.com/u/71020988?v=4" alt="profile"/>
          <div className='flex gap-2 items-center'>
            <h4>m_ny9*</h4>
            <p>/</p>
            <h4>Tenki</h4>
          </div>
          {/* <div className='flex'>
            <a href='/' className='pl-3 pr-3 pt-1 pb-1 rounded-4xl hover:bg-blend-overlay hover:bg-gray-500 hover:blend-multiply transition' >
              <p>홈</p>
            </a>
            <a href='/about' className='pl-3 pr-3 pt-1 pb-1 rounded-4xl hover:bg-blend-overlay hover:bg-gray-500 hover:blend-multiply transition' >
              <p>소개</p>
            </a>
          </div> */}
        </div>
        <div className='flex gap-4 items-center'>
            <a href='https://yoru.yume.place'>
                <p className='opacity-70 hover:opacity-100 transition cursor-pointer'>밤의 세계로 이동</p>
            </a>
            <a href='https://github.com/baboribo/Tenkeyoho'>
                <SiGithub size={24} className='icons opacity-70 hover:opacity-100 transition cursor-pointer' />
            </a>
        </div>
      </div>
    </div>
  );
}

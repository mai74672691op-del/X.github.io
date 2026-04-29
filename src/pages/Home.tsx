import { useNavigate } from 'react-router-dom';
import { PageBackground } from '../components/3d/PageBackground';

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <PageBackground color1="#4F46E5" color2="#9333EA" color3="#000000" />
      <section 
        className="relative h-screen w-full flex items-center justify-center overflow-hidden cursor-pointer" 
        id="prologue"
        onClick={() => navigate('/works')}
      >
        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import Sets from '@/components/set';

export default async function Home() {
  const supabase = createClient();
  let users = false
  const checkUser = async () => {
    const { data: {user} } = await supabase.auth.getUser();
    if (user) {
      users = true
    }
  } 
  checkUser()
  return (
    <div className="bg-[#3d2222] min-h-screen">
      {/* Header */}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-white text-5xl font-bold mb-6">Supercharge Your Learning with AI</h2>
        <p className="text-white text-xl mb-8">Create personalized flashcards and quizzes instantly with our advanced AI technology.</p>
        <div className='flex flex-col mx-72 gap-y-4'>
          {users? <Link href="/home" className="bg-white text-[#3d2222] px-8 py-3 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-colors">View Our Plans</Link> :
          <Link href="/login" className="bg-white text-[#3d2222] px-8 py-3 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-colors">Get Started For Free</Link>}
          
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white bg-opacity-10 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-white text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="AI-Powered Creation" 
              description="Generate flashcards from your notes or textbooks in seconds."
            />
            <FeatureCard 
              title="Personalized Learning" 
              description="Adaptive algorithms tailor your study experience to your needs."
            />
            <FeatureCard 
              title="Progress Tracking" 
              description="Monitor your improvement and focus on areas that need more attention."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h3 className="text-white text-3xl font-bold mb-6">Ready to Elevate Your Study Game?</h3>
        {users == false ? <Link href="/home" className="bg-white text-[#6A7FDB] px-8 py-3 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-colors">View Our Plans</Link> :
          <Link href="/home" className="bg-white text-[#3d2222] px-8 py-3 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-colors">Sign up</Link>}
      </section>
      

      {/* Footer 
      <footer className="bg-white bg-opacity-10 py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2024 QuizCraftAI. All rights reserved.</p>
        </div>
      </footer>
      */}
      <section>
        <p className="text-white text-3xl font-bold text-center">A quick look at the AI-generated Flashcards</p>
        <FlashcardsDemo />
      </section>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-6">
      <h4 className="text-white text-xl font-bold mb-4">{title}</h4>
      <p className="text-white">{description}</p>
    </div>
  );
}


const FlashcardsDemo = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from('flashcards').select('*').eq('id', "e2a5dee6-414c-4ccc-aa37-d02197bbb9ff").single()
  
  if (error) {
    console.error('Error fetching flashcards:', error)
    return <div>Error loading flashcards</div>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="relative mb-8 mt-4">
        <h1 className="text-white text-3xl font-bold text-center">{data.name}</h1>
      </div>
      {<Sets data={data.cards} />}
    </div>
  )
}

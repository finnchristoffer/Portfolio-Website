import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Achievements } from '@/components/sections/Achievements';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Certifications } from '@/components/sections/Certifications';
import { Contact } from '@/components/sections/Contact';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import loadingAnimation from '@/assets/loading-animation.json';

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                {/* Lottie loading animation */}
                <div className="w-24 h-24 mb-4">
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        autoplay={true}
                    />
                </div>
                <motion.p
                    className="text-stone-500 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    Loading portfolio...
                </motion.p>
            </motion.div>
        </div>
    );
}

function ErrorDisplay({ error }: { error: Error }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <motion.div
                className="text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="text-6xl mb-4"
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    ⚠️
                </motion.div>
                <h1 className="text-2xl font-bold text-stone-800 mb-2">Oops! Something went wrong</h1>
                <p className="text-stone-600 mb-6">{error.message}</p>
                <motion.button
                    onClick={() => window.location.reload()}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-teal-600/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Try Again
                </motion.button>
            </motion.div>
        </div>
    );
}

function App() {
    const { data: portfolioData, loading, error } = usePortfolioData();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay error={error} />;
    }

    if (!portfolioData) {
        return <LoadingSpinner />;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="bg-white relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Scroll progress indicator */}
                <ScrollProgress />

                {/* Animated background blobs */}
                <AnimatedBackground />

                <Header name={portfolioData.name} social={portfolioData.social} />
                <main>
                    <Hero
                        name={portfolioData.name}
                        title={portfolioData.title}
                        bio={portfolioData.bio}
                        email={portfolioData.email}
                        skills={portfolioData.skills || []}
                        avatarUrl={portfolioData.avatarUrl}
                    />
                    <Achievements achievements={portfolioData.achievements || []} />
                    <Projects projects={portfolioData.projects || []} />
                    <Experience experience={portfolioData.experience || []} />
                    <Certifications certifications={portfolioData.certifications || []} />
                    <Contact email={portfolioData.email} />
                </main>
                <Footer name={portfolioData.name} />
            </motion.div>
        </AnimatePresence>
    );
}

export default App;

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAllDiseases } from '../services/api';

const Home = () => {
  const { t } = useTranslation();
  const [featuredDiseases, setFeaturedDiseases] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoadingFeatured(true);
        const data = await fetchAllDiseases();
        if (data?.length) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setFeaturedDiseases(shuffled.slice(0, 4));
        } else {
          setFeaturedDiseases([]);
        }
      } catch (error) {
        console.error('Failed to load featured diseases:', error);
        setFeaturedDiseases([]);
      } finally {
        setLoadingFeatured(false);
      }
    };

    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen">

      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 mb-8">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/diagnose"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
                >
                  {t('home.hero.primaryCta')}
                </Link>
                <Link
                  to="/disease-library"
                  className="bg-primary-600 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-500 transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
                >
                  {t('home.hero.secondaryCta')}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block text-center">
              <div className="text-9xl">🌿</div>
              <div className="text-8xl mt-4">🌱</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white border-2 border-primary-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-400">
              <div className="text-5xl mb-4 text-center">🩺</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {t('home.features.diagnose.title')}
              </h3>
              <p className="text-gray-700 mb-6 text-center">
                {t('home.features.diagnose.description')}
              </p>
              <Link
                to="/diagnose"
                className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 text-center"
              >
                {t('home.features.diagnose.button')}
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-primary-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-400">
              <div className="text-5xl mb-4 text-center">🌿</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {t('home.features.library.title')}
              </h3>
              <p className="text-gray-700 mb-6 text-center">
                {t('home.features.library.description')}
              </p>
              <Link
                to="/disease-library"
                className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 text-center"
              >
                {t('home.features.library.button')}
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-primary-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-400">
              <div className="text-5xl mb-4 text-center">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {t('home.features.ruleEngine.title')}
              </h3>
              <p className="text-gray-700 mb-6 text-center">
                {t('home.features.ruleEngine.description')}
              </p>
              <Link
                to="/about"
                className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 text-center"
              >
                {t('home.features.ruleEngine.button')}
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('home.howItWorks.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Step 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('home.howItWorks.steps.selectPlant.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('home.howItWorks.steps.selectPlant.description')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('home.howItWorks.steps.enterSymptoms.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('home.howItWorks.steps.enterSymptoms.description')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('home.howItWorks.steps.ruleMatches.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('home.howItWorks.steps.ruleMatches.description')}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-5xl mb-4">4️⃣</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('home.howItWorks.steps.getDiagnosis.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('home.howItWorks.steps.getDiagnosis.description')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Sample Diseases section was removed completely */}

    </div>
  );
};

export default Home;

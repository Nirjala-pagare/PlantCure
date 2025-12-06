import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import fallbackImage from '../assets/Diseases/doc.png';


const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { diagnosis, noMatch, image } = location.state || {};
  const { t } = useTranslation();

  if (noMatch) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('result.noMatch.title')}</h1>
            <p className="text-gray-600 mb-6 text-lg">
              {t('result.noMatch.description')}
            </p>
            <p className="text-gray-700 mb-8">
              {t('result.noMatch.helper')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/diagnose')}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                {t('result.buttons.tryAgain')}
              </button>
              <Link
                to="/disease-library"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                {t('result.buttons.browseLibrary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!diagnosis) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">{t('result.empty.description')}</p>
            <Link
              to="/diagnose"
              className="mt-4 inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              {t('result.empty.button')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{diagnosis.diseaseName}</h1>
                <p className="text-primary-100">{t('common.plantLabel')} {diagnosis.plantName}</p>
              </div>
              {typeof diagnosis.score === 'number' && (
                <span className="px-4 py-2 rounded-full font-semibold border-2 border-white bg-white text-primary-600">
                  Match Score: {diagnosis.score} / 5
                </span>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Image Section */}
            <div className="mb-8">
              {image ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('common.yourPlantImage')}</h2>
                  <img
                    src={image}
                    alt={t('common.yourPlantImage')}
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('common.diseaseReference')}</h2>
                  <img
                    src={diagnosis.imageUrl}
                    alt={diagnosis.diseaseName}
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                {t('result.detail.description')}
              </h2>
              <p className="text-gray-700 leading-relaxed">{diagnosis.symptoms}</p>
            </div>

            {/* Prevention */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🛡️</span>
                {t('result.detail.prevention')}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{diagnosis.prevention}</p>
            </div>

            {/* Cure */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💊</span>
                {t('result.detail.treatment')}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{diagnosis.treatment}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate('/diagnose')}
                className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                {t('result.buttons.tryAgain')}
              </button>
              <Link
                to="/disease-library"
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 text-center"
              >
                {t('result.buttons.browseLibrary')}
              </Link>
              <Link
                to="/"
                className="flex-1 bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 text-center"
              >
                {t('result.buttons.backHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;


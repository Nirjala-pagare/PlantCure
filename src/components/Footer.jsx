import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.appName')}</h3>
            <p className="text-gray-400">
              {t('common.tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.usefulLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/diagnose" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.diagnose')}
                </Link>
              </li>
              <li>
                <Link to="/disease-library" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.diseaseLibrary')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <a href="mailto:contact@plantcare.com" className="text-gray-400 hover:text-white transition-colors">
                  {t('common.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.aboutHeading')}</h3>
            <p className="text-gray-400">
              {t('common.systemDescription')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            {t('common.madeBy')}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t('common.allRightsReserved', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { Trans, useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const technicalItems = t('about.sections.technical.items', { returnObjects: true });
  const technicalIcons = ['⚛️', '🎨', '🛣️', '⚡'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h1>

          <div className="space-y-8">

            {/* About the System */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🌱</span>
                {t('about.sections.system.title')}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                {t('about.sections.system.paragraph1')}
              </p>

              <p className="text-gray-700 leading-relaxed">
                {t('about.sections.system.paragraph2')}
              </p>
            </section>

            {/* How Symptoms are Processed */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">⚙️</span>
                {t('about.sections.matching.title')}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                {t('about.sections.matching.intro')}
              </p>

              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <Trans i18nKey="about.sections.matching.steps.input" components={{ strong: <strong /> }} />
                </li>
                <li>
                  <Trans i18nKey="about.sections.matching.steps.search" components={{ strong: <strong /> }} />
                </li>
                <li>
                  <Trans i18nKey="about.sections.matching.steps.selection" components={{ strong: <strong /> }} />
                </li>
                <li>
                  <Trans i18nKey="about.sections.matching.steps.result" components={{ strong: <strong /> }} />
                </li>
              </ol>
            </section>

            {/* Real-World Impact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🌍</span>
                {t('about.sections.impact.title')}
              </h2>

              <div className="space-y-4 text-gray-700">
                {['accessibility', 'speed', 'accuracy', 'education'].map((key) => (
                  <div key={key} className="bg-primary-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      ✅ {t(`about.sections.impact.cards.${key}.title`)}
                    </h3>
                    <p>{t(`about.sections.impact.cards.${key}.description`)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Details */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💻</span>
                {t('about.sections.technical.title')}
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  {t('about.sections.technical.intro')}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                  {technicalItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">{technicalIcons[index] || '⚙️'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Footer */}
            <section className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                <Trans i18nKey="about.sections.contact.madeWith" components={{ strong: <strong /> }} />
              </p>
              <p className="text-gray-500 text-sm text-center mt-2">
                {t('about.sections.contact.note')}
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

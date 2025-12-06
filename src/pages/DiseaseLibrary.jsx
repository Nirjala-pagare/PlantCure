import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import DiseaseCard from '../components/DiseaseCard';
import { fetchAllDiseases, fetchDiseaseById } from '../services/api';

const DiseaseLibrary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlant, setFilterPlant] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDiseases = async () => {
      try {
        setLoading(true);
        const data = await fetchAllDiseases();
        setDiseases(data || []);
        setError('');
      } catch (err) {
        console.error('Failed to load diseases:', err);
        setError('Failed to load diseases. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDiseases();
  }, []);

  useEffect(() => {
    const loadDiseaseById = async () => {
      if (!id) {
        setSelectedDisease(null);
        return;
      }

      const localMatch = diseases.find((disease) => (disease._id || disease.id) === id);
      if (localMatch) {
        setSelectedDisease(localMatch);
        return;
      }

      try {
        const disease = await fetchDiseaseById(id);
        if (disease) {
          setSelectedDisease(disease);
        } else {
          setSelectedDisease(null);
        }
      } catch (err) {
        console.error('Failed to fetch disease by ID:', err);
        setSelectedDisease(null);
      }
    };

    loadDiseaseById();
  }, [id, diseases]);

  const plantTypes = useMemo(() => {
    const base = [{ value: 'All', label: t('library.plantTypes.all') }];
    const unique = Array.from(new Set(diseases.map((d) => d.plantName))).filter(Boolean).sort();
    return [
      ...base,
      ...unique.map((plant) => ({
        value: plant,
        label: plant,
      })),
    ];
  }, [diseases, t]);

  const filteredDiseases = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return diseases.filter((disease) => {
      const matchesSearch =
        normalizedTerm === '' ||
        disease.diseaseName?.toLowerCase().includes(normalizedTerm) ||
        disease.symptoms?.toLowerCase().includes(normalizedTerm) ||
        disease.plantName?.toLowerCase().includes(normalizedTerm);

      const matchesPlant = filterPlant === 'All' || disease.plantName === filterPlant;

      return matchesSearch && matchesPlant;
    });
  }, [diseases, filterPlant, searchTerm]);

  if (selectedDisease) {
    const detailImage =
      selectedDisease.imageUrl ||
      (selectedDisease.image ? `http://localhost:5000/uploads/diseases/${selectedDisease.image}` : '');

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/disease-library')}
            className="mb-4 text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            ← {t('library.back')}
          </button>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {selectedDisease.diseaseName}
                  </h1>
                  <p className="text-primary-100">
                    {t('common.plantLabel')} {selectedDisease.plantName}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <img
                  src={detailImage}
                  alt={selectedDisease.diseaseName}
                  className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400';
                  }}
                />
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('common.description')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedDisease.symptoms}
                </p>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('common.prevention')}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedDisease.prevention}
                </p>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('common.treatment')}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedDisease.treatment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">{t('library.title')}</h1>
        <p className="text-gray-600 text-center mb-8">
          {t('library.subtitle')}
        </p>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('library.searchLabel')}
              </label>
              <input
                type="text"
                placeholder={t('library.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('library.filterLabel')}
              </label>
              <select
                value={filterPlant}
                onChange={(e) => setFilterPlant(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                {plantTypes.map((plant) => (
                  <option key={plant.value} value={plant.value}>{plant.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <Trans
              i18nKey="library.resultsCount"
              count={filteredDiseases.length}
              values={{ count: filteredDiseases.length }}
            >
              Found <strong>{{ count: filteredDiseases.length }}</strong> diseases
            </Trans>
          </p>
        </div>

        {/* Disease Grid */}
        {error ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">{t('common.loading', { defaultValue: 'Loading diseases...' })}</p>
          </div>
        ) : filteredDiseases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map(disease => (
              <DiseaseCard key={disease._id || disease.id} disease={disease} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('library.emptyTitle')}</h2>
            <p className="text-gray-600">
              {t('library.emptyDescription')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseLibrary;


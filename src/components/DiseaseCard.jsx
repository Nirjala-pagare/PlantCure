import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DiseaseCard = ({ disease }) => {
  const { t } = useTranslation();

  const diseaseId = disease._id || disease.id;
  const imageUrl = disease.imageUrl || (disease.image ? `http://localhost:5000/uploads/diseases/${disease.image}` : '');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={disease.diseaseName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400';
          }}
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{disease.diseaseName}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">{t('common.plantLabel')}</span> {disease.plantName}
        </p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {disease.symptoms}
        </p>
        <Link
          to={`/disease-library/${diseaseId}`}
          className="inline-block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          {t('common.viewDetails')}
        </Link>
      </div>
    </div>
  );
};

export default DiseaseCard;


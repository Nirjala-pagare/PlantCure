import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InputField from '../components/InputField';
import { fetchAllDiseases, checkDiagnosis } from '../services/api';

const Diagnose = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    plantType: '',
    leafColor: '',
    spotsPresent: '',
    spotColor: '',
    leafEdgesCurled: '',
    powderySubstance: '',
    holesInLeaves: '',
    stemDiscoloration: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const defaultPlantTypes = useMemo(() => ([
    { value: 'Tomato', label: t('diagnose.options.plantTypes.tomato') },
    { value: 'Potato', label: t('diagnose.options.plantTypes.potato') },
    { value: 'Wheat', label: t('diagnose.options.plantTypes.wheat') },
    { value: 'Rice', label: t('diagnose.options.plantTypes.rice') },
    { value: 'Cotton', label: t('diagnose.options.plantTypes.cotton') },
    { value: 'Rose', label: t('diagnose.options.plantTypes.rose') },
    { value: 'Chili', label: t('diagnose.options.plantTypes.chili') }
  ]), [t]);
  const [plantTypes, setPlantTypes] = useState(defaultPlantTypes);
  const [isCustomPlant, setIsCustomPlant] = useState(false);
  const [customPlantName, setCustomPlantName] = useState('');

  useEffect(() => {
    const loadPlantTypes = async () => {
      try {
        const data = await fetchAllDiseases();
        if (data?.length) {
          const uniquePlants = Array.from(new Set(data.map((d) => d.plantName))).filter(Boolean);
          if (uniquePlants.length) {
            const dynamicOptions = uniquePlants
              .sort((a, b) => a.localeCompare(b))
              .map((plant) => ({ value: plant, label: plant }));
            setPlantTypes(dynamicOptions);
            return;
          }
        }
        setPlantTypes(defaultPlantTypes);
      } catch (error) {
        console.error('Failed to load plant types from API, using defaults:', error);
        setPlantTypes(defaultPlantTypes);
      }
    };
    loadPlantTypes();
  }, [defaultPlantTypes]);

  const leafColors = [
    { value: 'green', label: t('diagnose.options.leafColors.green') },
    { value: 'yellow', label: t('diagnose.options.leafColors.yellow') },
    { value: 'brown', label: t('diagnose.options.leafColors.brown') },
    { value: 'black', label: t('diagnose.options.leafColors.black') }
  ];

  const spotColors = [
    { value: 'yellow', label: t('diagnose.options.spotColors.yellow') },
    { value: 'brown', label: t('diagnose.options.spotColors.brown') },
    { value: 'black', label: t('diagnose.options.spotColors.black') },
    { value: 'white', label: t('diagnose.options.spotColors.white') },
    { value: 'gray', label: t('diagnose.options.spotColors.gray') }
  ];

  const yesNoOptions = [
    { value: 'Yes', label: t('diagnose.options.yes') },
    { value: 'No', label: t('diagnose.options.no') }
  ];

  const handleChange = (field, value) => {
    if (field === 'plantType') {
      setIsCustomPlant(value === 'other');
      if (value !== 'other' && customPlantName) {
        setCustomPlantName('');
      }
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const selectedPlantType = isCustomPlant ? customPlantName.trim() : formData.plantType;
    
    if (!selectedPlantType) {
      newErrors.plantType = t('diagnose.errors.plantType');
    }
    if (isCustomPlant && !customPlantName.trim()) {
      newErrors.customPlantName = t('diagnose.errors.customPlantName');
    }
    if (!formData.leafColor) {
      newErrors.leafColor = t('diagnose.errors.leafColor');
    }
    if (formData.spotsPresent === '') {
      newErrors.spotsPresent = t('diagnose.errors.spotsPresent');
    }
    if (formData.spotsPresent === 'Yes' && !formData.spotColor) {
      newErrors.spotColor = t('diagnose.errors.spotColor');
    }
    if (formData.leafEdgesCurled === '') {
      newErrors.leafEdgesCurled = t('diagnose.errors.leafEdgesCurled');
    }
    if (formData.powderySubstance === '') {
      newErrors.powderySubstance = t('diagnose.errors.powderySubstance');
    }
    if (formData.holesInLeaves === '') {
      newErrors.holesInLeaves = t('diagnose.errors.holesInLeaves');
    }
    if (formData.stemDiscoloration === '') {
      newErrors.stemDiscoloration = t('diagnose.errors.stemDiscoloration');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmissionError('');
    setIsLoading(true);

    const payload = {
      plantName: isCustomPlant ? customPlantName.trim() : formData.plantType,
      spots: formData.spotsPresent,
      curled: formData.leafEdgesCurled,
      powdery: formData.powderySubstance,
      holes: formData.holesInLeaves,
      stemDiscoloration: formData.stemDiscoloration
    };

    try {
      const diagnosis = await checkDiagnosis(payload);
      navigate('/result', { state: { diagnosis, image: imagePreview } });
    } catch (error) {
      if (error.status === 404) {
        navigate('/result', { state: { noMatch: true } });
      } else {
        setSubmissionError(error.message || 'Unable to diagnose. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('diagnose.title')}</h1>
          <p className="text-gray-600 mb-8">
            {t('diagnose.subtitle')}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Plant Info Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
                {t('diagnose.sections.plantInfo')}
              </h2>
              
          <InputField
            label={t('diagnose.fields.plantType')}
            type="select"
            value={formData.plantType}
            onChange={(e) => handleChange('plantType', e.target.value)}
            options={[...plantTypes, { value: 'other', label: t('diagnose.options.other', { defaultValue: 'Other (type manually)' }) }]}
            required
            error={errors.plantType}
          />
          {isCustomPlant && (
            <InputField
              label={t('diagnose.fields.customPlantName')}
              type="text"
              value={customPlantName}
              onChange={(e) => setCustomPlantName(e.target.value)}
              required
              error={errors.customPlantName}
            />
          )}
            </div>

            {/* Symptoms Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
                {t('diagnose.sections.symptoms')}
              </h2>

              <InputField
                label={t('diagnose.fields.leafColor')}
                type="select"
                value={formData.leafColor}
                onChange={(e) => handleChange('leafColor', e.target.value)}
                options={leafColors}
                required
                error={errors.leafColor}
              />

              <InputField
                label={t('diagnose.fields.spotsQuestion')}
                type="radio"
                value={formData.spotsPresent}
                onChange={(e) => handleChange('spotsPresent', e.target.value)}
                options={yesNoOptions}
                required
                error={errors.spotsPresent}
              />

              {formData.spotsPresent === 'Yes' && (
                <InputField
                  label={t('diagnose.fields.spotColor')}
                  type="select"
                  value={formData.spotColor}
                  onChange={(e) => handleChange('spotColor', e.target.value)}
                  options={spotColors}
                  required={formData.spotsPresent === 'Yes'}
                  error={errors.spotColor}
                />
              )}

              <InputField
                label={t('diagnose.fields.leafEdges')}
                type="radio"
                value={formData.leafEdgesCurled}
                onChange={(e) => handleChange('leafEdgesCurled', e.target.value)}
                options={yesNoOptions}
                required
                error={errors.leafEdgesCurled}
              />

              <InputField
                label={t('diagnose.fields.powdery')}
                type="radio"
                value={formData.powderySubstance}
                onChange={(e) => handleChange('powderySubstance', e.target.value)}
                options={yesNoOptions}
                required
                error={errors.powderySubstance}
              />

              <InputField
                label={t('diagnose.fields.holes')}
                type="radio"
                value={formData.holesInLeaves}
                onChange={(e) => handleChange('holesInLeaves', e.target.value)}
                options={yesNoOptions}
                required
                error={errors.holesInLeaves}
              />

              <InputField
                label={t('diagnose.fields.stemDiscoloration')}
                type="radio"
                value={formData.stemDiscoloration}
                onChange={(e) => handleChange('stemDiscoloration', e.target.value)}
                options={yesNoOptions}
                required
                error={errors.stemDiscoloration}
              />
            </div>

            {/* Image Upload Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
                {t('diagnose.sections.imageUpload')}
              </h2>
              
              <InputField
                label={t('diagnose.fields.uploadLabel')}
                type="file"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{t('diagnose.fields.previewLabel')}</p>
                  <img
                    src={imagePreview}
                    alt={t('diagnose.fields.uploadLabel')}
                    className="max-w-full h-64 object-contain rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('diagnose.loading')}
                </>
              ) : (
                t('diagnose.button')
              )}
            </button>
            {submissionError && (
              <p className="mt-4 text-center text-sm text-red-600">{submissionError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Diagnose;


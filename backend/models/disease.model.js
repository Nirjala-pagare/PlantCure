import mongoose from 'mongoose';

const symptomsChecklistSchema = new mongoose.Schema(
  {
    spots: { type: Boolean, default: false },
    curled: { type: Boolean, default: false },
    powdery: { type: Boolean, default: false },
    holes: { type: Boolean, default: false },
    stemDiscoloration: { type: Boolean, default: false },
  },
  { _id: false }
);

const diseaseSchema = new mongoose.Schema(
  {
    plantName: {
      type: String,
      required: true,
      trim: true,
    },
    diseaseName: {
      type: String,
      required: true,
      trim: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    prevention: {
      type: String,
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    symptomsChecklist: {
      type: symptomsChecklistSchema,
      default: () => ({
        spots: false,
        curled: false,
        powdery: false,
        holes: false,
        stemDiscoloration: false,
      }),
    },
  },
  {
    timestamps: true,
  }
);

const Disease = mongoose.model('Disease', diseaseSchema);

export default Disease;


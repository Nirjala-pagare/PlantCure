import Disease from '../models/disease.model.js';

const normalizeBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === undefined || value === null) return null;

  const normalized = String(value).trim().toLowerCase();

  if (["yes", "true", "1"].includes(normalized)) return true;
  if (["no", "false", "0"].includes(normalized)) return false;

  return null;
};

export const diagnoseDisease = async (req, res) => {
  try {
    const plantNameInput = (req.body.plantName || "").trim().toLowerCase();

    const answers = {
      spots: normalizeBoolean(req.body.spots),
      curled: normalizeBoolean(req.body.curled),
      powdery: normalizeBoolean(req.body.powdery),
      holes: normalizeBoolean(req.body.holes),
      stemDiscoloration: normalizeBoolean(req.body.stemDiscoloration),
    };

    // Fetch all diseases for this specific plant ONLY
    let diseases = await Disease.find({
      plantName: { $regex: `^${plantNameInput}$`, $options: "i" },
    });

    // If no exact plant matches found → stop immediately
    if (!diseases.length) {
      return res.status(404).json({
        success: false,
        message: `No diseases found for plant "${plantNameInput}".`,
      });
    }

    let bestMatch = null;
    let highestScore = 0;

    diseases.forEach((disease) => {
      const checklist = disease.symptomsChecklist || {};
      let score = 0;
      let comparisons = 0;

      Object.entries(answers).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          comparisons++;
          if (checklist[key] === value) {
            score++;
          }
        }
      });

      if (comparisons === 0) return;

      // choose best scoring disease
      if (score >= 3 && score >= highestScore) {
        bestMatch = disease;
        highestScore = score;
      }
    });

    if (!bestMatch) {
      return res.status(404).json({
        success: false,
        message: "No matching disease found for this plant.",
      });
    }

    const imageUrl = bestMatch.image
      ? `http://localhost:${process.env.PORT || 5000}/uploads/diseases/${bestMatch.image}`
      : "";

    return res.status(200).json({
      success: true,
      data: {
        id: bestMatch._id,
        plantName: bestMatch.plantName,
        diseaseName: bestMatch.diseaseName,
        symptoms: bestMatch.symptoms,
        prevention: bestMatch.prevention,
        treatment: bestMatch.treatment,
        imageUrl,
        score: highestScore,
      },
    });

  } catch (error) {
    console.error("Diagnosis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to diagnose disease.",
    });
  }
};

# Plant Disease Diagnosis System

A professional, rule-based plant disease diagnosis system built with React and Tailwind CSS. This application helps users identify plant diseases by matching symptoms against a comprehensive rule database.

## 🌱 Features

- **Rule-Based Diagnosis**: No AI/ML required - uses logical rule matching
- **Comprehensive Disease Database**: Covers multiple plant types (Tomato, Potato, Wheat, Rice, Cotton, Rose, Chili)
- **Interactive Diagnosis Form**: Step-by-step symptom input
- **Disease Library**: Browse and search through all available diseases
- **Detailed Results**: Get prevention tips, treatment methods, and recommended products
- **Image Upload**: Upload plant images for reference (preview only)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd Plant_Disease
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
  components/
    Navbar.jsx          # Navigation component
    Footer.jsx          # Footer component
    InputField.jsx      # Reusable input component
    DiseaseCard.jsx     # Disease card component
  pages/
    Home.jsx            # Home page
    Diagnose.jsx        # Diagnosis form page
    Result.jsx          # Diagnosis result page
    About.jsx           # About page
    DiseaseLibrary.jsx # Disease library page
  data/
    rules.js           # Rule definitions
    diseases.js        # Disease database
  utils/
    ruleEngine.js      # Rule matching engine
  assets/
    sample/            # Sample images (optional)
```

## 🛠️ Tech Stack

- **React** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## 📝 How It Works

1. **User Input**: User selects plant type and answers symptom questions
2. **Rule Matching**: System matches symptoms against predefined rules
3. **Priority Scoring**: Highest priority match is selected
4. **Result Display**: Disease information with treatment recommendations

## 🎯 Available Scripts

- `npm start` or `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📄 License

This project is created for educational purposes.

## 👤 Author

Made with ❤️ by Nirjala

## 🙏 Acknowledgments

- Plant disease information based on agricultural research
- Images from Unsplash
- Built with modern web technologies


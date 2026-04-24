<div align="center">

# 🩺💉 DiabetesGuard : Diabetes Prediction & Risk Monitoring System

![Status](https://img.shields.io/badge/Status-Active-success)
![Tech](https://img.shields.io/badge/ML-Powered-blueviolet)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![License](https://img.shields.io/badge/License-Educational-orange)

</div>

---

## 📌 About DiabetesGuard

**DiabetesGuard** is an intelligent **Diabetes Prediction & Risk Monitoring System** powered by Machine Learning. It enables users to assess their diabetes risk based on clinical health parameters, track their health metrics over time, and receive actionable insights through an intuitive web interface.

DiabetesGuard focuses on **accurate risk prediction**, **health trend monitoring**, and **secure user management**, making it an excellent project for demonstrating real-world ML and full-stack development skills.

---

## 🌐 Live Demo

🔗 **Live Application:**
https://diabetesguard.vercel.app/

---

## ✨ Key Highlights

* 🤖 ML-powered diabetes risk prediction (Logistic Regression / Random Forest)
* 📊 Interactive health dashboard with trend charts
* 🧾 Detailed risk report generation (PDF)
* 🔔 Health alerts based on risk level
* 🛡️ Secure authentication using JWT
* 📱 Fully responsive UI

---

## 🚀 Features

### 👤 User Features

* User registration & login
* Profile management with medical history
* View personal health records
* Download risk assessment reports (PDF)
* Real-time alerts for High / Medium / Low risk levels

---

### 🩺 Prediction Features

* Predict diabetes risk based on:
  * Age
  * BMI (Body Mass Index)
  * Blood Glucose Level
  * HbA1c Level
  * Insulin Level
  * Blood Pressure
  * Skin Thickness
  * Diabetes Pedigree Function
* Risk classification: **Low / Medium / High**
* Confidence score for each prediction
* Historical prediction tracking

---

### 📈 Monitoring System

* Track health parameters over time
* Visual trend graphs (line, bar, pie charts)
* Compare current vs previous readings
* Auto-flag abnormal health metrics
* Personalized health recommendations

---

## 🏗️ Tech Stack

| Layer          | Technologies                                     |
| -------------- | ------------------------------------------------ |
| Frontend       | React.js, Vite, JavaScript, Chart.js, CSS        |
| Backend        | Python, Flask / FastAPI                          |
| ML Models      | Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn |
| Database       | MongoDB Atlas / PostgreSQL                       |
| Auth           | JWT (JSON Web Tokens)                            |
| Deployment     | Vercel (Frontend), Render (Backend)              |

---

## 🤖 ML Model Details

| Model               | Accuracy | Precision | Recall  | F1-Score |
| ------------------- | -------- | --------- | ------- | -------- |
| Logistic Regression | 78.5%    | 76.2%     | 74.9%   | 75.5%    |
| Random Forest       | 85.3%    | 83.7%     | 82.1%   | 82.9%    |
| XGBoost             | **87.6%**| **85.4%** |**84.8%**|**85.1%** |

> ✅ **XGBoost** is used as the final production model for best accuracy.

---

## 📁 Project Structure

```
DiabetesGuard/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── RiskCard.jsx
│   │   │   └── HealthChart.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Predict.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   └── services/
│   │       └── api.js
│   └── main.jsx
│
├── Backend/
│   ├── models/
│   │   ├── diabetes_model.pkl
│   │   └── scaler.pkl
│   ├── routes/
│   │   ├── predict.py
│   │   ├── auth.py
│   │   └── records.py
│   ├── controllers/
│   ├── utils/
│   │   └── preprocess.py
│   └── app.py
│
├── ML_Notebooks/
│   ├── EDA.ipynb
│   ├── Model_Training.ipynb
│   └── Model_Evaluation.ipynb
│
├── Dataset/
│   └── diabetes.csv
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Python 3.10+
* Node.js (v16+)
* MongoDB Atlas / PostgreSQL
* Git

### Clone Repository

```bash
git clone https://github.com/yourusername/DiabetesGuard-Prediction-System.git
cd DiabetesGuard-Prediction-System
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd Backend
pip install -r requirements.txt
python app.py
```

### ML Model Training (Optional)

```bash
cd ML_Notebooks
jupyter notebook Model_Training.ipynb
```

---

## 🌐 Environment Variables

Create a `.env` file inside the **Backend** folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
MODEL_PATH=models/diabetes_model.pkl
```

---

## 📊 Dataset

This project uses the **PIMA Indians Diabetes Dataset** from Kaggle / UCI Machine Learning Repository.

| Feature                  | Description                          |
| ------------------------ | ------------------------------------ |
| Pregnancies              | Number of times pregnant             |
| Glucose                  | Plasma glucose concentration         |
| BloodPressure            | Diastolic blood pressure (mm Hg)     |
| SkinThickness            | Triceps skin fold thickness (mm)     |
| Insulin                  | 2-Hour serum insulin (mu U/ml)       |
| BMI                      | Body Mass Index                      |
| DiabetesPedigreeFunction | Diabetes hereditary score            |
| Age                      | Age in years                         |
| **Outcome**              | **0 = Non-Diabetic, 1 = Diabetic**   |

---

## 🔮 Future Enhancements

* 💬 AI-powered health chatbot integration
* 📲 Mobile app (React Native)
* 🏥 Doctor consultation booking feature
* 🧬 Support for Type 1 vs Type 2 classification
* 📊 Admin dashboard with population-level analytics
* 🌙 Dark mode support
* 🌍 Multi-language support

---

## 🖼️ Screenshots

> *(Add screenshots of your application here)*

| Home Page | Prediction Form | Dashboard |
|-----------|-----------------|-----------|
| ![Home](#) | ![Predict](#) | ![Dashboard](#) |

---

## 👨‍💻 Author

**Your Name**
Full Stack Developer | ML Enthusiast | Data Science

🔗 GitHub: https://github.com/yourusername
💼 LinkedIn: https://linkedin.com/in/yourprofile
📧 Email: youremail@example.com

---

## 📜 License

This project is developed for **educational purposes** and is open for learning and improvement.

---

<div align="center">

⭐ If you find this project helpful, don't forget to **star the repository!** ⭐

**Made with ❤️ and lots of ☕**

</div>

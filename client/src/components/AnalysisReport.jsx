import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Import SVG Graphs
// Import SVG Graphs
import logisticGraph from "../assets/graphs/logistic_regression.svg";
import logisticGraphGlucose from "../assets/graphs/logistic_glucose.svg";
import decisionTreeGraph from "../assets/graphs/decision_tree.svg";
import randomForestGraph from "../assets/graphs/random_forest.svg";
import svmGraph from "../assets/graphs/svm.svg";
import comparisonGraph from "../assets/graphs/model_comparison.svg";
import naiveBayesGraph from "../assets/graphs/naive_bayes.svg";
import knnGraph from "../assets/graphs/knn.svg";

const AnalysisReport = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const models = [
        {
            id: 1,
            name: "Logistic Regression",
            metrics: {
                accuracy: "0.97",
                precision: "1.00",
                recall: "0.82",
                f1: "0.90",
            },
            graphOptions: [
                { label: "Cholesterol vs Diabetes", src: logisticGraph },
                { label: "Glucose vs Diabetes", src: logisticGraphGlucose }
            ],
            description: "Logistic regression uses a sigmoid function to model the probability of a certain class or event.",
        },
        {
            id: 2,
            name: "Random Forest",
            metrics: {
                accuracy: "0.95",
                precision: "0.89",
                recall: "0.73",
                f1: "0.80",
            },
            graph: randomForestGraph,
            description: "Random forest is an ensemble learning method that constructs a multitude of decision trees at training time and outputs the class that is the mode of the classes.",
        },
        {
            id: 3,
            name: "Decision Tree",
            metrics: {
                accuracy: "0.88",
                precision: "0.56",
                recall: "0.82",
                f1: "0.67",
            },
            graph: decisionTreeGraph,
            description: "A decision tree is a flowchart-like structure where an internal node represents a feature, the branch represents a decision rule, and each leaf node represents the outcome.",
        },
        {
            id: 4,
            name: "Naive Bayes",
            metrics: {
                accuracy: "0.92",
                precision: "0.69",
                recall: "0.82",
                f1: "0.75",
            },
            graph: naiveBayesGraph,
            description: "Naive Bayes classifiers are a family of simple 'probabilistic classifiers' based on applying Bayes' theorem with strong (naive) independence assumptions between the features.",
        },
        {
            id: 5,
            name: "KNN",
            metrics: {
                accuracy: "0.92",
                precision: "1.00",
                recall: "0.45",
                f1: "0.62",
            },
            graph: knnGraph,
            description: "K-Nearest Neighbors is a non-parametric method used for classification and regression. In both cases, the input consists of the k closest training examples in the feature space.",
        }
    ];

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [graphSelections, setGraphSelections] = React.useState({});

    const handleGraphChange = (modelId, index) => {
        setGraphSelections(prev => ({ ...prev, [modelId]: parseInt(index) }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 relative">
            <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extrabold text-center text-blue-900 mb-10"
                >
                    Analysis Report
                </motion.h1>

                <div className="space-y-16">
                    {models.map((model, index) => (
                        <motion.div
                            key={model.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 px-6 py-4">
                                <h2 className="text-2xl font-bold text-white">
                                    {model.id}. {model.name}
                                </h2>
                            </div>
                            <div className="flex flex-col lg:flex-row">
                                {/* Metrics Section */}
                                <div className="lg:w-1/2 p-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                        Performance Metrics
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md">
                                            <span className="font-medium text-gray-700">Accuracy</span>
                                            <span className="font-bold text-blue-800">
                                                {model.metrics.accuracy}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center bg-green-50 p-3 rounded-md">
                                            <span className="font-medium text-gray-700">Precision</span>
                                            <span className="font-bold text-green-800">
                                                {model.metrics.precision}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-md">
                                            <span className="font-medium text-gray-700">Recall</span>
                                            <span className="font-bold text-yellow-800">
                                                {model.metrics.recall}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center bg-purple-50 p-3 rounded-md">
                                            <span className="font-medium text-gray-700">
                                                F1-Score
                                            </span>
                                            <span className="font-bold text-purple-800">
                                                {model.metrics.f1}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-gray-600 text-sm italic">
                                        {model.description}
                                    </p>
                                </div>

                                {/* Graph Section */}
                                <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50 space-y-4">
                                    {model.graphOptions ? (
                                        <div className="w-full flex flex-col items-center space-y-3">
                                            {/* Dropdown Selector */}
                                            <div className="relative w-full max-w-xs">
                                                <select
                                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-white text-gray-700"
                                                    value={graphSelections[model.id] || 0}
                                                    onChange={(e) => handleGraphChange(model.id, e.target.value)}
                                                >
                                                    {model.graphOptions.map((option, idx) => (
                                                        <option key={idx} value={idx}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Single Graph Display */}
                                            <div
                                                className="cursor-pointer overflow-hidden rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300 relative group w-full"
                                                onClick={() => setSelectedImage(model.graphOptions[graphSelections[model.id] || 0].src)}
                                            >
                                                <img
                                                    src={model.graphOptions[graphSelections[model.id] || 0].src}
                                                    alt={`${model.name} - ${model.graphOptions[graphSelections[model.id] || 0].label}`}
                                                    className="w-full h-auto"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                                    <span className="text-white opacity-0 group-hover:opacity-100 font-bold px-4 py-2 bg-black bg-opacity-50 rounded-full transition-opacity duration-300">Click to Expand</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="cursor-pointer overflow-hidden rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300 relative group"
                                            onClick={() => setSelectedImage(model.graph)}
                                        >
                                            <img
                                                src={model.graph}
                                                alt={`${model.name} Graph`}
                                                className="max-w-full h-auto"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                                <span className="text-white opacity-0 group-hover:opacity-100 font-bold px-4 py-2 bg-black bg-opacity-50 rounded-full transition-opacity duration-300">Click to Expand</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                >
                    <div className="bg-gray-800 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white text-center">
                            Model Performance Comparison Table
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Model Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Accuracy
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Precision
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Recall (Diabetes)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        F1-Score (Diabetes)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        Logistic Regression
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.97</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">1.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.82</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.90</td>
                                </tr>
                                <tr className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        Random Forest
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.95</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.89</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.73</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.80</td>
                                </tr>
                                <tr className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        Decision Tree
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.88</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.56</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.82</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.67</td>
                                </tr>
                                <tr className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        Naive Bayes
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.92</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.69</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.82</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.75</td>
                                </tr>
                                <tr className="hover:bg-blue-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        KNN
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.92</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">1.00</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.45</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">0.62</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Comparison Graph Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                >
                    <div className="bg-gray-800 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white text-center">
                            Model Comparison Graph
                        </h2>
                    </div>
                    <div className="p-8 flex justify-center bg-gray-50">
                        <div
                            className="w-full max-w-4xl cursor-pointer overflow-hidden rounded-md shadow-sm transform hover:scale-[1.02] transition-transform duration-300"
                            onClick={() => setSelectedImage(comparisonGraph)}
                        >
                            <img
                                src={comparisonGraph}
                                alt="Model Comparison Graph"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Best Model Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl shadow-lg border border-yellow-300 p-8 text-center"
                >
                    <h2 className="text-3xl font-extrabold text-yellow-800 mb-4">
                        🏆 Best Model: Logistic Regression 🏆
                    </h2>
                    <div className="bg-white bg-opacity-60 rounded-lg p-6 text-left inline-block max-w-3xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Reason:</h3>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Logistic Regression achieved the highest accuracy (97%) and the
                            best recall (82%) and F1-score (90%) for diabetic cases, making it
                            the most reliable model for diabetes prediction where identifying
                            positive cases is critical.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="Full View"
                            className="max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisReport;

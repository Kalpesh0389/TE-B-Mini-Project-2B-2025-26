import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon path issues with Webpack/Vite
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// A component to change map center based on city selection
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 12);
  }, [center, map]);
  return null;
}

function FindDoctors() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const doctors = [
    // DOMBIVLI
    { name: "Dr. Rahul Sharma", hospital: "City Care Hospital", address: "Manpada Road, Shivaji Chowk, Dombivli East, Maharashtra 421201", phone: "+91 9000000001", rating: "4.5", experience: "15 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2104, lng: 73.0949 },
    { name: "Dr. Neha Kulkarni", hospital: "AIMS Hospital", address: "MIDC Phase 1, Dombivli West, Maharashtra 421202", phone: "+91 9000000002", rating: "4.6", experience: "12 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2084, lng: 73.0929 },
    { name: "Dr. Ajay Patil", hospital: "Om Hospital", address: "Phadke Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000003", rating: "4.4", experience: "20 years", specialty: "General Physician", location: "Dombivli", lat: 19.2074, lng: 73.0959 },
    { name: "Dr. Meera Joshi", hospital: "Shree Clinic", address: "Gupte Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000004", rating: "4.7", experience: "18 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2114, lng: 73.0919 },
    { name: "Dr. Nikhil Deshmukh", hospital: "Lifeline Hospital", address: "Kopar Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000005", rating: "4.6", experience: "10 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2080, lng: 73.0960 },
    { name: "Dr. Pooja Naik", hospital: "Sai Diabetes Clinic", address: "Deendayal Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000006", rating: "4.5", experience: "8 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2090, lng: 73.0910 },
    { name: "Dr. Ramesh Patwardhan", hospital: "Metro Hospital", address: "Thakurli East, Dombivli, Maharashtra 421201", phone: "+91 9000000007", rating: "4.6", experience: "22 years", specialty: "General Physician", location: "Dombivli", lat: 19.2100, lng: 73.0930 },
    { name: "Dr. Kalyani Joshi", hospital: "LifeCare Diabetes Clinic", address: "Ghodbunder Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000008", rating: "4.7", experience: "15 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2115, lng: 73.0940 },
    { name: "Dr. Ramesh Kulkarni", hospital: "Metro Specialty Hospital", address: "Kalyan Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000009", rating: "4.5", experience: "18 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2075, lng: 73.0925 },
    { name: "Dr. Meenal Patil", hospital: "Apollo Clinic", address: "Manpada Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000010", rating: "4.7", experience: "14 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2108, lng: 73.0952 },
    { name: "Dr. Anil Deshmukh", hospital: "Currae Hospital", address: "Phadke Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000011", rating: "4.6", experience: "16 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2098, lng: 73.0928 },
    { name: "Dr. Priya Nair", hospital: "Kaushalya Medical", address: "Gupte Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000012", rating: "4.7", experience: "12 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2112, lng: 73.0935 },
    { name: "Dr. Vivek Shah", hospital: "Hiranandani Hospital", address: "Kopar Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000013", rating: "4.6", experience: "20 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2085, lng: 73.0915 },
    { name: "Dr. Sonali Kulkarni", hospital: "LifeLine Diabetes & Endocrine Clinic", address: "Deendayal Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000014", rating: "4.7", experience: "13 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2105, lng: 73.0945 },
{ name: "Dr. Sandeep Bhosale", hospital: "Shivam Diabetes Clinic", address: "Tilak Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000015", rating: "4.6", experience: "11 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2120, lng: 73.0958 },
{ name: "Dr. Aarti Patankar", hospital: "Patankar Endocrine Clinic", address: "Phadke Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000016", rating: "4.7", experience: "17 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2088, lng: 73.0918 },
{ name: "Dr. Mahesh Thakur", hospital: "Thakur Diabetes Care", address: "Manpada Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000017", rating: "4.5", experience: "14 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2102, lng: 73.0962 },
{ name: "Dr. Kavita Jadhav", hospital: "Jadhav Clinic", address: "MIDC Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000018", rating: "4.6", experience: "10 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2079, lng: 73.0922 },
{ name: "Dr. Rohit Naik", hospital: "Naik Diabetes Center", address: "Thakurli Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000019", rating: "4.5", experience: "9 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2095, lng: 73.0947 },
{ name: "Dr. Sneha Deshpande", hospital: "Deshpande Endocrine Clinic", address: "Gupte Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000020", rating: "4.7", experience: "13 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2087, lng: 73.0912 },
{ name: "Dr. Prakash Shetty", hospital: "Shetty Diabetes Clinic", address: "Manpada Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000021", rating: "4.4", experience: "21 years", specialty: "General Physician", location: "Dombivli", lat: 19.2110, lng: 73.0955 },
{ name: "Dr. Smita Sawant", hospital: "Sawant Diabetes Care", address: "Tilak Nagar, Dombivli West, Maharashtra 421202", phone: "+91 9000000022", rating: "4.6", experience: "12 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2078, lng: 73.0926 },
{ name: "Dr. Uday Kulshreshtha", hospital: "Kulshreshtha Endocrine Clinic", address: "Phadke Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000023", rating: "4.7", experience: "19 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2106, lng: 73.0942 },
{ name: "Dr. Amrita Gokhale", hospital: "Gokhale Diabetes Clinic", address: "MIDC Phase 2, Dombivli West, Maharashtra 421202", phone: "+91 9000000024", rating: "4.6", experience: "11 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2081, lng: 73.0917 },
{ name: "Dr. Ketan More", hospital: "More Diabetes Center", address: "Kopar Road, Dombivli East, Maharashtra 421201", phone: "+91 9000000025", rating: "4.5", experience: "15 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2099, lng: 73.0959 },
{ name: "Dr. Ritu Agrawal", hospital: "Agrawal Endocrine Clinic", address: "Tilak Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000026", rating: "4.7", experience: "16 years", specialty: "Endocrinologist", location: "Dombivli", lat: 19.2083, lng: 73.0921 },
{ name: "Dr. Harish Nair", hospital: "Nair Diabetes Care", address: "Thakurli East, Dombivli, Maharashtra 421201", phone: "+91 9000000027", rating: "4.6", experience: "18 years", specialty: "General Physician", location: "Dombivli", lat: 19.2101, lng: 73.0948 },
{ name: "Dr. Pankaj Shinde", hospital: "Shinde Diabetes Clinic", address: "Deendayal Road, Dombivli West, Maharashtra 421202", phone: "+91 9000000028", rating: "4.5", experience: "14 years", specialty: "Diabetologist", location: "Dombivli", lat: 19.2086, lng: 73.0913 },
{ name: "Dr. Sunil Patil", hospital: "Patil Diabetes Clinic", address: "Kalyan West, Maharashtra 421301", phone: "+91 9000000029", rating: "4.6", experience: "17 years", specialty: "Diabetologist", location: "Kalyan", lat: 19.2437, lng: 73.1355 },

{ name: "Dr. Anjali Kulkarni", hospital: "Kulkarni Endocrine Clinic", address: "Kalyan West, Maharashtra 421301", phone: "+91 9000000030", rating: "4.7", experience: "15 years", specialty: "Endocrinologist", location: "Kalyan", lat: 19.2428, lng: 73.1342 },

{ name: "Dr. Rakesh Shah", hospital: "Shah Diabetes Care", address: "Kalyan East, Maharashtra 421306", phone: "+91 9000000031", rating: "4.5", experience: "19 years", specialty: "Diabetologist", location: "Kalyan", lat: 19.2405, lng: 73.1392 },

{ name: "Dr. Kavita Nair", hospital: "Nair Endocrine Center", address: "Kalyan East, Maharashtra 421306", phone: "+91 9000000032", rating: "4.7", experience: "13 years", specialty: "Endocrinologist", location: "Kalyan", lat: 19.2417, lng: 73.1405 },

{ name: "Dr. Amit Deshmukh", hospital: "Deshmukh Diabetes Clinic", address: "Kalyan West, Maharashtra 421301", phone: "+91 9000000033", rating: "4.6", experience: "14 years", specialty: "Diabetologist", location: "Kalyan", lat: 19.2440, lng: 73.1338 },

{ name: "Dr. Neha Patwardhan", hospital: "Patwardhan Endocrine Clinic", address: "Kalyan West, Maharashtra 421301", phone: "+91 9000000034", rating: "4.7", experience: "16 years", specialty: "Endocrinologist", location: "Kalyan", lat: 19.2451, lng: 73.1327 },

{ name: "Dr. Sameer Bhosale", hospital: "Bhosale Diabetes Care", address: "Shahad Road, Shahad, Maharashtra 421103", phone: "+91 9000000035", rating: "4.5", experience: "12 years", specialty: "Diabetologist", location: "Shahad", lat: 19.2505, lng: 73.1480 },

{ name: "Dr. Pooja Agarwal", hospital: "Agarwal Endocrine Clinic", address: "Shahad Road, Shahad, Maharashtra 421103", phone: "+91 9000000036", rating: "4.6", experience: "11 years", specialty: "Endocrinologist", location: "Shahad", lat: 19.2492, lng: 73.1467 },

{ name: "Dr. Rajiv Kulshreshtha", hospital: "Kulshreshtha Diabetes Centre", address: "Ulhasnagar Road, Shahad, Maharashtra 421103", phone: "+91 9000000037", rating: "4.6", experience: "18 years", specialty: "Diabetologist", location: "Shahad", lat: 19.2511, lng: 73.1491 },

{ name: "Dr. Rohit Shetty", hospital: "Shetty Diabetes Clinic", address: "Thakurli East, Maharashtra 421201", phone: "+91 9000000038", rating: "4.5", experience: "15 years", specialty: "Diabetologist", location: "Thakurli", lat: 19.2235, lng: 73.0995 },

{ name: "Dr. Sneha Patil", hospital: "Patil Endocrine Clinic", address: "Thakurli West, Maharashtra 421202", phone: "+91 9000000039", rating: "4.7", experience: "12 years", specialty: "Endocrinologist", location: "Thakurli", lat: 19.2228, lng: 73.0978 },

{ name: "Dr. Ketan Shah", hospital: "Shah Diabetes Center", address: "Thakurli East, Maharashtra 421201", phone: "+91 9000000040", rating: "4.6", experience: "17 years", specialty: "Diabetologist", location: "Thakurli", lat: 19.2242, lng: 73.1006 },

    // THANE
    { name: "Dr. Amit Verma", hospital: "Thane Diabetes Care", address: "Gokhale Road, Naupada, Thane West, Maharashtra 400602", phone: "+91 9000000011", rating: "4.6", experience: "14 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2193, lng: 72.9791 },
    { name: "Dr. Kiran Shah", hospital: "Jupiter Hospital", address: "Eastern Express Highway, Thane West, Maharashtra 400601", phone: "+91 9000000012", rating: "4.8", experience: "20 years", specialty: "Diabetologist", location: "Thane", lat: 19.2173, lng: 72.9771 },
    { name: "Dr. Ritu Singh", hospital: "Bethany Hospital", address: "Pokhran Road No. 2, Thane West, Maharashtra 400610", phone: "+91 9000000013", rating: "4.7", experience: "16 years", specialty: "General Physician", location: "Thane", lat: 19.2163, lng: 72.9801 },
    { name: "Dr. Manish Gupta", hospital: "Currae Hospital", address: "Kopri, Thane East, Maharashtra 400603", phone: "+91 9000000014", rating: "4.5", experience: "11 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2203, lng: 72.9761 },
    { name: "Dr. Sneha Patwardhan", hospital: "Kaushalya Medical", address: "Panch Pakhadi, Thane West, Maharashtra 400602", phone: "+91 9000000015", rating: "4.6", experience: "19 years", specialty: "Diabetologist", location: "Thane", lat: 19.2188, lng: 72.9788 },
    { name: "Dr. Rohit Iyer", hospital: "Hiranandani Hospital", address: "Hiranandani Estate, Thane West, Maharashtra 400607", phone: "+91 9000000016", rating: "4.7", experience: "13 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2178, lng: 72.9798 },
    { name: "Dr. Deepak Mehta", hospital: "Currae Specialty Hospital", address: "Ghodbunder Road, Thane West, Maharashtra 400615", phone: "+91 9000000017", rating: "4.6", experience: "17 years", specialty: "Diabetologist", location: "Thane", lat: 19.2198, lng: 72.9778 },
    { name: "Dr. Kalyani Joshi", hospital: "LifeCare Diabetes Clinic", address: "Ghodbunder Road, Thane West, Maharashtra 400615", phone: "+91 9000000018", rating: "4.6", experience: "15 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2201, lng: 72.9785 },
    { name: "Dr. Ramesh Kulkarni", hospital: "Metro Hospital", address: "Wagle Industrial Estate, Thane West, Maharashtra 400604", phone: "+91 9000000019", rating: "4.5", experience: "18 years", specialty: "Diabetologist", location: "Thane", lat: 19.2215, lng: 72.9790 },
    { name: "Dr. Meenal Patil", hospital: "Apollo Clinic", address: "Naupada, Thane West, Maharashtra 400602", phone: "+91 9000000020", rating: "4.7", experience: "14 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2190, lng: 72.9805 },
    { name: "Dr. Anil Deshmukh", hospital: "Currae Hospital", address: "Kopri, Thane East, Maharashtra 400603", phone: "+91 9000000021", rating: "4.6", experience: "16 years", specialty: "Diabetologist", location: "Thane", lat: 19.2210, lng: 72.9758 },
    { name: "Dr. Priya Nair", hospital: "Kaushalya Medical", address: "Panch Pakhadi, Thane West, Maharashtra 400602", phone: "+91 9000000022", rating: "4.7", experience: "12 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2185, lng: 72.9782 },
    { name: "Dr. Vivek Shah", hospital: "Hiranandani Hospital", address: "Hiranandani Estate, Thane West, Maharashtra 400607", phone: "+91 9000000023", rating: "4.6", experience: "20 years", specialty: "Diabetologist", location: "Thane", lat: 19.2175, lng: 72.9800 },
    { name: "Dr. Sonali Kulkarni", hospital: "LifeLine Diabetes & Endocrine Clinic", address: "Ghodbunder Road, Thane West, Maharashtra 400615", phone: "+91 9000000024", rating: "4.7", experience: "13 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2195, lng: 72.9775 },
    { name: "Dr. Suresh Bhandari", hospital: "Bhandari Diabetes Clinic", address: "Naupada, Thane West, Maharashtra 400602", phone: "+91 9000000025", rating: "4.6", experience: "15 years", specialty: "Diabetologist", location: "Thane", lat: 19.2198, lng: 72.9794 },

{ name: "Dr. Alka Desai", hospital: "Desai Endocrine Center", address: "Panch Pakhadi, Thane West, Maharashtra 400602", phone: "+91 9000000026", rating: "4.7", experience: "17 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2187, lng: 72.9784 },

{ name: "Dr. Nitin Agarwal", hospital: "Agarwal Diabetes Care", address: "Ghodbunder Road, Thane West, Maharashtra 400615", phone: "+91 9000000027", rating: "4.5", experience: "12 years", specialty: "Diabetologist", location: "Thane", lat: 19.2212, lng: 72.9772 },

{ name: "Dr. Pooja Kulshreshtha", hospital: "Kulshreshtha Endocrine Clinic", address: "Hiranandani Estate, Thane West, Maharashtra 400607", phone: "+91 9000000028", rating: "4.8", experience: "18 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2179, lng: 72.9807 },

{ name: "Dr. Sameer Naik", hospital: "Naik Diabetes Center", address: "Wagle Industrial Estate, Thane West, Maharashtra 400604", phone: "+91 9000000029", rating: "4.6", experience: "16 years", specialty: "Diabetologist", location: "Thane", lat: 19.2217, lng: 72.9786 },

{ name: "Dr. Kavita Shetty", hospital: "Shetty Endocrine Care", address: "Gokhale Road, Thane West, Maharashtra 400602", phone: "+91 9000000030", rating: "4.7", experience: "14 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2196, lng: 72.9799 },

{ name: "Dr. Rajiv Menon", hospital: "Menon Diabetes Clinic", address: "Kopri Colony, Thane East, Maharashtra 400603", phone: "+91 9000000031", rating: "4.5", experience: "19 years", specialty: "Diabetologist", location: "Thane", lat: 19.2207, lng: 72.9765 },

{ name: "Dr. Shweta Rao", hospital: "Rao Endocrine & Diabetes Center", address: "Kopri, Thane East, Maharashtra 400603", phone: "+91 9000000032", rating: "4.6", experience: "11 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2211, lng: 72.9759 },

{ name: "Dr. Ketan Joshi", hospital: "Joshi Diabetes Care", address: "Samata Nagar, Thane West, Maharashtra 400606", phone: "+91 9000000033", rating: "4.7", experience: "13 years", specialty: "Diabetologist", location: "Thane", lat: 19.2230, lng: 72.9780 },

{ name: "Dr. Neha Kapoor", hospital: "Kapoor Endocrine Clinic", address: "Vartak Nagar, Thane West, Maharashtra 400606", phone: "+91 9000000034", rating: "4.6", experience: "10 years", specialty: "Endocrinologist", location: "Thane", lat: 19.2240, lng: 72.9793 },

{ name: "Dr. Ashok Iyer", hospital: "Iyer Diabetes Clinic", address: "Louis Wadi, Thane West, Maharashtra 400604", phone: "+91 9000000035", rating: "4.5", experience: "22 years", specialty: "General Physician", location: "Thane", lat: 19.2223, lng: 72.9779 },

{ name: "Dr. Pankaj Tiwari", hospital: "Tiwari Diabetes Care", address: "Kopri Gaon, Thane East, Maharashtra 400603", phone: "+91 9000000036", rating: "4.6", experience: "15 years", specialty: "Diabetologist", location: "Thane", lat: 19.2214, lng: 72.9768 },
    // MUMBAI
    { name: "Dr. Shashank Joshi", hospital: "Lilavati Hospital", address: "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050", phone: "+91 9000000021", rating: "4.7", experience: "25 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.0505, lng: 72.8288 },
    { name: "Dr. Pradeep Gadge", hospital: "Gadge Diabetes Centre", address: "S.V. Road, Goregaon West, Mumbai, Maharashtra 400062", phone: "+91 9000000022", rating: "4.6", experience: "18 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0600, lng: 72.8400 },
    { name: "Dr. Anjali Mehta", hospital: "Apollo Hospital", address: "Parsik Hill Road, CBD Belapur, Navi Mumbai, Maharashtra 400614", phone: "+91 9000000023", rating: "4.8", experience: "22 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.0199, lng: 73.0298 },
    { name: "Dr. Suresh Bhat", hospital: "Nanavati Hospital", address: "S.V. Road, Vile Parle West, Mumbai, Maharashtra 400056", phone: "+91 9000000024", rating: "4.5", experience: "15 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0967, lng: 72.8402 },
    { name: "Dr. Kavita Nair", hospital: "Fortis Hospital", address: "Mulund Goregaon Link Road, Mulund West, Mumbai, Maharashtra 400078", phone: "+91 9000000025", rating: "4.6", experience: "16 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.1651, lng: 72.9461 },
    { name: "Dr. Rajesh Khanna", hospital: "Kokilaben Hospital", address: "Rao Saheb Achutrao Patwardhan Marg, Andheri West, Mumbai, Maharashtra 400053", phone: "+91 9000000026", rating: "4.7", experience: "21 years", specialty: "General Physician", location: "Mumbai", lat: 19.1311, lng: 72.8266 },
    { name: "Dr. Vinay Kulkarni", hospital: "Bombay Hospital", address: "12, New Marine Lines, Mumbai, Maharashtra 400020", phone: "+91 9000000027", rating: "4.6", experience: "24 years", specialty: "Diabetologist", location: "Mumbai", lat: 18.9405, lng: 72.8284 },
    { name: "Dr. Priya Mehta", hospital: "Jaslok Hospital", address: "Peddar Road, Mumbai, Maharashtra 400026", phone: "+91 9000000028", rating: "4.7", experience: "19 years", specialty: "Endocrinologist", location: "Mumbai", lat: 18.9730, lng: 72.8230 },
{ name: "Dr. Amit Verma", hospital: "Bombay Diabetes Centre", address: "Kalina, Santacruz East, Mumbai, Maharashtra 400098", phone: "+91 9000000029", rating: "4.6", experience: "17 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0725, lng: 72.8765 },
{ name: "Dr. Ritu Sharma", hospital: "Breach Candy Hospital", address: "Breach Candy, Mumbai, Maharashtra 400026", phone: "+91 9000000030", rating: "4.8", experience: "20 years", specialty: "Endocrinologist", location: "Mumbai", lat: 18.9755, lng: 72.8178 },
{ name: "Dr. Manoj Desai", hospital: "Holy Family Hospital", address: "Juhu Road, Mumbai, Maharashtra 400049", phone: "+91 9000000031", rating: "4.6", experience: "16 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0960, lng: 72.8305 },
{ name: "Dr. Kavita Joshi", hospital: "Kokilaben Hospital", address: "Andheri West, Mumbai, Maharashtra 400053", phone: "+91 9000000032", rating: "4.7", experience: "18 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.1320, lng: 72.8260 },
{ name: "Dr. Sanjay Bhat", hospital: "Lilavati Hospital", address: "Bandra West, Mumbai, Maharashtra 400050", phone: "+91 9000000033", rating: "4.6", experience: "23 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0515, lng: 72.8295 },
{ name: "Dr. Neha Kapoor", hospital: "Fortis Hospital", address: "Mulund West, Mumbai, Maharashtra 400078", phone: "+91 9000000034", rating: "4.7", experience: "15 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.1660, lng: 72.9450 },{ name: "Dr. Nitin Deshpande", hospital: "Deshpande Diabetes Clinic", address: "LBS Road, Ghatkopar West, Mumbai, Maharashtra 400086", phone: "+91 9000000035", rating: "4.6", experience: "18 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0880, lng: 72.9075 },

{ name: "Dr. Alka Patil", hospital: "Patil Endocrine Clinic", address: "Tilak Road, Dadar East, Mumbai, Maharashtra 400014", phone: "+91 9000000036", rating: "4.7", experience: "20 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.0176, lng: 72.8478 },

{ name: "Dr. Ketan Shah", hospital: "Shah Diabetes Care", address: "Kurla West, Mumbai, Maharashtra 400070", phone: "+91 9000000037", rating: "4.5", experience: "14 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0728, lng: 72.8826 },

{ name: "Dr. Pooja Kulkarni", hospital: "Kulkarni Endocrine Center", address: "Mulund East, Mumbai, Maharashtra 400081", phone: "+91 9000000038", rating: "4.6", experience: "16 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.1710, lng: 72.9560 },

{ name: "Dr. Sameer Naik", hospital: "Naik Diabetes Clinic", address: "Bhandup West, Mumbai, Maharashtra 400078", phone: "+91 9000000039", rating: "4.6", experience: "15 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.1450, lng: 72.9350 },

{ name: "Dr. Shweta Rao", hospital: "Rao Endocrine Clinic", address: "Chembur East, Mumbai, Maharashtra 400071", phone: "+91 9000000040", rating: "4.7", experience: "13 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.0620, lng: 72.9005 },

{ name: "Dr. Rajiv Menon", hospital: "Menon Diabetes Centre", address: "Sion East, Mumbai, Maharashtra 400022", phone: "+91 9000000041", rating: "4.6", experience: "19 years", specialty: "Diabetologist", location: "Mumbai", lat: 19.0390, lng: 72.8615 },

{ name: "Dr. Neha Agarwal", hospital: "Agarwal Endocrine Care", address: "Matunga East, Mumbai, Maharashtra 400019", phone: "+91 9000000042", rating: "4.7", experience: "12 years", specialty: "Endocrinologist", location: "Mumbai", lat: 19.0269, lng: 72.8553 },

{ name: "Dr. Ajay Patwardhan", hospital: "Patwardhan Diabetes Clinic", address: "Vashi Sector 17, Navi Mumbai, Maharashtra 400703", phone: "+91 9000000043", rating: "4.6", experience: "17 years", specialty: "Diabetologist", location: "Navi Mumbai", lat: 19.0760, lng: 72.9980 },

{ name: "Dr. Ritu Kulshreshtha", hospital: "Kulshreshtha Endocrine Center", address: "Palm Beach Road, Nerul, Navi Mumbai, Maharashtra 400706", phone: "+91 9000000044", rating: "4.7", experience: "15 years", specialty: "Endocrinologist", location: "Navi Mumbai", lat: 19.0330, lng: 73.0180 },

{ name: "Dr. Sandeep Bhosale", hospital: "Bhosale Diabetes Care", address: "CBD Belapur, Navi Mumbai, Maharashtra 400614", phone: "+91 9000000045", rating: "4.6", experience: "18 years", specialty: "Diabetologist", location: "Navi Mumbai", lat: 19.0190, lng: 73.0390 },

{ name: "Dr. Kavita Shetty", hospital: "Shetty Endocrine Clinic", address: "Seawoods, Navi Mumbai, Maharashtra 400706", phone: "+91 9000000046", rating: "4.7", experience: "14 years", specialty: "Endocrinologist", location: "Navi Mumbai", lat: 19.0135, lng: 73.0165 },

{ name: "Dr. Harish Nair", hospital: "Nair Diabetes Center", address: "Kharghar Sector 7, Navi Mumbai, Maharashtra 410210", phone: "+91 9000000047", rating: "4.5", experience: "20 years", specialty: "General Physician", location: "Navi Mumbai", lat: 19.0470, lng: 73.0700 },

{ name: "Dr. Pankaj Tiwari", hospital: "Tiwari Diabetes Clinic", address: "Panvel, Navi Mumbai, Maharashtra 410206", phone: "+91 9000000048", rating: "4.6", experience: "16 years", specialty: "Diabetologist", location: "Navi Mumbai", lat: 18.9894, lng: 73.1175 },

    // PUNE
    { name: "Dr. Anoop Misra", hospital: "Fortis Hospital", address: "Senapati Bapat Road, Shivaji Nagar, Pune, Maharashtra 411016", phone: "+91 9000000031", rating: "4.7", experience: "28 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5214, lng: 73.8577 },
    { name: "Dr. Ramesh Kulkarni", hospital: "Ruby Hall Clinic", address: "40, Sassoon Road, Pune, Maharashtra 411001", phone: "+91 9000000032", rating: "4.6", experience: "19 years", specialty: "Diabetologist", location: "Pune", lat: 18.5303, lng: 73.8763 },
    { name: "Dr. Snehal Patil", hospital: "Jehangir Hospital", address: "32, Sassoon Road, Pune, Maharashtra 411001", phone: "+91 9000000033", rating: "4.5", experience: "12 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5306, lng: 73.8744 },
    { name: "Dr. Ajit Desai", hospital: "Sahyadri Hospital", address: "Karve Road, Deccan Gymkhana, Pune, Maharashtra 411004", phone: "+91 9000000034", rating: "4.6", experience: "15 years", specialty: "General Physician", location: "Pune", lat: 18.5134, lng: 73.8344 },
    { name: "Dr. Poonam Shah", hospital: "Aditya Birla Hospital", address: "Aditya Birla Hospital Marg, Thergaon, Pune, Maharashtra 411033", phone: "+91 9000000035", rating: "4.7", experience: "22 years", specialty: "Endocrinologist", location: "Pune", lat: 18.6277, lng: 73.7663 },
    { name: "Dr. Nitin Agarwal", hospital: "Deenanath Mangeshkar Hospital", address: "Erandawane, Pune, Maharashtra 411004", phone: "+91 9000000036", rating: "4.8", experience: "26 years", specialty: "Diabetologist", location: "Pune", lat: 18.4988, lng: 73.8290 },
    { name: "Dr. Kunal Patwardhan", hospital: "Columbia Asia Hospital", address: "Kharadi Bypass Road, Kharadi, Pune, Maharashtra 411014", phone: "+91 9000000037", rating: "4.6", experience: "14 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5522, lng: 73.9189 },
    { name: "Dr. Rohit Kulkarni", hospital: "Sahyadri Diabetes Clinic", address: "Karve Nagar, Pune, Maharashtra 411052", phone: "+91 9000000038", rating: "4.6", experience: "17 years", specialty: "Diabetologist", location: "Pune", lat: 18.4875, lng: 73.8077 },

{ name: "Dr. Neha Joshi", hospital: "Joshi Endocrine Center", address: "Baner Road, Pune, Maharashtra 411045", phone: "+91 9000000039", rating: "4.7", experience: "15 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5590, lng: 73.7868 },

{ name: "Dr. Sandeep Bhosale", hospital: "Bhosale Diabetes Care", address: "Hadapsar, Pune, Maharashtra 411028", phone: "+91 9000000040", rating: "4.5", experience: "18 years", specialty: "Diabetologist", location: "Pune", lat: 18.5089, lng: 73.9260 },

{ name: "Dr. Kavita Deshpande", hospital: "Deshpande Endocrine Clinic", address: "Kothrud, Pune, Maharashtra 411038", phone: "+91 9000000041", rating: "4.7", experience: "19 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5074, lng: 73.8077 },

{ name: "Dr. Amit Patil", hospital: "Patil Diabetes Clinic", address: "Wakad, Pune, Maharashtra 411057", phone: "+91 9000000042", rating: "4.6", experience: "13 years", specialty: "Diabetologist", location: "Pune", lat: 18.5994, lng: 73.7649 },

{ name: "Dr. Shweta Kulshreshtha", hospital: "Kulshreshtha Endocrine Center", address: "Aundh, Pune, Maharashtra 411007", phone: "+91 9000000043", rating: "4.7", experience: "16 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5603, lng: 73.8077 },

{ name: "Dr. Rajiv Nair", hospital: "Nair Diabetes Centre", address: "Pimpri, Pune, Maharashtra 411018", phone: "+91 9000000044", rating: "4.5", experience: "21 years", specialty: "General Physician", location: "Pune", lat: 18.6298, lng: 73.7997 },

{ name: "Dr. Priya Mehta", hospital: "Mehta Endocrine Clinic", address: "Magarpatta City, Hadapsar, Pune, Maharashtra 411028", phone: "+91 9000000045", rating: "4.7", experience: "14 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5155, lng: 73.9271 },

{ name: "Dr. Ketan Shah", hospital: "Shah Diabetes Care", address: "Camp Area, Pune, Maharashtra 411001", phone: "+91 9000000046", rating: "4.6", experience: "20 years", specialty: "Diabetologist", location: "Pune", lat: 18.5204, lng: 73.8567 },

{ name: "Dr. Alka Agarwal", hospital: "Agarwal Endocrine Clinic", address: "Viman Nagar, Pune, Maharashtra 411014", phone: "+91 9000000047", rating: "4.7", experience: "18 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5679, lng: 73.9143 },

{ name: "Dr. Pankaj Tiwari", hospital: "Tiwari Diabetes Center", address: "Sinhagad Road, Pune, Maharashtra 411030", phone: "+91 9000000048", rating: "4.6", experience: "17 years", specialty: "Diabetologist", location: "Pune", lat: 18.4580, lng: 73.8320 },

{ name: "Dr. Ritu Sharma", hospital: "Sharma Endocrine Clinic", address: "Pashan, Pune, Maharashtra 411021", phone: "+91 9000000049", rating: "4.7", experience: "15 years", specialty: "Endocrinologist", location: "Pune", lat: 18.5421, lng: 73.7936 },

    // NAGPUR
    { name: "Dr. V. Mohan", hospital: "Diabetes Specialities Centre", address: "Ramdas Peth, Nagpur, Maharashtra 440010", phone: "+91 9000000041", rating: "4.9", experience: "30 years", specialty: "Diabetologist", location: "Nagpur", lat: 21.1468, lng: 79.0892 },
    { name: "Dr. Sanjay Deshpande", hospital: "Care Hospital", address: "Panchsheel Square, Wardha Road, Nagpur, Maharashtra 440012", phone: "+91 9000000042", rating: "4.6", experience: "21 years", specialty: "Endocrinologist", location: "Nagpur", lat: 21.1332, lng: 79.0718 },
    { name: "Dr. Meenal Patil", hospital: "Orange City Hospital", address: "Veer Savarkar Square, Pratap Nagar, Nagpur, Maharashtra 440015", phone: "+91 9000000043", rating: "4.5", experience: "16 years", specialty: "General Physician", location: "Nagpur", lat: 21.1278, lng: 79.0654 },
    { name: "Dr. Vivek Sharma", hospital: "Wockhardt Hospital", address: "North Ambazari Road, Shivaji Nagar, Nagpur, Maharashtra 440010", phone: "+91 9000000044", rating: "4.7", experience: "18 years", specialty: "Endocrinologist", location: "Nagpur", lat: 21.1353, lng: 79.0637 },
    { name: "Dr. Pankaj Gupta", hospital: "Kingsway Hospital", address: "Near Kasturchand Park, Kingsway Road, Nagpur, Maharashtra 440001", phone: "+91 9000000045", rating: "4.6", experience: "14 years", specialty: "Diabetologist", location: "Nagpur", lat: 21.1500, lng: 79.0800 },
    { name: "Dr. Ruchi Jain", hospital: "Meditrina Hospital", address: "Ramdaspeth, Nagpur, Maharashtra 440010", phone: "+91 9000000046", rating: "4.7", experience: "11 years", specialty: "Endocrinologist", location: "Nagpur", lat: 21.1235, lng: 79.0620 },
    { name: "Dr. Ajay Deshmukh", hospital: "Alexis Hospital", address: "Mankapur Square, Koradi Road, Nagpur, Maharashtra 440030", phone: "+91 9000000047", rating: "4.6", experience: "15 years", specialty: "Diabetologist", location: "Nagpur", lat: 21.1772, lng: 79.0817 },
  ];

  const locationCenters = {
    All: [19.0760, 72.8777], // Mumbai roughly
    Dombivli: [19.2094, 73.0939],
    Thane: [19.2183, 72.9781],
    Mumbai: [19.0760, 72.8777],
    Pune: [18.5204, 73.8567],
    Nagpur: [21.1458, 79.0882],
    Visakhapatnam: [17.7292, 83.3108]
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleUseMyLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });

          let nearestCity = "All";
          let minDistance = Infinity;

          Object.keys(locationCenters).forEach((city) => {
            if (city !== "All") {
              const [cityLat, cityLng] = locationCenters[city];
              const dist = getDistanceFromLatLonInKm(lat, lng, cityLat, cityLng);
              if (dist < minDistance) {
                minDistance = dist;
                nearestCity = city;
              }
            }
          });

          if (minDistance < 50) {
            setSelectedLocation(nearestCity);
          } else {
            setSelectedLocation("All");
          }
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location: ", error);
          let errorMessage = "Could not get your location.";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please allow location access in your browser (look for an icon in the address bar). Also, ensure Windows location services are turned on.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable. Please ensure your device's location services are turned on.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get your location timed out. Please try again.";
              break;
            default:
              errorMessage = "An unknown error occurred while fetching location.";
              break;
          }
          alert(errorMessage);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  const filteredDoctors =
    selectedLocation === "All"
      ? doctors
      : doctors.filter((doc) => doc.location === selectedLocation);

  const currentCenter = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : (locationCenters[selectedLocation] || locationCenters["All"]);
  const geoapifyApiKey = "6cc7ab7b902b4bd3a49db92f58640fe4";
  const mapUrl = `https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=${geoapifyApiKey}`;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Diabetes Doctors</h1>

      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "15px", alignItems: "center" }}>
        <select
          style={styles.dropdown}
          value={selectedLocation}
          onChange={(e) => {
            setSelectedLocation(e.target.value);
            setUserLocation(null);
          }}
        >
          <option value="All">All Locations</option>
          <option value="Dombivli">Dombivli</option>
          <option value="Thane">Thane</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Nagpur">Nagpur</option>
        </select>
        <button 
          onClick={handleUseMyLocation} 
          style={styles.locationBtn}
          disabled={isLocating}
        >
          {isLocating ? "Locating..." : "📍 Use My Location"}
        </button>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.mapContainer}>
          <MapContainer center={currentCenter} zoom={11} style={{ height: "500px", width: "100%", borderRadius: "10px" }}>
            <TileLayer
              url={mapUrl}
              attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> | <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapUpdater center={currentCenter} />
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>
                  <strong>📍 You are here</strong>
                </Popup>
              </Marker>
            )}
            {filteredDoctors.map((doctor, index) => (
              <Marker key={index} position={[doctor.lat, doctor.lng]}>
                <Popup>
                  <div style={{ lineHeight: "1.4", margin: "0" }}>
                    <strong style={{ fontSize: "1.1em", display: "block" }}>{doctor.name}</strong>
                    <span style={{ fontSize: "0.95em" }}>{doctor.rating} ⭐ ({doctor.experience})</span><br />
                    <span style={{ color: "gray", display: "inline-block", marginBottom: "4px" }}>{doctor.specialty}</span><br />
                    <strong>{doctor.hospital}</strong><br />
                    <span>{doctor.address}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  },
  title: {
    marginBottom: "30px",
    textAlign: "center"
  },
  dropdown: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none"
  },
  locationBtn: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s"
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  mapContainer: {
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }
};

export default FindDoctors;
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const QuotesPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneMake, setPhoneMake] = useState("");
  const [phoneModel, setPhoneModel] = useState("");
  const [coverage, setCoverage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address1: "",
    city: "",
    postalCode: "",
    country: "",
    phoneMake: "",
    phoneModel: "",
    coverage: ""
  });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      address1: "",
      city: "",
      postalCode: "",
      country: "",
      phoneMake: "",
      phoneModel: "",
      coverage: ""
    };
    
    if (!firstName) newErrors.firstName = "Required";
    if (!lastName) newErrors.lastName = "Required";
    if (!email) {
      newErrors.email = "Required";
    } else if (!email.includes("@") || !email.includes(".")) { // so that they have to put in something after @
      newErrors.email = "Valid email required";
    }
    if (!phone) newErrors.phone = "Required";
    if (!dob) newErrors.dob = "Required";
    if (!address1) newErrors.address1 = "Required";
    if (!city) newErrors.city = "Required";
    if (!postalCode) newErrors.postalCode = "Required";
    if (!country) newErrors.country = "Required";
    if (!phoneMake) newErrors.phoneMake = "Required";
    if (!phoneModel) newErrors.phoneModel = "Required";
    if (!coverage) newErrors.coverage = "Required";
    
    setErrors(newErrors);
    
    const allValid = Object.values(newErrors).every(error => error === ""); // checks if every error string is empty
    return allValid;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // if false dont submit form
    
    setIsLoading(true); // disables form
    await new Promise(resolve => setTimeout(resolve, 1000)); // can change the loading time on this if need be
    setIsLoading(false); // enables it again after load time
  };

  return (
    <>
      <div style={{ backgroundColor: "#f7fbfc", minHeight: "100vh", padding: "20px" }}>
        <Container maxWidth="md" style={{ padding: 24, backgroundColor: "white", borderRadius: 8 }}>
          <Typography variant="h4" gutterBottom style={{ color: "black" }}>
            Get Your Quote
          </Typography>
          <Typography variant="body1" gutterBottom style={{ color: "black", marginBottom: 24 }}>
            Fill in your details below to receive an instant quote
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom style={{ color: "black" }}>
              Personal Details
            </Typography>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => { // required and red box go away after user enters something
                  setFirstName(e.target.value);
                  setErrors(prev => ({ ...prev, firstName: "" }));
                }}
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={isLoading}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors(prev => ({ ...prev, lastName: "" }));
                }}
                error={!!errors.lastName}
                helperText={errors.lastName}
                disabled={isLoading}
              />
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(prev => ({ ...prev, email: "" }));
                }}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors(prev => ({ ...prev, phone: "" }));
                }}
                error={!!errors.phone}
                helperText={errors.phone}
                disabled={isLoading}
              />
            </div>

            <TextField
              fullWidth
              label="Date of Birth"
              placeholder="dd/mm/yyyy"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setErrors(prev => ({ ...prev, dob: "" }));
              }}
              style={{ marginBottom: "16px" }}
              error={!!errors.dob}
              helperText={errors.dob}
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Address Line 1"
              placeholder="Street number and name"
              value={address1}
              onChange={(e) => {
                setAddress1(e.target.value);
                setErrors(prev => ({ ...prev, address1: "" }));
              }}
              style={{ marginBottom: "16px" }}
              error={!!errors.address1}
              helperText={errors.address1}
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Address Line 2 (Optional)"
              placeholder="Apartment, suite, etc."
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              style={{ marginBottom: "16px" }}
              disabled={isLoading}
            />

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <TextField
                fullWidth
                label="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors(prev => ({ ...prev, city: "" }));
                }}
                error={!!errors.city}
                helperText={errors.city}
                disabled={isLoading}
              />
              <TextField
                fullWidth
                label="Postal Code"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                  setErrors(prev => ({ ...prev, postalCode: "" }));
                }}
                error={!!errors.postalCode}
                helperText={errors.postalCode}
                disabled={isLoading}
              />
              <FormControl fullWidth error={!!errors.country} disabled={isLoading}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country"
                  value={country}
                  label="Country"
                   onChange={(e) => {
                    setCountry(e.target.value);
                    setErrors(prev => ({ ...prev, country: "" }));
                  }}
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select country</MenuItem>
                  <MenuItem value="ireland">Ireland</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                  <MenuItem value="usa">United States</MenuItem>
                </Select>
                {errors.country && (
                  <div style={{color: "#d32f2f", fontSize: "12px", marginTop: "4px"}}>
                    {errors.country}
                  </div>
                  )}
              </FormControl>
            </div>

            <Typography variant="h6" gutterBottom style={{ color: "black", marginTop: "32px" }}>
              Phone Details
            </Typography>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <FormControl fullWidth error={!!errors.phoneMake} disabled={isLoading}>
                <InputLabel id="phone-make-label">Phone Make</InputLabel>
                <Select
                  labelId="phone-make-label"
                  id="phone-make"
                  value={phoneMake}
                  label="Phone Make"
                  onChange={(e) => {
                    setPhoneMake(e.target.value);
                    setErrors(prev => ({ ...prev, phoneMake: "" }));
                  }}
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select make</MenuItem>
                  <MenuItem value="apple">Apple</MenuItem>
                  <MenuItem value="samsung">Samsung</MenuItem>
                  <MenuItem value="google">Google</MenuItem>
                </Select>
                {errors.phoneMake && <div style={{color: "#d32f2f", fontSize: "12px", marginTop: "4px"}}>{errors.phoneMake}</div>}
              </FormControl>
              
              <FormControl fullWidth error={!!errors.phoneModel} disabled={isLoading}>
                <InputLabel id="phone-model-label">Phone Model</InputLabel>
                <Select
                  labelId="phone-model-label"
                  id="phone-model"
                  value={phoneModel}
                  label="Phone Model"
                  onChange={(e) => {
                    setPhoneModel(e.target.value);
                    setErrors(prev => ({ ...prev, phoneModel: "" }));
                  }}
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select model</MenuItem>
                  <MenuItem value="iphone15">iPhone 15</MenuItem>
                  <MenuItem value="galaxy24">Galaxy S24</MenuItem>
                  <MenuItem value="pixel8">Pixel 8</MenuItem>
                </Select>
                {errors.phoneModel && <div style={{color: "#d32f2f", fontSize: "12px", marginTop: "4px"}}>{errors.phoneModel}</div>}
              </FormControl>
            </div>

            <Typography variant="h6" gutterBottom style={{ color: "black", marginTop: "32px" }}>
              Coverage Type
            </Typography>

            <FormControl fullWidth error={!!errors.coverage} disabled={isLoading} style={{ marginBottom: "32px" }}>
              <InputLabel id="coverage-label">Select Coverage</InputLabel>
              <Select
                labelId="coverage-label"
                id="coverage"
                name="coverage"
                value={coverage}
                label="Select Coverage"
                onChange={(e) => {
                  setCoverage(e.target.value);
                  setErrors(prev => ({ ...prev, coverage: "" }));
                }}
                style={{ textAlign: "left" }}
                MenuProps={{ disablePortal: true, keepMounted: true }}
              >
                <MenuItem value="">Choose coverage</MenuItem>
                <MenuItem value="premium">Premium Shield - €14.99/month</MenuItem>
                <MenuItem value="basic">Basic Cover - €9.99/month</MenuItem>
                <MenuItem value="ultimate">Ultimate Protection - €24.99/month</MenuItem>
              </Select>
              {errors.coverage && <div style={{color: "#d32f2f", fontSize: "12px", marginTop: "4px"}}>{errors.coverage}</div>}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              style={{ 
                padding: "12px", 
                backgroundColor: "#0167b2" 
              }}
            >
              {isLoading ? "Submitting..." : "Get Quote"}
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default QuotesPage;
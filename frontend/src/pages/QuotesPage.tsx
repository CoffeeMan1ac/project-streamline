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
    if (!email.includes("@")) newErrors.email = "Valid email required";
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
    
    const allValid = Object.values(newErrors).every(error => error === "");
    return allValid;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form valid, submitting...");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9ff", minHeight: "100vh", padding: "20px" }}>
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
              onChange={(e) => setFirstName(e.target.value)}
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </div>

          <TextField
            fullWidth
            label="Date of Birth"
            placeholder="dd/mm/yyyy"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ marginBottom: "16px" }}
            required
            error={!!errors.dob}
            helperText={errors.dob}
          />

          <TextField
            fullWidth
            label="Address Line 1"
            placeholder="Street number and name"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            style={{ marginBottom: "16px" }}
            required
            error={!!errors.address1}
            helperText={errors.address1}
          />

          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            placeholder="Apartment, suite, etc."
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            style={{ marginBottom: "16px" }}
          />

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <TextField
              fullWidth
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              fullWidth
              label="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
            <FormControl fullWidth required error={!!errors.country}>
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value="">Select country</MenuItem>
                <MenuItem value="ireland">Ireland</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="usa">United States</MenuItem>
              </Select>
              {errors.country && <div style={{color: "#d32f2f", fontSize: "12px", marginTop: "4px"}}>{errors.country}</div>}
            </FormControl>
          </div>

          <Typography variant="h6" gutterBottom style={{ color: "black", marginTop: "32px" }}>
            Phone Details
          </Typography>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <FormControl fullWidth required error={!!errors.phoneMake}>
              <InputLabel>Phone Make</InputLabel>
              <Select
                value={phoneMake}
                label="Phone Make"
                onChange={(e) => setPhoneMake(e.target.value)}
              >
                <MenuItem value="">Select make</MenuItem>
                <MenuItem value="apple">Apple</MenuItem>
                <MenuItem value="samsung">Samsung</MenuItem>
                <MenuItem value="google">Google</MenuItem>
              </Select>
              {errors.phoneMake && <div style={{color: "#d32f2f", fontSize: "12px", marginTop: "4px"}}>{errors.phoneMake}</div>}
            </FormControl>
            <FormControl fullWidth required error={!!errors.phoneModel}>
              <InputLabel>Phone Model</InputLabel>
              <Select
                value={phoneModel}
                label="Phone Model"
                onChange={(e) => setPhoneModel(e.target.value)}
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

          <FormControl fullWidth required error={!!errors.coverage} style={{ marginBottom: "32px" }}>
            <InputLabel>Select Coverage</InputLabel>
            <Select
              value={coverage}
              label="Select Coverage"
              onChange={(e) => setCoverage(e.target.value)}
            >
              <MenuItem value="">Select coverage</MenuItem>
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
            style={{ padding: "12px" }}
          >
            Get Quote
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default QuotesPage;
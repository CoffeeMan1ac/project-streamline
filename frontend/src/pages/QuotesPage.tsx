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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="md" style={{ padding: 16, backgroundColor: "white" }}>
      <Typography variant="h4" gutterBottom style={{ color: "black" }}>
        <b>Get Your Quote</b>
      </Typography>
      <Typography variant="body1" gutterBottom style={{ color: "black", marginBottom: 24 }}>
        Fill in your details below to receive an instant quote
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom style={{ color: "black" }}>
          <b>Personal Details</b>
        </Typography>

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <TextField
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
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
        />

        <TextField
          fullWidth
          label="Address Line 1"
          placeholder="Street number and name"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          style={{ marginBottom: "16px" }}
          required
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
          />
          <TextField
            fullWidth
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <FormControl fullWidth required>
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
          </FormControl>
        </div>

        <Typography variant="h6" gutterBottom style={{ color: "black", marginTop: "32px" }}>
          <b>Phone Details</b>
        </Typography>

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <FormControl fullWidth required>
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
          </FormControl>
          <FormControl fullWidth required>
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
          </FormControl>
        </div>

        <Typography variant="h6" gutterBottom style={{ color: "black", marginTop: "32px" }}>
          <b>Coverage Type</b>
        </Typography>

        <FormControl fullWidth required style={{ marginBottom: "32px" }}>
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
  );
};

export default QuotesPage;
import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const QuotesPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneMake, setPhoneMake] = useState("");
  const [phoneModel, setPhoneModel] = useState("");
  const [phoneCondition, setPhoneCondition] = useState("");
  const [phoneAge, setPhoneAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");

  // const [productIdsByName, setProductIdsByName] = useState<Record<string, string>>({});

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    occupation: "",
    address1: "",
    city: "",
    postalCode: "",
    country: "",
    phoneMake: "",
    phoneModel: "",
    phoneCondition: "",
    phoneAge: "",
  });

  // useEffect(() => {
  //   axios
  //     .get("/api/products")
  //     .then((res) => {
  //       const map: Record<string, string> = {};
  //       for (const p of res.data ?? []) {
  //         if (p?.name && p?.id) map[p.name] = p.id;
  //       }
  //       setProductIdsByName(map);
  //     })
  //     .catch(() => {
  //       // leave empty; quote can still be submitted with selectedProduct fallback
  //     });
  // }, []);

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      occupation: "",
      address1: "",
      city: "",
      postalCode: "",
      country: "",
      phoneMake: "",
      phoneModel: "",
      phoneCondition: "",
      phoneAge: "",
    };

    if (!firstName) newErrors.firstName = "Required";
    if (!lastName) newErrors.lastName = "Required";
    if (!email) {
      newErrors.email = "Required";
    } else if (!email.includes("@") || !email.includes(".")) {
      // so that they have to put in something after @
      newErrors.email = "Valid email required";
    }
    if (!phone) newErrors.phone = "Required";
    if (!dob) newErrors.dob = "Required";
    if (!occupation) newErrors.occupation = "Required";
    if (!address1) newErrors.address1 = "Required";
    if (!city) newErrors.city = "Required";
    if (!postalCode) newErrors.postalCode = "Required";
    if (!country) newErrors.country = "Required";
    if (!phoneMake) newErrors.phoneMake = "Required";
    if (!phoneModel) newErrors.phoneModel = "Required";
    if (!phoneCondition) newErrors.phoneCondition = "Required";
    if (!phoneAge) newErrors.phoneAge = "Required";

    setErrors(newErrors);

    const allValid = Object.values(newErrors).every((error) => error === ""); // checks if every error string is empty
    return allValid;
  };

  const makeLabel =
    phoneMake === "apple"
      ? "Apple"
      : phoneMake === "samsung"
        ? "Samsung"
        : phoneMake === "google"
          ? "Google"
          : phoneMake;

  const modelsByMake: Record<string, { value: string; label: string }[]> = {
    apple: [
      { value: "iphone16", label: "iPhone 16" },
      { value: "iphone15", label: "iPhone 15" },
      { value: "iphone14", label: "iPhone 14" },
      { value: "iphone13", label: "iPhone 13" },
    ],
    samsung: [
      { value: "galaxy24", label: "Galaxy S24" },
      { value: "galaxy23", label: "Galaxy S23" },
      { value: "galaxy22", label: "Galaxy S22" },
      { value: "galaxyNote7", label: "Galaxy Note 7" },
    ],
    google: [
      { value: "pixel9", label: "Pixel 9" },
      { value: "pixel8", label: "Pixel 8" },
      { value: "pixel7", label: "Pixel 7" },
      { value: "pixel6", label: "Pixel 6" },
    ],
  };

  // looks up the display label for the selected model
  const modelsForMake = modelsByMake[phoneMake] ?? [];
  const modelLabel = modelsForMake.find((model) => model.value === phoneModel)?.label ?? phoneModel;

  // const selectedProductName =
  //   coverage === "basic" ? "StandardShield" :
  //   coverage === "premium" ? "PremiumShield" :
  //   coverage === "ultimate" ? "UltimateShield" :
  //   "";

  // const selectedProductId = selectedProductName ? productIdsByName[selectedProductName] : undefined;

  const handleMakeChange = (e: any) => {
    setPhoneMake(e.target.value);
    setPhoneModel("");
    setErrors((prev) => ({ ...prev, phoneMake: "", phoneModel: "" }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        firstName,
        lastName,
        emailAddress: email,
        phoneNumber: phone,
        dateOfBirth: dob,
        occupation,
        address1,
        address2,
        city,
        postalCode,
        country,
        phoneMake: makeLabel,
        phoneModel: modelLabel,
        phoneCondition,
        phoneAge,
        productId: productId,
      };

      const res = await axios.post("/api/customer/quote", payload);
      const result = res.data;

      const status = String(result?.status ?? "").toUpperCase();

      if (status === "ACCEPTED" || status === "APPROVED") {
        navigate("/accepted", { state: result });
      } else {
        navigate("/declined", { state: result });
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err?.message ??
        "Failed to create quote";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const availableModels = modelsByMake[phoneMake] ?? [];

  return (
    <>
      <Box sx={{ p: 6 }}>
        <Container maxWidth="md" sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}>
          <Typography variant="h4" gutterBottom sx={{ color: "text.primary" }}>
            Get Your Quote
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "text.secondary", mb: 3 }}>
            Fill in your details below to receive an instant quote
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
              Personal Details
            </Typography>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                slotProps={{ htmlInput: { "data-testid": "first-name-input" } }}
                onChange={(e) => {
                  // required and red box go away after user enters something
                  setFirstName(e.target.value);
                  setErrors((prev) => ({ ...prev, firstName: "" }));
                }}
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={isLoading}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                slotProps={{ htmlInput: { "data-testid": "last-name-input" } }}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((prev) => ({ ...prev, lastName: "" }));
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
                slotProps={{ htmlInput: { "data-testid": "email-input" } }}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                slotProps={{ htmlInput: { "data-testid": "phone-number-input" } }}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                error={!!errors.phone}
                helperText={errors.phone}
                disabled={isLoading}
              />
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <TextField
                fullWidth
                label="Date of Birth"
                placeholder="dd/mm/yyyy"
                value={dob}
                slotProps={{ htmlInput: { "data-testid": "dob-input" } }}
                onChange={(e) => {
                  setDob(e.target.value);
                  setErrors((prev) => ({ ...prev, dob: "" }));
                }}
                sx={{ marginBottom: "16px" }}
                error={!!errors.dob}
                helperText={errors.dob}
                disabled={isLoading}
              />
              <FormControl fullWidth error={!!errors.occupation} disabled={isLoading}>
                <InputLabel id="phone-occupation-label">Occupation</InputLabel>
                <Select
                  labelId="phone-occupation-label"
                  id="occupation"
                  value={occupation}
                  label="Occupation"
                  onChange={(e) => {
                    setOccupation(e.target.value);
                    setErrors((prev) => ({ ...prev, occupation: "" }));
                  }}
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select occupation</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="pilot">Pilot</MenuItem>
                  <MenuItem value="engineer">Engineer</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.occupation && (
                  <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                    {errors.occupation}
                  </div>
                )}
              </FormControl>
            </div>

            <TextField
              fullWidth
              label="Address Line 1"
              placeholder="Street number and name"
              value={address1}
              slotProps={{ htmlInput: { "data-testid": "address-1-input" } }}
              onChange={(e) => {
                setAddress1(e.target.value);
                setErrors((prev) => ({ ...prev, address1: "" }));
              }}
              sx={{ marginBottom: "16px" }}
              error={!!errors.address1}
              helperText={errors.address1}
              disabled={isLoading}
            />

            <TextField
              fullWidth
              label="Address Line 2 (Optional)"
              placeholder="Apartment, suite, etc."
              value={address2}
              slotProps={{ htmlInput: { "data-testid": "address-2-input" } }}
              onChange={(e) => setAddress2(e.target.value)}
              sx={{ marginBottom: "16px" }}
              disabled={isLoading}
            />

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <TextField
                fullWidth
                label="City"
                value={city}
                slotProps={{ htmlInput: { "data-testid": "city-input" } }}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors((prev) => ({ ...prev, city: "" }));
                }}
                error={!!errors.city}
                helperText={errors.city}
                disabled={isLoading}
              />
              <TextField
                fullWidth
                label="Postal Code"
                value={postalCode}
                slotProps={{ htmlInput: { "data-testid": "post-code-input" } }}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                  setErrors((prev) => ({ ...prev, postalCode: "" }));
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
                  inputProps={{ "data-testid": "country-select" }}
                  value={country}
                  label="Country"
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setErrors((prev) => ({ ...prev, country: "" }));
                  }}
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select country</MenuItem>
                  <MenuItem value="ireland">Ireland</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                  <MenuItem value="usa">United States</MenuItem>
                </Select>
                {errors.country && (
                  <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                    {errors.country}
                  </div>
                )}
              </FormControl>
            </div>

            <Typography variant="h6" gutterBottom sx={{ color: "text.primary", mt: 4 }}>
              Phone Details
            </Typography>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <FormControl fullWidth error={!!errors.phoneMake} disabled={isLoading}>
                <InputLabel id="phone-make-label">Phone Make</InputLabel>
                <Select
                  labelId="phone-make-label"
                  id="phone-make"
                  inputProps={{ "data-testid": "phone-make-select" }}
                  value={phoneMake}
                  label="Phone Make"
                  onChange={handleMakeChange}
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select make</MenuItem>
                  <MenuItem value="apple">Apple</MenuItem>
                  <MenuItem value="samsung">Samsung</MenuItem>
                  <MenuItem value="google">Google</MenuItem>
                </Select>
                {errors.phoneMake && (
                  <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                    {errors.phoneMake}
                  </div>
                )}
              </FormControl>

              {/* model dropdown is disabled until a make is selected */}
              <FormControl fullWidth error={!!errors.phoneModel} disabled={isLoading || !phoneMake}>
                <InputLabel id="phone-model-label">Phone Model</InputLabel>
                <Select
                  labelId="phone-model-label"
                  id="phone-model"
                  inputProps={{ "data-testid": "phone-model-select" }}
                  value={phoneModel}
                  label="Phone Model"
                  onChange={(e) => {
                    setPhoneModel(e.target.value);
                    setErrors((prev) => ({ ...prev, phoneModel: "" }));
                  }}
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value="">{phoneMake ? "Select model" : "Select a make first"}</MenuItem>
                  {/* loop through models for the selected make and create dropdown option for each */}
                  {availableModels.map((model) => (
                    <MenuItem key={model.value} value={model.value}>
                      {model.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.phoneModel && (
                  <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                    {errors.phoneModel}
                  </div>
                )}
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <FormControl fullWidth error={!!errors.phoneCondition} disabled={isLoading}>
                <InputLabel id="phone-condition-label">Phone Condition</InputLabel>
                <Select
                  labelId="phone-condition-label"
                  id="phone-condition"
                  value={phoneCondition}
                  label="Phone Condition"
                  onChange={(e) => {
                    setPhoneCondition(e.target.value);
                    setErrors((prev) => ({ ...prev, phoneCondition: "" }));
                  }}
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select condition</MenuItem>
                  <MenuItem value="brand new">Brand New</MenuItem>
                  <MenuItem value="lightly used">Lightly Used</MenuItem>
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="heavily used">Heavily Used</MenuItem>
                  <MenuItem value="damaged">Damaged</MenuItem>
                </Select>
                {errors.phoneCondition && (
                  <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                    {errors.phoneCondition}
                  </div>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.phoneAge} disabled={isLoading}>
                <InputLabel id="phone-age-label">Phone Age</InputLabel>
                <Select
                  labelId="phone-age-label"
                  id="phone-age"
                  value={phoneAge}
                  label="Phone Age"
                  onChange={(e) => {
                    setPhoneAge(e.target.value);
                    setErrors((prev) => ({ ...prev, phoneAge: "" }));
                  }}
                  style={{ textAlign: "left" }}
                >
                  <MenuItem value="">Select age</MenuItem>
                  <MenuItem value="less than 1 year">Less than 1 year</MenuItem>
                  <MenuItem value="1 year">1 year</MenuItem>
                  <MenuItem value="2 years">2 years</MenuItem>
                  <MenuItem value="3 years">3 years</MenuItem>
                  <MenuItem value="4+ years">4+ years</MenuItem>
                </Select>
                {errors.phoneAge && (
                  <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                    {errors.phoneAge}
                  </div>
                )}
              </FormControl>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ marginTop: 1, py: 1.5 }}
            >
              {isLoading ? "Submitting..." : "Get Quote"}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default QuotesPage;

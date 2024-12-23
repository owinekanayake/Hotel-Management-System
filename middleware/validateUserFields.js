export function validateUserFields(req, res, next) {
    const {
      email,
      password,
      firstName,
      lastName,
      type,
      whatsApp,
      phone,
      disabled,
      emailVerified,
    } = req.body;
  
    const missingFields = {};
  
    // Validation for required fields and empty strings
    if (!email || email.trim() === "") {
      missingFields.email = "Email is required.";
    }
    if (!password || password.trim() === "") {
      missingFields.password = "Password is required.";
    }
    if (!firstName || firstName.trim() === "") {
      missingFields.firstName = "First Name is required.";
    }
    if (!lastName || lastName.trim() === "") {
      missingFields.lastName = "Last Name is required.";
    }
    if (!type || type.trim() === "") {
      missingFields.type = "Type is required.";
    }
    if (!whatsApp || whatsApp.trim() === "") {
      missingFields.whatsApp = "WhatsApp number is required.";
    }
    if (!phone || phone.trim() === "") {
      missingFields.phone = "Phone number is required.";
    }
    if (disabled === null || disabled === undefined) {
      missingFields.disabled = "Disabled field is required.";
    }
    if (emailVerified === null || emailVerified === undefined) {
      missingFields.emailVerified = "Email Verified field is required.";
    }
  
    // If any fields are missing or invalid, return a 400 response
    if (Object.keys(missingFields).length > 0) {
      return res.status(400).json({
        message: "Required fields are missing, null, or empty.",
        missingFields: missingFields,
      });
    }
  
    // If validation passes, move to the next middleware or controller
    next();
  }
  
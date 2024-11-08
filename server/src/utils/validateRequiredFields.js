const validateRequiredFields = (fields, requireFields) => {
    const missingFields = requireFields.filter(field => !fields[field]);

    if (missingFields.length > 0) {
        const missingFieldString = missingFields.join(', ');
        return `Missing data - ${missingFieldString}`;
    }

    return null;
};

module.exports = validateRequiredFields;
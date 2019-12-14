export default function validate(values) {
    const errors = {}

    if (!values.email) {
        errors.email = "Email is Required";
    }

    if (!values.password) {
        errors.password = "Password is Required";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is Required"
    }
    else {
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!"
        }
    }

    return errors;
}
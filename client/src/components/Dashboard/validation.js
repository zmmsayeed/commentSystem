export default function validate(values) {
    const errors = {};

    if (!values.comment) {
        errors.comment = " "
    }

    return errors
}
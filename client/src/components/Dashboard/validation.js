export default function validate(values) {
    const errors = {};

    if (!values.comment) {
        errors.comment = "Comment is Required"
    }

    return errors
}
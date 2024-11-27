import { validate } from './client_validation';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('age_form').onsubmit = (event) => {
        const data = new FormData(event.target);

        const nameValid = validate('name', data).required().minLength(5);

        const ageValid = validate('age', data).isInteger();

        const allValid = [nameValid, ageValid]
            .flatMap((validation) =>
                Object.entries(validation.results).map(([test, valid]) => {
                    const e = document.getElementById(
                        `err_${validation.propertyName}_${test}`
                    );
                    e.classList.add('bg-dark-subtle');
                    e.style.display = valid ? 'none' : 'block';
                    return valid;
                })
            )
            .every((valid) => valid === true);

        if (!allValid) {
            event.preventDefault();
        }
    };
});

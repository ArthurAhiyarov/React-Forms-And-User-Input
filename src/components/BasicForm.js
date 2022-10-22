import useInput from '../hooks/use-input';

const BasicForm = (props) => {
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHadler: firstNameBlurHandler,
        reset: resetFirstNameInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHadler: lastNameBlurHandler,
        reset: resetLastNameInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHadler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => value.includes('@'));

    let formIsValid = false;

    if (
        enteredFirstNameIsValid &&
        enteredLastNameIsValid &&
        enteredEmailIsValid
    ) {
        formIsValid = true;
    }

    const formSubmissionHadler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    };

    const firstNameInputClasses = firstNameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const lastNameInputClasses = lastNameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = emailInputHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmissionHadler}>
            <div className="control-group">
                <div className={firstNameInputClasses}>
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={firstNameChangedHandler}
                        onBlur={firstNameBlurHandler}
                        value={enteredFirstName}
                    />
                    {firstNameInputHasError && (
                        <p className="error-text">Name must not be empty</p>
                    )}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={lastNameChangedHandler}
                        onBlur={lastNameBlurHandler}
                        value={enteredLastName}
                    />
                    {lastNameInputHasError && (
                        <p className="error-text">
                            Last name must not be empty
                        </p>
                    )}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="name">E-Mail Address</label>
                <input
                    type="text"
                    id="name"
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                />
                {emailInputHasError && (
                    <p className="error-text">Email must contain @.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;

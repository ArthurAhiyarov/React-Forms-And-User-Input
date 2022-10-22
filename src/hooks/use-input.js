import { useReducer } from 'react';

const initialInputState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value };
    }
    if (action.type === 'RESET') {
        return initialInputState;
    }
    return initialInputState;
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const valueIsValid = validateValue(inputState.value);
    const hasError = !validateValue && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({ type: 'INPUT', value: event.target.value });
    };

    const inputBlurHadler = (event) => {
        dispatch({ type: 'BLUR' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHadler,
        reset,
    };
};

export default useInput;

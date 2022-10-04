import { useEffect, useMemo, useState } from "react";


export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setformState] = useState(initialForm);
    const [formValidation, setformValidation] = useState({})

    useEffect(() => {
        createValidators();


    }, [formState])

    useEffect(() => {
        setformState(initialForm);
    }, [initialForm]);
    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation])


    const { username, email, password } = formState;



    const onInputChange = ({ target }) => {

        const { name, value } = target;
        setformState({
            ...formState,
            [name]: value
        })


    }


    const onResetForm = () => {
        setformState(initialForm)
    }

    const createValidators = () => {

        const formCheckValues = {};

        for (const formField of Object.keys(formValidations)) {

            const [fn, errorMessage = 'este campo es requerido'] = formValidations[formField]

            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

        }
        setformValidation(formCheckValues);

    }




    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,

    }
}

import _ from '@lodash';
import React from 'react';

function useForm(initialState, onSubmit) {
    const [form, setForm] = React.useState(initialState);

    const handleChange = React.useCallback((event) => {
        event.persist();
        setForm((_form) =>
            _.setIn(
                { ..._form },
                event.target.name,
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value
            )
        )
    }, []);

    const resetForm = React.useCallback(() => {
        if (!_.isEqual(initialState, form)) {
            setForm(initialState)
        }
    }, [form, initialState]);

    const setInForm = React.useCallback((name, value) => {
        setForm((_form) => _.setIn(_form, name, value))
    }, []);

    const handleSubmit = React.useCallback(
        (event) => {
            if (event) {
                event.preventDefault()
            }
            if (onSubmit) {
                onSubmit()
            }
        },
        [onSubmit]
    );

    return {
        form,
        handleChange,
        handleSubmit,
        resetForm,
        setForm,
        setInForm,
    }
}

export default useForm;
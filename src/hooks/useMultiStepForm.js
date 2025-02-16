'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { fakeCountries } from '@/data/countriesData';

export const useMultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [countries, setCountries] = useState(fakeCountries);
    const [countryStates, setCountryStates] = useState([]);
    const [stateCities, setStateCities] = useState([]);
    const [zipCode, setZipCode] = useState('');
    const [zipCodeError, setZipCodeError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { handleSubmit, control, formState: { errors }, trigger, setError, reset, watch } = useForm({
        defaultValues: {
            name: '', email: '', dob: '', address1: '', address2: '', phone: '',
            city: '', state: '', zip: '', country: '', username: '', password: '', confirmPassword: ''
        }
    });

    const selectedCountry = watch('country');
    const selectedState = watch('state');
    const selectedCity = watch('city');

    const fetchStates = useCallback((countryCode) => {
        const selectedCountryData = fakeCountries.find(country => country.countryCode === countryCode);
        if (selectedCountryData) setCountryStates(selectedCountryData.states);
    }, []);

    const fetchCities = useCallback((stateCode) => {
        const selectedStateData = countryStates.find(state => state.stateCode === stateCode);
        if (selectedStateData) setStateCities(selectedStateData.cities);
    }, [countryStates]);

    const validateZipCode = useCallback(() => {
        const selectedCountryData = fakeCountries.find(country => country.countryCode === selectedCountry);
        const selectedStateData = selectedCountryData?.states.find(state => state.stateCode === selectedState);
        const selectedCityData = selectedStateData?.cities.find(city => city.cityName === selectedCity);
        if (selectedCityData && selectedCityData.zipCode !== zipCode) {
            setError('zip', { type: 'validate', message: 'Invalid Zip Code' });
            setZipCodeError(true);
        } else {
            setError('zip', {});
            setZipCodeError(false);
        }
    }, [selectedCountry, selectedState, selectedCity, zipCode, setError]);

    const validateStepFields = async () => {
        let valid = false;
        if (step === 1) valid = await trigger(['name', 'email', 'dob']);
        else if (step === 2) valid = await trigger(['address1', 'phone', 'city', 'state', 'zip', 'country']);
        else if (step === 3) valid = await trigger(['username', 'password', 'confirmPassword']);
        return valid && !zipCodeError;
    };

    const nextStep = async () => {
        const valid = await validateStepFields();
        if (valid) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    useEffect(() => {
        if (selectedCountry && selectedState && selectedCity) validateZipCode();
    }, [selectedCountry, selectedState, selectedCity, zipCode, validateZipCode]);

    return {
        step, setStep, countries, countryStates, stateCities, control, errors, loading,
        setLoading, fetchStates, fetchCities, handleSubmit, reset, nextStep: validateStepFields, setZipCode, zipCodeError, selectedCountry, selectedState, selectedCity, nextStep, zipCode
    };
};
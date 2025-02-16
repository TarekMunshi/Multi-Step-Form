'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Loader } from '@/svg/Loader';
import PersonalInfoForm from './PersonalInfoForm';
import AddressForm from './AddressForm';
import AccountInfoForm from './AccountInfoForm';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

const ProgressBar = ({ step }) => (
    <motion.div
        className="h-1 bg-blue-500 rounded-t-sm"
        custom={step}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
    />
);

// Component to handle each step of the form
const StepContent = ({ step, control, errors, countries, countryStates, stateCities, fetchStates, fetchCities, zipCodeError, selectedCountry, selectedState, selectedCity, setZipCode, zipCode }) => {
    switch (step) {
        case 1:
            return (
                <PersonalInfoForm control={control} errors={errors} />
            );
        case 2:
            return (
                <AddressForm
                    control={control} errors={errors} countries={countries}
                    countryStates={countryStates} stateCities={stateCities}
                    fetchStates={fetchStates} fetchCities={fetchCities}
                    zipCodeError={zipCodeError} selectedCountry={selectedCountry}
                    selectedCity={selectedCity} selectedState={selectedState}
                    setZipCode={setZipCode} zipCode={zipCode}

                />
            );
        case 3:
            return (
                <AccountInfoForm control={control} errors={errors} />
            );
        default:
            return null;
    }
};

// Multi-step form component
const MultiStepForm = () => {
    const {
        step, setStep, control, errors, loading, setLoading, nextStep, handleSubmit,
        countries, countryStates, stateCities, fetchStates, fetchCities, reset, zipCodeError, selectedCountry, selectedState, selectedCity, setZipCode, zipCode
    } = useMultiStepForm();

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { type: 'validate', message: 'Passwords must match' });
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Form submitted successfully!');
                reset();
                setStep(1);
            } else alert('Failed to submit form');
        } catch {
            alert('An error occurred');
        }
        setLoading(false);
    };

    return (
        <div>
            <h1 className="mb-5 text-3xl font-bold text-center">Multi-Step Registration Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card className="max-w-lg pb-3 mx-auto">
                    <div className="w-full h-1 mb-3 bg-gray-200 rounded-t-sm">
                        <ProgressBar step={step} />
                    </div>
                    <CardContent>
                        <StepContent
                            step={step} control={control} errors={errors}
                            countries={countries} countryStates={countryStates} stateCities={stateCities}
                            fetchStates={fetchStates} fetchCities={fetchCities} zipCodeError={zipCodeError}
                            selectedCountry={selectedCountry} selectedCity={selectedCity} selectedState={selectedState}
                            setZipCode={setZipCode} zipCode={zipCode}
                        />
                        <motion.div className="flex justify-between mt-5">
                            {step > 1 && (
                                <Button type="button" onClick={() => setStep(prev => prev - 1)}>
                                    Previous
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button type="button" onClick={nextStep}>
                                    Next
                                </Button>
                            ) : (
                                <button className='customBtnStyle' type="submit" disabled={loading}>
                                    {loading ? <Loader /> : 'Submit'}
                                </button>
                            )}
                        </motion.div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default MultiStepForm;
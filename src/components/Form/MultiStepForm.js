'use client'
import { use, useEffect, useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { fakeCountries } from '@/data/countriesData';
import { Loader } from '@/svg/Loader';

const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, },
    exit: { opacity: 0 }
};

const progressVariants = {
    hidden: { width: 0 },
    visible: (step) => ({
        width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
    }),
};

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [countries, setCountries] = useState(fakeCountries);
    const [countryStates, setCountryStates] = useState([]);
    const [stateCities, setStateCities] = useState([]);
    const [zipCode, setZipCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [zipCodeError, setZipCodeError] = useState(false);

    const { handleSubmit, control, formState: { errors }, trigger, setError, reset, watch } = useForm({
        defaultValues: {
            name: '',
            email: '',
            dob: '',
            address1: '',
            address2: '',
            phone: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    });


    const selectedCountry = watch('country');
    const selectedState = watch('state');
    const selectedCity = watch('city');

    // Fetch states for a selected country
    const fetchStates = (countryCode) => {
        const selectedCountryData = fakeCountries.find((country) => country.countryCode === countryCode);
        if (selectedCountryData) {
            setCountryStates(selectedCountryData.states);
        }
    };

    // Fetch cities for a selected state
    const fetchCities = (stateCode) => {
        const selectedStateData = countryStates.find((state) => state.stateCode === stateCode);
        if (selectedStateData) {
            setStateCities(selectedStateData.cities);
        }
    };

    // Validate zip code based on city, state, and country
    const validateZipCode = () => {
        const selectedCountryData = fakeCountries.find((country) => country.countryCode === selectedCountry);
        const selectedStateData = selectedCountryData?.states.find((state) => state.stateCode === selectedState);
        const selectedCityData = selectedStateData?.cities.find((city) => city.cityName === selectedCity);
        if (selectedCityData && selectedCityData.zipCode !== zipCode) {
            setError('zip', { type: 'validate', message: 'Invalid Zip Code. Please enter the correct zip code for the selected city and state.' });
            setZipCodeError(true);
        } else {
            setError('zip', {});
            setZipCodeError(false);
        }
    };

    // Dynamic validation based on selected country, state, city, and zip
    const validateCityStateZip = () => {
        if (selectedCountry && selectedState && selectedCity) {
            validateZipCode();
        }
    };

    // Validate only fields of the current step
    useEffect(() => {
        validateCityStateZip();
    }, [selectedState, selectedCity, zipCode]);

    // Validate only fields of the current step
    const nextStep = async () => {
        let valid = false;
        if (step === 1) {
            valid = await trigger(['name', 'email', 'dob']);
        } else if (step === 2) {
            valid = await trigger(['address1', 'phone', 'city', 'state', 'zip', 'country']);
        } else if (step === 3) {
            valid = await trigger(['username', 'password', 'confirmPassword']);
        }

        if (valid && !zipCodeError) {
            setStep((prev) => prev + 1);
        }
    };

    // Go back to the previous step
    const prevStep = () => setStep((prev) => prev - 1);

    // Submit form data
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
                setLoading(false);
            } else {
                alert('Failed to submit form');
                setLoading(false);
            }
        } catch (error) {
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
                        <motion.div
                            className="h-1 bg-blue-500 rounded-t-sm"
                            custom={step}
                            variants={progressVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                    </div>
                    <CardContent>
                        {/* Step 1 */}
                        {step === 1 && (
                            <motion.div variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.5 }} className='space-y-3'>
                                <h2 className="mb-5 text-xl font-bold">Step 1: Personal Information</h2>
                                <div className='space-y-1'>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{ required: 'Name is required' }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="text" placeholder="Name" {...field} />
                                        )}
                                    />
                                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                                </div>

                                <div className='space-y-1'>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="email" placeholder="Email" {...field} />
                                        )}
                                    />
                                    {errors.email && <p className="text-red-600">Invalid email format</p>}
                                </div>

                                <div className='space-y-1'>
                                    <Controller
                                        name="dob"
                                        control={control}
                                        rules={{ required: 'Date of Birth is required' }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="date" {...field} />
                                        )}
                                    />
                                    {errors.dob && <p className="text-red-600">{errors.dob.message}</p>}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <motion.div variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.5 }} className='space-y-3'>
                                <h2 className="mb-5 text-xl font-bold ">Step 2: Address Information</h2>
                                <div className='space-y-1'>
                                    <Controller
                                        name="address1"
                                        control={control}
                                        rules={{ required: 'Address Line 1 is required' }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="text" placeholder="Address Line 1" {...field} />
                                        )}
                                    />
                                    <Controller
                                        name="address2"
                                        control={control}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="text" placeholder="Address Line 2 (Optional)" {...field} />
                                        )}
                                    />
                                    {errors.address1 && <p className="text-red-600">Address Line is required</p>}
                                </div>
                                <div className='space-y-1'>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            required: 'Phone number is required',
                                            pattern: { value: /^\d{10}$/, message: 'Phone number must be 10 digits' }
                                        }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="tel" placeholder="Phone Number" {...field} />
                                        )}
                                    />
                                    {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
                                </div>
                                <div className='space-y-1'>
                                    <Controller
                                        name="country"
                                        control={control}
                                        rules={{ required: 'Country is required' }}
                                        render={({ field }) => (
                                            <select
                                                className={`inputCustomStyle input`}
                                                {...field}
                                                onChange={(e) => {
                                                    fetchStates(e.target.value);
                                                    field.onChange(e);
                                                }}
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map((country) => (
                                                    <option key={country.countryCode} value={country.countryCode}>
                                                        {country.countryName}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                    {errors.country && <p className="text-red-600">{errors.country.message}</p>}
                                </div>
                                <div className='space-y-1'>
                                    <Controller
                                        name="state"
                                        control={control}
                                        rules={{ required: 'State is required' }}
                                        render={({ field }) => (
                                            <select
                                                className={`inputCustomStyle input`}
                                                {...field}
                                                disabled={!selectedCountry}
                                                onChange={(e) => {
                                                    fetchCities(e.target.value);
                                                    field.onChange(e);
                                                }}
                                            >
                                                <option value="">Select State</option>
                                                {selectedCountry &&
                                                    countryStates.map((state) => (
                                                        <option key={state.stateCode} value={state.stateCode}>
                                                            {state.stateName}
                                                        </option>
                                                    ))}
                                            </select>
                                        )}
                                    />
                                    {errors.state && <p className="text-red-600">{errors.state.message}</p>}
                                </div>
                                <div className='space-y-1'>
                                    <Controller
                                        name="city"
                                        control={control}
                                        rules={{ required: 'City is required' }}
                                        render={({ field }) => (
                                            <select
                                                className={`inputCustomStyle input`}
                                                {...field}
                                                disabled={!selectedState}
                                            >
                                                <option value="">Select City</option>
                                                {selectedState &&
                                                    stateCities.map((city) => (
                                                        <option key={city.cityName} value={city.cityName}>
                                                            {city.cityName}
                                                        </option>
                                                    ))}
                                            </select>
                                        )}
                                    />
                                    {errors.city && <p className="text-red-600">{errors.city.message}</p>}
                                </div>
                                <div className='space-y-1'>
                                    <Controller
                                        name="zip"
                                        control={control}
                                        rules={{
                                            required: 'Zip Code is required',
                                            validate: (value) => value === zipCode || 'Invalid Zip Code. Please enter the correct zip code for the selected city and state.',
                                        }}
                                        render={({ field }) => (
                                            <input
                                                className={`inputCustomStyle input`}
                                                type="text"
                                                placeholder="Zip Code"
                                                {...field}
                                                onChange={async (e) => {
                                                    setZipCode(e.target.value);
                                                    field.onChange(e);
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.zip && <p className="text-red-600">{errors.zip.message}</p>}
                                    {!errors.zip && zipCodeError && <p className="text-red-600">Invalid Zip Code. Please enter the correct zip code for the selected city and state.</p>}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <motion.div variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.5 }} className='space-y-3'>
                                <h2 className="mb-5 text-xl font-bold ">Step 3: Account Information</h2>
                                <div className='space-y-1'>
                                    <Controller
                                        name="username"
                                        control={control}
                                        rules={{ required: 'Username is required' }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="text" placeholder="Username" {...field} />
                                        )}
                                    />
                                    {errors.username && <p className="text-red-600">{errors.username.message}</p>}
                                </div>

                                <div className='space-y-1'>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: 'Password is required',
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="password" placeholder="Password" {...field} />
                                        )}
                                    />
                                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                                </div>

                                <div className='space-y-1'>
                                    <Controller
                                        name="confirmPassword"
                                        control={control}
                                        rules={{ required: 'Please confirm your password' }}
                                        render={({ field }) => (
                                            <input className={`inputCustomStyle input`} type="password" placeholder="Confirm Password" {...field} />
                                        )}
                                    />
                                    {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                                </div>
                            </motion.div>
                        )}
                        <motion.div variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.5 }} className="flex justify-between mt-5">
                            {step > 1 && (
                                <Button type="button" onClick={prevStep}>
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
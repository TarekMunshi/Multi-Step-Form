import React from 'react'
import { Controller } from 'react-hook-form'
import { motion } from 'framer-motion';

const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, },
    exit: { opacity: 0 }
}


const AddressForm = ({ control, errors, countries, countryStates, stateCities, fetchCities, fetchStates, zipCodeError, selectedCountry, selectedState, setZipCode, zipCode }) => {
    return (
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
    )
}

export default AddressForm

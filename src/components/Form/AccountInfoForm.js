import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const AccountInfoForm = ({ control, errors }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    return (
        <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="space-y-3"
        >
            <h2 className="mb-5 text-xl font-bold">Step 3: Account Information</h2>

            <div className="space-y-1">
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                    render={({ field }) => (
                        <input className="inputCustomStyle input" type="text" placeholder="Username" {...field} />
                    )}
                />
                {errors.username && <p className="text-red-600">{errors.username.message}</p>}
            </div>

            <div className="relative">
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
                        <input
                            className="inputCustomStyle input"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...field}
                        />
                    )}
                />
                {errors.password && <p className="mt-1 text-red-600">{errors.password.message}</p>}

                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute -translate-y-1/2 right-3 top-1/2"
                >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
            </div>

            <div className="relative">
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{ required: 'Please confirm your password' }}
                    render={({ field }) => (
                        <input
                            className="inputCustomStyle input"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            {...field}
                        />
                    )}
                />
                {errors.confirmPassword && <p className="mt-1 text-red-600">{errors.confirmPassword.message}</p>}

                <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute mt-0 -translate-y-1/2 right-3 top-1/2"
                >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
            </div>
        </motion.div>
    );
};

export default AccountInfoForm;
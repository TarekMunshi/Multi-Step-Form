import React from 'react'
import { Controller } from 'react-hook-form'
import { motion } from 'framer-motion';

const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, },
    exit: { opacity: 0 }
}

const AccountInfoForm = ({ control, errors }) => {
    return (
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
    )
}

export default AccountInfoForm

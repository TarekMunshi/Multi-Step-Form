import React from 'react'
import { Controller } from 'react-hook-form'
import { motion } from 'framer-motion';

const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, },
    exit: { opacity: 0 }
}

const PersonalInfoForm = ({ control, errors }) => {
    return (
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
    )
}

export default PersonalInfoForm

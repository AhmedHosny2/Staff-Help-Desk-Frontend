import React, { useState, useEffect } from 'react';
import { customFetch } from '../../utils/Fetch';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const heroVariant = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 3, duration: 1, ease: 'easeInOut', when: 'beforeChildren' },
    },
};

const ChangeBrand = () => {
    const [brandData, setBrandData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { newData } = await customFetch(process.env.REACT_APP_BRANDINFO_URL + 'brandInfo/getBrandInfo', 'GET');
            setBrandData(newData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching brand data:', error);
        }

    };

    const onSubmit = async (data) => {
        const theme = document.querySelector('input[name="theme-radios"]:checked').value;
        data.theme = theme;

        try {
            await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/brandInfo/updateBrandInfo', 'PUT', data);
            console.log('Brand data updated successfully!');
        } catch (error) {
            console.error('Error updating brand data:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto">
            <motion.div variants={heroVariant} initial="hidden" animate="visible" className="mx-4 md:mx-8 lg:mx-16">
                <h1 className="text-2xl font-bold mb-4">Change Brand</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={brandData.name || 'Default Name'}
                            // Make sure to provide a default value if brandData.name is undefined
                            {...register('name')}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="slogan" className="block font-bold mb-2">
                            Slogan
                        </label>
                        <input
                            type="text"
                            id="slogan"
                            name="slogan"
                            defaultValue={brandData.slogan || ''}
                            {...register('slogan')}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="theme" className="block font-bold mb-2">
                            Theme
                        </label>
                        <input
                            type="text"
                            id="theme"
                            name="theme"
                            defaultValue={brandData.theme || ''}
                            {...register('theme')}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                        />
                    </div>
                    <input type="submit" />
                </form>
            </motion.div>
        </div>
    );
};

export default ChangeBrand;

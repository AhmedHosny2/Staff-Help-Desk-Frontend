import "./ChangeBrand.css";
import React, { useState, useEffect } from 'react';
import { customFetch } from '../../utils/Fetch';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const themeOptions = [
    "nord",
    "light",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "sunset",
];

const ChangeBrand = ({ setCurrentTheme }) => {
    const [brandData, setBrandData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const { name, setName } = useForm();
    const [name, setName] = useState('');
    const [theme, setTheme] = useState('default');
    const [originalName, setOriginalName] = useState('');


    // ...

    <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
        {themeOptions.map((theme) => (
            <li key={theme}>
                <input
                    type="radio"
                    name="theme"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label={theme}
                    value={theme}
                />
            </li>
        ))}
    </ul>


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { newData } = await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/getBrandInfo', 'GET');
                console.log('Fetched brand data:', newData);
                setOriginalName(newData[0].name.toString());
                setBrandData(newData[0].name.toString());
                document.querySelector("html").setAttribute("data-theme", newData[0].theme);
                console.log('doucmentTheme:', newData[0].theme);
                localStorage.setItem("theme", theme);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching brand data:', error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        // console.log('Form Data:', data);
        // const theme = data['theme'];
        // console.log('Theme:', theme);
        // settheme(theme);
        const body = {
            name,
            theme
        }
        console.log("cur body " + body)

        if (data.name !== originalName) {
            try {
                data.theme = theme;
                await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/createBrandInfo', 'POST', body);
                console.log('Brand name updated successfully!');
                setCurrentTheme(theme);
            } catch (error) {
                console.error('Error updating brand name:', error);
            }
        };
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`container mx-auto p-4 md:p-8 ${theme}`}>
            <motion.div className="mx-4 md:mx-8 lg:mx-16">
                <div className="mockup-browser border ">
                    <div className="mockup-browser-toolbar">
                        <div className="input">https://daisyui.com</div>
                    </div>
                    <div className="flex justify-center px-4 py-16 text-font-primary bg-base-200">This is Font for {theme} Theme </div>
                </div>
                <h1 className="text-2xl font-bold mb-4 text-center">Change Brand</h1>
                <div className="bg-secondary shadow-md rounded px-8 pt-6 mb-4 w-3/4 h-1/2 mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            // {...name('name')}
                            defaultValue={originalName || 'Default Name'}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        />

                    </div>
                    <div className="dropdown mb-72">
                        <div tabIndex={0} role="button" className="btn m-1">
                            Theme
                            <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                        </div>
                        <ul tabIndex={0} className="dropdown-content max-h-60 overflow-y-auto z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                            {themeOptions.map((theme) => (
                                <li key={theme}>
                                    <input
                                        type="radio"
                                        name="theme"
                                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                        aria-label={theme}
                                        value={theme}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <input type="submit" onClick={onSubmit}

                        className="bg-neutral hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                </div>
                <h2 className="text-xl font-bold mb-4 text-center">Website Preview</h2>

            </motion.div>
        </div >
    );
};

export default ChangeBrand;
import "./ChangeBrand.css";
import React, { useState, useEffect } from 'react';
import { customFetch } from '../../utils/Fetch';
import { useForm } from 'react-hook-form';
import { motion, useAnimation } from 'framer-motion';
import scrollIntoView from 'scroll-into-view';
import { getToastStyle, removeToast } from '../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';
import retroImage from '../../assets/retro.png';
import nordImage from '../../assets/nord.png';
import aquaImage from '../../assets/aqua.png';
import dimImage from '../../assets/dim.png';
import hallowenImage from '../../assets/halloween.png';


const themeOptions = [
    "nord",
    "retro",
    "light",
    "dark",
    "cupcake",
    "halloween",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "cyberpunk",
    "valentine",
    "garden",
    "forest",
    "aqua",
    "dim",
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
    "sunset"
];
const themeImages = {
    "nord": nordImage,
    "retro": retroImage,
    "aqua": aquaImage,
    "dim": dimImage,
    "halloween": hallowenImage,
    // Add other themes and corresponding images here
};

const ChangeBrand = ({ setCurrentTheme }) => {
    const controls = useAnimation();
    const [brandData, setBrandData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [theme, setTheme] = useState('default');
    const [originalName, setOriginalName] = useState('');
    const [pic, setPic] = useState('');


    // const animateScroll = () => {
    //     controls.start({
    //         y: 500, 
    //         transition: { duration: 0.5, ease: "easeInOut" }
    //     });
    // };

    const animateScroll = () => {
        const element = document.getElementById('websitePreview');
        if (element) {
            scrollIntoView(element, {
                time: 3000,
                align: {
                    top: 0
                }
            });
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { newData } = await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/getBrandInfo', 'GET');
                setOriginalName(newData[0].name.toString());
                setBrandData(newData[0].name.toString());
                document.querySelector("html").setAttribute("data-theme", newData[0].theme);
                localStorage.setItem("theme", theme);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching brand data:', error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const body = {
            name,
            theme
        }

        if (data.name !== originalName) {
            try {
                data.theme = theme;
                await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/createBrandInfo', 'POST', body);
                setCurrentTheme(theme);
                var toastId = toast.success('Brand Info Updated Successfully', getToastStyle());
            } catch (error) {
                console.error('Error updating brand name:', error);
                toastId = toast.error(error, getToastStyle());
            }
        };
        removeToast(toast, toastId);
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        );
    }

    return (
        <>
            <motion.div className="mx-4 md:mx-8 lg:mx-16" animate={controls}>
                <div className={`container mx-auto p-4 md:p-8 ${theme}`}>
                    <h1 className="text-2xl font-bold mb-4 text-center">Change Brand</h1>
                    <div className="bg-secondary shadow-md rounded px-8 pt-6 mb-4 w-3/4 h-1/2 mx-auto">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={originalName || 'Default Name'}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="dropdown mb-72">
                            <div tabIndex={0} role="button" className="btn m-1" onClick={animateScroll}>
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
                                            onChange={(e) => { setTheme(e.target.value); setPic(themeImages[e.target.value]) }}
                                            value={theme}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <input type="submit" onClick={onSubmit}
                                className="bg-neutral hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>
                    <h2 className=" text-xl font-bold mb-4 text-center">Website Preview</h2>
                    <div id="websitePreview" className="mockup-browser border w-723 h-174">
                        <div className="mockup-browser-toolbar">
                            <div className="input">https://Staff-help-desk.com</div>
                        </div>
                        <div className="flex justify-center items-center  py-50 text-font-primary bg-base-200 relative">
                            <img
                                src={pic}
                                alt="Mockup Image"
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
            <Toaster />
        </>
    );
};

export default ChangeBrand;
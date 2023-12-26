import './ChangeBrand.css';
import React, { useState, useEffect } from 'react';
import { customFetch } from '../../utils/Fetch';
import { motion, useAnimation } from 'framer-motion';
import scrollIntoView from 'scroll-into-view';
import { getToastStyle, removeToast } from '../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';
import nord from '../../assets/nord.png';
import retro from '../../assets/retro.png';
import light from '../../assets/light.png';
import dark from '../../assets/dark.png';
import cupcake from '../../assets/cupcake.png';
import halloween from '../../assets/halloween.png';
import bumblebee from '../../assets/bumblebee.png';
import emerald from '../../assets/emerald.png';
import corporate from '../../assets/corporate.png';
import synthwave from '../../assets/synthwave.png';
import cyberpunk from '../../assets/cyberpunk.png';
import valentine from '../../assets/valentine.png';
import garden from '../../assets/garden.png';
import forest from '../../assets/forest.png';
import aqua from '../../assets/aqua.png';
import dim from '../../assets/dim.png';
import lofi from '../../assets/lofi.png';
import pastel from '../../assets/pastel.png';
import fantasy from '../../assets/fantasy.png';
import wireframe from '../../assets/wireframe.png';
import black from '../../assets/black.png';
import luxury from '../../assets/luxury.png';
import dracula from '../../assets/dracula.png';
import cmyk from '../../assets/cmyk.png';
import autumn from '../../assets/autumn.png';
import business from '../../assets/business.png';
import acid from '../../assets/acid.png';
import lemonade from '../../assets/lemonade.png';
import night from '../../assets/night.png';
import coffee from '../../assets/coffee.png';
import winter from '../../assets/winter.png';
import sunset from '../../assets/sunset.png';

const themeOptions = [
    'nord',
    'retro',
    'light',
    'dark',
    'cupcake',
    'halloween',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'cyberpunk',
    'valentine',
    'garden',
    'forest',
    'aqua',
    'dim',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'sunset',
];
const themeImages = {
    nord,
    retro,
    light,
    dark,
    cupcake,
    halloween,
    bumblebee,
    emerald,
    corporate,
    synthwave,
    cyberpunk,
    valentine,
    garden,
    forest,
    aqua,
    dim,
    lofi,
    pastel,
    fantasy,
    wireframe,
    black,
    luxury,
    dracula,
    cmyk,
    autumn,
    business,
    acid,
    lemonade,
    night,
    coffee,
    winter,
    sunset,
};

const ChangeBrand = ({ setCurrentTheme }) => {
    const controls = useAnimation();
    const [brandData, setBrandData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [theme, setTheme] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [originalTheme, setOriginaTheme] = useState('');
    const [pic, setPic] = useState('');
    const [originalPic, setOriginalPic] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChosen, setIsChosen] = useState(false);

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
                    top: 0,
                },
            });
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { newData } = await customFetch(
                    process.env.REACT_APP_BRANDINFO_URL + '/getBrandInfo',
                    'GET'
                );
                setOriginalName(newData[0].name.toString());
                setOriginaTheme(newData[0].theme.toString());
                console.log('tets now ' + newData[0].theme.toString());
                setOriginalPic(themeImages[newData[0].theme.toString()]);
                setBrandData(newData[0].name.toString());
                // document.querySelector("html").setAttribute("data-theme", newData[0].theme);
                // localStorage.setItem("theme", theme);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching brand data:', error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        if (theme === '' && name === '') {
            var toastId = toast.error('Nothing To Save', getToastStyle());
            return;
        }

        if (theme === '' && name !== '') {
            toastId = toast.success('Name changed', getToastStyle());
        }

        else if (name === '' && theme !== '') {
            toastId = toast.success('Theme changed', getToastStyle());
        } else {
            toastId = toast.success('Brand Info Updated Successfully', getToastStyle());
        }
        const body = {
            name,
            theme,
        };

        try {
            await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/createBrandInfo', 'POST', body);
            setCurrentTheme(theme);
        } catch (error) {
            console.error('Error updating brand name:', error);
            toastId = toast.error(error, getToastStyle());
        }

        removeToast(toast, toastId);
        setIsSubmitting(false);
    };

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
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
                <div className={`container flex-col block wrap mx-auto p-4 md:p-8 ${theme}`}>
                    <h1 className="text-2xl font-bold mb-4 text-center">Change Brand</h1>
                    <div className="bg-base-200 shadow-xl flex-col block wrap rounded-lg px-8 pt-6 mb-4 lg:w-4/12 h-56 mx-auto relative">
                        <div className="mb-4">
                            <label htmlFor="name" className="block wrap text-sm font-bold mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={originalName}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="dropdown ">
                                <div tabIndex={0} role="button" className="btn m-1" onClick={animateScroll}>
                                    {originalTheme}
                                    <svg
                                        width="12px"
                                        height="12px"
                                        className="h-2 w-2 fill-current opacity-60 inline-block"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 2048 2048"
                                    >
                                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content shadow-6xl max-h-60 overflow-y-auto z-[1] py-2 px-4 bg-base-300 rounded-box "
                                >
                                    {themeOptions.map((theme) => (
                                        <li key={theme}>
                                            <input
                                                type="radio"
                                                name="theme"
                                                className=" btn btn-sm btn-block btn-ghost justify-start"
                                                aria-label={theme}
                                                onChange={(e) => {
                                                    setTheme(e.target.value);
                                                    setPic(themeImages[e.target.value]);
                                                    setIsChosen(true);
                                                }}
                                                value={theme}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {!isSubmitting ? (
                                <input
                                    type="submit"
                                    onClick={onSubmit}
                                    value="Update"
                                    className="bg-neutral  transform transition duration-9000 ease-in-out rounded-box  hover:scale-105 hover:bg-accent text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                />
                            ) : (
                                <>
                                    <div
                                        type="submit"
                                        className="bg-neutral  transform transition duration-9000 ease-in-out rounded-box  hover:scale-105 hover:bg-accent text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                        disabled
                                    >
                                        Updating
                                        <span className="loading loading-spinner loading-xs ml-4"></span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <h2 className=" text-xl font-bold mb-4 text-center">Website Preview</h2>
                <div
                    id="websitePreview"
                    className="mockup-browser shadow-2xl border w-9/12 h-4/5 mx-auto relative"
                >
                    <div className="mockup-browser-toolbar ">
                        <div className="input">https://Staff-help-desk.com</div>
                    </div>
                    <div className="flex justify-center items-center py-50 text-font-primary bg-base-200 relative">
                        {isChosen && (
                            <img
                                defaultValue={originalPic}
                                src={pic}
                                alt="Mockup Image"
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        )}
                        {!isChosen && (
                            <div className="flex justify-center px-4 py-16 bg-base-200">
                                Choose A Theme To Preview
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            <Toaster />
        </>
    );
};

export default ChangeBrand;

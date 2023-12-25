import "./ChangeBrand.css";
import React, { useState, useEffect } from 'react';
import { customFetch } from '../../utils/Fetch';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { themeChange } from 'theme-change';




const ChangeBrand = () => {
    // const [brandData, setBrandData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const { register, handleSubmit } = useForm();
    const themes = [
        'nord',
        'cupcake',  
        'dark',
        'pink',
        'bumblebee',
        'retro'
    ]
    // const [Theme, setSelectedTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "nord");

    // const handleThemeChange = (e) => {
    //     if (e.target) {
    //         setSelectedTheme("retro");
    //     } else {
    //         setSelectedTheme('nord');
    //     }
    // }

    useEffect(() => {
        // fetchData();
        themeChange(false);

        // themeSelect();
    });

    // const fetchData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const { newData } = await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/getBrandInfo', 'GET');
    //         console.log('Fetched brand data:', newData);
    //         setBrandData(newData);
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error('Error fetching brand data:', error);
    //     }
    // };

    // const onSubmit = async (data) => {
    //     const curentTheme = document.querySelector('input[name="theme-dropdown"]:checked').value;
    //     console.log('Theme:', curentTheme);
    //     data.theme = curentTheme;
    //     console.log('Data:', data);
    //     setSelectedTheme(curentTheme);

    //     try {
    //         await customFetch(process.env.REACT_APP_BRANDINFO_URL + '/createBrandInfo', 'POST', data);
    //         console.log('Brand data updated successfully!');
    //     } catch (error) {
    //         console.error('Error updating brand data:', error);
    //     }
    // };

    // function themeSelect() {
    //     var selectEl = document.querySelector("select[data-choose-theme]");
    //     var dataKey = selectEl ? selectEl.getAttribute('data-key') : null;
    //     (function (theme = localStorage.getItem(dataKey ? dataKey : "theme")) {
    //         if (localStorage.getItem(dataKey ? dataKey : "theme")) {
    //             document.documentElement.setAttribute("data-theme", theme);
    //             var optionToggler = document.querySelector("select[data-choose-theme] [value='" + theme.toString() + "']");
    //             if (optionToggler) {
    //                 [...document.querySelectorAll("select[data-choose-theme] [value='" + theme.toString() + "']")].forEach((el) => {
    //                     el.selected = true;
    //                 });
    //             }
    //         }
    //     })();
    //     if (selectEl) {
    //         [...document.querySelectorAll("select[data-choose-theme]")].forEach((el) => {
    //             el.addEventListener('change', function () {
    //                 document.documentElement.setAttribute("data-theme", this.value);
    //                 localStorage.setItem(dataKey ? dataKey : "theme", document.documentElement.getAttribute('data-theme'));
    //                 [...document.querySelectorAll("select[data-choose-theme] [value='" + localStorage.getItem(dataKey ? dataKey : "theme") + "']")].forEach((el) => {
    //                     el.selected = true;
    //                 });
    //             });
    //         });
    //     }
    // }

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        // <div className={`container mx-auto p-4 md:p-8 ${Theme}`}>
        //     <motion.div className="mx-4 md:mx-8 lg:mx-16">
        //         <h1 className="text-2xl font-bold mb-4 text-center">Change Brand</h1>
        //         <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary shadow-md rounded px-8 pt-6 mb-4 w-3/4 h-1/2 mx-auto">
        //             <div className="mb-4">
        //                 <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
        //                     Name
        //                 </label>
        //                 <input
        //                     type="text"
        //                     id="name"
        //                     name="name"
        //                     defaultValue={brandData.name || 'Default Name'}
        //                     {...register('name')}
        //                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                 />
        //             </div>
        //             <div className="mb-4">
        //                 <label htmlFor="slogan" className="block text-gray-700 text-sm font-bold mb-2">
        //                     Slogan
        //                 </label>
        //                 <input
        //                     type="text"
        //                     id="slogan"
        //                     name="slogan"
        //                     defaultValue={brandData.slogan || ''}
        //                     {...register('slogan')}
        //                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        //                 />
        //             </div>
        //             <div className="dropdown  mb-72">
        //                 <div tabIndex={0} role="button" className="btn m-1">
        //                     Theme
        //                     <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
        //                 </div>


        //                 {/* <Component {...pageProps}/> */}
        //             </div>
        //             <input type="submit"
        //                 onChange={handleThemeChange}
        //                 className="bg-neutral hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
        //         </form>
        //         <h2 className="text-xl font-bold mb-4 text-center">Website Preview</h2>
        //         <div className={`mockup-browser border border-base-300 flex flex-col items-center ${Theme}`}>
        //             <div className="mockup-browser-toolbar w-full">
        //                 <div className="input border border-base-300 text-center w-full">https://Staff-help-desk.com</div>
        //             </div>
        //             <div className="flex justify-center px-4 py-16 border-t border-base-300 w-full">Hello!</div>
        //         </div>
        //     </motion.div>
        // </div>
        <>
        <h1 className="text-2xl text-primary font-bold mb-4 text-center">Change Brand</h1>
            <select className='text-primary' data-choose-theme>
                <option className='text-primary' option value="">Default</option>
                {themes.map((theme) => (
                    <option className='text-primary' key={theme} value={theme}>{theme}</option>
                ))}
            </select>



        </>
    );
};


export default ChangeBrand;
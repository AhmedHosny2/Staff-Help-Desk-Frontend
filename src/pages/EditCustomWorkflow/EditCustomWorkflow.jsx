import React, { useState, useEffect } from 'react';
import { customFetch } from "../../utils/Fetch";
import { getToastStyle, removeToast } from '../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';
import WorkflowCard from '../../components/workflow/WorkFlowCard';

const EditCustomWorkflow = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [fixes, setFixes] = useState([]);

    useEffect(() => {
        getCustomWorkflow(selectedCategory, selectedSubcategory);
    }, [selectedCategory, selectedSubcategory]);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(value);
        if (value === '') {
            setSelectedCategory('');
        }
        setSelectedSubcategory('');
        setFixes([]);
    };

    const handleSubcategoryChange = (event) => {
        const value = event.target.value;
        setSelectedSubcategory(value);
        if (value === '') {
            setSelectedSubcategory('');
        }
        getCustomWorkflow(selectedCategory, value);
    };

    const getCustomWorkflow = async (issue_type, sub_category) => {
        if (sub_category === '' || issue_type === '') {
            return;
        }
        const { err, isPen, newData, newStatus, newStatusText, newMessage } =
            await customFetch(
                process.env.REACT_APP_USERS_URL + `getCustomWorkflow?issue_type=${issue_type}&sub_category=${sub_category}`,
                "GET",
            );
        setFixes(newData.fixes);
    };

    const handleTextChange = (fixIndex, newText) => {
        setFixes((prevFixes) =>
            prevFixes.map((fix, index) => (index === fixIndex ? newText : fix))
        );
    };

    const handleUpdateWorkflow = async () => {
        const { err, isPen, newData, newStatus, newStatusText, newMessage } =
            await customFetch(
                process.env.REACT_APP_USERS_URL + 'editCustomWorkflow',
                "PUT",
                {
                    issue_type: selectedCategory,
                    sub_category: selectedSubcategory,
                    fixes: fixes
                }
            );
        if (newStatusText === 'success') {
            var toastId = toast.success('Custom Work FLow successfully updated', getToastStyle());
        }
        else {
            var toastId = toast.error(newMessage, getToastStyle());
        }
        removeToast(toast, toastId);
        getCustomWorkflow(selectedCategory, selectedSubcategory)
    };


    const handleNewFix = () => {
        const newFix = "New Fix";
        setFixes((prevFixes) => [...prevFixes, newFix]);
    };

    const handleRemoveClick = (cardId) => {
        setFixes((prevFixes) => prevFixes.filter((_, index) => index !== cardId));
    };

    return (
        <>
            <div className="container block wrap mx-auto px-4 sm:px-6 lg:px-0">
                <div className="flex flex-col block wrap items-center my-16 ">
                    <div className="indicator">
                        <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
                            <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                                Edit Your Custom Workflow
                            </h2>
                            <select
                                className="border-2 border-gray-300 h-8 px-3 pr-6 rounded-lg text-sm focus:outline-none"
                                onChange={handleCategoryChange}
                                value={selectedCategory}
                            >
                                <option value="">Select Category</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Network">Network</option>
                            </select>
                            <select
                                className="border-2 border-gray-300 h-8 px-3 pr-6 rounded-lg text-sm focus:outline-none"
                                onChange={handleSubcategoryChange}
                                value={selectedSubcategory}
                            >
                                <option value="">Select Subcategories</option>
                                {selectedCategory === 'Hardware' && (
                                    <>
                                        <option value="desktops">Desktops</option>
                                        <option value="laptops">Laptops</option>
                                        <option value="printers">Printers</option>
                                        <option value="servers">Servers</option>
                                        <option value="networking equipment">Networking Equipment</option>
                                    </>
                                )}
                                {selectedCategory === 'Software' && (
                                    <>
                                        <option value="operating system">Operating System</option>
                                        <option value="application software">Application Software</option>
                                        <option value="custom software">Custom Software</option>
                                        <option value="integration issues">Integration Issues</option>
                                    </>
                                )}
                                {selectedCategory === 'Network' && (
                                    <>
                                        <option value="email issues">Email Issues</option>
                                        <option value="internet connection problems">Internet Connection Problems</option>
                                        <option value="website errors">Website Errors</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                    {selectedCategory !== "" && selectedSubcategory !== "" && (
                        <div className="flex justify-center mt-4">
                            <button
                                className="btn btn-primary mr-4"
                                onClick={handleUpdateWorkflow}
                            >
                                Update Workflow
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={handleNewFix}
                            >
                                New Fix
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {fixes.map((fix, index) => (
                    <WorkflowCard
                        key={index}
                        cardId={index}
                        editedText={fix}
                        onTextChange={handleTextChange}
                        onRemoveClick={handleRemoveClick}
                    />
                ))}
            </div>
            <Toaster />
        </>
    );
};

export default EditCustomWorkflow;

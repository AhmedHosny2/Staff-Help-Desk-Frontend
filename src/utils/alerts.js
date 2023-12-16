import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function alertError(message, autoClose = 3000) {
    toast.error(message, {
        position: "top-center",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export function alertConfirm(message, autoClose = 3000) {
    toast.success(message, {
        position: "top-center",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}


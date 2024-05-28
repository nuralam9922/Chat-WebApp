import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@material-tailwind/react';
import { FiEdit2 } from 'react-icons/fi';
import { selectThemeDetails } from '../selectors/themeSelector';
import { hideAlert } from '../slices/alertSlice';
import { Button } from '@material-tailwind/react';

function AlertComponent() {
    const theme = useSelector(selectThemeDetails);
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    const alertColor = alert.type === "success" ? "blue" : alert.type === "danger" ? "red" : "green";

    const timeOutRed = useRef(null);
    useEffect(() => {
        if (alert.open) {
            clearTimeout(timeOutRed.current);
            timeOutRed.current = setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);
        }
    }, [alert.open]);

    return (
        <div>
            <Alert
                color={alertColor}
                icon={alert.icon && alert.icon}
                open={alert.open}
                // onClose={() => dispatch(hideAlert())}
                className={`rounded-none border-l-4 ${theme === "dark" ? "text-white" : ""} font-medium absolute ${alert.customClass} rounded-md z-[999] flex items-center capitalize`}
            >
                <div>{alert.content}</div>
                
            </Alert>
        </div>
    );
}

export default AlertComponent;

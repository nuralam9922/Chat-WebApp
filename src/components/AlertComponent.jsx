import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-tailwind/react';
import { FiEdit2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectThemeDetails } from '../selectors/themeSelector';
import { useDispatch } from 'react-redux';
import { hideAlert } from '../slices/alertSlice';
import { useEffect } from 'react';
import { useRef } from 'react';

function AlertComponent() {
    const theme = useSelector(selectThemeDetails);
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    const alertColor = alert.type === "success" ? "blue" : alert.type === "danger" ? "red" : "green";



    const timeOutRed = useRef(null)
    useEffect(() => {
        clearTimeout(timeOutRed.current);
         timeOutRed.current = setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);
    }, [alert.open]);

    return (
        <div>
            <Alert
                color={alertColor}
                icon={alert.icon && alert.icon}
                open={alert.open}
                onClose={() => dispatch(hideAlert())}
                className={`rounded-none border-l-4 ${theme === "dark" ? "text-white" : ""} font-medium absolute ${alert.customClass} rounded-md z-[999] flex items-center  capitalize`}
            >
                {alert.content}
            </Alert>
        </div>
    );
}

AlertComponent.propTypes = {
    onOpen: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    icon: PropTypes.element,
    content: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'info']),
    customClass: PropTypes.string,
};

AlertComponent.defaultProps = {
    icon: <FiEdit2 />,
    type: 'info',
    customClass: '',
};

export default AlertComponent;

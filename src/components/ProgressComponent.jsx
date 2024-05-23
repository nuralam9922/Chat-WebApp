import { Progress } from '@material-tailwind/react';
import { Typography } from '@material-tailwind/react';
import React from 'react';

function ProgressComponent({value}) { // Destructure the value prop
    console.log(value);

    return (
        <div className="w-full  text-primaryTextColor p-2">
            <div className="mb-2 flex items-center justify-between gap-4">
                <Typography className='text-xs'>
                    Image Upload Completed
                </Typography>
                <Typography className='text-xs'>
                    {value}%
                </Typography>
            </div>
            <Progress value={value} size='sm' color='green' />
        </div>
    );
}

export default ProgressComponent;

"use client";

import React, { useState } from 'react';
import Calendar from '@/app/templates/calendar/calendar';
import { DateProvider } from '@/app/context/date-provider';

const HomePage: React.FC = () => {
    return (
        <DateProvider>
            <Calendar />
        </DateProvider>
    )
};

export default HomePage;

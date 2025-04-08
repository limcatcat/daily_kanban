import React, { useState } from 'react';

function DDay() {

    const [dayCount, setDayCount] = useState(0);

    const fetchDDay = async () => {

        const csrftoken = document.querySelector('[name=csrf-token]').content;
        const token = localStorage.getItem('token');

        if (!!token) {
            const response = await fetch('/api/') // update the path later
        }

    }

}
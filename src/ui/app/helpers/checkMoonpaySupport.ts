const isAllowed = async () => {
    const response = await fetch(
        `https://api.moonpay.com/v4/ip_address?apiKey=pk_test_8S6mtnLjTUJf4PWM2Ts5lhA08g12P`
    );

    const res = await response.json();

    return res.isAllowed;
};

export default isAllowed;

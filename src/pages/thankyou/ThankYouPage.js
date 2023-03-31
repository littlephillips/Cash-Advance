    import React from 'react';
    import { Image } from 'react-bootstrap';
    import { useMediaQuery } from 'react-responsive';
    import { Link } from 'react-router-dom';

    const ThankYouPage = () => {
    // useMediaQuery hook to check screen size
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{height: '70vh'}}>
        {/* Display different image sizes depending on screen size */}
        <Image
            src="https://img.freepik.com/free-vector/flat-thank-you-composition-with-confetti_23-2147824945.jpg?size=626&ext=jpg&ga=GA1.2.1180731975.1677176510&semt=sph"
            height={isMobile ? '250px' : '300px'}
            className="mb-3 mt-4"
        />

        <div className="d-flex flex-column align-items-center">
            <h1 className="mt-3">Thank you for applying for a loan!</h1>
            <p className="mt-3">We'll be in touch soon.</p>

            <Link to="/" className="btn btn-primary mt-3">
            Return to Home
            </Link>
        </div>
        </div>
    );
    };

    export default ThankYouPage;


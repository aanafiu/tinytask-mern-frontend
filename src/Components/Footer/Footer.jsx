import React from 'react';

const Footer = () => {
    const handleSubscribe = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        console.log('Subscribed with email:', email);
    };

    return (
        <footer className="bg-gradient-to-tr from-Secondary/20 to-Light/30 text-Gold rounded-t-[70px] border-t-4 py-13 px-4">
            <div className="max-w-4xl mx-auto border-Gold border-2 text-center rounded-2xl mb-8 p-10">
                <h2 className="text-3xl font-bold text-Gold mb-2">SUBSCRIBE TO TinyTask</h2>
                <p className="text-xl mb-4 text-Light">TO GET EXCLUSIVE BENEFITS</p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-x-3 sm:space-y-0">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        className="p-4 w-full rounded-l-md border !border-none outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-Gold text-Muted p-4 rounded-r-md hover:bg-Muted hover:text-Gold transition-all flex items-center"
                    >
                        SUBSCRIBE
                        <span className="ml-2">🔔</span>
                    </button>
                </form>
            </div>
            <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:self-start md:justify-items-center gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">ABOUT</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">About Us</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Contact Us</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Latest Blog</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Authenticity Guarantee</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Customer Reviews</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">MY ACCOUNT</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Manage Your Account</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">How to Deposit</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">How to Withdraw</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Account Verification</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Safety & Security</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Membership Level</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">HELP CENTER</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Help centre</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">FAQ</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Quick Start Guide</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Tutorials</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Borrow</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Lend</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">LEGAL INFO</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Risk Warnings</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Privacy Notice</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Security</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Become Affiliate</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-cyan-400">Complaints Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
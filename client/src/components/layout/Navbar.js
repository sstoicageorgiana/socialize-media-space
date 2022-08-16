import React from 'react';
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai';
import { MdOutlineAccountBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div>
			<nav className="navbar bg-primary">
				<h1>
					<Link to="/index">Socialize app</Link>
				</h1>
				<ul>
					<li>
						<Link to="/">
							<AiFillHome /> Home
						</Link>
					</li>
					<li>
						<Link to="/login">
							<AiOutlineLogin /> Log in
						</Link>
					</li>
					<li>
						<Link to="/register">
							<MdOutlineAccountBox />
							Sign up
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;

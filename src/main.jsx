import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css';
import Home from './HomePage/Home.jsx';
import Contact from './ContactPage/contactPage.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/contact",
		element: <Contact />
	}
	
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)

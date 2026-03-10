import { createRoot } from 'react-dom/client'
import { Theme } from "@radix-ui/themes"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<Theme className='max-h-6'>
		<App />
	</Theme>,
)

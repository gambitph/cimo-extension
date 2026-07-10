import { createRoot } from 'react-dom/client'
import { Theme } from "@radix-ui/themes"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<Theme
		appearance="light"
		accentColor="grass"
		grayColor="gray"
		radius="large"
		scaling="100%"
		panelBackground="solid"
	>
		<App />
	</Theme>,
)

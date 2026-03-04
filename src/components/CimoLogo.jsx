import cimoLogo from "../assets/cimo-logo.png"


const CimoLogo = ( { size = 32, className = "" } ) => {
	return (
		<img
			src={cimoLogo}
			alt="Cimo Logo"
			width={size}
			height={size}
			className={className}
		/>
	)
}

export default CimoLogo

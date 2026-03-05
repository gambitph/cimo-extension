import { useRef, useState } from "react"

export default function Popup () {
	const fileInputRef = useRef( null )

	const [ isDragging, setIsDragging ] = useState( false )
	const [ showSettings, setShowSettings ] = useState( false )
	const [ file, setFile ] = useState( null )
	const [ progress, setProgress ] = useState( 0 )
	const [ isProcessing, setIsProcessing ] = useState( false )

	const [ quality, setQuality ] = useState( 80 )
	const [ maxDimension, setMaxDimension ] = useState( "" )

	const [ originalSize, setOriginalSize ] = useState( null )
	const [ optimizedSize, setOptimizedSize ] = useState( null )

	const handleFile = selectedFile => {
		if ( !selectedFile.type.startsWith( "image/" ) ) {
			alert( "Only image files are allowed in the free version." )
			return
		}

		setFile( selectedFile )
		setOriginalSize( selectedFile.size )
		setOptimizedSize( null )
		simulateOptimization( selectedFile )
	}

	const simulateOptimization = file => {
		setIsProcessing( true )
		setProgress( 0 )

		let fakeProgress = 0
		const interval = setInterval( () => {
			fakeProgress += 10
			setProgress( fakeProgress )

			if ( fakeProgress >= 100 ) {
				clearInterval( interval )
				setIsProcessing( false )
				const newSize = Math.floor( file.size * 0.4 )
				setOptimizedSize( newSize )
			}
		}, 120 )
	}

	const handleDrop = e => {
		e.preventDefault()
		setIsDragging( false )

		if ( e.dataTransfer.files.length > 1 ) {
			alert( "Free version allows only one image at a time." )
			return
		}

		handleFile( e.dataTransfer.files[0] )
	}

	const resetState = () => {
		setFile( null )
		setProgress( 0 )
		setOriginalSize( null )
		setOptimizedSize( null )
	}

	const formatBytes = bytes => {
		if ( bytes > 1024 * 1024 ) {
			return ( bytes / ( 1024 * 1024 ) ).toFixed( 2 ) + " MB"
		}
		return ( bytes / 1024 ).toFixed( 2 ) + " KB"
	}

	const savedPercent =
		originalSize && optimizedSize
			? Math.round( ( 1 - optimizedSize / originalSize ) * 100 )
			: null

	return (
		<div className="w-[360px] max-h-[600px] p-4 bg-white text-[#2F3243] text-sm">
			{/* HEADER */}
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					{/* Replace with your SVG */}
					<div className="w-7 h-7 bg-gradient-to-br from-[#9CCCE0] to-[#5FACCA] rounded-lg" />
					<div>
						<div className="font-semibold text-base">Cimo</div>
						<div className="text-xs text-gray-500">
							Media Optimizer (Free)
						</div>
					</div>
				</div>

				<button
					onClick={ () => setShowSettings( !showSettings ) }
					className="text-gray-400 hover:text-[#808cce] transition"
				>
					⚙
				</button>
			</div>

			{/* INSTRUCTIONS */}
			<p className="text-xs text-gray-500 mb-3">
				Upload an image to instantly optimize and download it.
			</p>

			{/* SETTINGS */}
			{showSettings && (
				<div className="bg-gray-50 border border-gray-100 p-3 rounded-xl mb-3 space-y-4 shadow-sm">
					<div>
						<label className="block text-xs font-medium mb-1">
							WebP Image Quality
						</label>
						<div className="flex items-center gap-2">
							<input
								type="range"
								min="0"
								max="100"
								value={ quality }
								onChange={ e => setQuality( Number( e.target.value ) ) }
								className="w-full accent-[#5FACCA]"
							/>
							<span className="text-xs w-8 text-right">{quality}</span>
						</div>
					</div>

					<div>
						<label className="block text-xs font-medium mb-1">
							Maximum Image Dimension (px)
						</label>
						<input
							type="number"
							placeholder="No limit"
							value={ maxDimension }
							onChange={ e => setMaxDimension( e.target.value ) }
							className="w-full border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#9CCCE0]"
						/>
					</div>
				</div>
			)}

			{/* MAIN AREA */}
			{!file ? (
				<div
					onDragOver={ e => {
						e.preventDefault()
						setIsDragging( true )
					} }
					onDragLeave={ () => setIsDragging( false ) }
					onDrop={ handleDrop }
					className={ `relative border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center transition
            ${isDragging
					? "border-[#5FACCA] bg-[#F2FAFD]"
					: "border-dashed border-gray-300"
				}` }
				>
					<div className="text-3xl mb-2">📷</div>
					<p className="text-xs text-gray-500 mb-3">
						Drop an image here
					</p>

					<button
						onClick={ () => fileInputRef.current.click() }
						className="bg-gradient-to-r from-[#9CCCE0] to-[#5FACCA] text-white px-4 py-2 rounded-lg text-xs font-medium shadow-sm hover:opacity-95 transition"
					>
						Select Image
					</button>

					<input
						type="file"
						accept="image/*"
						ref={ fileInputRef }
						hidden
						onChange={ e => {
							if ( e.target.files?.[0] ) {
								handleFile( e.target.files[0] )
							}
						} }
					/>
				</div>
			) : (
				<div className="border border-gray-200 rounded-xl p-3 space-y-3 shadow-sm">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs">
							IMG
						</div>
						<div className="text-xs truncate flex-1">
							{file.name}
						</div>
					</div>

					{isProcessing && (
						<div>
							<div className="text-xs mb-1">Optimizing...</div>
							<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
								<div
									className="h-2 rounded-full bg-gradient-to-r from-[#9CCCE0] to-[#5FACCA] transition-all"
									style={ { width: `${progress}%` } }
								/>
							</div>
						</div>
					)}

					{optimizedSize && originalSize && (
						<div className="text-xs space-y-1">
							<div>Original: {formatBytes( originalSize )}</div>
							<div>Optimized: {formatBytes( optimizedSize )}</div>
							<div className="text-[#5FACCA] font-medium">
								Saved: {savedPercent}%
							</div>
						</div>
					)}

					{optimizedSize && (
						<button className="w-full bg-gradient-to-r from-[#9CCCE0] to-[#5FACCA] text-white py-2 rounded-lg text-xs font-medium shadow-sm hover:opacity-95 transition">
							Download Optimized Image
						</button>
					)}

					<button
						onClick={ resetState }
						className="w-full border border-gray-200 py-2 rounded-lg text-xs hover:bg-gray-50 transition"
					>
						Upload Another
					</button>
				</div>
			)}

			{/* UPSELL */}
			<div className="mt-4 pt-3 border-t border-gray-100">
				<div className="text-xs font-semibold mb-1">
					🚀 Upgrade to Cimo Pro
				</div>

				<ul className="text-[11px] text-gray-500 space-y-1 mb-3">
					<li>• Batch image optimization</li>
					<li>• Video & audio support</li>
					<li>• Advanced compression engine</li>
					<li>• No limits</li>
				</ul>

				<a
					href="https://cimoextension.com"
					target="_blank"
					rel="noreferrer"
					className="block text-center border border-[#5FACCA] text-[#2F3243] py-2 rounded-lg text-xs font-medium hover:bg-[#F2FAFD] transition"
				>
					Upgrade Now
				</a>
			</div>
		</div>
	)
}
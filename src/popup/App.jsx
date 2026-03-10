import { useState } from "react"

import CimoLogo from "@/components/CimoLogo"
import SettingsPanel from "@/components/SettingsPanel"
import DropZone from "@/components/Dropzone"
import OptimizationResult from "@/components/OptimizationResult"
import ProUpsell from "@/components/ProUpsell"

import { convertImage } from "../converters/image-converter"


const ExtensionPopup = () => {
	const [quality, setQuality] = useState(80)
	const [maxDimension, setMaxDimension] = useState("")
	const [isProcessing, setIsProcessing] = useState(false)
	const [result, setResult] = useState(null)



	const downloadConvertedFile = fileItem => {
		console.log('downloadConvertedFile called with:', fileItem)
		console.log('fileItem.convertedBlob:', fileItem.convertedBlob)
		console.log('fileItem.status:', fileItem.status)

		// Add a little delay before downloading
		setTimeout(() => {
			if (fileItem.convertedBlob) {
				const url = URL.createObjectURL(fileItem.convertedBlob)
				const a = document.createElement('a')
				a.href = url
				a.download = fileItem.name.replace(/\.[^/.]+$/, '') + '.' + 'webp'
				a.click()
				URL.revokeObjectURL(url)

				console.log('Download initiated for:', fileItem.name)
			} else {
				console.error('No convertedBlob found for:', fileItem.name)
			}
		}, 1000)
	}

	// Simulate file optimization (mock for UI demo)
	const handleFileSelect = async file => {
		let fileItem = {
			id: Date.now(),
			name: file.name,
			size: file.size,
			file: file,
			status: 'processing',
			progress: 0,
			convertedBlob: null
		}

		console.log(fileItem)

		setIsProcessing(true)
		try {
			const blob = await convertImage(fileItem, quality)

			// Update status to converted and store the blob
			fileItem = {
				...fileItem,
				name: fileItem.name.replace(/\.[^/.]+$/, '') + '.webp',
				status: 'converted',
				progress: 100,
				originalSize: fileItem.size,
				optimizedSize: blob.size,
				convertedBlob: blob,
				isComplete: true
			}
			setResult(fileItem)

			// Auto-download the file after conversion
			setIsProcessing(false)
			downloadConvertedFile(fileItem)

		} catch (error) {
			console.error('Error processing file:', error)
			setResult(null)
		}
	}

	const handleDownload = () => {
		console.log('handleDownload called with result:', result)
		if (result && result.convertedBlob) {
			downloadConvertedFile({ ...result, convertedBlob: result.convertedBlob }, true)
		}
	}

	return (
		<div className="w-90 cimo-shadow-lg overflow-hidden rounded-2x bg-foreground max-h-1/2">
			{/* Header */}
			<div className="px-4 py-3 border-b border-border bg-card">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2.5">
						<CimoLogo size={28} />
						<div>
							<h1 className="text-sm font-semibold text-dark">
								Cimo
							</h1>
							<p className="text-[10px] text-muted-foreground -mt-0.5">
								Media Optimizer
							</p>
						</div>
					</div>
					{/* <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
						Free
					</span> */}
				</div>
			</div>

			{/* Content */}
			<div className="p-4 space-y-4 bg-background">
				{/* Optimization Result */}
				{result && (
					<OptimizationResult
						fileName={result.name}
						originalSize={result.originalSize}
						optimizedSize={result.optimizedSize}
						progress={result.progress}
						isComplete={result.isComplete}
						onDownload={handleDownload}
					/>
				)}

				{/* Drop Zone */}
				<DropZone
					onFileSelect={handleFileSelect}
					isProcessing={isProcessing}
					hasResult={result !== null}
				/>

				{/* Settings */}
				<SettingsPanel
					quality={quality}
					maxDimension={maxDimension}
					onQualityChange={setQuality}
					onMaxDimensionChange={setMaxDimension}
				/>

				{/* Pro Upsell */}
				<ProUpsell />
			</div>

			{/* Footer */}
			<div className="px-4 py-2 border-t border-border bg-muted/30">
				<p className="text-[10px] text-center text-muted-foreground">
					Free version • Images only • 1 file at a time
				</p>
			</div>
		</div>
	)
}

export default ExtensionPopup
